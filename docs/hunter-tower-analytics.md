# Hunter Tower 운영 대시보드

경로: `/admin/hunter-tower` (로컬: `http://localhost:3000/admin/hunter-tower`). 공개 사이트 배포 후에는 `https://rgames.co.kr/admin/hunter-tower`에서 사용한다.

## 연결 구조

게임 Firebase SDK → GA4 속성 **543591366** → Google Analytics Data API → 로그인한 운영자의 브라우저.

Firebase: `hunter-tower-2f715`. Android 스트림 `15171192886`, iOS 스트림 `15315772233`. 게임 지표는 기본 속성의 두 앱 스트림만 조회한다. 광고비는 아래에 명시한 연결 광고 계정 전체 범위로 조회한다. 별도 속성 ID를 입력하면 Android/iOS 앱 플랫폼 필터를 사용한다.

웹사이트는 기존 Next.js 정적 export와 Cloudflare Pages를 유지한다. 관리자 HTML 자체는 공개될 수 있지만 지표를 포함하지 않는다. 데이터는 Google의 조회 권한 검사를 통과한 요청만 반환한다. `noindex`는 검색 제외 요청이며 인증 수단은 아니다.

브라우저 Google Identity Services token model로 `https://www.googleapis.com/auth/analytics.readonly`만 요청한다. 액세스 토큰과 보고서는 메모리에만 둔다. localStorage에는 공개 OAuth client ID와 GA4 property ID만 저장한다. 서비스 계정 키·client secret·refresh token·운영 지표 JSON을 소스나 `public/`에 넣지 않는다.

## 연결 식별자

관리자 web OAuth client: `879537525426-m86hhsppqc3kmlsbljveinnc7d2vcrh5.apps.googleusercontent.com`. 2026-09-09 사용자 승인 후 생성. 기본 공개 ID를 코드에 반영했으므로 동일 프로젝트에서는 별도 입력 없이 로그인할 수 있다.

## 최초 설정

현재 속성은 API 활성화·OAuth 생성·Google 로그인·측정기준 등록을 마쳤다. 아래는 재설정용 절차이며 기존 클라이언트·측정기준을 재사용한다. Google Ads 계정 `363-323-8009`(R Games)는 2026-09-11부터 이 속성과 연결돼 있다. 이전 계정 `202-097-2848`은 2026-06-30에 연결됐으며 대시보드 조회 대상에서는 제외한다.

1. Google Cloud 프로젝트 `hunter-tower-2f715`에서 Google Analytics Data API (`analyticsdata.googleapis.com`) 활성화 상태를 확인한다.
2. Google 인증 플랫폼에서 웹 애플리케이션 OAuth 클라이언트 `R Games Website - Hunter Tower Analytics`를 만든다. 승인된 JavaScript 원본: `https://rgames.co.kr`, `http://localhost:3000`, `http://localhost`. GIS 토큰 팝업 모델은 리디렉션 URI를 사용하지 않는다. client secret은 사용하지 않는다.
3. Google Analytics 속성에 운영자 계정의 조회 권한이 있어야 한다. OAuth 동의 화면이 테스트 상태라면 그 계정을 테스트 사용자로 등록한다. 이 설정은 앱 내 게임 로그인 클라이언트와 구분한다.
4. `.env.example`을 참고해 공개 client ID를 `NEXT_PUBLIC_GOOGLE_ANALYTICS_CLIENT_ID`에 넣는다. property ID 기본값은 이미 연결된 `543591366`. 환경 변수는 Next 빌드 시 적용된다. 재빌드 없이 화면의 연결 설정에 공개 ID를 입력해도 된다.
5. `npm run dev` → 관리자 경로 → Google 연결 → 조회 권한 동의. 지표는 로그인한 Google 계정의 권한으로 읽는다.
6. GA4 관리 → 맞춤 정의에 아래 이벤트 범위 측정기준을 등록한다. 같은 parameterName이 이미 있으면 재사용한다. 새 정의는 등록 전 데이터를 소급 복구하지 않는다. 처리는 일반적으로 24~48시간 필요하다.
7. 신규 게임 이벤트는 변경 코드가 포함된 Android/iOS 빌드를 배포한 뒤부터 온다. 이전 설치본은 기존 이벤트만 보인다.

## 맞춤 측정기준

2026-09-09 사용자 승인 후 아래 16개를 GA4에 등록 완료했다. 재화는 GA4 예약어 `currency` 대신 `resource_type`을 사용한다. 기존 광고 수익의 표준 `currency=USD`와 구분한다.

모두 **이벤트 범위**. 표시 이름은 자유롭게 정해도 매개변수 이름은 정확히 일치해야 한다.

