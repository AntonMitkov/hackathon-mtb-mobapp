import styles from './GroupInfluenceScreen.module.css'
import { ChevronLeft, Zap, MapPin } from 'lucide-react'

const GROUPS_DATA = {
  1: {
    name: 'Кактусы Battle',
    avgCashback: '7.9%',
    members: [
      { id: 'me', name: 'Антон', avatar: '/assets/avatars/anton.jpeg', influence: 2100, capturedPoints: 3, avgCashback: 9.3, color: '#f59e0b' },
      { id: 1, name: 'Егор', avatar: '/assets/avatars/egor.jpeg', influence: 1870, capturedPoints: 2, avgCashback: 8.5, color: '#4a80f5' },
      { id: 2, name: 'Злата', avatar: '/assets/avatars/zlata.jpeg', influence: 1350, capturedPoints: 2, avgCashback: 7.5, color: '#ec4899' },
      { id: 3, name: 'Глеб', avatar: '/assets/avatars/gleb.jpeg', influence: 820, capturedPoints: 1, avgCashback: 2.0, color: '#10b981' },
    ],
    points: [
      { id: 1, name: 'Green Cafe', cashback: '10%', controller: 'Антон', controllerAvatar: '/assets/avatars/anton.jpeg', color: '#f59e0b' },
      { id: 2, name: 'CoffeeBreak', cashback: '15%', controller: 'Антон', controllerAvatar: '/assets/avatars/anton.jpeg', color: '#f59e0b' },
      { id: 3, name: 'BarBQ', cashback: '5%', controller: 'Антон', controllerAvatar: '/assets/avatars/anton.jpeg', color: '#f59e0b' },
      { id: 4, name: 'SportLife', cashback: '7%', controller: 'Егор', controllerAvatar: '/assets/avatars/egor.jpeg', color: '#4a80f5' },
      { id: 5, name: 'PizzaHut', cashback: '10%', controller: 'Егор', controllerAvatar: '/assets/avatars/egor.jpeg', color: '#4a80f5' },
      { id: 6, name: 'BeautyLab', cashback: '8%', controller: 'Злата', controllerAvatar: '/assets/avatars/zlata.jpeg', color: '#ec4899' },
      { id: 7, name: 'Аптека Линия', cashback: '6%', controller: 'Злата', controllerAvatar: '/assets/avatars/zlata.jpeg', color: '#ec4899' },
      { id: 8, name: 'Евроопт', cashback: '2%', controller: 'Глеб', controllerAvatar: '/assets/avatars/gleb.jpeg', color: '#10b981' },
    ],
  },
  2: {
    name: 'Golden Quatro',
    avgCashback: '8.2%',
    members: [
      { id: 'me', name: 'Антон', avatar: '/assets/avatars/anton.jpeg', influence: 1450, capturedPoints: 2, avgCashback: 10.5, color: '#f59e0b' },
      { id: 4, name: 'Кира', avatar: '/assets/avatars/kira.jpeg', influence: 1280, capturedPoints: 2, avgCashback: 7.0, color: '#ec4899' },
      { id: 5, name: 'Яна', avatar: '/assets/avatars/yana.jpeg', influence: 920, capturedPoints: 1, avgCashback: 8.0, color: '#8b5cf6' },
      { id: 6, name: 'Тася', avatar: '/assets/avatars/tasya.jpeg', influence: 620, capturedPoints: 1, avgCashback: 2.0, color: '#10b981' },
    ],
    points: [
      { id: 1, name: 'CoffeeBreak', cashback: '15%', controller: 'Антон', controllerAvatar: '/assets/avatars/anton.jpeg', color: '#f59e0b' },
      { id: 2, name: 'Аптека Линия', cashback: '6%', controller: 'Антон', controllerAvatar: '/assets/avatars/anton.jpeg', color: '#f59e0b' },
      { id: 3, name: 'Пекарня №1', cashback: '8%', controller: 'Кира', controllerAvatar: '/assets/avatars/kira.jpeg', color: '#ec4899' },
      { id: 4, name: 'BeautyLab', cashback: '8%', controller: 'Яна', controllerAvatar: '/assets/avatars/yana.jpeg', color: '#8b5cf6' },
      { id: 5, name: 'Евроопт', cashback: '2%', controller: 'Тася', controllerAvatar: '/assets/avatars/tasya.jpeg', color: '#10b981' },
    ],
  },
}

