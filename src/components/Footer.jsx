import { useApp } from '../AppContext'
import { SITE, PLATFORMS } from '../config'

const NAV_KEYS = ['home', 'services', 'offers', 'platforms', 'about', 'contact']

export default function Footer() {
  const { t } = useApp()
  const year = new Date().getFullYear()

  const socials = [
    { icon: 'fa-brands fa-tiktok', url: SITE.tiktok, label: 'TikTok' },
    { icon: 'fa-brands fa-whatsapp', url: SITE.whatsapp, label: 'WhatsApp' },
    { icon: 'fa-solid fa-envelope', url: `mailto:${SITE.email}`, label: 'Email' },
    ...PLATFORMS.filter((p) => p.name !== 'TikTok').map((p) => ({
      icon: p.icon,
      url: p.url,
      label: p.name,
    })),
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="brand">
              <span className="brand-logo">YL</span>
              <span className="brand-name">
                Yassine <span className="grad">Lgnani</span>
              </span>
            </a>
            <p>{t.footer.tagline}</p>
          </div>

          <div>
            <h4>{t.footer.quickLinks}</h4>
            <ul>
              {NAV_KEYS.map((k) => (
                <li key={k}>
                  <a href={`#${k}`}>{t.nav[k]}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t.footer.followUs}</h4>
            <div className="footer-socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target={s.url.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} Yassine Lgnani. {t.footer.rights}
          </span>
          <span className="dev">
            <i className="fa-solid fa-code" />
            <span className="grad">{t.footer.developedBy}</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
