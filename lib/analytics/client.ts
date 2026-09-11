import type { DashboardData, DashboardFilters, ReportSection } from './types';

// Only the Google user access token received after consent enters this module.
// Nothing is persisted, logged, or sent to the public website's server.
const API = 'https://analyticsdata.googleapis.com/v1beta';
const PAGE_SIZE = 250;
const MAX_ROWS = 1000;
const CONCURRENCY = 3;
const TIMEOUT_MS = 25_000;
const HUNTER_TOWER_PROPERTY_ID = '543591366';
const HUNTER_TOWER_STREAM_IDS = ['15171192886', '15315772233'];
// Linked in Firebase/GA4 as R Games on 2026-09-11. Replaces 202-097-2848.
const HUNTER_TOWER_GOOGLE_ADS_CUSTOMER_ID = '3633238009';
const HUNTER_TOWER_GOOGLE_ADS_CUSTOMER_ID_LABEL = '363-323-8009';

type Column = ReportSection['columns'][number];
type DataRow = ReportSection['rows'][number];
type Filter = { filter: { fieldName: string; inListFilter: { values: string[]; caseSensitive: boolean } } }
  | { andGroup: { expressions: Filter[] } };
type ReportBody = {
  dimensions: { name: string }[];
  metrics: { name: string }[];
  dimensionFilter: Filter;
  dateRanges?: { startDate: string; endDate: string }[];
  cohortSpec?: {
    cohorts: { name: string; dimension: string; dateRange: { startDate: string; endDate: string } }[];
    cohortsRange: { granularity: 'DAILY'; startOffset: number; endOffset: number };
  };
  orderBys?: ({ dimension: { dimensionName: string }; desc?: boolean } | { metric: { metricName: string }; desc?: boolean })[];
  keepEmptyRows?: boolean;
  limit?: string;
  offset?: string;
};
type ResponseMetadata = {
  currencyCode?: string;
  timeZone?: string;
  emptyReason?: string;
  subjectToThresholding?: boolean;
  dataLossFromOtherRow?: boolean;
  samplingMetadatas?: { samplesReadCount?: string; samplingSpaceSize?: string }[];
  schemaRestrictionResponse?: { activeMetricRestrictions?: { metricName?: string }[] };
};
type ReportResponse = {
  dimensionHeaders?: { name: string }[];
  metricHeaders?: { name: string }[];
  rows?: { dimensionValues?: { value?: string }[]; metricValues?: { value?: string }[] }[];
  rowCount?: number;
  metadata?: ResponseMetadata;
};
type Definition = {
  id: string;
  title: string;
  description: string;
  columns: Column[];
  dimensions: string[];
  metrics: string[];
  events?: string[];
  notes?: string[];
  sort?: string;
};
type LoadedSection = { section: ReportSection; currency: string; timeZone?: string };

export class AnalyticsAuthError extends Error {
  constructor(message = 'Google 연결이 만료되었거나 GA4 조회 권한이 없습니다. 다시 연결하고 속성의 조회 권한을 확인하세요.') {
    super(message);
    this.name = 'AnalyticsAuthError';
  }
}

class ReportError extends Error {}

const dim = (key: string, label: string): Column => ({ key, label });
const metric = (key: string, label: string, format: Column['format'] = 'number'): Column => ({ key, label, format });
const countColumns = [metric('eventCount', '발생 횟수'), metric('totalUsers', '발생 사용자')];
const custom = (name: string) => `customEvent:${name}`;
const customColumn = (name: string, label: string) => dim(custom(name), label);
const diagnosticEvents = [
  'ht_operation_error', 'iap_receipt_invalid', 'iap_pending_unbound', 'iap_pending_verify_24h',
  'iap_confirmed_regrant', 'clock_tamper_reset', 'clock_tamper_deferred', 'ht_ranking_reject', 'ad_click_spam_block',
];

