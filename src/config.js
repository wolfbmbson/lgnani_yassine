// Central place for contact links, platforms and social profiles.
export const SITE = {
  whatsapp: 'https://wa.me/212628182324',
  whatsappPretty: '+212 6 28 18 23 24',
  tiktok: 'https://www.tiktok.com/@yassine.lg1',
  tiktokHandle: '@yassine.lg1',
  email: 'elitedizey@gmail.com',
}

// Platforms showcased on the site. `icon` is a Font Awesome class.
export const PLATFORMS = [
  { name: 'TikTok', icon: 'fa-brands fa-tiktok', color: '#ff0050', url: SITE.tiktok },
  { name: 'Instagram', icon: 'fa-brands fa-instagram', color: '#e1306c', url: 'https://instagram.com' },
  { name: 'YouTube', icon: 'fa-brands fa-youtube', color: '#ff0000', url: 'https://youtube.com' },
  { name: 'Facebook', icon: 'fa-brands fa-facebook', color: '#1877f2', url: 'https://facebook.com' },
  { name: 'Twitch', icon: 'fa-brands fa-twitch', color: '#9146ff', url: 'https://twitch.tv' },
  { name: 'Kik', icon: 'fa-brands fa-kickstarter-k', color: '#42f582', url: '#' },
]

// Font Awesome icon class per service / why / content card (index-aligned with translations).
export const SERVICE_ICONS = [
  'fa-solid fa-bullhorn',
  'fa-brands fa-instagram',
  'fa-solid fa-tower-broadcast',
  'fa-solid fa-crown',
  'fa-solid fa-lightbulb',
  'fa-solid fa-bullseye',
  'fa-solid fa-id-card',
  'fa-solid fa-fire',
  'fa-solid fa-sack-dollar',
  'fa-solid fa-layer-group',
]

export const WHY_ICONS = [
  'fa-solid fa-users',
  'fa-solid fa-headset',
  'fa-solid fa-star',
  'fa-solid fa-shield-halved',
  'fa-solid fa-diagram-project',
  'fa-solid fa-rocket',
]

export const CONTENT_ICONS = [
  'fa-solid fa-fingerprint',
  'fa-solid fa-wand-magic-sparkles',
  'fa-solid fa-brain',
  'fa-solid fa-chess-king',
  'fa-solid fa-gears',
  'fa-solid fa-calendar-check',
]

export const STAT_ICONS = [
  'fa-solid fa-user-group',
  'fa-solid fa-globe',
  'fa-solid fa-clock',
  'fa-solid fa-earth-americas',
]
