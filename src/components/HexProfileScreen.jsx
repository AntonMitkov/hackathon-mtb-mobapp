import { useState } from 'react'
import styles from './HexProfileScreen.module.css'
import { ChevronLeft, ChevronRight, Zap, Shield, Eye, Flame, Trophy, Crown, Medal, Star, Gift, Target, Lock, Snowflake } from 'lucide-react'

const PLAYER = {
  name: 'Антон',
  level: 12,
  title: 'Район Новатор',
  influence: 4250,
  influenceToNext: 5000,
  controlledPoints: 3,
  totalPoints: 15,
  streak: 7,
  rank: 48,
  totalPlayers: 1240,
}

const CAPTURED = [
  { id: 1, name: 'Green Cafe', cat: 'Кафе', rank: 'gold', pts: 450, decay: 92, cashback: '10%' },
  { id: 2, name: 'PizzaHut', cat: 'Кафе', rank: 'silver', pts: 280, decay: 78, cashback: '5%' },
  { id: 3, name: 'CoffeeBreak', cat: 'Кафе', rank: 'bronze', pts: 120, decay: 65, cashback: '3%' },
]

const BOOSTS = [
  { id: 'freeze', icon: <Snowflake size={20} />, name: 'Freeze', desc: 'Влияние не падает', count: 2, color: '#38bdf8' },
  { id: 'double', icon: <Zap size={20} />, name: 'x2 Push', desc: 'Удвоенное влияние', count: 1, color: '#f59e0b' },
  { id: 'shield', icon: <Shield size={20} />, name: 'Shield', desc: 'Защита точки', count: 0, color: '#8b5cf6' },
  { id: 'radar', icon: <Eye size={20} />, name: 'Radar', desc: 'Слабые точки', count: 1, color: '#10b981' },
]

const ACHIEVEMENTS = [
  { id: 1, icon: <Crown size={18} />, name: 'Первый Gold', done: true, color: '#f59e0b' },
  { id: 2, icon: <Flame size={18} />, name: 'Стрик 7 дней', done: true, color: '#ef4444' },
  { id: 3, icon: <Target size={18} />, name: '5 точек', done: false, color: '#8b5cf6', progress: '3/5' },
  { id: 4, icon: <Trophy size={18} />, name: 'Топ-50', done: true, color: '#4a80f5' },
  { id: 5, icon: <Star size={18} />, name: 'Мастер кафе', done: false, color: '#10b981', progress: '2/3' },
  { id: 6, icon: <Gift size={18} />, name: 'Mystery Box', done: true, color: '#ec4899' },
]

const RANK_LABEL = { gold: 'Gold', silver: 'Silver', bronze: 'Bronze' }
const RANK_COLOR = { gold: '#f59e0b', silver: '#94a3b8', bronze: '#cd7f32' }

