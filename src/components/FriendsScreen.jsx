import { useState } from 'react'
import styles from './FriendsScreen.module.css'
import { ChevronLeft, Search, UserPlus, ArrowUpRight, Clock } from 'lucide-react'

const FRIENDS = [
  { id: 1, name: 'Егор Косенко',   avatar: '/assets/avatars/egor.jpeg',  phone: '+375 29 111-22-33', lastAmount: '25.00', lastDate: '21.04' },
  { id: 2, name: 'Злата Рыбакова', avatar: '/assets/avatars/zlata.jpeg', phone: '+375 44 222-33-44', lastAmount: '50.00', lastDate: '18.04' },
  { id: 3, name: 'Глеб Глебов',    avatar: '/assets/avatars/gleb.jpeg',  phone: '+375 33 333-44-55', lastAmount: '12.50', lastDate: '15.04' },
]

const HISTORY = [
  { id: 1, friendId: 2, type: 'in',  amount: '50.00', date: '18 апр', comment: 'Возврат долга' },
  { id: 2, friendId: 1, type: 'out', amount: '25.00', date: '21 апр', comment: 'За обед' },
  { id: 3, friendId: 3, type: 'out', amount: '12.50', date: '15 апр', comment: '' },
  { id: 4, friendId: 2, type: 'out', amount: '30.00', date: '10 апр', comment: 'Билеты' },
  { id: 5, friendId: 1, type: 'in',  amount: '15.00', date: '05 апр', comment: 'Кофе' },
]

export default function FriendsScreen({ onBack }) {
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState('friends')

  const filtered = FRIENDS.filter(f =>
    f.name.toLowerCase().includes(query.toLowerCase()) ||
    f.phone.includes(query)
  )

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={28} color="#3d8ef5" />
        </button>
        <span className={styles.topTitle}>Друзья</span>
        <button className={styles.addBtn}>
          <UserPlus size={20} color="#4a80f5" />
        </button>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'friends' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('friends')}
        >Контакты</button>
        <button
          className={`${styles.tab} ${activeTab === 'history' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('history')}
        >История</button>
      </div>

      {activeTab === 'friends' && (
        <>
          <div className={styles.searchWrap}>
            <Search size={16} color="rgba(255,255,255,0.35)" />
            <input
              className={styles.searchInput}
              placeholder="Имя или номер телефона"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>

          <div className={styles.scrollArea}>
            {!query && (
              <div className={styles.section}>
                <span className={styles.sectionTitle}>Быстрый перевод</span>
                <div className={styles.quickRow}>
                  {FRIENDS.map(f => (
                    <button key={f.id} className={styles.quickItem}>
                      <img src={f.avatar} className={styles.quickAvatar} alt={f.name} />
                      <span className={styles.quickName}>{f.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.section}>
              <span className={styles.sectionTitle}>
                {query ? `Результаты (${filtered.length})` : 'Все контакты'}
              </span>
              <div className={styles.list}>
                {filtered.map((f, i) => (
                  <div key={f.id} className={styles.friendRow} style={{ animationDelay: `${i * 0.07}s` }}>
                    <img src={f.avatar} className={styles.avatar} alt={f.name} />
                    <div className={styles.friendInfo}>
                      <span className={styles.friendName}>{f.name}</span>
                      <span className={styles.friendPhone}>{f.phone}</span>
                    </div>
                    <div className={styles.friendRight}>
                      <span className={styles.lastDate}>{f.lastDate}</span>
                      <button className={styles.sendBtn}>
                        <ArrowUpRight size={15} color="#4a80f5" />
                        <span>{f.lastAmount} BYN</span>
                      </button>
                    </div>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className={styles.empty}>Контакты не найдены</div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'history' && (
        <div className={styles.scrollArea}>
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Переводы с друзьями</span>
            <div className={styles.list}>
              {HISTORY.map((h, i) => {
                const friend = FRIENDS.find(f => f.id === h.friendId)
                return (
                  <div key={h.id} className={styles.historyRow} style={{ animationDelay: `${i * 0.06}s` }}>
                    <img src={friend.avatar} className={styles.avatar} alt={friend.name} />
                    <div className={styles.friendInfo}>
                      <span className={styles.friendName}>{friend.name}</span>
                      <span className={styles.friendPhone}>
                        {h.comment || (h.type === 'out' ? 'Перевод' : 'Получено')}
                      </span>
                    </div>
                    <div className={styles.historyRight}>
                      <span className={`${styles.historyAmount} ${h.type === 'in' ? styles.amountIn : styles.amountOut}`}>
                        {h.type === 'out' ? '−' : '+'}{h.amount} BYN
                      </span>
                      <span className={styles.historyDate}>
                        <Clock size={11} />{h.date}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
