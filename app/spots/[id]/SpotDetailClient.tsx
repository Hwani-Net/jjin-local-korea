"use client";
import { Spot } from "@/lib/data";
import { useI18n, Lang } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, DollarSign, Lightbulb, ArrowLeft } from "lucide-react";

export default function SpotDetailClient({ spot }: { spot: Spot }) {
  const { lang, t } = useI18n();
  const name = spot.name[lang as Lang] || spot.name.en;
  const desc = spot.description[lang === "ko" ? "ko" : "en"];
  const tip = spot.tip[lang === "ko" ? "ko" : "en"];
  const addr = spot.address[lang === "ko" ? "ko" : "en"];

  function Stars({ n }: { n: number }) {
    return (
      <span style={{ display: "inline-flex", gap: 2 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} fill={i < Math.round(n) ? "#ffb347" : "none"} color={i < Math.round(n) ? "#ffb347" : "var(--text-muted)"} strokeWidth={1.5} />
        ))}
      </span>
    );
  }

  return (
    <div style={{ paddingTop: 88 }}>
      <div style={{ position: "relative", height: "55vh", minHeight: 340 }}>
        <Image src={spot.image} alt={name} fill style={{ objectFit: "cover" }} priority sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
        <div style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <span className="badge-verified">✓ 싰로컈 Verified</span>
            {spot.isHiddenGem && <span className="badge-gem">🔥 {lang === "ko" ? "숨은 명소" : "Hidden Gem"}</span>}
          </div>
          <h1 style={{ fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 900, fontSize: "clamp(1.5rem, 4vw, 2.2rem)", color: "white", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>{name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.8)", marginTop: 6 }}>
            <MapPin size={14} />
            <span style={{ fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit", fontSize: "0.9rem" }}>{addr}</span>
          </div>
        </div>
      </div>

      <div className="section" style={{ paddingTop: 40 }}>
        <Link href="/spots" className="btn-ghost" style={{ marginBottom: 32, display: "inline-flex" }}><ArrowLeft size={14} /> {t.common.backToHome}</Link>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
          <div className="glass-card" style={{ padding: 24 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 20 }}>{lang === "ko" ? "평점 비교" : "Rating Comparison"}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 8 }}>{t.home.localRating}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Stars n={spot.koreanRating} />
                  <span style={{ fontWeight: 900, fontSize: "2rem", color: "#ffb347" }}>{spot.koreanRating}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>({spot.reviewCount.toLocaleString()} {lang === "ko" ? "리뷰" : "reviews"})</span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: "var(--border)", marginTop: 8, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(spot.koreanRating / 5) * 100}%`, background: "var(--gradient)", borderRadius: 4 }} />
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 8 }}>{t.home.touristRating}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Stars n={spot.touristRating} />
                  <span style={{ fontWeight: 700, fontSize: "1.6rem", color: "var(--text-secondary)" }}>{spot.touristRating}</span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: "var(--border)", marginTop: 8, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(spot.touristRating / 5) * 100}%`, background: "rgba(100,100,100,0.4)", borderRadius: 4 }} />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: 24 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 20 }}>{lang === "ko" ? "방문 정보" : "Visit Info"}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <DollarSign size={16} style={{ color: "var(--coral)", marginTop: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{lang === "ko" ? "가격대" : "Price Range"}</div>
                  <div style={{ fontWeight: 600 }}>{spot.price}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <MapPin size={16} style={{ color: "var(--coral)", marginTop: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{lang === "ko" ? "주소" : "Address"}</div>
                  <div style={{ fontWeight: 600, fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit", fontSize: "0.9rem" }}>{addr}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
                {spot.tags.map(tag => (
                  <span key={tag} style={{ fontSize: "0.75rem", padding: "3px 10px", borderRadius: 50, background: "rgba(255,95,82,0.1)", color: "var(--coral)", fontFamily: "'Noto Sans KR', sans-serif" }}>{tag}</span>
                ))}
              </div>
              <a href={`https://map.naver.com/v5/search/${encodeURIComponent(spot.address.ko)}`} target="_blank" rel="noopener noreferrer" className="btn-gradient" style={{ display: "inline-flex", justifyContent: "center", padding: "10px", fontSize: "0.85rem", textDecoration: "none", marginTop: 8 }}>
                🗺️ {lang === "ko" ? "네이버 지도에서 보기" : "View on Naver Map"}
              </a>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: 28, marginBottom: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16, fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>{lang === "ko" ? "소개" : "About This Spot"}</h3>
          <p style={{ lineHeight: 1.8, color: "var(--text-secondary)", fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>{desc}</p>
        </div>

        <div className="glass-card" style={{ padding: 28, marginBottom: 48, background: "linear-gradient(135deg, rgba(255,95,82,0.06), rgba(255,179,71,0.06))", borderColor: "rgba(255,95,82,0.2)" }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8, fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>
            <Lightbulb size={18} style={{ color: "#ffb347" }} />
            {lang === "ko" ? "🇰🇷 현지인 꿿팁" : "🇰🇷 Local Insider Tip"}
          </h3>
          <p style={{ lineHeight: 1.8, color: "var(--text-secondary)", fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>{tip}</p>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
