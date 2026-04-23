import styles from './StreaksBanner.module.css'
import { Flame, ChevronRight, Users } from 'lucide-react'

export default function StreaksBanner({ onClick }) {
  return (
    <div className={styles.banner} onClick={onClick} role="button" style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className={styles.iconWrap}>
        <Flame size={26} color="#ef4444" />
      </div>
      <div className={styles.body}>
        <div className={styles.title}>Групповой кэшбэк</div>
        <div className={styles.sub}>Кактусы Battle · стрик 12 дней</div>
        <div className={styles.tags}>
          <span className={styles.tag}><Users size={11} /> 4 участника</span>
          <span className={styles.tag}><Flame size={11} /> до 15% кэшбэк</span>
        </div>
      </div>
      <ChevronRight size={18} color="rgba(255,255,255,0.3)" />
    </div>
  )
}
