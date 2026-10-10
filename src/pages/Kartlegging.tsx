import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  AudioLines,
  Camera,
  CheckCircle2,
  Church as ChurchIcon,
  FileImage,
  ImagePlus,
  Mail,
  Mic,
  Phone,
  Ruler,
  Send,
  Users,
  X,
} from 'lucide-react'

// Skjemaet sendes til Netlify Forms. Feltnavnene må stemme med det skjulte
// skjemaet «kartlegging» i index.html, ellers lagrer ikke Netlify feltet.
const FORM_NAME = 'kartlegging'
// Netlify godtar inntil 8 MB per innsending. Vi holder litt margin.
const MAX_TOTAL_BYTES = 7.5 * 1024 * 1024

const steps = [
  { icon: ChurchIcon, title: 'Kirken' },
  { icon: Users, title: 'Bruk' },
  { icon: Mic, title: 'Utstyr' },
  { icon: Camera, title: 'Bilder' },
  { icon: Ruler, title: 'Rommet' },
]

const bruksomrader = ['Gudstjeneste', 'Begravelse', 'Vielse og dåp', 'Konsert', 'Musikkøvelser', 'Trosopplæring', 'Strømming']
const betjenere = ['Kirketjener', 'Prest', 'Organist / kantor', 'Frivillige', 'Vikarer', 'Egen lydtekniker']

const bildefelt = [
  { name: 'bilde_rack', title: 'Rack og forsterker', hint: 'Helt nært, så modellnavn kan leses' },
  { name: 'bilde_mikrofoner', title: 'Mikrofonene', hint: 'Alle mikrofoner og mottakere dere bruker' },
  { name: 'bilde_hoyttalere', title: 'Dagens høyttalere', hint: 'Der de henger i kirkerommet' },
  { name: 'bilde_fra_alter', title: 'Rommet fra alteret', hint: 'Stå ved alteret og ta bildet mot inngangen' },
  { name: 'bilde_fra_galleri', title: 'Rommet bakfra', hint: 'Fra galleriet eller bakerste benk mot alteret' },
  { name: 'bilde_strom', title: 'Strøm og kabler', hint: 'Stikkontakter og kabelføring ved utstyret' },
  { name: 'ekstra_bilde_1', title: 'Ekstra bilde', hint: 'Valgfritt – noe dere vil vise oss' },
  { name: 'ekstra_bilde_2', title: 'Ekstra bilde', hint: 'Valgfritt' },
]

const inputClass =
  'w-full px-4 py-3 bg-dark-lighter border border-cream/10 rounded-lg text-cream placeholder-cream/25 focus:border-copper/40 focus:outline-none focus:ring-1 focus:ring-copper/20 transition-all min-h-[48px]'
const labelClass = 'block text-cream/60 text-sm mb-2'

