import styles from './MoreScreen.module.css'
import { ChevronRight, User, FileText, Bell, TrendingUp, Gift, RefreshCw, MapPin, Info, Shield } from 'lucide-react'

const MENU_ITEMS = [
  { id: 'personalData',  icon: <User size={20} color="#4a80f5" />,        label: 'Персональные данные' },
  { id: 'documents',     icon: <FileText size={20} color="#4a80f5" />,    label: 'Документы' },
  { id: 'notifications', icon: <Bell size={20} color="#4a80f5" />,        label: 'Уведомления', badge: 1 },
  { id: 'exchangeRates', icon: <TrendingUp size={20} color="#4a80f5" />,  label: 'Курсы валют' },
  { id: 'loyalty',       icon: null,                                       label: 'Манички. Вход в программу\nприятностей', customIcon: true },
  { id: 'mobyExchange',  icon: <RefreshCw size={20} color="#e040fb" />,   label: 'Обменник Moby' },
  { id: 'bankOnMap',     icon: <MapPin size={20} color="#4a80f5" />,      label: 'Банк на карте' },
  { id: 'aboutBank',     icon: <Info size={20} color="#4a80f5" />,        label: 'О Банке' },
  { id: 'security',      icon: <Shield size={20} color="#4a80f5" />,      label: 'Ваша безопасность' },
]

export default function MoreScreen({ onNavigate }) {
  return (
    <div className={styles.screen}>
      <div className={styles.scrollArea}>
        <div className={styles.list}>
          {MENU_ITEMS.map((item, i) => (
            <button
              key={item.id}
              className={styles.row}
              style={{ animationDelay: `${i * 0.04}s` }}
              onClick={() => onNavigate?.(item.id)}
            >
              <div className={`${styles.iconWrap} ${item.id === 'mobyExchange' ? styles.iconWrapPink : ''}`}>
                {item.customIcon ? (
                  <span className={styles.mLogo}>M</span>
                ) : item.icon}
                {item.badge && (
                  <span className={styles.badge}>{item.badge}</span>
                )}
              </div>
              <span className={styles.rowLabel}>{item.label}</span>
              <ChevronRight size={18} color="rgba(255,255,255,0.25)" />
            </button>
          ))}
        </div>

        <div className={styles.version}>Версия приложения 1.0.190</div>
      </div>
    </div>
  )
}
