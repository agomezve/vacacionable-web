// Ruta: src/lib/territorio.ts
// Resuelve un slug de comunidad o de capital (son únicos entre sí) en sus festivos, para las fichas, los .ics y la impresión.
import { ANIO, COMUNIDADES, festivos, localesDeCapital, conArticulo, type Festivo, type Opciones } from './festivos';
import type { Capital, Comunidad, FestivosLocales } from '../data/territorios';

export interface Territorio {
  slug: string;
  comunidad: Comunidad;
  capital?: Capital;
  locales?: FestivosLocales;
  op: Opciones;
  /** «Comunidad de Madrid» o «Sevilla». */
  nombre: string;
  /** «la Comunidad de Madrid» o «Sevilla». */
  nombreFrase: string;
  /** Ruta de su ficha. */
  ruta: string;
}

export function territorios(): Territorio[] {
  return COMUNIDADES.flatMap((c) => [territorio(c.slug)!, ...c.capitales.map((k) => territorio(k.slug)!)]);
}

export function territorio(slug: string, anio = ANIO): Territorio | undefined {
  const com = COMUNIDADES.find((c) => c.slug === slug);
  if (com) return { slug, comunidad: com, op: {}, nombre: com.nombre, nombreFrase: conArticulo(com.slug), ruta: `/calendario-laboral-2027/${com.slug}` };
  for (const c of COMUNIDADES) {
    const capital = c.capitales.find((k) => k.slug === slug);
    if (!capital) continue;
    const locales = localesDeCapital(capital.slug, anio);
    return {
      slug,
      comunidad: c,
      capital,
      locales,
      op: { municipio: locales?.slug, isla: capital.isla },
      nombre: capital.nombre,
      nombreFrase: capital.nombre,
      ruta: `/calendario-laboral-2027/${c.slug}/${capital.slug}`,
    };
  }
}

export const festivosDe = (t: Territorio, anio = ANIO): Festivo[] => festivos(t.comunidad.slug, anio, t.op);

/** El primer texto que cabe en [min, max] caracteres (títulos y descripciones SEO); si ninguno, el más cercano. */
export function cabe(opciones: string[], min: number, max: number): string {
  return opciones.find((o) => o.length >= min && o.length <= max) ?? opciones.find((o) => o.length <= max) ?? opciones.at(-1)!;
}
