import styles from './ProfileScreen.module.css'
import { ChevronLeft, ChevronRight, Bell, Shield, Smartphone, HelpCircle, LogOut, Users } from 'lucide-react'

const MENU = [
  {
    group: 'Аккаунт',
    items: [
      { icon: <Bell size={20} />,       label: 'Уведомления',        sub: 'Push, SMS' },
      { icon: <Shield size={20} />,     label: 'Безопасность',       sub: 'Пароль, биометрия' },
      { icon: <Smartphone size={20} />, label: 'Устройства',         sub: '1 активное устройство' },
    ],
  },
  {
    group: 'Поддержка',
    items: [
      { icon: <HelpCircle size={20} />, label: 'Помощь',             sub: 'FAQ и обратная связь' },
    ],
  },
]

export default function ProfileScreen({ onBack, onFriends }) {
  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={28} color="#3d8ef5" />
        </button>
        <span className={styles.topTitle}>Профиль</span>
      </div>

      <div className={styles.scrollArea}>
        {/* Avatar block */}
        <div className={styles.heroBlock}>
          <div className={styles.avatarWrap}>
            <img src="/assets/avatars/anton.jpeg" className={styles.avatar} alt="Антон" />
          </div>
          <span className={styles.heroName}>Антон Митьков</span>
          <span className={styles.heroPhone}>+375 29 000-00-00</span>
          <span className={styles.heroBadge}>МТБанк · Кактус BYN</span>
        </div>

        {/* Friends row */}
        <button className={styles.friendsRow} onClick={onFriends}>
          <div className={styles.friendsLeft}>
            <div className={styles.friendsIconWrap}>
              <Users size={20} color="#4a80f5" />
            </div>
            <div>
              <span className={styles.friendsTitle}>Друзья</span>
              <span className={styles.friendsSub}>Егор, Злата, Глеб</span>
            </div>
          </div>
          <div className={styles.friendsAvatars}>
            {['/assets/avatars/egor.jpeg', '/assets/avatars/zlata.jpeg', '/assets/avatars/gleb.jpeg'].map((src, i) => (
              <img
                key={i}
                src={src}
                className={styles.friendAvatar}
                style={{ marginLeft: i === 0 ? 0 : -10, zIndex: 3 - i }}
                alt=""
              />
            ))}
          </div>
        </button>

        {/* Menu groups */}
        {MENU.map(group => (
          <div key={group.group} className={styles.group}>
            <span className={styles.groupLabel}>{group.group}</span>
            <div className={styles.groupList}>
              {group.items.map(item => (
                <button key={item.label} className={styles.menuRow}>
                  <div className={styles.menuIcon}>{item.icon}</div>
                  <div className={styles.menuText}>
                    <span className={styles.menuLabel}>{item.label}</span>
                    {item.sub && <span className={styles.menuSub}>{item.sub}</span>}
                  </div>
                  <ChevronRight size={18} color="rgba(255,255,255,0.25)" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button className={styles.logoutBtn}>
          <LogOut size={18} color="#ef4444" />
          <span>Выйти из аккаунта</span>
        </button>
      </div>
    </div>
  )
}
