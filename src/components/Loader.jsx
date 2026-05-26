import { useApp } from '../AppContext'

export default function Loader({ hide }) {
  const { t } = useApp()
  return (
    <div className={`loader ${hide ? 'hide' : ''}`}>
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <div className="loader-ring" />
        <div className="loader-text">{t.loading}…</div>
      </div>
    </div>
  )
}
