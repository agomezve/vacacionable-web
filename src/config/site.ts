// Ruta: src/config/site.ts
// Fuente única de datos del sitio: nombre, navegación, enlaces legales y datos del titular.
// Cualquier cambio de marca o de ruta se hace aquí.

// Dominio y ruta base: se configuran solo en astro.config.mjs (`site` y `base`).
const SITE_ORIGIN = (import.meta.env.SITE ?? 'https://vacacionable.iaencrudo.es').replace(/\/+$/, '');
/** Ruta base sin barra final: '' en un dominio propio, '/puentes-web' en GitHub Pages. */
export const BASE_PATH = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '');

export const SITE = {
  name: 'Vacacionable',
  /** URL pública del sitio, incluida la ruta base (sin barra final). */
  url: `${SITE_ORIGIN}${BASE_PATH}`,
  locale: 'es_ES',
  lang: 'es',
  tagline: 'Festivos, puentes y vacaciones de 2027 con los datos del BOE',
  /** <title> de la portada (60 caracteres como máximo). */
  homeTitle: 'Puentes y vacaciones 2027: qué días pedir | Vacacionable',
  description:
    'Festivos de 2027 de tu comunidad y tu ciudad según el BOE, todos los puentes y un optimizador que te dice qué días de vacaciones pedir para librar más.',
  year: 2027,
  /**
   * Código de verificación de Google Search Console (método "Etiqueta HTML").
   * Pega solo el valor de content="…". Vacío: no se añade la etiqueta.
   */
  googleSiteVerification: 'VEgHMvTc1woUEyADkY8YfFlDgO5vJnkj9IHhNX_gAlI',
  bingSiteVerification: 'E034624449B5B3E1E75EFD689A3D6A72',
} as const;

/**
 * Datos del titular del sitio (LSSI-CE art. 10). Se muestran en el aviso legal,
 * la política de privacidad y la página de contacto.
 * Si alguno queda vacío, las páginas muestran un aviso "[Pendiente: …]" visible.
 */
export const OWNER = {
  name: 'Aarón Gómez Vera',
  email: 'contacto@aarongomezvera.es',
} as const;

/**
 * Formulario de contacto. Sin `formEndpoint`, el formulario abre el programa de correo
 * del usuario con el mensaje ya redactado (no se envían datos a terceros).
 */
export const CONTACT = {
  formEndpoint: '',
} as const;

/** Fecha de la última revisión de los textos legales. */
export const LEGAL_UPDATED = '23 de octubre de 2026';

/**
 * Google AdSense. Mismo editor que el resto de webs; cada dominio nuevo hay que añadirlo
 * en AdSense > Sitios y esperar la aprobación. Los bloques solo aparecen cuando tienen id.
 */
export const ADSENSE = {
  clientId: 'ca-pub-3004394150242621',
  slots: {
    horizontal: '',
    rectangle: '',
    'in-article': '',
  },
} as const;

export type AdFormat = keyof typeof ADSENSE.slots;

/** true si hay un client id de AdSense con formato válido ("ca-pub-" + 16 dígitos). */
export function isAdSenseEnabled(): boolean {
  return /^ca-pub-\d{16}$/.test(ADSENSE.clientId.trim());
}

/** Canal de YouTube donde enseño cómo construyo estas webs con IA. */
export const CHANNEL = {
  name: 'IA en Crudo',
  url: 'https://www.youtube.com/@iaencrudo',
} as const;

/** Autor real de la web: bloque de autor de las páginas de ciudad y provincia y JSON-LD (Person). */
export const AUTHOR = {
  name: OWNER.name,
  href: '/sobre-mi',
  jobTitle: 'Programador backend',
  initials: 'AG',
  /** Perfiles del autor en otras webs (schema.org sameAs). */
  sameAs: [CHANNEL.url],
  bio: `Soy ${OWNER.name}, programador backend. He construido ${SITE.name} con ayuda de IA y lo cuento en mi canal ${CHANNEL.name}. Los festivos no los escribe ninguna IA: salen tal cual de la resolución del BOE y de los acuerdos de cada ayuntamiento, con su fuente.`,
} as const;

/** Página que explica qué hace la IA, qué reviso yo y de dónde salen los datos. */
export const CONTENT_PROCESS = { href: '/como-hacemos-este-contenido', title: 'Cómo hacemos este contenido' } as const;

/** Nota de transparencia bajo el bloque de autor. */
export const AI_NOTE = `Contenido redactado con ayuda de IA y revisado por ${OWNER.name}.`;

