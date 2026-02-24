"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "ko" | "ja" | "zh";

type T = {
  nav: {
    home: string; planner: string; spots: string; culture: string; beauty: string;
  };
  hero: {
    title: string; subtitle: string; cta: string;
    stat1: string; stat2: string; stat3: string;
  };
  home: {
    regionTitle: string; categoryTitle: string; picksTitle: string; picksSubtitle: string;
    hiddenGem: string; localRating: string; touristRating: string; reviews: string; viewDetails: string;
  };
  planner: {
    title: string; subtitle: string;
    step1: string; step2: string; step3: string; step4: string;
    halfDay: string; oneDay: string; twoDays: string; threeDays: string;
    hotelLabel: string; guestLabel: string; hanokLabel: string; motelLabel: string; templeLabel: string;
    foodStyle: string; beautyStyle: string; instaStyle: string; cultureStyle: string; natureStyle: string;
    generateBtn: string; generating: string;
    resultTitle: string; savBtn: string; shareBtn: string; regenBtn: string;
    tipTitle: string; noApiKey: string;
  };
  culture: {
    title: string; subtitle: string; phrasesTitle: string;
  };
  beauty: {
    title: string; subtitle: string;
  };
  common: {
    darkMode: string; lightMode: string; backToHome: string;
  };
};

