# Vacacionable

Festivos, puentes y vacaciones de 2027: qué días pedir para librar más, con los festivos del BOE.
https://vacacionable.iaencrudo.es

- **Stack:** Astro 7 + Tailwind 4, salida estática en GitHub Pages (`.github/workflows/deploy.yml`).
- **Datos:**
  - `src/data/festivos-boe.json`: festivos nacionales y autonómicos de 2026 y 2027.
    - Fuente: las resoluciones del BOE BOE-A-2025-21667 (2026) y BOE-A-2026-21254 (2027).
    - Se regenera con `npm run festivos`.
    - Para 2028, se añade su resolución en `scripts/festivos-boe.mjs`.
  - `src/data/territorios.ts`: comunidades, las 52 capitales, las fiestas insulares de Canarias y los festivos locales (`LOCALES`).
    - Solo se añaden festivos locales que tengan fuente.
  - `src/data/puentes.ts`: los puentes con página propia.
- **Cálculos:** `src/lib/festivos.ts`, con funciones puras compartidas entre el build y el navegador. Calcula los días libres, los puentes y el optimizador (mochila sobre intervalos).
- **Páginas:**
  - Portada y optimizador `/vacaciones`.
  - 19 comunidades más 52 capitales: `/calendario-laboral-2027/...`, `.ics` en `/ics/<slug>.ics` e impresión en `/imprimir/<slug>`.
  - `/puentes-2027` y una página por puente.
  - Comparadores: `/comparador`, `/dias-laborables-2027`, `/festivos-en-domingo-2027` y `/2026-vs-2027`.
  - Herramientas en el navegador: `/es-festivo-manana`, `/proximo-festivo`, `/parejas`, `/calendario-escolar` y `/festivos-locales`.
  - Guías: `/dias-de-vacaciones`, `/trabajar-en-festivo` y `/trabajar-sabados-y-turnos`.

## Antes de publicar

```bash
npm run build
npm run check:links
npx astro check
```
