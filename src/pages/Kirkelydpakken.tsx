import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  AudioLines,
  BadgeCheck,
  Cable,
  Camera,
  ChevronDown,
  ClipboardList,
  Ear,
  FileText,
  GraduationCap,
  HandCoins,
  Layers,
  MapPinCheck,
  Mic,
  MonitorCheck,
  Music,
  Package,
  Power,
  Recycle,
  Ruler,
  Speaker,
  Video,
  Wrench,
} from 'lucide-react'

// Eksempler på leveranser. Legg til en ny kirke ved å kopiere ett objekt.
// Så lenge listen er tom, vises plassholdere på siden.
type Leveranse = {
  kirke: string
  sted: string
  levert: string
  sitat?: string
  sitatFra?: string
  bilde?: string // f.eks. '/leveranse-bardu.jpg' lagt i public-mappen
}

const leveranser: Leveranse[] = []

const modes = [
  { id: 'gudstjeneste', label: 'Gudstjeneste', detail: 'Prekestol, lesepult og trådløse mikrofoner på. Musikk og teleslynge klar.' },
  { id: 'begravelse', label: 'Begravelse', detail: 'Tale og musikkavspilling, rolig nivå. Teleslynge på.' },
  { id: 'konsert', label: 'Konsert', detail: 'Mer fylde i musikken, trådløse mikrofoner for presentasjon.' },
  { id: 'av', label: 'Av', detail: 'Alt slås av i riktig rekkefølge. Klart til neste gang.' },
]

const promises = [
  { icon: Cable, label: 'Ferdig koblet' },
  { icon: BadgeCheck, label: 'Testet før levering' },
  { icon: Wrench, label: 'Montert av lokal elektriker' },
  { icon: Video, label: 'Oppstart på video' },
]

const kjernen = [
  'Profesjonell lydprosessor (Allen & Heath AHM-16)',
  'Veggmontert betjeningsnettbrett med faste knapper',
  'Programmering tilpasset kirkens rom og bruk',
  'Kabler, kontakter og tydelig merking',
  'Funksjonstest før levering',
  'Enkel monteringsanvisning for elektriker',
  'Oppfølging på telefon eller video ved oppstart',
]

const moduler = [
  { icon: Mic, title: 'Mikrofoner', detail: 'Prekestol, lesepult og trådløse mikrofoner. Hodebøyle for tydeligere tale.' },
  { icon: Speaker, title: 'Høyttalere', detail: 'Når dagens høyttalere ikke gir ren tale og fyldig musikk.' },
  { icon: Ear, title: 'Teleslynge', detail: 'Egen lydutgang med riktig nivå til teleslyngeforsterkeren.' },
  { icon: Music, title: 'Musikk og strømming', detail: 'Enkel avspilling fra mobil og ferdig lyd til strømming.' },
]

const trinn = [
  { nummer: '1', title: 'Kjernen', detail: 'Lydprosessor og betjening. Dagens mikrofoner og høyttalere kobles til.' },
  { nummer: '2', title: 'Mikrofoner', detail: 'Bytt det som gir dårlig tale. Behold det som fungerer.' },
  { nummer: '3', title: 'Høyttalere', detail: 'Når budsjettet tillater det – uten å endre betjeningen.' },
]

const prosess = [
  { icon: ClipboardList, nummer: '01', title: 'Kartlegging', detail: 'Dere fyller ut skjemaet med bilder og mål' },
  { icon: FileText, nummer: '02', title: 'Forslag', detail: 'Konkret løsning med fast pris' },
  { icon: Package, nummer: '03', title: 'Levering', detail: 'Ferdig koblet, programmert og testet' },
  { icon: Video, nummer: '04', title: 'Oppstart', detail: 'Elektriker monterer, vi kontrollerer på video' },
]

