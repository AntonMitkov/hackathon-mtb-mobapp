import { useState } from 'react'
import styles from './StreaksScreen.module.css'
import { ChevronLeft, Flame, Zap, Users, ChevronRight, HelpCircle, X, ShoppingBag, Coffee, Dumbbell, Car, Pill, BookOpen, TrendingUp } from 'lucide-react'

const MY_GROUPS = [
  { id: 1, name: 'Кактусы Battle', members: 4, streak: 12, totalCashback: 47.60, rank: 3, color: '#8b5cf6' },
  { id: 2, name: 'Golden Quatro', members: 4, streak: 5, totalCashback: 18.20, rank: 11, color: '#f59e0b' },
]

const CASHBACK_CATEGORIES = [
  { id: 1, name: 'Кафе и рестораны', icon: Coffee, earned: 21.30, pct: '10%', color: '#f59e0b', points: 3 },
  { id: 2, name: 'Продукты', icon: ShoppingBag, earned: 8.50, pct: '2%', color: '#22c55e', points: 2 },
  { id: 3, name: 'Фитнес', icon: Dumbbell, earned: 6.40, pct: '7%', color: '#8b5cf6', points: 1 },
  { id: 4, name: 'Красота и здоровье', icon: Pill, earned: 5.80, pct: '6%', color: '#ec4899', points: 1 },
  { id: 5, name: 'Авто', icon: Car, earned: 3.20, pct: '5%', color: '#64748b', points: 1 },
  { id: 6, name: 'Книги', icon: BookOpen, earned: 2.40, pct: '12%', color: '#a78bfa', points: 0 },
]

const SIZE_BONUSES = [
  { members: '2-3', bonus: 'x1.0', pct: 'Базовый кэшбэк', active: false },
  { members: '4-5', bonus: 'x1.5', pct: '+50% к кэшбэку', active: true },
  { members: '6-8', bonus: 'x2.0', pct: '+100% к кэшбэку', active: false },
  { members: '9+', bonus: 'x3.0', pct: '+200% к кэшбэку', active: false },
]

const totalCashback = CASHBACK_CATEGORIES.reduce((sum, c) => sum + c.earned, 0).toFixed(2)

const ONBOARDING_STEPS = [
  {
    title: 'Групповой кэшбэк',
    desc: 'Создай группу с друзьями. Каждый день, когда все участники совершают хотя бы одну покупку у партнеров, ваш групповой стрик растет.',
  },
  {
    title: 'Стрик = выгода',
    desc: 'Чем длиннее стрик группы, тем выше процент кэшбэка для всех участников. Пропустил день — стрик обнуляется.',
  },
  {
    title: 'Захват точек',
    desc: 'Кто потратил больше в конкретном магазине — тот «захватывает» точку и получает увеличенную долю кэшбэка с неё.',
  },
  {
    title: 'Больше людей — больше выгода',
    desc: 'Множитель кэшбэка растёт с размером группы: x1.5 для 4-5 человек, x2 для 6-8, x3 для 9+. Зови друзей!',
  },
]

