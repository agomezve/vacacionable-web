// Ruta: src/data/puentes.ts
// Los puentes de 2027 que tienen página propia. Cada uno agrupa los festivos que caen entre `desde` y `hasta`
// en cada comunidad (así entran los que solo son de algunas, como el Lunes de Pascua o el 16 de agosto).
export interface PuenteFicha {
  slug: string;
  nombre: string;
  desde: string;
  hasta: string;
  /** Entradilla. Solo hechos del calendario del BOE. */
  resumen: string;
}

export const PUENTES_2027: PuenteFicha[] = [
  {
    slug: 'ano-nuevo-y-reyes',
    nombre: 'Año Nuevo y Reyes',
    desde: '2027-01-01',
    hasta: '2027-01-06',
    resumen: 'El 1 de enero cae en viernes y el 6 en miércoles. Pidiendo los días de entre medias se enlaza el comienzo del año entero.',
  },
  {
    slug: 'san-jose',
    nombre: 'San José',
    desde: '2027-03-19',
    hasta: '2027-03-19',
    resumen: 'El 19 de marzo de 2027 es viernes y solo es festivo en algunas comunidades: allí da un fin de semana de tres días sin pedir nada.',
  },
  {
    slug: 'semana-santa',
    nombre: 'Semana Santa',
    desde: '2027-03-25',
    hasta: '2027-03-29',
    resumen: 'Jueves Santo el 25 de marzo, Viernes Santo el 26 y, donde es festivo, Lunes de Pascua el 29.',
  },
  {
    slug: 'mayo',
    nombre: '1 de mayo',
    desde: '2027-05-01',
    hasta: '2027-05-03',
    resumen: 'El Día del Trabajo de 2027 cae en sábado, así que quien libra los fines de semana no gana ningún día.',
  },
  {
    slug: 'agosto',
    nombre: 'Agosto (la Asunción)',
    desde: '2027-08-15',
    hasta: '2027-08-16',
    resumen: 'El 15 de agosto cae en domingo. Varias comunidades lo pasan al lunes 16 y tienen fin de semana largo.',
  },
  {
    slug: '12-de-octubre',
    nombre: '12 de octubre',
    desde: '2027-10-07',
    hasta: '2027-10-12',
    resumen: 'La Fiesta Nacional cae en martes: pidiendo el lunes 11 te quedas cuatro días seguidos.',
  },
  {
    slug: 'todos-los-santos',
    nombre: 'Todos los Santos',
    desde: '2027-11-01',
    hasta: '2027-11-01',
    resumen: 'El 1 de noviembre es lunes: fin de semana de tres días en toda España sin pedir nada.',
  },
  {
    slug: 'diciembre',
    nombre: 'Constitución e Inmaculada',
    desde: '2027-12-06',
    hasta: '2027-12-08',
    resumen: 'El 6 de diciembre es lunes y el 8 miércoles. Con un solo día pedido, el martes 7, libras cinco seguidos.',
  },
  {
    slug: 'navidad',
    nombre: 'Navidad',
    desde: '2027-12-24',
    hasta: '2027-12-27',
    resumen: 'El 25 de diciembre de 2027 cae en sábado y, según el BOE, ninguna comunidad lo pasa al lunes.',
  },
];