// Krymper bilder i nettleseren før opplasting, slik at mobilbilder på 4–8 MB
// blir ca. 300–600 kB. Filer som ikke kan leses (f.eks. PDF) sendes uendret.
async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith('image/') || file.type === 'image/gif') return file
  try {
    const bitmap = await createImageBitmap(file)
    const max = 1800
    const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    const ctx = canvas.getContext('2d')
    if (!ctx) return file
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.82))
    if (!blob || blob.size >= file.size) return file
    const name = file.name.replace(/\.[^.]+$/, '') + '.jpg'
    return new File([blob], name, { type: 'image/jpeg' })
  } catch {
    return file
  }
}

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} kB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function Chip({ label, active, onToggle }: { label: string; active: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onToggle}
      className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-all ${
        active
          ? 'bg-copper/20 text-copper-light border-copper/50'
          : 'text-cream/60 border-cream/15 hover:text-cream hover:border-cream/30'
      }`}
    >
      {label}
    </button>
  )
}

function FileTile({
  name,
  title,
  hint,
  accept,
  file,
  preview,
  busy,
  onSelect,
  onClear,
}: {
  name: string
  title: string
  hint: string
  accept: string
  file?: File
  preview?: string
  busy: boolean
  onSelect: (name: string, file: File) => void
  onClear: (name: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div className={`relative rounded-xl border p-4 transition-all ${file ? 'border-copper/40 bg-copper/[0.04]' : 'border-cream/10 bg-dark-lighter'}`}>
      {file ? (
        <div className="flex items-center gap-3">
          {preview ? (
            <img src={preview} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
          ) : (
            <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-copper/10 text-copper-light flex-shrink-0">
              {file.type.startsWith('audio') || file.type.startsWith('video') ? <AudioLines size={22} /> : <FileImage size={22} />}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-cream text-sm font-medium">{title}</p>
            <p className="text-cream/40 text-xs truncate">{file.name} · {formatSize(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              onClear(name)
              if (inputRef.current) inputRef.current.value = ''
            }}
            className="p-2 text-cream/40 hover:text-cream transition-colors"
            aria-label={`Fjern ${title.toLowerCase()}`}
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()} className="w-full flex items-center gap-3 text-left">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center border border-dashed border-cream/20 text-cream/40 flex-shrink-0">
            {busy ? <div className="w-5 h-5 border-2 border-copper-light/30 border-t-copper-light rounded-full animate-spin" /> : <ImagePlus size={22} />}
          </div>
          <div>
            <p className="text-cream text-sm font-medium">{title}</p>
            <p className="text-cream/40 text-xs leading-relaxed">{hint}</p>
          </div>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const selected = e.target.files?.[0]
          if (selected) onSelect(name, selected)
        }}
      />
    </div>
  )
}

export default function Kartlegging() {
  const formRef = useRef<HTMLFormElement>(null)
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sendFailed, setSendFailed] = useState(false)
  const [bruk, setBruk] = useState<string[]>([])
  const [betjentAv, setBetjentAv] = useState<string[]>([])
  const [files, setFiles] = useState<Record<string, File>>({})
  const [previews, setPreviews] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState<Record<string, boolean>>({})

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    return () => Object.values(previews).forEach((url) => URL.revokeObjectURL(url))
    // Forhåndsvisningene ryddes bare når siden forlates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalBytes = Object.values(files).reduce((sum, f) => sum + f.size, 0)

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])

  const selectFile = async (name: string, file: File) => {
    setBusy((b) => ({ ...b, [name]: true }))
    const ready = await compressImage(file)
    setFiles((f) => ({ ...f, [name]: ready }))
    if (ready.type.startsWith('image/')) {
      const url = URL.createObjectURL(ready)
      setPreviews((p) => {
        if (p[name]) URL.revokeObjectURL(p[name])
        return { ...p, [name]: url }
      })
    }
    setBusy((b) => ({ ...b, [name]: false }))
  }

  const clearFile = (name: string) => {
    setFiles((f) => {
      const next = { ...f }
      delete next[name]
      return next
    })
    setPreviews((p) => {
      if (p[name]) URL.revokeObjectURL(p[name])
      const next = { ...p }
      delete next[name]
      return next
    })
  }

  const validateStep = (): string => {
    const form = formRef.current
    if (!form) return ''
    if (step === 0) {
      const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | null)?.value.trim() ?? ''
      if (!get('kirke')) return 'Skriv navnet på kirken.'
      if (!get('kontaktperson')) return 'Skriv hvem vi skal kontakte.'
      const epost = get('epost')
      if (!epost || !/^\S+@\S+\.\S+$/.test(epost)) return 'Skriv en gyldig e-postadresse.'
    }
    if (step === 1 && bruk.length === 0) return 'Velg minst ett bruksområde.'
    return ''
  }

  const goTo = (target: number) => {
    if (target > step) {
      const message = validateStep()
      if (message) {
        setError(message)
        return
      }
    }
    setError('')
    setStep(target)
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (step < steps.length - 1) {
      goTo(step + 1)
      return
    }
    if (totalBytes > MAX_TOTAL_BYTES) {
      setError(`Vedleggene er til sammen ${formatSize(totalBytes)}. Fjern et vedlegg eller send det på e-post etterpå.`)
      return
    }
    setError('')
    setSending(true)

    const data = new FormData(e.currentTarget)
    data.set('form-name', FORM_NAME)
    data.set('bruk', bruk.join(', '))
    data.set('betjenes_av', betjentAv.join(', '))
    Object.entries(files).forEach(([name, file]) => data.set(name, file, file.name))

    try {
      const response = await fetch('/', { method: 'POST', body: data })
      if (!response.ok) throw new Error(String(response.status))
      setSubmitted(true)
    } catch {
      setSendFailed(true)
    } finally {
      setSending(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Alle steg ligger i skjemaet hele tiden (skjult med CSS), slik at alle
  // feltene blir med når skjemaet sendes.
  const stepClass = (index: number) => (index === step ? 'block' : 'hidden')

  return (
    <main className="min-h-screen bg-dark text-cream">
      <Helmet>
        <title>Kartlegging av lydanlegg i kirken | Thorbjørn Danbolt</title>
        <meta
          name="description"
          content="Fortell om kirken, dagens lydanlegg og rommet. Med bilder, plantegning og et kort lydopptak kan Kirkelydpakken tilpasses og leveres ferdig koblet."
        />
        <link rel="canonical" href="https://danbolt.no/kartlegging" />
        <meta property="og:title" content="Kartlegging av lydanlegg i kirken" />
        <meta property="og:description" content="Ca. 15 minutter. Grunnlaget for et ferdig tilpasset lydanlegg." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://danbolt.no/kartlegging" />
        <meta property="og:image" content="https://danbolt.no/blogg-kirke.jpg" />
        <meta property="og:locale" content="nb_NO" />
      </Helmet>

      <section className="relative pt-28 lg:pt-36 pb-24 lg:pb-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link
            to="/kirkelydpakken"
            className="inline-flex items-center gap-2 text-sm text-cream/50 hover:text-copper-light transition-colors mb-10"
          >
            <ArrowLeft size={15} />
            Tilbake til Kirkelydpakken
          </Link>

          {submitted ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 size={32} className="text-emerald-400" />
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-cream mb-4">Takk, kartleggingen er mottatt</h1>
              <p className="text-cream/60 leading-relaxed max-w-xl mx-auto mb-8">
                Thorbjørn går gjennom bildene og opplysningene, og tar kontakt for en kort samtale før dere får et
                konkret forslag. Mangler noe, sier han fra.
              </p>
              <a
                href="tel:+4797721779"
                className="inline-flex items-center gap-2 px-6 py-3 bg-copper/15 text-copper-light border border-copper/30 rounded-full text-sm hover:bg-copper/25 transition-all"
              >
                <Phone size={15} /> Ring Thorbjørn: 977 21 779
              </a>
            </div>
          ) : sendFailed ? (
            <div className="text-center py-16">
              <h1 className="font-serif text-3xl sm:text-4xl text-cream mb-4">Kartleggingen ble ikke sendt</h1>
              <p className="text-cream/60 leading-relaxed max-w-xl mx-auto mb-8">
                Noe gikk galt underveis. Svarene dine ligger fortsatt i skjemaet. Prøv igjen, eller send bildene
                direkte på e-post.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setSendFailed(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-copper/15 text-copper-light border border-copper/30 rounded-full text-sm hover:bg-copper/25 transition-all"
                >
                  Tilbake til skjemaet
                </button>
                <a
                  href="mailto:thorbjorn@danbolt.no?subject=Kartlegging%20av%20lydanlegg"
                  className="inline-flex items-center gap-2 px-6 py-3 text-cream/70 border border-cream/15 rounded-full text-sm hover:text-cream hover:border-cream/30 transition-all"
                >
                  <Mail size={15} /> Send på e-post
                </a>
              </div>
            </div>
          ) : null}

          <div className={submitted || sendFailed ? 'hidden' : 'block'}>
            <p className="text-copper-light text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Kartlegging · ca. 15 minutter
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl text-cream mb-5 leading-[1.1]">Fortell om kirken deres</h1>
            <p className="text-cream/60 text-lg leading-relaxed mb-12">
              Med disse opplysningene kan anlegget tilpasses, kobles og testes før det sendes til dere. Ha gjerne
              mobilen klar – bildene tar du underveis.
            </p>
            <a
              href="tel:+4797721779"
              className="inline-flex items-center gap-2 -mt-6 mb-12 text-copper-light hover:underline"
            >
              <Phone size={16} />
              Heller ta det på telefon? Ring 977 21 779
            </a>

            <form
              ref={formRef}
              name={FORM_NAME}
              method="POST"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              noValidate
              className="scroll-mt-28"
            >
              <input type="hidden" name="form-name" value={FORM_NAME} />
              <p className="hidden">
                <label>
                  Ikke fyll ut dette feltet: <input name="bot-field" />
                </label>
              </p>

              <ol className="grid grid-cols-5 gap-2 mb-10" aria-label="Fremdrift">
                {steps.map(({ icon: Icon, title }, index) => (
                  <li key={title}>
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      aria-current={index === step ? 'step' : undefined}
                      className="w-full text-left group"
                    >
                      <span
                        className={`block h-1 rounded-full mb-3 transition-colors ${
                          index <= step ? 'bg-copper' : 'bg-cream/10'
                        }`}
                      />
                      <span
                        className={`flex items-center gap-1.5 text-xs sm:text-sm ${
                          index === step ? 'text-copper-light' : 'text-cream/40 group-hover:text-cream/70'
                        }`}
                      >
                        <Icon size={15} className="hidden sm:block" />
                        {index + 1} {title}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>

              <div className="bg-dark-card rounded-2xl border border-copper/10 p-6 lg:p-10">
                {/* Steg 1: Kirken */}
                <fieldset className={`${stepClass(0)} space-y-5`}>
                  <legend className="font-serif text-2xl text-cream mb-6">Kirken og kontaktperson</legend>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass} htmlFor="kirke">Kirke <span className="text-copper">*</span></label>
                      <input id="kirke" name="kirke" className={inputClass} placeholder="Navn på kirken" />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="sted">Sted / kommune</label>
                      <input id="sted" name="sted" className={inputClass} placeholder="Sted eller kommune" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="menighet">Menighet eller fellesråd</label>
                    <input id="menighet" name="menighet" className={inputClass} placeholder="Navn på menighet eller fellesråd" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass} htmlFor="kontaktperson">Kontaktperson <span className="text-copper">*</span></label>
                      <input id="kontaktperson" name="kontaktperson" className={inputClass} placeholder="Fornavn Etternavn" />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="rolle">Rolle</label>
                      <input id="rolle" name="rolle" className={inputClass} placeholder="Kirkeverge, kirketjener, prest …" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass} htmlFor="epost">E-post <span className="text-copper">*</span></label>
                      <input id="epost" name="epost" type="email" className={inputClass} placeholder="navn@kirken.no" />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="telefon">Telefon</label>
                      <input id="telefon" name="telefon" type="tel" className={inputClass} placeholder="900 00 000" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-5">
                    <div>
                      <label className={labelClass} htmlFor="sitteplasser">Sitteplasser</label>
                      <select id="sitteplasser" name="sitteplasser" className={inputClass} defaultValue="">
                        <option value="">Velg</option>
                        <option>Under 100</option>
                        <option>100–250</option>
                        <option>250–500</option>
                        <option>Over 500</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="galleri">Galleri</label>
                      <select id="galleri" name="galleri" className={inputClass} defaultValue="">
                        <option value="">Velg</option>
                        <option>Ja</option>
                        <option>Nei</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="kirketype">Bygget</label>
                      <select id="kirketype" name="kirketype" className={inputClass} defaultValue="">
                        <option value="">Velg</option>
                        <option>Trekirke</option>
                        <option>Steinkirke / mur</option>
                        <option>Betong / moderne</option>
                        <option>Vet ikke</option>
                      </select>
                    </div>
                  </div>
                </fieldset>

                {/* Steg 2: Bruk */}
                <fieldset className={`${stepClass(1)} space-y-7`}>
                  <legend className="font-serif text-2xl text-cream mb-6">Hvordan brukes kirken?</legend>
                  <input type="hidden" name="bruk" value={bruk.join(', ')} />
                  <input type="hidden" name="betjenes_av" value={betjentAv.join(', ')} />
                  <div>
                    <p className={labelClass}>Hva brukes kirken til? <span className="text-copper">*</span></p>
                    <div className="flex flex-wrap gap-2">
                      {bruksomrader.map((item) => (
                        <Chip key={item} label={item} active={bruk.includes(item)} onToggle={() => toggle(bruk, setBruk, item)} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className={labelClass}>Hvem betjener anlegget?</p>
                    <div className="flex flex-wrap gap-2">
                      {betjenere.map((item) => (
                        <Chip key={item} label={item} active={betjentAv.includes(item)} onToggle={() => toggle(betjentAv, setBetjentAv, item)} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="storste_problem">Hva fungerer dårligst i dag?</label>
                    <textarea
                      id="storste_problem"
                      name="storste_problem"
                      rows={3}
                      className={`${inputClass} resize-none`}
                      placeholder="Beskriv kort hva som ikke fungerer godt nok i dag"
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="tidsplan">Når ønsker dere oppgradering, justering eller nytt lydanlegg?</label>
                    <select id="tidsplan" name="tidsplan" className={inputClass} defaultValue="">
                      <option value="">Velg</option>
                      <option>Så snart som mulig</option>
                      <option>I løpet av et halvt år</option>
                      <option>Må inn i neste års budsjett</option>
                      <option>Avhenger av finansiering</option>
                      <option>Vet ikke ennå</option>
                    </select>
                  </div>
                </fieldset>

                {/* Steg 3: Utstyr */}
                <fieldset className={`${stepClass(2)} space-y-5`}>
                  <legend className="font-serif text-2xl text-cream mb-2">Dagens utstyr</legend>
                  <p className="text-cream/45 text-sm mb-4">
                    Det som fungerer, kan som regel brukes videre. Skriv det dere vet – bildene i neste steg fyller ut
                    resten.
                  </p>
                  <div>
                    <label className={labelClass} htmlFor="mikser_forsterker">Mikser, forsterker eller lydprosessor</label>
                    <input id="mikser_forsterker" name="mikser_forsterker" className={inputClass} placeholder="Merke og modell hvis dere vet det" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass} htmlFor="hoyttalere_status">Fungerer høyttalerne?</label>
                      <select id="hoyttalere_status" name="hoyttalere_status" className={inputClass} defaultValue="">
                        <option value="">Velg</option>
                        <option>Ja, godt</option>
                        <option>Delvis</option>
                        <option>Nei</option>
                        <option>Vet ikke</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="teleslynge">Teleslynge</label>
                      <select id="teleslynge" name="teleslynge" className={inputClass} defaultValue="">
                        <option value="">Velg</option>
                        <option>Finnes og fungerer</option>
                        <option>Finnes, usikker på om den fungerer</option>
                        <option>Har ikke teleslynge</option>
                        <option>Vet ikke</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass} htmlFor="tradlose_mikrofoner">Trådløse mikrofoner</label>
                      <input id="tradlose_mikrofoner" name="tradlose_mikrofoner" className={inputClass} placeholder="Antall og type" />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="kablede_mikrofoner">Kablede mikrofoner</label>
                      <input id="kablede_mikrofoner" name="kablede_mikrofoner" className={inputClass} placeholder="Antall og hvor de står" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="musikkavspilling">Hvordan spilles musikk av i dag?</label>
                    <input id="musikkavspilling" name="musikkavspilling" className={inputClass} placeholder="Utstyr eller måte dere spiller musikk på" />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="annet_utstyr">Annet vi bør vite om</label>
                    <textarea
                      id="annet_utstyr"
                      name="annet_utstyr"
                      rows={3}
                      className={`${inputClass} resize-none`}
                      placeholder="Andre behov, ønsker eller utstyr"
                    />
                  </div>
                </fieldset>

                {/* Steg 4: Bilder */}
                <fieldset className={`${stepClass(3)}`}>
                  <legend className="font-serif text-2xl text-cream mb-2">Bilder</legend>
                  <p className="text-cream/45 text-sm mb-6">
                    Ta bildene med mobilen. De blir automatisk gjort mindre før de sendes. Hopp over det som ikke
                    finnes hos dere.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {bildefelt.map(({ name, title, hint }) => (
                      <FileTile
                        key={name}
                        name={name}
                        title={title}
                        hint={hint}
                        accept="image/*"
                        file={files[name]}
                        preview={previews[name]}
                        busy={!!busy[name]}
                        onSelect={selectFile}
                        onClear={clearFile}
                      />
                    ))}
                  </div>
                </fieldset>

                {/* Steg 5: Rommet */}
                <fieldset className={`${stepClass(4)} space-y-6`}>
                  <legend className="font-serif text-2xl text-cream mb-2">Rommet</legend>
                  <FileTile
                    name="plantegning"
                    title="Plantegning"
                    hint="Bilde eller PDF, gjerne med benker, søyler og galleri tegnet inn"
                    accept="image/*,application/pdf"
                    file={files.plantegning}
                    preview={previews.plantegning}
                    busy={!!busy.plantegning}
                    onSelect={selectFile}
                    onClear={clearFile}
                  />
                  <div>
                    <p className="text-cream/60 text-sm mb-3">Har dere ikke plantegning? Skritt opp rommet – omtrentlige mål holder.</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className={labelClass} htmlFor="lengde">Lengde (m)</label>
                        <input id="lengde" name="lengde" inputMode="decimal" className={inputClass} placeholder="ca." />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="bredde">Bredde (m)</label>
                        <input id="bredde" name="bredde" inputMode="decimal" className={inputClass} placeholder="ca." />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="takhoyde">Takhøyde (m)</label>
                        <input id="takhoyde" name="takhoyde" inputMode="decimal" className={inputClass} placeholder="ca." />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-copper/25 bg-copper/[0.04] p-5">
                    <div className="flex items-start gap-3 mb-4">
                      <AudioLines size={20} className="text-copper-light flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-cream font-medium mb-1">Lydopptak av rommet</p>
                        <p className="text-cream/55 text-sm leading-relaxed">
                          Når kirken er tom: Stå ved alteret, start opptak på mobilen, klapp én gang hardt og vent fem
                          sekunder til klangen har dødd ut. Opptaket viser hvor lenge lyden henger i rommet.
                        </p>
                      </div>
                    </div>
                    <FileTile
                      name="lydopptak"
                      title="Lydopptak"
                      hint="Lydfil eller kort video, maks 10 sekunder"
                      accept="audio/*,video/*"
                      file={files.lydopptak}
                      busy={!!busy.lydopptak}
                      onSelect={selectFile}
                      onClear={clearFile}
                    />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="kommentar">Noe mer?</label>
                    <textarea id="kommentar" name="kommentar" rows={3} className={`${inputClass} resize-none`} placeholder="Spørsmål eller ønsker" />
                  </div>
                  <p className="text-cream/35 text-xs leading-relaxed">
                    Opplysningene brukes bare til å vurdere lydløsning for kirken og deles ikke med andre.
                  </p>
                </fieldset>

                {error && (
                  <p className="mt-6 text-sm text-amber-300" role="alert">
                    {error}
                  </p>
                )}

                {Object.keys(files).length > 0 && (
                  <p className={`mt-6 text-xs ${totalBytes > MAX_TOTAL_BYTES ? 'text-amber-300' : 'text-cream/35'}`}>
                    Vedlegg: {Object.keys(files).length} · {formatSize(totalBytes)} av maks {formatSize(MAX_TOTAL_BYTES)}
                  </p>
                )}

                <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-cream/10">
                  <button
                    type="button"
                    onClick={() => goTo(step - 1)}
                    className={`inline-flex items-center gap-2 px-5 py-3 text-cream/60 border border-cream/15 rounded-full text-sm hover:text-cream hover:border-cream/30 transition-all ${
                      step === 0 ? 'invisible' : ''
                    }`}
                  >
                    <ArrowLeft size={15} />
                    Tilbake
                  </button>
                  {step < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => goTo(step + 1)}
                      className="group inline-flex items-center gap-2 px-6 py-3 bg-copper/20 text-copper-light border border-copper/40 rounded-full text-sm font-medium hover:bg-copper/30 hover:border-copper transition-all"
                    >
                      Neste: {steps[step + 1].title.toLowerCase()}
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-copper/20 text-copper-light border border-copper/40 rounded-full text-sm font-medium hover:bg-copper/30 hover:border-copper transition-all disabled:opacity-50"
                    >
                      {sending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-copper-light/30 border-t-copper-light rounded-full animate-spin" />
                          Sender…
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          Send kartleggingen
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>

            <div className="mt-8 rounded-2xl border border-copper/30 bg-copper/[0.05] p-6 lg:p-8 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="w-14 h-14 flex-shrink-0 rounded-full bg-copper/15 border border-copper/30 flex items-center justify-center text-copper-light">
                <Phone size={24} />
              </div>
              <div className="flex-1">
                <p className="font-serif text-2xl text-cream mb-1">Lettere å ta det på telefon?</p>
                <p className="text-cream/55">Ring Thorbjørn, så går dere gjennom kartleggingen sammen.</p>
              </div>
              <a
                href="tel:+4797721779"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-copper/20 text-copper-light border border-copper/40 rounded-full font-medium text-lg hover:bg-copper/30 hover:border-copper transition-all whitespace-nowrap"
              >
                <Phone size={18} />
                977 21 779
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
