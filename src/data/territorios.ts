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
    municipio: 'Almería', slug: 'almeria', comunidad: 'andalucia', capital: 'almeria', anio: 2027, estado: 'boletin',
    dias: [{ fecha: '2027-06-24', nombre: 'Fiesta local' }, { fecha: '2027-08-28', nombre: 'Fiesta local' }],
    fuente: { texto: 'BOJA n.º 210, 29-oct-2026: relación de fiestas locales de 2027 en Andalucía', url: 'https://www.juntadeandalucia.es/boja/2026/210/25' },
  },
  {
    municipio: 'Cádiz', slug: 'cadiz', comunidad: 'andalucia', capital: 'cadiz', anio: 2027, estado: 'boletin',
    dias: [{ fecha: '2027-02-08', nombre: 'Fiesta local' }, { fecha: '2027-10-07', nombre: 'Fiesta local' }],
    fuente: { texto: 'BOJA n.º 210, 29-oct-2026: relación de fiestas locales de 2027 en Andalucía', url: 'https://www.juntadeandalucia.es/boja/2026/210/25' },
  },
  {
    municipio: 'Córdoba', slug: 'cordoba', comunidad: 'andalucia', capital: 'cordoba', anio: 2027, estado: 'boletin',
    dias: [{ fecha: '2027-09-08', nombre: 'Fiesta local' }, { fecha: '2027-10-25', nombre: 'Fiesta local' }],
    fuente: { texto: 'BOJA n.º 210, 29-oct-2026: relación de fiestas locales de 2027 en Andalucía', url: 'https://www.juntadeandalucia.es/boja/2026/210/25' },
  },
  {
    municipio: 'Granada', slug: 'granada', comunidad: 'andalucia', capital: 'granada', anio: 2027, estado: 'boletin',
    dias: [{ fecha: '2027-05-03', nombre: 'Día de la Cruz' }, { fecha: '2027-05-27', nombre: 'Corpus Christi' }],
    fuente: { texto: 'BOJA n.º 210, 29-oct-2026: relación de fiestas locales de 2027 en Andalucía', url: 'https://www.juntadeandalucia.es/boja/2026/210/25' },
  },
  {
    municipio: 'Huelva', slug: 'huelva', comunidad: 'andalucia', capital: 'huelva', anio: 2027, estado: 'boletin',
    dias: [{ fecha: '2027-08-03', nombre: 'Fiesta local' }, { fecha: '2027-09-08', nombre: 'Fiesta local' }],
    fuente: { texto: 'BOJA n.º 210, 29-oct-2026: relación de fiestas locales de 2027 en Andalucía', url: 'https://www.juntadeandalucia.es/boja/2026/210/25' },
  },
  {
    municipio: 'Jaén', slug: 'jaen', comunidad: 'andalucia', capital: 'jaen', anio: 2027, estado: 'boletin',
    dias: [{ fecha: '2027-06-11', nombre: 'Fiesta local' }, { fecha: '2027-10-18', nombre: 'Fiesta local' }],
    fuente: { texto: 'BOJA n.º 210, 29-oct-2026: relación de fiestas locales de 2027 en Andalucía', url: 'https://www.juntadeandalucia.es/boja/2026/210/25' },
  },
  {
    municipio: 'Madrid', slug: 'madrid-capital', comunidad: 'madrid', capital: 'madrid-capital', anio: 2027, estado: 'pleno',
    dias: [{ fecha: '2027-05-15', nombre: 'San Isidro' }, { fecha: '2027-11-09', nombre: 'Virgen de la Almudena' }],
    fuente: { texto: 'elDiario.es, 29-sep-2026: el Pleno de Madrid aprueba San Isidro y la Almudena como festivos de 2027', url: 'https://www.eldiario.es/madrid/somos/ayuntamiento-madrid-aprueba-festivos-locales-2027-caeran-sabado-martes_1_13546052.html' },
  },
  {
    municipio: 'Valencia', slug: 'valencia-capital', comunidad: 'comunitat-valenciana', capital: 'valencia-capital', anio: 2027, estado: 'pleno',
    dias: [{ fecha: '2027-01-22', nombre: 'San Vicente Mártir' }, { fecha: '2027-04-05', nombre: 'San Vicente Ferrer' }],
    fuente: { texto: 'Ayuntamiento de València, 23-jul-2026: el Pleno aprueba los festivos locales de 2027', url: 'https://www.valencia.es/es/-/fiestas-locales-val%C3%A8ncia-2027' },
  },
  {
    municipio: 'Castellón de la Plana', slug: 'castellon-de-la-plana', comunidad: 'comunitat-valenciana', capital: 'castellon-de-la-plana', anio: 2027, estado: 'pleno',
    dias: [{ fecha: '2027-03-01', nombre: 'Lunes de la Magdalena' }, { fecha: '2027-06-29', nombre: 'San Pedro' }],
    fuente: { texto: 'El Periòdic, 16-jul-2026: el Pleno de Castelló fija sus festivos locales de 2027', url: 'https://www.elperiodic.com/val/castellon/castello-fixa-seus-festius-locals-2027-aquestes-dates-triades_1084833' },
  },
  {
    municipio: 'Murcia', slug: 'murcia-capital', comunidad: 'murcia', capital: 'murcia-capital', anio: 2027, estado: 'boletin',
    dias: [{ fecha: '2027-03-30', nombre: 'Bando de la Huerta' }, { fecha: '2027-09-14', nombre: 'Feria de Septiembre' }],
    fuente: { texto: 'Murcianoticias, 4-nov-2026: el BORM publica los festivos locales de 2027 de los 45 municipios', url: 'https://www.murcianoticias.es/laboral/festivos-locales-2027-region-de-murcia-45-municipios-borm/' },
  },
  {
    municipio: 'Las Palmas de Gran Canaria', slug: 'las-palmas-de-gran-canaria', comunidad: 'canarias', capital: 'las-palmas-de-gran-canaria', anio: 2027, estado: 'boletin',
    dias: [{ fecha: '2027-02-09', nombre: 'Martes de Carnaval' }, { fecha: '2027-06-24', nombre: 'Fundación de la ciudad' }],
    fuente: { texto: 'Atlántico Hoy, 21-ago-2026: el BOC publica los festivos locales de 2027 de los 88 municipios', url: 'https://www.atlanticohoy.com/sociedad/canarias-ya-tiene-sus-festivos-locales-2027-consulta-fechas-88-municipios_1565927_102.html' },
  },
  {
    municipio: 'Santa Cruz de Tenerife', slug: 'santa-cruz-de-tenerife', comunidad: 'canarias', capital: 'santa-cruz-de-tenerife', anio: 2027, estado: 'boletin',
    dias: [{ fecha: '2027-02-23', nombre: 'Martes de Carnaval' }, { fecha: '2027-05-03', nombre: 'Día de la Cruz' }],
    fuente: { texto: 'Atlántico Hoy, 21-ago-2026: el BOC publica los festivos locales de 2027 de los 88 municipios', url: 'https://www.atlanticohoy.com/sociedad/canarias-ya-tiene-sus-festivos-locales-2027-consulta-fechas-88-municipios_1565927_102.html' },
  },
  {
    municipio: 'A Coruña', slug: 'a-coruna', comunidad: 'galicia', capital: 'a-coruna', anio: 2027, estado: 'boletin',
    dias: [{ fecha: '2027-02-09', nombre: 'Martes de Carnaval' }, { fecha: '2027-06-24', nombre: 'San Juan' }],
    fuente: { texto: 'DOG, 26-oct-2026: Resolución de 15 de octubre de 2026 con las fiestas locales de 2027 en Galicia', url: 'https://www.xunta.gal/dog/Publicados/2026/20261026/AnuncioG0767-161026-0001_es.html' },
  },
  {
    municipio: 'Lugo', slug: 'lugo', comunidad: 'galicia', capital: 'lugo', anio: 2027, estado: 'boletin',
    dias: [{ fecha: '2027-02-09', nombre: 'Martes de Carnaval' }, { fecha: '2027-10-05', nombre: 'San Froilán' }],
    fuente: { texto: 'DOG, 26-oct-2026: Resolución de 15 de octubre de 2026 con las fiestas locales de 2027 en Galicia', url: 'https://www.xunta.gal/dog/Publicados/2026/20261026/AnuncioG0767-161026-0001_es.html' },
  },
  {
    municipio: 'Ourense', slug: 'ourense', comunidad: 'galicia', capital: 'ourense', anio: 2027, estado: 'boletin',
    dias: [{ fecha: '2027-02-09', nombre: 'Martes de Carnaval' }, { fecha: '2027-11-11', nombre: 'San Martín' }],
    fuente: { texto: 'DOG, 26-oct-2026: Resolución de 15 de octubre de 2026 con las fiestas locales de 2027 en Galicia', url: 'https://www.xunta.gal/dog/Publicados/2026/20261026/AnuncioG0767-161026-0001_es.html' },
  },
  {
    municipio: 'Pontevedra', slug: 'pontevedra', comunidad: 'galicia', capital: 'pontevedra', anio: 2027, estado: 'boletin',
    dias: [{ fecha: '2027-02-10', nombre: 'Miércoles de Ceniza' }, { fecha: '2027-03-29', nombre: 'San Cibrán' }],
    fuente: { texto: 'DOG, 26-oct-2026: Resolución de 15 de octubre de 2026 con las fiestas locales de 2027 en Galicia', url: 'https://www.xunta.gal/dog/Publicados/2026/20261026/AnuncioG0767-161026-0001_es.html' },
  },
  {
    municipio: 'Badajoz', slug: 'badajoz', comunidad: 'extremadura', capital: 'badajoz', anio: 2027, estado: 'boletin',
    dias: [{ fecha: '2027-02-09', nombre: 'Fiesta local' }, { fecha: '2027-06-24', nombre: 'Fiesta local' }],
    fuente: { texto: 'DOE, 27-oct-2026: fiestas locales de 2027 en Extremadura', url: 'https://doe.juntaex.es/pdfs/doe/2026/2070o/26062650.pdf' },
  },
  {
    municipio: 'Cáceres', slug: 'caceres', comunidad: 'extremadura', capital: 'caceres', anio: 2027, estado: 'boletin',
    dias: [{ fecha: '2027-04-23', nombre: 'Fiesta local' }, { fecha: '2027-05-28', nombre: 'Fiesta local' }],
    fuente: { texto: 'DOE, 27-oct-2026: fiestas locales de 2027 en Extremadura', url: 'https://doe.juntaex.es/pdfs/doe/2026/2070o/26062650.pdf' },
  },
  {
    municipio: 'León', slug: 'leon', comunidad: 'castilla-y-leon', capital: 'leon', anio: 2027, estado: 'pleno',
    dias: [{ fecha: '2027-06-24', nombre: 'San Juan' }, { fecha: '2027-10-05', nombre: 'San Froilán' }],
    fuente: { texto: 'Diario de León, 29-may-2026: el Pleno aprueba San Juan y San Froilán como fiestas locales de 2027', url: 'https://www.diariodeleon.es/leon/260529/2086548/leon-sumara-puentes-calendario-festivo-2027.html' },
  },
  {
    municipio: 'Burgos', slug: 'burgos', comunidad: 'castilla-y-leon', capital: 'burgos', anio: 2027, estado: 'pleno',
    dias: [{ fecha: '2027-06-04', nombre: 'Curpillos' }, { fecha: '2027-06-29', nombre: 'San Pedro y San Pablo' }],
    fuente: { texto: 'El Correo de Burgos, 10-sep-2026: la Junta de Gobierno aprueba los festivos locales de 2027', url: 'https://www.elcorreodeburgos.com/burgos/260910/245529/curpillos-2027-fecha-4-junio-festivo-san-pedro-cae-martes.html' },
  },
  {
    municipio: 'Valladolid', slug: 'valladolid', comunidad: 'castilla-y-leon', capital: 'valladolid', anio: 2027, estado: 'boletin',
    dias: [{ fecha: '2027-05-13', nombre: 'San Pedro Regalado' }, { fecha: '2027-09-08', nombre: 'Virgen de San Lorenzo' }],
    fuente: { texto: 'BOP de Valladolid, 23-oct-2026: Resolución de la Oficina Territorial de Trabajo con las fiestas locales de 2027', url: 'https://bop.sede.diputaciondevalladolid.es/boletines/2026/octubre/23/BOPVA-A-2026-03085.pdf' },
  },
  {
    municipio: 'Salamanca', slug: 'salamanca', comunidad: 'castilla-y-leon', capital: 'salamanca', anio: 2027, estado: 'boletin',
    dias: [{ fecha: '2027-06-12', nombre: 'San Juan de Sahagún' }, { fecha: '2027-09-08', nombre: 'Virgen de la Vega' }],
    fuente: { texto: 'BOP de Salamanca n.º 129, 8-jul-2026: fiestas locales de 2027 (Oficina Territorial de Trabajo)', url: 'https://sede.diputaciondesalamanca.gob.es/documentacion/bop/2026/20260708/BOP-SA-20260708-001.pdf' },
  },
  {
    municipio: 'Sevilla', slug: 'sevilla', comunidad: 'andalucia', capital: 'sevilla', anio: 2027, estado: 'boletin',
    dias: [{ fecha: '2027-04-14', nombre: 'Feria de Abril' }, { fecha: '2027-05-27', nombre: 'Corpus Christi' }],
    fuente: { texto: 'BOJA n.º 210, 29-oct-2026: relación de fiestas locales de 2027 en Andalucía', url: 'https://www.juntadeandalucia.es/boja/2026/210/25' },
  },
  {
    municipio: 'Málaga', slug: 'malaga', comunidad: 'andalucia', capital: 'malaga', anio: 2027, estado: 'boletin',
    dias: [{ fecha: '2027-08-19', nombre: 'Incorporación de Málaga a la Corona de Castilla' }, { fecha: '2027-09-08', nombre: 'Virgen de la Victoria' }],
    fuente: { texto: 'BOJA n.º 210, 29-oct-2026: relación de fiestas locales de 2027 en Andalucía', url: 'https://www.juntadeandalucia.es/boja/2026/210/25' },
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
