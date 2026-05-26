import { useApp } from '../AppContext'
import { SITE } from '../config'

export default function Hero() {
  const { t } = useApp()
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-inner">
          <span className="eyebrow reveal">
            <i className="fa-solid fa-bolt" /> {t.hero.badge}
          </span>
          <h1 className="reveal">
            {t.hero.title.split(' ').slice(0, -2).join(' ')}{' '}
            <span className="grad">{t.hero.title.split(' ').slice(-2).join(' ')}</span>
          </h1>
          <p className="reveal">{t.hero.subtitle}</p>
          <div className="hero-cta reveal">
            <a href="#contact" className="btn btn-primary">
              <i className="fa-solid fa-rocket" /> {t.hero.getStarted}
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <i className="fa-brands fa-whatsapp" /> {t.hero.whatsapp}
            </a>
          </div>
          <a href="#services" className="scroll-hint" aria-hidden="true">
            <i className="fa-solid fa-angles-down" />
          </a>
        </div>
      </div>
    </section>
  )
}
