# 운영 데이터 연결 검증 — 2026-09-09

## 완료

- R Games Website에 `/admin/hunter-tower` 소스 반영. 사용자 소유 Git stage/commit/push/PR 미실행.
- 기존 GA4 속성 543591366, Android/iOS 스트림 확인. Firebase 콘솔에서 실제 사용자·잔존·수익 데이터 존재 확인.
- 사용자 명시 승인 후 web OAuth client 생성. 승인 원본은 https://rgames.co.kr, http://localhost:3000, http://localhost. 공개 client ID를 기본 설정에 반영. 비밀키 저장 없음.
- Google Analytics Data API 활성화 완료.
- Google Ads 연결 계정 202-097-2848의 캠페인별 비용/클릭/노출 조회 구현. 날짜만 적용하고 국가·OS·앱 스트림 필터 제외를 화면에 명시. 실제 조회의 정상 빈응답과 데이터 없음 표시 확인. 비용 누락·권한 제한·식별 불가 행은 0으로 처리하지 않는다.
- 최종 웹 단위 테스트 27/27 통과. TypeScript 및 기존 support 페이지 검증 통과. 실제 소스와 일치하는 staging에서 Next 정적 export 통과. 실행 중인 실제 개발 서버는 유지했다.
- 관리자 정적 HTML에 실제 운영 보고서·액세스 토큰 없음. 로그인 전 화면 확인. noindex/nofollow 적용.
- 게임 정책 NUnit 9/9 독립 실행 통과. Runtime 435개 C# 파일을 Unity 6000.3.19 Roslyn과 프로젝트 참조로 Editor 및 iOS 릴리즈 조건 컴파일 통과.
- 동의 설정·세이브 스키마·밸런스 변경 없음. 운영 수집 실패는 게임 동작에 전파하지 않음.

## 실제 연결 확인

- 2026-09-09 재확인: Mac 잠금 해제 및 Google 로그인 완료. 실제 로컬 관리자에서 기간 활성 사용자·신규 사용자·수익·국가별·이벤트 데이터 조회를 확인했다. 잔존 코호트 요청은 상대 날짜를 거부하는 실제 API 응답에 맞춰 GA4 속성 시간대의 YYYY-MM-DD 날짜로 수정했고 정상 응답을 확인했다. 분모 누락/불일치는 미확인 값으로 유지한다.
- 2026-09-09 사용자 명시 승인 후 이벤트 범위 측정기준 16개 등록 완료. 실제 GA4 목록에서 전건 확인. currency는 GA4 예약어 제약으로 resource_type으로 변경해 게임·조회 코드·명세를 동기화했다. 상세 표가 등록 필요에서 데이터 없음으로 바뀐 것까지 확인했다.
- Google Ads 계정 202-097-2848이 2026-06-30부터 이 GA4 속성과 연결된 상태를 실제 GA4 제품 링크에서 확인했다. 추가 계정 연결은 만들지 않았다. 캠페인 집행/전환 설정을 변경하거나 비용을 지출하지 않았다. CPI·ROAS 계산은 설치 전환 정의·귀속 확인 후 진행한다.

## 남은 현장 검증·배포

- 신규 6종 게임 이벤트는 Android/iOS 새 빌드 배포 후부터 수집. Unity Editor가 연결되지 않아 씬 EditMode 실행, 실기기 SDK와 Firebase DebugView 수신은 미검증.
- 사이트 공개 배포·게임 배포는 미실행. Git/릴리스는 사용자가 관리.

## 재검증 명령

```
npm run test:analytics
npx tsc --noEmit --incremental false
node scripts/verify-hunter-tower-support.mjs
npm run build
```

기존 루트 layout의 metadataBase 미설정 경고는 유지되며 빌드 실패는 아니다. 초회 sandbox 빌드는 Google Fonts 네트워크 제한으로 실패했고, 정상 네트워크 허용 후 동일 소스 정적 export 성공.

## 게임 변경 보존 및 검증 산출물

기존 10개 파일 작업 직전 스냅샷: `/private/tmp/ht_operations_tests/before/`. 사용자의 dirty 상태 대비 이번 후킹 추가는 합계 +36/-11줄이며 기존 리팩토링과 구분한다. 신규 helper/policy/test/doc와 .meta 9개 추가.

정책 테스트 실행기: `/private/tmp/ht_operations_tests/Runner.cs`. 컴파일 응답/로그: 같은 폴더의 `RuntimeE.rsp`, `RuntimeP.rsp`, `editor_compile.log`, `player_compile.log`. Unity 실제 씬/SDK 검증과 구분한다.
