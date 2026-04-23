import { useState } from 'react'
import styles from './CardDetailScreen.module.css'
import { ChevronLeft, ChevronRight, Wifi, Maximize2 } from 'lucide-react'
import { IconTopUp, IconTransfer, IconPay, IconGift, IconCard, IconClock } from './icons'
import PayBottomSheet from './PayBottomSheet'
import TransferBottomSheet from './TransferBottomSheet'
import PointsScreen from './PointsScreen'
import TopUpScreen from './TopUpScreen'
import TransactionDetailScreen from './TransactionDetailScreen'

const TABS = ['Настройки', 'История', 'Информация']

const TRANSACTIONS = [
  { id: 1,  merchant: '"PEREKRESTOK CENTROPOL', cardName: 'Кактус BYN 5*4685', amount: '-9.79',   date: '22 апреля 2026 20:53', type: 'Оплата товаров и услуг', mcc: '5399', status: 'В процессе' },
  { id: 2,  merchant: 'BURGER KING #1452',      cardName: 'Кактус BYN 5*4685', amount: '-14.50',  date: '22 апреля 2026 13:10', type: 'Оплата товаров и услуг', mcc: '5812', status: 'Выполнено' },
  { id: 3,  merchant: 'WOLT DELIVERY',          cardName: 'Кактус BYN 5*4685', amount: '-27.30',  date: '21 апреля 2026 19:44', type: 'Оплата товаров и услуг', mcc: '5812', status: 'Выполнено' },
  { id: 4,  merchant: 'YANDEX.TAXI',            cardName: 'Кактус BYN 5*4685', amount: '-6.20',   date: '21 апреля 2026 09:17', type: 'Оплата услуг',           mcc: '4121', status: 'Выполнено' },
  { id: 5,  merchant: 'MINSK METRO',            cardName: 'Кактус BYN 5*4685', amount: '-0.95',   date: '20 апреля 2026 08:02', type: 'Оплата услуг',           mcc: '4111', status: 'Выполнено' },
  { id: 6,  merchant: 'NETFLIX.COM',            cardName: 'Кактус BYN 5*4685', amount: '-16.99',  date: '19 апреля 2026 00:00', type: 'Оплата услуг',           mcc: '7832', status: 'Выполнено' },
  { id: 7,  merchant: 'ZARA MINSK GALLERIA',    cardName: 'Кактус BYN 5*4685', amount: '-89.90',  date: '18 апреля 2026 15:33', type: 'Оплата товаров и услуг', mcc: '5621', status: 'Выполнено' },
  { id: 8,  merchant: 'ПОПОЛНЕНИЕ СЧЁТА',       cardName: 'Кактус BYN 5*4685', amount: '+500.00', date: '17 апреля 2026 10:00', type: 'Пополнение',             mcc: '—',    status: 'Выполнено' },
  { id: 9,  merchant: 'SPORTMASTER #07',        cardName: 'Кактус BYN 5*4685', amount: '-134.00', date: '16 апреля 2026 17:21', type: 'Оплата товаров и услуг', mcc: '5941', status: 'Выполнено' },
  { id: 10, merchant: 'STEAM GAMES',            cardName: 'Кактус BYN 5*4685', amount: '-29.99',  date: '15 апреля 2026 22:05', type: 'Оплата услуг',           mcc: '7995', status: 'Выполнено' },
]

const SETTINGS = [
  { label: 'Настройка опций',                               type: 'arrow', featureId: 'cardOptions' },
  { label: 'Лимиты',                                        type: 'arrow', featureId: 'cardLimits' },
  { label: 'Сменить ПИН-код',                               type: 'arrow', featureId: 'changePin' },
  { label: 'Заблокировать',                                 type: 'toggle', key: 'blocked' },
  { label: 'SMS-уведомления',                               type: 'toggle', key: 'sms'     },
  { label: 'Перевыпустить',                                 type: 'arrow', featureId: 'reissueCard' },
  { label: 'Использовать для зачислений\nпо номеру телефона', type: 'toggle', key: 'phone'  },
]

const CARD_INFO = [
  { label: 'Тип карты', value: 'Дебетовая' },
  { label: 'Платёжная система', value: 'Mastercard' },
  { label: 'Номер карты', value: '5347 6685 9231 4685' },
  { label: 'Срок действия', value: '06/27' },
  { label: 'Валюта', value: 'BYN' },
  { label: 'Статус', value: 'Активна' },
  { label: 'Дата открытия', value: '15 января 2024' },
  { label: 'Пакет услуг', value: 'Simple' },
]

