# Hunter Tower Analytics Implementation Plan

**Goal:** 기존 게임의 수집 데이터와 필요한 운영 이벤트를 R Games Website 관리자 화면에 연결한다.
**Architecture:** Unity → Firebase Analytics → GA4 Data API → Google 권한으로 로그인한 정적 Next.js 관리자 화면. 서버 비밀키·새 유료 인프라 없음.
**Tech Stack:** Unity C#, Firebase, GA4 Data API, Google Identity Services, Next.js 15/React 19/TypeScript.
**Spec:** ../specs/2026-09-09-hunter-tower-analytics.md

## Constraints
기존 작업 보존. Git 쓰기 금지. 미수집 데이터 0 처리 금지. 공개 파일에 운영 데이터/토큰 저장 금지.

## Tasks
- [x] 게임: OperationsTelemetry helper + 의미 있는 성공/실패 훅 + bounded queue/throttle 검증 + 이벤트 사전.
- [x] API: lib/analytics/types.ts, client.ts; loadDashboard(token, propertyId, filters, signal). 국가/OS 필터, 기간 distinct 집계, metadata 기반 측정기준 확인, 부분 실패, 참 코호트 D1/D7. scripts/test-analytics.mjs로 실패·누락·집계 검증.
- [x] 인증: lib/analytics/auth.ts; authorize(clientId), revoke(token). analytics.readonly, 메모리 토큰, 만료·취소 처리.
- [x] UI: app/admin/hunter-tower/page.tsx, components/admin/HunterTowerDashboard.tsx와 CSS module. 로그인·필터·상태·표·수집 한계.
- [x] 연결: GA4 속성 확인, web OAuth client/승인 origin 생성, 실제 로그인·조회 검증. 사용자 승인 후 맞춤 측정기준 16개 등록, 기존 Google Ads 연결 확인. 새 게임 이벤트 수집은 새 앱 배포 후 확인한다.
- [x] 마감: tsc, Node tests, Next static export, 기존 지원 페이지 검증. 원본 프로젝트에 변경 파일만 복사, 설치·운영 문서 기록. 게임의 기존 dirty diff와 분리하여 변경 목록 제공.
