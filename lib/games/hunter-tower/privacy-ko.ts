import type { GamePolicy } from '@/lib/games/types';
import { fromMarkdown } from '@/lib/games/fromMarkdown';

export const hunterTowerPrivacyKo: GamePolicy = {
  title: 'Hunter Tower 개인정보처리방침',
  effectiveDate: '2026-05-06',
  lastUpdated: '2026-07-15',
  introNote: [{ type: 'text', text: '본 개인정보처리방침은 Google Play, Apple App Store, ONE store 등 모든 배포 채널에 공통 적용됩니다.' }],
  blocks: fromMarkdown(`### 1. 총칙
\`알 게임즈\`(이하 "운영자")는 모바일 게임 **Hunter Tower**(이하 "본 앱") 서비스 제공과 관련하여 「개인정보 보호법」 등 관련 법령을 준수하며, 이용자의 개인정보가 어떤 목적으로 어떻게 처리되는지 알기 쉽게 안내합니다.
- **처리하는 정보의 범위**는 실제 앱 동작·연동 SDK·스토어(구글 플레이, 앱 스토어, 원스토어 등) 정책에 따릅니다.
- 본 방침은 **최종 수정일** 기준이며, 변경 시 앱 내 또는 본 페이지를 통해 공지할 수 있습니다.

**운영자 연락처**
- 이메일: \`cs.team@rgames.co.kr\`

### 2. 수집·이용하는 정보
본 앱은 **회원가입을 요구하지 않는 방식**으로 제공됩니다. 이메일·실명 등 이용자가 직접 입력하는 계정 정보는 운영자가 수집하지 않습니다.

다만 아래 항목은 **서비스 제공·광고·결제·기기 환경** 등의 이유로 **자동으로 생성·수집되거나 제3자(광고·앱스토어·결제)** 가 처리할 수 있습니다.

### 2.1 기기 및 앱 이용 정보
- 기기 모델, OS 버전, 앱 버전, 언어 설정, 화면 해상도 등 **앱 실행·호환성**에 필요한 정보
- **광고 식별자**(Android: 광고 ID(GAID), iOS: 광고 식별자(IDFA)) — **광고 표시·성과 측정·사기 방지** 등에 사용될 수 있음. iOS에서는 **앱 추적 투명성(App Tracking Transparency, ATT)** 동의 및 플랫폼 설정에 따라 사용이 제한됩니다.
- 광고 노출·클릭·보상형 광고 완료 여부 등 **광고 관련 이벤트**(광고 네트워크 정책에 따름)
- **앱 이용 분석 정보**(앱 인스턴스 식별자, 게임 내 이벤트 이용 기록, IP 기반의 대략적 위치 등) — **이용 통계 분석·서비스 개선**을 위해 **Firebase Analytics**를 통해 처리될 수 있음
- **비정상 종료(크래시) 진단 정보**(오류 로그, 기기 상태, OS·앱 버전 등) — **오류 진단·안정성 개선**을 위해 **Firebase Crashlytics**를 통해 처리될 수 있음
- **Firebase 기본 수집:** Firebase Analytics와 Firebase Crashlytics는 앱 실행 시 기본적으로 활성화됩니다. SDK는 앱 이용 이벤트를 자동으로 처리할 수 있으며, 비정상 종료가 발생하거나 앱을 다시 실행할 때 크래시 진단 정보를 자동으로 수집·전송할 수 있습니다.

### 2.2 게임 진행 정보(로컬 저장 및 클라우드 저장)
- 본 앱은 **기본적으로 기기 내부 저장소**에 게임 진행 데이터(예: 스테이지, 재화, 설정 등)를 저장합니다.
- 이용자가 **플랫폼 계정으로 로그인한 경우**, 게임 진행 데이터의 전부 또는 일부가 **클라우드 저장(Unity Cloud Save)** 을 통해 **Unity Gaming Services 서버에 동기화·보관**될 수 있습니다. 이는 **기기 변경·재설치 시 진행 복원, 랭킹·경쟁 콘텐츠 이용**을 위한 것입니다.
- 로그인은 **선택 사항**이며(아래 2.6 참조), 로그인하지 않으면 진행 데이터는 **기기에만 저장**됩니다.

### 2.3 인앱 결제 관련 정보
- 본 앱은 **Unity IAP**를 통해 **Google Play / App Store / ONE store 등 앱 마켓**의 인앱 결제를 이용할 수 있습니다.
- **결제 승인·영수증·결제 수단 정보**는 **각 스토어 운영사(예: Google, Apple)** 가 처리하며, 운영자는 **결제 검증·상품 지급**에 필요한 범위에서 **거래 식별자 등 최소 정보**를 앱 내에서 처리합니다. 카드번호 등 **결제 수단 정보는 운영자가 보관하지 않습니다.**

### 2.4 로컬 알림(푸시)
- 본 앱은 **기기 내 로컬 알림**(예: 복귀 유도 알림)을 예약·표시할 수 있으며, 이를 위해 OS의 **알림 권한**을 1회 요청합니다.
- 로컬 알림은 **기기 내부에서만 예약·발송**되며, 이를 위해 개인정보를 외부 서버로 전송하지 않습니다. 이용자는 **기기 설정**에서 알림을 언제든 끌 수 있습니다.

### 2.5 운영자에게 직접 보내는 정보
- 고객지원 이메일 등으로 **이용자가 직접 제공**하는 내용(문의 내용, 연락 가능한 이메일 주소 등)

### 2.6 계정 로그인 및 클라우드 저장 정보(선택)
- 본 앱은 **월드보스 등 일부 경쟁·랭킹 콘텐츠** 이용 시 **플랫폼 계정 로그인**을 요청합니다. **핵심 게임(성장·전투·상점 등)은 로그인 없이 이용할 수 있으며**, 로그인은 선택 사항입니다.
- 로그인 및 클라우드 저장은 **Unity Gaming Services(Unity Authentication, Cloud Save, Leaderboards 등)** 를 통해 제공되며, 이때 아래 정보가 처리될 수 있습니다:
- **Unity Authentication 플레이어 ID**(권위 있는 계정 식별자)
- **플랫폼 계정 식별자** — iOS: **Sign in with Apple**, Android: **Google Play Games**
- **랭킹 표시명** 및 **경쟁 점수·시즌 기록**
- **클라우드에 동기화된 게임 진행 데이터**(위 2.2)
- 계정 및 랭킹은 **플랫폼 계정 단위**로 관리됩니다. Android↔iOS 등 **서로 다른 플랫폼 간 계정 이전·병합은 지원되지 않습니다.** 같은 플랫폼 계정으로 재로그인하면 동일 계정이 복원됩니다.
- 운영자는 개발 편의를 위한 경우를 제외하고 **순수 익명 계정을 프로덕션에서 사용하지 않습니다.**

### 3. 수집·이용 목적
- 본 앱 **서비스 제공·기능 유지**(게임 진행 저장, 버그 대응 등)
- **서비스 개선·오류 진단·안정성 확보**를 위한 앱 이용 통계 분석 및 크래시 진단
- **클라우드 저장·계정 로그인** 을 통한 진행 복원, **랭킹·경쟁 콘텐츠** 제공 및 보상 지급, 부정 순위 방지
- **맞춤형·비개인화 광고** 표시, 광고 성과 측정, **부정 이용 방지**
- **인앱 결제** 처리 및 유료 콘텐츠/기능 제공
- **법령 준수**, 분쟁 대응, 통계(식별 가능성이 낮은 형태로 한정될 수 있음)

### 4. 보유 및 이용 기간
- **게임 로컬 데이터:** 앱 삭제 시 기기에서 제거될 수 있습니다(기기·OS 정책에 따름).
- **계정·클라우드 저장 데이터:** 이용자가 **계정 삭제를 요청하거나 관련 기능을 통해 삭제할 때까지** 보관되며, 삭제 시 Unity Gaming Services 정책에 따라 파기됩니다. 시즌 종료·서비스 종료 시 관련 법령 및 스토어 정책에 따라 처리됩니다.
- **광고 관련 데이터:** 연동된 **광고 사업자(아래 5절 목록)** 의 보관 기간 및 정책을 따릅니다.
- **분석·크래시 데이터:** 이용자 단위 **Firebase Analytics** 데이터는 최대 **14개월** 보관 후 자동 삭제되며, **Firebase Crashlytics** 크래시 리포트는 최대 **90일**간 보관됩니다(Google 정책 기준).
- **결제·거래:** 관련 법령 및 스토어 정책이 정한 기간.
- **고객 문의:** 처리 완료 후 **1년**간 보관한 뒤 지체 없이 파기합니다.

### 5. 제3자 제공 및 처리 위탁
본 앱은 아래와 같은 **제3자 서비스(SDK)** 를 사용하며, 해당 사업자는 **자체 개인정보처리방침**에 따라 정보를 처리합니다.

| 구분 | 서비스 | 처리 내용 |
| --- | --- | --- |
| 광고 | Google AdMob (Google LLC) | 배너·전면·보상형 광고 노출 및 성과 측정. 미디에이션을 통해 아래 광고 네트워크의 광고가 노출될 수 있음. |
| 광고(미디에이션) | AppLovin, Meta Audience Network, Vungle(Liftoff Monetize), Mintegral, Unity Ads | AdMob 미디에이션을 통한 광고 노출·성과 측정. 각 네트워크가 광고 식별자 등을 자체 정책에 따라 처리. |
| 인앱 결제 | Unity IAP + Google Play / App Store / ONE store | 스토어를 통한 결제 처리 및 영수증 검증. |
| 계정·클라우드 저장 | Unity Gaming Services (Unity Authentication, Cloud Save, Cloud Code, Leaderboards — Unity Technologies) | 플랫폼 계정 로그인, 게임 진행 클라우드 동기화, 랭킹·경쟁 콘텐츠 처리(로그인 시). |
| 플랫폼 계정 | Sign in with Apple (iOS), Google Play Games (Android) | 로그인 시 플랫폼 계정 인증. 각 플랫폼 사업자 정책에 따라 처리. |
| 게임 엔진 | Unity (Unity Technologies) | 빌드·런타임에 따른 기술적 정보 처리 가능(자사 정책 준수). |
| 분석·크래시 | Firebase (Google Analytics for Firebase, Crashlytics — Google LLC) | 앱 이용 통계 분석 및 비정상 종료(크래시) 진단. 데이터는 Google이 자체 정책에 따라 처리. |

각 사업자 개인정보처리방침(변경될 수 있음):
- Google (AdMob·Firebase·Google Play Games): [Google 개인정보처리방침](https://policies.google.com/privacy)
- Unity (Unity Ads·Unity Gaming Services 포함): [Unity 개인정보처리방침](https://unity.com/legal/privacy-policy) · [Unity 게임 플레이어 개인정보](https://unity.com/legal/game-player-and-app-user-privacy-policy)
- Apple (Sign in with Apple): [Apple 개인정보처리방침](https://www.apple.com/legal/privacy/)
- AppLovin: [AppLovin 개인정보](https://www.applovin.com/privacy/)
- Meta Audience Network: [Meta 개인정보](https://www.facebook.com/about/privacy)
- Vungle / Liftoff Monetize: [Vungle 개인정보](https://vungle.com/privacy/)
- Mintegral: [Mintegral 개인정보](https://www.mintegral.com/en/privacy/)

운영자는 **위탁 업무의 내용·수탁자**를 변경할 수 있으며, 중요한 변경 시 본 방침을 고칩니다.

### 6. 개인정보의 국외 이전
Google(AdMob·Firebase·Google Play Games 포함), Unity(**Unity Gaming Services — 계정·클라우드 저장·랭킹 데이터 포함**), Apple, AppLovin, Meta, Vungle(Liftoff), Mintegral 등 일부 수탁사는 **해외(미국, 그 외 국가 등)** 에 서버를 두고 정보를 처리할 수 있습니다. 로그인 시 **계정 식별자 및 클라우드 저장 게임 데이터가 국외 서버(예: 미국)에서 처리·보관될 수 있습니다.**

이 경우 해당 사업자의 **개인정보처리방침·이전 조치(표준계약조항 등)** 에 따릅니다.

### 7. 이용자의 권리
이용자는 개인정보 보호법 등에 따라 **열람·정정·삭제·처리정지** 등을 요구할 수 있습니다.
- **로그인하지 않은 경우:** 진행 데이터는 기기에만 있으므로 **앱 삭제**로 제거할 수 있습니다.
- **로그인한 경우(계정·클라우드 저장):** 앱 내 **설정 화면의 계정 삭제 기능** 또는 아래 이메일 문의를 통해 **계정 및 클라우드 저장 데이터의 삭제**를 요청할 수 있습니다. 요청 시 Unity Authentication 계정과 연결된 클라우드 저장·랭킹 데이터가 삭제됩니다. (앱 삭제·로그아웃만으로는 서버 계정 데이터가 삭제되지 않습니다.)
- **광고·추적 관련:**
- **Android:** 설정 → Google → 광고 또는 개인정보 보호 설정에서 **광고 ID 재설정·맞춤 광고 옵트아웃** 등
- **iOS:** 설정 → 개인 정보 보호 및 보안 → **추적(Tracking)**, **Apple 광고** 등에서 추적 허용 여부 변경

문의: \`cs.team@rgames.co.kr\`

### 8. 광고·유사 기술·동의
- 본 앱은 **광고 SDK**를 통해 **광고 식별자** 및 관련 정보가 처리될 수 있습니다.
- **유럽 경제 지역(EEA)·영국·스위스** 등 일부 지역에서는 **Google UMP(사용자 메시징 플랫폼)** 를 통한 광고 관련 동의 또는 선택 UI가 표시될 수 있습니다.
- iOS에서 본 앱이 **앱 추적 투명성(App Tracking Transparency, ATT)** 권한을 요청하는 경우, 해당 시스템 창은 IDFA 접근 및 다른 회사의 앱·웹사이트를 아우르는 추적 허용 여부를 묻습니다. 거부해도 앱은 이용할 수 있으나, 앱 간 추적·광고 개인화·광고 측정이 제한될 수 있습니다.
- Google UMP와 iOS ATT는 광고 및 추적 선택에 적용됩니다. 이는 Firebase Analytics 또는 Firebase Crashlytics 수집에 대한 별도 동의·거부 수단이 아니며, UMP 또는 ATT 선택을 변경해도 Firebase 수집은 비활성화되지 않습니다.
- 현재 본 앱에는 Firebase Analytics 또는 Firebase Crashlytics 수집을 이용자가 직접 켜거나 끄는 별도 앱 내 설정이 없습니다.

### 9. 아동의 개인정보
본 앱은 **만 14세 미만 아동**을 주된 이용 대상으로 하지 않습니다.
아동을 대상으로 하는 경우 관련 법령 및 **Google·Apple·광고 네트워크의 아동 대상 서비스 정책**을 추가로 준수합니다.

### 10. 안전성 확보 조치
운영자는 개인정보 유출 등을 방지하기 위해 **앱 설계상 필요한 조치**(최소 수집, 로컬 세이브 무결성 서명, 제3자 SDK 최신 유지 등)를 하도록 노력합니다.
다만 인터넷·모바일 환경은 100% 안전하지 않음을 알려 드립니다.

### 11. 방침의 변경
법령·서비스·SDK 변경 시 본 방침을 수정할 수 있으며, **시행일·주요 변경 사유**를 본 페이지에 게시합니다.

### 12. 문의
- **이메일:** \`cs.team@rgames.co.kr\`

### 부록 A. 스토어 개인정보 신고 대응표(참고)
아래 표는 본 방침이 각 스토어의 개인정보 신고(Apple App Privacy / Google Play 데이터 보안)와 일치함을 보여 주기 위한 참고 자료입니다.

| 데이터 유형 | 수집 | 추적(다른 앱/웹과 결합) | 목적 | 출처 |
| --- | --- | --- | --- | --- |
| 식별자 > 기기/광고 ID | 예 | 예 | 광고, 분석 | AdMob·미디에이션 |
| 식별자 > 사용자 ID | 예(로그인 시) | 아니요 | 앱 기능 | Unity Authentication·플랫폼 계정 |
| 사용자 콘텐츠 > 기타(게임 진행) | 예(로그인 시) | 아니요 | 앱 기능 | Unity Cloud Save |
| 사용 데이터 > 제품 상호작용 | 예 | 예 | 광고, 분석 | AdMob·Firebase |
| 진단 > 충돌·성능 데이터 | 예 | 아니요 | 앱 기능·개선 | Firebase |
| 구매 내역 | 예 | 아니요 | 앱 기능 | 스토어(StoreKit / Play Billing) |

- 계정·클라우드 저장 데이터는 **로그인한 이용자에 한해** 수집되며, **광고 추적 목적으로 사용되지 않습니다(추적=아니요).**
- SDK를 추가·변경한 경우 본 문서 **2·5·6절**과 위 대응표, 그리고 스토어 신고를 함께 갱신해야 합니다.

### 부록 B. 본 프로젝트에서 확인된 기술 구성(참고)
- **Google Mobile Ads (AdMob)** + 미디에이션 어댑터: **AppLovin, Meta Audience Network, Vungle(Liftoff Monetize), Mintegral, Unity Ads**
- **Unity Purchasing (IAP)**
- **Firebase** (Google Analytics for Firebase, Crashlytics)
- **Unity Mobile Notifications** (로컬 알림)
- **Unity Gaming Services** (Unity Authentication, Cloud Save, Cloud Code, Leaderboards) — **월드보스 등 경쟁 콘텐츠용 선택 로그인·클라우드 저장.** 플랫폼 provider: iOS **Sign in with Apple**, Android **Google Play Games**.
- 로그인은 **선택**이며 핵심 게임은 계정 없이 이용 가능. **순수 익명 계정은 프로덕션 미사용.**

[이용약관](/games/hunter-tower/terms)도 함께 확인해 주세요.
`),
};
