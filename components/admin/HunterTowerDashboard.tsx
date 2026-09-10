'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { authorize, prepareAuth, revoke } from '@/lib/analytics/auth';
import { AnalyticsAuthError, loadDashboard } from '@/lib/analytics/client';
import type { DashboardData, DashboardFilters, ReportSection } from '@/lib/analytics/types';
import styles from './HunterTowerDashboard.module.css';

type Config = { clientId: string; propertyId: string };
type Session = { accessToken: string; expiresAt: number };

const CONFIG_KEY = 'rgames-hunter-tower-analytics-config-v1';
const DEFAULT_CONFIG: Config = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CLIENT_ID || '879537525426-m86hhsppqc3kmlsbljveinnc7d2vcrh5.apps.googleusercontent.com',
  propertyId: process.env.NEXT_PUBLIC_HUNTER_TOWER_GA4_PROPERTY_ID || '543591366',
};
const DEFAULT_FILTERS: DashboardFilters = { days: 28, country: '', platform: 'all' };
const COUNTRIES = [
  ['', '전체 국가'], ['KR', '한국'], ['TW', '대만'], ['JP', '일본'],
  ['TH', '태국'], ['US', '미국'],
] as const;
const STATUS_LABELS: Record<ReportSection['status'], string> = {
  ready: '수집됨', empty: '데이터 없음', unavailable: '연결 필요', error: '조회 실패',
};

function validConfig(config: Config): boolean {
  return /^[a-zA-Z0-9._-]+\.apps\.googleusercontent\.com$/.test(config.clientId)
    && /^[1-9]\d*$/.test(config.propertyId);
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '데이터를 가져오지 못했습니다. 다시 시도해 주세요.';
}

function formatValue(
  value: string | number | null | undefined,
  format: ReportSection['columns'][number]['format'],
  currency: string,
): string {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'string') return value;
  if (!Number.isFinite(value)) return '—';
  if (format === 'percent') {
    return new Intl.NumberFormat('ko-KR', { style: 'percent', maximumFractionDigits: 1 }).format(value);
  }
  if (format === 'seconds') {
    return `${new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 1 }).format(value)}초`;
  }
  if (format === 'currency') {
    const number = new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 2 }).format(value);
    if (!currency) return `${number} (통화 미확인)`;
    try {
      return new Intl.NumberFormat('ko-KR', {
        style: 'currency', currency, maximumFractionDigits: 2,
      }).format(value);
    } catch {
      return `${number} (통화 미확인)`;
    }
  }
  return new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 2 }).format(value);
}

function fetchedTime(value: string): string {
  const time = new Date(value);
  return Number.isNaN(time.getTime()) ? value : time.toLocaleString('ko-KR');
}