const translations: Record<Lang, T> = {
  en: {
    nav: { home: "Home", planner: "Plan My Trip", spots: "Local Spots", culture: "Culture", beauty: "K-Beauty" },
    hero: {
      title: "Discover Real Korea",
      subtitle: "Where Koreans Actually Go — Not Tourist Traps",
      cta: "Plan My Trip →",
      stat1: "50,000+ Local Reviews", stat2: "200+ Hidden Gems", stat3: "Updated Weekly",
    },
    home: {
      regionTitle: "Choose Your Region",
      categoryTitle: "Browse by Category",
      picksTitle: "🔥 Korean Locals' Picks",
      picksSubtitle: "Rated by real Koreans, not travel guides",
      hiddenGem: "Hidden Gem",
      localRating: "Korean Local Rating",
      touristRating: "Tourist Avg",
      reviews: "reviews",
      viewDetails: "View Details →",
    },
    planner: {
      title: "Build Your Korean Adventure",
      subtitle: "Tell us your style — AI creates your authentic local itinerary",
      step1: "1. Choose Region", step2: "2. Trip Duration", step3: "3. Where to Stay", step4: "4. Your Travel Style",
      halfDay: "Half Day", oneDay: "1 Day", twoDays: "1 Night 2 Days", threeDays: "2 Nights 3 Days",
      hotelLabel: "Hotel", guestLabel: "Guesthouse", hanokLabel: "Hanok Stay", motelLabel: "Motel", templeLabel: "Temple Stay",
      foodStyle: "🍜 Local Food First", beautyStyle: "💄 K-Beauty Lover", instaStyle: "📸 Photo Spots", cultureStyle: "🎭 Cultural Deep Dive", natureStyle: "🌊 Nature & Outdoors",
      generateBtn: "✨ Generate My Korean Trip", generating: "Creating your itinerary...",
      resultTitle: "Your Korean Itinerary ✨",
      savBtn: "Save", shareBtn: "Share", regenBtn: "Regenerate",
      tipTitle: "🇰🇷 Cultural Tips",
      noApiKey: "AI trip planner requires a Gemini API key. Please add GEMINI_API_KEY to your .env.local file.",
    },
    culture: { title: "Korean Culture 101", subtitle: "Essential etiquette guide for a respectful visit", phrasesTitle: "Quick Korean Phrases" },
    beauty: { title: "K-Beauty Guide", subtitle: "Authentic Korean beauty — what locals actually buy" },
    common: { darkMode: "Dark", lightMode: "Light", backToHome: "← Back to Spots" },
  },
  ko: {
    nav: { home: "홈", planner: "여행 코스 짜기", spots: "로컬 스팟", culture: "문화·예절", beauty: "K-뷰티" },
    hero: {
      title: "찐 로컬 코리아 발견",
      subtitle: "한국인이 진짜 가는 곳 — 관광지 말고 찐 명소",
      cta: "여행 코스 만들기 →",
      stat1: "50,000+ 현지인 리뷰", stat2: "200+ 숨은 명소", stat3: "매주 업데이트",
    },
    home: {
      regionTitle: "지역을 선택하세요",
      categoryTitle: "카테고리별 탐색",
      picksTitle: "🔥 현지인 추천 맛집·명소",
      picksSubtitle: "가이드북 아닌 한국인이 직접 뽑은 진짜 맛집",
      hiddenGem: "숨은 명소",
      localRating: "한국인 평점",
      touristRating: "관광객 평점",
      reviews: "리뷰",
      viewDetails: "상세 보기 →",
    },
    planner: {
      title: "나만의 한국 여행 코스",
      subtitle: "여행 스타일을 알려주면 AI가 진짜 로컬 코스를 만들어드립니다",
      step1: "1. 지역 선택", step2: "2. 여행 기간", step3: "3. 숙박 형태", step4: "4. 여행 스타일",
      halfDay: "반나절", oneDay: "당일치기", twoDays: "1박2일", threeDays: "2박3일",
      hotelLabel: "호텔", guestLabel: "게스트하우스", hanokLabel: "한옥 스테이", motelLabel: "모텔", templeLabel: "템플스테이",
      foodStyle: "🍜 맛집 우선", beautyStyle: "💄 K-뷰티 투어", instaStyle: "📸 인생샷 명소", cultureStyle: "🎭 문화 탐방", natureStyle: "🌊 자연·야외",
      generateBtn: "✨ 나만의 코스 생성하기", generating: "코스를 만들고 있어요...",
      resultTitle: "나만의 한국 여행 코스 ✨",
      savBtn: "저장", shareBtn: "공유", regenBtn: "다시 생성",
      tipTitle: "🇰🇷 문화 팁",
      noApiKey: "AI 여행 플래너는 Gemini API 키가 필요합니다.",
    },
    culture: { title: "한국 문화 기본 가이드", subtitle: "한국을 제대로 즐기기 위한 기본 에티켓", phrasesTitle: "기본 한국어 표현" },
    beauty: { title: "K-뷰티 가이드", subtitle: "한국인이 진짜 사는 뷰티 — 현지인 픽" },
    common: { darkMode: "다크", lightMode: "라이트", backToHome: "← 스팟 목록으로" },
  },
  ja: {
    nav: { home: "ホーム", planner: "旅程作成", spots: "ローカルスポット", culture: "文化・マナー", beauty: "K-ビューティー" },
    hero: {
      title: "リアルな韓国を発見",
      subtitle: "韓国人が本当に行く場所 — 観光地じゃない本物",
      cta: "旅程を作る →",
      stat1: "50,000+件の地元レビュー", stat2: "200+件の穴場スポット", stat3: "毎週更新",
    },
    home: {
      regionTitle: "地域を選ぶ",
      categoryTitle: "カテゴリーで探す",
      picksTitle: "🔥 地元民のおすすめ",
      picksSubtitle: "旅行ガイドじゃない、韓国人が選んだ本物",
      hiddenGem: "穴場スポット",
      localRating: "地元評価",
      touristRating: "観光客平均",
      reviews: "件",
      viewDetails: "詳細を見る →",
    },
    planner: {
      title: "韓国の旅を設計しよう",
      subtitle: "スタイルを教えてください — AIが本物のローカル旅程を作成します",
      step1: "1. 地域を選ぶ", step2: "2. 旅程期間", step3: "3. 宿泊形式", step4: "4. 旅行スタイル",
      halfDay: "半日", oneDay: "日帰り", twoDays: "1泊2日", threeDays: "2泊3日",
      hotelLabel: "ホテル", guestLabel: "ゲストハウス", hanokLabel: "韓屋ステイ", motelLabel: "モーテル", templeLabel: "テンプルステイ",
      foodStyle: "🍜 グルメ優先", beautyStyle: "💄 K-ビューティー", instaStyle: "📸 映えスポット", cultureStyle: "🎭 文化体験", natureStyle: "🌊 自然・アウトドア",
      generateBtn: "✨ 旅程を生成する", generating: "旅程を作成中...",
      resultTitle: "あなたの韓国旅程 ✨",
      savBtn: "保存", shareBtn: "シェア", regenBtn: "再生成",
      tipTitle: "🇰🇷 文化ヒント",
      noApiKey: "Gemini APIキーが必要です。",
    },
    culture: { title: "韓国文化101", subtitle: "礼節ある訪問のための基本マナーガイド", phrasesTitle: "韓国語フレーズ集" },
    beauty: { title: "K-ビューティーガイド", subtitle: "韓国人が本当に買うコスメ" },
    common: { darkMode: "ダーク", lightMode: "ライト", backToHome: "← スポット一覧へ" },
  },
  zh: {
    nav: { home: "首页", planner: "行程规划", spots: "本地景点", culture: "文化礼仪", beauty: "K-美妆" },
    hero: {
      title: "探索真实的韩国",
      subtitle: "韩国人真正去的地方 — 不是景点陷阱",
      cta: "规划我的旅程 →",
      stat1: "50,000+本地评价", stat2: "200+隐藏宝藏", stat3: "每周更新",
    },
    home: {
      regionTitle: "选择地区",
      categoryTitle: "按类别浏览",
      picksTitle: "🔥 韩国本地人推荐",
      picksSubtitle: "由真正的韩国人评选，而非旅游指南",
      hiddenGem: "隐藏宝藏",
      localRating: "本地人评分",
      touristRating: "游客平均",
      reviews: "条评价",
      viewDetails: "查看详情 →",
    },
    planner: {
      title: "设计你的韩国之旅",
      subtitle: "告诉我们您的风格 — AI为您创建真实的本地行程",
      step1: "1. 选择地区", step2: "2. 旅行时长", step3: "3. 住宿类型", step4: "4. 旅行风格",
      halfDay: "半天", oneDay: "一日游", twoDays: "一夜两天", threeDays: "两夜三天",
      hotelLabel: "酒店", guestLabel: "青旅", hanokLabel: "韩屋民宿", motelLabel: "汽车旅馆", templeLabel: "寺庙住宿",
      foodStyle: "🍜 美食优先", beautyStyle: "💄 K-美妆之旅", instaStyle: "📸 打卡景点", cultureStyle: "🎭 文化体验", natureStyle: "🌊 自然户外",
      generateBtn: "✨ 生成我的行程", generating: "正在创建行程...",
      resultTitle: "你的韩国行程 ✨",
      savBtn: "保存", shareBtn: "分享", regenBtn: "重新生成",
      tipTitle: "🇰🇷 文化提示",
      noApiKey: "需要Gemini API密钥。",
    },
    culture: { title: "韩国文化101", subtitle: "礼貌访问必备礼仪指南", phrasesTitle: "韩语常用短语" },
    beauty: { title: "K-美妆指南", subtitle: "韩国人真正购买的美妆" },
    common: { darkMode: "深色", lightMode: "浅色", backToHome: "← 返回景点列表" },
  },
};

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: T;
}

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

export { translations };
