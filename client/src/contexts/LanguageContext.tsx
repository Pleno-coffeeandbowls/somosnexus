// LanguageContext.tsx
// Bilingual copy: Spanish (default) + British English (native, not translated)
// British English voice: direct, confident, no fluff — "bespoke", "brilliant", "whilst", "fortnight"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "es" | "en";

interface CaseData {
  sector: string;
  tag: string;
  headline: string;
  challenge: string;
  actions: string[];
  kpis: { label: string; value: string }[];
  result: string;
}

interface Translations {
  // NAV
  nav_services: string;
  nav_how: string;
  nav_cases: string;
  nav_about: string;
  nav_cta: string;

  // HERO
  hero_line1: string;
  hero_line2: string;
  hero_line3: string;
  hero_sub: string;
  hero_scroll: string;

  // SERVICES SECTION
  services_eyebrow: string;
  services_h2_marker: string;
  services_body: string;
  services_cta: string;
  services_select_label: string;
  services_featured: string;
  services_one_selected: string;
  services_start_with: string;
  services_bespoke_p: string;

  // SERVICE NAMES + DESCRIPTIONS (for ServiceSelector)
  svc_01_title: string;
  svc_01_desc: string;
  svc_01_detail: string;
  svc_01_tags: string[];

  svc_02_title: string;
  svc_02_desc: string;
  svc_02_detail: string;
  svc_02_tags: string[];

  svc_03_title: string;
  svc_03_desc: string;
  svc_03_detail: string;
  svc_03_tags: string[];

  svc_04_title: string;
  svc_04_desc: string;
  svc_04_detail: string;
  svc_04_tags: string[];

  svc_05_title: string;
  svc_05_desc: string;
  svc_05_detail: string;
  svc_05_tags: string[];

  svc_06_title: string;
  svc_06_desc: string;
  svc_06_detail: string;
  svc_06_tags: string[];

  svc_07_title: string;
  svc_07_desc: string;
  svc_07_detail: string;
  svc_07_tags: string[];

  svc_08_title: string;
  svc_08_desc: string;
  svc_08_detail: string;
  svc_08_tags: string[];

  // BRANDING WEB SERVICE (featured block)
  branding_badge: string;
  branding_title: string;
  branding_subtitle: string;
  branding_body: string;
  branding_btn_open: string;
  branding_btn_close: string;
  branding_expanded_h4: string;
  branding_expanded_p1: string;
  branding_expanded_p2: string;
  branding_expanded_h5: string;
  branding_items: { icon: string; title: string; desc: string; color: string }[];
  branding_process_h5: string;
  branding_process_steps: { num: string; title: string; desc: string; color: string }[];
  branding_cta: string;

  // SERVICE COMBOS
  combo_how_together: string;
  combo_cta: string;
  combo_default: string;
  combo_01_02: string;
  combo_01_03: string;
  combo_01_07: string;
  combo_02_03: string;
  combo_02_05: string;
  combo_02_07: string;
  combo_03_07: string;
  combo_05_02: string;
  combo_want_this: string;
  combo_prefill_msg: string;

  // CASES SECTION
  cases_eyebrow: string;
  cases_h2: string;
  cases_h2_marker: string;
  cases_sub: string;
  cases_challenge: string;
  cases_actions: string;
  cases_results: string;
  cases_view_ig: string;
  cases_metrics: string;
  cases_tab_aria: string;
  cases_img_alt: string;

  // CASES DATA
  case_olivia: CaseData;
  case_maillard: CaseData;
  case_pancho: CaseData;
  case_santalucia: CaseData;

  // ABOUT SECTION
  about_eyebrow: string;
  about_h2_a: string;
  about_h2_b: string;
  about_h2_c: string;
  about_p1: string;
  about_p2: string;
  about_core_eyebrow: string;
  about_core_items: { t: string; d: string }[];
  about_bonuses: { label: string; desc: string }[];
  about_cta_eyebrow: string;
  about_cta_h3: string;
  about_cta_p: string;
  about_cta_btn: string;
  about_stat_hours: string;
  about_stat_label: string;

  // TEAM
  team_role_val: string;
  team_role_inaki: string;
  team_role_veruzka: string;
  team_role_alessia: string;
  team_img_alt: string;

  // NE·US·X block
  nexus_name_eyebrow: string;
  nexus_ne_desc: string;
  nexus_us_desc: string;
  nexus_x_desc: string;

  // SISTEMA NEXUS
  sistema_h2_a: string;
  sistema_h2_b: string;
  sistema_core_label: string;

  // BRANDS TABLE
  brand_sector_food: string;
  brand_sector_art: string;
  brand_sector_cheese: string;
  brand_sector_health: string;
  brand_sector_dental: string;
  brand_sector_innovation: string;
  brand_sector_sushi: string;
  brand_sector_oils: string;
  brand_period_present: string;

  // PROCESS SECTION
  process_eyebrow: string;
  process_h2_a: string;
  process_h2_b: string;
  process_h2_c: string;
  process_steps: { num: string; title: string; desc: string }[];

  // CONTACT SECTION
  contact_eyebrow: string;
  contact_h2_a: string;
  contact_h2_b: string;
  contact_sub: string;
  contact_name_label: string;
  contact_name_placeholder: string;
  contact_email_label: string;
  contact_email_placeholder: string;
  contact_sector_label: string;
  contact_sector_placeholder: string;
  contact_sectors: string[];
  contact_msg_label: string;
  contact_msg_placeholder: string;
  contact_btn: string;
  contact_sending: string;
  contact_disclaimer: string;
  contact_success_h3: string;
  contact_success_p: string;

  // FOOTER
  footer_rights: string;

  // COOKIE BANNER
  cookie_aria: string;
  cookie_title: string;
  cookie_body: string;
  cookie_policy: string;
  cookie_reject: string;
  cookie_accept: string;
}