/**
 * Mis webs y el canal. El pie muestra todas menos la actual (`CURRENT_PROJECT`).
 * Las páginas de ciudad y provincia enlazan a las de `CONTEXT_LINKS`.
 */
export const PROJECTS = [
  {
    id: 'finanzas',
    name: 'CapitalPráctico',
    url: 'https://capitalpractico.iaencrudo.es',
    description: 'Calculadoras y guías de finanzas personales',
  },
  {
    id: 'ahorro',
    name: 'AhorroLuz',
    url: 'https://ahorroluz.iaencrudo.es',
    description: 'Calculadoras y guías para pagar menos luz y gas',
  },
  {
    id: 'viajes',
    name: 'ViajaChollo',
    url: 'https://viajachollo.iaencrudo.es',
    description: 'Herramientas y guías para viajar barato',
  },
  {
    id: 'repostabarato',
    name: 'RepostaBarato',
    url: 'https://repostabarato.iaencrudo.es',
    description: 'La gasolinera más barata cerca de ti',
  },
  {
    id: 'vivienda',
    name: 'ViviendaClara',
    url: 'https://viviendaclara.iaencrudo.es',
    description: 'Busca piso según tu presupuesto, con datos oficiales',
  },
  {
    id: 'puentes',
    name: 'Vacacionable',
    url: 'https://vacacionable.iaencrudo.es',
    description: 'Festivos, puentes y vacaciones de 2027',
  },
  {
    id: 'canal',
    name: CHANNEL.name,
    url: CHANNEL.url,
    description: 'Canal de YouTube: cómo hago estas webs con IA',
  },
] as const;

export type ProjectId = (typeof PROJECTS)[number]['id'];
export const CURRENT_PROJECT: ProjectId = 'puentes';

export function getProject(id: ProjectId) {
  return PROJECTS.find((p) => p.id === id)!;
}

/** Enlaces a otras de mis webs al final de las páginas de ciudad y provincia (`path`: ruta en esa web). */
export const CONTEXT_LINKS: readonly { project: ProjectId; path: string; text: string }[] = [
  {
    project: 'viajes',
    path: '/herramientas/buscador-vuelos',
    text: '¿Ya sabes qué puente vas a coger? Busca vuelos para esas fechas en ViajaChollo.',
  },
  {
    project: 'viajes',
    path: '/herramientas/buscador-alojamiento',
    text: 'Busca alojamiento para tu puente en ViajaChollo.',
  },
];

/** Aviso al final de las páginas de ciudad y provincia y en /sobre-mi. */
export const CHANNEL_NOTE = `Mira cómo hice esta web con IA en mi canal ${CHANNEL.name}`;

/**
 * Newsletter. Mientras `formAction` esté vacío, el bloque no se muestra.
 * `provider`: nombre del servicio (p. ej. "Brevo"); se menciona en la política de privacidad.
 * `formAction`: URL a la que el proveedor indica enviar su formulario (método POST, campo "email").
 */
export const NEWSLETTER = {
  provider: '',
  formAction: '',
  title: 'Te aviso cuando se publiquen festivos nuevos',
  text: 'Un correo cuando tu comunidad o tu ayuntamiento publiquen sus festivos. Sin spam: te das de baja con un clic.',
} as const;

export function isNewsletterEnabled(): boolean {
  return NEWSLETTER.formAction.trim() !== '';
}

/**
 * Google Analytics 4 ("G-XXXXXXXXXX"). Vacío: no se carga nada.
 * Con Consent Mode v2 todo empieza denegado; la CMP de Google (AdSense) actualiza el consentimiento.
 */
export const GA4_ID = 'G-FZV26QZ1Q3';

export function isAnalyticsEnabled(): boolean {
  return /^G-[A-Z0-9]+$/.test(GA4_ID.trim());
}

/** Devuelve el valor o un marcador visible "[Pendiente: …]". */
export function pending(value: string, label: string): string {
  return value.trim() !== '' ? value : `[Pendiente: ${label}]`;
}

export function isPending(value: string): boolean {
  return value.trim() === '';
}

export const NAV_LINKS = [
  { href: '/vacaciones', title: 'Optimizador' },
  { href: '/calendario-laboral-2027', title: 'Calendarios' },
  { href: '/puentes-2027', title: 'Puentes' },
  { href: '/es-festivo-manana', title: '¿Es festivo mañana?' },
  { href: '/herramientas', title: 'Todo' },
] as const;

