"use client";
import { useState } from "react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { regions } from "@/lib/data";

const durations = [
  { key: "half", label: "Half Day" },
  { key: "1day", label: "1 Day" },
  { key: "1n2d", label: "1 Night 2 Days" },
  { key: "2n3d", label: "2 Nights 3 Days" },
];

const stayTypes = [
  { key: "hanok", label: "Hanok Stay", icon: "🏯" },
  { key: "hotel", label: "Hotel", icon: "🏨" },
  { key: "guesthouse", label: "Guesthouse", icon: "🏠" },
  { key: "motel", label: "Motel", icon: "🛏️" },
  { key: "temple", label: "Temple Stay", icon: "⛩️" },
];

const travelStyles = [
  { key: "food", label: "🍜 Local Food & Markets" },
  { key: "beauty", label: "💄 K-Beauty & Shopping" },
  { key: "photo", label: "📸 Photo Spots" },
  { key: "culture", label: "🏛️ Cultural Deep Dive" },
  { key: "hidden", label: "💎 Hidden Gems" },
  { key: "nature", label: "🏔️ History & Culture" },
];

const culturalTips = [
  { ko: "서버를 부를 때는 '이모!' 또는 '저기요!'라고 하세요", en: "Call servers with '이모!' (aunt) or '저기요!' (excuse me)" },
  { ko: "지하철에서는 조용히, 에스컬레이터는 우측 통행", en: "Stay quiet on subways & stand right on escalators" },
  { ko: "감사합니다 (Gamsahamnida) = Thank you", en: "감사합니다 (Gamsahamnida) = Thank you" },
  { ko: "신발 벗는 곳에 슬리퍼가 있으면 신발을 벗어야 합니다", en: "Remove shoes when you see slippers at the entrance" },
];

interface ItineraryItem {
  time: string;
  nameEn: string;
  nameKo: string;
  desc: string;
  tags?: string[];
  hasImage?: boolean;
  image?: string;
  tipLabel?: string;
}

interface ItineraryDay {
  day: string;
  total?: string;
  items: ItineraryItem[];
}

