/**
 * CookieBanner — NEXUS
 * RGPD compliant: solo activa GA4 si el usuario acepta.
 * Guarda la preferencia en localStorage con clave "nexus_cookie_consent".
 * Valores: "accepted" | "rejected"
 * Bilingual: uses useLang() to switch between ES and EN.
 */

import { useEffect, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

type ConsentState = "accepted" | "rejected" | null;

export default function CookieBanner() {
  const { t } = useLang();
  const [consent, setConsent] = useState<ConsentState>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("nexus_cookie_consent") as ConsentState | null;
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
    setConsent(stored);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("nexus_cookie_consent", "accepted");
    setConsent("accepted");
    setVisible(false);
    if (typeof window.loadGA4 === "function") {
      window.loadGA4();
    }
  };

  const handleReject = () => {
    localStorage.setItem("nexus_cookie_consent", "rejected");
    setConsent("rejected");
    setVisible(false);
  };

  if (!visible || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label={t.cookie_aria}
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="mx-auto max-w-3xl rounded-2xl border border-white/10 shadow-2xl"
        style={{
          background: "rgba(10, 10, 10, 0.96)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          pointerEvents: "all",
        }}
      >
        <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:gap-6 md:p-6">
          {/* Icon */}
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg"
            style={{ background: "rgba(168,85,247,0.15)", color: "#A855F7" }}
          >
            🍪
          </div>

          {/* Text */}
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">
              {t.cookie_title}
            </p>
            <p className="mt-1 text-xs leading-relaxed" style={{ color: "#999" }}>
              {t.cookie_body}{" "}
              <a
                href="/politica-cookies"
                className="underline underline-offset-2 hover:text-white transition-colors"
                style={{ color: "#A855F7" }}
              >
                {t.cookie_policy}
              </a>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex shrink-0 gap-3">
            <button
              onClick={handleReject}
              className="rounded-lg border px-4 py-2 text-xs font-medium transition-colors hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,0.15)", color: "#999" }}
            >
              {t.cookie_reject}
            </button>
            <button
              onClick={handleAccept}
              className="rounded-lg px-5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #A855F7 0%, #3B82F6 100%)",
              }}
            >
              {t.cookie_accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Extend window for TypeScript
declare global {
  interface Window {
    loadGA4?: () => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    _ga4Loaded?: boolean;
    GA_MEASUREMENT_ID?: string;
  }
}
