import { useEffect, useRef, useState } from 'react'
import { useApp } from '../AppContext'

const NAV_KEYS = ['home', 'services', 'offers', 'platforms', 'about', 'contact']
const SECTION_IDS = {
  home: 'home',
  services: 'services',
  offers: 'offers',
  platforms: 'platforms',
  about: 'about',
  contact: 'contact',
}

export default function Navbar() {
  const { t, theme, toggleTheme, lang, setLang, languages } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const langRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the language menu when clicking outside it.
  useEffect(() => {
    const onClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const links = NAV_KEYS.map((key) => (
    <a key={key} href={`#${SECTION_IDS[key]}`} onClick={() => setMobileOpen(false)}>
      {t.nav[key]}
    </a>
  ))

  const navList = NAV_KEYS.map((key) => (
    <li key={key}>
      <a href={`#${SECTION_IDS[key]}`}>{t.nav[key]}</a>
    </li>
  ))

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#home" className="brand" aria-label="Yassine Lgnani home">
            <span className="brand-logo">YL</span>
            <span className="brand-name">
              Yassine <span className="grad">Lgnani</span>
            </span>
          </a>

          <ul className="nav-links">{navList}</ul>

          <div className="nav-actions">
            <button
              className="icon-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              <i className={theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'} />
            </button>

            <div className="lang-switch" ref={langRef}>
              <button
                className="icon-btn"
                onClick={() => setLangOpen((o) => !o)}
                aria-label="Change language"
                aria-expanded={langOpen}
              >
                <i className="fa-solid fa-globe" />
              </button>
              {langOpen && (
                <div className="lang-menu glass">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      className={l.code === lang ? 'active' : ''}
                      onClick={() => {
                        setLang(l.code)
                        setLangOpen(false)
                      }}
                    >
                      <strong>{l.label}</strong>
                      <span>{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="icon-btn menu-toggle"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Open menu"
            >
              <i className={mobileOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>{links}</div>
    </>
  )
}
