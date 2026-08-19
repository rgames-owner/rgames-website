import type { GamePolicy } from '@/lib/games/types';
import { fromMarkdown } from '@/lib/games/fromMarkdown';

export const hunterTowerPrivacyEn: GamePolicy = {
  title: 'Hunter Tower Privacy Policy',
  effectiveDate: '2026-05-06',
  lastUpdated: '2026-08-20',
  introNote: [{ type: 'text', text: 'This Privacy Policy applies to all distribution channels including Google Play, the Apple App Store, and ONE store.' }],
  blocks: fromMarkdown(`### 1. Introduction
\`R Games\` ("**we**", "**us**", or "**operator**") operates the mobile game **Hunter Tower** (the "**App**"). We explain how information is handled in connection with the App in line with applicable privacy laws (including, where relevant, the laws of the Republic of Korea).
- The **scope of information processed** depends on how the App actually works, integrated SDKs, and policies of app stores (Google Play, Apple App Store, ONE store, etc.).
- This policy is current as of the **Last updated** date above. We may notify you of changes via the App or this page.

**Contact**
- Email: \`cs.team@rgames.co.kr\`

### 2. Information we collect or that is processed
The App is offered **without requiring account registration**. We do **not** collect email, real name, or similar account details that you do not voluntarily provide. The one exception is the **display name (nickname) you enter yourself**, which is processed only if you take part in the rankings and is **shown to other players** in the ranking list (see 2.6).

However, the following categories may be **generated automatically** or **processed by third parties** (ads, app stores, payments) for service delivery, advertising, payments, and device compatibility:

### 2.1 Device and app usage information
- Device model, OS version, app version, language, screen resolution, and similar data needed to **run the App** and maintain compatibility
- **Advertising identifiers** (Advertising ID / GAID on Android, IDFA on iOS) for **serving and measuring ads and fraud prevention**. On iOS, use is subject to your **App Tracking Transparency (ATT)** consent and platform settings.
- **Ad-related events** such as impressions, clicks, and rewarded ad completion, as defined by ad network policies. We may record **impression-level revenue data provided by the ad mediation SDK** (ad network, ad format, estimated revenue) in Firebase Analytics for ad operations statistics and **fraud (invalid traffic) prevention**.
- **App usage analytics** (app instance identifier, in-app event logs, coarse IP-based location, etc.), processed via **Firebase Analytics** for usage statistics and service improvement
- **Crash diagnostics** (error logs, device state, OS and app version, etc.), processed via **Firebase Crashlytics** for stability and error diagnosis
- **Default Firebase collection:** Firebase Analytics and Firebase Crashlytics are enabled by default when the App starts. The SDKs may automatically process app-usage events and may collect or send crash diagnostics when a crash occurs or the App is next launched.

### 2.2 Game progress (local and cloud storage)
- By default, the App stores game progress (e.g., stages, currency, settings) in **local storage on your device**.
- If you **sign in with a platform account**, some or all of your game progress may be **synced to and stored on Unity Gaming Services servers via cloud storage (Unity Cloud Save)**. This enables **progress restore across devices/reinstalls and access to ranking and competitive content**.
- Sign-in is **optional** (see 2.6). If you do not sign in, your progress **remains only on your device**.

### 2.3 In-app purchases
- The App may use **Unity IAP** with **Google Play, the App Store, ONE store, or other marketplaces**.
- **Payment authorization, receipts, and payment method details** are processed by the **store operator** (e.g., Google, Apple). We process **minimal information** inside the App (e.g., transaction identifiers) **only as needed** to validate purchases and deliver content. We do **not** store your payment card details.

### 2.4 Local notifications
- The App may schedule and display **on-device local notifications** (e.g., comeback reminders) and requests OS **notification permission** once for this purpose.
- Local notifications are **scheduled and delivered entirely on your device**; no personal data is sent to external servers for this. You can disable notifications at any time in your **device settings**.

### 2.5 Information you send to us
- Content you voluntarily provide when contacting support (e.g., message text, reply email address)

### 2.6 Account sign-in and cloud storage (optional)
- The App requests **platform account sign-in** for **ranking and competitive content**. The **core game (progression, combat, shop, etc.) is fully usable without signing in**; sign-in is optional.
- Sign-in and cloud storage are provided via **Unity Gaming Services (Unity Authentication, Cloud Save, Leaderboards, etc.)**. The following may be processed:
- **Unity Authentication player ID** (the authoritative account identifier)
- **Platform account identifier** — iOS: **Apple Game Center**; Android: **Google Play Games**
- **Ranking display name (nickname)** and **ranking scores**
- **Cloud-synced game progress** (see 2.2)
- Accounts and rankings are managed **per platform account**. **Transfer or merging of accounts across different platforms (e.g., Android ↔ iOS) is not supported.** Signing in again with the same platform account restores the same account.
- Except for development/QA convenience, we do **not** use purely anonymous accounts in production.

### 2.7 Ranking (leaderboard) information
- The App provides rankings for **highest floor, power, prestige count, codex level, and relic score**. Each score is **derived from your own game progress data** and contains no separate identifying information.
- Ranking scores are stored in **Unity Gaming Services Leaderboards**, and your **display name (nickname), rank, and score are visible to other players**.
- **No score is sent unless you open the ranking screen.** Submission happens the first time you open it in a session, and afterwards only for categories whose value has changed.
- The **display name (nickname)** is entered by you and stored on Unity Gaming Services servers. We recommend not using your real name, email address, or other identifying information as a nickname. You can change it at any time in the App's **settings screen**.
- Rankings are currently **for display only (honor rankings)** — no currency or item rewards are granted based on rank. We will update this policy if reward-based rankings (World Boss, guild, arena, etc.) are introduced.

### 3. Purposes of processing
- **Providing and maintaining** the App (saving progress, troubleshooting, etc.)
- **App usage analytics and crash diagnostics** for service improvement, error diagnosis, and stability
- **Cloud save and account sign-in** for progress restore, **ranking/competitive content** (including public display of your ranking name, rank, and score), and prevention of rank manipulation
- **Personalized or non-personalized ads**, ad measurement, and **abuse prevention**
- **In-app purchases** and delivery of paid content or features
- **Legal compliance**, dispute handling, and aggregated statistics where identification is limited

### 4. Retention
- **Local game data:** May be removed when you uninstall the App (subject to device/OS behavior).
- **Account & cloud-save data:** Retained until you **request account deletion or delete it via the in-app feature**, after which it is deleted per Unity Gaming Services policy. On season end or service termination, it is handled per applicable law and store policies.
- **Ad-related data:** Retention follows the policies of the integrated partners listed in Section 5.
- **Analytics and crash data:** User-level **Firebase Analytics** data is retained for up to **14 months** and then deleted automatically; **Firebase Crashlytics** crash reports are retained for up to **90 days** (per Google policy).
- **Payments/transactions:** As required by applicable law and store policies.
- **Support requests:** We retain them for **one year after resolution**, then delete them without undue delay.

### 5. Third parties and processors
The App uses the **third-party services (SDKs)** below. Each provider processes information under its **own privacy policy**.

| Category | Service | Processing |
| --- | --- | --- |
| Ads (mediation platform) | Unity LevelPlay (ironSource — Unity Technologies) | Banner, interstitial, and rewarded ads, bidding, and measurement. Mediation may show ads from the networks below. |
| Ads (networks) | Unity Ads, ironSource Ads, Meta Audience Network, Liftoff Monetize (Vungle), Yandex Ads | Ad serving and measurement via LevelPlay mediation. Each network processes advertising identifiers under its own policy. Networks may be added or removed operationally. |
| In-app purchases | Unity IAP + Google Play / App Store / ONE store | Purchases and receipt validation processed through the stores. |
| Account, cloud & ranking | Unity Gaming Services (Unity Authentication, Cloud Save, Leaderboards — Unity Technologies) | Platform sign-in, cloud sync of game progress, and storage/retrieval of ranking name, rank, and score (when signed in). Cloud Code may additionally be used if reward-based rankings are introduced. |
| Platform accounts | Apple Game Center (iOS), Google Play Games (Android) | Platform account authentication when you sign in, per each platform's policy. |
| Engine | Unity (Unity Technologies) | Technical processing related to the build and runtime, per Unity's policies. |
| Analytics & crash | Firebase (Google Analytics for Firebase, Crashlytics — Google LLC) | App usage analytics and crash diagnostics. Data is processed by Google under its own policy. |

Provider privacy policies (subject to change):
- Google (Firebase, Google Play Games): [Google Privacy Policy](https://policies.google.com/privacy)
- Unity (incl. Unity LevelPlay, ironSource, Unity Ads, and Unity Gaming Services): [Unity Privacy Policy](https://unity.com/legal/privacy-policy) · [Unity game player privacy](https://unity.com/legal/game-player-and-app-user-privacy-policy) · [ironSource Privacy Policy](https://www.is.com/privacy-policy/)
- Apple (Game Center): [Apple Privacy Policy](https://www.apple.com/legal/privacy/)
- Meta Audience Network: [Meta Privacy](https://www.facebook.com/about/privacy)
- Liftoff Monetize (Vungle): [Liftoff Privacy](https://vungle.com/privacy/)
- Yandex Ads: [Yandex Privacy](https://yandex.com/legal/confidential/)

We may change processors or their roles; **material changes** will be reflected in this policy when appropriate.

### 6. International transfers
Some providers (e.g., Google — including Firebase and Google Play Games — Unity (**Unity LevelPlay, ironSource, Unity Ads, and Unity Gaming Services, including account, cloud-save, and ranking data**), Apple, Meta, Liftoff (Vungle), Yandex) may process data on servers **outside your country** (e.g., the United States and other regions). When you sign in, your **account identifier and cloud-saved game data may be processed and stored on servers abroad (e.g., in the United States).** In that case, processing is subject to their **privacy policies** and **safeguards** (such as standard contractual clauses) as described by each provider.

### 7. Your rights
Depending on your jurisdiction, you may have rights to **access, correct, delete, or restrict** processing of personal data.
- **If you have not signed in:** your progress is stored only on your device and can be removed by **uninstalling the App**.
- **If you have signed in (account & cloud save):** you can request **deletion of your account and cloud-saved data** via the **account deletion feature in the App's settings** or by emailing us below. Upon request, cloud-save and ranking data linked to your Unity Authentication account are deleted. (Uninstalling or signing out alone does **not** delete server-side account data.)
- **Correcting your ranking display name:** change it at any time via **Settings → Change Nickname** in the App.
- **Ads / tracking:**
- **Android:** Settings → Google → Ads or privacy settings — **reset ad ID**, **opt out of ads personalization**, etc.
- **iOS:** Settings → Privacy & Security → **Tracking**, **Apple Advertising**, etc.

Contact: \`cs.team@rgames.co.kr\`

### 8. Ads, similar technologies, and consent
- **Ad SDKs** may process advertising identifiers and related data.
- Users in the **EEA, UK, and Switzerland** are shown an **in-app ad privacy consent dialog** on first launch. If you **agree**, your device's advertising identifier is used for **personalized ads**; if you **decline**, **non-personalized ads** are shown. Declining does not affect gameplay or ad rewards. Your choice is stored only on your device and can be changed at any time (including withdrawing consent) in **Settings → Ad Privacy Options** in the App. Region is determined from the SIM/network country or the device's region setting.
- On iOS, if the App requests permission through **App Tracking Transparency (ATT)**, the system prompt asks whether the App may access IDFA and track activity across other companies' apps and websites. You may decline and continue using the App; cross-app tracking, ad personalization, and ad measurement may then be limited.
- The in-app ad privacy consent dialog and iOS ATT apply to advertising and tracking choices. They are not separate consent or opt-out controls for Firebase Analytics or Firebase Crashlytics, and changing an ad consent or ATT choice does not disable Firebase collection.
- To prevent ad fraud (invalid traffic), the App may evaluate on-device signals such as **abnormal device clock changes, emulator environments, and abnormal ad-click frequency** and temporarily limit ad serving. This evaluation happens on the device and does not transmit additional personal data externally.
- The App currently does not provide a separate in-app setting that lets users directly enable or disable Firebase Analytics or Firebase Crashlytics collection.

### 9. Children
The App is **not primarily directed** at children **under 14**. If child-directed, we additionally comply with **applicable child-protection laws** and **Google, Apple, and ad network policies** for child-directed services.

### 10. Security
We endeavor to apply **reasonable measures** (minimizing data, signing local-save integrity, keeping SDKs updated, etc.). No mobile or internet transmission is **100% secure**.

### 11. Changes to this policy
We may update this policy when laws, the App, or SDKs change. We will post the **effective date** and, where appropriate, summarize **material changes** on this page.

**Revision history**
- **2026-08-20:** Switched the ad platform from Google AdMob to **Unity LevelPlay (ironSource) mediation** (from App version 1.1.2). Replaced Google UMP with an **in-app ad privacy consent dialog**, and updated the ad network list (Unity Ads, ironSource Ads, Meta Audience Network, Liftoff Monetize, Yandex Ads), international-transfer providers, and Appendices A and B. Added ad-fraud prevention wording (Section 8).
- **2026-07-26:** Added account sign-in, cloud save, and rankings (Unity Gaming Services).

### 12. Contact
- **Email:** \`cs.team@rgames.co.kr\`

### Appendix A. Store privacy-disclosure mapping (reference)
The table below shows this policy aligns with each store's privacy disclosure (Apple App Privacy / Google Play Data safety).

| Data type | Collected | Tracking (linked with other apps/web) | Purpose | Source |
| --- | --- | --- | --- | --- |
| Identifiers > Device/Ad ID | Yes | Yes | Advertising, Analytics | Unity LevelPlay & ad networks |
| Identifiers > User ID | Yes (when signed in) | No | App functionality | Unity Authentication & platform account |
| User Content > Other (game progress) | Yes (when signed in) | No | App functionality | Unity Cloud Save |
| User Content > Other (ranking name & score) | Yes (when using rankings) | No | App functionality | Unity Leaderboards |
| Usage Data > Product Interaction | Yes | Yes | Advertising, Analytics | Unity LevelPlay & Firebase |
| Diagnostics > Crash & Performance | Yes | No | App functionality | Firebase |
| Purchases | Yes | No | App functionality | Store (StoreKit / Play Billing) |

- Account & cloud-save data is collected **only for signed-in users** and is **not used for ad tracking (Tracking = No)**.
- If you add or change SDKs, update **Sections 2, 5, and 6**, this mapping, and the store disclosures together.

### Appendix B. Technical setup observed in this project (reference)
- **Unity LevelPlay (ironSource SDK)** with network adapters: **Unity Ads, ironSource Ads, Meta Audience Network, Liftoff Monetize (Vungle), Yandex Ads** (from 2026-08-20, App 1.1.2 — earlier versions used Google AdMob mediation)
- **In-app ad privacy consent dialog** (EEA, UK, Switzerland) + iOS **App Tracking Transparency**
- **Unity Purchasing (IAP)**
- **Firebase** (Google Analytics for Firebase, Crashlytics)
- **Unity Mobile Notifications** (local notifications)
- **Unity Gaming Services** (Unity Authentication, Cloud Save, Leaderboards) — **optional sign-in, cloud save, and rankings for competitive content.** Platform providers: iOS **Apple Game Center**, Android **Google Play Games**.
- **Five ranking categories**: highest floor · power · prestige count · codex level · relic score (display only, no rewards)
- Sign-in is **optional** and the core game is playable without an account. **Purely anonymous accounts are not used in production.**

Also see our [Terms of Service](/games/hunter-tower/terms).
`),
};
