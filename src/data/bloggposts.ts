export interface Bloggpost {
  id: string
  slug: string
  tittel: string
  ingress: string
  innhold: string
  kategori: string
  dato: string
  bilde: string
  featured?: boolean
  lestetid: number
}

export const bloggposts: Bloggpost[] = [
  {
    id: '1',
    slug: 'etterklangstid-kirke',
    tittel: 'Etterklangstid i kirker: Hvorfor det betyr alt',
    ingress: 'Etterklangstiden er den viktigste akustiske parameteren i enhver kirke. Forstaa hva det betyr og hvordan du maaler det riktig.',
    innhold: '<p>INNHOLD KOMMER</p>',
    kategori: 'Kirke',
    dato: '2026-06-15',
    bilde: '/natur-rom.jpg',
    featured: true,
    lestetid: 6,
  },
  {
    id: '2',
    slug: 'absorpsjon-vs-diffusjon',
    tittel: 'Absorpsjon vs. diffusjon: To veier til bedre lyd',
    ingress: 'Skal du absorbere eller diffundere lyden? Laer forskjellen og nar du bar bruke hvilken strategi.',
    innhold: '<p>INNHOLD KOMMER</p>',
    kategori: 'Akustikk',
    dato: '2026-06-01',
    bilde: '/natur-rom.jpg',
    lestetid: 5,
  },
  {
    id: '3',
    slug: 'taletydelighet-sti',
    tittel: 'Taletydelighet (STI): Maal det som virkelig teller',
    ingress: 'STI - Speech Transmission Index - er den mest palitelige metoden for aa maale om talen faktisk nar fram til tilharerne.',
    innhold: '<p>INNHOLD KOMMER</p>',
    kategori: 'Teknikk',
    dato: '2026-05-20',
    bilde: '/natur-rom.jpg',
    lestetid: 7,
  },
]

export const kategorier = ['Alle', 'Akustikk', 'Kirke', 'Kulturhus', 'Teknikk', 'Tips']

export function formatDato(dato: string): string {
  return new Date(dato).toLocaleDateString('nb-NO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
