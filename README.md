# R Games Website

알 게임즈(R Games) 공식 랜딩 페이지 — Next.js (App Router, TypeScript).

앱스토어 심사용 회사 홈페이지: 법인명·사업자등록번호·주소·연락처, Hunter Tower 소개,
개인정보처리방침(/privacy), 이용약관(/terms), 게임별 정책·패치노트, 한/영 토글 포함.

## 시작하기

```bash
# 이 폴더를 ~/Game/R Games Website 로 이동한 뒤:
cd ~/Game/"R Games Website"
npm install
npm run dev
```

http://localhost:3000 에서 확인.

## 배포 (Cloudflare Pages)

GitHub 저장소를 Cloudflare Pages에 연결한 뒤 다음 빌드 설정을 사용합니다.

- Build command: `npm run build`
- Build output directory: `out`
- Custom domain: `rgames.co.kr`

`main` 브랜치에 push하면 자동으로 다시 배포됩니다.

## 구조

- `app/page.tsx` — 홈 (히어로 / 게임 / 회사 정보 / 문의)
- `app/privacy/page.tsx` — 회사 개인정보처리방침 (한/영)
- `app/terms/page.tsx` — 회사 이용약관 (한/영)
- `app/games/[slug]/privacy` · `terms` · `patch-notes` — 게임별 정책·패치노트
- `app/games/[slug]/support` — 게임별 고객지원
- `lib/i18n.ts` — 사이트 공통 텍스트·회사 정보
- `lib/games/` — 게임별 정책·패치노트 데이터
- `components/` — Header(언어 토글), Footer, Home, Policy / PatchNotes 페이지
- `scripts/sync-hunter-tower-patch-notes.mjs` — 인게임 패치노트 동기화
- `public/logo.png` — 회사 로고

## Hunter Tower 패치노트 동기화

인게임 로컬라이즈(`UI.csv`) + `PatchNoteTable.asset`에서 한/영 패치노트를 가져와
`lib/games/hunter-tower/patch-notes.generated.ts`를 생성합니다.

```bash
# 기본 경로: ../Hunter_Tower/... (이 레포와 형제 폴더일 때)
npm run sync:patch-notes

# 경로가 다르면:
HT_UI_CSV=/path/to/UI.csv \
HT_PATCH_NOTE_TABLE=/path/to/PatchNoteTable.asset \
npm run sync:patch-notes
```

홈의 Hunter Tower 카드에서 **패치노트** → `/games/hunter-tower/patch-notes`.
게임 패치 배포 후 `npm run sync:patch-notes` 실행하고 생성 파일을 커밋하면 웹에 반영됩니다.

## 수정 포인트

- App Store 심사 통과 후: `components/Home.tsx`의 `store-btn disabled` div를
  Google Play 버튼과 같은 `<a>` 링크로 교체
- 시행일 변경: `lib/i18n.ts`의 `effectiveDate` 및 정책 마지막 조항
- 패치노트 갱신: 위 `sync:patch-notes` 실행 후 생성 파일 커밋
