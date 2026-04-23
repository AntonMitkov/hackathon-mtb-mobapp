import { createPortal } from 'react-dom'
import styles from './PayBottomSheet.module.css'
import { CreditCard, Smartphone, Zap, X } from 'lucide-react'

const TRANSFER_ITEMS = [
  {
    id: 'card',
    icon: <CreditCard size={24} color="#4a80f5" />,
    label: 'По номеру карты и счёта',
    desc: 'Переводы между картами и счетами',
  },
  {
    id: 'phone',
    icon: <Smartphone size={24} color="#4a80f5" />,
    label: 'По номеру телефона',
    desc: 'Перевод клиентам МТБанка',
  },
  {
    id: 'instant',
    icon: <Zap size={24} color="#4a80f5" />,
    label: 'Мгновенный платёж',
    desc: 'Перевод по системе СМП',
  },
]

export default function TransferBottomSheet({ onClose, onItemClick }) {
  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.handle} />

        <div className={styles.header}>
          <h2 className={styles.title}>Перевести</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Закрыть">
            <X size={20} color="rgba(255,255,255,0.5)" />
          </button>
        </div>

        <div className={styles.list}>
          {TRANSFER_ITEMS.map((item) => (
            <button key={item.id} className={styles.item} onClick={() => onItemClick?.(item.id)}>
              <div className={styles.iconWrap}>{item.icon}</div>
              <div className={styles.textWrap}>
                <span className={styles.itemLabel}>{item.label}</span>
                <span className={styles.itemDesc}>{item.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  )
}
