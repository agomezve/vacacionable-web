// Ruta: src/lib/festivos.ts
// Lógica común (se usa al generar las páginas y en el navegador): festivos de cada territorio,
// días libres, puentes, días laborables y el optimizador de vacaciones.
// Todas las fechas son cadenas 'AAAA-MM-DD' y se calculan en UTC para no depender de la zona horaria.
import BOE from '../data/festivos-boe.json';
import { COMUNIDADES, ISLAS_CANARIAS, LOCALES, type Comunidad, type FestivosLocales } from '../data/territorios';

export type TipoFestivo = 'nacional' | 'autonomica' | 'insular' | 'local';
export interface Festivo {
  fecha: string;
  nombre: string;
  tipo: TipoFestivo;
}
/** 'lv': libras sábado y domingo. 'ls': trabajas de lunes a sábado y libras el domingo. */
export type Jornada = 'lv' | 'ls';

export const ANIOS = Object.keys(BOE.anios).map(Number);
export const ANIO = 2027;
export const FUENTE_BOE = Object.fromEntries(
  Object.entries(BOE.anios).map(([a, d]) => [Number(a), { id: d.id, url: d.url, notas: d.notas }]),
) as Record<number, { id: string; url: string; notas: string[] }>;

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
export const MESES_NOMBRE = MESES;
export const DIAS_CORTOS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

// ─── Fechas ───────────────────────────────────────────────────────────────────
export const aDate = (f: string) => new Date(`${f}T00:00:00Z`);
export const aIso = (d: Date) => d.toISOString().slice(0, 10);
export const sumarDias = (f: string, n: number) => aIso(new Date(aDate(f).getTime() + n * 86400000));
export const diaSemana = (f: string) => aDate(f).getUTCDay();
export const diasEntre = (a: string, b: string) => Math.round((aDate(b).getTime() - aDate(a).getTime()) / 86400000);
export const diasDelAnio = (anio: number) => {
  const out: string[] = [];
  for (let f = `${anio}-01-01`; f.startsWith(String(anio)); f = sumarDias(f, 1)) out.push(f);
  return out;
};
export const nombreDia = (f: string) => DIAS[diaSemana(f)];
export const nombreMes = (m: number) => MESES[m];
/** 'viernes 26 de marzo' */
export const fmtLargo = (f: string) => `${nombreDia(f)} ${Number(f.slice(8))} de ${MESES[Number(f.slice(5, 7)) - 1]}`;
/** '26 de marzo' */
export const fmtCorto = (f: string) => `${Number(f.slice(8))} de ${MESES[Number(f.slice(5, 7)) - 1]}`;
/** '26 mar' */
export const fmtMini = (f: string) => `${Number(f.slice(8))} ${MESES[Number(f.slice(5, 7)) - 1].slice(0, 3)}`;
export const fmtRango = (a: string, b: string) =>
  a.slice(5, 7) === b.slice(5, 7) ? `del ${Number(a.slice(8))} al ${fmtCorto(b)}` : `del ${fmtCorto(a)} al ${fmtCorto(b)}`;
export const hoyMadrid = () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Madrid' }).format(new Date());

// ─── Territorios ──────────────────────────────────────────────────────────────
export { COMUNIDADES, LOCALES };
export const comunidad = (slug: string) => COMUNIDADES.find((c) => c.slug === slug);
export const localesDe = (slug: string, anio = ANIO): FestivosLocales | undefined =>
  LOCALES.find((l) => l.slug === slug && l.anio === anio);
export const localesDeCapital = (capital: string, anio = ANIO) => LOCALES.find((l) => l.capital === capital && l.anio === anio);

export interface Opciones {
  /** slug de LOCALES (municipio con festivos locales conocidos). */
  municipio?: string;
  /** Isla canaria (nombre tal cual en ISLAS_CANARIAS). */
  isla?: string;
}

/** Festivos de una comunidad en un año (nacionales + autonómicos), más los insulares y locales si se piden. */
export function festivos(slugComunidad: string, anio: number, op: Opciones = {}): Festivo[] {
  const com = comunidad(slugComunidad);
  const datos = (BOE.anios as Record<string, { festivos: Record<string, { fecha: string; nombre: string; codigo: string }[]> }>)[String(anio)];
  if (!com || !datos) return [];
  const col = com.boe.map((b) => datos.festivos[b]).find(Boolean) ?? [];
  const lista: Festivo[] = col.map((f) => ({ fecha: f.fecha, nombre: f.nombre, tipo: f.codigo === '***' ? 'autonomica' : 'nacional' }));
  if (op.isla && com.slug === 'canarias') {
    for (const i of ISLAS_CANARIAS[anio] ?? []) if (i.isla === op.isla) lista.push({ fecha: i.fecha, nombre: `${i.nombre} (${i.isla})`, tipo: 'insular' });
  }
  if (op.municipio) {
    const loc = LOCALES.find((l) => l.slug === op.municipio && l.anio === anio && l.comunidad === com.slug);
    for (const d of loc?.dias ?? []) lista.push({ fecha: d.fecha, nombre: `${d.nombre} (${loc!.municipio})`, tipo: 'local' });
  }
  return lista.sort((a, b) => a.fecha.localeCompare(b.fecha));
}

