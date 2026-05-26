import { useEffect, useState } from 'react'
import { useApp } from './AppContext'
import { useRevealOnScroll } from './hooks'
import { SITE } from './config'
import Background from './components/Background'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import {
  Platforms,
  Services,
  Offers,
  WhyChooseUs,
  Stats,
  ContentBranding,
  Testimonials,
  Showcase,
  Contact,
  FinalCTA,
} from './components/Sections'

export default function App() {
  const { lang } = useApp()
  const [loaded, setLoaded] = useState(false)

  // Brief loading animation on first paint.
  useEffect(() => {
    const tmr = setTimeout(() => setLoaded(true), 900)
    return () => clearTimeout(tmr)
  }, [])

  // Re-scan reveal targets whenever language changes (content re-renders).
  useRevealOnScroll([lang, loaded])

  return (
    <>
      <Loader hide={loaded} />
      <Background />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Offers />
        <Platforms />
        <Stats />
        <WhyChooseUs />
        <ContentBranding />
        <Testimonials />
        <Showcase />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />

      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="Chat on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp" />
      </a>
    </>
  )
}
