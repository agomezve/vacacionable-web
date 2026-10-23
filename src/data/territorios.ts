// Ruta: src/data/territorios.ts
// Comunidades autónomas (con el nombre exacto de su columna en la tabla del BOE), sus capitales de
// provincia y las fiestas insulares de Canarias (nota 1 de la resolución del BOE).

export interface Capital {
  slug: string;
  nombre: string;
  provincia: string;
  /** Solo Canarias: isla cuya fiesta insular se aplica. */
  isla?: string;
}

export interface Comunidad {
  slug: string;
  nombre: string;
  /** Nombre corto para tablas. */
  corto: string;
  /** Columna de la tabla del BOE. 2026 y 2027 escriben Madrid distinto. */
  boe: string[];
  capitales: Capital[];
}

const c = (slug: string, nombre: string, provincia = nombre, isla?: string): Capital => ({ slug, nombre, provincia, isla });

export const COMUNIDADES: Comunidad[] = [
  {
    slug: 'andalucia', nombre: 'Andalucía', corto: 'Andalucía', boe: ['Andalucía'],
    capitales: [c('almeria', 'Almería'), c('cadiz', 'Cádiz'), c('cordoba', 'Córdoba'), c('granada', 'Granada'), c('huelva', 'Huelva'), c('jaen', 'Jaén'), c('malaga', 'Málaga'), c('sevilla', 'Sevilla')],
  },
  { slug: 'aragon', nombre: 'Aragón', corto: 'Aragón', boe: ['Aragón'], capitales: [c('huesca', 'Huesca'), c('teruel', 'Teruel'), c('zaragoza', 'Zaragoza')] },
  { slug: 'asturias', nombre: 'Principado de Asturias', corto: 'Asturias', boe: ['Asturias'], capitales: [c('oviedo', 'Oviedo', 'Asturias')] },
  { slug: 'baleares', nombre: 'Illes Balears', corto: 'Baleares', boe: ['Illes Balears'], capitales: [c('palma', 'Palma', 'Illes Balears')] },
  {
    slug: 'canarias', nombre: 'Canarias', corto: 'Canarias', boe: ['Canarias'],
    capitales: [c('las-palmas-de-gran-canaria', 'Las Palmas de Gran Canaria', 'Las Palmas', 'Gran Canaria'), c('santa-cruz-de-tenerife', 'Santa Cruz de Tenerife', 'Santa Cruz de Tenerife', 'Tenerife')],
  },
  { slug: 'cantabria', nombre: 'Cantabria', corto: 'Cantabria', boe: ['Cantabria'], capitales: [c('santander', 'Santander', 'Cantabria')] },
  {
    slug: 'castilla-la-mancha', nombre: 'Castilla-La Mancha', corto: 'C.-La Mancha', boe: ['Castilla-La Mancha'],
    capitales: [c('albacete', 'Albacete'), c('ciudad-real', 'Ciudad Real'), c('cuenca', 'Cuenca'), c('guadalajara', 'Guadalajara'), c('toledo', 'Toledo')],
  },
  {
    slug: 'castilla-y-leon', nombre: 'Castilla y León', corto: 'C. y León', boe: ['Castilla y León'],
    capitales: [c('avila', 'Ávila'), c('burgos', 'Burgos'), c('leon', 'León'), c('palencia', 'Palencia'), c('salamanca', 'Salamanca'), c('segovia', 'Segovia'), c('soria', 'Soria'), c('valladolid', 'Valladolid'), c('zamora', 'Zamora')],
  },
  { slug: 'cataluna', nombre: 'Cataluña', corto: 'Cataluña', boe: ['Cataluña'], capitales: [c('barcelona', 'Barcelona'), c('girona', 'Girona'), c('lleida', 'Lleida'), c('tarragona', 'Tarragona')] },
  { slug: 'extremadura', nombre: 'Extremadura', corto: 'Extremadura', boe: ['Extremadura'], capitales: [c('badajoz', 'Badajoz'), c('caceres', 'Cáceres')] },
  { slug: 'galicia', nombre: 'Galicia', corto: 'Galicia', boe: ['Galicia'], capitales: [c('a-coruna', 'A Coruña'), c('lugo', 'Lugo'), c('ourense', 'Ourense'), c('pontevedra', 'Pontevedra')] },
  { slug: 'madrid', nombre: 'Comunidad de Madrid', corto: 'Madrid', boe: ['Com. de Madrid', 'Com. Madrid'], capitales: [c('madrid-capital', 'Madrid', 'Madrid')] },
  { slug: 'murcia', nombre: 'Región de Murcia', corto: 'Murcia', boe: ['Región Murcia'], capitales: [c('murcia-capital', 'Murcia', 'Murcia')] },
  { slug: 'navarra', nombre: 'Comunidad Foral de Navarra', corto: 'Navarra', boe: ['C. Foral Navarra'], capitales: [c('pamplona', 'Pamplona', 'Navarra')] },
  {
    slug: 'pais-vasco', nombre: 'País Vasco', corto: 'País Vasco', boe: ['País Vasco'],
    capitales: [c('vitoria-gasteiz', 'Vitoria-Gasteiz', 'Álava'), c('bilbao', 'Bilbao', 'Bizkaia'), c('donostia-san-sebastian', 'Donostia / San Sebastián', 'Gipuzkoa')],
  },
  { slug: 'la-rioja', nombre: 'La Rioja', corto: 'La Rioja', boe: ['La Rioja'], capitales: [c('logrono', 'Logroño', 'La Rioja')] },
  {
    slug: 'comunitat-valenciana', nombre: 'Comunitat Valenciana', corto: 'C. Valenciana', boe: ['Comunitat Valenciana'],
    capitales: [c('alicante', 'Alicante'), c('castellon-de-la-plana', 'Castellón de la Plana', 'Castellón'), c('valencia-capital', 'Valencia', 'Valencia')],
  },
  { slug: 'ceuta', nombre: 'Ciudad de Ceuta', corto: 'Ceuta', boe: ['Ciudad de Ceuta'], capitales: [c('ceuta-ciudad', 'Ceuta', 'Ceuta')] },
  { slug: 'melilla', nombre: 'Ciudad de Melilla', corto: 'Melilla', boe: ['Ciudad de Melilla'], capitales: [c('melilla-ciudad', 'Melilla', 'Melilla')] },
];

