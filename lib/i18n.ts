export type Lang = 'ko' | 'en';

export interface PolicySection {
  h: string;
  b: string;
}

export interface Feature {
  t: string;
  d: string;
}

export interface CompanyRow {
  k: string;
  v: string;
}

export interface Dict {
  navGames: string;
  navCompany: string;
  navContact: string;
  heroBadge: string;
  heroTitle: string;
  heroDesc: string;
  heroCta: string;
  gamesTitle: string;
  htGenre: string;
  htDesc: string;
  getItOn: string;
  comingSoon: string;
  upBadge: string;
  upTitle: string;
  upDesc: string;
  companyTitle: string;
  companyDesc: string;
  contactTitle: string;
  contactDesc: string;
  addrLabel: string;
  address: string;
  footPrivacy: string;
  footTerms: string;
  footLegal1: string;
  footLegal2: string;
  footLegal3: string;
  privacyTitle: string;
  termsTitle: string;
  effectiveDate: string;
  features: Feature[];
  companyRows: CompanyRow[];
  privacySections: PolicySection[];
  termsSections: PolicySection[];
}

export const CONTACT = {
  email: 'rgames.owner@gmail.com',
  tel: '010-9539-9513',
  telIntl: '+82-10-9539-9513',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.rgames.huntertower',
  oneStore: 'https://m.onestore.co.kr/v2/ko-kr/app/0001006140',
};

export const SCREENSHOTS = [
  'https://play-lh.googleusercontent.com/xWnm85sDlXAsd9AkdqcTnOx2q9xszIuoXpsc5LHm7Zs30_n283hAKTbMndBCWJ4Qou5TR2r7JOXrnShTAojEAA=w526-h296',
  'https://play-lh.googleusercontent.com/1eVNBYpMIxNTMTXR9oGU0Q5NqLZ1z82G7FokdkPsCTFcT9I1GAXjDi2vjYj1DuW_RPOdj3OmTFu_xd5WZJwbk8U=w526-h296',
  'https://play-lh.googleusercontent.com/xGXomCGUFyXzdIbcF-FF51317I9Q4_uOWjx3wEn9WE6JYkUhAyJgYKnn0TcyG7C2vjjhFHCJX1g5zmZc1c0s2Q=w526-h296',
  'https://play-lh.googleusercontent.com/gfSRJdOBERZ6Y_SJidZAf-eewyfP_R3G6xDDNSyP0KW7bPPM0E27UY9GZ-1QA625lpDx4PfR-gk1cHMpnWB48g=w526-h296',
];

export const HT_ICON =
  'https://play-lh.googleusercontent.com/LjJRnWoebLGhi2mhmUq2aO-ozVbBls8KIEYHd7hiQEEmbJzTdiuJr-tUPW2oopDzqwhZFKv4opnqCVt8vLCzTg=w240-h240';

