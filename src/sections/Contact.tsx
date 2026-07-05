import { useState, useEffect, useRef } from 'react'
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({ navn: '', etternavn: '', epost: '', beskjed: '' })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    // Using Formspree - replace FORMSPREE_ID with your actual form ID
    // Get your free form ID at: https://formspree.io/
    const FORMSPREE_ID = 'mdaryrlz' // Your Formspree form ID

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          navn: form.navn,
          etternavn: form.etternavn,
          epost: form.epost,
          beskjed: form.beskjed,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setForm({ navn: '', etternavn: '', epost: '', beskjed: '' })
      } else {
        // Fallback: open email client with pre-filled message
        openMailto()
      }
    } catch {
      // If Formspree fails, fallback to email client
      openMailto()
    } finally {
      setSending(false)
    }
  }

  const openMailto = () => {
    const subject = `Henvendelse fra ${form.navn} ${form.etternavn}`
    const body = `Navn: ${form.navn} ${form.etternavn}\nE-post: ${form.epost}\n\nBeskjed:\n${form.beskjed}`
    window.location.href = `mailto:thorbjorn@danbolt.no?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  return (
    <section id="kontakt" ref={sectionRef} className="relative py-28 lg:py-40 bg-dark overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">La oss diskutere ditt prosjekt</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream mb-6">Ta kontakt</h2>
          <p className="text-cream/50 text-base lg:text-lg max-w-xl mx-auto">
            Har dere utfordringer med taletydelighet, romakustikk, lydanlegg eller tekniske løsninger?
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className={`lg:col-span-2 space-y-8 transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="space-y-5">
              <a href="tel:+4797721779" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-copper/10 border border-copper/20 flex items-center justify-center group-hover:bg-copper/20 transition-colors">
                  <Phone size={18} className="text-copper-light" />
                </div>
                <div>
                  <p className="text-cream/40 text-xs uppercase tracking-wider mb-0.5">Telefon</p>
                  <p className="text-cream group-hover:text-copper-light transition-colors">+47 977 21 779</p>
                </div>
              </a>

              <a href="mailto:thorbjorn@danbolt.no" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-copper/10 border border-copper/20 flex items-center justify-center group-hover:bg-copper/20 transition-colors">
                  <Mail size={18} className="text-copper-light" />
                </div>
                <div>
                  <p className="text-cream/40 text-xs uppercase tracking-wider mb-0.5">E-post</p>
                  <p className="text-cream group-hover:text-copper-light transition-colors">thorbjorn@danbolt.no</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-copper/10 border border-copper/20 flex items-center justify-center">
                  <MapPin size={18} className="text-copper-light" />
                </div>
                <div>
                  <p className="text-cream/40 text-xs uppercase tracking-wider mb-0.5">Adresse</p>
                  <p className="text-cream">Lørenskog, Norge</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-cream/5">
              <p className="text-cream/40 text-xs uppercase tracking-wider mb-3">Arbeidsområde</p>
              <p className="text-cream/60 text-sm">Hele Norge — med spesialkompetanse på kirker, kulturhus, konferansesenter, auditorier og møterom.</p>
            </div>
          </div>

          {/* Form */}
          <div className={`lg:col-span-3 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-dark-card rounded-2xl border border-copper/10 p-6 lg:p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="font-serif text-2xl text-cream mb-2">Takk for henvendelsen!</h3>
                  <p className="text-cream/50 mb-6">Jeg kontakter deg så snart som mulig.</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a href="tel:+4797721779" className="inline-flex items-center gap-2 px-5 py-2.5 bg-copper/15 text-copper-light border border-copper/30 rounded-full text-sm hover:bg-copper/25 transition-all">
                      <Phone size={14} /> Ring meg direkte
                    </a>
                    <a href="mailto:thorbjorn@danbolt.no" className="inline-flex items-center gap-2 px-5 py-2.5 text-cream/60 border border-cream/15 rounded-full text-sm hover:text-cream hover:border-cream/30 transition-all">
                      <Mail size={14} /> Send e-post
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-cream/50 text-sm mb-2">Navn <span className="text-copper">*</span></label>
                      <input
                        type="text"
                        required
                        value={form.navn}
                        onChange={(e) => setForm({ ...form, navn: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-lighter border border-cream/10 rounded-lg text-cream placeholder-cream/20 focus:border-copper/40 focus:outline-none focus:ring-1 focus:ring-copper/20 transition-all min-h-[48px]"
                        placeholder="Ditt navn"
                      />
                    </div>
                    <div>
                      <label className="block text-cream/50 text-sm mb-2">Etternavn</label>
                      <input
                        type="text"
                        value={form.etternavn}
                        onChange={(e) => setForm({ ...form, etternavn: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-lighter border border-cream/10 rounded-lg text-cream placeholder-cream/20 focus:border-copper/40 focus:outline-none focus:ring-1 focus:ring-copper/20 transition-all min-h-[48px]"
                        placeholder="Ditt etternavn"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-cream/50 text-sm mb-2">E-post <span className="text-copper">*</span></label>
                    <input
                      type="email"
                      required
                      value={form.epost}
                      onChange={(e) => setForm({ ...form, epost: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-lighter border border-cream/10 rounded-lg text-cream placeholder-cream/20 focus:border-copper/40 focus:outline-none focus:ring-1 focus:ring-copper/20 transition-all min-h-[48px]"
                      placeholder="din@epost.no"
                    />
                  </div>

                  <div>
                    <label className="block text-cream/50 text-sm mb-2">Beskjed</label>
                    <textarea
                      rows={4}
                      value={form.beskjed}
                      onChange={(e) => setForm({ ...form, beskjed: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-lighter border border-cream/10 rounded-lg text-cream placeholder-cream/20 focus:border-copper/40 focus:outline-none focus:ring-1 focus:ring-copper/20 transition-all resize-none min-h-[120px]"
                      placeholder="Fortell meg om ditt prosjekt..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full sm:w-auto px-8 py-3.5 bg-copper/20 text-copper-light border border-copper/40 rounded-lg font-medium hover:bg-copper/30 hover:border-copper/60 transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-copper-light/30 border-t-copper-light rounded-full animate-spin" />
                        Sender...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send melding
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