/** Fiestas insulares de Canarias, copiadas de la nota 1 de cada resolución del BOE. */
export const ISLAS_CANARIAS: Record<number, { isla: string; fecha: string; nombre: string }[]> = {
  2026: [
    { isla: 'El Hierro', fecha: '2026-09-24', nombre: 'Nuestra Señora de los Reyes' },
    { isla: 'Fuerteventura', fecha: '2026-09-18', nombre: 'Nuestra Señora de la Peña' },
    { isla: 'Gran Canaria', fecha: '2026-09-08', nombre: 'Nuestra Señora del Pino' },
    { isla: 'La Gomera', fecha: '2026-10-05', nombre: 'Nuestra Señora de Guadalupe' },
    { isla: 'La Palma', fecha: '2026-08-05', nombre: 'Nuestra Señora de Las Nieves' },
    { isla: 'Lanzarote y La Graciosa', fecha: '2026-09-15', nombre: 'Nuestra Señora de los Volcanes' },
    { isla: 'Tenerife', fecha: '2026-02-02', nombre: 'Virgen de la Candelaria' },
  ],
  2027: [
    { isla: 'El Hierro', fecha: '2027-09-24', nombre: 'Nuestra Señora de los Reyes' },
    { isla: 'Fuerteventura', fecha: '2027-09-17', nombre: 'Nuestra Señora de la Peña' },
    { isla: 'Gran Canaria', fecha: '2027-09-08', nombre: 'Nuestra Señora del Pino' },
    { isla: 'La Gomera', fecha: '2027-10-04', nombre: 'Nuestra Señora de Guadalupe' },
    { isla: 'La Palma', fecha: '2027-08-05', nombre: 'Nuestra Señora de Las Nieves' },
    { isla: 'Lanzarote y La Graciosa', fecha: '2027-09-15', nombre: 'Nuestra Señora de los Volcanes' },
    { isla: 'Tenerife', fecha: '2027-02-02', nombre: 'Virgen de la Candelaria' },
  ],
};

export type EstadoLocal = 'boletin' | 'pleno';

export interface FestivosLocales {
  municipio: string;
  slug: string;
  comunidad: string;
  /** Si es capital de provincia, su slug en COMUNIDADES[].capitales. */
  capital?: string;
  anio: number;
  estado: EstadoLocal;
  dias: { fecha: string; nombre: string }[];
  fuente: { texto: string; url: string };
}

/**
 * Festivos locales de 2027 que ya están aprobados. Solo se añaden con fuente.
 * 'pleno': aprobados por el pleno del ayuntamiento y pendientes de publicarse en el boletín oficial.
 * 'boletin': ya publicados en el boletín oficial de la comunidad o de la provincia.
 * Si un municipio no está aquí, la web dice que aún no tenemos sus festivos locales.
 */
