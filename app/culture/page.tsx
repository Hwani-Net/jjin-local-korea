"use client";
import { useI18n, Lang } from "@/lib/i18n";
import { cultureGuides, phrases } from "@/lib/data";

export default function CulturePage() {
  const { t, lang } = useI18n();
  return (
    <div style={{ paddingTop: 88 }}>
      <div style={{ background: "linear-gradient(135deg, rgba(255,95,82,0.08), rgba(255,179,71,0.06))", borderBottom: "1px solid var(--border)", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, marginBottom: 12 }}>
          <span className="gradient-text">📚 {t.culture.title}</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>{t.culture.subtitle}</p>
      </div>

      <div className="section">
        <div className="glass-card" style={{ padding: 36, marginBottom: 48, textAlign: "center", background: "linear-gradient(135deg, rgba(255,95,82,0.05), rgba(255,179,71,0.05))" }}>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.8, fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit", maxWidth: 700, margin: "0 auto" }}>
            {lang === "ko" ? "한국은 5,000년 역사에서 비롯된 독특한 예절과 문화를 가집니다. 이 가이드를 통해 현지인쳌럼 행동하고 더 깊은 여행 경험을 즉기세요." : "Korea has unique etiquette and culture rooted in 5,000 years of history. Use this guide to behave like a local and enjoy a much richer travel experience."}
          </p>
        </div>

        <h2 className="section-title" style={{ marginBottom: 8 }}>🇰🇷 {lang === "ko" ? "필수 에티켓 가이드" : "Essential Etiquette Guide"}</h2>
        <p className="section-subtitle">{lang === "ko" ? "이것만 알면 한국인 친구 사귀기 끝" : "Know these and you'll make Korean friends instantly"}</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24, marginBottom: 64 }}>
          {cultureGuides.map((guide) => (
            <div key={guide.id} className="glass-card" style={{ padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, rgba(255,95,82,0.15), rgba(255,179,71,0.15))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>{guide.icon}</div>
                <h3 style={{ fontWeight: 800, fontSize: "1rem", fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>{guide.title[lang === "ko" ? "ko" : "en"]}</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {guide.tips.map((tip, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gradient)", flexShrink: 0, marginTop: 8 }} />
                    <p style={{ fontSize: "0.87rem", color: "var(--text-secondary)", lineHeight: 1.6, fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>{lang === "ko" ? tip.ko : tip.en}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2 className="section-title" style={{ marginBottom: 8 }}>💬 {t.culture.phrasesTitle}</h2>
        <p className="section-subtitle">{lang === "ko" ? "이 6개만 알아도 한국 여행 문제없음!" : "Know these 6 phrases and you're set for Korea!"}</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {phrases.map((p, i) => (
            <div key={i} className="glass-card" style={{ padding: 24, background: "linear-gradient(135deg, rgba(255,95,82,0.04), rgba(255,179,71,0.04))", borderColor: "rgba(255,95,82,0.1)" }}>
              <div style={{ fontSize: "2rem", marginBottom: 12 }}>{p.emoji}</div>
              <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 900, fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 4 }}>{p.korean}</div>
              <div style={{ fontSize: "0.9rem", color: "var(--coral)", fontWeight: 600, marginBottom: 8 }}>{p.romanized}</div>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>{p.meaning}</div>
            </div>
          ))}
        </div>

        <div className="glass-card" style={{ marginTop: 64, padding: "40px 36px", textAlign: "center", background: "linear-gradient(135deg, rgba(255,95,82,0.08), rgba(255,179,71,0.08))", borderColor: "rgba(255,95,82,0.2)" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>🍺</div>
          <h3 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: 12, fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>
            {lang === "ko" ? "한국 술 문화의 핵심: 절대 스스로 따르지 마세요!" : "Korean Drinking Culture: Never Pour Your Own Drink!"}
          </h3>
          <p style={{ color: "var(--text-secondary)", maxWidth: 600, margin: "0 auto", fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit", lineHeight: 1.7 }}>
            {lang === "ko" ? "한국에서는 다른 사람의 잔이 비면 채워주는 것이 기본 예의. 자기 잔을 자기가 따르는 것은 혼자 마신다는 부정적 의미. 소주잔은 두 손으로!" : "In Korea, pouring drinks for others when their glass is empty is basic etiquette. Pouring for yourself implies you're drinking alone. Always receive soju glasses with two hands!"}
          </p>
        </div>
      </div>
    </div>
  );
}
