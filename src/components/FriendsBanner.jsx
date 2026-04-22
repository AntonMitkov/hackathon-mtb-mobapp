import styles from './FriendsBanner.module.css'
import { ArrowUpRight } from 'lucide-react'

const FRIENDS = [
  { id: 1, name: 'Егор',  avatar: '/assets/avatars/egor.jpeg' },
  { id: 2, name: 'Злата', avatar: '/assets/avatars/zlata.jpeg' },
  { id: 3, name: 'Глеб',  avatar: '/assets/avatars/gleb.jpeg' },
]

export default function FriendsBanner({ onOpen }) {
  return (
    <div className={styles.banner} onClick={onOpen}>
      <div className={styles.left}>
        <div className={styles.avatarStack}>
          {FRIENDS.map((f, i) => (
            <img
              key={f.id}
              src={f.avatar}
              alt={f.name}
              className={styles.stackAvatar}
              style={{ zIndex: FRIENDS.length - i, marginLeft: i === 0 ? 0 : -12 }}
            />
          ))}
        </div>
        <div className={styles.text}>
          <span className={styles.title}>Друзья</span>
          <span className={styles.sub}>Егор, Злата, Глеб</span>
        </div>
      </div>
      <div className={styles.arrowBtn}>
        <ArrowUpRight size={16} color="#4a80f5" />
      </div>
    </div>
  )
}
