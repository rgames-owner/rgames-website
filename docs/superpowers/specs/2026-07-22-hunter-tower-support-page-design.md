# Hunter Tower Support Page Design

## Goal

Add a public Hunter Tower support page that satisfies App Store Connect's Support URL requirement and fits the existing R Games website.

## Route and publishing

- Public route: `/games/hunter-tower/support`
- Production URL: `https://rgames.co.kr/games/hunter-tower/support`
- Keep the existing Next.js static-export and Cloudflare Pages deployment flow.
- Do not run a local production build. The user will push changes; Cloudflare Pages will build and deploy automatically.

## User experience

- Reuse the site's shared header, footer, responsive layout, and Korean/English language toggle.
- Identify the page and game clearly as Hunter Tower customer support.
- Show support categories: bugs, purchases/restoration, account/data deletion, and feedback.
- Provide a prominent `mailto:cs.team@rgames.co.kr` contact action.
- Tell users to include Player ID, app version, device/OS, and reproducible symptoms.
- Warn users not to send passwords or full payment-card details.
- Link to Hunter Tower privacy policy and terms of service.
- Display R Games contact details already held in the shared `CONTACT` and localization data: support email, phone, and legal address.
- Add a Customer Support link to the Hunter Tower card on the home page.

## Architecture

- Add typed Korean and English support content to the Hunter Tower game data.
- Add a reusable `GameSupportPage` component driven by the existing `LangProvider`.
- Add a dynamic support route following existing privacy, terms, and patch-notes route patterns.
- Extend shared game types only as needed for support content.
- Reuse existing CSS tokens and policy/card styles; add focused support-page classes only where current styles are insufficient.

## Data flow

1. Static route resolves `hunter-tower` through `getGame`.
2. `GameSupportPage` reads active `ko` or `en` language from `LangProvider`.
3. Component renders localized support content plus shared company contact values.
4. Email action opens the user's configured mail client through `mailto:`; no form submission, API, database, or stored user data is introduced.

## Error and privacy handling

- Unknown game slugs return the existing Next.js not-found response.
- Missing support data prevents route generation instead of rendering an incomplete page.
- External mail and policy links remain normal user-initiated navigation.
- Page does not collect, transmit, or store support requests itself.

## Verification

- Run `npx tsc --noEmit` only; do not run `npm run build`.
- Confirm route metadata, Korean/English content, mailto target, policy links, and home-page support link by static inspection.
- After user push and Cloudflare deployment, verify the production URL is publicly accessible without login before using it in App Store metadata.

## Out of scope

- Contact form backend, ticket database, spam protection, response-time guarantees, and Cloudflare deployment changes.
- Git staging, commits, and pushes.
- App Store metadata automation; that follows after production support URL verification.