export default function CardDetailScreen({ onBack, onFeature }) {
  const [activeTab, setActiveTab] = useState(0)
  const [toggles, setToggles] = useState({ blocked: false, sms: false, phone: true })
  const [showPay, setShowPay] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)
  const [showPoints, setShowPoints] = useState(false)
  const [showTopUp, setShowTopUp] = useState(false)
  const [selectedTx, setSelectedTx] = useState(null)

  const flip = (key) => setToggles(t => ({ ...t, [key]: !t[key] }))

  if (showTopUp) {
    return <TopUpScreen onBack={() => setShowTopUp(false)} />
  }

  if (showPoints) {
    return <PointsScreen onBack={() => setShowPoints(false)} />
  }

  if (selectedTx) {
    return <TransactionDetailScreen tx={selectedTx} onBack={() => setSelectedTx(null)} />
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
              <div
                key={item.label}
                className={styles.settingRow}
                onClick={item.type === 'arrow' ? () => onFeature?.(item.featureId) : undefined}
                style={item.type === 'arrow' ? { cursor: 'pointer' } : undefined}
              >
                <span className={styles.settingLabel}>{item.label}</span>
                {item.type === 'arrow'
                  ? <ChevronRight size={18} color="rgba(255,255,255,0.35)" />
                  : <Toggle on={toggles[item.key]} onToggle={() => flip(item.key)} />
                }
              </div>
            ))}
          </div>
        )}

        {activeTab === 1 && (
          <div className={styles.txList}>
            {TRANSACTIONS.map(tx => (
              <button key={tx.id} className={styles.txRow} onClick={() => setSelectedTx(tx)}>
                <div className={styles.txIconWrap}>
                  <IconCard size={20} color="rgba(255,255,255,0.85)" />
                  <div className={styles.txClock}>
                    <IconClock size={11} color="rgba(255,255,255,0.45)" />
                  </div>
                </div>
                <div className={styles.txDetails}>
                  <div className={styles.txMerchant}>{tx.merchant}</div>
                  <div className={styles.txDate}>{tx.date}</div>
                </div>
                <div className={`${styles.txAmount} ${tx.amount.startsWith('+') ? styles.txPlus : ''}`}>
                  {tx.amount}
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 2 && (
          <div className={styles.cardInfoList}>
            {CARD_INFO.map((item, i) => (
              <div key={i} className={styles.cardInfoRow}>
                <span className={styles.cardInfoLabel}>{item.label}</span>
                <span className={styles.cardInfoValue}>{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {showTransfer && (
        <TransferBottomSheet
          onClose={() => setShowTransfer(false)}
          onItemClick={(type) => {
            setShowTransfer(false)
            if (type === 'card') setShowTopUp(true)
            else onFeature?.(type === 'phone' ? 'mobilePayment' : 'customPayment')
          }}
        />
      )}
      {showPay && (
        <PayBottomSheet
          onClose={() => setShowPay(false)}
          onItemClick={(type) => {
            setShowPay(false)
            onFeature?.(type)
          }}
        />
      )}
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
  const [flipped, setFlipped] = useState(false)

  return (
    <div className={styles.cardScene} onClick={() => setFlipped(f => !f)}>
      <div className={`${styles.cardInner} ${flipped ? styles.cardFlipped : ''}`}>

        {/* Front */}
        <div className={styles.cardFace}>
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

        {/* Back */}
        <div className={`${styles.cardFace} ${styles.cardBack}`}>
          <img src="/assets/card.png" className={styles.cardBg} alt="" aria-hidden="true" />
          <div className={styles.cardBackStripe} />
          <div className={styles.cardBackContent}>
            <div className={styles.cardBackLabel}>Номер карты</div>
            <div className={styles.cardBackNumber}>5347 6685 9231 4685</div>
            <div className={styles.cardBackRow}>
              <div>
                <div className={styles.cardBackLabel}>Срок действия</div>
                <div className={styles.cardBackExpiry}>06/27</div>
              </div>
              <div className={styles.mastercardDots}>
                <div className={styles.mcRed} />
                <div className={styles.mcOrange} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
