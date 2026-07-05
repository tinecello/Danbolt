import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 100, suffix: '+', label: 'Kirker', description: 'Målinger, analyser og systemdesign' },
  { value: 30, suffix: '+', label: 'Års erfaring', description: 'Med lyd, akustikk og prosjektering' },
  { value: 500, suffix: '+', label: 'Prosjekter', description: 'Kirker, kulturhus, skoler og bedrifter' },
]

function AnimatedNumber({ value, suffix, visible }: { value: number; suffix: string; visible: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!visible) return
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value, visible])

  return (
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 bg-dark overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-card/50 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-1000 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className="font-serif text-5xl sm:text-6xl lg:text-7xl text-gradient-copper mb-3">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} visible={visible} />
              </div>
              <p className="text-cream font-medium text-lg mb-1">{stat.label}</p>
              <p className="text-cream/40 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