function Report({ section, currency }: { section: ReportSection; currency: string }) {
  const overview = section.id === 'overview' && section.status === 'ready' && section.rows.length === 1;
  return (
    <section className={styles.report} id={`report-${section.id}`} aria-labelledby={`title-${section.id}`}>
      <div className={styles.reportHeading}>
        <div>
          <h2 id={`title-${section.id}`}>{section.title}</h2>
          <p>{section.description}</p>
        </div>
        <span className={`${styles.reportStatus} ${section.status === 'ready' ? styles.ready : ''}`}>
          {STATUS_LABELS[section.status]}
        </span>
      </div>
      {section.status === 'ready' && section.rows.length > 0 ? (
        overview ? (
          <dl className={styles.metricGrid}>
            {section.columns.map((column) => (
              <div className={styles.metric} key={column.key}>
                <dt>{column.label}</dt>
                <dd>{formatValue(section.rows[0][column.key], column.format, currency)}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <div className={styles.tableScroll} tabIndex={0} role="region" aria-label={`${section.title} 표, 가로 스크롤 가능`}>
            <table className={styles.table}>
              <thead><tr>{section.columns.map((column) => <th scope="col" key={column.key}>{column.label}</th>)}</tr></thead>
              <tbody>
                {section.rows.map((row, index) => (
                  <tr key={index}>
                    {section.columns.map((column) => (
                      <td key={column.key} className={column.format ? styles.numeric : undefined}>
                        {formatValue(row[column.key], column.format, currency)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div className={styles.sectionEmpty}>
          {section.status === 'empty' && '선택한 기간과 조건에 해당하는 데이터가 없습니다.'}
          {section.status === 'unavailable' && (section.error || '이 지표는 추가 연결 또는 데이터 수집 설정이 필요합니다.')}
          {section.status === 'error' && (section.error || '이 보고서를 조회하지 못했습니다. 다시 조회해 주세요.')}
          {section.status === 'ready' && '표시할 데이터가 없습니다.'}
        </div>
      )}
      {section.notes.length > 0 && <ul className={styles.notes}>{section.notes.map((note, index) => <li key={index}>{note}</li>)}</ul>}
    </section>
  );
}

export default function HunterTowerDashboard() {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [draft, setDraft] = useState<Config>(DEFAULT_CONFIG);
  const [settingsOpen, setSettingsOpen] = useState(!validConfig(DEFAULT_CONFIG));
  const [session, setSession] = useState<Session | null>(null);
  const [filters, setFilters] = useState<DashboardFilters>(DEFAULT_FILTERS);
  const [data, setData] = useState<DashboardData | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [authPreparing, setAuthPreparing] = useState(true);
  const [authPreparationError, setAuthPreparationError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(0);
  const activeRequest = useRef<AbortController | null>(null);
  const authSequence = useRef(0);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    void prepareLogin();
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(CONFIG_KEY) || 'null');
      if (saved && typeof saved === 'object' && 'clientId' in saved && 'propertyId' in saved
        && typeof saved.clientId === 'string' && typeof saved.propertyId === 'string') {
        const restored = { clientId: saved.clientId, propertyId: saved.propertyId };
        setConfig(restored);
        setDraft(restored);
        setSettingsOpen(!validConfig(restored));
      }
    } catch {
      // Browser storage is optional; OAuth IDs can still be entered for this session.
    }
    return () => {
      mounted.current = false;
      authSequence.current += 1;
      activeRequest.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (!session) return;
    const expire = () => {
      authSequence.current += 1;
      activeRequest.current?.abort();
      setSession(null);
      setData(null);
      setLoading(false);
      setMessage('Google 연결이 만료되었습니다. 다시 연결해 주세요.');
    };
    const remaining = session.expiresAt - Date.now();
    if (remaining <= 0) { expire(); return; }
    const timer = window.setTimeout(expire, Math.min(remaining, 2_147_483_647));
    return () => window.clearTimeout(timer);
  }, [session]);

  useEffect(() => {
    if (!session || session.expiresAt <= Date.now() || !validConfig(config)) return;
    const controller = new AbortController();
    activeRequest.current?.abort();
    activeRequest.current = controller;
    setLoading(true);
    setData(null);
    setError('');
    loadDashboard(session.accessToken, config.propertyId, filters, controller.signal)
      .then((result) => { if (!controller.signal.aborted && session.expiresAt > Date.now()) setData(result); })
      .catch((failure: unknown) => {
        if (!controller.signal.aborted) {
          setError(errorMessage(failure));
          if (failure instanceof AnalyticsAuthError) {
            authSequence.current += 1;
            setSession(null);
            setData(null);
            setLoading(false);
          }
        }
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [session, config, filters, refresh]);

  async function prepareLogin() {
    setAuthPreparing(true);
    setAuthPreparationError('');
    try {
      await prepareAuth();
      if (mounted.current) setAuthReady(true);
    } catch (failure) {
      if (mounted.current) {
        setAuthReady(false);
        setAuthPreparationError(errorMessage(failure));
      }
    } finally {
      if (mounted.current) setAuthPreparing(false);
    }
  }

  function clearConnection() {
    authSequence.current += 1;
    activeRequest.current?.abort();
    setSession(null);
    setData(null);
    setLoading(false);
    setConnecting(false);
    setError('');
    if (session) void revoke(session.accessToken).catch(() => {
      if (mounted.current) setMessage('이 화면의 연결은 종료됐습니다. Google 계정 권한 해제는 계정 설정에서도 할 수 있습니다.');
    });
  }

  function saveConfig(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = { clientId: draft.clientId.trim(), propertyId: draft.propertyId.trim().replace(/^properties\//, '') };
    if (!validConfig(next)) {
      setError('OAuth 클라이언트 ID는 .apps.googleusercontent.com으로 끝나야 합니다. GA4 속성 ID는 숫자로 입력해 주세요.');
      return;
    }
    clearConnection();
    setConfig(next);
    setDraft(next);
    setSettingsOpen(false);
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(next));
      setMessage('연결 ID를 저장했습니다. Google 계정으로 연결해 주세요.');
    } catch {
      setMessage('연결 ID를 현재 탭에 적용했습니다. 브라우저 저장은 허용되지 않았습니다.');
    }
  }

  async function connect() {
    if (!validConfig(config) || connecting || !authReady) return;
    const attempt = ++authSequence.current;
    setConnecting(true);
    setError('');
    setMessage('');
    try {
      const next = await authorize(config.clientId);
      if (!mounted.current || attempt !== authSequence.current) {
        void revoke(next.accessToken).catch(() => {});
        return;
      }
      setSession(next);
    } catch (failure) {
      if (mounted.current && attempt === authSequence.current) setError(errorMessage(failure));
    } finally {
      if (mounted.current && attempt === authSequence.current) setConnecting(false);
    }
  }

  function changeFilters(next: Partial<DashboardFilters>) {
    activeRequest.current?.abort();
    setData(null);
    setFilters((previous) => ({ ...previous, ...next }));
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>R GAMES · ANALYTICS</p>
        <div className={styles.titleRow}>
          <div><h1>Hunter Tower<br /><span>운영 데이터</span></h1><p className={styles.intro}>유입부터 성장, 수익, 운영 오류까지 한곳에서 확인합니다.</p></div>
          <span className={`${styles.connectionBadge} ${session ? styles.connected : ''}`}>
            <span aria-hidden="true" />{session ? 'Google 연결됨' : '연결 대기'}
          </span>
        </div>
        <div className={styles.heroFooter}>
          <span>Google Analytics · 읽기 전용</span>
          <span>{data ? `조회 ${fetchedTime(data.fetchedAt)}` : '실제 데이터는 연결 후 표시됩니다.'}</span>
        </div>
      </header>

      <section className={styles.connection} aria-label="데이터 연결">
        <div className={styles.connectionTop}>
          <div><h2>내 Google 계정으로 연결</h2><p>Hunter Tower GA4 속성을 볼 수 있는 계정이 필요합니다. 로그인 권한 안에서만 데이터를 읽습니다.</p></div>
          {session || connecting ? (
            <button className={styles.secondaryButton} onClick={() => { clearConnection(); setMessage(connecting ? '연결 요청을 취소했습니다. Google 창이 남아 있으면 닫아 주세요.' : '연결을 종료하고 화면의 데이터를 지웠습니다.'); }}>{connecting ? '연결 취소' : '연결 해제'}</button>
          ) : (
            <button className={styles.primaryButton} disabled={!validConfig(config) || connecting || !authReady} onClick={() => void connect()}>
              {connecting ? 'Google 연결 중…' : authPreparing ? '로그인 준비 중…' : 'Google로 연결'}
            </button>
          )}
        </div>
        <details open={settingsOpen} onToggle={(event) => setSettingsOpen(event.currentTarget.open)} className={styles.settings}>
          <summary>연결 설정{validConfig(config) ? ` · 속성 ${config.propertyId}` : ' · 공개 ID 2개 필요'}</summary>
          <form onSubmit={saveConfig}>
            <div className={styles.settingsFields}>
              <label>Google OAuth 클라이언트 ID<input value={draft.clientId} onChange={(event) => setDraft((old) => ({ ...old, clientId: event.target.value }))} placeholder="…apps.googleusercontent.com" autoComplete="off" spellCheck={false} /></label>
              <label>GA4 속성 ID<input value={draft.propertyId} onChange={(event) => setDraft((old) => ({ ...old, propertyId: event.target.value }))} placeholder="숫자로 된 속성 ID" inputMode="numeric" autoComplete="off" spellCheck={false} /></label>
              <button className={styles.secondaryButton} type="submit">설정 적용</button>
            </div>
            <p className={styles.hint}>웹 애플리케이션용 OAuth ID와 GA4 속성 ID입니다. Firebase 프로젝트 ID·측정 ID(G-…)·비밀 키를 넣지 마세요.</p>
            <p className={styles.hint}>Google Analytics Data API를 활성화하고, OAuth 승인된 JavaScript 원본에 이 사이트 주소를 등록하세요. 공개 ID만 이 브라우저에 저장합니다. 접근 토큰과 조회 결과는 저장하지 않습니다.</p>
          </form>
        </details>
      </section>

      {authPreparationError && <div className={styles.error} role="alert"><p>{authPreparationError}</p><button className={styles.secondaryButton} disabled={authPreparing} onClick={() => void prepareLogin()}>{authPreparing ? '준비 중…' : 'Google 로그인 다시 준비'}</button></div>}
      {message && <p className={styles.notice} role="status">{message}</p>}
      {error && <div className={styles.error} role="alert"><strong>연결 또는 조회를 확인해 주세요.</strong><p>{error}</p><p>계정의 GA4 속성 읽기 권한, API 활성화, OAuth 설정을 확인한 뒤 다시 연결하거나 조회해 주세요.</p></div>}

      <section className={styles.filters} aria-label="조회 조건">
        <div className={styles.filterFields}>
          <label>조회 기간<select value={filters.days} onChange={(event) => changeFilters({ days: Number(event.target.value) as DashboardFilters['days'] })}><option value={7}>최근 7일</option><option value={28}>최근 28일</option><option value={90}>최근 90일</option></select></label>
          <label>국가<select value={filters.country} onChange={(event) => changeFilters({ country: event.target.value })}>{COUNTRIES.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
          <label>운영체제<select value={filters.platform} onChange={(event) => changeFilters({ platform: event.target.value as DashboardFilters['platform'] })}><option value="all">전체 운영체제</option><option value="Android">Android</option><option value="iOS">iOS</option></select></label>
          <button className={styles.secondaryButton} disabled={!session || loading} onClick={() => setRefresh((value) => value + 1)}>{loading ? '조회 중…' : '다시 조회'}</button>
        </div>
        <p className={styles.hint}>GA4 속성 시간대 기준, 어제까지 완료된 날짜를 조회합니다. 수집·처리 지연 때문에 최근 수치는 바뀔 수 있습니다.</p>
      </section>

      <div aria-live="polite" aria-busy={loading}>
        {loading && <div className={styles.loading}><span className={styles.spinner} aria-hidden="true" /><strong>운영 보고서를 가져오는 중입니다.</strong><p>국가·운영체제·기간에 맞춰 GA4 데이터를 조회합니다.</p></div>}
        {!session && !loading && <section className={styles.welcome}><span className={styles.welcomeIcon} aria-hidden="true">↗</span><h2>게임의 다음 결정을<br />실제 데이터로.</h2><p>계정을 연결하면 방문·잔존, 매출, 튜토리얼, 성장, 광고와 결제 흐름을 확인할 수 있습니다.</p><div className={styles.topicList}><span>유입 · 잔존</span><span>성장 · 재화</span><span>매출 · 안정성</span></div><p className={styles.hint}>연결 전에는 예시 수치나 추정 매출을 표시하지 않습니다.</p></section>}
        {data && <>
          <nav className={styles.reportNav} aria-label="보고서 바로가기">{data.sections.map((section) => <a href={`#report-${section.id}`} key={section.id}>{section.title}</a>)}</nav>
          <div className={styles.reports}>{data.sections.map((section) => <Report section={section} currency={data.currency} key={section.id} />)}</div>
        </>}
      </div>

      <aside className={styles.readingGuide} aria-labelledby="analytics-guide-title">
        <h2 id="analytics-guide-title">데이터를 읽기 전에</h2>
        <div className={styles.guideGrid}>
          <div><h3>새 이벤트는 앱 업데이트부터</h3><p>성장·재화·운영 오류 등 새 수집 항목은 해당 코드가 포함된 앱에서 들어옵니다. 업데이트 전 데이터가 소급 생성되지는 않습니다.</p></div>
          <div><h3>광고비 집계 범위</h3><p>Google Ads 비용·클릭·노출은 연결된 광고 계정·캠페인 전체 기준입니다. 날짜만 적용하며 국가·OS·앱 스트림별 비용이 아닙니다. CPI·ROAS는 설치 전환·매출 귀속 확인 후 계산해야 합니다.</p></div>
          <div><h3>상세 크래시 확인</h3><p>스택 트레이스와 영향받은 기기는 <a href="https://console.firebase.google.com/project/hunter-tower-2f715/crashlytics" target="_blank" rel="noreferrer">Firebase 콘솔의 Crashlytics ↗</a>에서 확인하세요.</p></div>
        </div>
      </aside>
    </div>
  );
}
