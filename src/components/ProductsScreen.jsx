import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './ProductsScreen.module.css'
import { CreditCard, Wallet, PiggyBank, BriefcaseBusiness, ChevronRight, X } from 'lucide-react'

const BANNERS = [
  {
    id: 1,
    bg: '#1840b0',
    title: 'ХАЛВА\nУГОЩАЕТ!',
    subtitle: '5 ЛЕТ БЕСПЛАТНОГО\nОБСЛУЖИВАНИЯ',
    accent: '#e53935',
  },
  {
    id: 2,
    bg: '#0d3d2a',
    title: 'КЭШБЭК\nДО 10%',
    subtitle: 'НА ВСЕ ПОКУПКИ\nС КАРТОЙ КАКТУС',
    accent: '#4caf50',
  },
  {
    id: 3,
    bg: '#1a1a40',
    title: 'СТАВКА\n13.5%',
    subtitle: 'НА ВКЛАД\n"ДОХОДНЫЙ"',
    accent: '#5b8ef5',
  },
]

const PRODUCTS = [
  {
    id: 'cardsAndAccounts',
    icon: <CreditCard size={22} color="#4a80f5" />,
    label: 'Карты и счета',
    desc: 'Ваши карты и счета',
  },
  {
    id: 'credits',
    icon: <Wallet size={22} color="#4a80f5" />,
    label: 'Кредиты',
    desc: 'Ваши кредитные продукты',
  },
  {
    id: 'deposits',
    icon: <PiggyBank size={22} color="#4a80f5" />,
    label: 'Вклады',
    desc: 'Ваши сбережения и вклады',
  },
]

const APPLICATIONS = [
  {
    id: 'applications',
    icon: <BriefcaseBusiness size={22} color="#4a80f5" />,
    label: 'Заявки на продукты',
    desc: 'Ваши заявки на кредитные и иные продукты банка',
  },
]

export default function ProductsScreen({ onFeature }) {
  const [bannerIdx, setBannerIdx] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const touchStartX = useRef(0)

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleSwipe = (e) => {
    const touch = e.changedTouches?.[0]
    if (!touch) return
    const dx = touch.clientX - touchStartX.current
    if (dx < -40) setBannerIdx(i => Math.min(i + 1, BANNERS.length - 1))
    if (dx > 40) setBannerIdx(i => Math.max(i - 1, 0))
  }

  const banner = BANNERS[bannerIdx]

  return (
    <div className={styles.screen}>
      <div className={styles.scrollArea}>
        {/* Banner */}
        <div
          className={styles.bannerWrap}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleSwipe}
        >
          <div className={styles.banner} style={{ background: banner.bg }}>
            <div className={styles.bannerText}>
              <div className={styles.bannerTitle}>{banner.title}</div>
              <div className={styles.bannerSubtitle}>{banner.subtitle}</div>
            </div>
            <div className={styles.bannerCard} style={{ background: banner.accent }}>
              <div className={styles.bannerCardLabel}>МТБанк</div>
              <div className={styles.bannerCardPattern} />
            </div>
          </div>
          <div className={styles.dots}>
            {BANNERS.map((_, i) => (
              <div
                key={i}
                className={`${styles.dot} ${i === bannerIdx ? styles.dotActive : ''}`}
                onClick={() => setBannerIdx(i)}
              />
            ))}
          </div>
        </div>

        {/* Products list */}
        <div className={styles.list}>
          {PRODUCTS.map((item) => (
            <button key={item.id} className={styles.row} onClick={() => onFeature?.(item.id)}>
              <div className={styles.iconWrap}>{item.icon}</div>
              <div className={styles.textWrap}>
                <span className={styles.rowLabel}>{item.label}</span>
                <span className={styles.rowDesc}>{item.desc}</span>
              </div>
              <ChevronRight size={18} color="rgba(255,255,255,0.25)" />
            </button>
          ))}
        </div>

        <div className={styles.divider} />

        <div className={styles.list}>
          {APPLICATIONS.map((item) => (
            <button key={item.id} className={styles.row} onClick={() => onFeature?.(item.id)}>
              <div className={styles.iconWrap}>{item.icon}</div>
              <div className={styles.textWrap}>
                <span className={styles.rowLabel}>{item.label}</span>
                <span className={styles.rowDesc}>{item.desc}</span>
              </div>
              <ChevronRight size={18} color="rgba(255,255,255,0.25)" />
            </button>
          ))}
        </div>
      </div>

      {/* Bottom action button */}
      <div className={styles.bottomBar}>
        <button className={styles.applyBtn} onClick={() => setShowModal(true)}>
          <CreditCard size={20} color="#fff" />
          Оформить
        </button>
      </div>

      {/* Apply modal */}
      {showModal && createPortal(
        <div className={styles.overlay} onClick={() => setShowModal(false)}>
          <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
            <div className={styles.sheetHandle} />
            <div className={styles.sheetHeader}>
              <h2 className={styles.sheetTitle}>Оформить продукт</h2>
              <button className={styles.sheetClose} onClick={() => setShowModal(false)}>
                <X size={20} color="rgba(255,255,255,0.5)" />
              </button>
            </div>
            <div className={styles.sheetList}>
              {[...PRODUCTS, ...APPLICATIONS].map((item) => (
                <button key={item.id} className={styles.sheetItem} onClick={() => { setShowModal(false); onFeature?.(item.id) }}>
                  <div className={styles.sheetItemIcon}>{item.icon}</div>
                  <div className={styles.textWrap}>
                    <span className={styles.rowLabel}>{item.label}</span>
                    <span className={styles.rowDesc}>{item.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
