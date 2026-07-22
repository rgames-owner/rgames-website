import type { GamePolicy } from '@/lib/games/types';
import { fromMarkdown } from '@/lib/games/fromMarkdown';

export const hunterTowerTermsEn: GamePolicy = {
  title: 'Hunter Tower Terms of Service',
  effectiveDate: '2026-05-06',
  lastUpdated: '2026-07-09',
  introNote: [{ type: 'text', text: 'These Terms apply to all distribution channels including Google Play, the Apple App Store, and ONE store.' }],
  blocks: fromMarkdown(`### Article 1. Purpose
These Terms of Service ("**Terms**") govern the use of the mobile game **Hunter Tower** (the "**App**") provided by \`R Games\` ("**we**", "**us**", or "**operator**") and define the rights and obligations between the operator and users.

### Article 2. Definitions
1. **"Service"**: All services provided through the App, including gameplay, content, in-app purchase features, and related functions.
2. **"User"**: Any person who agrees to these Terms and installs or uses the App.
3. **"Paid Content"**: Virtual currency, items, features, or other content available for purchase through in-app purchases (IAP).
4. **"Virtual Currency"**: In-game currencies such as gold or gems used within the App.
5. **"App Marketplace"**: An open-market operator through which the App is distributed and payments are processed, such as Google Play, the Apple App Store, or ONE store.

### Article 3. Effectiveness and modification of Terms
1. These Terms take effect when the User installs or uses the App.
2. We may revise these Terms to the extent permitted by applicable law. Revised Terms will be posted **at least 7 days before** the effective date via the App or this page.
3. If you do not agree to revised Terms, you may stop using the Service and uninstall the App.

### Article 4. Provision and modification of the Service
1. We provide gameplay content, advertisements, in-app purchases, and related services through the App.
2. We may modify the Service (including game balance, content, and features) as needed for operational or technical reasons.
3. If a change materially disadvantages Users, we will make reasonable efforts to provide advance notice.
4. The App may request device permissions (e.g., notifications, storage) to the extent necessary to provide the Service. The processing of personal data is governed by our **Privacy Policy**.

### Article 5. Service suspension or termination
1. We may suspend or discontinue all or part of the Service for:
- Technical reasons such as system maintenance, upgrades, or failures
- Force majeure events such as natural disasters, power outages, or armed conflict
- Business decisions to end the Service
2. If we terminate the Service, we will provide notice **at least 30 days** in advance via the App or this page.

### Article 6. User obligations
Users must **not**:
1. Reverse-engineer, decompile, or disassemble the App
2. Exploit bugs or vulnerabilities, or manipulate game data by illegitimate means
3. Use cheat programs, macros, automation tools, or similar software
4. Manipulate the system clock or other device settings to gain unfair advantages
5. Access another person's device or account without authorization
6. Engage in any other conduct that violates applicable laws or public order

### Article 7. Enforcement
1. If a User violates Article 6, we may restrict access to the Service or reset game data **without prior notice**.
2. We are not obligated to refund Paid Content lost as a result of enforcement actions.

### Article 8. In-app purchases and Paid Content
1. Paid Content is purchased through the payment systems of app marketplaces such as **Google Play**, the **Apple App Store**, or **ONE store**.
2. Prices for Paid Content are as displayed in the App or the relevant store.
3. You may **withdraw your purchase within 7 days** under applicable consumer-protection laws (e.g., Korea's Act on Consumer Protection in Electronic Commerce). However, withdrawal may be restricted for Paid Content whose **use or consumption has begun with your consent**, or as otherwise permitted by law; in such cases we will disclose this and obtain your consent in advance.
4. Refunds are subject to the refund policies of the applicable store and to applicable law:
- Google Play: [Google Play refunds](https://support.google.com/googleplay/answer/2479637)
- Apple App Store: [Apple refunds](https://support.apple.com/en-us/HT204084)
5. **Minors' purchases:** If a minor makes a purchase without the consent of a legal guardian, the user or the legal guardian may cancel the purchase in accordance with applicable law (e.g., the Korean Civil Act), except where cancellation is restricted by law (e.g., where guardian consent was given, or the purchase falls within property the minor was permitted to dispose of freely).
6. **Probability-based Paid Content:** For Paid Content whose outcome is determined by chance (e.g., loot boxes or gacha), we provide the applicable drop-rate information within the App in accordance with applicable law (e.g., the Korean Game Industry Promotion Act).

### Article 9. Virtual Currency
1. Virtual Currency is valid **only within the App** and cannot be exchanged for cash or transferred or sold to third parties.
2. Virtual Currency is the intellectual property of the operator; Users receive a **license to use** it.
3. Upon termination of the Service, Virtual Currency provided **free of charge** will expire with no obligation to compensate. However, for **unused paid Virtual Currency that you purchased for a fee**, we will take necessary measures such as refunds in accordance with applicable law and content-user protection guidelines.

### Article 10. Advertisements
1. We may display advertisements within the App to support operation of the Service.
2. We are not responsible for any loss arising from a User's interaction with third-party services accessed through advertisements.

### Article 11. Intellectual property
1. All intellectual property rights in the App's content (code, graphics, sound, text, UI design, etc.) belong to the operator.
2. Users may not reproduce, distribute, modify, or create derivative works from the content without the operator's prior written consent.

### Article 12. Disclaimer
1. We are not liable for data loss caused by the User's own actions (device loss, app deletion, misuse, etc.).
2. Our liability for free portions of the Service does not exceed what is mandated by applicable law.
3. We are not liable for service disruptions caused by force majeure events or system failures beyond our reasonable control.

### Article 13. Limitation of liability
If we cause damage to a User through **willful misconduct or gross negligence**, we will compensate in accordance with applicable law. However, our liability is limited to the **amount actually paid by the User** (except where overridden by mandatory statutory provisions).

### Article 14. Account sign-in and cloud storage
1. The App offers **platform account sign-in** for certain **competitive/ranking content such as World Boss**. The **core game is usable without signing in**; sign-in is at the User's option.
2. Sign-in and cloud storage are provided via **Unity Gaming Services** (Unity Authentication, Cloud Save, Leaderboards, etc.). When signed in, some or all of your game progress may be synced to and stored on cloud servers. Information processed is governed by our **Privacy Policy**.
3. Accounts and rankings are managed **per platform account** (iOS: Sign in with Apple; Android: Google Play Games). **Transfer or merging of accounts across different platforms (e.g., Android ↔ iOS) is not supported.**
4. Signing in again with the same platform account restores the same account. However, data created under a **purely anonymous account** relies on session information stored only on the device and **may not be recoverable after reinstall or device change**; we are not responsible for such loss.
5. You may request **deletion of your account and cloud-saved data** via the **account deletion feature in the App's settings** or by emailing support. Upon deletion, the associated ranking and cloud-save data are removed and cannot be restored thereafter.
6. We make **reasonable efforts to maintain the integrity and availability** of cloud-saved data, but we are liable only within the scope permitted by applicable law for data loss caused by events beyond our reasonable control (e.g., network or server failures).

### Article 15. App Marketplace-specific terms
1. The App is distributed through app marketplaces (Google Play, the Apple App Store, ONE store, etc.). These Terms are concluded **between the operator and the User only**; the **App Marketplace operator is not a party** to these Terms.
2. The App Marketplace operator has **no obligation to furnish maintenance or support** for the App; such matters are handled by the operator (see Article 17 for contact).
3. If the App fails to conform to any applicable warranty, you may notify the applicable store, which may **refund the purchase price** under its policy; to the maximum extent permitted by law, the App Marketplace operator has **no other warranty obligation** whatsoever.
4. The operator, not the App Marketplace operator, is responsible — to the extent permitted by applicable law — for addressing any **third-party claims** relating to the App or your use of it (including product liability, legal or regulatory non-compliance, consumer protection, and intellectual-property infringement claims).
5. You represent that you are **not located in a country subject to a U.S. Government embargo** and that you are **not listed on any U.S. Government list of prohibited or restricted parties**.
6. **Apple App Store terms:** When you use the App on an Apple device, **Apple Inc. and its subsidiaries are third-party beneficiaries** of these Terms and, upon your acceptance, have the right to enforce these Terms against you as a third-party beneficiary. The license granted for the App is limited to a **non-transferable license** to use the App on any Apple-branded products that you own or control, as permitted by the **Usage Rules** set out in the Apple Media Services / App Store Terms of Service.

### Article 16. Governing law and dispute resolution
1. These Terms are governed by and construed in accordance with the **laws of the Republic of Korea**.
2. The competent court for disputes arising from the Service shall be determined in accordance with applicable law (including the Korean Civil Procedure Act).
3. For Users outside Korea, mandatory local laws may apply to the extent required.

### Article 17. Contact
- **Email:** \`cs.team@rgames.co.kr\`

### Appendix
- Please also review our **Privacy Policy** alongside these Terms of Service: [Privacy Policy](/games/hunter-tower/privacy)
`),
};
