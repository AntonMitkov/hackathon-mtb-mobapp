import { useState, useRef, useEffect } from 'react'
import styles from './GroupChatScreen.module.css'
import { ChevronLeft, BarChart3, Send, ShoppingBag, Zap } from 'lucide-react'

const GROUPS = {
  1: {
    name: 'Кактусы Battle',
    members: 4,
    feed: [
      { id: 1, type: 'system', text: 'Группа "Кактусы Battle" создана', time: '10:00' },
      { id: 2, type: 'message', userId: 1, name: 'Егор', avatar: '/assets/avatars/egor.jpeg', text: 'Го стрик сегодня!', time: '10:05' },
      { id: 3, type: 'system', subtype: 'purchase', name: 'Егор', merchant: 'Green Cafe', category: 'Кафе', cashback: '10%', pts: 120, time: '11:23' },
      { id: 4, type: 'message', userId: 'me', name: 'Антон', avatar: '/assets/avatars/anton.jpeg', text: 'Красавчик! Сейчас тоже зайду', time: '11:25' },
      { id: 5, type: 'system', subtype: 'purchase', name: 'Антон', merchant: 'CoffeeBreak', category: 'Кафе', cashback: '15%', pts: 180, time: '11:42' },
      { id: 6, type: 'message', userId: 2, name: 'Злата', avatar: '/assets/avatars/zlata.jpeg', text: 'Ого, я тоже хочу! Где это?', time: '12:01' },
      { id: 7, type: 'system', subtype: 'purchase', name: 'Злата', merchant: 'PizzaHut', category: 'Кафе', cashback: '10%', pts: 95, time: '12:30' },
      { id: 8, type: 'system', subtype: 'purchase', name: 'Глеб', merchant: 'Евроопт', category: 'Продукты', cashback: '2%', pts: 40, time: '13:15' },
      { id: 9, type: 'message', userId: 3, name: 'Глеб', avatar: '/assets/avatars/gleb.jpeg', text: 'Закупился на ужин', time: '13:16' },
      { id: 10, type: 'system', subtype: 'purchase', name: 'Егор', merchant: 'SportLife', category: 'Фитнес', cashback: '7%', pts: 150, time: '15:40' },
      { id: 11, type: 'system', subtype: 'purchase', name: 'Антон', merchant: 'BarBQ', category: 'Ресторан', cashback: '5%', pts: 110, time: '19:05' },
      { id: 12, type: 'message', userId: 1, name: 'Егор', avatar: '/assets/avatars/egor.jpeg', text: 'Стрик держим!', time: '19:30' },
    ],
  },
  2: {
    name: 'Golden Quatro',
    members: 4,
    feed: [
      { id: 1, type: 'system', text: 'Группа "Golden Quatro" создана', time: '09:00' },
      { id: 2, type: 'message', userId: 4, name: 'Кира', avatar: '/assets/avatars/kira.jpeg', text: 'Всем привет! Давайте держать стрик', time: '09:10' },
      { id: 3, type: 'system', subtype: 'purchase', name: 'Кира', merchant: 'Пекарня №1', category: 'Кафе', cashback: '8%', pts: 85, time: '09:45' },
      { id: 4, type: 'message', userId: 'me', name: 'Антон', avatar: '/assets/avatars/anton.jpeg', text: 'Доброе утро! Уже бегу за кофе', time: '09:50' },
      { id: 5, type: 'system', subtype: 'purchase', name: 'Антон', merchant: 'CoffeeBreak', category: 'Кафе', cashback: '15%', pts: 140, time: '10:02' },
      { id: 6, type: 'system', subtype: 'purchase', name: 'Яна', merchant: 'BeautyLab', category: 'Красота', cashback: '8%', pts: 110, time: '12:30' },
      { id: 7, type: 'message', userId: 5, name: 'Яна', avatar: '/assets/avatars/yana.jpeg', text: 'Забежала в BeautyLab, кэшбэк топ!', time: '12:32' },
      { id: 8, type: 'system', subtype: 'purchase', name: 'Тася', merchant: 'Евроопт', category: 'Продукты', cashback: '2%', pts: 30, time: '13:15' },
      { id: 9, type: 'message', userId: 6, name: 'Тася', avatar: '/assets/avatars/tasya.jpeg', text: 'Закупилась в Евроопте, стрик в безопасности!', time: '13:18' },
      { id: 10, type: 'system', subtype: 'purchase', name: 'Кира', merchant: 'Аптека Линия', category: 'Аптека', cashback: '6%', pts: 65, time: '16:00' },
      { id: 11, type: 'message', userId: 4, name: 'Кира', avatar: '/assets/avatars/kira.jpeg', text: 'Все отметились! Стрик 5 дней', time: '19:00' },
      { id: 12, type: 'message', userId: 'me', name: 'Антон', avatar: '/assets/avatars/anton.jpeg', text: 'Golden Quatro непобедимы!', time: '19:05' },
    ],
  },
}