export default function TripPlannerPage() {
  const { lang } = useI18n();
  const [selectedRegion, setSelectedRegion] = useState("seoul");
  const [selectedDuration, setSelectedDuration] = useState("1n2d");
  const [selectedStay, setSelectedStay] = useState("hanok");
  const [selectedStyles, setSelectedStyles] = useState<string[]>(["food"]);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryDay[] | null>(null);
  const [error, setError] = useState("");

  const toggleStyle = (key: string) => {
    setSelectedStyles((prev: string[]) =>
      prev.includes(key) ? prev.filter((s: string) => s !== key) : [...prev, key]
    );
  };

  const generate = async () => {
    setLoading(true);
    setError("");
    setItinerary(null);
    try {
      const res = await fetch("/api/generate-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          region: selectedRegion,
          duration: selectedDuration,
          stay: selectedStay,
          styles: selectedStyles,
          lang,
        }),
      });
      const data = await res.json();
      if (data.itinerary) setItinerary(data.itinerary);
      else setError(data.error || "Failed to generate itinerary.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const regionData = regions.find((r) => r.id === selectedRegion);

  return (
    <div style={{ paddingTop: 60, minHeight: "100vh", background: "var(--bg-primary)" }}>
      {/* Page Header */}
      <div style={{ background: "linear-gradient(135deg, #1c1917 0%, #292524 100%)", padding: "40px 48px", borderBottom: "1px solid rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1538485399081-7191377e8241?w=1200&q=80')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12 }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--coral)", marginBottom: 8, letterSpacing: 0.5 }}>✨ AI-POWERED</div>
          <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, color: "white", marginBottom: 8 }}>
            {lang === "ko" ? "나만의 한국 어드벤처 만들기" : "Build Your Korean Adventure"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem" }}>
            {lang === "ko" ? "여행 스타일을 알려주시면 AI가 완벽한 '찐' 현지 경험을 만들어 드립니다" : "Tell us your preferences and let AI craft your perfect 'Jjin' (Real) local experience"}
          </p>
        </div>
      </div>

      {/* Main Layout */}
      <div style={{ padding: "32px 48px" }}>
        <div className="planner-layout">
          {/* LEFT: Form */}
          <div className="planner-form">
            {/* Region */}
            <div className="form-group">
              <div className="form-label">
                <span className="form-label-num">1</span>
                {lang === "ko" ? "어디로 가실 건가요?" : "Where do you want to go?"}
              </div>
              <div className="region-grid">
                {regions.slice(0, 6).map((r) => (
                  <button key={r.id} className={`region-option ${selectedRegion === r.id ? "selected" : ""}`} onClick={() => setSelectedRegion(r.id)} style={{ background: "none", padding: 0, border: "2px solid transparent" }}>
                    <Image src={r.image || "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=400&q=70"} alt={r.name} fill sizes="150px" style={{ objectFit: "cover", opacity: selectedRegion === r.id ? 0.9 : 0.65 }} />
                    <div className="region-option-label">
                      <strong>{lang === "ko" ? r.nameKo : r.name}</strong>
                      <span>{r.tagline || ""}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="form-group">
              <div className="form-label"><span className="form-label-num">2</span>{lang === "ko" ? "여행 기간은?" : "How long is your trip?"}</div>
              <div className="duration-chips">
                {durations.map((d) => (<button key={d.key} className={`chip ${selectedDuration === d.key ? "selected" : ""}`} onClick={() => setSelectedDuration(d.key)}>{d.label}</button>))}
              </div>
            </div>

            {/* Stay */}
            <div className="form-group">
              <div className="form-label"><span className="form-label-num">3</span>{lang === "ko" ? "숙박 형태는?" : "Preferred Stay?"}</div>
              <div className="stay-chips">
                {stayTypes.map((s) => (<button key={s.key} className={`chip ${selectedStay === s.key ? "selected" : ""}`} onClick={() => setSelectedStay(s.key)}>{s.icon} {s.label}</button>))}
              </div>
            </div>

            {/* Travel Style */}
            <div className="form-group">
              <div className="form-label"><span className="form-label-num">4</span>{lang === "ko" ? "여행 스타일 & 관심사" : "Travel Style & Interests"}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {travelStyles.map((s) => (
                  <button key={s.key} className={`style-checkbox ${selectedStyles.includes(s.key) ? "checked" : ""}`} onClick={() => toggleStyle(s.key)}>
                    <span style={{ fontSize: "1rem" }}>{selectedStyles.includes(s.key) ? "☑" : "☐"}</span>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <button className="btn btn-primary" onClick={generate} disabled={loading} style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: "0.95rem" }}>
              {loading ? "⏳ Generating..." : "✨ Generate My Korean Trip"}
            </button>
          </div>

          {/* RIGHT: Cultural Tips + Result */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="planner-result" style={{ minHeight: "auto" }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: 0.5, marginBottom: 14 }}>🇰🇷 CULTURAL TIPS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {culturalTips.map((tip, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--coral-bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", flexShrink: 0 }}>
                      {["👋", "🚇", "🙏", "👟"][i]}
                    </div>
                    <p style={{ fontSize: "0.835rem", color: "var(--text-secondary)", lineHeight: 1.5, fontFamily: lang === "ko" ? "'Noto Sans KR', sans-serif" : "inherit" }}>
                      {lang === "ko" ? tip.ko : tip.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="planner-result">
              {error && <div style={{ color: "#ef4444", fontSize: "0.85rem", padding: "12px 0" }}>⚠️ {error}</div>}

              {!itinerary && !loading && !error && (
                <div className="empty-state">
                  <div className="empty-icon">✈️</div>
                  <div className="empty-title">{lang === "ko" ? "일정이 여기에 나타납니다" : "Your itinerary will appear here"}</div>
                  <div className="empty-desc">{lang === "ko" ? "왼쪽에서 옵션 선택 후 생성 버튼을 누르세요" : "Select your options on the left and click generate"}</div>
                </div>
              )}

              {loading && (
                <div className="empty-state">
                  <div style={{ fontSize: "2.5rem", marginBottom: 16, animation: "spin 1s linear infinite" }}>⚙️</div>
                  <div className="empty-title">{lang === "ko" ? "AI가 일정을 생성 중..." : "AI is crafting your itinerary..."}</div>
                  <div className="empty-desc">약 10-20초 소요됩니다</div>
                </div>
              )}

              {itinerary && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
                    <div>
                      <div style={{ fontSize: "0.72rem", color: "var(--coral)", fontWeight: 700, letterSpacing: 0.5 }}>✨ AI-GENERATED</div>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginTop: 4 }}>
                        {lang === "ko" ? `나의 ${regionData?.nameKo || selectedRegion} 어드벤처` : `Your ${regionData?.name || selectedRegion} Adventure`}
                      </h3>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {["📋", "🔗", "📤"].map((icon, i) => (
                        <button key={i} style={{ background: "var(--coral-bg)", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: "1rem" }}>{icon}</button>
                      ))}
                    </div>
                  </div>

                  {itinerary.map((day: ItineraryDay, di: number) => (
                    <div key={di} className="itinerary-day">
                      <div className="day-header">
                        <span style={{ background: "var(--coral)", color: "white", fontSize: "0.68rem", padding: "2px 8px", borderRadius: 4, fontWeight: 800 }}>{day.day}</span>
                        {day.total && <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Today&apos;s Total: {day.total}</span>}
                      </div>
                      {day.items.map((item: ItineraryItem, ii: number) => (
                        <div key={ii} className="itinerary-item">
                          <div className="item-time">{item.time}</div>
                          <div className="item-dot" />
                          <div className="item-body">
                            <div className="item-name">{item.nameEn}</div>
                            {item.nameKo && <div className="item-name-ko">{item.nameKo}</div>}
                            {item.hasImage && item.image && (
                              <div style={{ position: "relative", height: 100, borderRadius: 10, overflow: "hidden", margin: "8px 0" }}>
                                <Image src={item.image} alt={item.nameEn} fill sizes="300px" style={{ objectFit: "cover" }} />
                              </div>
                            )}
                            <div className="item-desc">{item.desc}</div>
                            {item.tags && (
                              <div className="spot-card-tags" style={{ marginTop: 6 }}>
                                {item.tags.map((tag: string, ti: number) => <span key={ti} className="tag">{tag}</span>)}
                              </div>
                            )}
                          </div>
                          {item.tipLabel && (
                            <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "2px 7px", borderRadius: 4, background: item.tipLabel === "MUST TRY" ? "rgba(249,115,22,0.15)" : "rgba(99,102,241,0.15)", color: item.tipLabel === "MUST TRY" ? "var(--coral)" : "#6366f1", alignSelf: "flex-start", flexShrink: 0, whiteSpace: "nowrap" }}>
                              {item.tipLabel}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}

                  <div className="cultural-tip">
                    <strong style={{ color: "var(--coral)", fontSize: "0.78rem", letterSpacing: 0.5 }}>💡 CULTURAL TIP</strong>
                    <p style={{ marginTop: 4, fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                      {lang === "ko" ? "물건을 주고받을 때는 두 손을 사용하는 것이 예의입니다. '감사합니다'라고 말하는 것도 잊지 마세요!" : "When paying or receiving something, use two hands as a sign of respect. And say \"Gamsahamnida\" (감사합니다)!"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @media (max-width: 900px) { .planner-layout { grid-template-columns: 1fr !important; } div[style*="padding: 32px 48px"] { padding: 24px 16px !important; } }`}</style>
    </div>
  );
}
