import { createPortal } from 'react-dom'
import styles from './PayBottomSheet.module.css'
import { Smartphone, CircleDollarSign, HandCoins, Coins, QrCode, BookOpen, X } from 'lucide-react'

const PAY_ITEMS = [
  {
    icon: <Smartphone size={24} color="#4a80f5" />,
    label: 'Мобильная связь',
    desc: 'Оплата услуг связи',
  },
  {
    icon: <CircleDollarSign size={24} color="#4a80f5" />,
    label: 'ЕРИП',
    desc: 'Оплата услуг в системе ЕРИП',
  },
  {
    icon: <HandCoins size={24} color="#4a80f5" />,
    label: 'Погашение кредита',
    desc: 'Погашение активных кредитных обязательств',
  },
  {
    icon: <Coins size={24} color="#4a80f5" />,
    label: 'Произвольный платёж',
    desc: 'Оплата платежа через данные заказчика',
  },
  {
    icon: <QrCode size={24} color="#4a80f5" />,
    label: 'QR оплата',
    desc: 'Оплата по скану QR кода',
  },
  {
    icon: <BookOpen size={24} color="#4a80f5" />,
    label: 'Шаблоны',
    desc: 'Управляйте своими шаблонами',
  },
]

export default function PayBottomSheet({ onClose }) {
  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.handle} />

        <div className={styles.header}>
          <h2 className={styles.title}>Оплатить</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Закрыть">
            <X size={20} color="rgba(255,255,255,0.5)" />
          </button>
        </div>

        <div className={styles.list}>
          {PAY_ITEMS.map((item) => (
            <button key={item.label} className={styles.item}>
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
