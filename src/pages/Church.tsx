import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  AudioWaveform,
  BadgeCheck,
  BookOpenCheck,
  Building2,
  Cable,
  Church as ChurchIcon,
  CircleHelp,
  ClipboardCheck,
  ClockAlert,
  Equal,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Laptop,
  ListChecks,
  MapPinCheck,
  MonitorCheck,
  Network,
  PanelsTopLeft,
  PencilRuler,
  PhoneOff,
  RadioTower,
  Repeat2,
  Route,
  ScanSearch,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Speaker,
  ToggleLeft,
  TriangleAlert,
  UserRoundCheck,
  Users,
  Waypoints,
  Wrench,
} from 'lucide-react'

const churchSystems = [
  { building: ChurchIcon, system: SlidersHorizontal, label: 'A' },
  { building: Landmark, system: RadioTower, label: 'B' },
  { building: Building2, system: Speaker, label: 'C' },
  { building: ChurchIcon, system: Cable, label: 'D' },
]

const deliverables = [
  { icon: Network, title: 'Systemkart', detail: 'Dagens anlegg' },
  { icon: Users, title: 'Brukerkart', detail: 'Roller og behov' },
  { icon: PanelsTopLeft, title: 'Betjeningsprinsipp', detail: 'Språk og moduser' },
  { icon: Route, title: 'Oppgraderingsplan', detail: 'Prioritering og gjenbruk' },
  { icon: ClipboardCheck, title: 'Innkjøpsføringer', detail: 'Krav og dokumentasjon' },
  { icon: GraduationCap, title: 'Opplæringsplan', detail: 'Felles og lokalt' },
]

const process = [
  { icon: ScanSearch, number: '01', title: 'Kartlegge', detail: 'Bygg, anlegg og brukerroller' },
  { icon: ListChecks, number: '02', title: 'Definere', detail: 'Felles språk og driftsprinsipper' },
  { icon: PencilRuler, number: '03', title: 'Planlegge', detail: 'Lokale løsninger og prioriteringer' },
  { icon: BadgeCheck, number: '04', title: 'Kvalitetssikre', detail: 'Krav, installasjon og dokumentasjon' },
  { icon: BookOpenCheck, number: '05', title: 'Forankre', detail: 'Opplæring, rutiner og støtte' },
]

