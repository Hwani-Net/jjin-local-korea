"use client";
import { useState } from "react";
import { useI18n, Lang } from "@/lib/i18n";
import { spots, regions, Region, Category } from "@/lib/data";
import SpotCard from "@/components/SpotCard";

const categories: { id: Category | "all"; label: Record<Lang, string> }[] = [
  { id: "all", label: { en: "🗺️ All", ko: "🗺️ 전체", ja: "🗺️ 全て", zh: "🗺️ 全部" } },
  { id: "food", label: { en: "🍜 Local Food", ko: "🍜 맛집", ja: "🍜 グルメ", zh: "🍜 美食" } },
  { id: "beauty", label: { en: "💄 K-Beauty", ko: "💄 K-뷰티", ja: "💄 K-ビューティー", zh: "💄 K-美妆" } },
  { id: "sightseeing", label: { en: "🏔️ Sightseeing", ko: "🏔️ 관광", ja: "🏔️ 観光", zh: "🏔️ 观光" } },
  { id: "accommodation", label: { en: "🏨 Stay", ko: "🏨 숙박", ja: "🏨 宿泊", zh: "🏨 住宿" } },
  { id: "culture", label: { en: "🎭 Culture", ko: "🎭 문화", ja: "🎭 文化", zh: "🎭 文化" } },
];

export default function SpotsPage() {
  const { lang } = useI18n();
  const [region, setRegion] = useState<Region | "all">("all");
  const [category, setCategory] = useState<Category | "all">("all");
  const [hiddenOnly, setHiddenOnly] = useState(false);

  const filtered = spots.filter(
    (s) =>
      (region === "all" || s.region === region) &&
      (category === "all" || s.category === category) &&
      (!hiddenOnly || s.isHiddenGem)
  );

  return (
    <div style={{ paddingTop: 88 }}>
      <div style={{ background: "linear-gradient(135deg, rgba(255,95,82,0.08), rgba(255,179,71,0.06))", borderBottom: "1px solid var(--border)", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, marginBottom: 12, fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>
          <span className="gradient-text">{lang === "ko" ? "🔍 로컈 스팟 탐색" : "🔍 Explore Local Spots"}</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>
          {lang === "ko" ? "한국인이 진짜로 가는 맛집·명소 모음" : "Where Koreans actually go — real spots not in guidebooks"}
        </p>
      </div>

      <div className="section">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          <button className={`pill ${region === "all" ? "active" : ""}`} onClick={() => setRegion("all")} style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
            {lang === "ko" ? "전체 지역" : "All Regions"}
          </button>
          {regions.map((r) => (
            <button key={r.id} className={`pill ${region === r.id ? "active" : ""}`} onClick={() => setRegion(r.id)} style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
              {r.emoji} {r.label[lang as Lang] || r.label.en}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {categories.map((c) => (
            <button key={c.id} className={`pill ${category === c.id ? "active" : ""}`} onClick={() => setCategory(c.id as Category | "all")}>
              {c.label[lang as Lang] || c.label.en}
            </button>
          ))}
        </div>

        <button onClick={() => setHiddenOnly((p) => !p)} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 50, border: `1.5px solid ${hiddenOnly ? "var(--coral)" : "var(--border)"}`, background: hiddenOnly ? "rgba(255,95,82,0.1)" : "var(--bg-card)", color: hiddenOnly ? "var(--coral)" : "var(--text-secondary)", cursor: "pointer", fontFamily: "inherit", fontWeight: hiddenOnly ? 700 : 400, marginBottom: 36 }}>
          🔥 {lang === "ko" ? "숨은 명소만 보기" : "Hidden Gems Only"}
        </button>

        <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>{filtered.length}{lang === "ko" ? "개의 스팟" : " spots found"}</p>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>{lang === "ko" ? "해당 조건의 스팟이 없습니다." : "No spots found."}</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {filtered.map((s) => <SpotCard key={s.id} spot={s} />)}
          </div>
        )}
      </div>
    </div>
  );
}
