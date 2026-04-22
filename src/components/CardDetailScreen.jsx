import { useState } from 'react'
import styles from './CardDetailScreen.module.css'
import { ChevronLeft, ChevronRight, Wifi, Maximize2 } from 'lucide-react'
import { IconTopUp, IconTransfer, IconPay, IconGift } from './icons'
import PayBottomSheet from './PayBottomSheet'
import TransferBottomSheet from './TransferBottomSheet'
import PointsScreen from './PointsScreen'
import TopUpScreen from './TopUpScreen'

const TABS = ['Настройки', 'История', 'Информация']

const SETTINGS = [
  { label: 'Настройка опций',                               type: 'arrow'  },
  { label: 'Лимиты',                                        type: 'arrow'  },
  { label: 'Сменить ПИН-код',                               type: 'arrow'  },
  { label: 'Заблокировать',                                 type: 'toggle', key: 'blocked' },
  { label: 'SMS-уведомления',                               type: 'toggle', key: 'sms'     },
  { label: 'Перевыпустить',                                 type: 'arrow'  },
  { label: 'Использовать для зачислений\nпо номеру телефона', type: 'toggle', key: 'phone'  },
]

export default function CardDetailScreen({ onBack }) {
  const [activeTab, setActiveTab] = useState(0)
  const [toggles, setToggles] = useState({ blocked: false, sms: false, phone: true })
  const [showPay, setShowPay] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)
  const [showPoints, setShowPoints] = useState(false)
  const [showTopUp, setShowTopUp] = useState(false)

  const flip = (key) => setToggles(t => ({ ...t, [key]: !t[key] }))

  if (showTopUp) {
    return <TopUpScreen onBack={() => setShowTopUp(false)} />
  }

  if (showPoints) {
    return <PointsScreen onBack={() => setShowPoints(false)} />
  }

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack} aria-label="Назад">
          <ChevronLeft size={28} color="#3d8ef5" />
        </button>
        <span className={styles.topTitle}>Кактус BYN</span>
      </div>

      <div className={styles.scrollArea}>
        <div className={styles.cardWrap}>
          <CactusCard />
        </div>

        <div className={styles.actions}>
          <ActionBtn icon={<IconTopUp size={22} color="#4a80f5" />} label="Пополнить" onClick={() => setShowTopUp(true)} />
          <ActionBtn icon={<IconTransfer size={22} color="#4a80f5" />} label="Перевести" onClick={() => setShowTransfer(true)} />
          <ActionBtn icon={<IconPay size={22} color="#4a80f5" />} label="Оплатить" onClick={() => setShowPay(true)} />
          <ActionBtn icon={<IconGift size={22} color="#4a80f5" />} label="Баллы" onClick={() => setShowPoints(true)} />
        </div>

        <div className={styles.dragHandle} />

        <div className={styles.tabs}>
          {TABS.map((tab, i) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === i ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 0 && (
          <div className={styles.settingsList}>
            {SETTINGS.map((item) => (
              <div key={item.label} className={styles.settingRow}>
                <span className={styles.settingLabel}>{item.label}</span>
                {item.type === 'arrow'
                  ? <ChevronRight size={18} color="rgba(255,255,255,0.35)" />
                  : <Toggle on={toggles[item.key]} onToggle={() => flip(item.key)} />
                }
              </div>
            ))}
          </div>
        )}

        {activeTab === 1 && <div className={styles.emptyTab}>История транзакций</div>}
        {activeTab === 2 && <div className={styles.emptyTab}>Информация о карте</div>}
      </div>

      {showTransfer && <TransferBottomSheet onClose={() => setShowTransfer(false)} />}
      {showPay && <PayBottomSheet onClose={() => setShowPay(false)} />}
    </div>
  )
}

function ActionBtn({ icon, label, onClick }) {
  return (
    <button className={styles.actionBtn} onClick={onClick}>
      <div className={styles.actionIcon}>{icon}</div>
      <span className={styles.actionLabel}>{label}</span>
    </button>
  )
}

function Toggle({ on, onToggle }) {
  return (
    <div
      className={`${styles.toggle} ${on ? styles.toggleOn : ''}`}
      onClick={onToggle}
      role="switch"
      aria-checked={on}
    >
      <div className={styles.toggleThumb} />
    </div>
  )
}

function CactusCard() {
  return (
    <div className={styles.card}>
      <img src="/assets/card.png" className={styles.cardBg} alt="" aria-hidden="true" />

      <div className={styles.cardTop}>
        <span className={styles.cardName}>КАКТУС BYN</span>
        <div className={styles.cardTopIcons}>
          <Maximize2 size={20} color="rgba(255,255,255,0.7)" />
          <div className={styles.nfcIcon}>
            <Wifi size={18} color="white" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      <div className={styles.cardBalance}>
        <span className={styles.cardAmount}>9.37</span>
        <span className={styles.cardCurrency}> BYN</span>
      </div>

      <div className={styles.cardBottom}>
        <div className={styles.cardMeta}>
          <span className={styles.cardNum}>5*4685 · 06/27</span>
        </div>
        <div className={styles.cardRight}>
          <div className={styles.pointsPill}>2.21 Баллов</div>
          <div className={styles.mastercardDots}>
            <div className={styles.mcRed} />
            <div className={styles.mcOrange} />
          </div>
        </div>
      </div>
    </div>
  )
}
