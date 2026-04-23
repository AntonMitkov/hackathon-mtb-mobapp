import { useState } from 'react'
import styles from './PromoScreen.module.css'
import { ChevronLeft, Share2, Crown, Medal, Users, TrendingUp } from 'lucide-react'

const CAPTURED_CASHBACK = [
  { id: 1, name: 'Green Cafe', cat: 'Кафе', rank: 'gold', cashbackPct: 10, earnedBYN: 12.40, shared: false },
  { id: 2, name: 'PizzaHut', cat: 'Кафе', rank: 'silver', cashbackPct: 5, earnedBYN: 6.80, shared: true, sharedWith: 'Маша К.' },
  { id: 3, name: 'CoffeeBreak', cat: 'Кафе', rank: 'bronze', cashbackPct: 3, earnedBYN: 2.10, shared: false },
]

const SHARE_HISTORY = [
  { id: 1, friend: 'Маша К.', point: 'PizzaHut', cashback: '5%', date: '20 апреля', status: 'active' },
]

const RANK_COLOR = { gold: '#f59e0b', silver: '#94a3b8', bronze: '#cd7f32' }
const RANK_LABEL = { gold: 'Gold', silver: 'Silver', bronze: 'Bronze' }

const totalCashback = CAPTURED_CASHBACK.reduce((sum, p) => sum + p.earnedBYN, 0).toFixed(2)

export default function BonusesScreen({ onBack }) {
  const [shared, setShared] = useState(
    Object.fromEntries(CAPTURED_CASHBACK.map(p => [p.id, p.shared ? p.sharedWith : null]))
  )

  const handleShare = async (point) => {
    const text = `Хочу поделиться кэшбэком ${point.cashbackPct}% в ${point.name} с тобой! Скачай MTBank и получи бонус.`
    if (navigator.share) {
      try {
        await navigator.share({ title: 'MTBank Бонусы', text })
        setShared(prev => ({ ...prev, [point.id]: 'Друг' }))
      } catch { /* cancelled */ }
    } else {
      navigator.clipboard?.writeText(text)
      setShared(prev => ({ ...prev, [point.id]: 'Друг' }))
    }
  }

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={28} color="#3d8ef5" />
        </button>
        <span className={styles.topTitle}>Бонусы</span>
      </div>

      <div className={styles.scrollArea}>
        <div className={styles.heroCard}>
          <div className={styles.heroIcon}>
            <TrendingUp size={28} color="#34d399" />
          </div>
          <span className={styles.totalAmount}>{totalCashback} BYN</span>
          <span className={styles.heroTitle}>Кэшбэк с захваченных точек</span>
          <span className={styles.heroDesc}>Делись кэшбэком с друзьями — они получат бонус при оплате</span>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Мои точки</span>
          {CAPTURED_CASHBACK.map((point, i) => (
            <div key={point.id} className={styles.pointCard} style={{ animationDelay: `${i * 0.06 + 0.1}s` }}>
              <div className={styles.pointRankIcon} style={{ background: `${RANK_COLOR[point.rank]}20`, borderColor: `${RANK_COLOR[point.rank]}40` }}>
                {point.rank === 'gold'
                  ? <Crown size={16} color={RANK_COLOR[point.rank]} />
                  : <Medal size={16} color={RANK_COLOR[point.rank]} />
                }
              </div>
              <div className={styles.pointDetails}>
                <span className={styles.pointName}>{point.name}</span>
                <span className={styles.pointMeta}>{point.cat} · {RANK_LABEL[point.rank]}</span>
                <span className={styles.pointEarned}>+{point.earnedBYN.toFixed(2)} BYN заработано</span>
              </div>
              <div className={styles.pointRight}>
                <span className={styles.pointCashback}>{point.cashbackPct}%</span>
                {shared[point.id] ? (
                  <span className={styles.sharedLabel}>{shared[point.id]}</span>
                ) : (
                  <button className={styles.sharePointBtn} onClick={() => handleShare(point)}>
                    <Share2 size={16} color="#4a80f5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {SHARE_HISTORY.length > 0 && (
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Отправленный кэшбэк</span>
            {SHARE_HISTORY.map(r => (
              <div key={r.id} className={styles.refRow}>
                <Users size={16} color="#4a80f5" />
                <div className={styles.refInfo}>
                  <span className={styles.refName}>{r.friend}</span>
                  <span className={styles.refDate}>{r.point} · {r.date}</span>
                </div>
                <span className={styles.refReward}>{r.cashback}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