export default function GroupInfluenceScreen({ groupId, onBack }) {
  const data = GROUPS_DATA[groupId] || GROUPS_DATA[1]
  const totalInfluence = data.members.reduce((sum, m) => sum + m.influence, 0)
  const maxInfluence = Math.max(...data.members.map(m => m.influence))

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={28} color="#3d8ef5" />
        </button>
        <span className={styles.topTitle}>{data.name}</span>
      </div>

      <div className={styles.scrollArea}>
        <div className={styles.heroCard}>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{totalInfluence.toLocaleString()}</span>
              <span className={styles.heroStatLabel}>Общий Influence</span>
            </div>
            <div className={styles.heroStatDiv} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{data.points.length}</span>
              <span className={styles.heroStatLabel}>Точек</span>
            </div>
            <div className={styles.heroStatDiv} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{data.avgCashback}</span>
              <span className={styles.heroStatLabel}>Ср. кэшбэк</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Распределение влияния</span>
          <div className={styles.barsList}>
            {data.members.map((m, i) => {
              const pct = Math.round((m.influence / totalInfluence) * 100)
              return (
                <div key={m.id} className={styles.barRow} style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className={styles.barHeader}>
                    <img src={m.avatar} className={styles.barAvatar} alt="" />
                    <span className={styles.barName}>{m.name}</span>
                    <span className={styles.barPct}>{pct}%</span>
                    <span className={styles.barPts}>
                      <Zap size={10} color={m.color} />
                      {m.influence.toLocaleString()}
                    </span>
                  </div>
                  <div className={styles.barTrack}>
                    <div className={styles.barFill} style={{ width: `${(m.influence / maxInfluence) * 100}%`, background: m.color }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Рейтинг участников</span>
          <div className={styles.membersList}>
            {data.members.map((m, i) => (
              <div key={m.id} className={styles.memberRow} style={{ animationDelay: `${i * 0.06}s` }}>
                <span className={styles.memberRank} style={{ color: i < 3 ? ['#f59e0b', '#94a3b8', '#cd7f32'][i] : 'rgba(255,255,255,0.4)' }}>
                  #{i + 1}
                </span>
                <div className={styles.memberAvatarWrap}>
                  <img src={m.avatar} className={styles.memberAvatar} alt="" />
                </div>
                <div className={styles.memberInfo}>
                  <span className={styles.memberName}>
                    {m.name}
                    {m.id === 'me' && <span className={styles.youTag}>you</span>}
                  </span>
                  <span className={styles.memberMeta}>{m.capturedPoints} точек · {m.avgCashback}% ср. кэшбэк</span>
                </div>
                <div className={styles.memberPts}>
                  <Zap size={12} color={m.color} />
                  <span>{m.influence.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Захваченные точки ({data.points.length})</span>
          <div className={styles.pointsList}>
            {data.points.map((p, i) => (
              <div key={p.id} className={styles.pointRow} style={{ animationDelay: `${i * 0.05}s` }}>
                <div className={styles.pointIcon} style={{ background: `${p.color}15`, borderColor: `${p.color}30` }}>
                  <MapPin size={16} color={p.color} />
                </div>
                <div className={styles.pointInfo}>
                  <span className={styles.pointName}>{p.name}</span>
                  <span className={styles.pointController}>
                    <img src={p.controllerAvatar} className={styles.pointControllerAvatar} alt="" />
                    {p.controller}
                  </span>
                </div>
                <span className={styles.pointCashback}>{p.cashback}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
