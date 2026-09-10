/* AUTO-GENERATED — do not edit by hand.
 * Run: npm run sync:patch-notes
 * Generated: 2026-09-10T15:03:52.525Z
 * Sources:
 *   ../Hunter_Tower/Assets/Project/Localization/Tables/UI.csv
 *   ../Hunter_Tower/Assets/Project/ScriptableObjects/Data/PatchNoteTable.asset
 */
import type { GamePatchNotes } from '@/lib/games/types';

export const hunterTowerPatchNotes: GamePatchNotes = {
  title: { ko: "업데이트 내역", en: "Update History" },
  entries: [
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
