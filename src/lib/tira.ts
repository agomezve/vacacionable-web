// Ruta: src/lib/tira.ts
// Tira del año de la portada: un cuadradito por día, por columnas de semana (lunes arriba).
import { diaSemana, fmtLargo, type Dia } from './festivos';

const COLOR = {
  laborable: 'bg-slate-200',
  finde: 'bg-slate-300/60',
  nacional: 'bg-rose-500',
  autonomica: 'bg-amber-400',
  insular: 'bg-sky-500',
  local: 'bg-sky-500',
  pedir: 'bg-emerald-500',
} as const;

export function tiraHtml(dias: Dia[], pedir: Set<string> = new Set()): string {
  const hueco = (diaSemana(dias[0].fecha) + 6) % 7;
  return [
    ...Array.from({ length: hueco }, () => '<span></span>'),
    ...dias.map((d, i) => {
      const c = pedir.has(d.fecha) ? COLOR.pedir : d.festivo ? COLOR[d.festivo.tipo] : d.finde ? COLOR.finde : COLOR.laborable;
      const t = d.festivo ? `${fmtLargo(d.fecha)}: ${d.festivo.nombre}` : pedir.has(d.fecha) ? `${fmtLargo(d.fecha)}: pide este día` : fmtLargo(d.fecha);
      return `<span class="salta aspect-square rounded-[3px] ${c}" style="animation-delay:${i * 2}ms" title="${t.replace(/"/g, '&quot;')}"></span>`;
    }),
  ].join('');
}