const ES: Translations = {
  nav_services: "Servicios",
  nav_how: "Cómo funciona",
  nav_cases: "Casos",
  nav_about: "Nosotros",
  nav_cta: "Más clientes →",

  hero_line1: "Deja de improvisar",
  hero_line2: "y empieza a",
  hero_line3: "generar clientes.",
  hero_sub: "Gestión de redes sociales en Madrid con estrategia, contenido, Meta Ads y automatización con IA. Para marcas que quieren crecer con criterio.",
  hero_scroll: "Ver resultados reales ↓",

  services_eyebrow: "Qué hacemos",
  services_h2_marker: "generar clientes",
  services_body: "El problema no es que no publicas. Es que publicas sin sistema. Aquí está lo que cambia cuando trabajas con NEXUS.",
  services_cta: "Quiero más clientes →",
  services_select_label: "Selecciona los que necesitas",
  services_featured: "✶ Destacado",
  services_one_selected: "¿Solo este servicio o quieres ver cómo se complementa con otro? Selecciona uno más para ver la sinergia.",
  services_start_with: "Empezar con",
  services_bespoke_p: "Cada negocio es diferente. Por eso no hay paquetes cerrados. Cuéntanos tu situación y te hacemos una propuesta ajustada a lo que realmente necesitas ahora mismo.",

  svc_01_title: "Estrategia de Marketing Digital",
  svc_01_desc: "Antes de publicar nada, necesitas saber por qué, para quién y con qué objetivo. Aquí construimos los cimientos de todo lo demás.",
  svc_01_detail: "Analizamos tu situación actual, definimos tu cliente ideal (ICP), auditamos tus canales y construimos un plan de marketing con objetivos claros, métricas reales y una hoja de ruta que tu equipo puede ejecutar. Sin estrategia, todo lo demás es ruido.",
  svc_01_tags: ["Auditoría de marketing", "Definición de ICP", "Plan de contenidos", "Hoja de ruta estratégica"],

  svc_02_title: "Gestión de Redes Sociales",
  svc_02_desc: "Publicar por publicar no es una estrategia. Gestionamos tus redes con un calendario editorial, contenido que conecta y comunidad que crece.",
  svc_02_detail: "Nos encargamos de todo: estrategia de contenido, diseño, redacción, programación y gestión de comunidad. Trabajamos con Instagram, LinkedIn, TikTok y Facebook. Cada post tiene un objetivo. Cada semana tiene un plan. Cada mes tiene resultados medibles.",
  svc_02_tags: ["Instagram", "LinkedIn", "TikTok", "Facebook", "Calendario editorial"],

  svc_03_title: "Publicidad Digital",
  svc_03_desc: "El contenido orgánico construye comunidad. Los ads la aceleran. Gestionamos campañas de Meta Ads y Google Ads para que cada euro trabaje.",
  svc_03_detail: "Diseñamos, lanzamos y optimizamos campañas de Meta Ads (Instagram y Facebook) y Google Ads. Segmentación precisa, creatividades que convierten y optimización continua. Retargeting para recuperar a quienes ya te conocen y prospección para llegar a quienes aún no.",
  svc_03_tags: ["Meta Ads", "Google Ads", "Retargeting", "Optimización de campañas"],

  svc_04_title: "Branding e Identidad Visual",
  svc_04_desc: "Tu marca comunica antes de que digas una sola palabra. Construimos identidades visuales que transmiten profesionalidad, coherencia y diferenciación.",
  svc_04_detail: "Desde el logo hasta el manual de marca completo. Diseñamos identidades visuales que funcionan en digital y en físico: logotipo, paleta de colores, tipografías, sistema de diseño y guía de uso. Para marcas que quieren verse como lo que son: serias y diferentes.",
  svc_04_tags: ["Identidad de marca", "Diseño de logo", "Manual de marca", "Rebranding"],

  svc_05_title: "Fotografía & Contenido Visual",
  svc_05_desc: "Producción fotográfica profesional para producto, gastronomía, espacios y marca personal. El contenido visual que diferencia a las marcas que se recuerdan.",
  svc_05_detail: "El contenido visual es lo primero que ve tu cliente. Producimos sesiones fotográficas profesionales para producto, gastronomía, espacios y marca personal. Imágenes que comunican calidad antes de que lean una sola palabra. El contenido que diferencia a las marcas que se recuerdan de las que se olvidan.",
  svc_05_tags: ["Fotografías y videos"],

  svc_06_title: "Influencer Marketing & Fidelización",
  svc_06_desc: "Conectamos tu marca con los creadores de contenido adecuados y diseñamos programas de fidelización y actividades offline que convierten clientes en embajadores.",
  svc_06_detail: "Identificamos los creadores de contenido que realmente conectan con tu audiencia — no los más grandes, sino los más relevantes. Y más allá del influencer, diseñamos programas de fidelización y activaciones offline que convierten a tus clientes actuales en embajadores activos de tu marca.",
  svc_06_tags: ["Influencer marketing", "Activaciones offline", "Eventos", "Programas de fidelización"],

  svc_07_title: "Automatización con IA",
  svc_07_desc: "Implementamos flujos de trabajo con inteligencia artificial para que tu negocio funcione de forma más eficiente. Más resultados, menos tiempo manual.",
  svc_07_detail: "Automatizamos las partes repetitivas de tu negocio: respuestas a mensajes y comentarios en redes, gestión de reseñas en Google Maps, CRM inteligente, reportes automáticos y flujos de captación de leads. Tu marca sigue activa y respondiendo 24/7, aunque tú estés haciendo otra cosa.",
  svc_07_tags: ["Automatización de procesos", "Chatbots", "CRM inteligente", "Reportes automáticos"],

  svc_08_title: "Asesoría Estratégica y Dirección",
  svc_08_desc: "A veces no necesitas delegar toda la gestión, sino saber exactamente qué hacer con lo que ya tienes.",
  svc_08_detail: "Un diagnóstico profundo de tu situación actual y la entrega de un Playbook Estratégico adaptado a tu nivel de madurez digital. Tres modalidades: El Desbloqueo (para marcas que necesitan claridad y un plan de 30 días), Entrenamiento In-House (para equipos que necesitan aprender a ejecutar como una agencia) y Foco y Autoridad (para marcas personales que quieren posicionarse como referentes).",
  svc_08_tags: ["El Desbloqueo (Marcas)", "Entrenamiento In-House (Equipos)", "Foco y Autoridad (Marca Personal)", "Playbook Estratégico"],

  branding_badge: "✦ Servicio Fundacional",
  branding_title: "Branding y Diseño Web Estratégico",
  branding_subtitle: "Tu casa digital antes de invitar a las visitas.",
  branding_body: "El 80% de las campañas de marketing fracasan porque envían tráfico a una web que no convierte o a una marca que no transmite confianza. Antes de invertir un solo euro en publicidad o redes sociales, necesitas unos cimientos sólidos. No hacemos webs 'bonitas'; construimos activos digitales diseñados para vender, posicionar tu autoridad y automatizar tu captación.",
  branding_btn_open: "Ver cómo construimos tu marca →",
  branding_btn_close: "Cerrar ✕",
  branding_expanded_h4: "Construimos Marcas, No Solo Páginas",
  branding_expanded_p1: "Tener un logo y una plantilla de WordPress no es tener una marca. Una marca real tiene una voz clara, un posicionamiento estratégico y una web que funciona como tu mejor vendedor 24/7.",
  branding_expanded_p2: "En NEXUS, unimos la visión estratégica de negocio con la ejecución de diseño de alto nivel. Yo defino la estrategia, la estructura de conversión y el copy; mi equipo de diseño lo traduce a una identidad visual impecable.",
  branding_expanded_h5: "¿Qué incluye nuestro ecosistema de Branding y Web?",
  branding_items: [
    { icon: "◈", title: "Identidad Visual Completa", desc: "Desde el logo hasta la paleta de colores, tipografías y el manual de marca. Todo diseñado para que tu negocio se vea 'costoso' y profesional desde el primer segundo.", color: "#3B82F6" },
    { icon: "◈", title: "Diseño Web Orientado a Conversión", desc: "Landing pages, webs corporativas o e-commerce. No usamos plantillas genéricas; diseñamos la experiencia del usuario (UX/UI) para guiarlo exactamente hacia donde queremos que haga clic.", color: "#A855F7" },
    { icon: "◈", title: "Copywriting Estratégico", desc: "Las palabras venden. Redactamos los textos de tu web basándonos en los dolores de tu cliente ideal, usando estructuras persuasivas para que cada párrafo tenga un propósito.", color: "#EC4899" },
    { icon: "◈", title: "Integración de Sistemas", desc: "Tu web no es un folleto estático. La conectamos con tus herramientas de email marketing, CRMs y píxeles de seguimiento para que esté lista para captar leads desde el día uno.", color: "#F97316" },
  ],
  branding_process_h5: "El Proceso NEXUS",
  branding_process_steps: [
    { num: "01", title: "Auditoría y Estrategia", desc: "Definimos tu 'Supernicho' y el mensaje central.", color: "#3B82F6" },
    { num: "02", title: "Diseño y Copy", desc: "Creamos la identidad visual y redactamos los textos persuasivos.", color: "#A855F7" },
    { num: "03", title: "Desarrollo y Lanzamiento", desc: "Construimos la web, la optimizamos para SEO básico y te la entregamos lista para vender.", color: "#EC4899" },
  ],
  branding_cta: "Hablemos de tu nueva web →",

  combo_how_together: "✦ Cómo funcionan juntos",
  combo_cta: "Quiero esta combinación →",
  combo_default: "Estos servicios se complementan directamente. Juntos eliminan los puntos de fuga donde tu marca pierde clientes y crean un sistema de crecimiento coherente de principio a fin.",
  combo_01_02: "La estrategia define el qué y el por qué. La gestión de redes lo ejecuta. Sin estrategia, publicas sin rumbo. Sin gestión, la estrategia queda en papel. Juntos, cada post tiene un objetivo y un sistema detrás.",
  combo_01_03: "La estrategia define tu audiencia y tus mensajes. La publicidad los amplifica con presupuesto. El resultado: campañas que hablan exactamente al cliente correcto con el mensaje correcto.",
  combo_01_07: "La estrategia marca los objetivos. La automatización con IA se encarga de que el sistema funcione solo entre sesiones. Menos tiempo operativo, más tiempo para crecer.",
  combo_02_03: "El contenido orgánico construye comunidad. Los ads la aceleran. Combinados, el orgánico baja el coste por clic de los ads y los ads llevan tráfico a un perfil que ya convierte. Es el combo más potente para crecer rápido.",
  combo_02_05: "La gestión de redes necesita contenido visual de calidad para funcionar. La fotografía profesional alimenta el calendario editorial con imágenes que detienen el scroll. Juntos, el perfil se ve premium desde el primer día.",
  combo_02_07: "La gestión activa de comunidad más la automatización con IA significa que tu marca responde en tiempo real, 24 horas al día. Nunca pierdes un lead por responder tarde.",
  combo_03_07: "Los ads captan la atención. La automatización con IA convierte esa atención en leads cualificados sin intervención manual. El sistema trabaja solo mientras tú duermes.",
  combo_05_02: "La fotografía profesional alimenta el calendario editorial con imágenes que detienen el scroll. Juntos, el perfil se ve premium desde el primer día.",
  combo_want_this: "Quiero esta combinación →",
  combo_prefill_msg: "Me interesan los servicios:",

  cases_eyebrow: "Casos reales",
  cases_h2: "Resultados de marcas reales gestionadas por NEXUS",
  cases_h2_marker: "clientes en Madrid",
  cases_sub: "Datos reales. Sin promesas vacías.",
  cases_challenge: "El reto",
  cases_actions: "Qué hicimos",
  cases_results: "Resultados",
  cases_view_ig: "Ver en Instagram →",
  cases_metrics: "Métricas",
  cases_tab_aria: "Ver caso de éxito de",
  cases_img_alt: "Perfil Instagram",

  case_olivia: {
    sector: "Aceites Esenciales · Venezuela · 2021–2025",
    tag: "Crecimiento de comunidad",
    headline: "De marca local a referente en bienestar natural con 12.900 seguidores.",
    challenge: "Olivia necesitaba construir una comunidad real alrededor de un producto premium en un mercado donde la competencia era genérica y sin identidad.",
    actions: [
      "Estrategia de contenido con identidad visual y tono de marca definido",
      "Contenido educativo sobre aceites esenciales dirigido al nicho de bienestar",
      "Activaciones con influencers del sector salud y bienestar natural",
      "Expansión a nuevos puntos de venta físicos",
    ],
    kpis: [
      { label: "Seguidores en Instagram", value: "12.9K" },
      { label: "Nuevos puntos de venta conseguidos", value: "+5" },
      { label: "Publicaciones gestionadas", value: "+468" },
    ],
    result: "Olivia pasó de ser una marca desconocida a tener una comunidad fiel y presencia física en 5 puntos de venta nuevos.",
  },
  case_maillard: {
    sector: "Hamburguesería · Madrid · 2024–actualidad",
    tag: "Gestión integral + Ads",
    headline: "De cuenta nueva a comunidad activa: +797 seguidores y 241K reproducciones.",
    challenge: "Maillard necesitaba construir presencia desde cero en Madrid: identidad sólida, contenido constante y una comunidad que generara movimiento real en torno a la marca.",
    actions: [
      "Estrategia y gestión completa de redes sociales",
      "Producción de contenido orientado a no seguidores (92% del alcance)",
      "Campañas de Meta Ads con presupuesto máximo de 150 €/mes",
      "Optimización de perfil y llamadas a la acción",
      "Rebranding visual y diseño de nueva carta",
    ],
    kpis: [
      { label: "Reproducciones", value: "241K" },
      { label: "Cuentas alcanzadas", value: "+410%" },
      { label: "Actividad en el perfil", value: "+970%" },
      { label: "Toques en dirección de empresa", value: "+9.975%" },
    ],
    result: "Con menos de 150 €/mes en ads, Maillard alcanzó 131.531 cuentas únicas, ganó 797 seguidores y multiplicó por 10 la actividad en su perfil. El 92% del alcance llegó a personas que no la seguían.",
  },
  case_pancho: {
    sector: "Restauración venezolana · Madrid · 2024–actualidad",
    tag: "Crecimiento orgánico · Sin ads",
    headline: "+1.303 seguidores y 118K reproducciones. Solo con contenido orgánico.",
    challenge: "Conectar con la comunidad venezolana en Madrid: un nicho muy específico, muy leal y muy exigente con la autenticidad. El contenido tenía que sentirse real, no publicitario.",
    actions: [
      "Estrategia de contenido con identidad cultural venezolana auténtica",
      "Reel en collab con la cuenta venezolana de Pancho Villa sobre la historia de la marca",
      "Uso de Trial Reels para ampliar alcance a nuevas audiencias",
      "Gestión de comunidad activa: 257 comentarios respondidos",
      "Campañas de contenido en fechas clave de la cultura venezolana",
    ],
    kpis: [
      { label: "Reproducciones", value: "118K" },
      { label: "Cuentas alcanzadas", value: "+536%" },
      { label: "Toques al enlace externo", value: "+978%" },
      { label: "Seguidores ganados (orgánico)", value: "+1.303" },
    ],
    result: "Sin invertir un euro en publicidad, Pancho Villa alcanzó 56.837 cuentas únicas, generó 10.356 interacciones y sumó 1.303 seguidores. El 76% del alcance llegó a no seguidores. Un solo reel consiguió 1.224 seguidores nuevos.",
  },
  case_santalucia: {
    sector: "Innovación corporativa · España · 2024–2025",
    tag: "Estrategia corporativa · Sin ads",
    headline: "De cero reels a presencia digital activa: una marca corporativa que aprendió a comunicar.",
    challenge: "Santalucía Impulsa no tenía ningún reel publicado. El reto era construir una estrategia de contenido para una marca corporativa que conectara con emprendedores e innovadores sin perder la seriedad institucional.",
    actions: [
      "Diseño de estrategia de contenido para perfil corporativo desde cero",
      "Implementación del primer formato de Reels en la cuenta",
      "Definición de tono de voz que equilibra autoridad y cercanía",
      "Calendario editorial orientado a emprendedores y startups",
    ],
    kpis: [
      { label: "Reproducciones", value: "29.7K" },
      { label: "Cuentas alcanzadas", value: "6.197" },
      { label: "Interacciones generadas", value: "1.344" },
      { label: "Seguidores actuales", value: "2.872" },
    ],
    result: "Una marca corporativa que no tenía reels pasó a tener presencia digital activa, 29.765 reproducciones y 1.344 interacciones. Sin invertir en publicidad. La audiencia es 50% hombres / 50% mujeres entre 25 y 54 años.",
  },

  about_eyebrow: "Quiénes somos",
  about_h2_a: "No solo te ahorramos tiempo.",
  about_h2_b: "Hacemos crecer",
  about_h2_c: "tu negocio.",
  about_p1: "La mayoría de marcas trabajan para sus redes. Publican, publican y publican. Y al final del mes, los seguidores no se convierten en clientes.",
  about_p2: "El problema no es el contenido. Es que no hay sistema. NEXUS construye ese sistema: estrategia, contenido, automatización y medición. Todo conectado. Todo con un objetivo: que tus redes te traigan clientes de forma constante.",
  about_core_eyebrow: "El núcleo",
  about_core_items: [
    { t: "Contenido de alto impacto", d: "Reels, posts y stories con estrategia detrás. Cada publicación tiene un objetivo." },
    { t: "Campañas de publicidad digital", d: "Meta Ads y Google Ads optimizados en tiempo real. Cada euro trabajando." },
    { t: "Gestión activa de comunidad", d: "Respondemos, conectamos y construimos relaciones con tu audiencia." },
  ],
  about_bonuses: [
    { label: "Guardián 24/7", desc: "Automatización con IA para responder mensajes y comentarios al instante. Nunca pierdas un lead por responder tarde." },
    { label: "Radar de Tendencias", desc: "Informe mensual con IA sobre lo que busca tu cliente ideal. Siempre un paso por delante de la competencia." },
    { label: "Sesión estratégica mensual", desc: "Una hora contigo cada mes para alinear el marketing con tus objetivos de facturación. Trato directo, sin intermediarios." },
  ],
  about_cta_eyebrow: "Empieza cuando quieras",
  about_cta_h3: "30 minutos es todo lo que necesitas para empezar.",
  about_cta_p: "Nos cuentas tu negocio, analizamos tu situación y te preparamos una propuesta ajustada a lo que realmente necesitas. Sin compromisos.",
  about_cta_btn: "Quiero empezar →",
  about_stat_hours: "1 hora",
  about_stat_label: "Tú dedicas 1 hora al mes a la sesión estratégica. Nosotros nos encargamos del resto: contenido, anuncios, comunidad y automatización.",

  team_role_val: "Estratega Digital",
  team_role_inaki: "Automatizaciones e inteligencia artificial",
  team_role_veruzka: "Community Manager",
  team_role_alessia: "Business Developer",
  team_img_alt: "en NEXUS Madrid",

  nexus_name_eyebrow: "El nombre lo dice todo",
  nexus_ne_desc: "Nuestra experiencia, criterio y forma de ver el marketing.",
  nexus_us_desc: "Tu negocio, tus clientes, tus objetivos.",
  nexus_x_desc: "El punto donde nos conectamos y las cosas empiezan a funcionar.",

  sistema_h2_a: "Todo lo que necesita tu marca,",
  sistema_h2_b: "hecho por nosotros.",
  sistema_core_label: "El núcleo",

  brand_sector_food: "Restauración",
  brand_sector_art: "Arte & Galería",
  brand_sector_cheese: "Alimentación",
  brand_sector_health: "Salud & Bienestar",
  brand_sector_dental: "Clínica Dental",
  brand_sector_innovation: "Innovación",
  brand_sector_sushi: "Restauración",
  brand_sector_oils: "Aceites Esenciales",
  brand_period_present: "hoy",

  process_eyebrow: "Cómo funciona",
  process_h2_a: "Simple. Directo.",
  process_h2_b: "",
  process_h2_c: "Sin vueltas.",
  process_steps: [
    { num: "01", title: "Nos cuentas tu negocio", desc: "Rellenas el formulario. Nos dices qué tienes, qué quieres lograr y qué no está funcionando. Sin rodeos." },
    { num: "02", title: "Diseñamos tu sistema", desc: "Analizamos tu situación y preparamos un plan hecho para ti. No una plantilla. Un sistema con tu nombre." },
    { num: "03", title: "Ejecutamos contigo", desc: "Arrancamos con fechas, objetivos claros y comunicación directa. Tú te dedicas a tu negocio. Nosotros al marketing." },
  ],

  contact_eyebrow: "Empezamos cuando quieras",
  contact_h2_a: "Cuéntanos tu negocio",
  contact_h2_b: "y te decimos cómo hacerlo crecer.",
  contact_sub: "Sin compromiso. Solo claridad.",
  contact_name_label: "Tu nombre",
  contact_name_placeholder: "María García",
  contact_email_label: "Tu email",
  contact_email_placeholder: "maria@tuempresa.com",
  contact_sector_label: "¿A qué se dedica tu negocio?",
  contact_sector_placeholder: "Selecciona tu sector",
  contact_sectors: ["Clínica / Salud", "Restaurante / Hostelería", "E-commerce / Tienda online", "Inmobiliaria", "Academia / Formación", "Empresa de servicios", "Retail / Moda", "Innovación / Tecnología", "Otro"],
  contact_msg_label: "¿Qué quieres lograr? ¿Qué no está funcionando?",
  contact_msg_placeholder: "Cuéntanos lo que necesitas. Cuanto más detallado, mejor propuesta podemos hacerte.",
  contact_btn: "Quiero mi propuesta gratuita →",
  contact_sending: "Enviando...",
  contact_disclaimer: "Respondemos en menos de 24 horas. Sin spam, sin listas de correo.",
  contact_success_h3: "Recibido. Te respondemos en menos de 24h.",
  contact_success_p: "Revisa tu bandeja de entrada. Si no ves nuestra respuesta, mira en spam.",

  footer_rights: "© 2025 NEXUS. Todos los derechos reservados.",

  cookie_aria: "Aviso de cookies",
  cookie_title: "Usamos cookies para analizar el tráfico de la web",
  cookie_body: "Utilizamos Google Analytics para entender cómo los visitantes usan somosnexus.es y mejorar la experiencia. Puedes aceptar o rechazar las cookies de analítica. Las cookies esenciales siempre están activas.",
  cookie_policy: "Política de cookies",
  cookie_reject: "Rechazar",
  cookie_accept: "Aceptar todo",
};