const sporsmal = [
  {
    q: 'Må vi bytte ut alt vi har?',
    a: 'Nei. Mikrofoner, høyttalere og teleslynge som fungerer, kobles til og brukes videre. Dere betaler bare for det som faktisk må på plass.',
  },
  {
    q: 'Hva koster det?',
    a: 'Kjernen starter på 60 000 kroner eks. mva. Endelig pris avhenger av hva som kan gjenbrukes og hva kirken trenger. Etter kartleggingen får dere et forslag med fast pris. Montering hos dere kommer i tillegg.',
  },
  {
    q: 'Hvem monterer anlegget?',
    a: 'En lokal elektriker eller en erfaren vaktmester. Alt er ferdig koblet og merket, og monteringsanvisningen viser plassering, kabelføring og tilkobling. Monteringen tar normalt én arbeidsdag.',
  },
  {
    q: 'Hvorfor trengs det ikke befaring?',
    a: 'Bilder, plantegning og et kort lydopptak av rommet gir et godt grunnlag for å vurdere akustikk og plassering. Krever bygget en befaring, sier vi fra.',
  },
  {
    q: 'Hvem kan betjene anlegget?',
    a: 'Alle. Kirketjenere, prester, vikarer og frivillige møter de samme faste knappene. Den som vil lære mer, kan ta grunnkurset Trygg lyd i kirken.',
  },
  {
    q: 'Hva skjer hvis noe ikke fungerer?',
    a: 'Ring Thorbjørn. Mye kan løses på telefon eller video, fordi oppsettet er kjent og dokumentert.',
  },
]

