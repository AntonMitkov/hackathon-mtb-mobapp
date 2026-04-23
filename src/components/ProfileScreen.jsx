import { useState } from 'react'
import styles from './ProfileScreen.module.css'
import { ChevronLeft, ChevronRight, Bell, Shield, Smartphone, HelpCircle, LogOut, Users, Crown, Zap, Target, Flame } from 'lucide-react'

const MENU = [
  {
    group: 'Аккаунт',
    items: [
      { id: 'notifSettings',    icon: <Bell size={20} />,       label: 'Уведомления',        sub: 'Push, SMS' },
      { id: 'securitySettings', icon: <Shield size={20} />,     label: 'Безопасность',       sub: 'Пароль, биометрия' },
      { id: 'devices',          icon: <Smartphone size={20} />, label: 'Устройства',         sub: '1 активное устройство' },
    ],
  },
  {
    group: 'Поддержка',
    items: [
      { id: 'help', icon: <HelpCircle size={20} />, label: 'Помощь',             sub: 'FAQ и обратная связь' },
    ],
  },
]

export default function ProfileScreen({ onBack, onFriends, onFeature, onHex, onHexNotifications }) {
  const [showLogout, setShowLogout] = useState(false)

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
            <div className={styles.hexLevelBadge}>12</div>
          </div>
          <span className={styles.heroName}>Антон Митьков</span>
          <span className={styles.heroPhone}>+375 29 000-00-00</span>
          <span className={styles.heroBadge}>МТБанк · Кактус BYN</span>
        </div>

        {/* HEX game card */}
        <button className={styles.hexCard} onClick={onHex}>
          <div className={styles.hexCardTop}>
            <div className={styles.hexIconWrap}>
              <Crown size={22} color="#f59e0b" />
            </div>
            <div className={styles.hexCardInfo}>
              <span className={styles.hexCardTitle}>Отжималка</span>
              <span className={styles.hexCardSub}>Район Новатор · Lvl 12</span>
            </div>
            <ChevronRight size={18} color="rgba(255,255,255,0.3)" />
          </div>
          <div className={styles.hexStatsRow}>
            <div className={styles.hexStat}>
              <Zap size={12} color="#f59e0b" />
              <span>4,250 pts</span>
            </div>
            <div className={styles.hexStat}>
              <Target size={12} color="#ef4444" />
              <span>3 точки</span>
            </div>
            <div className={styles.hexStat}>
              <Flame size={12} color="#ec4899" />
              <span>7д стрик</span>
            </div>
          </div>
        </button>

        {/* HEX notifications */}
        <button className={styles.hexNotifRow} onClick={onHexNotifications}>
          <div className={styles.hexNotifIcon}>
            <Bell size={18} color="#ef4444" />
          </div>
          <div className={styles.hexNotifInfo}>
            <span className={styles.hexNotifTitle}>Игровые уведомления</span>
            <span className={styles.hexNotifSub}>Тебя выбили из Gold!</span>
          </div>
          <span className={styles.hexNotifBadge}>3</span>
        </button>

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
                <button key={item.label} className={styles.menuRow} onClick={() => onFeature?.(item.id)}>
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
        <button className={styles.logoutBtn} onClick={() => setShowLogout(true)}>
          <LogOut size={18} color="#ef4444" />
          <span>Выйти из аккаунта</span>
        </button>

        {showLogout && (
          <div className={styles.logoutConfirm}>
            <span className={styles.logoutConfirmText}>Вы уверены, что хотите выйти?</span>
            <div className={styles.logoutConfirmActions}>
              <button className={styles.logoutCancel} onClick={() => setShowLogout(false)}>Отмена</button>
              <button className={styles.logoutConfirmBtn} onClick={() => setShowLogout(false)}>Выйти</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
