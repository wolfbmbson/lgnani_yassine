import { useApp } from '../AppContext'
import { useCountUp } from '../hooks'
import {
  SITE,
  PLATFORMS,
  SERVICE_ICONS,
  WHY_ICONS,
  CONTENT_ICONS,
  STAT_ICONS,
} from '../config'

/* ---------- Reusable section header ---------- */
function Head({ title, sub, eyebrow }) {
  return (
    <div className="section-head reveal">
      {eyebrow && (
        <span className="eyebrow" style={{ marginBottom: 16 }}>
          <i className="fa-solid fa-sparkles" /> {eyebrow}
        </span>
      )}
      <h2 className="section-title">
        {title.main} <span className="grad">{title.grad}</span>
      </h2>
      {sub && <p className="section-sub">{sub}</p>}
    </div>
  )
}

// Splits a localized title into a plain head and a gradient tail (last word/phrase).
function splitTitle(text) {
  const parts = text.trim().split(' ')
  if (parts.length === 1) return { main: '', grad: text }
  return { main: parts.slice(0, -1).join(' '), grad: parts.slice(-1).join(' ') }
}

/* ============================ Platforms ============================ */
export function Platforms() {
  const { t } = useApp()
  return (
    <section id="platforms">
      <div className="container">
        <Head title={splitTitle(t.platforms.title)} sub={t.platforms.subtitle} />
        <div className="platforms-grid">
          {PLATFORMS.map((p, i) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="platform glass reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <i className={p.icon} style={{ color: p.color }} />
              <span>{p.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================ Services ============================ */
export function Services() {
  const { t } = useApp()
  return (
    <section id="services">
      <div className="container">
        <Head
          eyebrow={t.nav.services}
          title={splitTitle(t.services.title)}
          sub={t.services.subtitle}
        />
        <div className="grid grid-3">
          {t.services.items.map((s, i) => (
            <article
              key={s.title}
              className="card glass reveal"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <div className="card-icon">
                <i className={SERVICE_ICONS[i]} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================ Offers ============================ */
export function Offers() {
  const { t } = useApp()
  const links = [SITE.whatsapp, SITE.whatsapp, SITE.whatsapp, SITE.whatsapp]
  return (
    <section id="offers">
      <div className="container">
        <Head
          eyebrow={t.nav.offers}
          title={splitTitle(t.offers.title)}
          sub={t.offers.subtitle}
        />
        <div className="offers-grid">
          {t.offers.items.map((o, i) => (
            <article
              key={o.title}
              className={`offer glass reveal ${i === 2 ? 'featured' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {i === 2 && <span className="offer-badge">{t.offers.popular}</span>}
              <h3>{o.title}</h3>
              <div className="offer-price">{o.price}</div>
              <ul className="offer-features">
                {o.features.map((f) => (
                  <li key={f}>
                    <i className="fa-solid fa-circle-check" /> {f}
                  </li>
                ))}
              </ul>
              <a
                href={links[i]}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${i === 2 || i === 3 ? 'btn-primary' : 'btn-ghost'}`}
              >
                {o.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================ Why Choose Us ============================ */
export function WhyChooseUs() {
  const { t } = useApp()
  return (
    <section id="about">
      <div className="container">
        <Head
          eyebrow={t.nav.about}
          title={splitTitle(t.why.title)}
          sub={t.why.subtitle}
        />
        <div className="grid grid-3">
          {t.why.items.map((w, i) => (
            <article
              key={w.title}
              className="card glass reveal"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <div className="card-icon">
                <i className={WHY_ICONS[i]} />
              </div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================ Stats ============================ */
function Stat({ icon, value, suffix, label }) {
  const [ref, n] = useCountUp(value)
  return (
    <div className="stat glass reveal" ref={ref}>
      <i className={icon} />
      <div className="stat-value">
        {n}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export function Stats() {
  const { t } = useApp()
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {t.stats.items.map((s, i) => (
            <Stat key={s.label} icon={STAT_ICONS[i]} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================ Content & Branding ============================ */
export function ContentBranding() {
  const { t } = useApp()
  return (
    <section>
      <div className="container">
        <Head title={splitTitle(t.content.title)} sub={t.content.subtitle} />
        <div className="grid grid-3">
          {t.content.items.map((c, i) => (
            <article
              key={c.title}
              className="card glass reveal"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <div className="card-icon">
                <i className={CONTENT_ICONS[i]} />
              </div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================ Testimonials ============================ */
export function Testimonials() {
  const { t } = useApp()
  return (
    <section>
      <div className="container">
        <Head title={splitTitle(t.testimonials.title)} sub={t.testimonials.subtitle} />
        <div className="grid grid-2">
          {t.testimonials.items.map((tm, i) => (
            <article
              key={tm.name}
              className="testimonial glass reveal"
              style={{ transitionDelay: `${(i % 2) * 90}ms` }}
            >
              <i className="fa-solid fa-quote-left quote-icon" />
              <div className="stars">
                {'★★★★★'.split('').map((s, idx) => (
                  <span key={idx}>{s}</span>
                ))}
              </div>
              <p>{tm.text}</p>
              <div className="testimonial-author">
                <span className="avatar">{tm.name.charAt(0)}</span>
                <div>
                  <strong>{tm.name}</strong>
                  <span>{tm.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================ TikTok Showcase ============================ */
export function Showcase() {
  const { t } = useApp()
  return (
    <section>
      <div className="container">
        <div className="showcase-inner">
          <div className="showcase-text reveal">
            <span className="eyebrow" style={{ marginBottom: 16 }}>
              <i className="fa-brands fa-tiktok" /> TikTok
            </span>
            <h2>
              {splitTitle(t.showcase.title).main}{' '}
              <span className="grad">{splitTitle(t.showcase.title).grad}</span>
            </h2>
            <p>{t.showcase.subtitle}</p>
            <a href={SITE.tiktok} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <i className="fa-brands fa-tiktok" /> {t.showcase.visit}
            </a>
          </div>
          <div className="showcase-frame glass reveal">
            <iframe
              title="Yassine Lgnani on TikTok"
              src="https://www.tiktok.com/embed/@yassine.lg1"
              loading="lazy"
              allow="encrypted-media"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================ Final CTA ============================ */
export function FinalCTA() {
  const { t } = useApp()
  return (
    <section className="final-cta">
      <div className="container">
        <div className="glass reveal">
          <h2>{t.finalCta.title}</h2>
          <p>{t.finalCta.subtitle}</p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">
              <i className="fa-solid fa-paper-plane" /> {t.finalCta.contact}
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <i className="fa-brands fa-whatsapp" /> {t.finalCta.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================ Contact ============================ */
export function Contact() {
  const { t } = useApp()
  const cards = [
    {
      icon: 'fa-solid fa-envelope',
      label: t.contact.emailLabel,
      value: SITE.email,
      href: `mailto:${SITE.email}`,
    },
    {
      icon: 'fa-brands fa-whatsapp',
      label: t.contact.phoneLabel,
      value: SITE.whatsappPretty,
      href: SITE.whatsapp,
    },
    {
      icon: 'fa-brands fa-tiktok',
      label: t.contact.tiktokLabel,
      value: SITE.tiktokHandle,
      href: SITE.tiktok,
    },
  ]
  return (
    <section id="contact">
      <div className="container">
        <Head
          eyebrow={t.nav.contact}
          title={splitTitle(t.contact.title)}
          sub={t.contact.subtitle}
        />
        <div className="contact-grid">
          {cards.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="contact-card glass reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="card-icon">
                <i className={c.icon} />
              </div>
              <div className="label">{c.label}</div>
              <div className="value">{c.value}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
