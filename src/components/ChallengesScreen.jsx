import { useState } from 'react'
import styles from './ChallengesScreen.module.css'
import { ChevronLeft, Target, Flame, Crown, Shield, Users, Clock, Gift, Zap, Star } from 'lucide-react'

const PERSONAL = [
  { id: 1, title: 'Удержать Gold 3 дня', desc: 'Не потеряй Gold в любой точке', icon: <Crown size={20} />, color: '#f59e0b', current: 2, total: 3, unit: 'дн', reward: 'x2 Push', rewardIcon: <Zap size={14} /> },
  { id: 2, title: 'Захватить 5 точек', desc: 'Попади в топ-3 любых 5 заведений', icon: <Target size={20} />, color: '#ef4444', current: 3, total: 5, unit: '', reward: 'Mystery Box', rewardIcon: <Gift size={14} /> },
  { id: 3, title: 'Стрик 10 дней', desc: 'Совершай покупки каждый день', icon: <Flame size={20} />, color: '#ec4899', current: 7, total: 10, unit: 'дн', reward: 'Rare Skin', rewardIcon: <Star size={14} /> },
  { id: 4, title: 'Точка дня', desc: 'Стань Gold в "CoffeeBreak" сегодня', icon: <Zap size={20} />, color: '#4a80f5', current: 0, total: 1, unit: '', reward: '+200 pts', rewardIcon: <Zap size={14} />, daily: true },
]

const CLAN_CHALLENGES = [
  { id: 10, title: 'Захватить 10 точек кланом', desc: 'Вместе с Кактусы', icon: <Users size={20} />, color: '#8b5cf6', current: 7, total: 10, unit: '', reward: 'Клан-бонус' },
  { id: 11, title: '5000 influence за неделю', desc: 'Общий influence клана', icon: <Shield size={20} />, color: '#10b981', current: 3400, total: 5000, unit: 'pts', reward: 'Shield x2' },
]

export default function ChallengesScreen({ onBack, onMysteryBox }) {
  const [tab, setTab] = useState('personal')

  const challenges = tab === 'personal' ? PERSONAL : CLAN_CHALLENGES

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={28} color="#3d8ef5" />
        </button>
        <span className={styles.topTitle}>Челленджи</span>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${tab === 'personal' ? styles.tabActive : ''}`} onClick={() => setTab('personal')}>
          Личные
        </button>
        <button className={`${styles.tab} ${tab === 'clan' ? styles.tabActive : ''}`} onClick={() => setTab('clan')}>
          Клановые
        </button>
      </div>

      <div className={styles.scrollArea}>
        {/* Daily highlight */}
        {tab === 'personal' && (
          <div className={styles.dailyBanner}>
            <div className={styles.dailyIcon}>
              <Clock size={18} color="#f59e0b" />
            </div>
            <div className={styles.dailyInfo}>
              <span className={styles.dailyTitle}>Точка дня</span>
              <span className={styles.dailySub}>Осталось 6ч 32м</span>
            </div>
            <span className={styles.dailyReward}>+200 pts</span>
          </div>
        )}

        <div className={styles.list}>
          {challenges.map((ch, i) => {
            const pct = Math.min(100, Math.round((ch.current / ch.total) * 100))
            const done = ch.current >= ch.total
            return (
              <div key={ch.id} className={`${styles.card} ${done ? styles.cardDone : ''}`} style={{ animationDelay: `${i * 0.06}s` }}>
                <div className={styles.cardTop}>
                  <div className={styles.cardIcon} style={{ color: ch.color, background: `${ch.color}15` }}>
                    {ch.icon}
                  </div>
                  <div className={styles.cardInfo}>
                    <span className={styles.cardTitle}>{ch.title}</span>
                    <span className={styles.cardDesc}>{ch.desc}</span>
                  </div>
                  {ch.daily && <span className={styles.dailyTag}>daily</span>}
                </div>

                <div className={styles.progressRow}>
                  <div className={styles.progressTrack}>
                    <div className={styles.progressFill} style={{ width: `${pct}%`, background: ch.color }} />
                  </div>
                  <span className={styles.progressText} style={{ color: ch.color }}>
                    {ch.current}{ch.unit}/{ch.total}{ch.unit}
                  </span>
                </div>

                <div className={styles.cardBottom}>
                  <div className={styles.rewardTag}>
                    {ch.rewardIcon}
                    <span>{ch.reward}</span>
                  </div>
                  {done && (
                    <button className={styles.claimBtn} onClick={onMysteryBox}>
                      Забрать
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
