/* AUTO-GENERATED — do not edit by hand.
 * Run: npm run sync:patch-notes
 * Generated: 2026-10-05T15:54:40.545Z
 * Sources:
 *   ../Hunter_Tower/Assets/Project/Localization/Tables/UI.csv
 *   ../Hunter_Tower/Assets/Project/ScriptableObjects/Data/PatchNoteTable.asset
 */
import type { GamePatchNotes } from '@/lib/games/types';

export const hunterTowerPatchNotes: GamePatchNotes = {
  title: { ko: "업데이트 내역", en: "Update History" },
  entries: [
    {
      version: "1.1.7",
      body: {
        ko: "• 엘릭서 던전을 추가했습니다. 도전 탭의 경쟁전에서 타이밍 게이지에 맞춰 엘릭서 가마솥을 공격해 엘릭서를 얻고 주간 순위를 겨루세요.\n• 신규 유물 9종을 추가했습니다. 재등반 층 도약, 보스 피해, 계승 시 스킬 레벨 유지 등 새 효과를 만나보세요. 도감의 유물 수집 보상 단계도 +300까지 늘렸습니다.\n• 채팅에 언어별 채널을 추가했습니다. 업데이트 후 처음 열면 게임 언어 채널로 이동하며, 전체 채널에서는 모든 유저와 대화할 수 있습니다.\n• 튜토리얼이 할 일과 보상을 화면 위쪽에 바로 보여 주도록 바꾸고, 가이드를 한 장씩 넘겨 보는 카드로 개편했습니다.\n• 유물 상세, 계승 확인, 계승 시작층 선택 화면을 새롭게 디자인했습니다. 헌터·계승자 공격 이펙트를 교체하고 원정대 파견 연출을 추가했습니다.\n• 안드로이드 뒤로가기 버튼이 열린 창부터 닫습니다. 일괄 장착·전체 합성, 일일 던전 엘릭서 입장·소탕, 레전드 선택상자는 확인 후 진행됩니다.\n• 스마트 자동 강화에서 헌터 해금을 켜도 강화를 계속하며 해금 골드를 적립하고, 해금이 가까울 때만 잠시 강화를 멈추고 골드를 저축합니다.\n• 일부 숫자가 1 작게 보이던 문제, 긴 번역 문구가 잘리던 문제, 일부 iOS 기기에서 앱이 종료되던 문제, 광고 관련 문제 등 여러 문제를 수정했습니다.",
        en: "• Added the Elixir Dungeon. In Competitive on the Challenge tab, attack the Elixir Cauldron in time with the timing gauge to earn Elixir and compete in the weekly ranking.\n• Added 9 new relics with effects like floor jumps while re-climbing, boss damage and keeping skill levels on Succession. Relic Collection Reward Steps in the Codex now go up to +300.\n• Added language channels to chat. After the update, chat first opens in your game language's channel, and the Global channel lets you talk with everyone.\n• The tutorial now shows your current task and reward at the top of the screen, and guides are now cards you flip through page by page.\n• Redesigned the Relic Details, Succession confirmation and start floor selection screens. Refreshed hunter and successor attack effects and added an Expedition dispatch animation.\n• The Android back button now closes open windows first. Auto Equip, Bulk Synthesis, Daily Dungeon Elixir entries and sweeps, and the Legend Choice Box now ask for confirmation.\n• With hunter unlocks on, Smart Auto-Upgrade keeps upgrading while setting Gold aside for the next unlock, and only pauses briefly to save Gold when an unlock is close.\n• Fixed some numbers showing 1 less than the actual value, long translated text being cut off, the app closing on some iOS devices, ad-related issues and more.",
      },
    },
    {
      version: "1.1.6",
      body: {
        ko: "• 일일 던전을 추가했습니다. 요일별 던전에서 헌터를 편성하고 영혼석을 획득하세요.\n• 원정대를 추가했습니다. 헌터를 파견해 의뢰를 완료하고 원정대 보상을 획득하세요.\n• 도감을 확장했습니다. 헌터·계승자·유물·장비 정보와 수집 보상, 능력치 계산식을 확인할 수 있습니다.\n• 월드 채팅을 추가했습니다. 채널을 선택해 대화하고 차단·신고 기능을 이용할 수 있습니다.\n• 장비 강화·돌파와 특수옵션을 추가했습니다. 프리셋으로 콘텐츠별 장비 옵션을 설정할 수 있습니다.\n• 추석 이벤트가 시작됩니다. 몬스터를 처치해 삼색 송편을 모으고 송편 장터에서 보상으로 교환하세요.\n• 도감 골드 보너스와 일일 던전 등 성장 밸런스를 조정했습니다.\n• 주요 화면과 조작 편의성을 개선하고 저장·보상 처리 등 여러 문제를 수정했습니다.",
        en: "• Added Daily Dungeons. Form hunter lineups for each day's dungeon and earn Spirit Stones.\n• Added Expeditions. Send hunters on missions and earn expedition rewards.\n• Expanded the Codex with hunter, successor, relic and equipment details, collection rewards and stat formulas.\n• Added world chat with channel selection, blocking and reporting.\n• Added equipment enhancement, breakthroughs and special options. Use presets to set equipment options for each type of content.\n• The Chuseok event is here! Defeat monsters to collect three colors of songpyeon and exchange them for rewards at the Songpyeon Market.\n• Adjusted progression balance, including Codex gold bonuses and Daily Dungeons.\n• Improved key screens and controls, and fixed issues with saving, reward processing and more.",
      },
    },
    {
      version: "1.1.5",
      body: {
        ko: "• 스킬 자동 사용(AUTO)을 추가했습니다. 켜 두면 준비된 액티브 스킬을 전투 중 자동으로 사용합니다.\n• 스마트 자동 강화가 스킬도 강화합니다. 유물 Lv.4에서 패시브, Lv.6에서 액티브 스킬 자동 강화가 해금됩니다.\n• 장비 제작 재료를 직접 고르거나 AUTO로 채울 수 있습니다. 한 번 획득한 장비는 합성으로 모두 사용해도 획득 표시가 유지됩니다.\n• 다음에 해금할 헌터를 목록 최상단에 표시하는 설정을 추가했습니다.\n• 몬스터 크기에 맞는 그림자를 추가했습니다.\n• 후반 층 밸런스를 조정하고, 유물 조합 수량 표기 등 여러 문제를 수정했습니다.",
        en: "• Added Skill AUTO. When enabled, ready active skills are used automatically during combat.\n• Smart Auto-Upgrade now upgrades skills too. Passive skill auto-upgrade unlocks at relic Lv.4 and active skill auto-upgrade at Lv.6.\n• You can now pick crafting materials yourself or fill them with AUTO. Once obtained, equipment stays marked as obtained even after it is fully synthesized.\n• Added a setting that shows the next hunter to unlock at the top of the list.\n• Added ground shadows sized to each monster.\n• Adjusted late-floor balance and fixed relic synthesis quantity display and other issues.",
      },
    },
    {
      version: "1.1.4",
      body: {
        ko: "• 공용 장비를 추가했습니다. 6종 부위의 장비를 제작·연구·합성하고, 장착으로 헌터를 강화하세요.\n• 자동화 엘릭서 유물 2종을 추가했습니다. 계승자 자동생성과 골드 자동강화·헌터 자동해금 기능을 사용할 수 있습니다.\n• 헌터의 기본 능력치와 돌파 효과를 조정해 성장 밸런스를 개편했습니다.\n• 첫 결제 패키지, 자동화 유물 패키지, 엘릭서 정기권과 몬스터 재료 상자를 상점에 추가했습니다.\n• 장비 제작 화면과 장비·유물 획득 연출을 개선했습니다. 유물 조합·재료 교환 오류와 랭킹 반영 지연 등 여러 문제를 수정했습니다.\n\n구매하신 것들에 대한 마일리지 소급이 늦어지고 있습니다! 문의 메일로 UID와 영수증 번호를 알려주시면 지급해드리도록 하겠습니다. 감사합니다.",
        en: "• Added common equipment. Craft, research, and synthesize equipment for six slots, then equip it to strengthen your hunters.\n• Added two automation Elixir relics. Automatically summon Successors, perform gold upgrades, and unlock hunters.\n• Rebalanced progression by adjusting hunters’ base stats and breakthrough effects.\n• Added a first-purchase pack, automation relic packs, an Elixir pass, and monster material boxes to the shop.\n• Improved the equipment crafting screen and equipment and relic reward animations. Fixed relic synthesis and material exchange issues, ranking update delays, and other bugs.\n\nMileage credits for your past purchases are taking longer than expected! Please send your UID and receipt number to our support email, and we will credit your Mileage. Thank you.",
      },
    },
    {
      version: "1.1.3",
      body: {
        ko: "• 앱이 비정상적으로 종료되는 문제를 긴급 수정했습니다.",
        en: "• Released an emergency fix for an issue that caused the app to close unexpectedly.",
      },
    },
    {
      version: "1.1.2",
      body: {
        ko: "• 유물 10종을 추가했습니다. 계승자 액티브 스킬의 쿨타임·지속시간과 계승 시작 골드를 강화합니다.\n• 마일리지 상점을 추가했습니다. 적립한 마일리지로 상품을 교환하세요.\n• 오프라인 자동 등반을 추가했습니다. 접속하지 않은 동안에도 층이 오르고 상자와 재료가 쌓입니다.\n• 강화 배수 ×50과 도감 전체 수령 버튼을 추가했습니다.\n• 황금 스킬 사용법을 안내하는 튜토리얼 단계를 추가했습니다.\n• 계정 연동 확인 팝업 등 UI를 개선했습니다.\n• 밸런스를 조정하고 버그·보안 문제를 수정했습니다.",
        en: "• Added 10 new Relics that boost Successor active skill cooldowns and durations, plus starting gold after Succession.\n• Added the Mileage shop. Exchange the Mileage you earn for rewards.\n• Added Offline Progress. Floors, chests and materials keep accumulating while you are away.\n• Added a ×50 upgrade multiplier and a Claim All button in the Codex.\n• Added a tutorial step that teaches how to use the Gold Skill.\n• Improved the UI, including a new account linking confirmation popup.\n• Adjusted balance and fixed bugs and security issues.",
      },
    },
    {
      version: "1.1.1",
      body: {
        ko: "• 광고 시청 중 배경음이 계속 재생되던 문제를 수정했습니다.\n• 후반 밸런스를 조정했습니다.\n• 도감 UI 개선 및 기타 버그를 수정했습니다.",
        en: "• Fixed background music continuing to play during ads.\n• Adjusted late-game balance.\n• Improved the Codex UI and fixed other bugs.",
      },
    },
    {
      version: "1.1.0",
      body: {
        ko: "• 명예 랭킹을 추가했습니다. 최고 층·전투력 등 다양한 부문에서 경쟁하세요.\n• 랭킹 도입에 맞춰 계승 횟수가 0으로 초기화되었습니다. 계승으로 얻은 보상과 성장은 그대로 유지됩니다.\n• 몬스터 도감을 추가했습니다. 도감 레벨을 올려 영구 능력치 보너스를 획득하세요.\n• 프로필 화면을 개편하고 닉네임·국가 설정을 추가했습니다.\n• 광고 시청 버프를 추가했습니다. 활성화된 버프는 게임 화면에서 바로 확인할 수 있습니다.\n• 방치 보상을 개편했습니다. 이제 플레이 중에도 보상이 계속 쌓입니다.\n• 특수강화·도감 튜토리얼을 추가했습니다.",
        en: "• Added Honor Rankings. Compete in categories like highest floor and combat power.\n• Succession counts were reset to 0 for the ranking launch. Rewards and growth earned from successions are kept.\n• Added the Monster Codex. Level it up to earn permanent stat bonuses.\n• Revamped the profile screen and added nickname and country settings.\n• Added ad-viewing buffs. Active buffs are shown right on the game screen.\n• Reworked idle rewards. They now keep accumulating even while you play.\n• Added SP Enhance and Codex tutorials.",
      },
    },
    {
      version: "1.0.9",
      body: {
        ko: "• 광고 관련 버그와 오류를 수정했습니다.\n• UI를 개선했습니다.\n• 앱 크래시 안정성을 개선했습니다.\n• Google Play 인앱 업데이트 기능을 추가했습니다.",
        en: "• Fixed ad-related bugs and errors.\n• Improved the UI.\n• Improved app stability and reduced crashes.\n• Added Google Play in-app updates.",
      },
    },
    {
      version: "1.0.8",
      body: {
        ko: "• 버그와 앱 크래시를 수정했습니다.\n• 액티브 스킬 활성화 디자인을 개선했습니다.\n• 엘릭서로 구매하는 시간 골드 상품을 추가했습니다.\n• 계승 층 보너스를 완화했습니다.\n• 가이드 팝업을 개선했습니다.\n• 절전 모드(사이드 버튼 패널)를 추가하고 성능·발열을 최적화했습니다.\n• 엘릭서 등급 유물을 상향했습니다.(유물 가산 후 전체 가산)",
        en: "• Fixed bugs and app crashes.\n• Improved the active skill activation visuals.\n• Added Elixir time-gold shop products.\n• Eased prestige floor bonuses.\n• Improved the guide popup.\n• Added Sleep Mode (side button panel) and optimized performance/heat.\n• Buffed Elixir-grade relics (global bonus after relic additives).",
      },
    },
    {
      version: "1.0.7",
      body: {
        ko: "• 유물 밸런스를 조정했습니다.\n• 레어·유니크 상자 확률 유물과 재등반 배속 유물(엘릭서 모래시계)을 추가했습니다.\n• 고티어 엘릭서 상품(500/1500/4500)을 추가했습니다.\n• 계정 연동과 클라우드 세이브(백업/복원)를 추가했습니다.\n• 구매 복원과 분할 화면·플로팅 윈도우 일시정지 문제를 수정했습니다.\n• 하단 시트 크기 조절·딤 제거·최상층 이동 등 UX를 개선했습니다.\n• 강화 가능 알림·유물 전체 강화·엘릭서 유물 다중 구매·강화 배수 유지를 추가했습니다.",
        en: "• Adjusted relic balance.\n• Added rare/unique chest-chance relics and the Elixir Hourglass reclimb-speed relic.\n• Added high-tier Elixir packs (500/1500/4500).\n• Added account linking and cloud save (backup/restore).\n• Fixed purchase restore and pause issues in split-screen/floating window modes.\n• Improved UX: bottom-sheet resize, dim removal, and jump-to-top-floor.\n• Added upgrade alerts, bulk relic upgrade, multi-buy for Elixir relics, and persistent upgrade multipliers.",
      },
    },
    {
      version: "1.0.6",
      body: {
        ko: "• 전투 성능을 최적화해 헌터가 많을 때 프레임 드랍을 줄였습니다.\n• 군주·정령·천사 헌터의 공명형 스탯 보너스를 추가했습니다.\n• 계승 시작층 변경 관련 로직과 밸런스를 조정했습니다.\n• 흡혈·그림자·이펙트·UI 관련 버그를 수정했습니다.",
        en: "• Optimized combat performance to reduce frame drops when many hunters are active.\n• Added resonance stat bonuses for Ruler, Spirit, and Angel hunters.\n• Adjusted logic and balance related to prestige start floor changes.\n• Fixed lifesteal, shadow, effect, and UI bugs.",
      },
    },
    {
      version: "1.0.5",
      body: {
        ko: "• 업데이트 내역(패치노트) 화면을 추가했습니다.\n• 신규 유물 17종(포탈/헌터 타입별/계승 시작층)을 추가했습니다.\n• 헌터 목록에 티어·사거리·스폰 쿨타임 정보를 추가했습니다.\n• 흡혈 회복·계승자 소환 이펙트와 전투 유닛 그림자를 추가했습니다.\n• TopHud 좌측 사이드 메뉴 UI를 개선했습니다.(접기/펴기)\n• 여러 버그를 수정하고 UI를 다듬었습니다.",
        en: "• Added an update history (patch notes) screen.\n• Added 17 new relics (portal / hunter-type / prestige start floor).\n• Added tier, range, and spawn cooldown info to the hunter list.\n• Added lifesteal recovery and successor summon effects, plus battle unit shadows.\n• Improved the TopHud left side menu UI (collapse/expand).\n• Fixed various bugs and polished the UI.",
      },
    },
    {
      version: "1.0.4",
      body: {
        ko: "• 신규 패시브 스킬 '흡혈'을 추가했습니다.\n• 층 파괴 연출과 UI를 개선했습니다.\n• 튜토리얼 안내를 개선했습니다.\n• 밸런스를 조정하고 로딩 성능을 최적화했습니다.",
        en: "• Added a new passive skill, 'Lifesteal'.\n• Improved the floor-destroy effect and UI.\n• Improved tutorial guidance.\n• Adjusted balance and optimized loading performance.",
      },
    },
    {
      version: "1.0.3",
      body: {
        ko: "• 신규 유물이 추가되었습니다. (계승 보상 유물 등)\n• 확률형 상품의 세부 확률 정보 화면을 추가했습니다.\n• 몬스터 HP 회복 요소를 추가했습니다.\n• 여러 클릭 오류와 밸런스를 조정했습니다.",
        en: "• Added new relics (including succession-reward relics).\n• Added a detailed drop-rate disclosure screen for random items.\n• Added monster HP recovery.\n• Adjusted various click bugs and balance.",
      },
    },
    {
      version: "1.0.2",
      body: {
        ko: "• 전반적인 UI를 다듬었습니다.\n• 계승자 관련 오류를 수정했습니다.\n• 결제 안정성을 개선했습니다.",
        en: "• Polished the overall UI.\n• Fixed successor-related bugs.\n• Improved purchase stability.",
      },
    },
    {
      version: "1.0.1",
      body: {
        ko: "• 광고 시청 안내를 더 명확하게 개선했습니다.\n• 튜토리얼이 진행되지 않던 문제를 수정했습니다.",
        en: "• Improved ad-viewing guidance for clarity.\n• Fixed an issue where the tutorial could not proceed.",
      },
    },
    {
      version: "1.0.0",
      body: {
        ko: "헌터 타워 정식 출시! 🎉\n탑을 오르며 헌터를 성장시키는 방치형 RPG의 여정을 시작하세요.",
        en: "Hunter Tower is officially live! 🎉\nBegin your idle RPG journey — climb the tower and grow your hunters.",
      },
    },
  ],
};
