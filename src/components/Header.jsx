import { useState } from 'react'
import styles from './Header.module.css'
import { EyeOff, IconTopUp, IconTransfer, IconPay, IconGift } from './icons'
import { Users } from 'lucide-react'

export default function Header({ onCardClick, onTopUp, onTransfer, onPay, onPoints, onFriends, onProfile }) {
  const [balanceVisible, setBalanceVisible] = useState(true)

  return (
    <div className={styles.header} onClick={onCardClick} role="button" style={{ cursor: 'pointer' }}>
      <div className={styles.userRow}>
        <button
          className={styles.avatarWrap}
          onClick={(e) => { e.stopPropagation(); onProfile?.() }}
          aria-label="Профиль"
        >
          <img src="/assets/avatars/anton.jpeg" className={styles.avatarPhoto} alt="Антон" />
          <div className={styles.notifDot}>1</div>
        </button>
        <span className={styles.username}>Антон</span>
        <button
          className={styles.friendsBtn}
          onClick={(e) => { e.stopPropagation(); onFriends?.() }}
          aria-label="Друзья"
        >
          <Users size={18} color="rgba(255,255,255,0.85)" />
          <span className={styles.friendsBtnLabel}>Друзья</span>
        </button>
      </div>

      <div className={styles.cardInfo}>
        <span className={styles.badge}>Кактус BYN</span>
        <span className={styles.badge}>5*4685</span>
        <div className={styles.infoCircle}>i</div>
      </div>

      <div className={styles.balanceRow}>
        <span className={styles.balance}>
          {balanceVisible ? '9.37 BYN' : '•••• BYN'}
        </span>
        <button
          className={styles.eyeBtn}
          onClick={(e) => { e.stopPropagation(); setBalanceVisible(v => !v) }}
          aria-label={balanceVisible ? 'Скрыть баланс' : 'Показать баланс'}
        >
          <EyeOff size={26} color="rgba(255,255,255,0.65)" />
        </button>
      </div>

      <div className={styles.actions} onClick={e => e.stopPropagation()}>
        <ActionBtn icon={<IconTopUp size={24} color="rgba(255,255,255,0.88)" />} label="Пополнить" onClick={onTopUp} />
        <ActionBtn icon={<IconTransfer size={24} color="rgba(255,255,255,0.88)" />} label="Перевести" onClick={onTransfer} />
        <ActionBtn icon={<IconPay size={24} color="rgba(255,255,255,0.88)" />} label="Оплатить" onClick={onPay} />
        <ActionBtn icon={<IconGift size={24} color="rgba(255,255,255,0.88)" />} label="Баллы" onClick={onPoints} />
      </div>
    </div>
  )
}

function ActionBtn({ icon, label, onClick }) {
  return (
    <button className={styles.actionBtn} onClick={onClick}>
      {icon}
      <span className={styles.actionLabel}>{label}</span>
    </button>
  )
}