/** Festivos que son de todas las comunidades y ciudades autónomas. */
export function festivosComunes(anio: number): Festivo[] {
  const listas = COMUNIDADES.map((c) => festivos(c.slug, anio));
  return listas[0].filter((f) => listas.every((l) => l.some((g) => g.fecha === f.fecha)));
}

// ─── Días libres ──────────────────────────────────────────────────────────────
export const esFinde = (f: string, j: Jornada) => {
  const d = diaSemana(f);
  return d === 0 || (j === 'lv' && d === 6);
};

export interface Dia {
  fecha: string;
  libre: boolean;
  finde: boolean;
  festivo?: Festivo;
}

export function calendario(anio: number, lista: Festivo[], j: Jornada = 'lv'): Dia[] {
  const mapa = new Map(lista.map((f) => [f.fecha, f]));
  return diasDelAnio(anio).map((fecha) => {
    const festivo = mapa.get(fecha);
    const finde = esFinde(fecha, j);
    return { fecha, finde, festivo, libre: finde || !!festivo };
  });
}

/** Días laborables por mes (12 valores) y total. */
export function laborables(anio: number, lista: Festivo[], j: Jornada = 'lv') {
  const meses = Array(12).fill(0);
  for (const d of calendario(anio, lista, j)) if (!d.libre) meses[Number(d.fecha.slice(5, 7)) - 1]++;
  return { meses, total: meses.reduce((a, b) => a + b, 0) };
}

/** Cuántos festivos caen en día laborable y cuántos en fin de semana (se «pierden»). */
export function resumenFestivos(lista: Festivo[], j: Jornada = 'lv') {
  const enFinde = lista.filter((f) => esFinde(f.fecha, j));
  return { total: lista.length, laborables: lista.length - enFinde.length, enFinde };
}

// ─── Ventanas de días libres ──────────────────────────────────────────────────
export interface Ventana {
  inicio: string;
  fin: string;
  /** Días seguidos sin trabajar. */
  dias: number;
  /** Días de vacaciones que hay que pedir (laborables dentro de la ventana). */
  pedir: number;
  /** Fechas que hay que pedir. */
  fechasPedir: string[];
  festivos: Festivo[];
}

/**
 * Todas las ventanas «máximas» (el día anterior y el siguiente son laborables) de hasta `maxLargo` días
 * en las que hay que pedir como mucho `maxPedir` días.
 */
export function ventanas(dias: Dia[], maxPedir: number, maxLargo: number, desde = 0): Ventana[] {
  const out: Ventana[] = [];
  const n = dias.length;
  const trabajo = (i: number) => i < 0 || i >= n || !dias[i].libre; // fuera del año cuenta como laborable
  for (let s = Math.max(0, desde); s < n; s++) {
    if (!trabajo(s - 1)) continue;
    let pedir = 0;
    for (let e = s; e < n && e - s + 1 <= maxLargo; e++) {
      if (!dias[e].libre) pedir++;
      if (pedir > maxPedir) break;
      if (!trabajo(e + 1)) continue;
      const tramo = dias.slice(s, e + 1);
      out.push({
        inicio: dias[s].fecha,
        fin: dias[e].fecha,
        dias: e - s + 1,
        pedir,
        fechasPedir: tramo.filter((d) => !d.libre).map((d) => d.fecha),
        festivos: tramo.filter((d) => d.festivo).map((d) => d.festivo!),
      });
    }
  }
  return out;
}

export interface Puente {
  /** Festivos que forman el puente (en días que se trabajaría). */
  festivos: Festivo[];
  /** Sin pedir nada. null si el festivo no da para más que el propio día. */
  gratis: Ventana | null;
  /** Mejores opciones pidiendo días (1, 2, 3…), solo las que compensan. */
  opciones: Ventana[];
}

/** Puentes de una lista de festivos: para cada grupo de festivos cercanos, lo que libras pidiendo 0, 1, 2… días. */
export function puentes(anio: number, lista: Festivo[], j: Jornada = 'lv', maxPedir = 4, maxLargo = 16): Puente[] {
  const dias = calendario(anio, lista, j);
  const utiles = lista.filter((f) => !esFinde(f.fecha, j) && f.fecha.startsWith(String(anio)));
  // Agrupa festivos a 5 días o menos (Año Nuevo y Reyes, Jueves y Viernes Santo, 6 y 8 de diciembre…).
  const grupos: Festivo[][] = [];
  for (const f of utiles) {
    const g = grupos.at(-1);
    if (g && diasEntre(g.at(-1)!.fecha, f.fecha) <= 5) g.push(f);
    else grupos.push([f]);
  }
  const todas = ventanas(dias, maxPedir, maxLargo);
  return grupos.map((g) => {
    const fechas = new Set(g.map((f) => f.fecha));
    const conGrupo = todas.filter((v) => v.festivos.some((f) => fechas.has(f.fecha)));
    const mejor = (p: number) =>
      conGrupo.filter((v) => v.pedir === p).sort((a, b) => b.dias - a.dias || a.inicio.localeCompare(b.inicio))[0];
    const gratis = mejor(0) ?? null;
    const opciones: Ventana[] = [];
    let base = gratis?.dias ?? 1;
    for (let p = 1; p <= maxPedir; p++) {
      const v = mejor(p);
      // Compensa si cada día pedido añade más de un día libre respecto a la opción anterior.
      if (v && v.dias - base >= 2 && v.dias / p >= 2) {
        opciones.push(v);
        base = v.dias;
      }
    }
    return { festivos: g, gratis: gratis && gratis.dias >= 3 ? gratis : null, opciones };
  });
}