export default function StreaksScreen({ onBack, onCreateGroup, onGroupChat }) {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingStep, setOnboardingStep] = useState(0)

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={28} color="#3d8ef5" />
        </button>
        <span className={styles.topTitle}>Групповой кэшбэк</span>
        <button className={styles.helpBtn} onClick={() => { setShowOnboarding(true); setOnboardingStep(0) }}>
          <HelpCircle size={20} color="#4a80f5" />
        </button>
      </div>

      {showOnboarding && (
        <div className={styles.onboardingOverlay} onClick={() => setShowOnboarding(false)}>
          <div className={styles.onboardingCard} onClick={e => e.stopPropagation()}>
            <button className={styles.onboardingClose} onClick={() => setShowOnboarding(false)}>
              <X size={18} color="rgba(255,255,255,0.5)" />
            </button>
            <div className={styles.onboardingStep}>
              <div className={styles.onboardingNum}>{onboardingStep + 1}/{ONBOARDING_STEPS.length}</div>
              <span className={styles.onboardingTitle}>{ONBOARDING_STEPS[onboardingStep].title}</span>
              <span className={styles.onboardingDesc}>{ONBOARDING_STEPS[onboardingStep].desc}</span>
            </div>
            <div className={styles.onboardingDots}>
              {ONBOARDING_STEPS.map((_, i) => (
                <div key={i} className={`${styles.dot} ${i === onboardingStep ? styles.dotActive : ''}`} />
              ))}
            </div>
            <div className={styles.onboardingActions}>
              {onboardingStep > 0 && (
                <button className={styles.onboardingBack} onClick={() => setOnboardingStep(s => s - 1)}>Назад</button>
              )}
              {onboardingStep < ONBOARDING_STEPS.length - 1 ? (
                <button className={styles.onboardingNext} onClick={() => setOnboardingStep(s => s + 1)}>Далее</button>
              ) : (
                <button className={styles.onboardingNext} onClick={() => setShowOnboarding(false)}>Понятно!</button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className={styles.scrollArea}>
        <div className={styles.heroCard}>
          <div className={styles.heroTop}>
            <TrendingUp size={22} color="#34d399" />
            <span className={styles.heroAmount}>{totalCashback} BYN</span>
          </div>
          <span className={styles.heroLabel}>Заработано с групповым кэшбэком</span>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{CASHBACK_CATEGORIES.reduce((s, c) => s + c.points, 0)}</span>
              <span className={styles.heroStatLabel}>Точек</span>
            </div>
            <div className={styles.heroStatDiv} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{MY_GROUPS.length}</span>
              <span className={styles.heroStatLabel}>Групп</span>
            </div>
            <div className={styles.heroStatDiv} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>x1.5</span>
              <span className={styles.heroStatLabel}>Множитель</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Мои группы</span>
          <div className={styles.groupsList}>
            {MY_GROUPS.map((g, i) => (
              <button key={g.id} className={styles.groupBtn} onClick={() => onGroupChat(g.id)} style={{ animationDelay: `${i * 0.06}s` }}>
                <div className={styles.groupBtnIcon} style={{ background: `${g.color}18` }}>
                  <Users size={20} color={g.color} />
                </div>
                <div className={styles.groupBtnInfo}>
                  <span className={styles.groupBtnTitle}>{g.name}</span>
                  <span className={styles.groupBtnSub}>{g.members} участника · #{g.rank} в рейтинге</span>
                </div>
                <div className={styles.groupStreak}>
                  <div className={styles.groupStreakBadge}>
                    <Flame size={13} color="#ef4444" />
                    <span>{g.streak}</span>
                  </div>
                  <span className={styles.groupStreakLabel}>дней</span>
                </div>
                <ChevronRight size={16} color="rgba(255,255,255,0.2)" />
              </button>
            ))}
          </div>
          <button className={styles.createBtn} onClick={onCreateGroup}>
            + Создать новую группу
          </button>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Кэшбэк по категориям</span>
          <div className={styles.catList}>
            {CASHBACK_CATEGORIES.map((c, i) => {
              const Icon = c.icon
              return (
                <div key={c.id} className={styles.catRow} style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className={styles.catIcon} style={{ background: `${c.color}15`, borderColor: `${c.color}30` }}>
                    <Icon size={18} color={c.color} />
                  </div>
                  <div className={styles.catInfo}>
                    <span className={styles.catName}>{c.name}</span>
                    <span className={styles.catMeta}>{c.points > 0 ? `${c.points} точек захвачено` : 'Нет захваченных точек'}</span>
                  </div>
                  <div className={styles.catRight}>
                    <span className={styles.catEarned}>+{c.earned.toFixed(2)}</span>
                    <span className={styles.catPct}>{c.pct}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Размер группы = выгода</span>
          <div className={styles.bonusList}>
            {SIZE_BONUSES.map((b, i) => (
              <div key={i} className={`${styles.bonusRow} ${b.active ? styles.bonusRowActive : ''}`}>
                <span className={styles.bonusMembers}>{b.members}</span>
                <span className={styles.bonusMultiplier} style={{ color: b.active ? '#f59e0b' : 'rgba(255,255,255,0.5)' }}>{b.bonus}</span>
                <span className={styles.bonusPct}>{b.pct}</span>
                {b.active && <span className={styles.bonusYou}>сейчас</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
