import { useState } from 'react'
import styles from './PromoScreen.module.css'
import { ChevronLeft, Copy, Check, Share2, Gift, Crown, Users } from 'lucide-react'

const PROMO = {
  code: 'CACTUS-ANTON-7X',
  pointName: 'Green Cafe',
  rank: 'Gold',
  cashbackForFriend: '15%',
  rewardForYou: '+100 pts',
  usedCount: 1,
  maxUses: 5,
}

const REFERRALS = [
  { id: 1, name: 'Маша К.', date: '20 апреля', reward: '+100 pts', status: 'done' },
]

export default function PromoScreen({ onBack }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText(PROMO.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MTBank Отжималка',
          text: `Оформи карту MTBank по моему промокоду ${PROMO.code} и получи ${PROMO.cashbackForFriend} кэшбэк в ${PROMO.pointName}!`,
        })
      } catch { /* cancelled */ }
    } else {
      handleCopy()
    }
  }

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={28} color="#3d8ef5" />
        </button>
        <span className={styles.topTitle}>Промокод</span>
      </div>

      <div className={styles.scrollArea}>
        <div className={styles.heroCard}>
          <div className={styles.heroIcon}>
            <Crown size={28} color="#f59e0b" />
          </div>
          <span className={styles.heroTitle}>Ты Gold в {PROMO.pointName}!</span>
          <span className={styles.heroDesc}>Приглашай друзей — они получат кэшбэк, а ты очки influence</span>
        </div>

        <div className={styles.codeCard}>
          <span className={styles.codeLabel}>Твой промокод</span>
          <div className={styles.codeRow}>
            <span className={styles.codeText}>{PROMO.code}</span>
            <button className={styles.copyBtn} onClick={handleCopy}>
              {copied ? <Check size={18} color="#34d399" /> : <Copy size={18} color="#4a80f5" />}
            </button>
          </div>
          <div className={styles.codeInfo}>
            <div className={styles.codeInfoItem}>
              <Gift size={14} color="#34d399" />
              <span>Другу: {PROMO.cashbackForFriend} кэшбэк</span>
            </div>
            <div className={styles.codeInfoItem}>
              <Crown size={14} color="#f59e0b" />
              <span>Тебе: {PROMO.rewardForYou}</span>
            </div>
          </div>
          <div className={styles.usesBar}>
            <span className={styles.usesLabel}>Использовано</span>
            <span className={styles.usesCount}>{PROMO.usedCount} / {PROMO.maxUses}</span>
          </div>
          <div className={styles.usesTrack}>
            <div className={styles.usesFill} style={{ width: `${(PROMO.usedCount / PROMO.maxUses) * 100}%` }} />
          </div>
        </div>

        <button className={styles.shareBtn} onClick={handleShare}>
          <Share2 size={18} />
          <span>Поделиться промокодом</span>
        </button>

        {REFERRALS.length > 0 && (
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Приглашённые друзья</span>
            {REFERRALS.map(r => (
              <div key={r.id} className={styles.refRow}>
                <Users size={16} color="#4a80f5" />
                <div className={styles.refInfo}>
                  <span className={styles.refName}>{r.name}</span>
                  <span className={styles.refDate}>{r.date}</span>
                </div>
                <span className={styles.refReward}>{r.reward}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
