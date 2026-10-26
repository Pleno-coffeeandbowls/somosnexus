# Ideas de Diseño — NEXUS Landing Page

## Concepto Elegido: "Editorial Marker" (Probabilidad: 0.07)

### Design Movement
Editorial de revista de negocios de alto nivel (Monocle, Fast Company) con intervenciones de marcador a mano. La tensión entre lo impecablemente tipografiado y los trazos orgánicos crea dinamismo sin caos.

### Core Principles
1. **Blanco como lienzo, color como intención.** El fondo es siempre blanco. El degradado (azul→morado→rosado→naranja→amarillo) aparece solo donde hay algo importante que decir.
2. **Marcador como voz.** Círculos, subrayados y trazos SVG dibujados a mano rodean palabras clave. No decoran: señalan. Como cuando Val subraya algo en una propuesta.
3. **Scroll que cuenta una historia.** Cada sección entra con una animación de revelado (fade + slide suave). El usuario siente que está leyendo un documento vivo.
4. **Tipografía con carácter.** Playfair Display para titulares (autoridad editorial), DM Sans para cuerpo (legibilidad moderna). Nunca Inter.

### Color Philosophy
- Fondo: `#FFFFFF` puro. Sin grises, sin off-whites.
- Texto principal: `#111111` casi negro. Máximo contraste.
- Degradado NEXUS: `linear-gradient(to left, #FACC15, #F97316, #EC4899, #A855F7, #3B82F6)` — amarillo→naranja→rosado→morado→azul (de derecha a izquierda, como el logo).
- Gris neutro para fondos de sección alternos: `#F8F8F8`

### Layout Paradigm
Asimétrico. La hero section tiene texto a la izquierda (60%) e imagen a la derecha (40%). Las secciones de servicios usan una cuadrícula de tarjetas con bordes de acento en degradado. La sección "Sobre Val" rompe la cuadrícula con texto e imagen superpuestos.

### Signature Elements
1. **Círculos de marcador SVG** animados alrededor de palabras clave en los titulares (ej. "resultados", "estrategia", "NEXUS").
2. **Barra de degradado** de 4px de alto que aparece como acento en tarjetas, separadores y el logo.
3. **Números grandes en degradado** para las métricas de impacto (ej. "4 marcas", "9 años").

### Interaction Philosophy
Scroll suave con `IntersectionObserver`. Cada elemento entra desde abajo con un fade-in de 400ms. El CTA principal tiene un efecto hover donde el degradado se anima (background-position shift). Los círculos de marcador se "dibujan" con animación de stroke-dashoffset cuando entran en viewport.

### Animation
- Page load: El logo aparece con un fade-in de 600ms. El titular principal entra palabra por palabra.
- Scroll: `opacity: 0 → 1` + `translateY(20px → 0)` en 400ms con `ease-out`.
- Marcadores SVG: `stroke-dashoffset` de 100% a 0% en 800ms cuando el elemento entra en viewport.
- CTA hover: `background-size: 200%` animado de derecha a izquierda en 300ms.

### Typography System
- **Display/Titulares:** Playfair Display (Google Fonts) — Bold 700. Tamaños: 64px hero, 48px sección, 32px subsección.
- **Cuerpo:** DM Sans (Google Fonts) — Regular 400, Medium 500. Tamaño: 18px cuerpo, 16px secundario.
- **Acento/Labels:** DM Sans Medium en mayúsculas con letter-spacing de 0.1em.
