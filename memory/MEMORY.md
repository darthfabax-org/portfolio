# Portfolio DarthFabax — Notas del Proyecto

## Stack
- Vanilla HTML/CSS/JS — sin dependencias ni build tools
- Deploy: GitHub Pages via Actions con Slack notify
- Fuentes: JetBrains Mono + Fira Code (Google Fonts)
- i18n: sistema custom con data-i18n + localStorage

## Arquitectura CSS (orden de carga)
1. variables.css — design tokens
2. reset.css — normalize
3. base.css — body, scanlines, vignette, scrollbar
4. layout.css — topbar, hero, sections, footer
5. components.css — terminal, skills, pipeline, cloud, contact, timeline
6. animations.css — keyframes y transiciones
7. responsive.css — breakpoints (768px, 480px, 1200px+)

## Preferencias del usuario
- Mantener estética terminal/CLI dark (verde neon #39ff83, cyan #00d4d4)
- No frameworks CSS, puro vanilla
- Responsive debe funcionar en móvil real

## Sesión 2025-03 — Mejoras aplicadas
### Fixes mobile (responsive.css):
- scroll-padding-top en html para compensar topbar sticky
- Topbar mobile: avatar [FA] solo, ocultar prompt+host text
- Lang pill visible en tablet y mobile (era display:none en original)
- Nav: overflow-x: auto + scrollbar-width: none como fallback
- Hero: min-height: auto en mobile (era 100vh)
- Terminal body: min-height: 0 en mobile
- Pipeline: flex-direction column, white-space: normal, arrows hidden
- Contact values: text-overflow: ellipsis para URLs largas
- Timeline: 1 columna en mobile

### Mejoras visuales:
- Terminal: box-shadow más fuerte con capa verde extra
- YAML syntax: text-shadow sutil verde/cyan en keys y strings
- Skill level bar: 2px height (era 1px), gradiente green→cyan
- Skill card hover: box-shadow inset verde sutil
- Cert badge: hover con lift + glow verde
- Contact row: hover highlight fondo + arrow color change
- Nav link: underline animado en hover (scaleX transition)
- Section ##: glow-pulse-green animation (pulsa brightness)
- Pipeline arrows: pipeline-flow animation (fade in/out staggered)
- Timeline active dot: timeline-dot-glow animation (box-shadow pulse)
- Terminal container: terminal-boot animation (fadeIn + translateY)
- Section reveal: translateY aumentado de 16px a 24px

## Archivos JS
- clock.js: IIFE, actualiza #js-clock cada 1s
- animations.js: IntersectionObserver + setTimeout staggered para .is-visible
- i18n.js: toggle ES/EN, persistencia localStorage 'portfolio-lang'
