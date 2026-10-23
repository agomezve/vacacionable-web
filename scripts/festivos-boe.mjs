// Ruta: scripts/festivos-boe.mjs
// Descarga del BOE la «relación de fiestas laborales» de cada año y la guarda en src/data/festivos-boe.json.
// Uso: node scripts/festivos-boe.mjs   (solo hace falta cuando el BOE publique un año nuevo)
import { writeFileSync } from 'node:fs';

const RESOLUCIONES = {
  2026: 'BOE-A-2025-21667',
  2027: 'BOE-A-2026-21254',
};

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const TIPOS = { '*': 'nacional', '**': 'nacional', '***': 'autonomica' };

const limpiar = (s) =>
  s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&[a-z]+;/g, (e) => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"' })[e] ?? e)
    .replace(/\s+/g, ' ')
    .trim();

async function leer(anio, id) {
  const url = `https://www.boe.es/diario_boe/txt.php?id=${id}`;
  const html = await (await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })).text();
  const filas = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((m) =>
    [...m[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map((c) => limpiar(c[1])),
  );
  // La 2.ª fila trae las 19 columnas (17 comunidades + Ceuta + Melilla).
  const columnas = filas.find((f) => f.length >= 19 && f.some((c) => /Andaluc/.test(c)));
  if (!columnas) throw new Error(`${id}: no encuentro la tabla`);
  const regiones = columnas.map((c) => c.replace(/\s*\(\d+\)$/, ''));
  let mes = -1;
  const festivos = Object.fromEntries(regiones.map((r) => [r, []]));
  for (const fila of filas) {
    if (fila.length !== regiones.length + 1) continue;
    const etiqueta = fila[0];
    const m = MESES.indexOf(etiqueta.toLowerCase());
    if (m >= 0) { mes = m; continue; }
    const d = etiqueta.match(/^(\d{1,2})\s+(.*?)\.?$/);
    if (!d || mes < 0) continue;
    const fecha = `${anio}-${String(mes + 1).padStart(2, '0')}-${d[1].padStart(2, '0')}`;
    fila.slice(1).forEach((marca, i) => {
      if (TIPOS[marca]) festivos[regiones[i]].push({ fecha, nombre: d[2], codigo: marca });
    });
  }
  const notas = [...html.matchAll(/<p class="parrafo[^"]*">([\s\S]*?)<\/p>/g)]
    .map((m) => limpiar(m[1]))
    .filter((t) => /^\d\.\s+En la Comunidad/.test(t));
  return { id, url, regiones, festivos, notas };
}

const salida = { generado: new Date().toISOString().slice(0, 10), anios: {} };
for (const [anio, id] of Object.entries(RESOLUCIONES)) {
  salida.anios[anio] = await leer(Number(anio), id);
  const n = Object.values(salida.anios[anio].festivos).map((l) => l.length);
  console.log(anio, id, 'festivos por región:', n.join(' '));
}
writeFileSync(new URL('../src/data/festivos-boe.json', import.meta.url), JSON.stringify(salida, null, 1));
