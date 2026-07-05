import { useEffect, useRef, useState } from 'react'
import { BookOpen, CheckCircle2, ArrowRight, Download } from 'lucide-react'

const highlights = [
  'Forstå rommets akustikk før du kjøper utstyr',
  'Unngå de vanligste feilene i kirkeprosjekter',
  'Lær om absorpsjon, diffusjon og etterklang',
  'Praktiske råd basert på 30 års erfaring',
  'Skrevet for kirkeansatte, rådmenn og tekniske ansvarlige',
]

export default function BookSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="fagbok"
      ref={sectionRef}
      className="relative py-28 lg:py-40 bg-dark overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-copper/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Book info */}
          <div
            className={`transition-all duration-1000 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Fagbok
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream mb-6 leading-tight">
              Lydanlegg
              <br />
              <span className="text-gradient-copper">i kirkene</span>
            </h2>

            <p className="text-cream/60 text-base lg:text-lg leading-relaxed mb-4">
              Etter mer enn 30 år med lyd og akustikk i norske kirker har jeg sett
              de samme utfordringene igjen og igjen. Denne boken deler erfaringer
              og råd som kan bidra til bedre taletydelighet, riktigere prioriteringer
              og mer vellykkede prosjekter.
            </p>

            <p className="text-cream/40 text-sm leading-relaxed mb-8 italic">
              "Hvorfor skrev jeg denne boken? Fordom godt lydanlegg starter med
              forståelsen av rommet — ikke med spesifikasjonene til leverandøren."
            </p>

            {/* Highlights */}
            <div className="space-y-3 mb-10">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-copper-light mt-0.5 flex-shrink-0"
                  />
                  <span className="text-cream/60 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#kontakt"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-copper/20 text-copper-light border border-copper/40 rounded-full font-medium hover:bg-copper/30 hover:border-copper transition-all duration-300"
              >
                <BookOpen size={16} />
                Bestill boken
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="#kontakt"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-cream/60 border border-cream/15 rounded-full font-medium hover:text-cream hover:border-cream/30 transition-all duration-300"
              >
                <Download size={16} />
                Les utdrag
              </a>
            </div>
          </div>

          {/* Right - Book visual */}
          <div
            className={`relative transition-all duration-1000 delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative mx-auto max-w-sm">
              {/* Book cover mockup */}
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-dark-card via-dark-lighter to-dark-card border border-copper/15 shadow-2xl">
                {/* Book spine effect */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-copper/20 to-transparent" />

                {/* Cover content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  {/* Decorative top */}
                  <div className="w-16 h-px bg-copper/40 mb-8" />

                  <BookOpen
                    size={48}
                    className="text-copper-light/60 mb-6"
                    strokeWidth={1}
                  />

                  <p className="text-copper-light/50 text-xs tracking-[0.2em] uppercase mb-3">
                    Fagbok
                  </p>

                  <h3 className="font-serif text-2xl lg:text-3xl text-cream mb-2 leading-snug">
                    Lydanlegg
                    <br />
                    i kirkene
                  </h3>

                  <div className="w-12 h-px bg-copper/30 my-4" />

                  <p className="text-cream/40 text-sm mb-1">Av</p>
                  <p className="text-copper-light font-serif text-lg">
                    Thorbjørn Danbolt
                  </p>

                  <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                    <div className="w-16 h-px bg-copper/20" />
                  </div>
                </div>

                {/* Subtle pattern overlay */}
                <div
                  className="absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #C87941 1px, transparent 0)`,
                    backgroundSize: '16px 16px',
                  }}
                />

                {/* Corner decoration */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-copper/20 rounded-tr-lg" />
                <div className="absolute bottom-4 left-8 w-8 h-8 border-b border-l border-copper/20 rounded-bl-lg" />
              </div>

              {/* Floating stats */}
              <div className="absolute -bottom-4 -right-4 lg:-right-8 bg-dark-card border border-copper/15 rounded-lg p-3 shadow-lg">
                <p className="text-copper-light font-serif text-lg font-semibold">30+ år</p>
                <p className="text-cream/40 text-xs">Erfaring i boken</p>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 -top-8 -left-8 w-32 h-32 bg-copper/5 rounded-full blur-2xl" />
              <div className="absolute -z-10 -bottom-8 -right-8 w-40 h-40 bg-copper/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
