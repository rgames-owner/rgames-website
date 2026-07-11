# R Games Website

알 게임즈(R Games) 공식 랜딩 페이지 — Next.js (App Router, TypeScript).

앱스토어 심사용 회사 홈페이지: 법인명·사업자등록번호·주소·연락처, Hunter Tower 소개,
개인정보처리방침(/privacy), 이용약관(/terms), 한/영 토글 포함.

## 시작하기

```bash
# 이 폴더를 ~/Game/R Games Website 로 이동한 뒤:
cd ~/Game/"R Games Website"
npm install
npm run dev
```

http://localhost:3000 에서 확인.

## 배포 (예: Vercel)

```bash
npm i -g vercel
vercel
```

또는 GitHub에 push 후 vercel.com에서 import — 도메인 연결까지 하면
앱스토어 심사에 제출할 URL이 완성됩니다.

## 구조

- `app/page.tsx` — 홈 (히어로 / 게임 / 회사 정보 / 문의)
- `app/privacy/page.tsx` — 개인정보처리방침 (한/영)
- `app/terms/page.tsx` — 이용약관 (한/영)
- `lib/i18n.ts` — **모든 텍스트·회사 정보가 여기 있음** (수정은 이 파일에서)
- `components/` — Header(언어 토글), Footer(법적 고지), Home, PolicyPage
- `public/logo.png` — 회사 로고

## 수정 포인트

- 회사 이메일이 생기면 `lib/i18n.ts`의 `CONTACT.email` 및 footLegal3, 정책 문서 내 이메일 교체
- App Store 심사 통과 후: `components/Home.tsx`의 `store-btn disabled` div를
  Google Play 버튼과 같은 `<a>` 링크로 교체
- 시행일 변경: `lib/i18n.ts`의 `effectiveDate` 및 정책 마지막 조항