export const LOCALES: FestivosLocales[] = [
  {
    municipio: 'Sevilla', slug: 'sevilla', comunidad: 'andalucia', capital: 'sevilla', anio: 2027, estado: 'pleno',
    dias: [{ fecha: '2027-04-14', nombre: 'Feria de Abril' }, { fecha: '2027-05-27', nombre: 'Corpus Christi' }],
    fuente: { texto: 'Andalucía Información, 18-jun-2026: el Pleno aprueba el 14 de abril y el 27 de mayo', url: 'https://www.andaluciainformacion.es/articulo/sevilla/andalucia-sevilla-pleno-aprueba-14-abril-27-mayo-2027-como-fiestas-locales-feria-corpus/202606181342263406253.html' },
  },
  {
    municipio: 'Málaga', slug: 'malaga', comunidad: 'andalucia', capital: 'malaga', anio: 2027, estado: 'pleno',
    dias: [{ fecha: '2027-08-19', nombre: 'Incorporación de Málaga a la Corona de Castilla' }, { fecha: '2027-09-08', nombre: 'Virgen de la Victoria' }],
    fuente: { texto: 'Andalucía Información, 28-may-2026: el Pleno aprueba las fiestas locales de 2027', url: 'https://www.andaluciainformacion.es/articulo/malaga-local/son-fechas/202605281648373393703.html' },
  },
  {
    municipio: 'Alicante', slug: 'alicante', comunidad: 'comunitat-valenciana', capital: 'alicante', anio: 2027, estado: 'pleno',
    dias: [{ fecha: '2027-04-08', nombre: 'Santa Faz' }, { fecha: '2027-06-24', nombre: 'San Juan' }],
    fuente: { texto: 'TodoAlicante, 30-jul-2026: los dos festivos locales de Alicante en 2027', url: 'https://www.todoalicante.es/alicante-ciudad/alicante-dos-festivos-locales-20260730142738-nt.html' },
  },
  {
    municipio: 'Leganés', slug: 'leganes', comunidad: 'madrid', anio: 2027, estado: 'pleno',
    dias: [{ fecha: '2027-08-14', nombre: 'Fiesta local' }, { fecha: '2027-10-11', nombre: 'Fiesta local' }],
    fuente: { texto: 'El Iceberg de Madrid: el Pleno de Leganés aprueba el 14 de agosto y el 11 de octubre', url: 'https://www.elicebergdemadrid.com/sur/el-pleno-de-leganes-aprueba-el-14-de-agosto-y-el-11-de-octubre-como-festivos-locales-para-2027/' },
  },
  {
    municipio: 'San Sebastián de los Reyes', slug: 'san-sebastian-de-los-reyes', comunidad: 'madrid', anio: 2027, estado: 'pleno',
    dias: [{ fecha: '2027-01-20', nombre: 'Fiesta local' }, { fecha: '2027-08-28', nombre: 'Fiesta local' }],
    fuente: { texto: 'Informados: San Sebastián de los Reyes fija sus festivos locales para 2027', url: 'https://informados.es/tribunas/tribuna-de-sanse/san-sebastian-de-los-reyes-fija-sus-festivos-locales-para-2027/' },
  },
  {
    municipio: 'Alcoy', slug: 'alcoy', comunidad: 'comunitat-valenciana', anio: 2027, estado: 'pleno',
    dias: [{ fecha: '2027-04-24', nombre: 'Moros y Cristianos' }, { fecha: '2027-04-26', nombre: 'Moros y Cristianos' }],
    fuente: { texto: 'Ayuntamiento de Alcoy: el Pleno extraordinario aprueba los festivos locales para 2027', url: 'https://www.alcoi.org/es/portal/noticias2026/noticia_0323.html' },
  },
  {
    municipio: 'Alcázar de San Juan', slug: 'alcazar-de-san-juan', comunidad: 'castilla-la-mancha', anio: 2027, estado: 'pleno',
    dias: [{ fecha: '2027-05-15', nombre: 'San Isidro' }, { fecha: '2027-09-08', nombre: 'Fiesta local' }],
    fuente: { texto: 'El Semanal de La Mancha: el Pleno de Alcázar aprueba las fiestas locales de 2027', url: 'https://www.elsemanaldelamancha.com/articulo/alcazar-de-san-juan/pleno-alcazar-aprueba-fiestas-locales-2027-rechazo-equo-iu/20260728194428252978.html' },
  },
  {
    municipio: 'Cariñena', slug: 'carinena', comunidad: 'aragon', anio: 2027, estado: 'pleno',
    dias: [{ fecha: '2027-01-29', nombre: 'San Valero' }, { fecha: '2027-09-14', nombre: 'Santo Cristo de Santiago' }],
    fuente: { texto: 'Ayuntamiento de Cariñena: aprobadas las fiestas locales de 2027', url: 'https://carinena.es/festivos-locales-2027/' },
  },
];
