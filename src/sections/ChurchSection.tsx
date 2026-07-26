import { Link } from 'react-router-dom'
import {
  ArrowRight,
  AudioWaveform,
  Building2,
  Cable,
  Church,
  Equal,
  Landmark,
  MonitorCheck,
  RadioTower,
  ShieldCheck,
  SlidersHorizontal,
  Speaker,
  UserRoundCheck,
  Wrench,
} from 'lucide-react'

const churchSystems = [
  { building: Church, system: SlidersHorizontal, label: 'A' },
  { building: Landmark, system: RadioTower, label: 'B' },
  { building: Building2, system: Speaker, label: 'C' },
  { building: Church, system: Cable, label: 'D' },
]

export default function ChurchSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-dark-lighter overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-copper/[0.04] via-transparent to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Lyd i kirken
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream mb-6 leading-tight">
              Ulike kirker.
              <br />
              <span className="text-gradient-copper">Samme trygghet.</span>
            </h2>
            <p className="text-cream/60 text-base lg:text-lg leading-relaxed mb-5 max-w-2xl">
              Hvert kirkebygg trenger en løsning tilpasset rommet. Samtidig bør
              ansatte, vikarer og frivillige møte den samme betjeningslogikken.
            </p>
            <p className="text-cream/45 text-sm leading-relaxed mb-9 max-w-xl">
              Danbolt hjelper kirkelige fellesråd med å utvikle lokale
              lydløsninger innenfor en felles og gjenkjennelig driftsmodell.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/lyd-i-kirken"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-copper/20 text-copper-light border border-copper/40 rounded-full font-medium hover:bg-copper/30 hover:border-copper transition-all duration-300"
              >
                Se hvordan vi arbeider med kirker
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/kurs/trygg-lyd-i-kirken"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-cream/70 border border-cream/15 rounded-full font-medium hover:text-cream hover:border-cream/30 transition-all duration-300"
              >
                <ShieldCheck size={16} />
                Se grunnkurset
              </Link>
            </div>
          </div>

          <div className="relative" role="img" aria-label="Fire ulike kirker med lokal teknikk og samme betjeningslogikk">
            <div className="flex items-center justify-center gap-2 py-4 border-y border-copper/30 text-copper-light text-xs sm:text-sm font-medium tracking-[0.12em] uppercase">
              <MonitorCheck size={17} />
              Felles betjeningsprinsipp
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-7">
              {churchSystems.map(({ building: Building, system: System, label }) => (
                <div key={label} className="flex flex-col items-center">
                  <div className="w-full min-h-14 flex items-center justify-center text-copper-light">
                    <Building size={24} strokeWidth={1.5} />
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

            <AudioWaveform className="absolute -z-10 -right-8 top-1/2 -translate-y-1/2 text-copper/[0.04]" size={240} strokeWidth={0.5} />
          </div>
        </div>
      </div>
    </section>
  )
}
