import { useState } from 'react'
import styles from './AccountCard.module.css'
import { IconEyeOff } from './icons'

export default function AccountCard({ label, balance }) {
  const [visible, setVisible] = useState(true)

  return (
    <div className={styles.card}>
      <div className={styles.thumb} />
      <div className={styles.info}>
        <div className={styles.label}>{label}</div>
        <div className={styles.balanceRow}>
          <span className={styles.balance}>{visible ? balance : '•••• BYN'}</span>
          <button
            className={styles.eyeBtn}
            onClick={() => setVisible(v => !v)}
            aria-label="Скрыть баланс"
          >
            <IconEyeOff />
          </button>
        </div>
      </div>
    </div>
  )
}
