// Ruta: src/pages/ics/[slug].ics.ts
// Idea 8: calendario de festivos para Google Calendar, iPhone y Outlook, por comunidad y por capital.
import type { APIRoute } from 'astro';
import { ANIO } from '../../lib/festivos';
import { territorios, territorio, festivosDe } from '../../lib/territorio';
import { ics } from '../../lib/ics';

export function getStaticPaths() {
  return territorios().map((t) => ({ params: { slug: t.slug } }));
}

export const GET: APIRoute = ({ params }) => {
  const t = territorio(params.slug!)!;
  const cuerpo = ics(
    `Festivos ${ANIO} ${t.nombre}`,
    festivosDe(t).map((f) => ({ inicio: f.fecha, titulo: `🎉 ${f.nombre}`, descripcion: 'Festivo según Vacacionable (vacacionable.aarongomezvera.es)' })),
    `festivos-${t.slug}`,
  );
  return new Response(cuerpo, { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
};
