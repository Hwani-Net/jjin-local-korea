"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n, Lang } from "@/lib/i18n";
import { Sun, Moon, Globe, Menu, X } from "lucide-react";
import { useEffect } from "react";

const langs: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ko", label: "한국어" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
];

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) { setTheme(saved); document.documentElement.setAttribute("data-theme", saved); }
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/trip-planner", label: t.nav.planner },
    { href: "/spots", label: t.nav.spots },
    { href: "/culture", label: t.nav.culture },
    { href: "/k-beauty", label: t.nav.beauty },
  ];

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "var(--bg-card)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid var(--border)" : "none", transition: "all 0.3s ease", padding: "0 24px" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", alignItems: "center", height: 68, gap: 32 }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8, flex: "0 0 auto" }}>
          <span style={{ fontSize: "1.5rem" }}>🇰🇷</span>
          <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 900, fontSize: "1.1rem", background: "var(--gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>싰로컈코리아</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} style={{ textDecoration: "none", padding: "6px 14px", borderRadius: 8, fontSize: "0.9rem", fontWeight: pathname === l.href ? 700 : 500, color: pathname === l.href ? "var(--coral)" : "var(--text-secondary)", background: pathname === l.href ? "rgba(255,95,82,0.08)" : "transparent", transition: "all 0.2s" }}>{l.label}</Link>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
          <div style={{ position: "relative" }}>
            <button onClick={() => setLangOpen((p) => !p)} className="btn-ghost" style={{ padding: "7px 14px", gap: 6 }} aria-label="Select language">
              <Globe size={15} />
              <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{langs.find((l) => l.code === lang)?.label}</span>
            </button>
            {langOpen && (
              <div className="glass-card" style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", minWidth: 120, padding: 8, zIndex: 200 }}>
                {langs.map((l) => (
                  <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }} style={{ display: "block", width: "100%", padding: "8px 14px", textAlign: "left", background: lang === l.code ? "rgba(255,95,82,0.1)" : "transparent", color: lang === l.code ? "var(--coral)" : "var(--text-secondary)", border: "none", cursor: "pointer", borderRadius: 8, fontFamily: "inherit", fontSize: "0.9rem", fontWeight: lang === l.code ? 700 : 400 }}>{l.label}</button>
                ))}
              </div>
            )}
          </div>

          <button onClick={toggleTheme} className="btn-ghost" style={{ padding: "7px 14px", gap: 6 }} aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{theme === "dark" ? t.common.lightMode : t.common.darkMode}</span>
          </button>

          <Link href="/trip-planner" className="btn-gradient" style={{ padding: "9px 20px", fontSize: "0.85rem", textDecoration: "none" }}>✈️ {t.nav.planner}</Link>

          <button onClick={() => setMenuOpen((p) => !p)} className="btn-ghost" style={{ padding: "7px 10px" }}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="glass-card" style={{ margin: "0 16px 16px", padding: 16, display: "flex", flexDirection: "column", gap: 4 }}>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ textDecoration: "none", padding: "10px 14px", borderRadius: 8, color: pathname === l.href ? "var(--coral)" : "var(--text-secondary)", fontWeight: pathname === l.href ? 700 : 500 }}>{l.label}</Link>
          ))}
        </div>
      )}
    </nav>
  );
}