function SystemPicture() {
  return (
    <div className="relative" role="img" aria-label="Fire ulike kirker med lokal teknikk og samme betjeningslogikk">
      <div className="flex items-center justify-center gap-2 py-4 border-y border-copper/30 text-copper-light text-xs sm:text-sm font-medium tracking-[0.12em] uppercase">
        <MonitorCheck size={17} />
        Felles betjeningsprinsipp
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-7">
        {churchSystems.map(({ building: Building, system: System, label }) => (
          <div key={label} className="flex flex-col items-center">
            <div className="w-full min-h-14 flex items-center justify-center text-copper-light">
              <Building size={25} strokeWidth={1.5} />
            </div>
            <div className="w-px h-6 bg-copper/20" />
            <div className="w-full min-h-14 flex items-center justify-center text-cream/45 border-y border-cream/10">
              <System size={22} strokeWidth={1.5} />
            </div>
            <div className="w-px h-6 bg-copper/20" />
            <div className="w-full min-h-16 flex flex-col gap-2 items-center justify-center text-copper-light border-y border-copper/30">
              <MonitorCheck size={22} strokeWidth={1.5} />
              <div className="flex gap-1" aria-hidden="true">
                <span className="w-1.5 h-1.5 rounded-full bg-copper" />
                <span className="w-1.5 h-1.5 rounded-full bg-copper/50" />
                <span className="w-1.5 h-1.5 rounded-full bg-copper/30" />
              </div>
            </div>
            <span className="text-cream/30 text-xs mt-2">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-7 text-xs sm:text-sm text-cream/45">
        <span className="inline-flex items-center gap-2">
          <Wrench size={15} className="text-copper-light" />
          Ulik teknikk
        </span>
        <span className="inline-flex items-center gap-2">
          <Equal size={15} className="text-copper-light" />
          Samme logikk
        </span>
        <span className="inline-flex items-center gap-2">
          <UserRoundCheck size={15} className="text-copper-light" />
          Tryggere bruk
        </span>
      </div>
    </div>
  )
}

function Comparison() {
  const [shared, setShared] = useState(true)

  const interfaceIcons = shared
    ? [MonitorCheck, MonitorCheck, MonitorCheck, MonitorCheck]
    : [SlidersHorizontal, Smartphone, PanelsTopLeft, ToggleLeft]

  const interfaceLabels = shared
    ? ['Kjent', 'Kjent', 'Kjent', 'Kjent']
    : ['Mikser', 'App', 'Panel', 'Brytere']

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">
        <div>
          <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Se forskjellen
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream">
            Samme oppgave – ulik eller kjent betjening
          </h2>
        </div>
        <div className="inline-flex p-1 border border-cream/10 rounded-full self-start" aria-label="Velg betjeningsmodell">
          <button
            type="button"
            aria-pressed={!shared}
            onClick={() => setShared(false)}
            className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
              !shared ? 'bg-cream text-dark' : 'text-cream/60 hover:text-cream'
            }`}
          >
            Uten felles logikk
          </button>
          <button
            type="button"
            aria-pressed={shared}
            onClick={() => setShared(true)}
            className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
              shared ? 'bg-cream text-dark' : 'text-cream/60 hover:text-cream'
            }`}
          >
            Med felles logikk
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-5">
        {churchSystems.map(({ building: Building, label }, index) => {
          const InterfaceIcon = interfaceIcons[index]
          return (
            <div key={label} className="flex flex-col items-center">
              <div className="w-full min-h-16 flex flex-col items-center justify-center gap-1 text-copper-light">
                <Building size={23} strokeWidth={1.5} />
                <span className="text-cream/30 text-xs">{label}</span>
              </div>
              <div className="w-px h-7 bg-copper/20" />
              <div className={`w-full min-h-24 flex flex-col items-center justify-center gap-2 border-y ${
                shared ? 'border-copper/35 text-copper-light' : 'border-cream/10 text-cream/45'
              }`}>
                <InterfaceIcon size={22} strokeWidth={1.5} />
                <span className="text-xs">{interfaceLabels[index]}</span>
                {shared && (
                  <div className="flex gap-1" aria-hidden="true">
                    <span className="w-1.5 h-1.5 rounded-full bg-copper" />
                    <span className="w-1.5 h-1.5 rounded-full bg-copper/50" />
                    <span className="w-1.5 h-1.5 rounded-full bg-copper/30" />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className={`mt-8 py-5 px-5 border-y flex flex-col sm:flex-row items-center justify-center gap-3 text-center ${
        shared ? 'border-copper/35 text-copper-light bg-copper/[0.03]' : 'border-amber-500/30 text-amber-200 bg-amber-500/[0.03]'
      }`}>
        {shared ? <Equal size={18} /> : <Repeat2 size={18} />}
        <span className="font-medium">
          {shared
            ? 'Samme språk · samme driftsmoduser · samme støtte'
            : 'Systemet må læres på nytt i hvert bygg'}
        </span>
      </div>

      <p className="mt-5 text-center text-sm text-cream/45" aria-live="polite">
        {shared
          ? 'Gjenkjennelig betjening · tryggere ansatte · enklere service'
          : 'Personavhengig drift · gjentatt opplæring · større feilrisiko'}
      </p>
    </div>
  )
}

export default function Church() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen bg-dark text-cream">
      <Helmet>
        <title>Lyd i kirken | Felles grensesnitt og trygg teknisk drift</title>
        <meta
          name="description"
          content="Helhetlig lydplattform for kirkebygg: lokale løsninger med felles betjeningslogikk, tryggere ansatte, enklere opplæring og bedre drift."
        />
        <link rel="canonical" href="https://danbolt.no/lyd-i-kirken" />
        <meta property="og:title" content="Lyd i kirken | Ulike kirker. Samme trygghet." />
        <meta
          property="og:description"
          content="Lokale lydløsninger med en felles og gjenkjennelig betjeningslogikk for ansatte, vikarer og frivillige."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://danbolt.no/lyd-i-kirken" />
        <meta property="og:image" content="https://danbolt.no/blogg-kirke.jpg" />
        <meta property="og:locale" content="nb_NO" />
      </Helmet>

      <section className="relative pt-28 lg:pt-36 pb-20 lg:pb-28 overflow-hidden">
        <div className="absolute top-12 right-0 w-[620px] h-[620px] bg-copper/[0.035] rounded-full blur-3xl pointer-events-none" />
        <AudioWaveform className="absolute -right-20 top-32 text-copper/[0.035] pointer-events-none" size={520} strokeWidth={0.4} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-cream/50 hover:text-copper-light transition-colors mb-12"
          >
            <ArrowLeft size={15} />
            Tilbake til forsiden
          </Link>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-20 items-center">
            <div>
              <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-5">
                Lyd i kirken
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-cream mb-7 leading-[1.05]">
                Ulike kirker.
                <br />
                <span className="text-gradient-copper">Samme trygghet.</span>
              </h1>
              <p className="text-cream/60 text-lg leading-relaxed max-w-2xl mb-9">
                Hvert kirkebygg trenger en teknisk løsning tilpasset rommet. Men
                ansatte, vikarer og frivillige bør møte den samme
                betjeningslogikken – med kjente funksjoner, tydelige
                driftsmoduser og en trygg måte å bruke anlegget på.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-9">
                <a
                  href="mailto:thorbjorn@danbolt.no?subject=Felles%20plattformanalyse%20for%20kirkene"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-copper/20 text-copper-light border border-copper/40 rounded-full font-medium hover:bg-copper/30 hover:border-copper transition-all duration-300"
                >
                  Ta en prat om kirkene deres
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#prinsipp"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-cream/70 border border-cream/15 rounded-full font-medium hover:text-cream hover:border-cream/30 transition-all duration-300"
                >
                  Se prinsippet
                </a>
              </div>
              <div className="flex items-center gap-3 pt-6 border-t border-cream/10 text-sm text-cream/45">
                <BadgeCheck size={18} className="text-copper-light flex-shrink-0" />
                Mer enn 30 års erfaring fra norske kirkebygg
              </div>
            </div>

            <SystemPicture />
          </div>
        </div>
      </section>

      <section className="py-6 border-y border-copper/20 bg-dark-lighter">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-copper-light text-sm font-medium tracking-wide text-center">
          <span className="inline-flex items-center gap-2">
            <ChurchIcon size={17} />
            Riktig løsning i hvert rom
          </span>
          <span className="hidden sm:block w-12 h-px bg-copper/25" aria-hidden="true" />
          <span className="inline-flex items-center gap-2">
            <UserRoundCheck size={17} />
            Lik brukeropplevelse
          </span>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-dark">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mb-14">
            <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Menneskene først
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream leading-tight">
              Ingen skal være utrygg fordi arbeidsdagen foregår i en annen kirke.
            </h2>
          </div>

          <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-5 items-center">
            <div className="min-h-36 flex flex-col items-center justify-center gap-4 text-center border-y border-amber-500/25 text-amber-200">
              <CircleHelp size={28} strokeWidth={1.5} />
              <span className="font-medium">Ukjent anlegg</span>
            </div>
            <ArrowRight className="hidden md:block text-cream/25" size={20} />
            <div className="min-h-36 flex flex-col items-center justify-center gap-4 text-center border-y border-cream/10 text-cream/70">
              <PanelsTopLeft size={28} strokeWidth={1.5} />
              <span className="font-medium">Kjent logikk</span>
            </div>
            <ArrowRight className="hidden md:block text-cream/25" size={20} />
            <div className="min-h-36 flex flex-col items-center justify-center gap-4 text-center border-y border-copper/30 text-copper-light">
              <ShieldCheck size={28} strokeWidth={1.5} />
              <span className="font-medium">Trygg gjennomføring</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mt-10 pt-8 border-t border-cream/10 text-sm text-cream/45">
            <span className="inline-flex items-center justify-center gap-2">
              <ClockAlert size={17} className="text-copper-light" />
              Tidspress
            </span>
            <span className="inline-flex items-center justify-center gap-2">
              <TriangleAlert size={17} className="text-copper-light" />
              Feilrisiko
            </span>
            <span className="inline-flex items-center justify-center gap-2">
              <PhoneOff size={17} className="text-copper-light" />
              Personavhengighet
            </span>
          </div>
        </div>
      </section>

      <section id="prinsipp" className="py-24 lg:py-32 bg-dark-lighter scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Comparison />
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">
              En konkret rådgivningstjeneste
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream mb-6">
              Felles plattformanalyse for kirkene
            </h2>
            <p className="text-cream/55 text-base lg:text-lg leading-relaxed">
              Én samlet retning – seks konkrete leveranser.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-cream/10">
            {deliverables.map(({ icon: Icon, title, detail }) => (
              <article
                key={title}
                className="min-h-44 p-7 flex flex-col items-center justify-center text-center border-r border-b border-cream/10"
              >
                <Icon size={24} className="text-copper-light mb-4" strokeWidth={1.5} />
                <h3 className="font-serif text-xl text-cream mb-2">{title}</h3>
                <p className="text-cream/40 text-sm">{detail}</p>
              </article>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-8 mt-12 pt-9 border-t border-cream/10">
            <div className="flex items-center justify-center gap-3 text-copper-light font-medium">
              <ShieldCheck size={21} />
              Ivaretar anlegget
            </div>
            <div className="flex items-center justify-center gap-3 text-copper-light font-medium">
              <HeartHandshake size={21} />
              Ivaretar de ansatte
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 border-y border-copper/25 bg-dark-lighter">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[0.65fr_1.35fr] gap-12 items-center">
          <div className="grid grid-cols-4 gap-3" aria-hidden="true">
            {churchSystems.map(({ building: Building, label }) => (
              <div key={label} className="min-h-24 flex items-center justify-center text-copper-light border-y border-cream/10">
                <Building size={23} strokeWidth={1.5} />
              </div>
            ))}
            <Equal className="col-span-4 justify-self-center text-copper-light" size={20} />
          </div>
          <div>
            <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Eksempel fra praksis
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-cream mb-5">
              Ett fellesråd. Fire ulike kirker.
            </h2>
            <p className="text-cream/55 leading-relaxed max-w-2xl mb-5">
              I en samlet vurdering anbefalte Danbolt lokale lydløsninger
              innenfor samme driftsfilosofi og betjeningslogikk. Målet var
              enklere opplæring, færre brukerfeil og mer forutsigbar service –
              uten å behandle ulike kirkebygg som om de var det samme rommet.
            </p>
            <p className="text-copper-light font-medium">
              Lokalt tilpasset lyd. Felles forståelse.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Slik arbeider Danbolt
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream">
              Fra kartlegging til trygg drift
            </h2>
          </div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 border-t border-l border-cream/10">
            {process.map(({ icon: Icon, number, title, detail }) => (
              <li
                key={number}
                className="min-h-44 p-6 flex flex-col items-center justify-center text-center border-r border-b border-cream/10"
              >
                <Icon size={23} className="text-copper-light mb-3" strokeWidth={1.5} />
                <span className="text-copper-light/50 text-xs tracking-wider mb-2">{number}</span>
                <h3 className="font-serif text-lg text-cream mb-2">{title}</h3>
                <p className="text-cream/40 text-xs leading-relaxed">{detail}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 pt-8 border-t border-cream/10 flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-10 text-sm text-cream/45 text-center">
            <span className="inline-flex items-center gap-2">
              <Laptop size={17} className="text-copper-light" />
              Analyse · krav · dokumentasjon · opplæringsmateriell
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPinCheck size={17} className="text-copper-light" />
              Befaring der bygget krever det
            </span>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-dark-lighter border-y border-cream/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[auto_1fr_auto] gap-8 items-center">
          <div className="w-14 h-14 flex items-center justify-center text-copper-light border-y border-copper/30">
            <GraduationCap size={25} />
          </div>
          <div>
            <p className="text-copper-light text-sm font-medium tracking-[0.16em] uppercase mb-3">
              Opplæring som støtter systemet
            </p>
            <h2 className="font-serif text-3xl text-cream mb-3">Trygg lyd i kirken</h2>
            <p className="text-cream/50">
              Fire timers grunnkurs for kirketjenere, vikarer og frivillige –
              med kort lokal veiledning til hver kirke.
            </p>
          </div>
          <Link
            to="/kurs/trygg-lyd-i-kirken"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-cream/70 border border-cream/15 rounded-full font-medium hover:text-cream hover:border-cream/30 transition-all"
          >
            Se kurset
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <section className="relative py-28 lg:py-36 bg-dark overflow-hidden">
        <Waypoints className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-copper/[0.035]" size={420} strokeWidth={0.5} />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Neste steg
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream mb-6">
            Få en felles plan for kirkene deres
          </h2>
          <p className="text-cream/55 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Start med en uforpliktende samtale om dagens anlegg, hvilke bygg som
            bør ses i sammenheng og hvor en felles betjeningslogikk vil gi størst verdi.
          </p>
          <a
            href="mailto:thorbjorn@danbolt.no?subject=Felles%20plattformanalyse%20for%20kirkene"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-copper/20 text-copper-light border border-copper/40 rounded-full font-medium hover:bg-copper/30 hover:border-copper transition-all"
          >
            Ta kontakt med Thorbjørn
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </main>
  )
}
