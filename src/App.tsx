import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import Philosophy from './sections/Philosophy'
import AcousticViz from './sections/AcousticViz'
import Services from './sections/Services'
import Process from './sections/Process'
import About from './sections/About'
import BookSection from './sections/BookSection'
import References from './sections/References'
import Contact from './sections/Contact'
import Blogg from './pages/Blogg'
import BloggPost from './pages/BloggPost'
import Footer from './sections/Footer'

// Videresender gamle HashRouter-adresser (danbolt.no/#/blogg/...) til de nye
// rene URL-ene (danbolt.no/blogg/...), slik at gamle delte lenker fortsatt virker.
function LegacyHashRedirect() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.hash.startsWith('#/')) {
      navigate(location.hash.slice(1), { replace: true })
    }
  }, [location.hash, navigate])

  return null
}

function Forside() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-dark text-cream overflow-x-hidden">
      <Navigation scrolled={scrolled} />
      <main>
        <Hero />
        <Philosophy />
        <AcousticViz />
        <Services />
        <Process />
        <About />
        <BookSection />
        <References />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

function BloggLayout() {
  return (
    <div className="relative min-h-screen bg-dark text-cream overflow-x-hidden">
      <Navigation scrolled={true} />
      <Blogg />
      <Footer />
    </div>
  )
}

function BloggPostLayout() {
  return (
    <div className="relative min-h-screen bg-dark text-cream overflow-x-hidden">
      <Navigation scrolled={true} />
      <BloggPost />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <LegacyHashRedirect />
        <Routes>
          <Route path="/" element={<Forside />} />
          <Route path="/blogg" element={<BloggLayout />} />
          <Route path="/blogg/:slug" element={<BloggPostLayout />} />
          {/* Ukjente adresser sendes til forsiden i stedet for å gi blank side */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
