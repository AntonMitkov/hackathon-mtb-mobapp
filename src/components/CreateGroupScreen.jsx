import { useState } from 'react'
import styles from './CreateGroupScreen.module.css'
import { ChevronLeft, Link, Copy, Check, UserPlus } from 'lucide-react'

const FRIENDS = [
  { id: 1, name: 'Егор Косенко', avatar: '/assets/avatars/egor.jpeg', phone: '+375 29 111-22-33' },
  { id: 2, name: 'Злата Рыбакова', avatar: '/assets/avatars/zlata.jpeg', phone: '+375 44 222-33-44' },
  { id: 3, name: 'Глеб Глебов', avatar: '/assets/avatars/gleb.jpeg', phone: '+375 33 333-44-55' },
]

const INVITE_LINK = 'https://mtbank.by/group/abc123'

export default function CreateGroupScreen({ onBack, onGroupCreated }) {
  const [groupName, setGroupName] = useState('Моя группа')
  const [selectedFriends, setSelectedFriends] = useState(new Set())
  const [linkGenerated, setLinkGenerated] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  const toggleFriend = (id) => {
    setSelectedFriends(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(INVITE_LINK)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const canCreate = groupName.trim() && selectedFriends.size > 0

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={28} color="#3d8ef5" />
        </button>
        <span className={styles.topTitle}>Новая группа</span>
      </div>

      <div className={styles.scrollArea}>
        <div className={styles.section}>
          <span className={styles.sectionTitle}>Название группы</span>
          <input
            className={styles.nameInput}
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
            placeholder="Введите название"
          />
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Пригласительная ссылка</span>
          {!linkGenerated ? (
            <button className={styles.generateBtn} onClick={() => setLinkGenerated(true)}>
              <Link size={18} color="#4a80f5" />
              <span>Сгенерировать ссылку</span>
            </button>
          ) : (
            <div className={styles.linkCard}>
              <span className={styles.linkText}>{INVITE_LINK}</span>
              <button className={styles.copyBtn} onClick={handleCopyLink}>
                {linkCopied ? <Check size={16} color="#34d399" /> : <Copy size={16} color="#4a80f5" />}
              </button>
            </div>
          )}
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>Добавить друзей</span>
          <div className={styles.friendsList}>
            {FRIENDS.map((f, i) => {
              const selected = selectedFriends.has(f.id)
              return (
                <button
                  key={f.id}
                  className={`${styles.friendRow} ${selected ? styles.friendSelected : ''}`}
                  onClick={() => toggleFriend(f.id)}
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <img src={f.avatar} className={styles.friendAvatar} alt="" />
                  <div className={styles.friendInfo}>
                    <span className={styles.friendName}>{f.name}</span>
                    <span className={styles.friendPhone}>{f.phone}</span>
                  </div>
                  <div className={`${styles.checkbox} ${selected ? styles.checkboxActive : ''}`}>
                    {selected && <Check size={14} color="#fff" />}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <button
          className={`${styles.createBtn} ${canCreate ? styles.createBtnActive : ''}`}
          onClick={canCreate ? onGroupCreated : undefined}
          disabled={!canCreate}
        >
          <UserPlus size={18} />
          <span>Создать группу ({selectedFriends.size})</span>
        </button>
      </div>
    </div>
  )
}
