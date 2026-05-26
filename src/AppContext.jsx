import { createContext, useContext, useEffect, useState } from 'react'
import { translations, LANGUAGES } from './i18n/translations'

const AppContext = createContext(null)

const getInitial = (key, fallback) => {
  if (typeof window === 'undefined') return fallback
  return localStorage.getItem(key) || fallback
}

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => getInitial('yl-lang', 'en'))
  const [theme, setTheme] = useState(() => getInitial('yl-theme', 'dark'))

  const dir = LANGUAGES.find((l) => l.code === lang)?.dir || 'ltr'

  // Reflect language + direction on <html> so CSS and screen readers stay in sync.
  useEffect(() => {
    localStorage.setItem('yl-lang', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  // Reflect theme on <html> via a data attribute consumed by CSS variables.
  useEffect(() => {
    localStorage.setItem('yl-theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const t = translations[lang]
  const toggleTheme = () => setTheme((p) => (p === 'dark' ? 'light' : 'dark'))

  return (
    <AppContext.Provider value={{ lang, setLang, theme, toggleTheme, dir, t, languages: LANGUAGES }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
