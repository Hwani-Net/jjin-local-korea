"use client";
import { useState } from "react";
import Link from "next/link";
import { useI18n, Lang } from "@/lib/i18n";
import { spots, regions, Region, Category } from "@/lib/data";
import SpotCard from "@/components/SpotCard";
import { ChevronRight, Utensils, Sparkles, Camera, BedDouble, BookOpen } from "lucide-react";

const categories: { id: Category | "all"; icon: React.ReactNode; labelKey: string }[] = [
  { id: "all", icon: <Sparkles size={16} />, labelKey: "all" },
  { id: "food", icon: <Utensils size={16} />, labelKey: "food" },
  { id: "beauty", icon: <span>💄</span>, labelKey: "beauty" },
  { id: "sightseeing", icon: <Camera size={16} />, labelKey: "sight" },
  { id: "accommodation", icon: <BedDouble size={16} />, labelKey: "accom" },
  { id: "culture", icon: <BookOpen size={16} />, labelKey: "culture" },
];

const catLabels: Record<string, Record<Lang, string>> = {
  all: { en: "All", ko: "전체", ja: "全て", zh: "全部" },
  food: { en: "🍜 Local Food", ko: "🍜 맛집", ja: "🍜 グルメ", zh: "🍜 美食" },
  beauty: { en: "💄 K-Beauty", ko: "💄 K-뷰티", ja: "💄 K-ビューティー", zh: "💄 K-美妆" },
  sight: { en: "🏔️ Sightseeing", ko: "🏔️ 관광", ja: "🏔️ 観光", zh: "🏔️ 观光" },
  accom: { en: "🏨 Stay", ko: "🏨 숙박", ja: "🏨 宿泊", zh: "🏨 住宿" },
  culture: { en: "🎭 Culture", ko: "🎭 문화", ja: "🎭 文化", zh: "🎭 文化" },
};

const stats = [
  { value: "50,000+", label: { en: "Local Reviews", ko: "현지인 리뷰", ja: "地元レビュー", zh: "本地评价" } },
  { value: "200+", label: { en: "Hidden Gems", ko: "숨은 명소", ja: "穴場スポット", zh: "隐藏宝藏" } },
  { value: "6", label: { en: "Major Regions", ko: "주요 지역", ja: "主要地域", zh: "主要地区" } },
  { value: "4", label: { en: "Languages", ko: "지원 언어", ja: "対応言語", zh: "支持语言" } },
];

export default function HomePage() {
  const { t, lang } = useI18n();
  const [region, setRegion] = useState<Region | "all">("all");
  const [category, setCategory] = useState<Category | "all">("all");

  const filtered = spots.filter(
    (s) =>
      (region === "all" || s.region === region) &&
      (category === "all" || s.category === category)
  );

  return (
    <>
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,95,82,0.15) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,179,71,0.12) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />

        <div className="animate-fade-up" style={{ marginBottom: 24, animationDelay: "0s" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 20px", borderRadius: 50, border: "1px solid var(--border)", background: "var(--bg-card)", backdropFilter: "blur(12px)", marginBottom: 32 }}>
            <span style={{ fontSize: "1.4rem" }}>🇰🇷</span>
            <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 900, fontSize: "1rem", background: "var(--gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>싰 로컈 코리아</span>
          </div>
        </div>

        <h1 className="animate-fade-up" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20, animationDelay: "0.1s", fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>
          <span className="gradient-text">{t.hero.title}</span>
        </h1>

        <p className="animate-fade-up" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "var(--text-secondary)", maxWidth: 600, marginBottom: 40, animationDelay: "0.2s", fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>
          {t.hero.subtitle}
        </p>

        <div className="animate-fade-up" style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", animationDelay: "0.3s" }}>
          <Link href="/trip-planner" className="btn-gradient" style={{ fontSize: "1.05rem", padding: "16px 36px" }}>✈️ {t.hero.cta}</Link>
          <Link href="/spots" className="btn-ghost" style={{ fontSize: "1.05rem", padding: "16px 36px" }}>🔍 {lang === "ko" ? "스팟 탐색" : lang === "ja" ? "スポット探索" : lang === "zh" ? "探索景点" : "Explore Spots"}</Link>
        </div>

        <div className="animate-fade-up" style={{ display: "flex", gap: 32, marginTop: 64, flexWrap: "wrap", justifyContent: "center", animationDelay: "0.4s" }}>
          {stats.map((s) => (
            <div key={s.value} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, background: "var(--gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: 2, fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>{s.label[lang as Lang] || s.label.en}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--bg-secondary)", padding: "60px 24px" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: 8, fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>{t.home.regionTitle}</h2>
          <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: 40 }}>{lang === "ko" ? "가고 싶은 지역을 선택하고 현지인 추천 스팟을 찾아보세요" : "Choose a region and discover locals' hidden gems"}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <button className={`pill ${region === "all" ? "active" : ""}`} onClick={() => setRegion("all")} style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>🗺️ {lang === "ko" ? "전체 지역" : "All Regions"}</button>
            {regions.map((r) => (
              <button key={r.id} className={`pill ${region === r.id ? "active" : ""}`} onClick={() => setRegion(r.id)} style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>{r.emoji} {r.label[lang as Lang] || r.label.en}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40, overflowX: "auto" }}>
          {categories.map((c) => (
            <button key={c.id} className={`pill ${category === c.id ? "active" : ""}`} onClick={() => setCategory(c.id as Category | "all")}>{catLabels[c.labelKey][lang as Lang] || catLabels[c.labelKey].en}</button>
          ))}
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 className="section-title" style={{ fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>{t.home.picksTitle}</h2>
          <p className="section-subtitle" style={{ fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>{t.home.picksSubtitle}</p>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>{lang === "ko" ? "해당 조건의 스팟이 없습니다." : "No spots found for this filter."}</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {filtered.map((spot) => <SpotCard key={spot.id} spot={spot} />)}
          </div>
        )}

        <div className="glass-card glow" style={{ marginTop: 64, padding: "48px 40px", textAlign: "center", background: "linear-gradient(135deg, rgba(255,95,82,0.08), rgba(255,179,71,0.08))", borderColor: "rgba(255,95,82,0.2)" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 12, fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>
            {lang === "ko" ? "AI가 나만의 여행 코스를 만들어드립니다 ✨" : "Let AI Build Your Perfect Korean Itinerary ✨"}
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: 28, fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>
            {lang === "ko" ? "지역, 숙박 형태, 여행 스타일을 선택하면 현지인 추천 코스를 즉시 생성합니다" : "Select region, accommodation type, and travel style to instantly get a local-approved route"}
          </p>
          <Link href="/trip-planner" className="btn-gradient" style={{ display: "inline-flex", padding: "16px 36px", fontSize: "1rem" }}>✈️ {t.nav.planner} <ChevronRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}
