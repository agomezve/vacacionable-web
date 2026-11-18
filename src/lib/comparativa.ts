// Ruta: src/lib/comparativa.ts
// Compara el calendario de una comunidad o capital con el resto de España, solo con los festivos del BOE
// (y las fiestas locales que tenemos con fuente). No hay ninguna cifra escrita a mano: todo sale de festivos.ts.
import { ANIO, COMUNIDADES, festivos, festivosComunes, laborables, resumenFestivos, type Festivo } from './festivos';
import { festivosDe, type Territorio } from './territorio';

export interface Comparativa {
  /** Laborables de la comunidad (sin fiestas locales) y su puesto entre las 19 (1 = la que más trabaja). */
  laborablesComunidad: number;
  puesto: number;
  /** Cuántas comunidades empatan con ese mismo número. */
  empatadas: number;
  total: number;
  media: number;
  minimo: number;
  maximo: number;
  /** Festivos que caen en fin de semana: los de la comunidad y la media de las 19. */
  enFinde: number;
  mediaEnFinde: number;
  /** Festivos que no tienen todas las comunidades (los propios o compartidos solo con algunas). */
  propios: { festivo: Festivo; comparten: number; faltan: string[] }[];
  /** Cuántas comunidades tienen cada número de laborables (de más a menos). */
  reparto: { dias: number; n: number }[];
  /** Solo en capitales: laborables con sus fiestas locales. */
  laborablesConLocales?: number;
}

const redondear = (n: number) => Math.round(n * 10) / 10;

export function comparativa(t: Territorio, anio = ANIO): Comparativa {
  const porComunidad = COMUNIDADES.map((c) => {
    const lista = festivos(c.slug, anio);
    return { slug: c.slug, lista, lab: laborables(anio, lista).total, finde: resumenFestivos(lista).enFinde.length };
  });
  const yo = porComunidad.find((c) => c.slug === t.comunidad.slug)!;
  const labs = porComunidad.map((c) => c.lab);
  const comunes = new Set(festivosComunes(anio).map((f) => f.fecha));
  const propios = yo.lista
    .filter((f) => !comunes.has(f.fecha))
    .map((festivo) => {
      const sin = porComunidad.filter((c) => !c.lista.some((g) => g.fecha === festivo.fecha));
      return { festivo, comparten: porComunidad.length - sin.length - 1, faltan: sin.map((c) => COMUNIDADES.find((k) => k.slug === c.slug)!.corto) };
    });
  const reparto = [...new Set(labs)].sort((a, b) => b - a).map((dias) => ({ dias, n: labs.filter((x) => x === dias).length }));

  return {
    laborablesComunidad: yo.lab,
    puesto: labs.filter((n) => n > yo.lab).length + 1,
    empatadas: labs.filter((n) => n === yo.lab).length - 1,
    total: labs.length,
    media: redondear(labs.reduce((a, b) => a + b, 0) / labs.length),
    minimo: Math.min(...labs),
    maximo: Math.max(...labs),
    enFinde: yo.finde,
    mediaEnFinde: redondear(porComunidad.reduce((a, c) => a + c.finde, 0) / porComunidad.length),
    propios,
    reparto,
    laborablesConLocales: t.capital ? laborables(anio, festivosDe(t, anio)).total : undefined,
  };
}

const lista = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} y ${xs.at(-1)}`);

/** Frase de cada festivo que no es de toda España: «solo aquí», «también en otras 4» o «en todas menos Cataluña». */
export function frasePropio(p: Comparativa['propios'][number]): string {
  if (p.comparten === 0) return 'solo aquí';
  if (p.faltan.length <= 3) return `en toda España menos ${lista(p.faltan)}`;
  return p.comparten === 1 ? 'también en otra comunidad' : `también en otras ${p.comparten}`;
}

/** «251 días: 16 comunidades tienen 251 y 3 tienen 252». */
export const fraseReparto = (c: Comparativa) =>
  lista(c.reparto.map((r) => `${r.n} ${r.n === 1 ? 'tiene' : 'tienen'} ${r.dias}`));

export { lista };

/** «1,5» con coma decimal. */
export const coma = (n: number) => String(n).replace('.', ',');
