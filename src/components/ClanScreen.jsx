import styles from './ClanScreen.module.css'
import { ChevronLeft, Crown, Trophy, Shield, Zap, TrendingUp } from 'lucide-react'

const CLAN = {
  name: 'Кактусы',
  motto: 'Колем всех на районе',
  rank: 3,
  totalClans: 89,
  influence: 12800,
  points: 18,
  weekGrowth: '+2,400',
}

const MEMBERS = [
  { id: 1, name: 'Антон',  avatar: '/assets/avatars/anton.jpeg', pts: 4250, rank: 1, title: 'Лидер', color: '#f59e0b' },
  { id: 2, name: 'Егор',   avatar: '/assets/avatars/egor.jpeg',  pts: 3800, rank: 2, title: 'Офицер', color: '#94a3b8' },
  { id: 3, name: 'Злата',  avatar: '/assets/avatars/zlata.jpeg', pts: 2900, rank: 3, title: 'Офицер', color: '#cd7f32' },
  { id: 4, name: 'Глеб',   avatar: '/assets/avatars/gleb.jpeg',  pts: 1850, rank: 4, title: 'Боец', color: '#4a80f5' },
]

const CLAN_RANKING = [
  { rank: 1, name: 'Минск Сити', pts: 18500, members: 8 },
  { rank: 2, name: 'Бизоны', pts: 15200, members: 6 },
  { rank: 3, name: 'Кактусы', pts: 12800, members: 4, isMine: true },
  { rank: 4, name: 'Неон', pts: 11400, members: 5 },
  { rank: 5, name: 'Волчья стая', pts: 9800, members: 7 },
]

export default function ClanScreen({ onBack }) {
  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={28} color="#3d8ef5" />
        </button>
        <span className={styles.topTitle}>Клан</span>
      </div>

      <div className={styles.scrollArea}>
        {/* Clan hero */}
        <div className={styles.heroCard}>
          <div className={styles.heroBanner}>
            <div className={styles.clanEmoji}>&#127797;</div>
            <div className={styles.heroInfo}>
              <span className={styles.clanName}>{CLAN.name}</span>
              <span className={styles.clanMotto}>{CLAN.motto}</span>
            </div>
            <div className={styles.clanRank}>
              <Trophy size={14} color="#f59e0b" />
              <span>#{CLAN.rank}</span>
            </div>
          </div>

          <div className={styles.clanStats}>
            <div className={styles.clanStat}>
              <span className={styles.clanStatNum}>{CLAN.influence.toLocaleString()}</span>
              <span className={styles.clanStatLabel}>Influence</span>
            </div>
            <div className={styles.clanStatDiv} />
            <div className={styles.clanStat}>
              <span className={styles.clanStatNum}>{CLAN.points}</span>
              <span className={styles.clanStatLabel}>Точки</span>
            </div>
            <div className={styles.clanStatDiv} />
            <div className={styles.clanStat}>
              <span className={styles.clanStatNum} style={{ color: '#34d399' }}>{CLAN.weekGrowth}</span>
              <span className={styles.clanStatLabel}>За неделю</span>
            </div>
          </div>
        </div>

        {/* Members */}
        <div className={styles.section}>
          <span className={styles.sectionTitle}>Участники ({MEMBERS.length})</span>
          <div className={styles.membersList}>
            {MEMBERS.map((m, i) => (
              <div key={m.id} className={styles.memberRow} style={{ animationDelay: `${i * 0.06}s` }}>
                <span className={styles.memberRank} style={{ color: m.color }}>#{m.rank}</span>
                <img src={m.avatar} className={styles.memberAvatar} alt="" />
                <div className={styles.memberInfo}>
                  <span className={styles.memberName}>{m.name}</span>
                  <span className={styles.memberTitle} style={{ color: m.color }}>{m.title}</span>
                </div>
                <div className={styles.memberPts}>
                  <Zap size={12} color="#f59e0b" />
                  <span>{m.pts.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clan ranking */}
        <div className={styles.section}>
          <span className={styles.sectionTitle}>Рейтинг кланов</span>
          <div className={styles.rankingList}>
            {CLAN_RANKING.map((c, i) => (
              <div key={c.rank} className={`${styles.rankRow} ${c.isMine ? styles.rankRowMine : ''}`} style={{ animationDelay: `${i * 0.05}s` }}>
                <span className={styles.rankPos}>#{c.rank}</span>
                <div className={styles.rankInfo}>
                  <span className={styles.rankName}>
                    {c.name}
                    {c.isMine && <span className={styles.youTag}>you</span>}
                  </span>
                  <span className={styles.rankMembers}>{c.members} участников</span>
                </div>
                <span className={styles.rankPts}>{c.pts.toLocaleString()} pts</span>
              </div>
            ))}
          </div>
        </div>

        {/* Clan bonuses */}
        <div className={styles.section}>
          <span className={styles.sectionTitle}>Клан-бонусы</span>
          <div className={styles.bonusList}>
            <div className={styles.bonusRow}>
              <Shield size={18} color="#8b5cf6" />
              <span className={styles.bonusText}>Общий Shield на все точки клана</span>
              <span className={styles.bonusStatus}>Активен</span>
            </div>
            <div className={styles.bonusRow}>
              <TrendingUp size={18} color="#10b981" />
              <span className={styles.bonusText}>+10% influence за покупки в клановых точках</span>
              <span className={styles.bonusStatus}>Активен</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
