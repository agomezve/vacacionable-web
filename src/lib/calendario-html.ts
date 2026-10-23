// Ruta: src/lib/calendario-html.ts
// HTML de un mes de calendario. Lo usan las páginas generadas (set:html) y las herramientas del navegador,
// para que los dos pinten exactamente igual.
import { DIAS_CORTOS, MESES_NOMBRE, diaSemana, sumarDias, fmtLargo, ETIQUETA_TIPO, type Dia } from './festivos';

export type Marca = 'pedir' | 'bloque' | 'escolar' | 'ambos' | 'solo-a' | 'solo-b' | 'hoy';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

/** Clases de cada tipo de día (Tailwind; deben aparecer literalmente aquí para que se generen). */
export const CLASES = {
  base: 'relative flex aspect-square items-center justify-center rounded-lg text-[13px] tabular-nums transition',
  laborable: 'bg-white text-slate-700 ring-1 ring-slate-200',
  finde: 'bg-slate-100 text-slate-400',
  nacional: 'bg-rose-500 font-bold text-white shadow-sm shadow-rose-500/30',
  autonomica: 'bg-amber-400 font-bold text-amber-950 shadow-sm shadow-amber-400/30',
  insular: 'bg-sky-500 font-bold text-white shadow-sm shadow-sky-500/30',
  local: 'bg-sky-500 font-bold text-white shadow-sm shadow-sky-500/30',
  pedir: 'bg-emerald-500 font-bold text-white ring-2 ring-emerald-300 shadow-sm shadow-emerald-500/40',
  bloque: 'outline-2 outline-offset-1 outline-emerald-400',
  escolar: 'outline-2 outline-dashed outline-offset-1 outline-violet-500',
  hoy: 'outline-2 outline-offset-2 outline-indigo-600',
  ambos: 'bg-emerald-500 font-bold text-white shadow-sm shadow-emerald-500/30',
  'solo-a': 'bg-indigo-500 font-bold text-white',
  'solo-b': 'bg-fuchsia-500 font-bold text-white',
} as const;

export function claseDia(d: Dia, marcas: Marca[] = []): string {
  const c: string[] = [CLASES.base];
  const pareja = (['ambos', 'solo-a', 'solo-b'] as const).find((m) => marcas.includes(m));
  if (marcas.includes('pedir')) c.push(CLASES.pedir);
  else if (pareja) c.push(CLASES[pareja]);
  else if (d.festivo) c.push(CLASES[d.festivo.tipo]);
  else if (d.finde) c.push(CLASES.finde);
  else c.push(CLASES.laborable);
  if (marcas.includes('bloque')) c.push(CLASES.bloque);
  if (marcas.includes('escolar')) c.push(CLASES.escolar);
  if (marcas.includes('hoy')) c.push(CLASES.hoy);
  return c.join(' ');
}

export function tituloDia(d: Dia, marcas: Marca[] = []): string {
  const partes = [fmtLargo(d.fecha)];
  if (d.festivo) partes.push(`${d.festivo.nombre} (${ETIQUETA_TIPO[d.festivo.tipo].toLowerCase()})`);
  if (marcas.includes('pedir')) partes.push('pide este día de vacaciones');
  if (marcas.includes('ambos')) partes.push('libráis los dos');
  if (marcas.includes('solo-a')) partes.push('solo libra la persona 1');
  if (marcas.includes('solo-b')) partes.push('solo libra la persona 2');
  return partes.join(' · ');
}

/** Un mes completo. `marcas(fecha)` añade resaltados (días a pedir, bloques…). */
export function mesHtml(dias: Dia[], mes: number, marcas: (f: string) => Marca[] = () => []): string {
  const delMes = dias.filter((d) => Number(d.fecha.slice(5, 7)) === mes + 1);
  if (!delMes.length) return '';
  const hueco = (diaSemana(delMes[0].fecha) + 6) % 7; // lunes = 0
  const celdas = [
    ...Array.from({ length: hueco }, () => '<span aria-hidden="true"></span>'),
    ...delMes.map((d) => {
      const m = marcas(d.fecha);
      return `<span class="${claseDia(d, m)}" title="${esc(tituloDia(d, m))}" data-fecha="${d.fecha}">${Number(d.fecha.slice(8))}</span>`;
    }),
  ];
  const festivosMes = delMes.filter((d) => d.festivo);
  return `<div class="mes rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
  <p class="mb-2 flex items-baseline justify-between text-sm font-bold capitalize text-slate-900">${MESES_NOMBRE[mes]}<span class="text-xs font-medium normal-case text-slate-400">${festivosMes.length ? `${festivosMes.length} festivo${festivosMes.length > 1 ? 's' : ''}` : ''}</span></p>
  <div class="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase text-slate-400">${DIAS_CORTOS.map((d) => `<span>${d}</span>`).join('')}</div>
  <div class="mt-1 grid grid-cols-7 gap-1">${celdas.join('')}</div>
</div>`;
}

export function anioHtml(dias: Dia[], marcas?: (f: string) => Marca[], meses: number[] = [...Array(12).keys()]): string {
  return meses.map((m) => mesHtml(dias, m, marcas)).join('');
}

/** Conjunto de fechas entre dos (incluidas). */
export function rango(inicio: string, fin: string): string[] {
  const out: string[] = [];
  for (let f = inicio; f <= fin; f = sumarDias(f, 1)) out.push(f);
  return out;
}
