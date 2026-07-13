import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Phone } from 'lucide-react'

const references = [
  { name: 'Ål Kulturhus', category: 'Kulturhus', description: 'Romakustisk vurdering, akustikkplater og etterklangsanlegg – rommet ble behandlet før elektronikken ble dimensjonert.', color: 'from-amber-900/40 to-dark-card' },
  { name: 'Åsane Kulturhus', category: 'Kulturhus', description: 'Etterklangsanlegg', color: 'from-slate-800/40 to-dark-card' },
]

export default function References() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="referanser" ref={sectionRef} className="relative py-28 lg:py-40 bg-dark overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">Noen av mine</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream">Prosjekter</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {references.map((ref, i) => (
            <div key={ref.name}
              className={`group relative bg-gradient-to-br ${ref.color} rounded-xl border border-copper/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-copper/30 hover:shadow-glow ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: visible ? `${i * 100}ms` : '0ms' }}>
              <div className="p-6 lg:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-copper-light/60 text-xs font-medium tracking-wider uppercase">{ref.category}</span>
                    <h3 className="font-serif text-xl lg:text-2xl text-cream mt-1 group-hover:text-copper-light transition-colors">{ref.name}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-copper/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={16} className="text-copper-light" />
                  </div>
                </div>
                <p className="text-cream/50 text-sm">{ref.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-copper/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
        {/* CTA Button */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="#kontakt" onClick={(e) => { e.preventDefault(); document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-copper/20 text-copper-light border border-copper/50 rounded-full font-medium hover:bg-copper/30 hover:border-copper transition-all duration-300 min-h-[52px]">
            <Phone size={16} />
            Diskuter ditt prosjekt
          </a>
        </div>
      </div>
    </section>
  )
}
