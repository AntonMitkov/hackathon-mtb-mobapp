import { useState } from 'react'
import { ChevronLeft, ChevronRight, TrendingUp, ShoppingBag, Coffee, Car, Heart, Gamepad2, Smartphone, Camera } from 'lucide-react'
import styles from './MonthlySummaryScreen.module.css'

const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]

const CATEGORIES = [
  { name: 'Рестораны и кафе', amount: 312.50, icon: Coffee, color: '#f59e0b' },
  { name: 'Продукты', amount: 487.20, icon: ShoppingBag, color: '#22c55e' },
  { name: 'Транспорт', amount: 156.00, icon: Car, color: '#3b82f6' },
  { name: 'Развлечения', amount: 89.90, icon: Gamepad2, color: '#8b5cf6' },
  { name: 'Здоровье', amount: 210.00, icon: Heart, color: '#ef4444' },
  { name: 'Электроника', amount: 449.99, icon: Smartphone, color: '#0ea5e9' },
]

const TOTAL_SPENT = CATEGORIES.reduce((sum, c) => sum + c.amount, 0)
const MAX_AMOUNT = Math.max(...CATEGORIES.map(c => c.amount))

const MONTHLY_PHOTOS = [
  { id: 1, merchant: 'Pizza Tempo', amount: '-24.50', url: '/assets/map/pizza.jpeg' },
  { id: 2, merchant: 'Green супермаркет', amount: '-67.30', url: '/assets/map/green.jpeg' },
  { id: 3, merchant: 'INVITRO', amount: '-45.00', url: '/assets/map/invitro.jpeg' },
  { id: 4, merchant: '7 Карат', amount: '-320.00', url: '/assets/map/7.jpeg' },
  { id: 5, merchant: 'Pizza Tempo', amount: '-18.90', url: '/assets/map/pizza.jpeg' },
  { id: 6, merchant: 'Green супермаркет', amount: '-52.10', url: '/assets/map/green.jpeg' },
]

export default function MonthlySummaryScreen({ onBack }) {
  const [monthIndex, setMonthIndex] = useState(3) // Апрель

  const prevMonth = () => setMonthIndex(i => (i > 0 ? i - 1 : 11))
  const nextMonth = () => setMonthIndex(i => (i < 11 ? i + 1 : 0))

  return (
    <div className={styles.screen}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={24} />
        </button>
        <h1 className={styles.title}>Итоги месяца</h1>
        <div style={{ width: 24 }} />
      </div>

      {/* Month selector */}
      <div className={styles.monthSelector}>
        <button className={styles.monthArrow} onClick={prevMonth}>
          <ChevronLeft size={20} />
        </button>
        <span className={styles.monthLabel}>{MONTHS[monthIndex]} 2026</span>
        <button className={styles.monthArrow} onClick={nextMonth}>
          <ChevronRight size={20} />
        </button>
      </div>

      <div className={styles.content}>
        {/* Profile hero */}
        <div className={styles.profileHero}>
          <img src="/assets/avatars/anton.jpeg" alt="Антон" className={styles.profileAvatar} />
          <div className={styles.profileInfo}>
            <span className={styles.profileName}>Антон, вот твои итоги</span>
            <span className={styles.profileSub}>{MONTHS[monthIndex]} был продуктивным!</span>
          </div>
        </div>

        {/* Total spent */}
        <div className={styles.totalCard}>
          <div className={styles.totalLabel}>Всего потрачено</div>
          <div className={styles.totalAmount}>{TOTAL_SPENT.toFixed(2)} BYN</div>
          <div className={styles.totalSub}>
            <TrendingUp size={14} color="#4bbe6a" />
            <span>На 12% меньше, чем в прошлом месяце</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>47</div>
            <div className={styles.statLabel}>Транзакций</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>36.3</div>
            <div className={styles.statLabel}>Средний чек</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>Green</div>
            <div className={styles.statLabel}>Топ магазин</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>85.2</div>
            <div className={styles.statLabel}>Кэшбэк BYN</div>
          </div>
        </div>

        {/* Categories breakdown */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>По категориям</h2>
          {CATEGORIES.map(cat => {
            const Icon = cat.icon
            const pct = (cat.amount / TOTAL_SPENT * 100).toFixed(0)
            const barWidth = (cat.amount / MAX_AMOUNT * 100)
            return (
              <div key={cat.name} className={styles.catRow}>
                <div className={styles.catIcon} style={{ background: `${cat.color}18` }}>
                  <Icon size={18} color={cat.color} />
                </div>
                <div className={styles.catInfo}>
                  <div className={styles.catHeader}>
                    <span className={styles.catName}>{cat.name}</span>
                    <span className={styles.catAmount}>{cat.amount.toFixed(2)} BYN</span>
                  </div>
                  <div className={styles.catBarTrack}>
                    <div
                      className={styles.catBarFill}
                      style={{ width: `${barWidth}%`, background: cat.color }}
                    />
                  </div>
                  <span className={styles.catPct}>{pct}% от общих трат</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Monthly photos */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Camera size={18} />
            Фото за месяц
          </h2>
          <div className={styles.photoGrid}>
            {MONTHLY_PHOTOS.map(photo => (
              <div key={photo.id} className={styles.photoCard}>
                <img src={photo.url} alt={photo.merchant} className={styles.photoImg} />
                <div className={styles.photoInfo}>
                  <span className={styles.photoMerchant}>{photo.merchant}</span>
                  <span className={styles.photoAmount}>{photo.amount} BYN</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