function Nettbrett() {
  const [active, setActive] = useState('gudstjeneste')
  const current = modes.find((m) => m.id === active) ?? modes[0]

  return (
    <div className="relative">
      <div className="mx-auto max-w-sm rounded-[2rem] border border-cream/15 bg-dark-card p-4 shadow-glow">
        <div className="rounded-[1.4rem] border border-cream/10 bg-dark p-5">
          <div className="flex items-center justify-between mb-5 text-xs text-cream/40">
            <span className="inline-flex items-center gap-1.5">
              <MonitorCheck size={14} className="text-copper-light" />
              Kirkens lydanlegg
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${active === 'av' ? 'bg-cream/30' : 'bg-emerald-400'}`} />
              {active === 'av' ? 'Av' : 'På'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3" role="group" aria-label="Velg anledning">
            {modes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                aria-pressed={active === mode.id}
                onClick={() => setActive(mode.id)}
                className={`min-h-20 rounded-xl border px-3 text-sm font-medium transition-all inline-flex flex-col items-center justify-center gap-1.5 ${
                  active === mode.id
                    ? 'bg-copper/20 border-copper/60 text-copper-light'
                    : 'border-cream/10 text-cream/60 hover:text-cream hover:border-cream/25'
                }`}
              >
                {mode.id === 'av' ? <Power size={18} /> : <AudioLines size={18} />}
                {mode.label}
              </button>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-cream/10">
            <div className="flex items-center justify-between text-xs text-cream/40 mb-2">
              <span>Talevolum</span>
              <span>{active === 'av' ? '–' : active === 'konsert' ? '65 %' : '75 %'}</span>
            </div>
            <div className="h-1.5 rounded-full bg-cream/10 overflow-hidden">
              <div
                className="h-full bg-copper transition-all duration-500"
                style={{ width: active === 'av' ? '0%' : active === 'konsert' ? '65%' : '75%' }}
              />
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-center text-sm text-cream/55 min-h-[3rem] max-w-sm mx-auto" aria-live="polite">
        {current.detail}
      </p>
    </div>
  )
}

export default function Kirkelydpakken() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen bg-dark text-cream">
      <Helmet>
        <title>Kirkelydpakken | Ferdig lydanlegg for kirken | Thorbjørn Danbolt</title>
        <meta
          name="description"
          content="Komplett lydanlegg for kirken – koblet, programmert og testet før levering, montert av lokal elektriker. Enkel betjening for alle. Fra kr 60 000 eks. mva."
        />
        <link rel="canonical" href="https://danbolt.no/kirkelydpakken" />
        <meta property="og:title" content="Kirkelydpakken | Tydelig tale. Enkel betjening." />
        <meta
          property="og:description"
          content="Ferdig koblet og testet lydanlegg for kirker. Montert lokalt, med oppstart på video."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://danbolt.no/kirkelydpakken" />
        <meta property="og:image" content="https://danbolt.no/blogg-kirke.jpg" />
        <meta property="og:locale" content="nb_NO" />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-28 lg:pt-36 pb-20 lg:pb-28 overflow-hidden">
        <div className="absolute top-12 right-0 w-[620px] h-[620px] bg-copper/[0.035] rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <Link
            to="/lyd-i-kirken"
            className="inline-flex items-center gap-2 text-sm text-cream/50 hover:text-copper-light transition-colors mb-12"
          >
            <ArrowLeft size={15} />
            Lyd i kirken
          </Link>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-20 items-center">
            <div>
              <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-5">Kirkelydpakken</p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-cream mb-7 leading-[1.05]">
                Tydelig tale.
                <br />
                <span className="text-gradient-copper">Enkel betjening.</span>
              </h1>
              <p className="text-cream/60 text-lg leading-relaxed max-w-2xl mb-9">
                Et komplett lydanlegg for kirken – koblet, programmert og testet før det sendes til dere. En lokal
                elektriker monterer etter enkel anvisning, og alle som bruker kirken møter de samme faste knappene.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-9">
                <Link
                  to="/kartlegging"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-copper/20 text-copper-light border border-copper/40 rounded-full font-medium hover:bg-copper/30 hover:border-copper transition-all duration-300"
                >
                  Start kartleggingen
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#innhold"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-cream/70 border border-cream/15 rounded-full font-medium hover:text-cream hover:border-cream/30 transition-all duration-300"
                >
                  Se hva som inngår
                </a>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-6 border-t border-cream/10">
                <span className="text-cream/45 text-sm">Fra</span>
                <span className="font-serif text-3xl text-cream">kr 60 000</span>
                <span className="text-cream/45 text-sm">eks. mva. · montering kommer i tillegg</span>
              </div>
            </div>

            <Nettbrett />
          </div>
        </div>
      </section>

      {/* Løfter */}
      <section className="py-6 border-y border-copper/20 bg-dark-lighter">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-4 text-copper-light text-sm font-medium tracking-wide">
          {promises.map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center justify-center gap-2 text-center">
              <Icon size={17} className="flex-shrink-0" />
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* Hva som inngår */}
      <section id="innhold" className="py-24 lg:py-32 bg-dark scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">Hva som inngår</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream mb-6 leading-tight">
              En fast kjerne. Resten tilpasses kirken.
            </h2>
            <p className="text-cream/55 text-base lg:text-lg leading-relaxed">
              Kjernen gir samme trygge betjening i alle kirker. Mikrofoner, høyttalere og teleslynge velges ut fra
              rommet og det dere allerede har.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-6">
            <article className="rounded-2xl border border-copper/40 bg-copper/[0.04] p-7 lg:p-9">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-copper-light text-xs font-medium tracking-[0.16em] uppercase mb-2">Kjernen</p>
                  <h3 className="font-serif text-2xl text-cream">Lydprosessor og betjening</h3>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-cream/45 text-xs">fra</p>
                  <p className="font-serif text-2xl text-copper-light">kr 60 000</p>
                  <p className="text-cream/40 text-xs">eks. mva.</p>
                </div>
              </div>
              <ul className="space-y-3">
                {kjernen.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-cream/70 text-sm leading-relaxed">
                    <BadgeCheck size={17} className="text-copper-light flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <div className="grid sm:grid-cols-2 border-t border-l border-cream/10 rounded-2xl overflow-hidden">
              {moduler.map(({ icon: Icon, title, detail }) => (
                <article key={title} className="min-h-44 p-7 flex flex-col border-r border-b border-cream/10">
                  <Icon size={23} className="text-copper-light mb-4" strokeWidth={1.5} />
                  <h3 className="font-serif text-xl text-cream mb-2">{title}</h3>
                  <p className="text-cream/45 text-sm leading-relaxed mb-3">{detail}</p>
                  <p className="mt-auto text-copper-light/70 text-xs tracking-wide">Tilpasses · pris i forslaget</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-cream/50">
            <GraduationCap size={18} className="text-copper-light flex-shrink-0" />
            <span>
              Kan kombineres med grunnkurset{' '}
              <Link to="/kurs/trygg-lyd-i-kirken" className="text-copper-light hover:underline">
                Trygg lyd i kirken
              </Link>{' '}
              for kirketjenere, vikarer og frivillige.
            </span>
          </div>
        </div>
      </section>

      {/* Gjenbruk og trinn */}
      <section className="py-24 lg:py-32 bg-dark-lighter">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          <div>
            <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">Tilpasset budsjettet</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-cream mb-6 leading-tight">
              Vi bruker det som fungerer
            </h2>
            <p className="text-cream/55 leading-relaxed mb-6">
              Mange kirker har gode mikrofoner eller en teleslynge som fungerer fint. Det kobles til og brukes videre.
              Anlegget kan også bygges ut i trinn, uten at betjeningen endres underveis.
            </p>
            <div className="flex items-center gap-3 text-copper-light font-medium">
              <Recycle size={20} />
              Mindre nytt utstyr. Lavere kostnad.
            </div>
          </div>

          <ol className="space-y-3">
            {trinn.map(({ nummer, title, detail }) => (
              <li key={nummer} className="flex gap-5 items-start p-6 rounded-xl border border-cream/10 bg-dark">
                <span className="w-10 h-10 flex-shrink-0 rounded-full border border-copper/40 text-copper-light flex items-center justify-center font-serif text-lg">
                  {nummer}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-cream mb-1">Trinn {nummer}: {title}</h3>
                  <p className="text-cream/50 text-sm leading-relaxed">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Slik foregår det */}
      <section className="py-24 lg:py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">Slik foregår det</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream">Fra skjema til ferdig anlegg</h2>
          </div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-cream/10">
            {prosess.map(({ icon: Icon, nummer, title, detail }) => (
              <li key={nummer} className="min-h-48 p-7 flex flex-col items-center justify-center text-center border-r border-b border-cream/10">
                <Icon size={24} className="text-copper-light mb-3" strokeWidth={1.5} />
                <span className="text-copper-light/50 text-xs tracking-wider mb-2">{nummer}</span>
                <h3 className="font-serif text-xl text-cream mb-2">{title}</h3>
                <p className="text-cream/45 text-sm leading-relaxed">{detail}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid md:grid-cols-3 gap-5 pt-9 border-t border-cream/10 text-sm text-cream/50">
            <span className="inline-flex items-center justify-center gap-2 text-center">
              <Camera size={17} className="text-copper-light flex-shrink-0" />
              Bilder av utstyr og rom
            </span>
            <span className="inline-flex items-center justify-center gap-2 text-center">
              <Ruler size={17} className="text-copper-light flex-shrink-0" />
              Plantegning eller enkle mål
            </span>
            <span className="inline-flex items-center justify-center gap-2 text-center">
              <AudioLines size={17} className="text-copper-light flex-shrink-0" />
              Lydopptak som viser rommets klang
            </span>
          </div>
          <p className="mt-5 text-center text-sm text-cream/40 inline-flex w-full items-center justify-center gap-2">
            <MapPinCheck size={16} className="text-copper-light" />
            Befaring der bygget krever det
          </p>
        </div>
      </section>

      {/* Finansiering */}
      <section className="py-20 lg:py-24 border-y border-copper/25 bg-dark-lighter">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[auto_1fr_auto] gap-8 items-center">
          <div className="w-14 h-14 flex items-center justify-center text-copper-light border-y border-copper/30">
            <HandCoins size={25} />
          </div>
          <div>
            <p className="text-copper-light text-sm font-medium tracking-[0.16em] uppercase mb-3">Hjelp til finansiering</p>
            <h2 className="font-serif text-3xl text-cream mb-3">Ferdig grunnlag for søknaden</h2>
            <p className="text-cream/55 leading-relaxed max-w-2xl">
              Mange menigheter må søke midler. Sammen med forslaget får dere en kort beskrivelse av behovet, løsningen
              og gevinsten for tale, musikk og hørselshemmede – klar til bruk i søknad til sparebank, stiftelse eller
              kommune.
            </p>
          </div>
          <Layers size={40} className="hidden lg:block text-copper/20" strokeWidth={1} />
        </div>
      </section>

      {/* Eksempler på leveranser */}
      <section className="py-24 lg:py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">Eksempler på leveranser</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream">Kirker med Kirkelydpakken</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {leveranser.length > 0
              ? leveranser.map((l) => (
                  <article key={l.kirke} className="rounded-2xl border border-cream/10 bg-dark-card overflow-hidden flex flex-col">
                    {l.bilde && <img src={l.bilde} alt={l.kirke} className="w-full aspect-[4/3] object-cover" loading="lazy" />}
                    <div className="p-7 flex flex-col flex-1">
                      <p className="text-copper-light text-xs tracking-[0.14em] uppercase mb-2">{l.sted}</p>
                      <h3 className="font-serif text-2xl text-cream mb-3">{l.kirke}</h3>
                      <p className="text-cream/55 text-sm leading-relaxed mb-5">{l.levert}</p>
                      {l.sitat && (
                        <blockquote className="mt-auto pt-5 border-t border-cream/10">
                          <p className="font-serif text-cream/80 italic leading-relaxed">«{l.sitat}»</p>
                          {l.sitatFra && <footer className="mt-2 text-cream/40 text-xs">{l.sitatFra}</footer>}
                        </blockquote>
                      )}
                    </div>
                  </article>
                ))
              : [0, 1, 2].map((i) => (
                  <article key={i} className="rounded-2xl border border-dashed border-cream/15 p-7 min-h-64 flex flex-col">
                    <div className="w-full aspect-[4/3] rounded-xl bg-cream/[0.03] mb-6 flex items-center justify-center text-cream/15">
                      <Camera size={32} strokeWidth={1} />
                    </div>
                    <div className="h-3 w-24 rounded-full bg-copper/15 mb-3" />
                    <div className="h-5 w-40 rounded-full bg-cream/10 mb-3" />
                    <div className="h-3 w-full rounded-full bg-cream/[0.06] mb-2" />
                    <div className="h-3 w-3/4 rounded-full bg-cream/[0.06]" />
                  </article>
                ))}
          </div>
          {leveranser.length === 0 && (
            <p className="mt-6 text-sm text-cream/40">De første anleggene monteres nå. Bilder og erfaringer kommer her.</p>
          )}
        </div>
      </section>

      {/* Spørsmål og svar */}
      <section className="py-24 lg:py-32 bg-dark-lighter">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">Spørsmål og svar</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-cream mb-10">Det menighetsrådet vil spørre om</h2>
          <div className="border-t border-cream/10">
            {sporsmal.map(({ q, a }) => (
              <details key={q} className="group border-b border-cream/10">
                <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none text-cream text-lg hover:text-copper-light transition-colors [&::-webkit-details-marker]:hidden">
                  {q}
                  <ChevronDown size={18} className="flex-shrink-0 text-copper-light transition-transform group-open:rotate-180" />
                </summary>
                <p className="pb-6 text-cream/55 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Neste steg */}
      <section className="relative py-28 lg:py-36 bg-dark overflow-hidden">
        <AudioLines className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-copper/[0.035]" size={420} strokeWidth={0.5} />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">Neste steg</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream mb-6">Start med en kartlegging</h2>
          <p className="text-cream/55 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Ca. 15 minutter med mobilen i kirken. Deretter får dere et konkret forslag med fast pris – uforpliktende.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/kartlegging"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-copper/20 text-copper-light border border-copper/40 rounded-full font-medium hover:bg-copper/30 hover:border-copper transition-all"
            >
              Start kartleggingen
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+4797721779"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-cream/70 border border-cream/15 rounded-full font-medium hover:text-cream hover:border-cream/30 transition-all"
            >
              Ring 977 21 779
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
