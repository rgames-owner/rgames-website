# Hunter Tower 운영 데이터 연결

목표: R Games Website `/admin/hunter-tower`에서 기존 Firebase/GA4와 게임 운영 지표를 Google 계정의 조회 권한으로 확인한다.

확정: 기존 Next.js 정적 export·Cloudflare Pages 구조 유지. GA4 속성 543591366, Firebase hunter-tower-2f715. Android stream 15171192886, iOS stream 15315772233. 로그인 전 공개 HTML에는 운영 데이터 없음. Google Identity Services OAuth token model, analytics.readonly만 요청; 액세스 토큰·응답은 브라우저 메모리만 유지. 공개 client ID/property ID만 선택적으로 로컬 저장. 서비스 계정 키·refresh token·데이터 정적 export 금지.

화면: 최근 완료된 7/28/90일, 국가·OS 필터; 기간 활성 사용자, 신규 사용자, 세션, 참여, 수익; 일별·국가별·유입 경로; D1/D7 코호트 잔존; 튜토리얼 단계, 성장 구간, 광고/결제 흐름, 재화 행동, 버전별 운영 오류, 수집 상태. 기간 활성 사용자는 DAU 합계로 계산하지 않는다. 수집 부재·등록 전 측정기준·API 실패는 0과 구분. 광고비 연동 없으면 CPI/ROAS 미제공. 동일 기간 신규 설치 수익을 LTV로 부르지 않는다.

광고비: GA4에 연결이 확인된 Google Ads 202-097-2848 계정·캠페인 전체의 비용·클릭·노출. 선택 날짜만 적용하고 국가·OS·앱 스트림 필터는 적용하지 않음을 명시한다. 게임 지표와 집계 범위를 구분하며 CPI·ROAS는 전환 정의와 매출 귀속 확인 전 계산하지 않는다.

게임: 6개 bounded ht_* 이벤트. 기존 이벤트 유지, 자동 purchase/session 중복 금지. 저장 스키마·밸런스·동의 정책 변경 없음. 개인정보·영수증·거래 ID·자유 입력 오류 메시지 전송 금지. 세션/복귀 스냅샷 최소 5분 간격; per-frame 로그 없음. 금액 BigNumber는 자릿수 구간. 신규 이벤트는 새 앱 배포 이후부터 수집; 소급 불가.

검증: GA4 요청 필터/집계/빈 결과/인증·부분 실패/표본 제한 단위 검증, TypeScript, 정적 export, 공개 산출물에 토큰·운영 데이터 없음. Unity 컴파일·집중 테스트 가능 여부 별도 기록. 라이브 OAuth 조회는 실제 권한이 확인된 경우에만 완료 처리.

Git 추가·커밋·푸시·PR 금지. 공개 사이트/게임 배포는 사용자 소유 Git/릴리스 경로를 존중한다.
