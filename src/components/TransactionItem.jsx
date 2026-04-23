import styles from './TransactionItem.module.css'
import { IconHistory, IconCard, IconClock } from './icons'

export default function TransactionItem({ merchant, cardName, amount, onClick }) {
  return (
    <div className={styles.card} onClick={onClick} style={onClick ? { cursor: 'pointer' } : undefined}>
      <div className={styles.histIcon}>
        <IconHistory size={22} color="rgba(255,255,255,0.45)" />
      </div>
      <div className={styles.txIconWrap}>
        <IconCard size={20} color="rgba(255,255,255,0.85)" />
        <div className={styles.txClock}>
          <IconClock size={11} color="rgba(255,255,255,0.45)" />
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.merchant}>{merchant}</div>
        <div className={styles.sub}>{cardName}</div>
      </div>
      <div className={styles.amount}>{amount}</div>
    </div>
  )
}
