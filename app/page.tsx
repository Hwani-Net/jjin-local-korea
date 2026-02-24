"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { spots, regions } from "@/lib/data";
import { useI18n } from "@/lib/i18n";
import type { Spot } from "@/lib/data";

const categories = [
  { key: "all", label: "All", icon: "✨" },
  { key: "food", label: "Local Food", icon: "🍜" },
  { key: "beauty", label: "K-Beauty", icon: "💄" },
  { key: "shopping", label: "Shopping", icon: "🛍️" },
  { key: "cafe", label: "Cafe Hopping", icon: "☕" },
  { key: "nature", label: "Nature", icon: "🏔️" },
];

export default function HomePage() {
  const { t, lang } = useI18n();
  const [activeRegion, setActiveRegion] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = spots.filter((s: Spot) => {
    const regionMatch = activeRegion === "all" || s.region === activeRegion;
    const catMatch = activeCategory === "all" || s.category === activeCategory;
    return regionMatch && catMatch;
  }).slice(0, 9);

  return (
    <div style={{ paddingTop: 60 }}>
      {/* HERO */}
      <section className="hero">
        <Image src="https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=1400&q=80" alt="Korean local market" fill sizes="100vw" style={{ objectFit: "cover", opacity: 0.55 }} priority />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div style={{ marginBottom: 12 }}>
            <span style={{ background: "rgba(249,115,22,0.25)", border: "1px solid rgba(249,115,22,0.4)", color: "#fed7aa", fontSize: "0.78rem", fontWeight: 700, padding: "4px 12px", borderRadius: 50, letterSpacing: 0.5 }}>🇰🇷 찐 로컬 코리아</span>
          </div>
          <h1 className="hero-title">Discover Real Korea — <span style={{ color: "var(--coral)" }}>Where Koreans Actually Go</span></h1>
          <p className="hero-subtitle">Experience authentic local culture beyond the tourist traps.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/trip-planner" className="btn btn-primary">✈️ Plan My Trip →</Link>
            <Link href="/spots" className="btn btn-outline">🔍 {lang === "ko" ? "스팟 탐색" : "Explore Spots"}</Link>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", padding: "20px 48px", display: "flex", gap: 48 }}>
          {[{ num: "50,000+", label: lang === "ko" ? "현지인 리뷰" : "Local Reviews" }, { num: "100%", label: lang === "ko" ? "현지인 인증" : "Authentic" }, { num: "24/7", label: lang === "ko" ? "여행 지원" : "Travel Support" }].map(s => (
            <div key={s.label}><div className="stat-number" style={{ fontSize: "1.4rem" }}>{s.num}</div><div className="stat-label" style={{ color: "rgba(255,255,255,0.6)" }}>{s.label}</div></div>
          ))}
        </div>
      </section>

      {/* REGION PILLS */}
      <div style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)", padding: "16px 48px", overflowX: "auto" }}>
        <div className="pill-group" style={{ flexWrap: "nowrap" }}>
          <button className={`pill ${activeRegion === "all" ? "active" : ""}`} onClick={() => setActiveRegion("all")}>🗺️ {lang === "ko" ? "전체 지역" : "All Regions"}</button>
          {regions.map((r) => (
            <button key={r.id} className={`pill ${activeRegion === r.id ? "active" : ""}`} onClick={() => setActiveRegion(r.id)}>{r.emoji} {lang === "ko" ? r.nameKo : r.name}</button>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div className="section">
        <div className="category-tabs">
          {categories.map((cat) => (
            <button key={cat.key} className={`cat-tab ${activeCategory === cat.key ? "active" : ""}`} onClick={() => setActiveCategory(cat.key)}>
              <span className="cat-tab-icon">{cat.icon}</span>{cat.label}
            </button>
          ))}
        </div>
        <div className="section-header">
          <h2 className="section-title">🔥 {lang === "ko" ? "현지인 추천 TOP" : "Korean Locals' Top Picks"}</h2>
          <Link href="/spots" className="section-view-all">{lang === "ko" ? "전체 보기" : "View all"} →</Link>
        </div>
        <div className="cards-grid">
          {filtered.map((spot: Spot) => (
            <Link key={spot.id} href={`/spots/${spot.id}`} style={{ textDecoration: "none" }}>
              <div className="spot-card">
                <div className="spot-card-image">
                  <Image src={spot.image} alt={spot.name.en} fill sizes="380px" style={{ objectFit: "cover" }} />
                  <span className={`spot-card-badge ${spot.isHiddenGem ? "hidden-gem" : ""}`}>{spot.isHiddenGem ? "💎 Hidden Gem" : "🔥 Local Pick"}</span>
                  <button className="spot-card-save">♡</button>
                </div>
                <div className="spot-card-body">
                  <div className="spot-card-title">{lang === "ko" ? spot.name.ko : spot.name.en}</div>
                  <div className="spot-card-desc">{lang === "ko" ? spot.description.ko : spot.description.en}</div>
                  <div className="spot-card-meta">
                    <div className="spot-card-location">📍 {lang === "ko" ? spot.address.ko : spot.address.en}</div>
                    <div className="spot-card-rating">
                      <div className="rating-local">⭐ {spot.koreanRating}</div>
                      <div className="rating-tourist" style={{ fontSize: "0.72rem" }}>/ {spot.touristRating} <span style={{ fontSize: "0.65rem" }}>tourist</span></div>
                    </div>
                  </div>
                  {spot.tags && <div className="spot-card-tags">{spot.tags.slice(0, 3).map((tag: string, i: number) => <span key={i} className="tag">{tag}</span>)}</div>}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* AI CTA */}
        <div style={{ marginTop: 64, borderRadius: 20, overflow: "hidden", position: "relative", minHeight: 200, display: "flex", alignItems: "center", background: "linear-gradient(135deg, #1c1917 0%, #292524 100%)" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1538485399081-7191377e8241?w=1200&q=80')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2 }} />
          <div style={{ position: "relative", padding: "40px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: 24 }}>
            <div>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--coral)", marginBottom: 8, letterSpacing: 0.5 }}>✨ AI-POWERED</div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 900, color: "white", marginBottom: 8 }}>{lang === "ko" ? "나만의 한국 여행 계획" : "Build Your Korean Adventure"}</h3>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem" }}>{lang === "ko" ? "여행 스타일 입력 → Gemini AI가 현지인 추천 일정 생성" : "Tell us your style → AI crafts your authentic local itinerary"}</p>
            </div>
            <Link href="/trip-planner" className="btn btn-primary" style={{ fontSize: "1rem", padding: "12px 28px" }}>✨ {lang === "ko" ? "AI 일정 만들기" : "Generate My Trip"}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
