import styles from './BonusesBanner.module.css'
import { TrendingUp, ChevronRight } from 'lucide-react'

export default function BonusesBanner({ onClick }) {
  return (
    <div className={styles.banner} onClick={onClick} role="button" style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className={styles.iconWrap}>
        <TrendingUp size={26} color="#34d399" />
      </div>
      <div className={styles.body}>
        <div className={styles.title}>Мой кэшбэк</div>
        <div className={styles.sub}>21.30 BYN с 3 захваченных точек</div>
      </div>
      <ChevronRight size={18} color="rgba(255,255,255,0.3)" />
    </div>
  )
}