const definitions: Definition[] = [
  {
    id: 'overview', title: '전체 운영 지표', description: '오늘을 제외한 선택 기간의 Android·iOS 앱 집계입니다.',
    dimensions: [],
    metrics: ['activeUsers', 'newUsers', 'sessions', 'userEngagementDuration', 'totalAdRevenue', 'purchaseRevenue', 'totalPurchasers'],
    columns: [metric('activeUsers', '기간 활성 사용자'), metric('newUsers', '신규 사용자'), metric('sessions', '세션'),
      metric('userEngagementDuration', '총 플레이 시간', 'seconds'), metric('totalAdRevenue', '광고 수익', 'currency'),
      metric('purchaseRevenue', '결제 수익', 'currency'), metric('totalPurchasers', '결제 사용자')],
    notes: ['기간 활성 사용자는 기간 내 중복을 제거합니다. 일별 활성 사용자를 더한 값이 아닙니다.',
      '플레이 시간은 앱이 전경에서 사용된 시간입니다. 수익은 GA4 수집값이며 정산 금액과 차이가 날 수 있습니다.'],
  },
  {
    id: 'daily', title: '일별 추이', description: '날짜는 GA4 속성 시간대를 따릅니다.', dimensions: ['date'],
    metrics: ['activeUsers', 'newUsers', 'sessions', 'totalAdRevenue', 'purchaseRevenue'], sort: 'date',
    columns: [dim('date', '날짜'), metric('activeUsers', 'DAU'), metric('newUsers', '신규 사용자'), metric('sessions', '세션'),
      metric('totalAdRevenue', '광고 수익', 'currency'), metric('purchaseRevenue', '결제 수익', 'currency')],
  },
  {
    id: 'countries', title: '국가·플랫폼 비교', description: '국가별 유입, 이용, 수익을 같은 기간으로 비교합니다.',
    dimensions: ['countryId', 'country', 'operatingSystem'], metrics: ['activeUsers', 'newUsers', 'sessions', 'totalAdRevenue', 'purchaseRevenue'],
    columns: [dim('countryId', '국가 코드'), dim('country', '국가'), dim('operatingSystem', '플랫폼'), metric('activeUsers', '활성 사용자'),
      metric('newUsers', '신규 사용자'), metric('sessions', '세션'), metric('totalAdRevenue', '광고 수익', 'currency'), metric('purchaseRevenue', '결제 수익', 'currency')],
    notes: ['국가는 활동 시점의 위치 기준입니다. 한 사용자가 여러 국가 행에 포함될 수 있습니다.'],
  },
  {
    id: 'acquisition', title: '첫 유입 경로', description: '최초 유입 소스·매체·캠페인별 사용자와 조회 기간의 수익입니다.',
    dimensions: ['firstUserSource', 'firstUserMedium', 'firstUserCampaignName'], metrics: ['newUsers', 'totalUsers', 'totalAdRevenue', 'purchaseRevenue'],
    columns: [dim('firstUserSource', '소스'), dim('firstUserMedium', '매체'), dim('firstUserCampaignName', '캠페인'),
      metric('newUsers', '신규 사용자'), metric('totalUsers', '전체 사용자'), metric('totalAdRevenue', '광고 수익', 'currency'), metric('purchaseRevenue', '결제 수익', 'currency')],
    notes: ['설치 귀속 연동이 없으면 캠페인이 (not set) 또는 직접 유입으로 보일 수 있습니다. 광고 플랫폼의 성과와 일치한다고 가정하지 않습니다.',
      '수익은 조회 기간의 수익입니다. 해당 기간에 설치한 사용자의 평생 가치(LTV)가 아닙니다.'],
  },
  {
    id: 'events', title: '수집 확인', description: '실제로 도착한 이벤트의 횟수와 사용자 수입니다.',
    dimensions: ['eventName'], metrics: ['eventCount', 'totalUsers'], columns: [dim('eventName', '이벤트'), ...countColumns],
    notes: ['이벤트가 없으면 미수집, 미발생, 처리 지연을 구분할 수 없습니다. 0원·0%의 근거로 사용하지 않습니다.',
      '최근 데이터와 새 맞춤 측정기준은 처리 지연이 있습니다. 실기기 검증은 Firebase DebugView에서 확인합니다.'],
  },
  {
    id: 'versions', title: '버전별 운영 이상', description: '진단 이벤트가 발생한 앱 버전을 확인합니다.',
    dimensions: ['appVersion', 'eventName'], metrics: ['eventCount', 'totalUsers'], events: diagnosticEvents,
    columns: [dim('appVersion', '앱 버전'), dim('eventName', '이벤트'), ...countColumns],
    notes: ['발생 횟수입니다. 버전별 오류율 또는 크래시 없는 사용자 비율이 아닙니다. 크래시 상세는 Firebase Crashlytics에서 확인합니다.'],
  },
  {
    id: 'tutorial', title: '튜토리얼 단계', description: '퀘스트별 시작과 보상 수령을 확인합니다.',
    dimensions: [custom('quest_id'), 'eventName'], metrics: ['eventCount', 'totalUsers'],
    events: ['ht_tutorial_step_start', 'tutorial_complete'],
    columns: [customColumn('quest_id', '퀘스트'), dim('eventName', '단계 이벤트'), ...countColumns],
    notes: ['tutorial_complete는 각 퀘스트의 보상 수령입니다. 전체 튜토리얼 완료를 뜻하지 않습니다.',
      '시작·완료 사용자는 같은 유입 코호트가 아닙니다. 행 간 비율을 완료율이나 이탈률로 해석하지 않습니다.'],
  },
  {
    id: 'progression', title: '성장 구간', description: '플레이 중 관측된 층·헌터·환생 구간을 확인합니다.',
    dimensions: [custom('floor_band'), custom('hunter_band'), custom('prestige_band')], metrics: ['eventCount', 'totalUsers'],
    events: ['ht_progress_snapshot'],
    columns: [customColumn('floor_band', '최고 층 구간'), customColumn('hunter_band', '역대 일반 헌터 해금 단계'),
      customColumn('prestige_band', '환생 횟수 구간'), metric('eventCount', '스냅샷 수'), metric('totalUsers', '관측 사용자')],
    notes: ['헌터 구간은 역대 최고 일반 헌터 해금 순서입니다. 유료 헌터와 현재 편성 인원은 포함하지 않으며 계승 후에도 유지됩니다.',
      '사용자가 기간 중 여러 구간에 포함될 수 있습니다. 현재 상태의 전수 분포나 단계별 이탈률이 아닙니다.'],
  },
  {
    id: 'ad_flow', title: '보상형 광고 흐름', description: '광고 위치별 요청·보상·실패를 확인합니다.',
    dimensions: [custom('placement'), custom('ad_format'), custom('stage'), custom('reason')], metrics: ['eventCount', 'totalUsers'], events: ['ht_ad_flow'],
    columns: [customColumn('placement', '위치'), customColumn('ad_format', '형식'), customColumn('stage', '단계'), customColumn('reason', '사유'), ...countColumns],
    notes: ['단계별 발생 집계입니다. 요청 ID를 연결한 전환 퍼널이 아닙니다. 광고 수익은 ad_impression 수집을 별도로 확인합니다.'],
  },
  {
    id: 'iap_flow', title: '유료 결제 처리', description: '상품별 구매 요청과 지급 결과를 확인합니다.',
    dimensions: [custom('product_id'), custom('store'), custom('stage'), custom('reason')], metrics: ['eventCount', 'totalUsers'], events: ['ht_iap_flow'],
    columns: [customColumn('product_id', '상품'), customColumn('store', '스토어'), customColumn('stage', '단계'), customColumn('reason', '사유'), ...countColumns],
    notes: ['처리 단계 이벤트는 결제 매출이 아닙니다. 매출은 GA4의 표준 구매 이벤트로 조회합니다.'],
  },
  {
    id: 'economy', title: '주요 재화 활동', description: '방치 보상 수령 등 주요 재화 활동을 구간 단위로 확인합니다.',
    dimensions: [custom('action'), custom('resource_type'), custom('amount_band'), custom('balance_band'), custom('source')],
    metrics: ['eventCount', 'totalUsers'], events: ['ht_economy_action'],
    columns: [customColumn('action', '행동'), customColumn('resource_type', '재화'), customColumn('amount_band', '변동량 구간'),
      customColumn('balance_band', '잔액 구간'), customColumn('source', '출처'), ...countColumns],
    notes: ['큰 재화 값은 구간으로 수집합니다. 전 거래 원장이나 총 발행량·소각량이 아닙니다.'],
  },
  {
    id: 'operation_errors', title: '저장·운영 오류', description: '저장 등 주요 작업의 실패 사유를 확인합니다.',
    dimensions: [custom('operation'), custom('reason'), 'appVersion'], metrics: ['eventCount', 'totalUsers'], events: ['ht_operation_error'],
    columns: [customColumn('operation', '작업'), customColumn('reason', '사유'), dim('appVersion', '앱 버전'), ...countColumns],
    notes: ['반복 오류는 수집 제한이 적용될 수 있습니다. 보고되지 않은 오류까지 없다는 의미는 아닙니다.'],
  },
];

