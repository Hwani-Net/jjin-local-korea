"use client";
import { useI18n, Lang } from "@/lib/i18n";
import { beautyGuides } from "@/lib/data";
import Image from "next/image";

const kBeautySteps = [
  { step: "1", name: { ko: "클렌징", en: "Cleansing" }, desc: { ko: "오일 클렌저로 더블 클렌징이 K-뷰티의 기본", en: "Double cleansing with oil cleanser is the K-beauty foundation" }, icon: "🧴" },
  { step: "2", name: { ko: "토너", en: "Toner" }, desc: { ko: "피부 결 정리 + 수분 공급. 토너패드 인기 급상승중", en: "Skin prep + hydration. Toner pads are trending among Korean women" }, icon: "💧" },
  { step: "3", name: { ko: "앰플/세럼", en: "Ampoule/Serum" }, desc: { ko: "고농축 성분으로 집중 케어. 나이아신아마이드, 비타민 C 인기", en: "Concentrated actives. Niacinamide and Vitamin C are big right now" }, icon: "⚗️" },
  { step: "4", name: { ko: "크림", en: "Moisturizer" }, desc: { ko: "피부 장벽 강화. 유리 피부(glass skin)의 핵심 단계", en: "Skin barrier protection. Key step for Korean glass skin" }, icon: "✨" },
  { step: "5", name: { ko: "선크림 (필수!)", en: "Sunscreen (MUST!)" }, desc: { ko: "한국인은 실내에서도 자외선 차단. SPF50+ PA++++ 이상 권장", en: "Koreans wear sunscreen indoors too. SPF50+ PA++++ minimum" }, icon: "☀️" },
];

const brands = [
  { name: "COSRX", specialty: { ko: "민감성 피부", en: "Sensitive Skin" }, icon: "🧪" },
  { name: "Laneige", specialty: { ko: "수분 공급", en: "Hydration" }, icon: "💙" },
  { name: "ANUA", specialty: { ko: "트러블 케어", en: "Acne Care" }, icon: "🌿" },
  { name: "Klairs", specialty: { ko: "자극 없는 기초", en: "Gentle Basics" }, icon: "🤍" },
  { name: "Dr. Jart+", specialty: { ko: "피부 진정", en: "Skin Repair" }, icon: "🔬" },
  { name: "Innisfree", specialty: { ko: "자연 성분", en: "Natural Ingredients" }, icon: "🌺" },
];

export default function KBeautyPage() {
  const { t, lang } = useI18n();
  return (
    <div style={{ paddingTop: 88 }}>
      <div style={{ background: "linear-gradient(135deg, rgba(255,95,82,0.08), rgba(255,179,71,0.06))", borderBottom: "1px solid var(--border)", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, marginBottom: 12 }}>
          <span className="gradient-text">💄 {t.beauty.title}</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>{t.beauty.subtitle}</p>
      </div>

      <div className="section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 64, alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900, marginBottom: 16 }}>
              {lang === "ko" ? "올리브영이 뛰야? 🛍️" : "What is Olive Young? 🛍️"}
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 16, fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>
              {lang === "ko" ? "올리브영은 한국판 세포라+드랭스토어. 전국 1,200개+ 매장에서 K-뷰티 베스트셉러를 한 번에 시폤." : "Olive Young is Korea's Sephora+drugstore combo. With 1,200+ stores nationwide, it's the ultimate K-beauty destination."}
            </p>
            {[
              { ko: "외국인도 멤버십 가입 가능 (즉시 할인)", en: "Foreigners can join membership (instant discounts)" },
              { ko: "면세 가능 (일부 매장, 영수증 보관)", en: "Tax refund available at select stores (keep receipts)" },
            ].map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                <span style={{ color: "var(--coral)", fontWeight: 700, flexShrink: 0 }}>✓</span>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>{lang === "ko" ? tip.ko : tip.en}</p>
              </div>
            ))}
          </div>
          <div style={{ position: "relative", height: 300, borderRadius: 20, overflow: "hidden" }}>
            <Image src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80" alt="K-Beauty" fill style={{ objectFit: "cover" }} sizes="50vw" />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,95,82,0.2), transparent)" }} />
          </div>
        </div>

        <h2 className="section-title" style={{ marginBottom: 8 }}>{lang === "ko" ? "✨ 한국인 기초 스킨케어 루틴" : "✨ The Korean Skincare Routine"}</h2>
        <p className="section-subtitle">{lang === "ko" ? "유리 피부(Glass Skin)의 비밀" : "The secret to Korean glass skin — the order matters!"}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 64 }}>
          {kBeautySteps.map((step, i) => (
            <div key={i} className="glass-card" style={{ padding: "20px 28px", display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "white", fontSize: "1.1rem", flexShrink: 0 }}>{step.step}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: "1.2rem" }}>{step.icon}</span>
                  <h3 style={{ fontWeight: 700, fontSize: "1rem", fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>{step.name[lang === "ko" ? "ko" : "en"]}</h3>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>{step.desc[lang === "ko" ? "ko" : "en"]}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="section-title" style={{ marginBottom: 8 }}>{lang === "ko" ? "🏆 한국인이 진짜 쓰는 브랜드" : "🏆 Brands Koreans Actually Use"}</h2>
        <p className="section-subtitle">{lang === "ko" ? "광고 아닌 현지인 픽 — 올리브영 베스트셉러 브랜드" : "Not sponsored — real local picks from Olive Young bestsellers"}</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16, marginBottom: 64 }}>
          {brands.map((b) => (
            <div key={b.name} className="glass-card" style={{ padding: "24px 20px", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: 12 }}>{b.icon}</div>
              <h3 style={{ fontWeight: 800, marginBottom: 6, fontSize: "1rem" }}>{b.name}</h3>
              <span style={{ fontSize: "0.75rem", padding: "3px 10px", borderRadius: 50, background: "rgba(255,95,82,0.1)", color: "var(--coral)", fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit", fontWeight: 600 }}>{b.specialty[lang === "ko" ? "ko" : "en"]}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {beautyGuides.map((g) => (
            <div key={g.id} className="glass-card" style={{ padding: 28 }}>
              <div style={{ position: "relative", height: 160, borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
                <Image src={g.image} alt={g.name.en} fill style={{ objectFit: "cover" }} sizes="400px" />
              </div>
              <h3 style={{ fontWeight: 800, marginBottom: 8, fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>{g.name[lang === "ko" ? "ko" : "en"]}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: 16 }}>{g.description[lang === "ko" ? "ko" : "en"]}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {(lang === "ko" ? g.items : g.englishItems).map((item, i) => (
                  <span key={i} style={{ fontSize: "0.8rem", padding: "4px 12px", borderRadius: 50, background: "rgba(255,95,82,0.08)", color: "var(--coral)", fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit", fontWeight: 600 }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 768px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
