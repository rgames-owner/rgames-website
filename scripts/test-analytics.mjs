import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';

// Transpile the real client in an isolated temporary directory. No live GA4 calls.
const directory = await mkdtemp(join(tmpdir(), 'rgames-analytics-test-'));
const source = await readFile(new URL('../lib/analytics/client.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
const filename = join(directory, 'client.cjs');
await writeFile(filename, compiled.outputText);
const { loadDashboard, AnalyticsAuthError } = createRequire(import.meta.url)(filename);
const originalFetch = globalThis.fetch;
const originalWarn = console.warn;
const filters = { days: 7, country: '', platform: 'all' };
const token = 'test-access-token-never-in-url';
const customNames = ['quest_id', 'floor_band', 'hunter_band', 'prestige_band', 'placement', 'ad_format', 'stage', 'reason', 'product_id', 'store', 'action', 'resource_type', 'amount_band', 'balance_band', 'source', 'operation'];
const metadata = { dimensions: customNames.map(name => ({ apiName: `customEvent:${name}` })) };
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const empty = () => json({ rows: [], rowCount: 0, metadata: { currencyCode: 'USD', timeZone: 'Asia/Seoul' } });
function report(body, rows, responseMetadata = {}) {
  return json({ dimensionHeaders: body.dimensions, metricHeaders: body.metrics,
    rows: rows.map(values => ({ dimensionValues: body.dimensions.map(item => ({ value: values[item.name] })),
      metricValues: body.metrics.map(item => ({ value: values[item.name] })) })), rowCount: rows.length,
    metadata: { currencyCode: 'USD', timeZone: 'Asia/Seoul', ...responseMetadata } });
}
function compatible(body) {
  return { dimensionCompatibilities: body.dimensions.map(item => ({ dimensionMetadata: { apiName: item.name }, compatibility: 'COMPATIBLE' })),
    metricCompatibilities: body.metrics.map(item => ({ metricMetadata: { apiName: item.name }, compatibility: 'COMPATIBLE' })) };
}
function mockReports(handler, meta = metadata, compatibilityHandler = compatible) {
  globalThis.fetch = async (url, options) => {
    if (url.endsWith('/metadata')) return json(meta);
    if (url.endsWith(':checkCompatibility')) return json(compatibilityHandler(JSON.parse(options.body)));
    return await handler(JSON.parse(options.body), url, options) ?? empty();
  };
}
function section(data, id) { return data.sections.find(item => item.id === id); }

test.after(async () => { globalThis.fetch = originalFetch; console.warn = originalWarn; await rm(directory, { recursive: true, force: true }); });

test('invalid property/filter/token fails before any request', async () => {
  globalThis.fetch = () => { throw new Error('must not fetch'); };
  await assert.rejects(loadDashboard(token, '../evil', filters), /속성 ID/);
  await assert.rejects(loadDashboard(token, '123', { ...filters, country: 'KR&x=1' }), /설정/);
  await assert.rejects(loadDashboard('token\r\nInjected: true', '123', filters), AnalyticsAuthError);
});

test('game reports apply mobile-app filters and ad cost uses its explicit linked-account scope', async () => {
  const requests = [];
  mockReports((body, url, options) => {
    requests.push(body);
    assert.ok(url.startsWith('https://analyticsdata.googleapis.com/v1beta/properties/543591366:runReport'));
    assert.equal(options.headers.Authorization, `Bearer ${token}`);
    assert.equal(options.credentials, 'omit');
    assert.equal(options.cache, 'no-store');
    assert.ok(!url.includes(token));
    assert.ok(!options.body.includes(token));
  });
  await loadDashboard(token, '543591366', { days: 28, country: 'TW', platform: 'iOS' });
  assert.ok(requests.length >= 10);
  for (const body of requests) {
    const groups = body.dimensionFilter.andGroup?.expressions.map(item => item.filter) ?? [body.dimensionFilter.filter];
    const values = name => groups.find(item => item.fieldName === name)?.inListFilter.values;
    if (body.metrics.some(item => item.name === 'advertiserAdCost')) {
      assert.deepEqual(values('googleAdsCustomerId'), ['3633238009']);
      assert.equal(values('countryId'), undefined);
      assert.equal(values('operatingSystem'), undefined);
      assert.equal(values('streamId'), undefined);
      continue;
    }
    assert.deepEqual(values('countryId'), ['TW']);
    assert.deepEqual(values('operatingSystem'), ['iOS']);
    assert.deepEqual(values('platform'), ['Android', 'iOS']);
    assert.deepEqual(values('streamId'), ['15171192886', '15315772233']);
    if (!body.cohortSpec) assert.deepEqual(body.dateRanges, [{ startDate: '28daysAgo', endDate: 'yesterday' }]);
  }
});

test('unregistered custom dimensions do not block standard reports or turn into zeros', async () => {
  let queriedCustom = false;
  mockReports(body => { if (body.dimensions.some(item => item.name.startsWith('customEvent:'))) queriedCustom = true; }, { dimensions: [] });
  const data = await loadDashboard(token, '123', filters);
  assert.equal(queriedCustom, false);
  assert.equal(section(data, 'overview').status, 'empty');
  assert.equal(section(data, 'tutorial').status, 'unavailable');
  assert.deepEqual(section(data, 'tutorial').rows, []);
  assert.match(section(data, 'tutorial').notes.join(' '), /quest_id/);
  assert.equal(section(data, 'ad_costs').status, 'unavailable');
});

test('period-distinct users stay independent of daily sums; null and unknown revenue remain unknown', async () => {
  mockReports(body => {
    if (body.dimensions.length === 0) return report(body, [{ activeUsers: '10', newUsers: '', sessions: '15', userEngagementDuration: 'bad', totalAdRevenue: '0', purchaseRevenue: '0', totalPurchasers: '0' }]);
    if (body.dimensions[0]?.name === 'date') return report(body, [
      { date: '20260901', activeUsers: '8', newUsers: '2', sessions: '10', totalAdRevenue: '0', purchaseRevenue: '0' },
      { date: '20260902', activeUsers: '9', newUsers: '3', sessions: '11', totalAdRevenue: '0', purchaseRevenue: '0' },
    ]);
  });
  const data = await loadDashboard(token, '123', filters);
  const overview = section(data, 'overview').rows[0];
  assert.equal(overview.activeUsers, 10);
  assert.equal(overview.newUsers, null);
  assert.equal(overview.userEngagementDuration, null);
  assert.equal(overview.totalAdRevenue, null);
  assert.equal(overview.purchaseRevenue, null);
  assert.equal(overview.totalPurchasers, null);
  assert.equal(section(data, 'daily').rows[0].date, '2026-09-01');
  assert.equal(data.currency, 'USD');
});

test('observed revenue events permit real zero; denied revenue remains null and metadata limits visible', async () => {
  mockReports(body => {
    if (body.dimensions.length === 0) return report(body, [{ activeUsers: '10', totalAdRevenue: '0', purchaseRevenue: '99', totalPurchasers: '0' }], {
      currencyCode: 'JPY', subjectToThresholding: true, dataLossFromOtherRow: true,
      samplingMetadatas: [{ samplesReadCount: '20', samplingSpaceSize: '100' }],
      schemaRestrictionResponse: { activeMetricRestrictions: [{ metricName: 'purchaseRevenue' }] },
    });
    if (body.dimensions.length === 1 && body.dimensions[0].name === 'eventName') return report(body, [
      { eventName: 'ad_impression', eventCount: '3', totalUsers: '2' }, { eventName: 'in_app_purchase', eventCount: '1', totalUsers: '1' },
    ]);
  });
  const data = await loadDashboard(token, '123', filters);
  const overview = section(data, 'overview');
  assert.equal(overview.rows[0].totalAdRevenue, 0);
  assert.equal(overview.rows[0].purchaseRevenue, null);
  assert.equal(overview.rows[0].totalPurchasers, 0);
  assert.match(overview.notes.join(' '), /임계값/);
  assert.match(overview.notes.join(' '), /표본/);
  assert.match(overview.notes.join(' '), /\(other\)/);
  assert.match(overview.notes.join(' '), /접근이 제한/);
  assert.equal(data.currency, 'JPY');
});

test('mature daily first-session cohorts calculate D1/D7 only against matching denominators', async () => {
  mockReports(body => {
    if (!body.cohortSpec) return;
    assert.equal(body.dateRanges, undefined);
    assert.deepEqual(body.cohortSpec.cohortsRange, { granularity: 'DAILY', startOffset: 0, endOffset: 7 });
    assert.ok(body.cohortSpec.cohorts.every(item => item.dimension === 'firstSessionDate'
      && /^\d{4}-\d{2}-\d{2}$/.test(item.dateRange.startDate) && item.dateRange.startDate === item.dateRange.endDate));
    return report(body, [
      { cohort: 'new_14_days_ago', cohortNthDay: '0000', cohortActiveUsers: '20', cohortTotalUsers: '20' },
      { cohort: 'new_14_days_ago', cohortNthDay: '0001', cohortActiveUsers: '10', cohortTotalUsers: '20' },
      { cohort: 'new_14_days_ago', cohortNthDay: '0007', cohortActiveUsers: '0', cohortTotalUsers: '20' },
      { cohort: 'new_13_days_ago', cohortNthDay: '0001', cohortActiveUsers: '2', cohortTotalUsers: '10' },
      { cohort: 'new_12_days_ago', cohortNthDay: '0001', cohortActiveUsers: '2', cohortTotalUsers: '10' },
      { cohort: 'new_12_days_ago', cohortNthDay: '0007', cohortActiveUsers: '2', cohortTotalUsers: '20' },
    ]);
  });
  const data = await loadDashboard(token, '123', filters);
  const rows = section(data, 'retention').rows;
  assert.equal(rows[0].d1Retention, 0.5);
  assert.equal(rows[0].d7Retention, 0);
  assert.equal(rows[1].d1Retention, 0.2);
  assert.equal(rows[1].d7Retention, null);
  assert.equal(rows[2].cohortTotalUsers, null);
  assert.equal(rows[2].d1Retention, null);
  assert.equal(rows[2].d7Retention, null);
});

test('one incompatible report and one rate limit preserve other sections; raw errors never escape', async () => {
  mockReports(body => {
    if (body.dimensions[0]?.name === 'countryId') return json({ error: { message: `server secret ${token}` } }, 400);
    if (body.dimensions[0]?.name === 'date') return json({ error: { message: `quota ${token}` } }, 429);
    if (body.dimensions.length === 0) return report(body, [{ activeUsers: '3' }]);
  });
  const data = await loadDashboard(token, '123', filters);
  assert.equal(section(data, 'overview').status, 'ready');
  assert.equal(section(data, 'countries').status, 'error');
  assert.equal(section(data, 'daily').status, 'error');
  assert.match(section(data, 'daily').error, /한도/);
  assert.ok(!JSON.stringify(data).includes(token));
});

test('auth expiry propagates instead of masquerading as an empty dashboard', async () => {
  globalThis.fetch = async () => json({}, 401);
  await assert.rejects(loadDashboard(token, '123', filters), AnalyticsAuthError);
  mockReports(body => body.dimensions.length === 0 ? json({}, 403) : undefined);
  await assert.rejects(loadDashboard(token, '123', filters), /권한/);
});

test('request concurrency stays bounded and pagination stops with a truncation note', async () => {
  let inFlight = 0, maxInFlight = 0;
  const eventOffsets = [];
  globalThis.fetch = async (url, options) => {
    if (url.endsWith('/metadata')) return json(metadata);
    inFlight++;
    maxInFlight = Math.max(maxInFlight, inFlight);
    await new Promise(resolve => setTimeout(resolve, 2));
    inFlight--;
    const body = JSON.parse(options.body);
    if (body.dimensions.length === 1 && body.dimensions[0].name === 'eventName') {
      eventOffsets.push(body.offset);
      return json({ dimensionHeaders: body.dimensions, metricHeaders: body.metrics,
        rows: Array.from({ length: 250 }, (_, index) => ({ dimensionValues: [{ value: `event_${Number(body.offset) + index}` }], metricValues: [{ value: '1' }, { value: '1' }] })), rowCount: 1200 });
    }
    return empty();
  };
  const data = await loadDashboard(token, '123', filters);
  assert.ok(maxInFlight <= 3);
  assert.deepEqual(eventOffsets, ['0', '250', '500', '750']);
  assert.equal(section(data, 'events').rows.length, 1000);
  assert.match(section(data, 'events').notes.join(' '), /표시 한도/);
});

test('cancelled request does not return stale results', async () => {
  const controller = new AbortController();
  globalThis.fetch = async (_url, options) => new Promise((_resolve, reject) => {
    options.signal.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')), { once: true });
    queueMicrotask(() => controller.abort());
  });
  await assert.rejects(loadDashboard(token, '123', filters, controller.signal), { name: 'AbortError' });
});

test('linked Google Ads cost stays separate from in-game ad revenue and does not invent CPI/ROAS', async () => {
  let checkedShape;
  mockReports(body => {
    if (body.dimensions[0]?.name === 'googleAdsCustomerId') {
      assert.deepEqual(body.dimensionFilter, checkedShape.dimensionFilter);
      assert.deepEqual(body.metrics.map(item => item.name), ['advertiserAdCost', 'advertiserAdClicks', 'advertiserAdImpressions']);
      assert.deepEqual(body.dateRanges, [{ startDate: '28daysAgo', endDate: 'yesterday' }]);
      return report(body, [{ googleAdsCustomerId: '363-323-8009', googleAdsAccountName: 'R Games', googleAdsCampaignId: '111111', googleAdsCampaignName: 'Hunter Tower iOS',
        advertiserAdCost: '32000', advertiserAdClicks: '120', advertiserAdImpressions: '3000' }], { currencyCode: 'KRW' });
    }
  }, metadata, body => { checkedShape = body; return compatible(body); });
  const data = await loadDashboard(token, '543591366', { days: 28, country: 'KR', platform: 'iOS' });
  const costs = section(data, 'ad_costs');
  assert.equal(data.sections.filter(item => item.id === 'ad_costs').length, 1);
  assert.equal(costs.status, 'ready');
  assert.equal(costs.rows[0].advertiserAdCost, 32000);
  assert.equal(costs.rows[0].advertiserAdClicks, 120);
  assert.equal(costs.rows[0].advertiserAdImpressions, 3000);
  assert.ok(!costs.columns.some(item => /cpi|roas|newUsers|totalAdRevenue/i.test(item.key)));
  assert.match(costs.notes.join(' '), /CPI를 계산하지/);
  assert.match(costs.notes.join(' '), /ROAS를 계산하지/);
  assert.equal(checkedShape.dateRanges, undefined);
  assert.equal(checkedShape.dimensionFilter.filter.fieldName, 'googleAdsCustomerId');
  assert.deepEqual(checkedShape.dimensionFilter.filter.inListFilter.values, ['3633238009']);
  assert.match(costs.notes.join(' '), /국가·OS 필터는 적용되지 않습니다/);
});

test('unlinked zero cost is unavailable while an identified linked campaign can report a real zero', async () => {
  let identified = false;
  mockReports(body => body.dimensions[0]?.name === 'googleAdsCustomerId' ? report(body, [{
    googleAdsCustomerId: identified ? '3633238009' : '(not set)', googleAdsAccountName: identified ? 'R Games' : '(not set)',
    googleAdsCampaignId: identified ? '111111' : '(not set)', googleAdsCampaignName: identified ? 'Hunter Tower' : '(not set)',
    advertiserAdCost: '0', advertiserAdClicks: '0', advertiserAdImpressions: '0',
  }]) : undefined);
  const unlinked = section(await loadDashboard(token, '543591366', filters), 'ad_costs');
  assert.equal(unlinked.status, 'unavailable');
  assert.deepEqual(unlinked.rows, []);
  assert.match(unlinked.notes.join(' '), /캠페인을 식별하지 못해/);
  identified = true;
  const linked = section(await loadDashboard(token, '543591366', filters), 'ad_costs');
  assert.equal(linked.status, 'ready');
  assert.equal(linked.rows[0].advertiserAdCost, 0);
});

test('cost access restrictions never turn hidden spend into zero', async () => {
  mockReports(body => body.dimensions[0]?.name === 'googleAdsCustomerId' ? report(body, [{
    googleAdsCustomerId: '3633238009', googleAdsAccountName: 'R Games', googleAdsCampaignId: '111111', googleAdsCampaignName: 'Hunter Tower',
    advertiserAdCost: '0', advertiserAdClicks: '100', advertiserAdImpressions: '2000',
  }], { schemaRestrictionResponse: { activeMetricRestrictions: [{ metricName: 'advertiserAdCost' }] } }) : undefined);
  const costs = section(await loadDashboard(token, '543591366', filters), 'ad_costs');
  assert.equal(costs.status, 'unavailable');
  assert.equal(costs.rows[0].advertiserAdCost, null);
  assert.equal(costs.rows[0].advertiserAdClicks, 100);
  assert.match(costs.notes.join(' '), /비용 데이터 접근 제한/);
});

test('incompatible Google Ads scope is not retried with broader filters', async () => {
  let costQueries = 0;
  mockReports(body => { if (body.dimensions[0]?.name === 'googleAdsCustomerId') costQueries++; }, metadata, body => {
    const response = compatible(body);
    response.metricCompatibilities[0].compatibility = 'INCOMPATIBLE';
    return response;
  });
  const data = await loadDashboard(token, '543591366', { ...filters, country: 'JP' });
  assert.equal(costQueries, 0);
  assert.equal(section(data, 'ad_costs').status, 'unavailable');
  assert.match(section(data, 'ad_costs').notes.join(' '), /호환성/);
  assert.equal(section(data, 'overview').status, 'empty');
});

test('cost query failure remains local to cost section', async () => {
  mockReports(body => {
    if (body.dimensions[0]?.name === 'googleAdsCustomerId') return json({ error: { message: token } }, 400);
    if (body.dimensions.length === 0) return report(body, [{ activeUsers: '3' }]);
  });
  const data = await loadDashboard(token, '543591366', filters);
  assert.equal(section(data, 'ad_costs').status, 'unavailable');
  assert.equal(section(data, 'overview').status, 'ready');
  assert.ok(!JSON.stringify(data).includes(token));
});

test('400 diagnostics reveal API validation reason without tokens, request bodies, or arbitrary response fields', async () => {
  const warnings = [];
  console.warn = (...args) => warnings.push(args.join(' '));
  try {
    mockReports(body => body.cohortSpec ? json({ error: {
      message: `Invalid cohort date: expected YYYY-MM-DD. token=${token} Bearer other-secret ya29.other-secret eyJheader.payload.signature access_token=yet-another-secret`,
      details: [{ arbitraryPrivateField: 'must-never-appear' }],
    } }, 400) : undefined);
    await loadDashboard(token, '123', filters);
    assert.equal(warnings.length, 1);
    assert.match(warnings[0], /cohort/);
    assert.match(warnings[0], /expected YYYY-MM-DD/);
    for (const privateValue of [token, 'other-secret', 'yet-another-secret', 'eyJheader.payload.signature', 'must-never-appear']) {
      assert.ok(!warnings[0].includes(privateValue), privateValue);
    }
    assert.ok(warnings[0].length <= 900);
  } finally { console.warn = originalWarn; }
});

test('cohort dates use the GA4 property calendar across a UTC day boundary', async () => {
  const RealDate = Date;
  const instant = RealDate.UTC(2026, 8, 9, 16, 30); // Sep 10 in the property's UTC+9 calendar.
  globalThis.Date = class extends RealDate {
    constructor(value) { super(arguments.length ? value : instant); }
    static now() { return instant; }
  };
  let cohortRequest;
  try {
    mockReports(body => {
      if (body.cohortSpec) { cohortRequest = body; return empty(); }
      return report(body, [], { timeZone: 'Etc/GMT-9' });
    });
    await loadDashboard(token, '123', filters);
    assert.equal(cohortRequest.cohortSpec.cohorts[0].dateRange.startDate, '2026-08-27');
    assert.equal(cohortRequest.cohortSpec.cohorts.at(-1).dateRange.startDate, '2026-09-02');
    assert.equal(cohortRequest.dateRanges, undefined);
  } finally { globalThis.Date = RealDate; }
});

test('missing GA4 time zone never substitutes browser local or UTC cohort dates', async () => {
  let cohortRequests = 0;
  mockReports(body => { if (body.cohortSpec) cohortRequests++; return json({ rows: [], rowCount: 0 }); });
  const data = await loadDashboard(token, '123', filters);
  assert.equal(cohortRequests, 0);
  assert.equal(section(data, 'retention').status, 'unavailable');
  assert.match(section(data, 'retention').notes.join(' '), /시간대/);
});

test('live incompatible Google Ads response explains account-report limitation without suggesting custom dimensions', async () => {
  globalThis.fetch = async (url, options) => {
    if (url.endsWith('/metadata')) return json(metadata);
    if (url.endsWith(':checkCompatibility')) return json({ error: { message: 'The dimensions and metrics are incompatible.' } }, 400);
    return empty();
  };
  const costs = section(await loadDashboard(token, '543591366', filters), 'ad_costs');
  assert.equal(costs.status, 'unavailable');
  assert.match(costs.error, /광고 계정·캠페인/);
  assert.doesNotMatch(costs.error, /맞춤 측정기준/);
});

test('unknown property never borrows Hunter Tower advertising account configuration', async () => {
  let compatibilityRequests = 0, costRequests = 0;
  mockReports(body => { if (body.metrics.some(item => item.name === 'advertiserAdCost')) costRequests++; }, metadata,
    body => { compatibilityRequests++; return compatible(body); });
  const data = await loadDashboard(token, '987654321', filters);
  assert.equal(costRequests, 0);
  assert.equal(compatibilityRequests, 0);
  assert.equal(section(data, 'ad_costs').status, 'unavailable');
  assert.match(section(data, 'ad_costs').notes.join(' '), /이 속성/);
});

test('cost response rows belonging to another account never enter the dashboard', async () => {
  mockReports(body => body.dimensions[0]?.name === 'googleAdsCustomerId' ? report(body, [
    { googleAdsCustomerId: '2020972848', googleAdsAccountName: 'Previous account', googleAdsCampaignId: '222222', googleAdsCampaignName: 'Previous campaign', advertiserAdCost: '9000' },
    { googleAdsCustomerId: '3633238009', googleAdsAccountName: 'R Games', googleAdsCampaignId: '111111', googleAdsCampaignName: 'Hunter Tower', advertiserAdCost: '1000' },
  ]) : undefined);
  const costs = section(await loadDashboard(token, '543591366', filters), 'ad_costs');
  assert.equal(costs.status, 'ready');
  assert.equal(costs.rows.length, 1);
  assert.equal(costs.rows[0].googleAdsCustomerId, '3633238009');
  assert.equal(costs.rows[0].advertiserAdCost, 1000);
});

test('verified linked account with a genuinely empty cost response reports no collected rows, not a missing link', async () => {
  mockReports(() => empty());
  const costs = section(await loadDashboard(token, '543591366', filters), 'ad_costs');
  assert.equal(costs.status, 'empty');
  assert.deepEqual(costs.rows, []);
  assert.match(costs.notes.join(' '), /연결은 확인/);
  assert.match(costs.notes.join(' '), /집행·자동 태그·처리 지연/);
  assert.match(costs.notes.join(' '), /0원/);
  assert.doesNotMatch(costs.notes.join(' '), /제품 연결|Google Ads 연결,/);
});