export default function HexProfileScreen({ onBack, onChallenges, onClan, onBoosts, onMysteryBox, onPromo }) {
  const [activeTab, setActiveTab] = useState('points')
  const pct = Math.round((PLAYER.influence / PLAYER.influenceToNext) * 100)

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={28} color="#3d8ef5" />
        </button>
        <span className={styles.topTitle}>Отжималка</span>
        <button className={styles.streakBadge}>
          <Flame size={14} color="#ef4444" />
          <span>{PLAYER.streak}</span>
        </button>
      </div>

      <div className={styles.scrollArea}>
        {/* Hero card */}
        <div className={styles.heroCard}>
          <div className={styles.heroTop}>
            <div className={styles.avatarFrame}>
              <img src="/assets/avatars/anton.jpeg" className={styles.avatar} alt="" />
              <div className={styles.levelBadge}>{PLAYER.level}</div>
            </div>
            <div className={styles.heroInfo}>
              <span className={styles.heroName}>{PLAYER.name}</span>
              <span className={styles.heroTitle}>{PLAYER.title}</span>
              <div className={styles.rankRow}>
                <Trophy size={13} color="#f59e0b" />
                <span className={styles.rankText}>#{PLAYER.rank} из {PLAYER.totalPlayers}</span>
              </div>
            </div>
          </div>

          <div className={styles.influenceBar}>
            <div className={styles.influenceHeader}>
              <span className={styles.influenceLabel}>Influence Points</span>
              <span className={styles.influenceValue}>{PLAYER.influence.toLocaleString()} / {PLAYER.influenceToNext.toLocaleString()}</span>
            </div>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: `${pct}%` }} />
            </div>
            <span className={styles.influenceHint}>Lvl {PLAYER.level + 1} — ещё {(PLAYER.influenceToNext - PLAYER.influence).toLocaleString()} pts</span>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statNum}>{PLAYER.controlledPoints}</span>
              <span className={styles.statLabel}>Точки</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>{PLAYER.streak}</span>
              <span className={styles.statLabel}>Стрик</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>#{PLAYER.rank}</span>
              <span className={styles.statLabel}>Ранг</span>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className={styles.quickActions}>
          <button className={styles.quickBtn} onClick={onChallenges}>
            <div className={styles.quickIcon} style={{ background: 'rgba(239,68,68,0.12)' }}>
              <Target size={20} color="#ef4444" />
            </div>
            <span>Челленджи</span>
            <span className={styles.quickBadge}>3</span>
          </button>
          <button className={styles.quickBtn} onClick={onClan}>
            <div className={styles.quickIcon} style={{ background: 'rgba(139,92,246,0.12)' }}>
              <Users2Icon />
            </div>
            <span>Клан</span>
          </button>
          <button className={styles.quickBtn} onClick={onMysteryBox}>
            <div className={styles.quickIcon} style={{ background: 'rgba(236,72,153,0.12)' }}>
              <Gift size={20} color="#ec4899" />
            </div>
            <span>Mystery</span>
            <span className={styles.quickBadge}>1</span>
          </button>
          <button className={styles.quickBtn} onClick={onPromo}>
            <div className={styles.quickIcon} style={{ background: 'rgba(16,185,129,0.12)' }}>
              <Star size={20} color="#10b981" />
            </div>
            <span>Бонусы</span>
          </button>
        </div>

        {/* Boosts */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Усиления</span>
            <button className={styles.sectionLink} onClick={onBoosts}>
              Все <ChevronRight size={14} />
            </button>
          </div>
          <div className={styles.boostsRow}>
            {BOOSTS.map(b => (
              <button key={b.id} className={`${styles.boostCard} ${b.count === 0 ? styles.boostEmpty : ''}`}>
                <div className={styles.boostIcon} style={{ color: b.color, background: `${b.color}18` }}>
                  {b.icon}
                </div>
                <span className={styles.boostName}>{b.name}</span>
                {b.count > 0 ? (
                  <span className={styles.boostCount}>x{b.count}</span>
                ) : (
                  <Lock size={10} color="rgba(255,255,255,0.2)" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${activeTab === 'points' ? styles.tabActive : ''}`} onClick={() => setActiveTab('points')}>
            Мои точки
          </button>
          <button className={`${styles.tab} ${activeTab === 'achievements' ? styles.tabActive : ''}`} onClick={() => setActiveTab('achievements')}>
            Достижения
          </button>
        </div>

        {activeTab === 'points' && (
          <div className={styles.pointsList}>
            {CAPTURED.map((p, i) => (
              <div key={p.id} className={styles.pointCard} style={{ animationDelay: `${i * 0.06}s` }}>
                <div className={styles.pointRank} style={{ background: `${RANK_COLOR[p.rank]}20`, borderColor: `${RANK_COLOR[p.rank]}40` }}>
                  {p.rank === 'gold' ? <Crown size={16} color={RANK_COLOR[p.rank]} /> :
                   p.rank === 'silver' ? <Medal size={16} color={RANK_COLOR[p.rank]} /> :
                   <Medal size={16} color={RANK_COLOR[p.rank]} />}
                </div>
                <div className={styles.pointInfo}>
                  <span className={styles.pointName}>{p.name}</span>
                  <span className={styles.pointCat}>{p.cat} · {RANK_LABEL[p.rank]}</span>
                </div>
                <div className={styles.pointRight}>
                  <span className={styles.pointPts}>{p.pts} pts</span>
                  <div className={styles.decayBar}>
                    <div className={styles.decayFill} style={{ width: `${p.decay}%`, background: p.decay > 80 ? '#34d399' : p.decay > 60 ? '#f59e0b' : '#ef4444' }} />
                  </div>
                  <span className={styles.pointDecay}>{p.decay}%</span>
                </div>
              </div>
            ))}
            {CAPTURED.length === 0 && (
              <div className={styles.emptyState}>
                <Target size={40} color="rgba(255,255,255,0.15)" />
                <span>Оплачивай картой и захватывай точки!</span>
              </div>
            )}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className={styles.achieveGrid}>
            {ACHIEVEMENTS.map(a => (
              <div key={a.id} className={`${styles.achieveCard} ${a.done ? styles.achieveDone : ''}`}>
                <div className={styles.achieveIcon} style={{ color: a.done ? a.color : 'rgba(255,255,255,0.2)', background: a.done ? `${a.color}18` : 'rgba(255,255,255,0.04)' }}>
                  {a.icon}
                </div>
                <span className={styles.achieveName}>{a.name}</span>
                {a.done ? (
                  <span className={styles.achieveCheck} style={{ color: a.color }}>&#10003;</span>
                ) : (
                  <span className={styles.achieveProgress}>{a.progress}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Users2Icon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 19a6 6 0 0 0-12 0" /><circle cx="8" cy="9" r="4" />
      <path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8" />
    </svg>
  )
}
