import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  GraduationCap,
  MapPin,
  Mic,
  PlayCircle,
  ShieldCheck,
  Users,
  Wrench,
} from 'lucide-react'

const modules = [
  {
    number: '1',
    title: 'Slik går lyden',
    description: 'Fra stemme og mikrofon til mikser, høyttalere, hørselshjelpemidler og strømming.',
    icon: PlayCircle,
  },
  {
    number: '2',
    title: 'Før dørene åpnes',
    description: 'Riktig profil, batterier, taletest, avspilling og de viktigste kontrollpunktene.',
    icon: CheckCircle2,
  },
  {
    number: '3',
    title: 'Mikrofonen først',
    description: 'Avstand, retning og trygg bruk av håndholdt mikrofon, mygg, bøyle og lesepult.',
    icon: Mic,
  },
  {
    number: '4',
    title: 'Trygg normaldrift',
    description: 'Gudstjeneste, gravferd, vielse og dåp – med tydelige roller og gode overganger.',
    icon: ShieldCheck,
  },
  {
    number: '5',
    title: 'Fem vanlige feil',
    description: 'Ingen lyd, svak lyd, hyling, støy og trådløs mikrofon uten signal.',
    icon: Wrench,
  },
  {
    number: '6',
    title: 'Etter bruk og ansvar',
    description: 'Avslutning, lading, enkel feillogg og hva som ikke skal endres uten systemansvarlig.',
    icon: GraduationCap,
  },
]

const included = [
  'Én A4-sjekkliste før gudstjenesten',
  'Beslutningstre for fem vanlige feil',
  'Laminert romkort med QR-kode til kurset',
  'Enkel feillogg og årlig egenkontroll',
  'Kort kunnskapstest med situasjonsoppgaver',
]

export default function Course() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen bg-dark text-cream">
      <Helmet>
        <title>Lydkurs for kirketjenere | Trygg lyd i kirken</title>
        <meta
          name="description"
          content="Praktisk grunnleggende kurs i mikrofonbruk, trygg normaldrift og enkel feilsøking for kirketjenere, vikarer og frivillige."
        />
        <link rel="canonical" href="https://danbolt.no/kurs/trygg-lyd-i-kirken" />
        <meta property="og:title" content="Trygg lyd i kirken | Grunnleggende kurs for kirketjenere" />
        <meta
          property="og:description"
          content="Lær å klargjøre lydanlegget, bruke mikrofonene bedre og løse de vanligste feilene – uten å måtte være lydtekniker."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://danbolt.no/kurs/trygg-lyd-i-kirken" />
        <meta property="og:locale" content="nb_NO" />
      </Helmet>

      <section className="relative pt-32 lg:pt-40 pb-24 lg:pb-32 overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[760px] h-[760px] bg-copper/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-cream/50 hover:text-copper-light transition-colors"
            >
              <ArrowLeft size={15} />
              Tilbake til forsiden
            </Link>
            <Link
              to="/lyd-i-kirken"
              className="inline-flex items-center gap-2 text-sm text-copper-light hover:text-cream transition-colors"
            >
              Se helheten for lyd i kirken
              <ArrowRight size={15} />
            </Link>
          </div>
          <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Grunnleggende kurs for kirketjenere
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-cream mb-7 leading-tight">
            Trygg lyd
            <br />
            <span className="text-gradient-copper">når det gjelder</span>
          </h1>
          <p className="text-cream/60 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Lær å starte lydanlegget riktig, bruke mikrofonene bedre og løse de
            vanligste feilene – uten å måtte være lydtekniker.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a
              href="mailto:thorbjorn@danbolt.no?subject=Foresp%C3%B8rsel%20om%20Trygg%20lyd%20i%20kirken"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-copper/20 text-copper-light border border-copper/40 rounded-full font-medium hover:bg-copper/30 hover:border-copper transition-all duration-300"
            >
              Be om kurs for deres kirker
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-cream/50">
            <span className="inline-flex items-center gap-2"><Clock3 size={16} className="text-copper-light" />4 timer</span>
            <span className="inline-flex items-center gap-2"><Users size={16} className="text-copper-light" />Ansatte, vikarer og frivillige</span>
            <span className="inline-flex items-center gap-2"><MapPin size={16} className="text-copper-light" />Kan tilpasses hver kirke</span>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-dark-lighter">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">Kursinnhold</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream mb-6">
              Det viktigste – i riktig rekkefølge
            </h2>
            <p className="text-cream/60 text-base lg:text-lg leading-relaxed">
              Kurset lærer bort en fast arbeidsmåte som fungerer på tvers av
              fabrikater og ulike lydanlegg. Hver modul kan også tas separat.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((module) => {
              const Icon = module.icon
              return (
                <article key={module.number} className="bg-dark-card border border-copper/10 rounded-xl p-6 lg:p-7">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-copper/10 flex items-center justify-center">
                      <Icon size={20} className="text-copper-light" />
                    </div>
                    <span className="text-copper-light/60 text-xs tracking-wider">{module.number}</span>
                  </div>
                  <h3 className="font-serif text-xl text-cream mb-3">{module.title}</h3>
                  <p className="text-cream/50 text-sm leading-relaxed">{module.description}</p>
                </article>
              )
            })}
          </div>

          <p className="text-cream/40 text-sm mt-6">
            Kurset avsluttes med en kort kunnskapstest med praktiske situasjoner.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-dark">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">Lokalt tillegg</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-cream mb-6">
              Samme metode – deres utstyr
            </h2>
            <p className="text-cream/60 leading-relaxed mb-7">
              Kirkene har forskjellig utstyr. Derfor kan hovedkurset suppleres
              med en kort veiledning tilpasset betjeningspanelet, mikrofonene,
              brukerprofilene og rutinene i den enkelte kirken.
            </p>
            <p className="text-cream/50 text-sm leading-relaxed">
              Tillegget kan produseres fra bilder og en kort videosamtale, eller
              samtidig med en allerede planlagt befaring.
            </p>
          </div>

          <div className="bg-dark-card border border-copper/15 rounded-2xl p-7 lg:p-9">
            <h3 className="font-serif text-2xl text-cream mb-6">Dette følger med</h3>
            <div className="space-y-4">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-copper-light mt-0.5 flex-shrink-0" />
                  <span className="text-cream/60 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-dark-lighter">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Bygget på erfaring
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream mb-6">
            Fra fagbok til trygg praksis
          </h2>
          <p className="text-cream/60 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mb-10">
            Kurset bygger på Thorbjørn Danbolts mer enn 30 års erfaring med lyd
            i norske kirker og fagboken «Lyd i kirken».
          </p>
          <a
            href="mailto:thorbjorn@danbolt.no?subject=Foresp%C3%B8rsel%20om%20Trygg%20lyd%20i%20kirken"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-copper/20 text-copper-light border border-copper/40 rounded-full font-medium hover:bg-copper/30 hover:border-copper transition-all duration-300"
          >
            Be om kurs for deres kirker
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </main>
  )
}