export default function GroupChatScreen({ groupId, onBack, onInfluence }) {
  const group = GROUPS[groupId] || GROUPS[1]
  const [feed, setFeed] = useState(group.feed)
  const [inputText, setInputText] = useState('')
  const scrollRef = useRef(null)
  const prevGroupId = useRef(groupId)

  useEffect(() => {
    if (prevGroupId.current !== groupId) {
      const g = GROUPS[groupId] || GROUPS[1]
      setFeed(g.feed)
      prevGroupId.current = groupId
    }
  }, [groupId])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [feed])

  const handleSend = () => {
    if (!inputText.trim()) return
    setFeed(prev => [...prev, {
      id: prev.length + 1,
      type: 'message',
      userId: 'me',
      name: 'Антон',
      avatar: '/assets/avatars/anton.jpeg',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    }])
    setInputText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={28} color="#3d8ef5" />
        </button>
        <div className={styles.topInfo}>
          <span className={styles.topTitle}>{group.name}</span>
          <span className={styles.topSub}>{group.members} участника</span>
        </div>
        <button className={styles.chartBtn} onClick={onInfluence}>
          <BarChart3 size={20} color="#4a80f5" />
        </button>
      </div>

      <div className={styles.feed} ref={scrollRef}>
        {feed.map(item => {
          if (item.type === 'system' && item.subtype === 'purchase') {
            return (
              <div key={item.id} className={styles.purchaseCard}>
                <div className={styles.purchaseIcon}>
                  <ShoppingBag size={16} color="#34d399" />
                </div>
                <div className={styles.purchaseBody}>
                  <span className={styles.purchaseText}>
                    <strong>{item.name}</strong> — покупка в <strong>{item.merchant}</strong>
                  </span>
                  <div className={styles.purchaseMeta}>
                    <span className={styles.purchaseCashback}>{item.cashback} кэшбэк</span>
                    <span className={styles.purchasePts}>
                      <Zap size={10} color="#f59e0b" />
                      +{item.pts} pts
                    </span>
                    <span className={styles.purchaseTime}>{item.time}</span>
                  </div>
                </div>
              </div>
            )
          }

          if (item.type === 'system') {
            return (
              <div key={item.id} className={styles.systemMsg}>
                <span>{item.text}</span>
                <span className={styles.systemTime}>{item.time}</span>
              </div>
            )
          }

          const isMe = item.userId === 'me'
          return (
            <div key={item.id} className={`${styles.msgRow} ${isMe ? styles.msgRowMe : ''}`}>
              {!isMe && <img src={item.avatar} className={styles.msgAvatar} alt="" />}
              <div className={`${styles.msgBubble} ${isMe ? styles.msgBubbleMe : ''}`}>
                {!isMe && <span className={styles.msgName}>{item.name}</span>}
                <span className={styles.msgText}>{item.text}</span>
                <span className={styles.msgTime}>{item.time}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.inputBar}>
        <input
          className={styles.input}
          placeholder="Сообщение..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className={`${styles.sendBtn} ${inputText.trim() ? styles.sendBtnActive : ''}`}
          onClick={handleSend}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}
