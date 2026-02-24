"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n, Lang } from "@/lib/i18n";

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang, t } = useI18n();
  const [theme, setTheme] = useState("light");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const langs: { code: Lang; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "ko", label: "한" },
    { code: "ja", label: "日" },
    { code: "zh", label: "中" },
  ];

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/trip-planner", label: t.nav.planner },
    { href: "/spots", label: t.nav.spots },
    { href: "/culture", label: t.nav.culture },
    { href: "/k-beauty", label: t.nav.beauty },
  ];

  return (
    <nav className="navbar" style={{ justifyContent: "space-between" }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
        <span style={{ background: "var(--gradient)", color: "white", fontWeight: 900, fontSize: "0.75rem", padding: "3px 7px", borderRadius: 6, letterSpacing: 0.5 }}>찐</span>
        <span style={{ color: "var(--nav-text)", fontWeight: 700, fontSize: "0.95rem" }}>Jjin Local <span style={{ opacity: 0.5 }}>🇰🇷</span></span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} style={{ padding: "6px 12px", borderRadius: 8, fontSize: "0.85rem", fontWeight: 500, color: pathname === link.href ? "var(--coral)" : "var(--nav-text)", textDecoration: "none", opacity: pathname === link.href ? 1 : 0.75, transition: "all 0.15s", background: pathname === link.href ? "rgba(249,115,22,0.1)" : "transparent" }}>
            {link.label}
          </Link>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", background: "rgba(255,255,255,0.07)", borderRadius: 8, padding: 2 }}>
          {langs.map((l) => (
            <button key={l.code} onClick={() => setLang(l.code)} style={{ padding: "4px 8px", borderRadius: 6, fontSize: "0.75rem", fontWeight: 600, border: "none", cursor: "pointer", background: lang === l.code ? "var(--coral)" : "transparent", color: lang === l.code ? "white" : "rgba(255,255,255,0.55)", transition: "all 0.15s" }}>
              {l.label}
            </button>
          ))}
        </div>
        <button onClick={toggleTheme} style={{ background: "rgba(255,255,255,0.07)", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <Link href="/trip-planner" className="btn btn-primary" style={{ padding: "7px 16px", fontSize: "0.82rem" }}>
          ✈️ {lang === "ko" ? "여행 계획" : "Plan Trip"}
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", background: "none", border: "none", color: "var(--nav-text)", fontSize: "1.2rem", cursor: "pointer" }} className="mobile-burger">☰</button>
      </div>

      {mobileOpen && (
        <div style={{ position: "fixed", top: 60, left: 0, right: 0, background: "var(--nav-bg)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 4, zIndex: 99 }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} style={{ padding: "10px 12px", borderRadius: 8, fontSize: "0.9rem", fontWeight: 500, color: pathname === link.href ? "var(--coral)" : "var(--nav-text)", textDecoration: "none" }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
      <style>{`@media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-burger { display: flex !important; } }`}</style>
    </nav>
  );
}