| 이벤트 매개변수 | 표시 이름 | 사용처 |
| --- | --- | --- |
| quest_id | HT Quest | 튜토리얼 |
| floor_band | HT Floor Band | 최고 층 구간 |
| hunter_band | HT Hunter Band | 일반 헌터 해금 구간 |
| prestige_band | HT Prestige Band | 환생 횟수 |
| placement | HT Placement | 광고 위치 |
| ad_format | HT Ad Format | 광고 형식 |
| stage | HT Stage | 광고·결제 단계 |
| reason | HT Reason | 허용된 실패 사유 |
| product_id | HT Product | 상품 |
| store | HT Store | 결제 스토어 |
| action | HT Economy Action | 재화 행동 |
| resource_type | HT Currency | 재화 종류 |
| amount_band | HT Amount Band | 변동량 구간 |
| balance_band | HT Balance Band | 잔액 구간 |
| source | HT Source | 재화 출처 |
| operation | HT Operation | 저장·운영 작업 |

게임 정의 원본: Hunter_Tower/Assets/Project/Documentation/Operations/Analytics.md. 대시보드는 API metadata로 등록 여부를 확인하며, 빠진 정의가 있는 보고서만 `연결 필요`로 표시한다.

## 지표 읽는 법

- 기간 활성 사용자: 선택한 7/28/90일의 중복 제거 사용자. DAU 합계가 아니다. 오늘은 미완료일이라 제외한다.
- 총 참여 시간: 앱이 전경에서 사용된 시간. 백그라운드 방치 시간은 포함하지 않는다.
- 국가·OS·유입 경로: 국가 이동/복수 기기 등으로 여러 행에 한 사용자가 포함될 수 있으므로 행별 사용자 수를 합해 전체 사용자라고 쓰지 않는다.
- D1/D7: D7 관찰이 끝난 최근 7개 일별 신규 이용 코호트(14~8일 전). 기간 선택과 별도이며 국가·OS 조건은 동일하다. 보고된 분모와 N일차 활성 사용자로 계산한다. 누락은 0%가 아니다.
- `tutorial_complete`: 각 퀘스트 보상 수령. 전체 튜토리얼 완료가 아니다. 단계별 기간 집계는 동일 유입 코호트 퍼널이 아니므로 이탈률로 단정하지 않는다.
- 성장: 세션/복귀 때 관측한 구간. 현재 상태를 전수 조사한 결과가 아니다.
- 광고·결제 흐름: 처리 단계 발생 횟수. 구매 매출·개별 요청을 연결한 전환율과 구분한다. 재화 구간은 경제 원장이 아니다.
- 수익: GA4 기록값. 스토어/광고 네트워크 최종 정산액과 차이가 날 수 있다. 통화는 API 응답에 따른다. 수익 근거 이벤트가 없을 때 0 응답을 미확인으로 표시한다.
- 크래시: 운영 이벤트 표와 Crashlytics 상세 링크 제공. Crashlytics 전체 오류 스택/무충돌 비율을 GA4 지표로 대신하지 않는다.
- Google Ads 광고비: GA4 속성 543591366에 연결이 확인된 계정 363-323-8009(R Games)의 전체 캠페인 비용·클릭·노출을 조회한다. 선택 날짜만 적용하며 국가·OS·앱 스트림 필터는 적용하지 않는다. 게임 사용자/수익 보고서와 집계 범위가 다름을 화면에 명시한다. API 호환성을 확인하고 다른 속성·계정(이전 계정 202-097-2848 포함) 행은 표시하지 않는다. 계정/캠페인 미확인, 빈 결과, 비용 조회 권한 제한은 0원으로 표시하지 않는다.
- CPI·ROAS: 설치 전환 정의·귀속과 관찰 기간 확인 전에는 계산하지 않는다. 광고비를 전체 신규 사용자로 나눈 값을 CPI라고 부르지 않는다. 게임 내 광고 수익은 광고 집행 비용과 구분한다. 조회 기간 수익을 LTV라고 부르지 않는다.
- GA4 처리 지연, 개인정보 임계값, 표본 추출, `(other)` 집계, 조회 한도/권한 제한은 각 보고서에 표시된다. 선택 기간 데이터가 없으면 미발생·미수집을 구별할 수 없다.

## 검증 및 출시

```
npm run test:analytics
npx tsc --noEmit --incremental false
node scripts/verify-hunter-tower-support.mjs
npm run build
```

`out/` 정적 산출물에 관리자 셸만 있는지 확인한다. Google 로그인 → 실제 GA4 조회 → 국가/OS 변경 → 연결 해제 시 지표 제거를 확인한다. OAuth 원본 설정 반영은 즉시가 아닐 수 있다. Git stage/commit/push와 사이트·앱 릴리스는 사용자 관리 절차로 진행한다.

게임: DebugView로 신규 이벤트 이름·매개변수·성공/실패 시점 확인. 스냅샷 5분 제한과 이벤트 큐 제한을 검증한다. Editor에서는 기존 Analytics 수집 비활성화 정책을 유지한다.

## 공식 참고

- [Google Identity Services token model](https://developers.google.com/identity/oauth2/web/guides/use-token-model)
- [GA4 Data API schema](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema)
- [GA4 CohortSpec](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/CohortSpec)
- [Firebase 광고 수익 측정](https://firebase.google.com/docs/analytics/measure-ad-revenue)
- [Firebase DebugView](https://firebase.google.com/docs/analytics/debugview)
