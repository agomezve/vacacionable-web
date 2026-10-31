// Ruta: src/lib/ics.ts
// Archivos de calendario .ics (Google Calendar, iPhone, Outlook) con eventos de día completo.
import { sumarDias } from './festivos';

export interface Evento {
  inicio: string;
  /** Último día incluido (si falta, el evento dura un día). */
  fin?: string;
  titulo: string;
  descripcion?: string;
}

const txt = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
const fecha = (f: string) => f.replace(/-/g, '');

// Las líneas de más de 75 octetos se parten (RFC 5545).
function plegar(linea: string): string {
  const out: string[] = [];
  let resto = linea;
  while (new TextEncoder().encode(resto).length > 74) {
    let corte = 74;
    while (new TextEncoder().encode(resto.slice(0, corte)).length > 74) corte--;
    out.push(resto.slice(0, corte));
    resto = ` ${resto.slice(corte)}`;
  }
  out.push(resto);
  return out.join('\r\n');
}

export function ics(nombre: string, eventos: Evento[], uidBase = 'vacacionable'): string {
  const sello = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const lineas = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Vacacionable//Festivos//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${txt(nombre)}`,
    'X-WR-TIMEZONE:Europe/Madrid',
    ...eventos.flatMap((e, i) => [
      'BEGIN:VEVENT',
      `UID:${uidBase}-${fecha(e.inicio)}-${i}@vacacionable.iaencrudo.es`,
      `DTSTAMP:${sello}`,
      `DTSTART;VALUE=DATE:${fecha(e.inicio)}`,
      `DTEND;VALUE=DATE:${fecha(sumarDias(e.fin ?? e.inicio, 1))}`,
      `SUMMARY:${txt(e.titulo)}`,
      ...(e.descripcion ? [`DESCRIPTION:${txt(e.descripcion)}`] : []),
      'TRANSP:TRANSPARENT',
      'END:VEVENT',
    ]),
    'END:VCALENDAR',
  ];
  return lineas.map(plegar).join('\r\n') + '\r\n';
}

/** Solo en el navegador: descarga un .ics generado al momento. */
export function descargarIcs(archivo: string, eventos: Evento[]) {
  const blob = new Blob([ics(archivo.replace(/\.ics$/, ''), eventos)], { type: 'text/calendar;charset=utf-8' });
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: archivo });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
