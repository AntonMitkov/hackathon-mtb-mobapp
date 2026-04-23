import { useState } from 'react'
import styles from './MysteryBoxScreen.module.css'
import { ChevronLeft, Gift, Zap, Shield, Star, Snowflake } from 'lucide-react'

const REWARDS = [
  { id: 1, icon: <Zap size={28} />, name: 'x2 Push', desc: 'Следующая покупка x2 influence', rarity: 'rare', color: '#f59e0b' },
  { id: 2, icon: <Shield size={28} />, name: 'Shield', desc: 'Точку сложнее выбить 24ч', rarity: 'epic', color: '#8b5cf6' },
  { id: 3, icon: <Star size={28} />, name: 'Rare Skin', desc: 'Уникальная рамка профиля "Огонь"', rarity: 'legendary', color: '#ec4899' },
  { id: 4, icon: <Snowflake size={28} />, name: 'Freeze', desc: 'Влияние не падает 12ч', rarity: 'rare', color: '#38bdf8' },
]

const RARITY_LABEL = { rare: 'Rare', epic: 'Epic', legendary: 'Legendary' }

export default function MysteryBoxScreen({ onBack }) {
  const [stage, setStage] = useState('closed') // closed, opening, opened
  const [reward, setReward] = useState(null)

  const openBox = () => {
    setStage('opening')
    setTimeout(() => {
      const r = REWARDS[Math.floor(Math.random() * REWARDS.length)]
      setReward(r)
      setStage('opened')
    }, 1800)
  }

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={28} color="#3d8ef5" />
        </button>
        <span className={styles.topTitle}>Mystery Box</span>
      </div>

      <div className={styles.content}>
        {stage === 'closed' && (
          <div className={styles.boxWrap}>
            <div className={styles.boxGlow} />
            <div className={styles.box}>
              <Gift size={64} color="#ec4899" strokeWidth={1.5} />
            </div>
            <span className={styles.boxTitle}>У вас 1 Mystery Box!</span>
            <span className={styles.boxDesc}>Награда за выполнение челленджа</span>
            <button className={styles.openBtn} onClick={openBox}>
              Открыть
            </button>
          </div>
        )}

        {stage === 'opening' && (
          <div className={styles.openingWrap}>
            <div className={styles.openingBox}>
              <Gift size={64} color="#ec4899" strokeWidth={1.5} />
            </div>
            <div className={styles.particles}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className={styles.particle} style={{
                  '--angle': `${i * 30}deg`,
                  '--delay': `${i * 0.08}s`,
                  '--color': ['#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#4a80f5', '#34d399'][i % 6],
                }} />
              ))}
            </div>
            <span className={styles.openingText}>Открываем...</span>
          </div>
        )}

        {stage === 'opened' && reward && (
          <div className={styles.rewardWrap}>
            <div className={styles.rewardGlow} style={{ '--glow-color': reward.color }} />
            <div className={styles.rewardCircle} style={{ background: `${reward.color}20`, borderColor: `${reward.color}40` }}>
              <div style={{ color: reward.color }}>{reward.icon}</div>
            </div>
            <span className={styles.rarityBadge} style={{ color: reward.color, background: `${reward.color}15`, borderColor: `${reward.color}30` }}>
              {RARITY_LABEL[reward.rarity]}
            </span>
            <span className={styles.rewardName}>{reward.name}</span>
            <span className={styles.rewardDesc}>{reward.desc}</span>
            <button className={styles.claimBtn} onClick={onBack}>
              Забрать
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
