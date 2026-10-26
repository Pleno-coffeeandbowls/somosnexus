// NEXUS — Política de Cookies
// Diseño: minimalista, limpio, coherente con la identidad NEXUS
// Cumple RGPD España / LSSI-CE

import { useEffect } from "react";
import { Link } from "wouter";

export default function PoliticaCookies() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ── NAV mínimo ── */}
      <header className="border-b border-[#f0f0f0] py-5 px-6 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <Link href="/" className="no-underline">
          <span
            className="font-black text-xl tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              background: "linear-gradient(135deg, #3B82F6, #A855F7, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            NEXUS
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm text-[#666] hover:text-[#111] transition-colors no-underline flex items-center gap-1"
        >
          ← Volver al inicio
        </Link>
      </header>

      {/* ── CONTENIDO ── */}
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Cabecera */}
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#A855F7" }}>
            Legal
          </p>
          <h1
            className="text-4xl md:text-5xl font-black leading-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Política de Cookies
          </h1>
          <p className="text-[#666] text-lg">
            Última actualización: mayo de 2026
          </p>
        </div>

        {/* Contenido legal */}
        <div className="prose prose-lg max-w-none text-[#333] space-y-10">

          <section>
            <h2 className="text-2xl font-black mb-3" style={{ fontFamily: "var(--font-display)" }}>
              1. ¿Qué son las cookies?
            </h2>
            <p className="text-[#555] leading-relaxed">
              Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo (ordenador, tablet o móvil) cuando los visitas. Sirven para que el sitio recuerde información sobre tu visita, como tu idioma preferido y otras opciones, lo que puede facilitar tu próxima visita y hacer que el sitio te resulte más útil.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-3" style={{ fontFamily: "var(--font-display)" }}>
              2. ¿Quién es el responsable del uso de cookies?
            </h2>
            <p className="text-[#555] leading-relaxed">
              El responsable del tratamiento de los datos recogidos a través de las cookies de este sitio web es <strong>NEXUS Marketing</strong>, con domicilio en Madrid, España, y correo electrónico de contacto: <a href="mailto:vcontemkt@gmail.com" className="text-[#3B82F6] no-underline hover:underline">vcontemkt@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-3" style={{ fontFamily: "var(--font-display)" }}>
              3. Tipos de cookies que utilizamos
            </h2>

            {/* Tabla de cookies */}
            <div className="overflow-x-auto rounded-2xl border border-[#f0f0f0] mt-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f8f7ff] border-b border-[#f0f0f0]">
                    <th className="text-left px-4 py-3 font-semibold text-[#111]">Cookie</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#111]">Proveedor</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#111]">Finalidad</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#111]">Duración</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#111]">Tipo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f0f0]">
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-[#555]">nexus_cookie_consent</td>
                    <td className="px-4 py-3 text-[#555]">somosnexus.es</td>
                    <td className="px-4 py-3 text-[#555]">Guarda tu preferencia de cookies para no volver a mostrar el banner</td>
                    <td className="px-4 py-3 text-[#555]">1 año</td>
                    <td className="px-4 py-3"><span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">Esencial</span></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-[#555]">_ga</td>
                    <td className="px-4 py-3 text-[#555]">Google Analytics</td>
                    <td className="px-4 py-3 text-[#555]">Distingue usuarios únicos para medir el tráfico del sitio web</td>
                    <td className="px-4 py-3 text-[#555]">2 años</td>
                    <td className="px-4 py-3"><span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">Analítica</span></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-[#555]">_ga_*</td>
                    <td className="px-4 py-3 text-[#555]">Google Analytics</td>
                    <td className="px-4 py-3 text-[#555]">Mantiene el estado de la sesión para Google Analytics 4</td>
                    <td className="px-4 py-3 text-[#555]">2 años</td>
                    <td className="px-4 py-3"><span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">Analítica</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex gap-3 p-4 rounded-xl bg-green-50 border border-green-100">
                <span className="text-green-600 font-bold text-sm mt-0.5">✓</span>
                <div>
                  <p className="font-semibold text-[#111] text-sm mb-1">Cookies esenciales</p>
                  <p className="text-[#555] text-sm leading-relaxed">Son necesarias para el funcionamiento básico del sitio. No requieren tu consentimiento y no pueden desactivarse. Solo almacenan tu preferencia sobre cookies.</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
                <span className="text-blue-600 font-bold text-sm mt-0.5">📊</span>
                <div>
                  <p className="font-semibold text-[#111] text-sm mb-1">Cookies analíticas (Google Analytics 4)</p>
                  <p className="text-[#555] text-sm leading-relaxed">Nos permiten entender cómo los visitantes interactúan con somosnexus.es: qué páginas visitan, cuánto tiempo permanecen y desde dónde llegan. Esta información es anónima y se usa exclusivamente para mejorar el sitio. Solo se activan si aceptas las cookies.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-3" style={{ fontFamily: "var(--font-display)" }}>
              4. Base legal del tratamiento
            </h2>
            <p className="text-[#555] leading-relaxed">
              El uso de cookies analíticas se basa en tu <strong>consentimiento expreso</strong>, de acuerdo con el artículo 6.1.a del Reglamento General de Protección de Datos (RGPD) y la Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI-CE). Las cookies esenciales se basan en el interés legítimo del responsable para garantizar el funcionamiento técnico del sitio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-3" style={{ fontFamily: "var(--font-display)" }}>
              5. Cómo gestionar o retirar tu consentimiento
            </h2>
            <p className="text-[#555] leading-relaxed mb-4">
              Puedes retirar tu consentimiento en cualquier momento sin que ello afecte a la licitud del tratamiento previo. Para ello, tienes varias opciones:
            </p>
            <ul className="space-y-2 text-[#555]">
              <li className="flex gap-2">
                <span className="text-[#A855F7] font-bold">→</span>
                <span><strong>Eliminar las cookies del navegador:</strong> puedes borrar todas las cookies almacenadas en tu dispositivo desde la configuración de tu navegador (Chrome, Firefox, Safari, Edge).</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#A855F7] font-bold">→</span>
                <span><strong>Configurar tu navegador:</strong> puedes configurarlo para que bloquee o te avise sobre las cookies de terceros.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#A855F7] font-bold">→</span>
                <span><strong>Opt-out de Google Analytics:</strong> puedes instalar el complemento de inhabilitación de Google Analytics disponible en <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:underline">tools.google.com/dlpage/gaoptout</a>.</span>
              </li>
            </ul>
            <p className="text-[#555] leading-relaxed mt-4">
              Ten en cuenta que deshabilitar ciertas cookies puede afectar a la funcionalidad del sitio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-3" style={{ fontFamily: "var(--font-display)" }}>
              6. Transferencias internacionales de datos
            </h2>
            <p className="text-[#555] leading-relaxed">
              Google Analytics puede transferir datos a servidores ubicados en Estados Unidos. Google LLC está adherida al marco EU-US Data Privacy Framework, lo que garantiza un nivel adecuado de protección conforme al RGPD. Puedes consultar la política de privacidad de Google en <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:underline">policies.google.com/privacy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-3" style={{ fontFamily: "var(--font-display)" }}>
              7. Actualizaciones de esta política
            </h2>
            <p className="text-[#555] leading-relaxed">
              NEXUS Marketing puede actualizar esta Política de Cookies cuando sea necesario, por ejemplo, al añadir nuevos servicios o herramientas que utilicen cookies. Te recomendamos revisar esta página periódicamente. La fecha de la última actualización siempre aparece al inicio del documento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-3" style={{ fontFamily: "var(--font-display)" }}>
              8. Contacto
            </h2>
            <p className="text-[#555] leading-relaxed">
              Si tienes cualquier pregunta sobre el uso de cookies en somosnexus.es, puedes contactarnos en <a href="mailto:vcontemkt@gmail.com" className="text-[#3B82F6] no-underline hover:underline">vcontemkt@gmail.com</a>.
            </p>
          </section>

        </div>

        {/* CTA volver */}
        <div className="mt-16 pt-10 border-t border-[#f0f0f0] flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <p className="text-[#888] text-sm">© 2025 NEXUS. Todos los derechos reservados.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold no-underline px-5 py-2.5 rounded-full text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #3B82F6, #A855F7)" }}
          >
            ← Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}