function listFilter(fieldName: string, values: string[]): Filter {
  return { filter: { fieldName, inListFilter: { values, caseSensitive: true } } };
}

function dimensionFilter(filters: DashboardFilters, propertyId: string, events?: string[]): Filter {
  const expressions = [listFilter('operatingSystem', filters.platform === 'all' ? ['Android', 'iOS'] : [filters.platform])];
  // platform excludes mobile browsers: operatingSystem alone would include them.
  expressions.push(listFilter('platform', ['Android', 'iOS']));
  if (propertyId === HUNTER_TOWER_PROPERTY_ID) expressions.push(listFilter('streamId', HUNTER_TOWER_STREAM_IDS));
  if (filters.country) expressions.push(listFilter('countryId', [filters.country]));
  if (events) expressions.push(listFilter('eventName', events));
  return { andGroup: { expressions } };
}

function safeNumber(value: string | undefined): number | null {
  if (value === undefined || value.trim() === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function isAbort(error: unknown): boolean {
  return error instanceof Error && error.name === 'AbortError';
}

async function warnValidationFailure(response: Response, path: string, body: ReportBody | undefined, accessToken: string): Promise<string | undefined> {
  try {
    const payload = await response.json() as { error?: { message?: unknown } };
    if (typeof payload?.error?.message !== 'string') return;
    const message = payload.error.message.split(accessToken).join('[redacted]')
      .replace(/\bBearer\s+\S+/gi, 'Bearer [redacted]')
      .replace(/\bya29\.[A-Za-z0-9._~-]+/g, '[redacted]')
      .replace(/\beyJ[A-Za-z0-9_-]*\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, '[redacted]')
      .replace(/\b(access_token|refresh_token|client_secret|authorization)\s*[:=]\s*(?:"[^"]*"|'[^']*'|[^\s,]+)/gi, '$1=[redacted]')
      .replace(/[A-Za-z0-9_-]{40,}(?:\.[A-Za-z0-9_-]+)*/g, '[redacted]')
      .replace(/[\r\n\t]+/g, ' ').slice(0, 800);
    const operation = body?.cohortSpec ? 'cohort runReport'
      : path.endsWith(':checkCompatibility') ? 'Google Ads checkCompatibility'
      : body?.dimensions.some(item => item.name === 'googleAdsCustomerId') ? 'Google Ads runReport' : 'runReport';
    // Only bounded API validation text. No tokens, headers, query bodies or response data.
    console.warn(`[GA4] ${operation} HTTP 400: ${message}`);
    return message;
  } catch { /* Diagnostics must never replace the original report failure. */ }
}

async function request<T>(path: string, accessToken: string, body: ReportBody | undefined, signal?: AbortSignal): Promise<T> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  let timedOut = false;
  if (signal?.aborted) controller.abort();
  signal?.addEventListener('abort', abort, { once: true });
  const timer = setTimeout(() => { timedOut = true; controller.abort(); }, TIMEOUT_MS);
  try {
    const response = await fetch(`${API}/${path}`, {
      method: body ? 'POST' : 'GET',
      headers: { Authorization: `Bearer ${accessToken}`, ...(body ? { 'Content-Type': 'application/json' } : {}) },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      credentials: 'omit', cache: 'no-store', referrerPolicy: 'no-referrer',
    });
    if (response.status === 401) throw new AnalyticsAuthError();
    if (response.status === 403) throw new AnalyticsAuthError('GA4 조회가 거부되었습니다. 속성 조회 권한, analytics.readonly 동의, Google Analytics Data API 활성화를 확인하세요.');
    if (response.status === 429) throw new ReportError('GA4 조회 한도에 도달했습니다. 잠시 후 다시 조회하세요.');
    const validationMessage = response.status === 400 ? await warnValidationFailure(response, path, body, accessToken) : undefined;
    if (response.status === 400 && path.endsWith(':checkCompatibility') && validationMessage?.includes('dimensions and metrics are incompatible')) {
      throw new ReportError('현재 GA4 속성에서 광고 계정·캠페인과 비용 지표 조합을 조회할 수 없습니다. 연결된 Google Ads 원본 보고서에서 집행 비용을 확인하세요.');
    }
    if (!response.ok) throw new ReportError(response.status === 400
      ? '현재 속성에서 이 측정기준·지표 조합을 조회할 수 없습니다. 맞춤 측정기준 설정을 확인하세요.'
      : `GA4 조회에 실패했습니다. (HTTP ${response.status})`);
    try { return await response.json() as T; }
    catch { throw new ReportError('GA4 응답을 읽을 수 없습니다. 다시 조회하세요.'); }
  } catch (error) {
    if (signal?.aborted) throw new DOMException('조회가 취소되었습니다.', 'AbortError');
    if (timedOut) throw new ReportError('GA4 응답 시간이 초과되었습니다. 다시 조회하세요.');
    if (error instanceof AnalyticsAuthError || error instanceof ReportError || isAbort(error)) throw error;
    // Do not expose raw server/network messages, request headers, or token values.
    throw new ReportError('네트워크 연결을 확인한 뒤 다시 조회하세요.');
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', abort);
  }
}

function metadataNotes(metadata: ResponseMetadata | undefined): string[] {
  if (!metadata) return [];
  const notes: string[] = [];
  if (metadata.timeZone) notes.push(`집계 시간대: ${metadata.timeZone}`);
  if (metadata.subjectToThresholding) notes.push('개인정보 보호 임계값이 적용되어 일부 소규모 집계가 숨겨질 수 있습니다.');
  if (metadata.dataLossFromOtherRow) notes.push('고유 값이 많아 일부 데이터가 (other)로 묶였습니다.');
  if (metadata.emptyReason) notes.push('GA4가 빈 보고서를 반환했습니다. 데이터 처리 상태와 속성 필터를 확인하세요.');
  if (metadata.samplingMetadatas?.length) notes.push('GA4 표본 데이터가 사용되었습니다. 결과가 전체 이벤트의 정확한 전수 집계는 아닐 수 있습니다.');
  if (metadata.schemaRestrictionResponse?.activeMetricRestrictions?.length) notes.push('현재 계정에서 접근이 제한된 지표는 미확인 값으로 표시합니다.');
  return notes;
}

function decodeRows(response: ReportResponse): DataRow[] {
  const restricted = new Set(response.metadata?.schemaRestrictionResponse?.activeMetricRestrictions?.map(item => item.metricName));
  return (response.rows ?? []).map(row => {
    const result: DataRow = {};
    (response.dimensionHeaders ?? []).forEach((header, index) => {
      const value = row.dimensionValues?.[index]?.value;
      result[header.name] = value === undefined || value === '' ? null : value;
      if (header.name === 'date' && value && /^\d{8}$/.test(value)) result[header.name] = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
    });
    (response.metricHeaders ?? []).forEach((header, index) => {
      result[header.name] = restricted.has(header.name) ? null : safeNumber(row.metricValues?.[index]?.value);
    });
    return result;
  });
}

async function queryRows(accessToken: string, propertyId: string, body: ReportBody, signal?: AbortSignal): Promise<{ rows: DataRow[]; notes: string[]; currency: string; timeZone: string }> {
  const rows: DataRow[] = [];
  const notes = new Set<string>();
  let currency = '';
  let timeZone = '';
  for (let offset = 0; offset < MAX_ROWS; offset += PAGE_SIZE) {
    const response = await request<ReportResponse>(`properties/${propertyId}:runReport`, accessToken,
      { ...body, limit: String(PAGE_SIZE), offset: String(offset) }, signal);
    if (!response || typeof response !== 'object' || (response.rows && !Array.isArray(response.rows))) throw new ReportError('GA4 보고서 형식이 올바르지 않습니다.');
    const page = decodeRows(response);
    rows.push(...page);
    metadataNotes(response.metadata).forEach(note => notes.add(note));
    if (response.metadata?.currencyCode && /^[A-Z]{3}$/.test(response.metadata.currencyCode)) currency = response.metadata.currencyCode;
    if (typeof response.metadata?.timeZone === 'string') timeZone = response.metadata.timeZone;
    if (page.length < PAGE_SIZE || offset + page.length >= (response.rowCount ?? 0)) break;
    if (offset + PAGE_SIZE >= MAX_ROWS) notes.add(`표시 한도 ${MAX_ROWS.toLocaleString('ko-KR')}행에 도달했습니다. 기간·국가·플랫폼을 좁혀 조회하세요. 합계를 계산하지 않습니다.`);
  }
  return { rows, notes: [...notes], currency, timeZone };
}

function emptySection(definition: Pick<Definition, 'id' | 'title' | 'description' | 'columns' | 'notes'>, status: ReportSection['status'], extraNotes: string[] = []): ReportSection {
  return { id: definition.id, title: definition.title, description: definition.description, columns: definition.columns,
    rows: [], status, notes: [...(definition.notes ?? []), ...extraNotes] };
}

async function loadSection(definition: Definition, accessToken: string, propertyId: string, filters: DashboardFilters, availableDimensions: Set<string> | null, signal?: AbortSignal): Promise<LoadedSection> {
  const required = definition.dimensions.filter(name => name.startsWith('customEvent:'));
  const missing = required.filter(name => !availableDimensions?.has(name));
  if (missing.length) return { section: emptySection(definition, 'unavailable', [availableDimensions
    ? `GA4 이벤트 범위 맞춤 측정기준 등록 필요: ${missing.map(name => name.replace('customEvent:', '')).join(', ')}`
    : 'GA4 맞춤 측정기준 목록을 확인하지 못했습니다. 연결 상태를 확인한 뒤 다시 조회하세요.']), currency: '' };
  try {
    const orderBys: ReportBody['orderBys'] = definition.sort
      ? [{ dimension: { dimensionName: definition.sort } }]
      : [{ metric: { metricName: definition.metrics[0] }, desc: true }, ...definition.dimensions.map(name => ({ dimension: { dimensionName: name } }))];
    const result = await queryRows(accessToken, propertyId, {
      dimensions: definition.dimensions.map(name => ({ name })), metrics: definition.metrics.map(name => ({ name })),
      dateRanges: [{ startDate: `${filters.days}daysAgo`, endDate: 'yesterday' }],
      dimensionFilter: dimensionFilter(filters, propertyId, definition.events), orderBys,
    }, signal);
    return { currency: result.currency, timeZone: result.timeZone, section: { ...emptySection(definition, result.rows.length ? 'ready' : 'empty'),
      rows: result.rows, notes: [...(definition.notes ?? []), ...result.notes] } };
  } catch (error) {
    if (error instanceof AnalyticsAuthError || isAbort(error)) throw error;
    return { currency: '', section: { ...emptySection(definition, 'error'), error: error instanceof ReportError ? error.message : '이 보고서를 읽지 못했습니다.' } };
  }
}

const retentionDefinition = {
  id: 'retention', title: 'D1·D7 잔존', description: '최근 D7 관찰이 끝난 7개 일별 신규 유입 코호트입니다. 조회 기간 선택과 별도로 14일 전~8일 전 유입을 봅니다.',
  columns: [dim('cohort', '첫 이용일'), metric('cohortTotalUsers', '코호트 사용자'), metric('d1Users', 'D1 활성 사용자'),
    metric('d1Retention', 'D1 잔존', 'percent'), metric('d7Users', 'D7 활성 사용자'), metric('d7Retention', 'D7 잔존', 'percent')],
  notes: ['GA4 firstSessionDate 코호트의 N일째 활성 사용자 ÷ 해당 코호트 전체 사용자입니다. 국가·플랫폼 필터도 적용됩니다.',
    '오늘의 불완전한 관찰은 제외합니다. 누락·임계값·분모 불일치가 있으면 0% 대신 미확인으로 표시합니다.'],
};

function propertyCalendarDate(timeZone: string, now: Date): Date | null {
  if (!timeZone) return null;
  try {
    const parts = new Intl.DateTimeFormat('en', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
    const part = (type: string) => Number(parts.find(item => item.type === type)?.value);
    const calendar = new Date(Date.UTC(part('year'), part('month') - 1, part('day')));
    return Number.isFinite(calendar.getTime()) ? calendar : null;
  } catch { return null; }
}

async function loadRetention(accessToken: string, propertyId: string, filters: DashboardFilters, timeZone: string, signal?: AbortSignal): Promise<LoadedSection> {
  // The live cohort endpoint rejects NdaysAgo although ordinary DateRange accepts it.
  // Resolve explicit calendar dates using the property's response metadata, never the browser zone.
  const today = propertyCalendarDate(timeZone, new Date());
  if (!today) return { currency: '', section: emptySection(retentionDefinition, 'unavailable', ['GA4 속성 시간대를 확인하지 못해 코호트 날짜를 계산하지 않았습니다. 기본 보고서 조회 상태를 확인하세요.']) };
  const cohorts = Array.from({ length: 7 }, (_, index) => {
    const daysAgo = 14 - index;
    const date = new Date(today.getTime());
    date.setUTCDate(date.getUTCDate() - daysAgo);
    const dateString = date.toISOString().slice(0, 10);
    return { name: `new_${daysAgo}_days_ago`, dimension: 'firstSessionDate', dateRange: { startDate: dateString, endDate: dateString } };
  });
  try {
    const result = await queryRows(accessToken, propertyId, {
      dimensions: [{ name: 'cohort' }, { name: 'cohortNthDay' }], metrics: [{ name: 'cohortActiveUsers' }, { name: 'cohortTotalUsers' }],
      dimensionFilter: dimensionFilter(filters, propertyId),
      cohortSpec: { cohorts, cohortsRange: { granularity: 'DAILY', startOffset: 0, endOffset: 7 } },
      orderBys: [{ dimension: { dimensionName: 'cohort' } }, { dimension: { dimensionName: 'cohortNthDay' } }],
      keepEmptyRows: true,
    }, signal);
    const rows: DataRow[] = [];
    let inconsistent = false;
    for (const cohort of cohorts) {
      const cohortRows = result.rows.filter(row => row.cohort === cohort.name);
      if (!cohortRows.length) continue;
      const totals = cohortRows.map(row => row.cohortTotalUsers).filter((value): value is number => typeof value === 'number' && value > 0);
      const total = totals[0] ?? null;
      const consistent = total !== null && totals.every(value => value === total);
      if (!consistent) inconsistent = true;
      const atDay = (day: number): number | null => {
        const item = cohortRows.find(row => Number(row.cohortNthDay) === day);
        if (!consistent || !item || item.cohortTotalUsers !== total || typeof item.cohortActiveUsers !== 'number'
          || item.cohortActiveUsers < 0 || item.cohortActiveUsers > total) return null;
        return item.cohortActiveUsers;
      };
      const d1Users = atDay(1), d7Users = atDay(7);
      rows.push({ cohort: cohort.dateRange.startDate, cohortTotalUsers: consistent ? total : null,
        d1Users, d1Retention: total && d1Users !== null ? d1Users / total : null,
        d7Users, d7Retention: total && d7Users !== null ? d7Users / total : null });
    }
    return { currency: result.currency, section: { ...emptySection(retentionDefinition, rows.length ? 'ready' : 'empty'), rows,
      notes: [...retentionDefinition.notes, ...result.notes, ...(inconsistent ? ['코호트 분모가 없거나 일별 값이 달라 해당 잔존율을 계산하지 않았습니다.'] : [])] } };
  } catch (error) {
    if (error instanceof AnalyticsAuthError || isAbort(error)) throw error;
    return { currency: '', section: { ...emptySection(retentionDefinition, 'unavailable'), error: error instanceof ReportError ? error.message : '현재 속성에서 코호트 보고서를 조회할 수 없습니다.' } };
  }
}

function markUnverifiedRevenue(sections: ReportSection[]): void {
  const coverage = sections.find(section => section.id === 'events');
  const observed = new Set(coverage?.rows.filter(row => typeof row.eventCount === 'number' && row.eventCount > 0).map(row => row.eventName));
  const adObserved = observed.has('ad_impression');
  const purchaseObserved = ['in_app_purchase', 'purchase', 'ecommerce_purchase', 'app_store_subscription_convert', 'app_store_subscription_renew', 'refund', 'app_store_refund'].some(event => observed.has(event));
  for (const section of sections) {
    let unknownAd = false, unknownPurchase = false;
    for (const row of section.rows) {
      if (!adObserved && row.totalAdRevenue === 0) { row.totalAdRevenue = null; unknownAd = true; }
      if (!purchaseObserved) {
        if (row.purchaseRevenue === 0) { row.purchaseRevenue = null; unknownPurchase = true; }
        if (row.totalPurchasers === 0) { row.totalPurchasers = null; unknownPurchase = true; }
      }
    }
    if (unknownAd) section.notes.push('ad_impression 수집이 확인되지 않아 0으로 반환된 광고 수익을 미확인으로 표시했습니다.');
    if (unknownPurchase) section.notes.push('표준 구매 이벤트 수집이 확인되지 않아 0으로 반환된 결제 지표를 미확인으로 표시했습니다.');
  }
}

// Official metric names and account/campaign dimensions:
// https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema
// Cost has an explicit linked-account scope, separate from game-user filters.
// Check this exact account/campaign combination before requesting advertising cost:
// https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/checkCompatibility
const googleAdsCostDefinition: Definition = {
  id: 'ad_costs', title: 'Google Ads 집행 비용',
  description: `Google Ads ${HUNTER_TOWER_GOOGLE_ADS_CUSTOMER_ID_LABEL} 계정·캠페인 전체의 집행 비용·클릭·노출입니다. 위 날짜 범위만 적용합니다.`,
  dimensions: ['googleAdsCustomerId', 'googleAdsAccountName', 'googleAdsCampaignId', 'googleAdsCampaignName'],
  metrics: ['advertiserAdCost', 'advertiserAdClicks', 'advertiserAdImpressions'],
  columns: [dim('googleAdsCustomerId', '광고 계정 ID'), dim('googleAdsAccountName', '광고 계정'),
    dim('googleAdsCampaignId', '캠페인 ID'), dim('googleAdsCampaignName', '캠페인'),
    metric('advertiserAdCost', '집행 비용', 'currency'), metric('advertiserAdClicks', '광고 클릭'), metric('advertiserAdImpressions', '광고 노출')],
  notes: ['광고비는 연결된 계정·캠페인 전체 기준이며 위 국가·OS 필터는 적용되지 않습니다. 앱 스트림별 비용도 아닙니다.',
    `조회 계정은 GA4 연결이 확인된 ${HUNTER_TOWER_GOOGLE_ADS_CUSTOMER_ID_LABEL}입니다. 게임 내 광고 수익과 별도로 해석하세요.`,
    '설치 전환 연결이 확인되지 않아 CPI를 계산하지 않습니다. 전체 신규 사용자로 광고비를 나누지 않습니다.',
    '매출 귀속 범위·집계 기간 연결이 확인되지 않아 ROAS를 계산하지 않습니다. GA4 처리 지연과 귀속 방식으로 Google Ads 원본 보고서와 차이가 날 수 있습니다.'],
};

type CompatibilityResponse = {
  dimensionCompatibilities?: { dimensionMetadata?: { apiName?: string }; compatibility?: string }[];
  metricCompatibilities?: { metricMetadata?: { apiName?: string }; compatibility?: string }[];
};

async function loadGoogleAdsCosts(accessToken: string, propertyId: string, filters: DashboardFilters, signal?: AbortSignal): Promise<LoadedSection> {
  const definition = googleAdsCostDefinition;
  if (propertyId !== HUNTER_TOWER_PROPERTY_ID) return { currency: '', section: {
    ...emptySection(definition, 'unavailable'), description: '이 속성의 광고 계정 연결 설정이 필요합니다.',
    notes: ['이 속성에 연결된 Google Ads 계정을 확인하지 못했습니다. 헌터 타워 광고 계정의 비용을 다른 속성에 표시하지 않습니다.'],
  } };
  try {
    const shape: ReportBody = {
      dimensions: definition.dimensions.map(name => ({ name })), metrics: definition.metrics.map(name => ({ name })),
      dimensionFilter: listFilter('googleAdsCustomerId', [HUNTER_TOWER_GOOGLE_ADS_CUSTOMER_ID]),
    };
    const compatibility = await request<CompatibilityResponse>(`properties/${propertyId}:checkCompatibility`, accessToken, shape, signal);
    const compatibleDimensions = new Set(compatibility?.dimensionCompatibilities?.filter(item => item.compatibility === 'COMPATIBLE').map(item => item.dimensionMetadata?.apiName));
    const compatibleMetrics = new Set(compatibility?.metricCompatibilities?.filter(item => item.compatibility === 'COMPATIBLE').map(item => item.metricMetadata?.apiName));
    if (!definition.dimensions.every(name => compatibleDimensions.has(name)) || !definition.metrics.every(name => compatibleMetrics.has(name))) {
      return { currency: '', section: emptySection(definition, 'unavailable', ['현재 GA4 속성에서 연결된 광고 계정·캠페인과 비용 지표의 호환성을 확인하지 못했습니다. Google Ads 원본 보고서에서 비용을 확인하세요.']) };
    }
    const result = await queryRows(accessToken, propertyId, {
      ...shape, dateRanges: [{ startDate: `${filters.days}daysAgo`, endDate: 'yesterday' }],
      orderBys: [{ metric: { metricName: 'advertiserAdCost' }, desc: true }, ...definition.dimensions.map(name => ({ dimension: { dimensionName: name } }))],
      keepEmptyRows: true,
    }, signal);
    // Reject unidentified campaigns and any unexpected account rows. Generic
    // advertiser metrics can also contain imported non-Google spend.
    const rows = result.rows.filter(row => typeof row.googleAdsCustomerId === 'string'
      && row.googleAdsCustomerId.replace(/-/g, '') === HUNTER_TOWER_GOOGLE_ADS_CUSTOMER_ID
      && typeof row.googleAdsCampaignId === 'string' && /^\d{1,20}$/.test(row.googleAdsCampaignId)
      && row.googleAdsCampaignId !== '0');
    const notes = [...(definition.notes ?? []), ...result.notes];
    if (rows.length !== result.rows.length) notes.push('대상 광고 계정과 일치하지 않거나 캠페인 ID를 확인할 수 없는 행은 제외했습니다. (not set) 비용을 실제 캠페인 비용으로 취급하지 않습니다.');
    if (!result.rows.length) notes.push('Google Ads 계정 연결은 확인되었지만 선택 기간에 조회된 비용 행이 없습니다. 해당 기간의 캠페인 집행·자동 태그·처리 지연을 확인하세요. 빈 응답을 실제 집행 비용 0원으로 단정하지 않습니다.');
    else if (!rows.length) notes.push('응답에서 대상 광고 계정의 캠페인을 식별하지 못해 집행 비용을 확인할 수 없습니다. 식별되지 않은 비용을 0원으로 단정하지 않습니다.');
    const visibleCost = rows.some(row => typeof row.advertiserAdCost === 'number');
    if (rows.length && !visibleCost) notes.push('현재 계정에서 집행 비용을 확인할 수 없습니다. GA4의 비용 데이터 접근 제한을 확인하세요.');
    const status = !result.rows.length ? 'empty' : rows.length && visibleCost ? 'ready' : 'unavailable';
    return { currency: result.currency, section: { ...emptySection(definition, status), rows, notes } };
  } catch (error) {
    if (error instanceof AnalyticsAuthError || isAbort(error)) throw error;
    return { currency: '', section: { ...emptySection(definition, 'unavailable', ['GA4 관리 > 제품 연결 > Google Ads 연결 및 비용 데이터 조회 권한을 확인하세요.']),
      error: error instanceof ReportError ? error.message : 'Google Ads 집행 비용을 조회할 수 없습니다.' } };
  }
}

/** Read aggregate reports using the signed-in user's GA4 permissions. No persistence. */
export async function loadDashboard(accessToken: string, propertyId: string, filters: DashboardFilters, signal?: AbortSignal): Promise<DashboardData> {
  if (!/^\d{1,20}$/.test(propertyId)) throw new Error('GA4 속성 ID는 숫자로 입력하세요.');
  if (!accessToken || /[\r\n]/.test(accessToken)) throw new AnalyticsAuthError();
  if (![7, 28, 90].includes(filters.days) || !['all', 'Android', 'iOS'].includes(filters.platform)
    || (filters.country !== '' && !/^[A-Z]{2}$/.test(filters.country))) throw new Error('조회 기간·국가·플랫폼 설정을 확인하세요.');
  if (signal?.aborted) throw new DOMException('조회가 취소되었습니다.', 'AbortError');

  const runController = new AbortController();
  const abort = () => runController.abort();
  signal?.addEventListener('abort', abort, { once: true });
  try {
    let availableDimensions: Set<string> | null = null;
    try {
      const metadata = await request<{ dimensions?: { apiName?: string }[] }>(`properties/${propertyId}/metadata`, accessToken, undefined, runController.signal);
      if (Array.isArray(metadata?.dimensions)) availableDimensions = new Set(metadata.dimensions.map(item => item.apiName).filter((name): name is string => typeof name === 'string'));
    } catch (error) {
      if (error instanceof AnalyticsAuthError || isAbort(error)) throw error;
    }
    const jobs = [
      ...definitions.map(definition => () => loadSection(definition, accessToken, propertyId, filters, availableDimensions, runController.signal)),
      () => loadGoogleAdsCosts(accessToken, propertyId, filters, runController.signal),
    ];
    const results: LoadedSection[] = new Array(jobs.length);
    let next = 0;
    const workers = Array.from({ length: CONCURRENCY }, async () => {
      while (next < jobs.length) {
        if (runController.signal.aborted) throw new DOMException('조회가 취소되었습니다.', 'AbortError');
        const index = next++;
        results[index] = await jobs[index]();
      }
    });
    try { await Promise.all(workers); }
    catch (error) { runController.abort(); await Promise.allSettled(workers); throw error; }
    // Cohort dates depend on a real property time zone returned by a standard report.
    results.push(await loadRetention(accessToken, propertyId, filters, results.find(result => result.timeZone)?.timeZone ?? '', runController.signal));
    const sections = results.map(result => result.section);
    const retentionIndex = sections.findIndex(section => section.id === 'retention');
    const retention = retentionIndex >= 0 ? sections.splice(retentionIndex, 1)[0] : undefined;
    if (retention) sections.splice(4, 0, retention);
    markUnverifiedRevenue(sections);
    return { fetchedAt: new Date().toISOString(), propertyId, currency: results.find(result => result.currency)?.currency ?? '', sections };
  } finally { signal?.removeEventListener('abort', abort); }
}
