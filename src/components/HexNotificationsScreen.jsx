import styles from './HexNotificationsScreen.module.css'
import { ChevronLeft, Swords, Crown, Users, MapPin, Eye, Flame, Shield, Trophy } from 'lucide-react'

const NOTIFICATIONS = [
  { id: 1, icon: <Swords size={18} />, color: '#ef4444', title: 'Тебя выбили из Gold!', desc: 'Злата заняла твоё место в PizzaHut', time: '2 мин назад', unread: true },
  { id: 2, icon: <Eye size={18} />, color: '#f59e0b', title: 'Твою точку уже присматривают', desc: 'Кто-то слишком уверенно зашёл в Green Cafe', time: '15 мин назад', unread: true },
  { id: 3, icon: <Crown size={18} />, color: '#f59e0b', title: 'Ты Gold в CoffeeBreak!', desc: 'Cashback 15% на следующую покупку', time: '1 ч назад', unread: true },
  { id: 4, icon: <Users size={18} />, color: '#8b5cf6', title: 'Клан "Кактусы" поднялся на #3', desc: 'Общий influence: 12,800 pts', time: '2 ч назад', unread: false },
  { id: 5, icon: <Flame size={18} />, color: '#ec4899', title: 'Стрик 7 дней!', desc: 'Ещё 3 дня до награды Rare Skin', time: '5 ч назад', unread: false },
  { id: 6, icon: <MapPin size={18} />, color: '#10b981', title: 'Ты на территории друга', desc: 'Егор контролирует этот район', time: '6 ч назад', unread: false },
  { id: 7, icon: <Shield size={18} />, color: '#38bdf8', title: 'Район дрожит', desc: 'Активная борьба за точки рядом с тобой', time: 'Вчера', unread: false },
  { id: 8, icon: <Trophy size={18} />, color: '#f59e0b', title: 'Ещё 2 точки до титула', desc: 'Захвати 5 точек для "Район Хищник"', time: 'Вчера', unread: false },
  { id: 9, icon: <Swords size={18} />, color: '#ef4444', title: 'Друг удерживает точку 3 дня', desc: 'Егор всё ещё Gold в BarBQ', time: '2 дня назад', unread: false },
  { id: 10, icon: <Crown size={18} />, color: '#f59e0b', title: 'Твоего друга выбили из Gold', desc: 'Глеба подвинули в SportLife', time: '3 дня назад', unread: false },
]

export default function HexNotificationsScreen({ onBack }) {
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={28} color="#3d8ef5" />
        </button>
        <span className={styles.topTitle}>Уведомления</span>
        {unreadCount > 0 && <span className={styles.unreadBadge}>{unreadCount}</span>}
      </div>

      <div className={styles.scrollArea}>
        {NOTIFICATIONS.map((n, i) => (
          <div key={n.id} className={`${styles.notifRow} ${n.unread ? styles.notifUnread : ''}`} style={{ animationDelay: `${i * 0.04}s` }}>
            <div className={styles.notifIcon} style={{ color: n.color, background: `${n.color}15` }}>
              {n.icon}
            </div>
            <div className={styles.notifContent}>
              <span className={styles.notifTitle}>{n.title}</span>
              <span className={styles.notifDesc}>{n.desc}</span>
              <span className={styles.notifTime}>{n.time}</span>
            </div>
            {n.unread && <div className={styles.notifDot} />}
          </div>
        ))}
      </div>
    </div>
  )
}
