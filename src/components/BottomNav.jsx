import { useState } from 'react'
import styles from './BottomNav.module.css'
import { Home, Wallet, MessageSquare, MoreHorizontal } from './icons'

export default function BottomNav() {
  const [active, setActive] = useState('home')

  return (
    <nav className={styles.nav}>
      <NavItem id="home" label="Главная" active={active} onSelect={setActive}>
        <HomeIcon active={active === 'home'} />
      </NavItem>
      <NavItem id="products" label="Продукты" active={active} onSelect={setActive}>
        <Wallet size={26} color={active === 'products' ? '#5b8ef5' : 'rgba(255,255,255,0.42)'} />
      </NavItem>
      <NavItem id="chat" label="Чат" active={active} onSelect={setActive}>
        <MessageSquare size={26} color={active === 'chat' ? '#5b8ef5' : 'rgba(255,255,255,0.42)'} />
      </NavItem>
      <NavItem id="more" label="Ещё" active={active} onSelect={setActive} badge={1}>
        <MoreHorizontal size={26} color={active === 'more' ? '#5b8ef5' : 'rgba(255,255,255,0.42)'} />
      </NavItem>
    </nav>
  )
}

function NavItem({ id, label, active, onSelect, badge, children }) {
  const isActive = active === id
  return (
    <button className={`${styles.item} ${isActive ? styles.active : ''}`} onClick={() => onSelect(id)}>
      <div className={styles.iconWrap}>
        {children}
        {badge && <span className={styles.badge}>{badge}</span>}
      </div>
      <span className={styles.label}>{label}</span>
    </button>
  )
}

// Градиентная иконка домика для активного состояния
function HomeIcon({ active }) {
  if (!active) return (
    <Home size={26} color="rgba(255,255,255,0.42)" />
  )
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="homeGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e040fb" />
          <stop offset="45%" stopColor="#5560f5" />
          <stop offset="100%" stopColor="#29b6f6" />
        </linearGradient>
      </defs>
      <path d="M3 9.5L12 3L21 9.5V20a1 1 0 0 1-1 1h-5v-5h-4v5H4a1 1 0 0 1-1-1V9.5Z" fill="url(#homeGrad)" />
    </svg>
  )
}
