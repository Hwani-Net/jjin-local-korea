"use client";
import { Spot } from "@/lib/data";
import { useI18n, Lang } from "@/lib/i18n";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";

export default function SpotCard({ spot }: { spot: Spot }) {
  const { t, lang } = useI18n();
  const name = spot.name[lang as Lang] || spot.name.en;
  const desc = spot.description[lang === "ko" ? "ko" : "en"];

  return (
    <Link href={`/spots/${spot.id}`} style={{ textDecoration: "none" }}>
      <div className="spot-card">
        <div className="spot-card-image">
          <Image
            src={spot.image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            style={{ objectFit: "cover" }}
          />
          {spot.isHiddenGem ? (
            <span className="spot-card-badge hidden-gem">💎 Hidden Gem</span>
          ) : (
            <span className="spot-card-badge">🔥 Local Pick</span>
          )}
          <button className="spot-card-save">♡</button>
        </div>
        <div className="spot-card-body">
          <div className="spot-card-title">{name}</div>
          <div className="spot-card-desc">{desc}</div>
          <div className="spot-card-meta">
            <div className="spot-card-location">
              <MapPin size={12} />
              {lang === "ko" ? spot.location?.ko : spot.location?.en}
            </div>
            <div className="spot-card-rating">
              <div className="rating-local">⭐ {spot.localRating}</div>
              <div className="rating-tourist">
                / {spot.touristRating}
                <span style={{ marginLeft: 3, fontSize: "0.65rem" }}>tourist</span>
              </div>
            </div>
          </div>
          {spot.tags && (
            <div className="spot-card-tags">
              {spot.tags.slice(0, 3).map((tag: string, i: number) => (
                <span key={i} className="tag">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
