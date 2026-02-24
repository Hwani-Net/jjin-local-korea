"use client";
import { useState, useRef } from "react";
import { useI18n, Lang } from "@/lib/i18n";
import { regions, Region } from "@/lib/data";
import { Loader2, Share2, RefreshCw, CheckSquare, Square } from "lucide-react";

type Duration = "halfDay" | "oneDay" | "twoDays" | "threeDays";
type AccomType = "hotel" | "guesthouse" | "hanok" | "motel" | "temple";
type Style = "food" | "beauty" | "insta" | "culture" | "nature";

export default function TripPlannerPage() {
  const { t, lang } = useI18n();
  const [selectedRegion, setSelectedRegion] = useState<Region>("seoul");
  const [duration, setDuration] = useState<Duration>("twoDays");
  const [accom, setAccom] = useState<AccomType>("hanok");
  const [styles, setStyles] = useState<Style[]>(["food"]);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<string>("");
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  const toggleStyle = (s: Style) => setStyles((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  const regionLabel = regions.find((r) => r.id === selectedRegion)?.label;

  const durationLabels: Record<Duration, string> = { halfDay: t.planner.halfDay, oneDay: t.planner.oneDay, twoDays: t.planner.twoDays, threeDays: t.planner.threeDays };
  const accomLabels: Record<AccomType, { label: string; icon: string }> = {
    hotel: { label: t.planner.hotelLabel, icon: "🏨" }, guesthouse: { label: t.planner.guestLabel, icon: "🛫" },
    hanok: { label: t.planner.hanokLabel, icon: "🏠" }, motel: { label: t.planner.motelLabel, icon: "🏩" }, temple: { label: t.planner.templeLabel, icon: "🛕" },
  };
  const styleOptions: { id: Style; label: string }[] = [
    { id: "food", label: t.planner.foodStyle }, { id: "beauty", label: t.planner.beautyStyle },
    { id: "insta", label: t.planner.instaStyle }, { id: "culture", label: t.planner.cultureStyle }, { id: "nature", label: t.planner.natureStyle },
  ];
  const cultureTips = [
    { ko: "식당에서 '이모!' 또는 '저기요!'로 직원을 부르세요", en: "Call servers with '이모!' (aunt) or '저기요!' (excuse me)", emoji: "🍽️" },
    { ko: "지하철은 조용히, 우측 통행", en: "Stay quiet on subways & stand right on escalators", emoji: "🚇" },
    { ko: "감사합니다 (Gamsahamnida) = Thank you", en: "감사합니다 (Gamsahamnida) = Thank you", emoji: "🙏" },
    { ko: "신발 벗어야 하는 곳엔 꼭 벗기", en: "Remove shoes when you see slippers at the entrance", emoji: "👟" },
  ];

  const handleGenerate = async () => {
    if (styles.length === 0) { setError(lang === "ko" ? "여행 스타일을 하나 이상 선택해주세요." : "Please select at least one travel style."); return; }
    setError(""); setLoading(true); setItinerary("");
    const prompt = `You are a Korean local travel expert. Create a detailed itinerary for ${regionLabel?.en}, Korea.
- Duration: ${durationLabels[duration]}
- Accommodation: ${accomLabels[accom].label}
- Styles: ${styles.map((s) => styleOptions.find((o) => o.id === s)?.label).join(", ")}
Rules: Recommend REAL local spots Koreans love. Show Korean name + English. Include prices in KRW. Add transport info. Mark hidden gems with 🔥. Format with time blocks.`;
    try {
      const res = await fetch("/api/generate-trip", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setItinerary(data.itinerary);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg.includes("API key") ? t.planner.noApiKey : `Error: ${msg}`);
    } finally { setLoading(false); }
  };

  const handleShare = async () => {
    const text = `🇰🇷 My ${regionLabel?.en} itinerary from 싰 로컈 코리아!\n\n${itinerary.slice(0, 200)}...`;
    if (navigator.share) await navigator.share({ title: "싰 로컈 코리아 여행 코스", text });
    else { await navigator.clipboard.writeText(text); alert(lang === "ko" ? "클립보드에 복사되었습니다!" : "Copied to clipboard!"); }
  };

  return (
    <div style={{ paddingTop: 88 }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "40px 24px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
        <div className="glass-card" style={{ padding: "36px" }}>
          <h1 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 900, marginBottom: 8, fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>{t.planner.title}</h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: 36 }}>{t.planner.subtitle}</p>

          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><span className="gradient-text">01</span> {t.planner.step1}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {regions.map((r) => (
                <button key={r.id} onClick={() => setSelectedRegion(r.id)} style={{ padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${selectedRegion === r.id ? "var(--coral)" : "var(--border)"}`, background: selectedRegion === r.id ? "rgba(255,95,82,0.1)" : "var(--bg-card)", color: selectedRegion === r.id ? "var(--coral)" : "var(--text-secondary)", cursor: "pointer", textAlign: "left", fontFamily: "'Noto Sans KR', sans-serif", fontWeight: selectedRegion === r.id ? 700 : 400, transition: "all 0.2s", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: "1.2rem" }}>{r.emoji}</span>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>{r.label[lang as Lang] || r.label.en}</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", lineHeight: 1.3 }}>{r.desc[lang === "ko" ? "ko" : "en"].slice(0, 28)}...</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><span className="gradient-text">02</span> {t.planner.step2}</h3>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {(["halfDay", "oneDay", "twoDays", "threeDays"] as Duration[]).map((d) => (
                <button key={d} className={`pill ${duration === d ? "active" : ""}`} onClick={() => setDuration(d)}>{durationLabels[d]}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><span className="gradient-text">03</span> {t.planner.step3}</h3>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {(["hotel", "guesthouse", "hanok", "motel", "temple"] as AccomType[]).map((a) => (
                <button key={a} className={`pill ${accom === a ? "active" : ""}`} onClick={() => setAccom(a)}>{accomLabels[a].icon} {accomLabels[a].label}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 36 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><span className="gradient-text">04</span> {t.planner.step4}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {styleOptions.map((s) => (
                <button key={s.id} onClick={() => toggleStyle(s.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, border: `1.5px solid ${styles.includes(s.id) ? "var(--coral)" : "var(--border)"}`, background: styles.includes(s.id) ? "rgba(255,95,82,0.08)" : "var(--bg-card)", color: styles.includes(s.id) ? "var(--coral)" : "var(--text-secondary)", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
                  {styles.includes(s.id) ? <CheckSquare size={18} style={{ flexShrink: 0 }} /> : <Square size={18} style={{ flexShrink: 0 }} />}
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {error && <div style={{ marginBottom: 20, padding: "12px 16px", background: "rgba(255,59,48,0.1)", border: "1px solid rgba(255,59,48,0.3)", borderRadius: 10, color: "#ff3b30", fontSize: "0.85rem" }}>{error}</div>}

          <button className="btn-gradient" onClick={handleGenerate} disabled={loading} style={{ width: "100%", justifyContent: "center", fontSize: "1.05rem", padding: "16px" }}>
            {loading ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> {t.planner.generating}</> : t.planner.generateBtn}
          </button>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>

        <div ref={resultRef}>
          <div className="glass-card" style={{ padding: 28, marginBottom: 24 }}>
            <h3 style={{ fontWeight: 800, marginBottom: 20, fontSize: "1.1rem" }}>{t.planner.tipTitle}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {cultureTips.map((tip, i) => (
                <div key={i} className="glass-card" style={{ padding: "12px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{tip.emoji}</span>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{lang === "ko" ? tip.ko : tip.en}</p>
                </div>
              ))}
            </div>
          </div>

          {!itinerary && !loading && (
            <div className="glass-card" style={{ padding: 40, textAlign: "center", background: "linear-gradient(135deg, rgba(255,95,82,0.05), rgba(255,179,71,0.05))", borderColor: "rgba(255,95,82,0.15)" }}>
              <div style={{ fontSize: "4rem", marginBottom: 16 }}>✈️</div>
              <h3 style={{ fontWeight: 700, marginBottom: 8, color: "var(--text-secondary)" }}>{lang === "ko" ? "여행 코스가 여기에 표시됩니다" : "Your itinerary will appear here"}</h3>
              <p style={{ color: "var(--text-muted)" }}>{lang === "ko" ? "왼쪽에서 옵션을 선택하고 생성 버튼을 눌러주세요" : "Select your options on the left and click generate"}</p>
            </div>
          )}

          {loading && (
            <div className="glass-card" style={{ padding: 40, textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>🇰🇷</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, color: "var(--coral)" }}>
                <Loader2 size={24} style={{ animation: "spin 1s linear infinite" }} />
                <span style={{ fontWeight: 600, fontSize: "1.1rem" }}>{t.planner.generating}</span>
              </div>
            </div>
          )}

          {itinerary && (
            <div className="glass-card" style={{ padding: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                <h2 style={{ fontWeight: 900, fontSize: "1.3rem" }}>{t.planner.resultTitle}</h2>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn-ghost" onClick={handleShare} style={{ padding: "8px 14px", gap: 6 }}><Share2 size={14} /> {t.planner.shareBtn}</button>
                  <button className="btn-ghost" onClick={handleGenerate} style={{ padding: "8px 14px", gap: 6 }}><RefreshCw size={14} /> {t.planner.regenBtn}</button>
                </div>
              </div>
              <div style={{ lineHeight: 1.8, color: "var(--text-secondary)", fontSize: "0.92rem", whiteSpace: "pre-wrap" }}>{itinerary}</div>
            </div>
          )}
        </div>
      </div>
      <style>{`@media (max-width: 900px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
