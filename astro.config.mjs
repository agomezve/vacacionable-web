// @ts-check
// Ruta: astro.config.mjs
import { defineConfig } from 'astro/config';

// Tailwind CSS 4 se integra como plugin de Vite. La antigua integración
// @astrojs/tailwind solo es compatible con Tailwind 3 y Astro <= 5.
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import basePathLinks from './integrations/base-path-links.mjs';
import ogImages from './integrations/og-images.mjs';
import { existsSync, readFileSync } from 'node:fs';

// Las páginas con <meta name="robots" content="noindex…"> no van al sitemap. Se lee el HTML ya
// construido (el sitemap se genera al final del build), así que nunca se desincroniza con las páginas.
/** @param {string} page */
const conNoindex = (page) => {
  const ruta = new URL(page).pathname.replace(/\/$/, '');
  const archivo = new URL(`./dist${ruta || '/index'}.html`, import.meta.url);
  return existsSync(archivo) && /<meta name="robots" content="noindex/.test(readFileSync(archivo, 'utf8'));
};


// https://astro.build/config
export default defineConfig({
  // ─── DOMINIO Y RUTA BASE ────────────────────────────────────────────────────
  // Subdominio propio servido por GitHub Pages (public/CNAME). Si cambias de dominio,
  // actualiza también public/CNAME y la línea "Sitemap:" de public/robots.txt.
  // Para volver a la URL de GitHub Pages: site 'https://agomezve.github.io' y base '/puentes-web'.
  // El resto del código (canónicas, Open Graph, JSON-LD, sitemap y enlaces) se adapta solo.
  site: 'https://vacacionable.iaencrudo.es',
  base: '/',

  // Astro 7 usa por defecto 'jsx', que elimina el espacio de un salto de línea entre
  // texto y enlace ("en la<a>…"). `true` comprime el HTML sin perder espacios visibles.
  compressHTML: true,

  // Sin la barra de herramientas de desarrollo (para que las capturas salgan limpias).
  devToolbar: { enabled: false },

  // URL limpias sin barra final: /calendario-laboral-2027/madrid
  trailingSlash: 'never',
  build: {
    format: 'file',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404') && !page.includes('/imprimir/') && !conNoindex(page),
    }),
    // Imagen Open Graph 1200×630 de cada página (colores de la marca).
    ogImages({ accent: '#a5b4fc', glow: '#312e81' }),
    basePathLinks(),
  ],
});
