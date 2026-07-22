import type { Lang } from '@/lib/i18n';
import type { GameSupport } from '@/lib/games/types';

export const hunterTowerSupport: Record<Lang, GameSupport> = {
  ko: {
    title: 'Hunter Tower 고객지원',
    intro:
      '게임 오류, 결제, 계정 및 데이터 삭제, 개선 의견을 아래 이메일로 보내주세요.',
    categoriesTitle: '문의 유형',
    categories: [
      {
        title: '게임 오류',
        description: '발생 화면, 재현 순서, 오류 메시지와 함께 알려주세요.',
      },
      {
        title: '결제 및 구매 복원',
        description: '스토어 주문번호와 구매 상품명을 알려주세요. 결제 카드 전체 정보는 보내지 마세요.',
      },
      {
        title: '계정 및 데이터 삭제',
        description: '게임 설정의 계정 삭제 기능을 사용하거나 Player ID와 함께 삭제를 요청해 주세요.',
      },
      {
        title: '의견 및 기능 제안',
        description: '밸런스, 편의 기능, 콘텐츠에 관한 의견을 보내주세요.',
      },
    ],
    includeTitle: '빠른 확인을 위해 포함할 정보',
    includeItems: ['Player ID', '앱 버전', '기기 모델과 OS 버전', '문제 발생 시각과 재현 순서'],
    privacyWarning: '비밀번호나 결제 카드 전체 정보는 이메일로 보내지 마세요.',
    contactTitle: '직접 문의',
    contactDescription: '아래 버튼을 누르면 기본 이메일 앱이 열립니다.',
    emailAction: '이메일로 문의하기',
    emailSubject: '[Hunter Tower] 고객지원 문의',
    privacyLink: '개인정보처리방침',
    termsLink: '이용약관',
  },
  en: {
    title: 'Hunter Tower Support',
    intro:
      'Contact us for bugs, purchases, account or data deletion, feedback, and feature requests.',
    categoriesTitle: 'How we can help',
    categories: [
      {
        title: 'Game issues',
        description: 'Tell us which screen was affected, how to reproduce the issue, and any error message.',
      },
      {
        title: 'Purchases and restoration',
        description: 'Include the store order number and product name. Do not send full payment-card details.',
      },
      {
        title: 'Account and data deletion',
        description: 'Use account deletion in game settings, or send a deletion request with your Player ID.',
      },
      {
        title: 'Feedback and feature requests',
        description: 'Send suggestions about balance, quality-of-life features, or game content.',
      },
    ],
    includeTitle: 'Information that helps us investigate',
    includeItems: ['Player ID', 'App version', 'Device model and OS version', 'Time of issue and reproduction steps'],
    privacyWarning: 'Do not email passwords or full payment-card details.',
    contactTitle: 'Contact support',
    contactDescription: 'Use the button below to open your default email app.',
    emailAction: 'Email support',
    emailSubject: '[Hunter Tower] Support request',
    privacyLink: 'Privacy Policy',
    termsLink: 'Terms of Service',
  },
};