const EN: Translations = {
  nav_services: "Services",
  nav_how: "How it works",
  nav_cases: "Case studies",
  nav_about: "About us",
  nav_cta: "Get more clients →",

  hero_line1: "Stop winging it",
  hero_line2: "and start",
  hero_line3: "winning clients.",
  hero_sub: "Bespoke social media management in Madrid — strategy, content, Meta Ads and AI automation. For brands that are serious about growth.",
  hero_scroll: "See real results ↓",

  services_eyebrow: "What we do",
  services_h2_marker: "generating clients",
  services_body: "The problem isn't that you're not posting. It's that you're posting without a system. Here's what changes when you work with NEXUS.",
  services_cta: "I want more clients →",
  services_select_label: "Select the ones you need",
  services_featured: "✶ Featured",
  services_one_selected: "Just this one service, or would you like to see how it pairs with another? Select one more to see the synergy.",
  services_start_with: "Get started with",
  services_bespoke_p: "Every business is different. That's why we don't do off-the-shelf packages. Tell us your situation and we'll put together a bespoke proposal for exactly what you need right now.",

  svc_01_title: "Digital Marketing Strategy",
  svc_01_desc: "Before you post anything, you need to know why, for whom, and to what end. This is where we build the foundations for everything else.",
  svc_01_detail: "We audit your current situation, define your ideal customer profile (ICP), review your channels and build a marketing plan with clear objectives, real metrics and a roadmap your team can actually execute. Without strategy, everything else is just noise.",
  svc_01_tags: ["Marketing audit", "ICP definition", "Content plan", "Strategic roadmap"],

  svc_02_title: "Social Media Management",
  svc_02_desc: "Posting for the sake of it isn't a strategy. We manage your channels with an editorial calendar, content that resonates and a community that genuinely grows.",
  svc_02_detail: "We handle everything: content strategy, design, copywriting, scheduling and community management. We work across Instagram, LinkedIn, TikTok and Facebook. Every post has a purpose. Every week has a plan. Every month has measurable results.",
  svc_02_tags: ["Instagram", "LinkedIn", "TikTok", "Facebook", "Editorial calendar"],

  svc_03_title: "Digital Advertising",
  svc_03_desc: "Organic content builds community. Ads accelerate it. We manage Meta Ads and Google Ads campaigns so every euro works hard.",
  svc_03_detail: "We design, launch and optimise Meta Ads (Instagram and Facebook) and Google Ads campaigns. Precise targeting, creatives that convert and continuous optimisation. Retargeting to re-engage warm audiences and prospecting to reach those who haven't heard of you yet.",
  svc_03_tags: ["Meta Ads", "Google Ads", "Retargeting", "Campaign optimisation"],

  svc_04_title: "Branding & Visual Identity",
  svc_04_desc: "Your brand communicates before you say a single word. We build visual identities that convey professionalism, consistency and genuine distinction.",
  svc_04_detail: "From the logo to the full brand guidelines. We design visual identities that work both digitally and in print: logotype, colour palette, typography, design system and usage guide. For brands that want to look exactly like what they are: serious and different.",
  svc_04_tags: ["Brand identity", "Logo design", "Brand guidelines", "Rebranding"],

  svc_05_title: "Photography & Visual Content",
  svc_05_desc: "Professional photography for product, food, spaces and personal branding. The visual content that sets memorable brands apart from forgettable ones.",
  svc_05_detail: "Your visual content is the first thing your customer sees. We produce professional photography sessions for product, food, spaces and personal branding. Images that communicate quality before a single word is read. The content that separates brands people remember from brands people scroll past.",
  svc_05_tags: ["Photography & video"],

  svc_06_title: "Influencer Marketing & Loyalty",
  svc_06_desc: "We connect your brand with the right content creators and design loyalty programmes and offline activations that turn customers into brand ambassadors.",
  svc_06_detail: "We identify content creators who genuinely connect with your audience — not the biggest names, but the most relevant ones. And beyond influencer work, we design loyalty programmes and offline activations that turn your existing customers into active brand ambassadors.",
  svc_06_tags: ["Influencer marketing", "Offline activations", "Events", "Loyalty programmes"],

  svc_07_title: "AI Automation",
  svc_07_desc: "We implement AI-powered workflows so your business runs more efficiently. More results, less manual effort.",
  svc_07_detail: "We automate the repetitive parts of your business: replies to messages and comments on social media, Google Maps review management, intelligent CRM, automated reports and lead capture flows. Your brand stays active and responsive 24/7, even whilst you're doing something else entirely.",
  svc_07_tags: ["Process automation", "Chatbots", "Intelligent CRM", "Automated reports"],

  svc_08_title: "Strategic Consultancy & Direction",
  svc_08_desc: "Sometimes you don't need to hand over full management — you just need to know exactly what to do with what you already have.",
  svc_08_detail: "A thorough diagnosis of your current situation and the delivery of a bespoke Strategic Playbook tailored to your level of digital maturity. Three formats: The Unblock (for brands that need clarity and a 30-day plan), In-House Training (for teams that need to learn to execute like a proper team) and Focus & Authority (for personal brands looking to establish themselves as go-to experts).",
  svc_08_tags: ["The Unblock (Brands)", "In-House Training (Teams)", "Focus & Authority (Personal Brand)", "Strategic Playbook"],

  branding_badge: "✦ Foundational Service",
  branding_title: "Strategic Branding & Web Design",
  branding_subtitle: "Your digital home, before you invite the guests in.",
  branding_body: "80% of marketing campaigns fail because they send traffic to a website that doesn't convert, or a brand that doesn't inspire confidence. Before you invest a single euro in advertising or social media, you need solid foundations. We don't build 'pretty' websites — we build digital assets designed to sell, establish your authority and automate your lead generation.",
  branding_btn_open: "See how we build your brand →",
  branding_btn_close: "Close ✕",
  branding_expanded_h4: "We Build Brands, Not Just Pages",
  branding_expanded_p1: "Having a logo and a WordPress template isn't having a brand. A real brand has a clear voice, a strategic positioning and a website that works as your best salesperson around the clock.",
  branding_expanded_p2: "At NEXUS, we combine strategic business thinking with high-level design execution. I define the strategy, the conversion structure and the copy; my design team translates it into a flawless visual identity.",
  branding_expanded_h5: "What's included in our Branding & Web ecosystem?",
  branding_items: [
    { icon: "◈", title: "Complete Visual Identity", desc: "From the logo to the colour palette, typography and brand guidelines. Everything designed so your business looks premium and professional from the very first second.", color: "#3B82F6" },
    { icon: "◈", title: "Conversion-Focused Web Design", desc: "Landing pages, corporate websites or e-commerce. We don't use generic templates — we design the user experience (UX/UI) to guide visitors exactly where we want them to click.", color: "#A855F7" },
    { icon: "◈", title: "Strategic Copywriting", desc: "Words sell. We write your website copy based on your ideal client's pain points, using persuasive structures so every paragraph has a purpose.", color: "#EC4899" },
    { icon: "◈", title: "Systems Integration", desc: "Your website isn't a static brochure. We connect it with your email marketing tools, CRMs and tracking pixels so it's ready to capture leads from day one.", color: "#F97316" },
  ],
  branding_process_h5: "The NEXUS Process",
  branding_process_steps: [
    { num: "01", title: "Audit & Strategy", desc: "We define your 'Superniche' and your core message.", color: "#3B82F6" },
    { num: "02", title: "Design & Copy", desc: "We create the visual identity and write the persuasive copy.", color: "#A855F7" },
    { num: "03", title: "Build & Launch", desc: "We build the site, optimise it for basic SEO and hand it over ready to sell.", color: "#EC4899" },
  ],
  branding_cta: "Let's talk about your new website →",

  combo_how_together: "✦ How they work together",
  combo_cta: "I want this combination →",
  combo_default: "These services complement each other directly. Together they eliminate the leaky points where your brand loses clients and create a coherent growth system from start to finish.",
  combo_01_02: "Strategy defines the what and the why. Social media management executes it. Without strategy, you're posting aimlessly. Without management, strategy stays on paper. Together, every post has a purpose and a system behind it.",
  combo_01_03: "Strategy defines your audience and your messages. Advertising amplifies them with budget. The result: campaigns that speak to exactly the right client with exactly the right message.",
  combo_01_07: "Strategy sets the objectives. AI automation ensures the system runs on its own between sessions. Less operational time, more time to grow.",
  combo_02_03: "Organic content builds community. Ads accelerate it. Combined, organic lowers your cost per click whilst ads drive traffic to a profile that already converts. It's the most powerful combination for rapid growth.",
  combo_02_05: "Social media management needs quality visual content to work. Professional photography feeds the editorial calendar with images that stop the scroll. Together, the profile looks premium from day one.",
  combo_02_07: "Active community management plus AI automation means your brand responds in real time, around the clock. You'll never lose a lead by replying too late.",
  combo_03_07: "Ads capture attention. AI automation converts that attention into qualified leads without manual intervention. The system works on its own whilst you sleep.",
  combo_05_02: "Professional photography feeds the editorial calendar with images that stop the scroll. Together, the profile looks premium from day one.",
  combo_want_this: "I want this combination →",
  combo_prefill_msg: "I'm interested in the following services:",

  cases_eyebrow: "Real case studies",
  cases_h2: "Results from real brands managed by NEXUS",
  cases_h2_marker: "clients in Madrid",
  cases_sub: "Real data. No empty promises.",
  cases_challenge: "The challenge",
  cases_actions: "What we did",
  cases_results: "Results",
  cases_view_ig: "View on Instagram →",
  cases_metrics: "Metrics",
  cases_tab_aria: "View case study for",
  cases_img_alt: "Instagram profile",

  case_olivia: {
    sector: "Essential Oils · Venezuela · 2021–2025",
    tag: "Community growth",
    headline: "From local brand to natural wellness reference with 12,900 followers.",
    challenge: "Olivia needed to build a genuine community around a premium product in a market where the competition was generic and lacked identity.",
    actions: [
      "Content strategy with defined visual identity and brand tone",
      "Educational content about essential oils targeted at the wellness niche",
      "Influencer activations in the health and natural wellness sector",
      "Expansion to new physical retail points",
    ],
    kpis: [
      { label: "Instagram followers", value: "12.9K" },
      { label: "New retail points secured", value: "+5" },
      { label: "Posts managed", value: "+468" },
    ],
    result: "Olivia went from an unknown brand to having a loyal community and physical presence across 5 new retail points.",
  },
  case_maillard: {
    sector: "Burger restaurant · Madrid · 2024–present",
    tag: "Full management + Ads",
    headline: "From brand new account to active community: +797 followers and 241K views.",
    challenge: "Maillard needed to build a presence from scratch in Madrid — a solid identity, consistent content and a community that generated real momentum around the brand.",
    actions: [
      "Full social media strategy and management",
      "Content production targeting non-followers (92% of reach)",
      "Meta Ads campaigns with a maximum budget of €150/month",
      "Profile optimisation and calls to action",
      "Visual rebranding and new menu design",
    ],
    kpis: [
      { label: "Views", value: "241K" },
      { label: "Accounts reached", value: "+410%" },
      { label: "Profile activity", value: "+970%" },
      { label: "Business address taps", value: "+9,975%" },
    ],
    result: "With less than €150/month in ads, Maillard reached 131,531 unique accounts, gained 797 followers and multiplied profile activity tenfold. 92% of reach went to people who weren't already following.",
  },
  case_pancho: {
    sector: "Venezuelan restaurant · Madrid · 2024–present",
    tag: "Organic growth · No ads",
    headline: "+1,303 followers and 118K views. Purely organic content.",
    challenge: "Connecting with the Venezuelan community in Madrid: a very specific, very loyal and very demanding niche when it comes to authenticity. The content had to feel genuine, not promotional.",
    actions: [
      "Content strategy with authentic Venezuelan cultural identity",
      "Collab reel with the Venezuelan Pancho Villa account about the brand's story",
      "Use of Trial Reels to expand reach to new audiences",
      "Active community management: 257 comments replied to",
      "Content campaigns on key dates in Venezuelan culture",
    ],
    kpis: [
      { label: "Views", value: "118K" },
      { label: "Accounts reached", value: "+536%" },
      { label: "External link taps", value: "+978%" },
      { label: "Followers gained (organic)", value: "+1,303" },
    ],
    result: "Without spending a single euro on advertising, Pancho Villa reached 56,837 unique accounts, generated 10,356 interactions and gained 1,303 followers. 76% of reach went to non-followers. A single reel brought in 1,224 new followers.",
  },
  case_santalucia: {
    sector: "Corporate innovation · Spain · 2024–2025",
    tag: "Corporate strategy · No ads",
    headline: "From zero reels to an active digital presence: a corporate brand that learnt to communicate.",
    challenge: "Santalucía Impulsa had no reels published. The challenge was to build a content strategy for a corporate brand that connected with entrepreneurs and innovators without losing institutional gravitas.",
    actions: [
      "Content strategy design for a corporate profile from scratch",
      "Implementation of the first Reels format on the account",
      "Definition of a brand voice that balances authority and approachability",
      "Editorial calendar focused on entrepreneurs and startups",
    ],
    kpis: [
      { label: "Views", value: "29.7K" },
      { label: "Accounts reached", value: "6,197" },
      { label: "Interactions generated", value: "1,344" },
      { label: "Current followers", value: "2,872" },
    ],
    result: "A corporate brand with no reels went on to have an active digital presence, 29,765 views and 1,344 interactions — without spending on advertising. The audience is 50% men / 50% women aged 25–54.",
  },

  about_eyebrow: "Who we are",
  about_h2_a: "We don't just save you time.",
  about_h2_b: "We grow",
  about_h2_c: "your business.",
  about_p1: "Most brands work for their social media. They post, post and post again. And at the end of the month, followers still aren't converting into clients.",
  about_p2: "The problem isn't the content. It's the absence of a system. NEXUS builds that system: strategy, content, automation and measurement. All connected. All with one goal: your social media bringing in clients consistently.",
  about_core_eyebrow: "The core",
  about_core_items: [
    { t: "High-impact content", d: "Reels, posts and stories with strategy behind them. Every piece of content has a purpose." },
    { t: "Digital advertising campaigns", d: "Meta Ads and Google Ads optimised in real time. Every euro working hard." },
    { t: "Active community management", d: "We respond, connect and build genuine relationships with your audience." },
  ],
  about_bonuses: [
    { label: "24/7 Guardian", desc: "AI automation to reply to messages and comments instantly. Never lose a lead by responding too late." },
    { label: "Trend Radar", desc: "Monthly AI-powered report on what your ideal client is searching for. Always one step ahead of the competition." },
    { label: "Monthly strategy session", desc: "One hour with you each month to align marketing with your revenue goals. Direct contact, no middlemen." },
  ],
  about_cta_eyebrow: "Start whenever you're ready",
  about_cta_h3: "Thirty minutes is all it takes to get started.",
  about_cta_p: "Tell us about your business, we'll analyse your situation and put together a bespoke proposal for exactly what you need right now. No strings attached.",
  about_cta_btn: "Let's get started →",
  about_stat_hours: "1 hour",
  about_stat_label: "You spend 1 hour per month on the strategy session. We handle the rest: content, ads, community and automation.",

  team_role_val: "Digital Strategist",
  team_role_inaki: "Automation & Artificial Intelligence",
  team_role_veruzka: "Community Manager",
  team_role_alessia: "Business Developer",
  team_img_alt: "at NEXUS Madrid",

  nexus_name_eyebrow: "The name says it all",
  nexus_ne_desc: "Our experience, judgement and way of thinking about marketing.",
  nexus_us_desc: "Your business, your clients, your goals.",
  nexus_x_desc: "The point where we connect and things start to happen.",

  sistema_h2_a: "Everything your brand needs,",
  sistema_h2_b: "done by us.",
  sistema_core_label: "The core",

  brand_sector_food: "Food & Beverage",
  brand_sector_art: "Art & Gallery",
  brand_sector_cheese: "Food",
  brand_sector_health: "Health & Wellness",
  brand_sector_dental: "Dental Clinic",
  brand_sector_innovation: "Innovation",
  brand_sector_sushi: "Food & Beverage",
  brand_sector_oils: "Essential Oils",
  brand_period_present: "present",

  process_eyebrow: "How it works",
  process_h2_a: "Straightforward.",
  process_h2_b: "",
  process_h2_c: "No faff.",
  process_steps: [
    { num: "01", title: "Tell us about your business", desc: "Fill in the form. Tell us what you have, what you want to achieve and what isn't working. No waffle." },
    { num: "02", title: "We design your system", desc: "We analyse your situation and put together a plan built for you. Not a template. A bespoke system with your name on it." },
    { num: "03", title: "We execute alongside you", desc: "We kick off with clear dates, clear objectives and direct communication. You focus on your business. We handle the marketing." },
  ],

  contact_eyebrow: "Start whenever you're ready",
  contact_h2_a: "Tell us about your business",
  contact_h2_b: "and we'll show you how to grow it.",
  contact_sub: "No commitment. Just clarity.",
  contact_name_label: "Your name",
  contact_name_placeholder: "Sarah Thompson",
  contact_email_label: "Your email",
  contact_email_placeholder: "sarah@yourbusiness.co.uk",
  contact_sector_label: "What does your business do?",
  contact_sector_placeholder: "Select your sector",
  contact_sectors: ["Clinic / Healthcare", "Restaurant / Hospitality", "E-commerce / Online shop", "Property", "Education / Training", "Professional services", "Retail / Fashion", "Tech / Innovation", "Other"],
  contact_msg_label: "What do you want to achieve? What isn't working?",
  contact_msg_placeholder: "Tell us what you need. The more detail you give us, the better the proposal we can put together.",
  contact_btn: "I want my free proposal →",
  contact_sending: "Sending...",
  contact_disclaimer: "We reply within 24 hours. No spam, no mailing lists.",
  contact_success_h3: "Brilliant. We'll be in touch within 24 hours.",
  contact_success_p: "Check your inbox. If you don't hear from us, have a look in your junk folder.",

  footer_rights: "© 2025 NEXUS. All rights reserved.",

  cookie_aria: "Cookie notice",
  cookie_title: "We use cookies to analyse site traffic",
  cookie_body: "We use Google Analytics to understand how visitors use somosnexus.es and improve the experience. You can accept or decline analytics cookies. Essential cookies are always active.",
  cookie_policy: "Cookie policy",
  cookie_reject: "Decline",
  cookie_accept: "Accept all",
};

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "es",
  setLang: () => {},
  t: ES,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("nexus_lang");
    return (saved === "en" || saved === "es") ? saved : "es";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("nexus_lang", l);
  };

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en-GB" : "es";
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: lang === "en" ? EN : ES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

export { ES, EN };
