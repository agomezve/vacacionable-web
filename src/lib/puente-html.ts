// Ruta: src/lib/puente-html.ts
// Tarjeta de un puente en HTML, la misma en las páginas generadas y en las herramientas del navegador.
import { fmtLargo, fmtRango, fmtMini, nombreDia, type Puente, type Festivo } from './festivos';
import type { PuenteFicha } from '../data/puentes';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

export function puenteHtml(p: Puente, retraso = 0): string {
  const mejor = p.opciones.at(-1) ?? p.gratis;
  const li = (chip: string, color: string, fondo: string, texto: string) =>
    `<li class="flex items-start gap-2 rounded-xl ${fondo} p-2.5"><span class="mt-0.5 inline-flex h-5 shrink-0 items-center rounded-full ${color} px-2 text-[11px] font-bold text-white">${chip}</span><span>${texto}</span></li>`;
  const filas = [
    p.gratis ? li('0', 'bg-slate-700', 'bg-slate-50', `<strong>${p.gratis.dias} días libres</strong> sin pedir nada, ${fmtRango(p.gratis.inicio, p.gratis.fin)}.`) : '',
    ...p.opciones.map((o) =>
      li(`+${o.pedir}`, 'bg-emerald-600', 'bg-emerald-50', `Pide <strong>${o.fechasPedir.map((f) => `${nombreDia(f).slice(0, 3)} ${fmtMini(f)}`).join(', ')}</strong> y libras <strong>${o.dias} días</strong>, ${fmtRango(o.inicio, o.fin)}.`),
    ),
    !p.gratis && !p.opciones.length ? '<li class="rounded-xl bg-slate-50 p-2.5 text-slate-600">Un día suelto: no hay un puente que compense.</li>' : '',
  ].join('');
  return `<article class="salta flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg" style="animation-delay:${retraso}ms">
  <div class="flex items-start justify-between gap-3">
    <div>
      <p class="text-xs font-bold uppercase tracking-wide text-indigo-600">${p.festivos.map((f) => fmtMini(f.fecha)).join(' · ')}</p>
      <h3 class="mt-1 font-bold leading-snug text-slate-900">${esc(p.festivos.map((f) => f.nombre).join(' y '))}</h3>
      <p class="mt-0.5 text-sm text-slate-500">${p.festivos.map((f) => fmtLargo(f.fecha)).join(' y ')}</p>
    </div>
    ${mejor ? `<span class="shrink-0 rounded-2xl bg-indigo-600 px-3 py-1.5 text-center text-white"><span class="block text-2xl font-extrabold leading-none">${mejor.dias}</span><span class="text-[10px] uppercase">días</span></span>` : ''}
  </div>
  <ul class="mt-4 space-y-2 text-sm">${filas}</ul>
</article>`;
}

/** El puente de una ficha (Semana Santa, diciembre…) dentro de los puentes de un territorio. */
export const puenteDe = (ficha: PuenteFicha, lista: Puente[]) =>
  lista.find((p) => p.festivos.some((f: Festivo) => f.fecha >= ficha.desde && f.fecha <= ficha.hasta));
