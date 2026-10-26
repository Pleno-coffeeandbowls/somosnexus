// NEXUS by Valeria Conte — Landing v9
// 100% bilingual: every visible string uses t.* from LanguageContext
// No hardcoded Spanish — all text switches cleanly between ES and EN

import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import MarkerCircle from "@/components/MarkerCircle";
import emailjs from "@emailjs/browser";
import { useLang } from "@/contexts/LanguageContext";

const EMAILJS_SERVICE_ID = "service_4x87v52";
const EMAILJS_TEMPLATE_ID = "template_5n0y0zj";
const EMAILJS_PUBLIC_KEY = "YlCRVZ5rYJyKBTiV1";

const VAL_PHOTO = "/media/val-portrait-opt_8bbd1a2b.webp";
const INAKI_PHOTO = "/media/inaki_team_af0df52d.webp";
const VERUZKA_PHOTO = "/media/veruzka_team_v2_4120f05d.webp";
const ALESSIA_PHOTO = "/media/alessia_team_9a15221f.webp";

const GRADIENT = "linear-gradient(to right, #3B82F6, #A855F7, #EC4899, #F97316, #FACC15)";

// ── Logos de marcas ──
const LOGOS = [
  { name: "NovaBucal", src: "/media/novabucal-opt_77ab4ab3.webp", invert: true },
  { name: "Maillard", src: "/media/maillard-opt_6f771ed2.webp", invert: true },
  { name: "Olivia", src: "/media/olivia-opt_3e174cff.webp", invert: false },
  { name: "Pikof", src: "/media/pikof-opt_b6cd1a01.webp", invert: true },
  { name: "Burger Shack", src: "/media/burgershack-opt_268a4dbd.webp", invert: false },
  { name: "Ananké", src: "/media/log_nuevo-opt_78e39b06.webp", invert: true },
  { name: "Pancho Villa", src: "/media/panchovilla-opt_ce52c5ee.webp", invert: false },
  { name: "L'OG", src: "/media/log_nuevo-opt_78e39b06.webp", invert: false, lightBg: true },
  { name: "Santalucía Impulsa", src: "/media/santalucia-opt_bd494072.webp", invert: false },
];

// ── Case screenshots & handles (non-translated data) ──
const CASE_ASSETS = {
  olivia:    { id: "olivia",    brand: "Olivia Essential Oil", igScreenshot: "/media/olivia_2db12954.webp",      igHandle: "@beolivia.ve",         color: "#3B82F6", ig: "https://www.instagram.com/beolivia.ve" },
  maillard:  { id: "maillard",  brand: "Maillard SB",          igScreenshot: "/media/maillard_ffbc59c7.webp",    igHandle: "@maillardsb",          color: "#A855F7", ig: "https://www.instagram.com/maillardsb" },
  pancho:    { id: "pancho",    brand: "Pancho Villa España",  igScreenshot: "/media/panchovilla_c9a5a4bc.webp", igHandle: "@panchovilla.es",      color: "#EC4899", ig: "https://www.instagram.com/panchovilla.es" },
  santalucia:{ id: "santalucia",brand: "Santalucía Impulsa",   igScreenshot: "/media/santalucia_91798ba6.webp",  igHandle: "@santaluciaimpulsa",   color: "#F97316", ig: "https://www.instagram.com/santaluciaimpulsa" },
};

type CaseKey = keyof typeof CASE_ASSETS;
const CASE_KEYS: CaseKey[] = ["olivia", "maillard", "pancho", "santalucia"];

