import { useState, useEffect, useRef } from 'react'
import { AlertTriangle, CheckCircle2, MoveHorizontal } from 'lucide-react'

export default function AcousticViz() {
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    setSliderPos(Math.max(5, Math.min(95, x)))
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX)
    }
    const stopDrag = () => setIsDragging(false)

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('mouseup', stopDrag)
      window.addEventListener('touchend', stopDrag)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('mouseup', stopDrag)
      window.removeEventListener('touchend', stopDrag)
    }
  }, [isDragging])

  return (
    <section
      id="akustikk"
      ref={sectionRef}
      className="relative py-28 lg:py-40 bg-dark overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Hvorfor akustisk vurdering er kritisk
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream mb-6">
            Rommet først, lydanlegg etter
          </h2>
          <p className="text-cream/50 text-base lg:text-lg max-w-2xl mx-auto">
            Dra slideren for å se forskjellen mellom å kjøpe lydanlegg uten
            akustisk vurdering — og med grundig forarbeid.
          </p>
        </div>

        {/* Comparison Slider */}
        <div
          className={`relative transition-all duration-1000 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div
            ref={containerRef}
            className="relative rounded-2xl overflow-hidden border border-copper/10 cursor-col-resize select-none"
            style={{ height: '440px' }}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            {/* LAYER 1: FØR - Clipped to left side only */}
            <div
              className="absolute inset-0 z-[1]"
              style={{
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              }}
            >
              {/* Solid background */}
              <div className="absolute inset-0 bg-[#1a0e0e]" />

              <div className="relative z-10 flex flex-col items-center justify-center h-full p-8">
                <div className="flex items-center gap-2 mb-5">
                  <AlertTriangle className="text-red-400" size={22} />
                  <span className="text-red-300 font-medium text-sm tracking-wider uppercase">
                    Før akustisk vurdering
                  </span>
                </div>

                {/* Chaotic waves */}
                <svg viewBox="0 0 400 130" className="w-full max-w-sm mb-5">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <path
                      key={i}
                      d={Array.from({ length: 41 }, (_, j) => {
                        const x = j * 10
                        const baseY = 65 + Math.sin(i * 2.3) * 20
                        const chaos = Math.sin(j * 0.8 + i * 3) * 18 + Math.sin(j * 1.7 + i) * 12
                        return `${j === 0 ? 'M' : 'L'}${x},${baseY + chaos}`
                      }).join(' ')}
                      fill="none"
                      stroke={`rgba(248, 113, 113, ${0.5 + i * 0.08})`}
                      strokeWidth="1.5"
                    />
                  ))}
                  {[
                    [30, 20], [80, 100], [120, 40], [180, 110], [230, 30],
                    [280, 95], [340, 15], [50, 115], [150, 25], [320, 50],
                  ].map(([cx, cy], i) => (
                    <circle
                      key={`dot-${i}`}
                      cx={cx}
                      cy={cy}
                      r={2}
                      fill={`rgba(248, 113, 113, ${0.35 + (i % 3) * 0.1})`}
                    />
                  ))}
                  <g opacity="0.6">
                    <text x="340" y="25" fill="#f87171" fontSize="16">✕</text>
                    <text x="45" y="115" fill="#f87171" fontSize="16">✕</text>
                  </g>
                </svg>

                <div className="space-y-1.5 text-center">
                  <p className="text-red-300/70 text-sm">Uklar taleforståelse</p>
                  <p className="text-red-300/70 text-sm">Høye etterklangstider</p>
                  <p className="text-red-300/70 text-sm">Dårlig frekvensbalanse</p>
                  <p className="text-red-400 font-semibold text-sm mt-3">
                    Ofte 3-5x høyere kostnader på sikt
                  </p>
                </div>
              </div>
            </div>

            {/* LAYER 2: ETTER - Clipped to right side only */}
            <div
              className="absolute inset-0 z-[2]"
              style={{
                clipPath: `inset(0 0 0 ${sliderPos}%)`,
              }}
            >
              {/* Solid background */}
              <div className="absolute inset-0 bg-[#0e1a14]" />

              <div className="relative z-10 flex flex-col items-center justify-center h-full p-8">
                <div className="flex items-center gap-2 mb-5">
                  <CheckCircle2 className="text-emerald-400" size={22} />
                  <span className="text-emerald-300 font-medium text-sm tracking-wider uppercase">
                    Etter akustisk vurdering
                  </span>
                </div>

                {/* Clean waves */}
                <svg viewBox="0 0 400 130" className="w-full max-w-sm mb-5">
                  {[0, 1, 2, 3].map((i) => (
                    <path
                      key={i}
                      d={`M0,${52 + i * 8} Q50,${42 + i * 8} 100,${52 + i * 8} T200,${52 + i * 8} T300,${52 + i * 8} T400,${52 + i * 8}`}
                      fill="none"
                      stroke={`rgba(52, 211, 153, ${0.6 - i * 0.08})`}
                      strokeWidth="2"
                    />
                  ))}
                  <path
                    d="M0,65 Q25,45 50,65 T100,65 T150,65 T200,65 T250,65 T300,65 T350,65 T400,65"
                    fill="none"
                    stroke="rgba(52, 211, 153, 0.9)"
                    strokeWidth="2.5"
                  />
                  {[
                    [85, 30, 18, 70],
                    [185, 25, 18, 80],
                    [285, 30, 18, 70],
                    [345, 35, 14, 60],
                  ].map(([x, y, w, h], i) => (
                    <rect
                      key={`abs-${i}`}
                      x={x}
                      y={y}
                      width={w}
                      height={h}
                      rx={3}
                      fill="rgba(52, 211, 153, 0.12)"
                      stroke="rgba(52, 211, 153, 0.3)"
                      strokeWidth="1"
                    />
                  ))}
                  <g opacity="0.6">
                    <text x="88" y="28" fill="#34d399" fontSize="14">✓</text>
                    <text x="188" y="23" fill="#34d399" fontSize="14">✓</text>
                    <text x="288" y="28" fill="#34d399" fontSize="14">✓</text>
                  </g>
                </svg>

                <div className="space-y-1.5 text-center">
                  <p className="text-emerald-300/70 text-sm">Klar og tydelig tale</p>
                  <p className="text-emerald-300/70 text-sm">Optimal etterklangstid</p>
                  <p className="text-emerald-300/70 text-sm">Balansert frekvensrespons</p>
                  <p className="text-emerald-400 font-semibold text-sm mt-3">
                    Langsiktig kostnadsbesparelse
                  </p>
                </div>
              </div>
            </div>

            {/* Slider divider */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-copper z-[3] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-copper rounded-full flex items-center justify-center shadow-glow border-2 border-dark cursor-col-resize pointer-events-auto"
                onMouseDown={() => setIsDragging(true)}
                onTouchStart={() => setIsDragging(true)}
              >
                <MoveHorizontal size={16} className="text-dark" />
              </div>
            </div>
          </div>

          <p className="text-center text-cream/30 text-xs mt-4 flex items-center justify-center gap-2">
            <MoveHorizontal size={12} />
            Dra for å sammenligne
          </p>
        </div>

        {/* Bottom message */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-copper/5 border border-copper/15 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-copper/15 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="text-copper-light" size={20} />
            </div>
            <p className="text-cream/70 text-sm lg:text-base text-left">
              <strong className="text-cream">Invester i uavhengig rådgivning først.</strong>
              <br />
              Det sparer dere for dyre feilkjøp – enten løsningen er akustisk behandling, nytt lydanlegg eller bare justering av det dere har. Anbefalingen min er aldri påvirket av hva en leverandør ønsker å levere.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
