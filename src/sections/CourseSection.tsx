import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Clock3, GraduationCap, Users } from 'lucide-react'

const outcomes = [
  'Klargjøre anlegget før gudstjeneste og seremonier',
  'Bruke mikrofonene slik at talen blir tydelig',
  'Løse de vanligste feilene uten å skape nye problemer',
  'Vite hva som trygt kan justeres – og hva som skal stå urørt',
]

export default function CourseSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-dark-lighter overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-copper/[0.04] via-transparent to-transparent pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Fra fagbok til trygg praksis
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream mb-6 leading-tight">
              Trygg lyd
              <br />
              <span className="text-gradient-copper">i kirken</span>
            </h2>
            <p className="text-cream/60 text-base lg:text-lg leading-relaxed mb-8 max-w-2xl">
              Et praktisk mikrokurs for kirketjenere, vikarer og frivillige.
              Deltakerne lærer en enkel arbeidsmåte som fungerer på tvers av
              ulike lydanlegg – uten å måtte bli lydteknikere.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-9">
              <div className="flex items-center gap-3 text-cream/60">
                <Clock3 size={18} className="text-copper-light flex-shrink-0" />
                <span className="text-sm">45–50 minutter</span>
              </div>
              <div className="flex items-center gap-3 text-cream/60">
                <Users size={18} className="text-copper-light flex-shrink-0" />
                <span className="text-sm">For ansatte, vikarer og frivillige</span>
              </div>
            </div>

            <Link
              to="/kurs/trygg-lyd-i-kirken"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-copper/20 text-copper-light border border-copper/40 rounded-full font-medium hover:bg-copper/30 hover:border-copper transition-all duration-300"
            >
              Se kursinnholdet
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="bg-dark-card border border-copper/15 rounded-2xl p-7 lg:p-9 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-copper/10 border border-copper/20 flex items-center justify-center mb-6">
              <GraduationCap size={23} className="text-copper-light" />
            </div>
            <h3 className="font-serif text-2xl text-cream mb-5">Etter kurset kan deltakerne</h3>
            <div className="space-y-4">
              {outcomes.map((outcome) => (
                <div key={outcome} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-copper-light mt-0.5 flex-shrink-0" />
                  <span className="text-cream/60 text-sm leading-relaxed">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