// ── ServiceSelector ──
function ServiceSelector() {
  const { t } = useLang();
  const [selected, setSelected] = useState<string[]>([]);
  const [active, setActive] = useState<string>("01");

  // Build services array from t.* so it's always in the right language
  const services = [
    { num: "01", title: t.svc_01_title, desc: t.svc_01_desc, detail: t.svc_01_detail, tags: t.svc_01_tags, color: "#3B82F6", featured: true,  icon: "◎" },
    { num: "02", title: t.svc_02_title, desc: t.svc_02_desc, detail: t.svc_02_detail, tags: t.svc_02_tags, color: "#A855F7", featured: true,  icon: "◉" },
    { num: "03", title: t.svc_03_title, desc: t.svc_03_desc, detail: t.svc_03_detail, tags: t.svc_03_tags, color: "#EC4899", featured: false, icon: "◈" },
    { num: "04", title: t.svc_04_title, desc: t.svc_04_desc, detail: t.svc_04_detail, tags: t.svc_04_tags, color: "#F97316", featured: false, icon: "◇" },
    { num: "05", title: t.svc_05_title, desc: t.svc_05_desc, detail: t.svc_05_detail, tags: t.svc_05_tags, color: "#FACC15", featured: true,  icon: "◑" },
    { num: "06", title: t.svc_06_title, desc: t.svc_06_desc, detail: t.svc_06_detail, tags: t.svc_06_tags, color: "#3B82F6", featured: false, icon: "◐" },
    { num: "07", title: t.svc_07_title, desc: t.svc_07_desc, detail: t.svc_07_detail, tags: t.svc_07_tags, color: "#A855F7", featured: true,  icon: "◌" },
    { num: "08", title: t.svc_08_title, desc: t.svc_08_desc, detail: t.svc_08_detail, tags: t.svc_08_tags, color: "#EC4899", featured: false, icon: "◍" },
  ];

  // Synergies map from t.*
  const SYNERGIES: Record<string, string> = {
    "01+02": t.combo_01_02,
    "01+03": t.combo_01_03,
    "01+07": t.combo_01_07,
    "02+03": t.combo_02_03,
    "02+05": t.combo_02_05,
    "02+07": t.combo_02_07,
    "03+07": t.combo_03_07,
    "05+02": t.combo_05_02,
    "default": t.combo_default,
  };

  const getSynergy = (sel: string[]): string => {
    if (sel.length < 2) return "";
    const nums = [...sel].sort();
    const key = nums[0] + "+" + nums[1];
    return SYNERGIES[key] || SYNERGIES["default"];
  };

  const toggle = (num: string) => {
    setActive(num);
    setSelected(prev =>
      prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]
    );
  };

  const activeService = services.find(s => s.num === active)!;
  const selectedServices = services.filter(s => selected.includes(s.num));
  const synergy = getSynergy(selected);

  return (
    <div className="reveal">
      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 items-start">
        {/* Left: service list */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#999" }}>
            {t.services_select_label}
          </p>
          {services.map((s) => {
            const isSelected = selected.includes(s.num);
            const isActive = active === s.num;
            return (
              <button
                key={s.num}
                onClick={() => toggle(s.num)}
                aria-label={`${isSelected ? "Deselect" : "Select"} service: ${s.title}`}
                aria-pressed={isSelected}
                className="w-full text-left flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all duration-200 group"
                style={{
                  borderColor: isSelected ? s.color : isActive ? `${s.color}40` : "#f0f0f0",
                  background: isSelected ? `${s.color}08` : isActive ? `${s.color}04` : "#fff",
                  boxShadow: isSelected ? `0 0 0 1px ${s.color}30` : "none",
                }}
              >
                <div
                  className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center text-white text-xs font-black transition-all duration-200"
                  style={{
                    background: isSelected ? s.color : "#f0f0f0",
                    border: isSelected ? `2px solid ${s.color}` : "2px solid #ddd",
                  }}
                >
                  {isSelected && "✓"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span
                      className="font-black text-base leading-tight"
                      style={{ fontFamily: "var(--font-body)", color: isSelected || isActive ? s.color : "#111", fontWeight: 800 }}
                    >
                      {s.title}
                    </span>
                    {s.featured && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-bold flex-shrink-0"
                        style={{ background: `${s.color}15`, color: s.color }}
                      >
                        {t.services_featured}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#999] leading-tight">{s.tags.slice(0, 2).join(" · ")}</p>
                </div>
                <div className="text-lg flex-shrink-0" style={{ color: isActive ? s.color : "#ccc" }}>
                  {s.icon}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: detail panel */}
        <div className="lg:sticky lg:top-28">
          <div
            className="rounded-3xl p-8 mb-4 transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${activeService.color}08 0%, #fff 60%)`,
              border: `2px solid ${activeService.color}20`,
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black"
                style={{ background: activeService.color, color: "#fff" }}
              >
                {activeService.num}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3
                    className="text-xl font-black leading-tight"
                    style={{ fontFamily: "var(--font-display)", color: "#111" }}
                  >
                    {activeService.title}
                  </h3>
                  {activeService.featured && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-bold"
                      style={{ background: `${activeService.color}15`, color: activeService.color }}
                    >
                      ✦
                    </span>
                  )}
                </div>
              </div>
            </div>
            <p className="text-[#444] leading-relaxed mb-6">{activeService.detail}</p>
            <div className="flex flex-wrap gap-2">
              {activeService.tags.map((tag, j) => (
                <span
                  key={j}
                  className="text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{ background: `${activeService.color}12`, color: activeService.color }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Synergy panel (2+ selected) */}
          {selected.length >= 2 && (
            <div
              className="rounded-3xl p-6 transition-all duration-500"
              style={{ background: "linear-gradient(135deg, #0a0a0a, #1a0a2e)", border: "1px solid #ffffff15" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-white font-black text-sm" style={{ fontFamily: "var(--font-display)" }}>
                  {t.combo_how_together}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedServices.map(s => (
                  <span
                    key={s.num}
                    className="text-xs px-2.5 py-1 rounded-full font-bold"
                    style={{ background: `${s.color}25`, color: s.color }}
                  >
                    {s.title}
                  </span>
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{synergy}</p>
              <button
                onClick={() => {
                  const names = selectedServices.map(s => s.title).join(" + ");
                  const msg = `${t.combo_prefill_msg} ${names}.`;
                  window.dispatchEvent(new CustomEvent("nexus:prefill", { detail: { mensaje: msg } }));
                  document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
                }}
                aria-label="Request a proposal for the selected service combination"
                className="inline-flex items-center gap-2 mt-5 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border-0"
                style={{ background: "#fff", color: "#111" }}
              >
                {t.combo_want_this}
              </button>
            </div>
          )}

          {/* CTA when 1 selected */}
          {selected.length === 1 && (
            <div
              className="rounded-3xl p-6"
              style={{ background: "#f8f7ff", border: "1px solid #e8e5ff" }}
            >
              <p className="text-[#555] text-sm mb-3">{t.services_one_selected}</p>
              <a href="#contacto" className="btn-nexus inline-flex no-underline text-sm py-3 px-6">
                {t.services_start_with} {selectedServices[0]?.title} →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── BrandingWebService (Foundational service block) ──
function BrandingWebService() {
  const { t } = useLang();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-10 reveal">
      <div
        className="rounded-3xl border-2 overflow-hidden transition-all duration-500"
        style={{ borderColor: "#3B82F6", background: "linear-gradient(135deg, #f0f4ff 0%, #fff 60%, #fdf0ff 100%)" }}
      >
        <div className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
                style={{ background: "#3B82F620", color: "#3B82F6" }}>
                {t.branding_badge}
              </div>
              <h3
                className="text-2xl md:text-3xl font-black leading-tight mb-3"
                style={{ fontFamily: "var(--font-display)", color: "#111" }}
              >
                {t.branding_title}
              </h3>
              <p className="text-base font-semibold mb-4" style={{ color: "#3B82F6" }}>
                {t.branding_subtitle}
              </p>
              <p className="text-[#555] leading-relaxed max-w-2xl">
                {t.branding_body}
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  background: expanded ? "#111" : "#3B82F6",
                  color: "#fff",
                }}
              >
                {expanded ? t.branding_btn_close : t.branding_btn_open}
              </button>
            </div>
          </div>
        </div>

        {expanded && (
          <div
            className="border-t px-8 md:px-10 py-10"
            style={{ borderColor: "#e5e7eb", background: "#fff" }}
          >
            <div className="max-w-3xl">
              <h4
                className="text-2xl font-black mb-3"
                style={{ fontFamily: "var(--font-display)", color: "#111" }}
              >
                {t.branding_expanded_h4}
              </h4>
              <p className="text-[#555] leading-relaxed mb-4">
                {t.branding_expanded_p1}
              </p>
              <p className="text-[#555] leading-relaxed mb-8">
                {t.branding_expanded_p2}
              </p>

              <h5
                className="text-lg font-black mb-5"
                style={{ fontFamily: "var(--font-display)", color: "#111" }}
              >
                {t.branding_expanded_h5}
              </h5>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {t.branding_items.map((item, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border"
                    style={{ borderColor: `${item.color}25`, background: `${item.color}06` }}
                  >
                    <div className="text-xl mb-2" style={{ color: item.color }}>{item.icon}</div>
                    <h6 className="font-black text-sm mb-2" style={{ fontFamily: "var(--font-display)", color: "#111" }}>
                      {item.title}
                    </h6>
                    <p className="text-[#666] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <h5
                className="text-lg font-black mb-5"
                style={{ fontFamily: "var(--font-display)", color: "#111" }}
              >
                {t.branding_process_h5}
              </h5>
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                {t.branding_process_steps.map((step, i) => (
                  <div key={i} className="flex-1 flex gap-4 items-start">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                      style={{ background: step.color, color: "#fff" }}
                    >
                      {step.num}
                    </div>
                    <div>
                      <div className="font-black text-sm mb-1" style={{ fontFamily: "var(--font-display)", color: "#111" }}>{step.title}</div>
                      <p className="text-[#666] text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="#contacto"
                onClick={() => setExpanded(false)}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg no-underline"
                style={{ background: "#111", color: "#fff" }}
              >
                {t.branding_cta}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Ticker de logos ──
function Ticker() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <div className="overflow-hidden py-6 border-y border-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
      <div className="flex items-center gap-16 whitespace-nowrap" style={{ animation: "ticker 32s linear infinite", width: "max-content" }}>
        {doubled.map((logo, i) => (
          <div key={i} className="flex items-center justify-center flex-shrink-0" style={{ width: 130, height: 52 }}>
            {logo.invert ? (
              <img
                src={logo.src}
                alt={logo.name}
                style={{ maxHeight: 44, maxWidth: 120, width: "auto", height: "auto", objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.65 }}
              />
            ) : (logo as any).lightBg ? (
              <div style={{ background: "rgba(255,255,255,0.92)", borderRadius: 8, padding: "4px 10px", display: "flex", alignItems: "center", justifyContent: "center", height: 44, maxWidth: 120 }}>
                <img src={logo.src} alt={logo.name} style={{ maxHeight: 36, maxWidth: 110, width: "auto", height: "auto", objectFit: "contain" }} />
              </div>
            ) : (
              <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: "4px 8px", display: "flex", alignItems: "center", justifyContent: "center", height: 44, maxWidth: 120 }}>
                <img src={logo.src} alt={logo.name} style={{ maxHeight: 36, maxWidth: 110, width: "auto", height: "auto", objectFit: "contain", opacity: 0.75 }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <style>{`@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

// ── Case Studies ──
function CaseStudies() {
  const { t } = useLang();
  const [activeIdx, setActiveIdx] = useState(0);
  const activeKey = CASE_KEYS[activeIdx];
  const asset = CASE_ASSETS[activeKey];
  const caseData = t[`case_${activeKey}` as keyof typeof t] as ReturnType<typeof Object.values>[0] as any;

  return (
    <section id="casos" className="py-28" style={{ background: "#f8f7ff" }}>
      <div className="container max-w-6xl">
        <div className="reveal mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#A855F7" }}>{t.cases_eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            {t.cases_h2} <MarkerCircle color="#A855F7">{t.cases_h2_marker}</MarkerCircle>
          </h2>
          <p className="text-[#666] mt-4 text-lg max-w-2xl">{t.cases_sub}</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {CASE_KEYS.map((key, i) => {
            const a = CASE_ASSETS[key];
            return (
              <button
                key={key}
                onClick={() => setActiveIdx(i)}
                aria-label={`${t.cases_tab_aria} ${a.brand}`}
                aria-pressed={activeIdx === i}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: activeIdx === i ? a.color : "#fff",
                  color: activeIdx === i ? "white" : "#555",
                  border: `2px solid ${activeIdx === i ? a.color : "#e5e7eb"}`,
                  boxShadow: activeIdx === i ? `0 4px 14px ${a.color}40` : "none",
                }}
              >
                <span>{a.brand}</span>
              </button>
            );
          })}
        </div>

        {/* Layout: 3 columns desktop */}
        <div key={activeKey} className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-start">

          {/* Left: info + actions */}
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{ background: `${asset.color}18`, color: asset.color }}>
                {caseData.tag}
              </div>
              <h3 className="text-xl md:text-2xl font-black leading-tight mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {caseData.headline}
              </h3>
              <p className="text-xs text-[#aaa] font-medium tracking-wide">{caseData.sector}</p>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#999] mb-3">{t.cases_actions}</p>
              <ul className="space-y-2">
                {caseData.actions.map((a: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#444]">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: asset.color }} />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl border-l-4" style={{ borderColor: asset.color, background: `${asset.color}08` }}>
              <p className="text-sm text-[#444] leading-relaxed">{caseData.result}</p>
            </div>

            <a href={asset.ig} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold no-underline transition-opacity hover:opacity-70"
              style={{ color: asset.color }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              {t.cases_view_ig}
            </a>
          </div>

          {/* Centre: phone mockup */}
          <div className="hidden md:flex flex-col items-center justify-start">
            <div
              className="relative flex-shrink-0"
              style={{ width: 220, background: "#111", borderRadius: 32, padding: "10px 8px", boxShadow: "0 24px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08)" }}
            >
              <div style={{ width: 60, height: 6, background: "#333", borderRadius: 4, margin: "0 auto 8px" }} />
              <div style={{ borderRadius: 22, overflow: "hidden", background: "#000" }}>
                <img
                  src={asset.igScreenshot}
                  alt={`${t.cases_img_alt} ${asset.brand}`}
                  width={300}
                  height={650}
                  loading="lazy"
                  style={{ width: "100%", display: "block", objectFit: "cover" }}
                />
              </div>
              <div className="mt-2 text-center">
                <span className="text-white/50 text-xs font-medium">{asset.igHandle}</span>
              </div>
            </div>
          </div>

          {/* Right: KPIs */}
          <div>
            <div className="rounded-3xl overflow-hidden" style={{ background: "#fff", border: "1px solid #ede9fe" }}>
              <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: asset.color }}>{t.cases_metrics}</p>
              </div>
              <div className="divide-y divide-gray-100">
                {caseData.kpis.map((kpi: { label: string; value: string }, i: number) => (
                  <div key={i} className="flex items-center justify-between px-6 py-5">
                    <span className="text-sm text-[#666] max-w-[130px] leading-snug">{kpi.label}</span>
                    <span className="text-2xl font-black flex-shrink-0 ml-4" style={{ fontFamily: "var(--font-display)", color: asset.color }}>
                      {kpi.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile phone mockup */}
            <div className="md:hidden mt-6 flex justify-center">
              <div
                className="relative flex-shrink-0"
                style={{ width: 160, background: "#111", borderRadius: 24, padding: "8px 6px", boxShadow: "0 16px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.08)" }}
              >
                <div style={{ width: 44, height: 5, background: "#333", borderRadius: 4, margin: "0 auto 6px" }} />
                <div style={{ borderRadius: 16, overflow: "hidden", background: "#000" }}>
                  <img
                    src={asset.igScreenshot}
                    alt={`${t.cases_img_alt} ${asset.brand}`}
                    width={148}
                    height={322}
                    loading="lazy"
                    style={{ width: "100%", display: "block", objectFit: "cover" }}
                  />
                </div>
                <div className="mt-1.5 text-center">
                  <span className="text-white/50" style={{ fontSize: 9 }}>{asset.igHandle}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact Form ──
function ContactForm() {
  const { t } = useLang();
  const [form, setForm] = useState({ nombre: "", email: "", negocio: "", mensaje: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const { mensaje } = (e as CustomEvent).detail;
      setForm(prev => ({ ...prev, mensaje }));
    };
    window.addEventListener("nexus:prefill", handler);
    return () => window.removeEventListener("nexus:prefill", handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.nombre,
          from_email: form.email,
          negocio: form.negocio,
          mensaje: form.mensaje,
          to_email: "vcontemkt@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">⚡</div>
        <h3 className="text-2xl font-black mb-3 text-white" style={{ fontFamily: "var(--font-display)" }}>
          {t.contact_success_h3}
        </h3>
        <p className="text-white/50 max-w-md mx-auto">{t.contact_success_p}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-2">{t.contact_name_label}</label>
          <input
            type="text" name="nombre" required value={form.nombre} onChange={handleChange}
            placeholder={t.contact_name_placeholder}
            className="w-full px-4 py-3.5 rounded-xl text-white placeholder-white/25 text-sm outline-none transition-all"
            style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)" }}
            onFocus={e => (e.target.style.borderColor = "#A855F7")}
            onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-2">{t.contact_email_label}</label>
          <input
            type="email" name="email" required value={form.email} onChange={handleChange}
            placeholder={t.contact_email_placeholder}
            className="w-full px-4 py-3.5 rounded-xl text-white placeholder-white/25 text-sm outline-none transition-all"
            style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)" }}
            onFocus={e => (e.target.style.borderColor = "#A855F7")}
            onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-2">{t.contact_sector_label}</label>
        <select
          name="negocio" required value={form.negocio} onChange={handleChange}
          className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all appearance-none"
          style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)", color: form.negocio ? "white" : "rgba(255,255,255,0.25)" }}
          onFocus={e => (e.target.style.borderColor = "#A855F7")}
          onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
        >
          <option value="" disabled style={{ background: "#111", color: "#666" }}>{t.contact_sector_placeholder}</option>
          {t.contact_sectors.map(s => (
            <option key={s} value={s} style={{ background: "#111", color: "white" }}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-2">
          {t.contact_msg_label}
        </label>
        <textarea
          name="mensaje" required value={form.mensaje} onChange={handleChange}
          rows={4}
          placeholder={t.contact_msg_placeholder}
          className="w-full px-4 py-3.5 rounded-xl text-white placeholder-white/25 text-sm outline-none transition-all resize-none"
          style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)" }}
          onFocus={e => (e.target.style.borderColor = "#A855F7")}
          onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
        />
      </div>

      <button type="submit" disabled={sending} className="btn-nexus w-full justify-center text-base py-4 disabled:opacity-60">
        {sending ? t.contact_sending : t.contact_btn}
      </button>
      <p className="text-xs text-center text-white/25">{t.contact_disclaimer}</p>
    </form>
  );
}

// ── Main Home ──
export default function Home() {
  useReveal();
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navTextColor = scrolled ? "#111" : "rgba(255,255,255,0.85)";
  const navHoverColor = scrolled ? "#111" : "white";

  // Team array — Valeria, Alessia, Iñaki, Veruzka
  const TEAM = [
    { name: "Valeria Conte",   role: t.team_role_val,     photo: VAL_PHOTO,     linkedin: "https://www.linkedin.com/in/valeriacontesousa" },
    { name: "Alessia Conte",   role: t.team_role_alessia, photo: ALESSIA_PHOTO, linkedin: "https://www.linkedin.com/in/alessia-conte-2a9ab6164/" },
    { name: "Iñaki Moretti",   role: t.team_role_inaki,   photo: INAKI_PHOTO,   linkedin: "https://www.linkedin.com/in/morettinaki/" },
    { name: "Veruzka Ferreira",role: t.team_role_veruzka, photo: VERUZKA_PHOTO, linkedin: null },
  ];

  return (
    <div className="min-h-screen bg-white text-[#111]" style={{ fontFamily: "var(--font-body)" }}>

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "none",
        }}
      >
        <div className="container flex items-center justify-between py-5">
          {/* Logo + language switcher side by side */}
          <div className="flex items-center gap-3">
            <a href="#" className="no-underline">
              <span className="text-2xl font-black tracking-tight" style={{ fontFamily: "var(--font-display)", background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                NEXUS
              </span>
            </a>
            {/* Language switcher — always visible, next to logo */}
            <div className="flex items-center gap-0.5 rounded-full p-0.5" style={{ background: scrolled ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)", border: `1px solid ${scrolled ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.12)"}` }}>
              {(["es", "en"] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-label={l === "es" ? "Cambiar a español" : "Switch to English"}
                  className="text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer border-0"
                  style={{
                    background: lang === l ? (scrolled ? "#111" : "rgba(255,255,255,0.9)") : "transparent",
                    color: lang === l ? (scrolled ? "#fff" : "#111") : navTextColor,
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {[[t.nav_services, "#servicios"], [t.nav_how, "#proceso"], [t.nav_cases, "#casos"], [t.nav_about, "#nosotros"]].map(([label, href]) => (
              <a key={label} href={href}
                className="text-sm font-medium transition-colors no-underline"
                style={{ color: navTextColor }}
                onMouseEnter={e => (e.currentTarget.style.color = navHoverColor)}
                onMouseLeave={e => (e.currentTarget.style.color = navTextColor)}
              >{label}</a>
            ))}
          </div>
          <a href="#contacto" className="hidden md:inline-flex btn-nexus text-sm py-2.5 px-5 no-underline">
            {t.nav_cta}
          </a>
          <button
            className="md:hidden p-2 transition-colors"
            style={{ color: navTextColor }}
            aria-label={menuOpen ? (lang === "en" ? "Close menu" : "Cerrar menú") : (lang === "en" ? "Open menu" : "Abrir menú")}
            onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-5 h-0.5 mb-1.5 transition-all" style={{ background: navTextColor }} />
            <div className="w-5 h-0.5 mb-1.5 transition-all" style={{ background: navTextColor }} />
            <div className="w-5 h-0.5 transition-all" style={{ background: navTextColor }} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4" style={{ background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(10,10,10,0.98)" }}>
            {[[t.nav_services, "#servicios"], [t.nav_how, "#proceso"], [t.nav_cases, "#casos"], [t.nav_about, "#nosotros"]].map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}
                className="text-sm font-medium no-underline"
                style={{ color: scrolled ? "#111" : "rgba(255,255,255,0.7)" }}>{label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col justify-end pb-0"
        style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #0d0a1a 40%, #120a0a 100%)" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #3B82F6, transparent)" }} />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #A855F7, transparent)" }} />
          <div className="absolute bottom-1/3 left-1/3 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #EC4899, transparent)" }} />
        </div>

        <div className="container relative z-10 pt-36 pb-20">
          <div className="reveal max-w-5xl">
            <h1 className="font-black mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 8vw, 7.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              <span className="text-white block" style={{ lineHeight: 1.0 }}>{t.hero_line1}</span>
              <span className="text-white block" style={{ lineHeight: 1.0 }}>{t.hero_line2}</span>
              <span className="block" style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1.15, paddingBottom: "0.1em" }}>
                {t.hero_line3}
              </span>
            </h1>
            <p className="text-white/55 text-xl md:text-2xl max-w-2xl leading-relaxed mb-10" style={{ fontFamily: "var(--font-body)" }}>
              {t.hero_sub}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#casos" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-base font-medium no-underline py-4">
                {t.hero_scroll}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section id="servicios" className="py-28 bg-white">
        <div className="container max-w-6xl">
          <div className="reveal mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#3B82F6" }}>{t.services_eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              {lang === "en"
                ? <>Stop posting without a system<br />and start <MarkerCircle color="#3B82F6">{t.services_h2_marker}</MarkerCircle></>
                : <>Deja de publicar sin sistema<br />y empieza a <MarkerCircle color="#3B82F6">{t.services_h2_marker}</MarkerCircle></>
              }
            </h2>
            <p className="text-[#666] mt-4 text-lg max-w-2xl">{t.services_body}</p>
          </div>

          <ServiceSelector />

          <div className="reveal mt-12 p-8 rounded-3xl text-center" style={{ background: "linear-gradient(135deg, #f8f7ff, #fff0f8)" }}>
            <p className="text-lg font-medium text-[#333] max-w-2xl mx-auto mb-6">
              {t.services_bespoke_p}
            </p>
            <a href="#contacto" className="btn-nexus inline-flex no-underline">
              {t.nav_cta}
            </a>
          </div>
        </div>
      </section>

      {/* ── CASOS DE ESTUDIO ── */}
      <CaseStudies />

      {/* ── NOSOTROS / EQUIPO ── */}
      <section id="nosotros" className="py-28" style={{ background: "#f8f7ff" }}>
        <div className="container max-w-6xl">
          <div className="reveal text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#A855F7" }}>{t.about_eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              {t.about_h2_a}<br />
              <MarkerCircle color="#3B82F6" type="underline">{t.about_h2_b}</MarkerCircle><br />
              {t.about_h2_c}
            </h2>
            <div className="mt-6 max-w-2xl mx-auto space-y-4 text-[#444] leading-relaxed">
              <p>{t.about_p1}</p>
              <p>{t.about_p2}</p>
            </div>
          </div>

          {/* Team grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 reveal">
            {TEAM.map((member, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden" style={{ aspectRatio: "3/4" }}>
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={`${member.name}, ${member.role} ${t.team_img_alt}`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: i === 2
                        ? "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)"
                        : "linear-gradient(135deg, #F97316 0%, #EF4444 100%)",
                    }}
                  >
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.75) 0%, transparent 55%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-white font-black text-sm leading-tight" style={{ fontFamily: "var(--font-display)" }}>{member.name}</div>
                  <div className="text-white/60 text-xs mt-0.5 mb-2">{member.role}</div>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-all hover:scale-105"
                      style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* NE·US·X block */}
          <div className="reveal mt-14 p-6 rounded-2xl border border-purple-100" style={{ background: "rgba(168,85,247,0.04)" }}>
            <p className="text-xs font-semibold tracking-widest uppercase text-purple-400 mb-4 text-center">{t.nexus_name_eyebrow}</p>
            <div className="flex gap-6 flex-wrap justify-center">
              {[
                { l: "NE", d: t.nexus_ne_desc, c: "#3B82F6" },
                { l: "US", d: t.nexus_us_desc, c: "#EC4899" },
                { l: "X",  d: t.nexus_x_desc,  c: "#F97316" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 max-w-xs">
                  <span className="text-2xl font-black flex-shrink-0" style={{ fontFamily: "var(--font-display)", color: item.c }}>{item.l}</span>
                  <p className="text-xs text-[#666] leading-relaxed pt-1">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EL SISTEMA NEXUS ── */}
      <section id="sistema" className="py-28" style={{ background: "#0a0a0a" }}>
        <div className="container max-w-6xl">
          <div className="reveal text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#F97316" }}>{t.about_core_eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
              {t.sistema_h2_a}
              <br />
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {t.sistema_h2_b}
              </span>
            </h2>
            <p className="text-white/45 text-lg max-w-2xl mx-auto mt-4">
              {t.about_stat_label}
            </p>
          </div>

          {/* Core + Bonuses */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Core */}
            <div className="reveal p-8 rounded-3xl border border-white/10" style={{ background: "rgba(255,255,255,0.04)" }}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "#3B82F6" }}>{t.sistema_core_label}</p>
              <div className="space-y-4">
                {[
                  {
                    svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 7h.01M11 7h6M7 11h.01M11 11h6"/></svg>,
                    t: t.about_core_items[0].t, d: t.about_core_items[0].d
                  },
                  {
                    svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>,
                    t: t.about_core_items[1].t, d: t.about_core_items[1].d
                  },
                  {
                    svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                    t: t.about_core_items[2].t, d: t.about_core_items[2].d
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(59,130,246,0.12)" }}>{item.svg}</div>
                    <div>
                      <p className="text-white font-bold text-sm mb-1">{item.t}</p>
                      <p className="text-white/45 text-xs leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bonuses */}
            <div className="space-y-4">
              {[
                {
                  color: "#A855F7",
                  svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1" fill="#A855F7"/></svg>,
                  label: t.about_bonuses[0].label, desc: t.about_bonuses[0].desc
                },
                {
                  color: "#EC4899",
                  svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
                  label: t.about_bonuses[1].label, desc: t.about_bonuses[1].desc
                },
                {
                  color: "#F97316",
                  svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
                  label: t.about_bonuses[2].label, desc: t.about_bonuses[2].desc
                },
              ].map((b, i) => (
                <div key={i} className="reveal p-5 rounded-2xl border flex gap-4 items-start" style={{ background: `${b.color}08`, borderColor: `${b.color}25` }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${b.color}15` }}>{b.svg}</div>
                  <div>
                    <p className="font-bold text-sm mb-1" style={{ color: b.color }}>{b.label}</p>
                    <p className="text-white/45 text-xs leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="reveal p-8 rounded-3xl text-center" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1))", border: "1px solid rgba(168,85,247,0.25)" }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#A855F7" }}>{t.about_cta_eyebrow}</p>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
              {t.about_cta_h3}
            </h3>
            <p className="text-white/50 text-base max-w-xl mx-auto mb-6">
              {t.about_cta_p}
            </p>
            <a href="#contacto" className="btn-nexus inline-flex no-underline">
              {t.about_cta_btn}
            </a>
          </div>
        </div>
      </section>

      {/* ── PROCESO ── */}
      <section id="proceso" className="py-28" style={{ background: "#0a0a0a" }}>
        <div className="container max-w-5xl">
          <div className="reveal text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#F97316" }}>{t.process_eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
              {t.process_h2_a}<br />
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {t.process_h2_c}
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.process_steps.map((step, i) => (
              <div key={i} className="reveal p-7 rounded-2xl border border-white/8 hover:border-white/15 transition-all" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="text-xs font-bold tracking-widest mb-4" style={{ color: ["#3B82F6", "#A855F7", "#EC4899"][i] }}>{step.num}</div>
                <h3 className="text-xl font-black mb-3 text-white" style={{ fontFamily: "var(--font-display)" }}>{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" className="py-28" style={{ background: "#0a0a0a" }}>
        <div className="container max-w-3xl">
          <div className="reveal text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#A855F7" }}>{t.contact_eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight text-white mb-5" style={{ fontFamily: "var(--font-display)" }}>
              {t.contact_h2_a}<br />
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {t.contact_h2_b}
              </span>
            </h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">{t.contact_sub}</p>
          </div>
          <div className="reveal">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 border-t border-white/8" style={{ background: "#0a0a0a" }}>
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xl font-black" style={{ fontFamily: "var(--font-display)", background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            NEXUS
          </span>
          <p className="text-xs text-white/25 text-center">{t.footer_rights}</p>
        </div>
      </footer>

    </div>
  );
}