export const DICT: Record<Lang, Dict> = {
  ko: {
    navGames: '게임',
    navCompany: '회사',
    navContact: '문의',
    heroBadge: '작은 알에서 시작된 게임 스튜디오',
    heroTitle: '알을 깨고 나온 게임, 알 게임즈',
    heroDesc:
      '알 게임즈(R Games)는 소규모 팀의 모바일 게임 스튜디오입니다. 짧은 시간에도 성장의 재미가 느껴지는 모바일 게임을 만듭니다.',
    heroCta: '게임 보러 가기',
    gamesTitle: '우리가 만든 게임',
    htGenre: '방치형 · 시뮬레이션 RPG',
    htDesc:
      '헌터들이 자동으로 탑을 오르며 몬스터를 물리치는 2D 방치형 타워 클라이밍 RPG. 승급과 유물, 프레스티지로 매 회차가 더 빠르고 강해집니다. 오프라인 보상으로 자리를 비워도 성장은 계속됩니다.',
    getItOn: '다운로드',
    comingSoon: '심사 준비 중',
    upBadge: 'COMING SOON',
    upTitle: '차기 프로젝트 — 부화 준비 중',
    upDesc:
      '다음 알이 부화를 기다리고 있습니다. Hunter Tower의 대규모 업데이트(일일 던전, 월드 보스, 길드)와 함께 신작 소식을 이곳에서 가장 먼저 알려드릴게요.',
    companyTitle: '회사 정보',
    companyDesc:
      '알 게임즈는 대한민국에 등록된 게임 개발사입니다. 아래 정보는 사업자등록증 및 D-U-N-S 등록 정보와 일치합니다.',
    contactTitle: '문의하기',
    contactDesc:
      '게임 관련 문의, 버그 제보, 제휴 제안 모두 환영합니다. 이메일로 보내주시면 빠르게 답변드리겠습니다.',
    addrLabel: '주소',
    address: '인천광역시 연수구 하모니로 158, 317-C71 (우 21998)',
    footPrivacy: '개인정보처리방침',
    footTerms: '이용약관',
    footLegal1: '알 게임즈 (R Games) | 대표: 명석 | 사업자등록번호: 680-20-02554',
    footLegal2: '주소: 인천광역시 연수구 하모니로 158, 317-C71 (우 21998)',
    footLegal3: '이메일: rgames.owner@gmail.com | 전화: 010-9539-9513',
    privacyTitle: '개인정보처리방침',
    termsTitle: '이용약관',
    effectiveDate: '시행일: 2026년 7월 11일',
    features: [
      { t: '자동 등반', d: '헌터들이 층마다 몬스터를 처치하며 스스로 탑을 오릅니다.' },
      { t: '9단계 승급', d: 'F부터 O 등급까지, 엘릭서로 헌터를 승급시켜 강해지세요.' },
      { t: '프레스티지 & 유물', d: '환생으로 엘릭서와 소울스톤을 얻고, 유물로 다음 회차를 가속하세요.' },
    ],
    companyRows: [
      { k: '법인명 (상호)', v: '알 게임즈 (R Games)' },
      { k: '대표자', v: '명석' },
      { k: '사업자등록번호', v: '680-20-02554' },
      { k: '주소', v: '인천광역시 연수구 하모니로 158, 317-C71 (우 21998)' },
      { k: '이메일', v: 'rgames.owner@gmail.com' },
      { k: '전화', v: '010-9539-9513' },
      { k: '주요 사업', v: '모바일 게임 개발 및 서비스' },
    ],
    privacySections: [
      {
        h: '1. 총칙',
        b: '알 게임즈(R Games, 이하 "회사")는 「개인정보 보호법」 등 관련 법령을 준수하며, 이용자의 개인정보를 보호하기 위해 최선을 다합니다. 본 방침은 회사가 제공하는 모든 게임 및 서비스(Hunter Tower 포함, 이하 "서비스")에 적용됩니다.',
      },
      {
        h: '2. 수집하는 개인정보 항목 및 수집 방법',
        b: '회사의 게임은 별도의 회원가입 없이 이용할 수 있으며, 이름·이메일 등 개인 식별 정보를 직접 수집하지 않습니다.\n서비스 이용 과정에서 다음 정보가 자동으로 수집될 수 있습니다.\n• 기기 정보(기기 모델, OS 버전, 언어 설정)\n• 광고 식별자(ADID/IDFA)\n• 앱 이용 기록 및 오류 로그\n• 인앱 결제 시 스토어(Google Play, ONE store, App Store)가 처리하는 결제 정보(회사는 카드번호 등 결제 수단 정보를 직접 수집하지 않습니다)',
      },
      {
        h: '3. 개인정보의 수집 및 이용 목적',
        b: '• 게임 서비스의 제공 및 운영\n• 보상형 광고 등 광고 서비스 제공\n• 서비스 오류 분석 및 품질 개선\n• 부정 이용 방지',
      },
      {
        h: '4. 개인정보의 제3자 제공 및 처리 위탁',
        b: '회사는 서비스 제공을 위해 다음 사업자가 제공하는 도구를 사용하며, 해당 과정에서 광고 식별자 등 일부 정보가 각 사업자에게 전송될 수 있습니다.\n• Google AdMob (광고 제공)\n• Google Firebase (오류 분석 및 통계)\n• Google Play, ONE store, Apple App Store (인앱 결제 처리)\n각 사업자의 개인정보 처리에 관한 사항은 해당 사업자의 개인정보처리방침을 따릅니다.',
      },
      {
        h: '5. 개인정보의 보유 및 이용 기간',
        b: '수집된 정보는 수집·이용 목적이 달성되면 지체 없이 파기합니다. 다만 관계 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 보관합니다.',
      },
      {
        h: '6. 이용자의 권리',
        b: '이용자는 기기 설정에서 광고 식별자를 재설정하거나 맞춤형 광고를 제한할 수 있습니다.\n• Android: 설정 > Google > 광고\n• iOS: 설정 > 개인정보 보호 > 추적\n또한 이용자는 아래 연락처를 통해 자신의 정보에 대한 열람·삭제를 요청할 수 있습니다.',
      },
      {
        h: '7. 아동의 개인정보',
        b: '회사는 만 14세 미만 아동의 개인정보를 고의로 수집하지 않습니다. 아동의 정보가 수집된 사실을 알게 된 경우 지체 없이 삭제합니다.',
      },
      {
        h: '8. 개인정보의 안전성 확보 조치',
        b: '회사는 수집된 정보를 암호화된 통신(HTTPS)으로 전송하는 등 개인정보의 안전한 처리를 위한 기술적 조치를 시행하고 있습니다.',
      },
      {
        h: '9. 개인정보 보호책임자',
        b: '개인정보 보호책임자: 명석 (대표)\n이메일: rgames.owner@gmail.com\n전화: 010-9539-9513\n주소: 인천광역시 연수구 하모니로 158, 317-C71',
      },
      {
        h: '10. 고지의 의무',
        b: '본 방침의 내용이 변경되는 경우, 변경 사항을 시행일 7일 전부터 본 페이지를 통해 공지합니다.\n본 방침은 2026년 7월 11일부터 시행됩니다.',
      },
    ],
    termsSections: [
      {
        h: '제1조 (목적)',
        b: '본 약관은 알 게임즈(R Games, 이하 "회사")가 제공하는 게임 및 관련 서비스(이하 "서비스")의 이용 조건과 절차, 회사와 이용자의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.',
      },
      {
        h: '제2조 (정의)',
        b: '• "서비스"란 회사가 모바일 기기 등을 통해 제공하는 게임 및 부수 서비스를 말합니다.\n• "이용자"란 본 약관에 따라 서비스를 이용하는 자를 말합니다.\n• "유료 콘텐츠"란 이용자가 서비스 내에서 유상으로 구매하는 재화 및 아이템을 말합니다.',
      },
      {
        h: '제3조 (약관의 효력 및 변경)',
        b: '본 약관은 서비스 내 또는 회사 웹사이트에 게시함으로써 효력이 발생합니다. 회사는 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있으며, 변경 시 시행일 7일 전(이용자에게 불리한 변경은 30일 전)부터 공지합니다.',
      },
      {
        h: '제4조 (서비스의 제공 및 변경)',
        b: '회사는 연중무휴, 1일 24시간 서비스 제공을 원칙으로 합니다. 다만 시스템 점검, 서버 장애, 기타 운영상 필요에 따라 서비스의 전부 또는 일부가 일시 중단될 수 있으며, 회사는 사전 또는 부득이한 경우 사후에 이를 공지합니다. 회사는 게임 콘텐츠(밸런스, 이벤트 등)를 수시로 변경할 수 있습니다.',
      },
      {
        h: '제5조 (유료 콘텐츠 및 결제·환불)',
        b: '유료 콘텐츠의 구매 및 결제는 각 앱 마켓(Google Play, ONE store, App Store)의 결제 방식과 정책을 따릅니다.\n결제 취소 및 환불은 관련 법령(전자상거래법, 콘텐츠산업진흥법 등)과 각 앱 마켓의 환불 정책에 따라 처리됩니다.\n이미 사용한 유료 콘텐츠 등 법령상 청약철회가 제한되는 경우에는 환불이 제한될 수 있습니다.',
      },
      {
        h: '제6조 (이용자의 의무)',
        b: '이용자는 다음 행위를 해서는 안 됩니다.\n• 비정상적인 방법(해킹, 매크로, 어뷰징 등)으로 서비스를 이용하는 행위\n• 서비스의 소스코드, 데이터를 무단으로 복제·변경·배포하는 행위\n• 회사 또는 제3자의 권리를 침해하거나 서비스 운영을 방해하는 행위\n위반 시 회사는 서비스 이용을 제한할 수 있습니다.',
      },
      {
        h: '제7조 (지식재산권)',
        b: '서비스 및 서비스 내 콘텐츠에 대한 저작권 등 지식재산권은 회사에 귀속됩니다. 이용자는 회사의 사전 승낙 없이 이를 영리 목적으로 이용하거나 제3자에게 이용하게 할 수 없습니다.',
      },
      {
        h: '제8조 (책임의 제한)',
        b: '회사는 천재지변, 이용자의 귀책사유, 무료로 제공되는 서비스의 장애 등에 대하여 관련 법령이 허용하는 범위 내에서 책임을 지지 않습니다. 회사는 이용자가 서비스를 통해 기대하는 수익을 얻지 못한 것에 대해 책임을 지지 않습니다.',
      },
      {
        h: '제9조 (준거법 및 재판관할)',
        b: '본 약관은 대한민국 법령에 따라 해석되며, 서비스 이용과 관련하여 회사와 이용자 간에 분쟁이 발생한 경우 민사소송법에 따른 관할 법원에 제소합니다.',
      },
      {
        h: '부칙',
        b: '본 약관은 2026년 7월 11일부터 시행됩니다.\n문의: rgames.owner@gmail.com',
      },
    ],
  },
  en: {
    navGames: 'Games',
    navCompany: 'Company',
    navContact: 'Contact',
    heroBadge: 'A game studio hatched from a tiny egg',
    heroTitle: 'Freshly hatched games, from R Games',
    heroDesc:
      'R Games is an indie game studio based in Songdo, Incheon, Korea. We make mobile games where progress feels great — even in short sessions.',
    heroCta: 'See our games',
    gamesTitle: 'Our Games',
    htGenre: 'Idle · Simulation RPG',
    htDesc:
      'A 2D idle tower-climbing RPG where hunters automatically climb floors and defeat monsters. Promote hunters, collect relics, and Prestige to make every run faster and stronger. Offline rewards keep you growing while you are away.',
    getItOn: 'GET IT ON',
    comingSoon: 'In review',
    upBadge: 'COMING SOON',
    upTitle: 'Next project — incubating',
    upDesc:
      'The next egg is waiting to hatch. Major Hunter Tower updates (daily dungeons, world boss, guilds) and news about our next title will land here first.',
    companyTitle: 'Company',
    companyDesc:
      'R Games is a game developer registered in the Republic of Korea. The information below matches our business registration and D-U-N-S records.',
    contactTitle: 'Get in touch',
    contactDesc:
      'Game inquiries, bug reports, and partnership proposals are all welcome. Email us and we will get back to you quickly.',
    addrLabel: 'Address',
    address: '317, 158 Harmony-ro, Yeonsu-gu, Incheon, 21998, Republic of Korea',
    footPrivacy: 'Privacy Policy',
    footTerms: 'Terms of Service',
    footLegal1: 'R Games | CEO: Myeongseok | Business Registration No. 680-20-02554',
    footLegal2: 'Address: 317, 158 Harmony-ro, Yeonsu-gu, Incheon, 21998, Republic of Korea',
    footLegal3: 'Email: rgames.owner@gmail.com | Tel: +82-10-9539-9513',
    privacyTitle: 'Privacy Policy',
    termsTitle: 'Terms of Service',
    effectiveDate: 'Effective date: July 11, 2026',
    features: [
      { t: 'Auto climb', d: 'Hunters defeat monsters on each floor and climb upward on their own.' },
      { t: '9-rank promotion', d: 'Promote hunters from F all the way to O rank with Elixir.' },
      { t: 'Prestige & Relics', d: 'Prestige for Elixir and Soul Stones; relics make every next run faster.' },
    ],
    companyRows: [
      { k: 'Legal name', v: 'R Games (알 게임즈)' },
      { k: 'CEO', v: 'Myeongseok' },
      { k: 'Business Reg. No.', v: '680-20-02554' },
      { k: 'Address', v: '317, 158 Harmony-ro, Yeonsu-gu, Incheon, 21998, Republic of Korea' },
      { k: 'Email', v: 'rgames.owner@gmail.com' },
      { k: 'Tel', v: '+82-10-9539-9513' },
      { k: 'Business', v: 'Mobile game development and publishing' },
    ],
    privacySections: [
      {
        h: '1. Overview',
        b: 'R Games ("the Company") complies with applicable privacy laws, including the Personal Information Protection Act of Korea, and is committed to protecting users\' personal information. This policy applies to all games and services provided by the Company, including Hunter Tower ("the Service").',
      },
      {
        h: '2. Information We Collect',
        b: 'Our games can be played without creating an account, and we do not directly collect personally identifiable information such as your name or email address.\nThe following information may be collected automatically while you use the Service:\n• Device information (device model, OS version, language settings)\n• Advertising identifiers (ADID/IDFA)\n• App usage records and error logs\n• Payment information processed by the app stores (Google Play, ONE store, App Store) for in-app purchases — the Company does not directly collect payment credentials such as card numbers.',
      },
      {
        h: '3. Purpose of Collection and Use',
        b: '• Providing and operating the game service\n• Serving ads, including rewarded ads\n• Analyzing errors and improving quality\n• Preventing fraudulent use',
      },
      {
        h: '4. Third-Party Services',
        b: 'The Company uses tools provided by the following companies, and certain information such as advertising identifiers may be transmitted to them:\n• Google AdMob (advertising)\n• Google Firebase (crash analytics and statistics)\n• Google Play, ONE store, Apple App Store (in-app purchase processing)\nThe handling of personal information by each provider is governed by that provider\'s own privacy policy.',
      },
      {
        h: '5. Retention Period',
        b: 'Collected information is destroyed without delay once the purpose of collection has been fulfilled, except where retention is required by applicable law, in which case it is kept for the legally required period.',
      },
      {
        h: '6. Your Rights',
        b: 'You may reset your advertising identifier or limit personalized ads in your device settings:\n• Android: Settings > Google > Ads\n• iOS: Settings > Privacy > Tracking\nYou may also request access to or deletion of your information using the contact details below.',
      },
      {
        h: "7. Children's Privacy",
        b: 'The Company does not knowingly collect personal information from children under 14. If we learn that such information has been collected, we will delete it without delay.',
      },
      {
        h: '8. Security Measures',
        b: 'The Company implements technical measures for the safe handling of information, including encrypted transmission (HTTPS).',
      },
      {
        h: '9. Privacy Officer',
        b: 'Privacy Officer: Myeongseok (CEO)\nEmail: rgames.owner@gmail.com\nTel: +82-10-9539-9513\nAddress: 317, 158 Harmony-ro, Yeonsu-gu, Incheon, Republic of Korea',
      },
      {
        h: '10. Changes to This Policy',
        b: 'If this policy changes, the changes will be announced on this page at least 7 days before they take effect.\nThis policy is effective as of July 11, 2026.',
      },
    ],
    termsSections: [
      {
        h: 'Article 1 (Purpose)',
        b: 'These Terms govern the conditions and procedures for using the games and related services ("the Service") provided by R Games ("the Company"), and the rights, obligations, and responsibilities of the Company and users.',
      },
      {
        h: 'Article 2 (Definitions)',
        b: '• "Service" means the games and ancillary services provided by the Company on mobile devices and other platforms.\n• "User" means a person who uses the Service under these Terms.\n• "Paid Content" means goods and items purchased for a fee within the Service.',
      },
      {
        h: 'Article 3 (Effect and Amendment of Terms)',
        b: "These Terms take effect upon being posted within the Service or on the Company's website. The Company may amend these Terms within the bounds of applicable law, announcing changes at least 7 days before they take effect (30 days for changes unfavorable to users).",
      },
      {
        h: 'Article 4 (Provision and Changes of Service)',
        b: 'The Company aims to provide the Service 24 hours a day, year round. However, all or part of the Service may be temporarily suspended for system maintenance, server failure, or other operational needs, with prior notice where possible. The Company may modify game content (balance, events, etc.) at any time.',
      },
      {
        h: 'Article 5 (Paid Content, Payment, and Refunds)',
        b: "Purchases and payments for Paid Content follow the payment methods and policies of each app market (Google Play, ONE store, App Store).\nCancellations and refunds are handled in accordance with applicable laws and each app market's refund policy.\nRefunds may be limited for Paid Content that has already been used or where withdrawal is restricted by law.",
      },
      {
        h: 'Article 6 (User Obligations)',
        b: "Users must not:\n• Use the Service through abnormal means (hacking, macros, abuse, etc.)\n• Copy, modify, or distribute the Service's source code or data without authorization\n• Infringe the rights of the Company or third parties, or interfere with Service operations\nThe Company may restrict Service use in case of violations.",
      },
      {
        h: 'Article 7 (Intellectual Property)',
        b: "Copyrights and other intellectual property rights in the Service and its content belong to the Company. Users may not use them for commercial purposes or allow third parties to use them without the Company's prior consent.",
      },
      {
        h: 'Article 8 (Limitation of Liability)',
        b: 'To the extent permitted by applicable law, the Company is not liable for failures caused by force majeure, causes attributable to the user, or interruptions of services provided free of charge. The Company is not responsible for any expected profits users fail to obtain through the Service.',
      },
      {
        h: 'Article 9 (Governing Law and Jurisdiction)',
        b: 'These Terms are interpreted in accordance with the laws of the Republic of Korea. Disputes arising between the Company and users regarding the Service shall be brought before the competent court under the Civil Procedure Act of Korea.',
      },
      {
        h: 'Addendum',
        b: 'These Terms are effective as of July 11, 2026.\nContact: rgames.owner@gmail.com',
      },
    ],
  },
};
