"use client";
import { Spot } from "@/lib/data";
import { useI18n, Lang } from "@/lib/i18n";
import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, Users } from "lucide-react";

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <span className="stars" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} size={12} className={i < Math.round(rating) ? "star-filled" : "star-empty"} fill={i < Math.round(rating) ? "#ffb347" : "none"} strokeWidth={i < Math.round(rating) ? 0 : 1.5} />
      ))}
    </span>
  );
}

export default function SpotCard({ spot }: { spot: Spot }) {
  const { t, lang } = useI18n();
  const name = spot.name[lang as Lang] || spot.name.en;
  const desc = spot.description[lang === "ko" ? "ko" : "en"];
  const addr = spot.address[lang === "ko" ? "ko" : "en"];

  return (
    <Link href={`/spots/${spot.id}`} style={{ textDecoration: "none" }}>
      <article className="glass-card" style={{ overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
          <Image src={spot.image} alt={name} fill style={{ objectFit: "cover", transition: "transform 0.4s ease" }} sizes="(max-width: 768px) 100vw, 400px" />
          {spot.isHiddenGem && (
            <div style={{ position: "absolute", top: 12, left: 12 }}>
              <span className="badge-gem">🔥 {t.home.hiddenGem}</span>
            </div>
          )}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
        </div>

        <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <h3 style={{ fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit", fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", marginBottom: 4 }}>{name}</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--text-muted)", fontSize: "0.8rem" }}>
              <MapPin size={11} />
              <span style={{ fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>{addr}</span>
            </div>
          </div>

          <div className="glass-card" style={{ padding: "10px 14px", borderRadius: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: 2 }}>{t.home.localRating}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <StarRating rating={spot.koreanRating} />
                  <span style={{ fontWeight: 800, color: "#ffb347", fontSize: "0.95rem" }}>{spot.koreanRating}</span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: 2 }}>{t.home.touristRating}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
                  <span style={{ fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.9rem" }}>{spot.touristRating}</span>
                  <StarRating rating={spot.touristRating} />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--text-muted)", fontSize: "0.72rem" }}>
              <Users size={10} />
              <span>{spot.reviewCount.toLocaleString()} {t.home.reviews}</span>
            </div>
          </div>

          <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem", lineHeight: 1.6, flex: 1, fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{desc}</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {spot.tags.slice(0, 3).map((tag) => (
              <span key={tag} style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 50, background: "rgba(255,95,82,0.08)", color: "var(--coral)", fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 500 }}>{tag}</span>
            ))}
          </div>

          <div style={{ color: "var(--coral)", fontWeight: 700, fontSize: "0.85rem", marginTop: 4 }}>{t.home.viewDetails}</div>
        </div>
      </article>
    </Link>
  );
}
