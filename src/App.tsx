import { useEffect, useState } from 'react'
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
import Footer from './sections/Footer'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <HelmetProvider>
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
    </HelmetProvider>
  )
}

export default App