/** Todas las herramientas y páginas de datos, en el orden de /herramientas. `grupo` las agrupa. */
export const HERRAMIENTAS = [
  { href: '/vacaciones', titulo: 'Optimizador de vacaciones', texto: 'Dinos cuántos días tienes y te decimos cuáles pedir para librar más.', icono: 'magia', grupo: 'Planifica' },
  { href: '/puentes-2027', titulo: 'Puentes de 2027', texto: 'Todos los puentes ordenados: cuántos días pides y cuántos libras.', icono: 'puente', grupo: 'Planifica' },
  { href: '/parejas', titulo: 'Vacaciones en pareja', texto: 'Si vivís o trabajáis en comunidades distintas: los días que libráis juntos.', icono: 'pareja', grupo: 'Planifica' },
  { href: '/calendario-escolar', titulo: 'Vacaciones del cole', texto: 'Cuántos días tienes que pedir para cubrir las vacaciones de tus hijos.', icono: 'mochila', grupo: 'Planifica' },
  { href: '/calendario-laboral-2027', titulo: 'Calendario laboral 2027', texto: 'Los festivos de tu comunidad y de tu capital, mes a mes.', icono: 'calendario', grupo: 'Consulta' },
  { href: '/festivos-locales', titulo: 'Festivos locales', texto: 'Busca tu municipio y mira sus dos fiestas locales.', icono: 'pin', grupo: 'Consulta' },
  { href: '/es-festivo-manana', titulo: '¿Es festivo mañana?', texto: 'La respuesta al momento para tu comunidad.', icono: 'pregunta', grupo: 'Consulta' },
  { href: '/proximo-festivo', titulo: 'Cuenta atrás', texto: 'Cuántos días faltan para tu próximo festivo.', icono: 'reloj', grupo: 'Consulta' },
  { href: '/descargar', titulo: 'Calendario para el móvil y PDF', texto: 'Añade los festivos a Google Calendar o al iPhone, o imprímelos.', icono: 'descarga', grupo: 'Consulta' },
  { href: '/comparador', titulo: 'Comparador de comunidades', texto: 'Quién tiene más puentes, más festivos entre semana y más días de trabajo.', icono: 'grafica', grupo: 'Compara' },
  { href: '/dias-laborables-2027', titulo: 'Días laborables 2027', texto: 'Cuántos días se trabajan en tu comunidad, mes a mes.', icono: 'maletin', grupo: 'Compara' },
  { href: '/festivos-en-domingo-2027', titulo: 'Festivos en fin de semana', texto: 'Los que caen en sábado o domingo y qué comunidades los pasan al lunes.', icono: 'sofa', grupo: 'Compara' },
  { href: '/2026-vs-2027', titulo: '2026 frente a 2027', texto: 'Cuántos festivos entre semana ganas o pierdes el año que viene.', icono: 'balanza', grupo: 'Compara' },
  { href: '/dias-de-vacaciones', titulo: '¿Cuántas vacaciones me tocan?', texto: 'Los 30 días naturales del Estatuto, en proporción si entraste a mitad de año.', icono: 'cartera', grupo: 'Tus derechos' },
  { href: '/trabajar-en-festivo', titulo: '¿Me pagan si trabajo un festivo?', texto: 'Lo que dice la ley y dónde mirar tu convenio.', icono: 'recibo', grupo: 'Tus derechos' },
  { href: '/trabajar-sabados-y-turnos', titulo: 'Si trabajas sábados o a turnos', texto: 'Qué pasa con los festivos que caen en tu día de trabajo.', icono: 'turnos', grupo: 'Tus derechos' },
] as const;

export const LEGAL_LINKS = [
  { href: '/aviso-legal', title: 'Aviso legal' },
  { href: '/politica-privacidad', title: 'Política de privacidad' },
  { href: '/politica-cookies', title: 'Política de cookies' },
] as const;

export const SITE_LINKS = [
  { href: '/sobre-mi', title: 'Sobre mí' },
  { href: '/contacto', title: 'Contacto' },
  { href: CONTENT_PROCESS.href, title: CONTENT_PROCESS.title },
] as const;

/** Quita la ruta base de un pathname: '/puentes-web/contacto' → '/contacto'. */
export function stripBase(pathname: string): string {
  if (BASE_PATH && (pathname === BASE_PATH || pathname.startsWith(`${BASE_PATH}/`))) {
    return pathname.slice(BASE_PATH.length) || '/';
  }
  return pathname;
}

/** URL absoluta de una ruta interna ('/contacto'), incluida la ruta base. */
export function absoluteUrl(path: string): string {
  const clean = stripBase(path.startsWith('/') ? path : `/${path}`);
  return `${SITE.url}${clean}`;
}
