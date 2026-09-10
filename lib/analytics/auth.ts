// Google Identity Services token model. No refresh token or browser persistence.
const SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';
const SCRIPT_ID = 'rgames-google-identity';
const SCRIPT_URL = 'https://accounts.google.com/gsi/client';
type TokenResponse = {
  access_token?: string;
  expires_in?: number | string;
  scope?: string;
  error?: string;
};
type OAuthApi = {
  initTokenClient(config: {
    client_id: string;
    scope: string;
    include_granted_scopes: boolean;
    callback: (response: TokenResponse) => void;
    error_callback: (error: { type?: string }) => void;
  }): { requestAccessToken(options: { prompt: string }): void };
  hasGrantedAllScopes(response: TokenResponse, ...scopes: string[]): boolean;
  revoke(token: string, callback: (result: { successful?: boolean }) => void): void;
};
function oauth(): OAuthApi | undefined {
  return (window as Window & { google?: { accounts?: { oauth2?: OAuthApi } } }).google?.accounts?.oauth2;
}
let loading: Promise<void> | undefined;

/** Preload before the login click, preserving the browser's popup user gesture. */
export function prepareAuth(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('브라우저에서 로그인해 주세요.'));
  if (oauth()) return Promise.resolve();
  if (loading) return loading;
  loading = new Promise<void>((resolve, reject) => {
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    const finish = (error?: Error) => {
      clearTimeout(timeout);
      script?.removeEventListener('load', onLoad);
      script?.removeEventListener('error', onError);
      if (error) {
        loading = undefined;
        script?.remove();
        reject(error);
      } else resolve();
    };
    const onLoad = () => oauth() ? finish() : onError();
    const onError = () => finish(new Error('Google 로그인을 불러오지 못했습니다. 네트워크나 콘텐츠 차단 설정을 확인해 주세요.'));
    const timeout = window.setTimeout(onError, 15000);
    if (!script) {
      script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = SCRIPT_URL;
      script.async = true;
      script.defer = true;
      script.addEventListener('load', onLoad);
      script.addEventListener('error', onError);
      document.head.appendChild(script);
    } else {
      script.addEventListener('load', onLoad);
      script.addEventListener('error', onError);
    }
  });
  return loading;
}

export function authorize(clientId: string): Promise<{ accessToken: string; expiresAt: number }> {
  if (!/^\d+-[a-zA-Z0-9_-]+\.apps\.googleusercontent\.com$/.test(clientId.trim())) {
    return Promise.reject(new Error('웹 애플리케이션 OAuth 클라이언트 ID를 확인해 주세요.'));
  }
  const api = typeof window !== 'undefined' ? oauth() : undefined;
  if (!api) return Promise.reject(new Error('Google 로그인 준비가 끝나면 다시 눌러 주세요.'));
  return new Promise((resolve, reject) => {
    let settled = false;
    const fail = (message: string) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      reject(new Error(message));
    };
    const timeout = window.setTimeout(() => fail('로그인 시간이 초과되었습니다. 다시 연결해 주세요.'), 120000);
    try {
      const client = api.initTokenClient({
        client_id: clientId.trim(),
        scope: SCOPE,
        include_granted_scopes: false,
        callback: response => {
          if (settled) return;
          if (response.error || !response.access_token || !api.hasGrantedAllScopes(response, SCOPE)) {
            fail('Google Analytics 조회 권한이 승인되지 않았습니다. 조회 권한으로 다시 연결해 주세요.');
            return;
          }
          const seconds = Number(response.expires_in);
          if (!Number.isFinite(seconds) || seconds <= 30) {
            fail('Google 인증이 만료되었습니다. 다시 연결해 주세요.');
            return;
          }
          settled = true;
          clearTimeout(timeout);
          resolve({ accessToken: response.access_token, expiresAt: Date.now() + (seconds - 30) * 1000 });
        },
        error_callback: error => fail(error.type === 'popup_closed'
          ? '로그인 창이 닫혔습니다.'
          : 'Google 로그인 창을 열지 못했습니다. 이 사이트의 팝업을 허용해 주세요.'),
      });
      client.requestAccessToken({ prompt: 'select_account' });
    } catch {
      fail('Google 로그인을 시작하지 못했습니다. OAuth 클라이언트의 승인된 JavaScript 원본을 확인해 주세요.');
    }
  });
}

/** The caller clears local state immediately, even if Google's revocation fails. */
export function revoke(accessToken: string): Promise<void> {
  const api = typeof window !== 'undefined' ? oauth() : undefined;
  if (!api || !accessToken) return Promise.resolve();
  return new Promise(resolve => {
    const timeout = window.setTimeout(resolve, 5000);
    try {
      api.revoke(accessToken, () => { clearTimeout(timeout); resolve(); });
    } catch { clearTimeout(timeout); resolve(); }
  });
}
