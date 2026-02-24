import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "싰 로컈 코리아 — Jjin Local Korea | Real Korean Local Spots",
  description: "Discover where real Koreans actually go — authentic local restaurants, K-beauty spots, and travel experiences, not tourist traps. AI-powered trip planner for foreigners visiting Korea.",
  keywords: "Korea travel, local restaurants, Korean food, K-beauty, authentic Korea, hidden gems, Seoul, Busan, Jeju",
  openGraph: {
    title: "싰 로컈 코리아 — Real Korea, Not Tourist Traps",
    description: "Korean locals' real picks — restaurants, beauty, sightseeing & AI trip planner",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <I18nProvider>
          <Navbar />
          <main>{children}</main>
          <footer style={{
            borderTop: "1px solid var(--border)",
            padding: "32px 24px",
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "0.9rem",
            background: "var(--bg-secondary)",
            marginTop: "80px",
          }}>
            <p style={{ color: "var(--text-secondary)", marginBottom: "8px" }}>
              🇰🇷 <strong className="gradient-text">싰 로컈 코리아</strong> — Jjin Local Korea
            </p>
            <p>Authentic Korean experiences for curious travelers · 현지인이 알려주는 진짜 한국</p>
          </footer>
        </I18nProvider>
      </body>
    </html>
  );
}