/** Rentabilidad de una ventana: días libres por día pedido. */
export const rentabilidad = (v: Ventana) => (v.pedir === 0 ? Infinity : v.dias / v.pedir);

// ─── Optimizador ──────────────────────────────────────────────────────────────
export interface Plan {
  ventanas: Ventana[];
  pedidos: number;
  libres: number;
}

/**
 * Elige ventanas que no se solapan para gastar como mucho `vacaciones` días y conseguir el máximo de días
 * libres seguidos (contando los fines de semana y festivos de cada bloque), en bloques de `minLargo` a `maxLargo`
 * días. Mochila sobre intervalos.
 */
export function optimizar(
  dias: Dia[],
  vacaciones: number,
  { minLargo = 4, maxLargo = 16, desde = 0, bloqueados = new Set<string>() }: { minLargo?: number; maxLargo?: number; desde?: number; bloqueados?: Set<string> } = {},
): Plan {
  const cand = ventanas(dias, Math.min(vacaciones, maxLargo), maxLargo, desde)
    .filter((v) => v.pedir > 0 && v.dias >= minLargo && v.fechasPedir.every((f) => !bloqueados.has(f)))
    .sort((a, b) => a.fin.localeCompare(b.fin));
  const idx = new Map(dias.map((d, i) => [d.fecha, i]));
  const ini = cand.map((v) => idx.get(v.inicio)!);
  const fin = cand.map((v) => idx.get(v.fin)!);
  // prev[k]: número de candidatas que terminan antes de inicio(k) - 1 (debe quedar un laborable entre medias).
  const prev = cand.map((_, k) => {
    let lo = 0, hi = k;
    while (lo < hi) {
      const m = (lo + hi) >> 1;
      if (fin[m] <= ini[k] - 2) lo = m + 1;
      else hi = m;
    }
    return lo;
  });
  const B = vacaciones;
  const n = cand.length;
  const dp: Float64Array[] = Array.from({ length: n + 1 }, () => new Float64Array(B + 1));
  for (let k = 1; k <= n; k++) {
    const v = cand[k - 1];
    for (let b = 0; b <= B; b++) {
      let best = dp[k - 1][b];
      // Desempate: a igualdad de días libres, gastar menos días.
      if (v.pedir <= b) best = Math.max(best, dp[prev[k - 1]][b - v.pedir] + v.dias - v.pedir * 1e-3);
      dp[k][b] = best;
    }
  }
  const elegidas: Ventana[] = [];
  let k = n, b = B;
  while (k > 0) {
    const v = cand[k - 1];
    if (dp[k][b] !== dp[k - 1][b] && v.pedir <= b) {
      elegidas.push(v);
      b -= v.pedir;
      k = prev[k - 1];
    } else k--;
  }
  elegidas.reverse();
  return { ventanas: elegidas, pedidos: elegidas.reduce((s, v) => s + v.pedir, 0), libres: elegidas.reduce((s, v) => s + v.dias, 0) };
}

// ─── Próximo festivo ──────────────────────────────────────────────────────────
export function proximos(slugComunidad: string, desde: string, op: Opciones = {}, cuantos = 3): Festivo[] {
  return ANIOS.flatMap((a) => festivos(slugComunidad, a, op)).filter((f) => f.fecha >= desde).slice(0, cuantos);
}

export const ETIQUETA_TIPO: Record<TipoFestivo, string> = {
  nacional: 'Nacional',
  autonomica: 'Autonómico',
  insular: 'Insular',
  local: 'Local',
};

export type { Comunidad };

/** Nombre con artículo para frases: «la Comunidad de Madrid», «el Principado de Asturias», «Andalucía». */
const ARTICULO: Record<string, string> = {
  asturias: 'el ', baleares: 'las ', madrid: 'la ', murcia: 'la ', navarra: 'la ', 'comunitat-valenciana': 'la ', ceuta: 'la ', melilla: 'la ', 'pais-vasco': 'el ',
};
export const conArticulo = (slug: string) => `${ARTICULO[slug] ?? ''}${comunidad(slug)?.nombre ?? ''}`;
