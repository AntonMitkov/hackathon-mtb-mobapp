import { useState, useRef } from 'react'
import styles from './SendMoneyScreen.module.css'
import { ChevronLeft, Check, ArrowUpRight } from 'lucide-react'

const FRIENDS = [
  { id: 1, name: 'Егор Косенко',   avatar: '/assets/avatars/egor.jpeg',  phone: '+375 29 111-22-33' },
  { id: 2, name: 'Злата Рыбакова', avatar: '/assets/avatars/zlata.jpeg', phone: '+375 44 222-33-44' },
  { id: 3, name: 'Глеб Глебов',    avatar: '/assets/avatars/gleb.jpeg',  phone: '+375 33 333-44-55' },
]

export default function SendMoneyScreen({ onBack, preselectedFriend }) {
  const [selectedFriend, setSelectedFriend] = useState(preselectedFriend || null)
  const [amount, setAmount] = useState('')
  const [comment, setComment] = useState('')
  const [sent, setSent] = useState(false)

  const trackRef = useRef(null)
  const [swipeX, setSwipeX] = useState(0)
  const dragging = useRef(false)
  const startX = useRef(0)

  const canSubmit = selectedFriend && parseFloat(amount) > 0

  const handleAmount = (v) => {
    const clean = v.replace(/[^0-9.]/g, '')
    const parts = clean.split('.')
    if (parts.length > 2) return
    if (parts[1]?.length > 2) return
    setAmount(clean)
  }

  const onPointerDown = (e) => {
    if (!canSubmit) return
    dragging.current = true
    startX.current = e.clientX
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (!dragging.current) return
    const track = trackRef.current
    if (!track) return
    const max = track.clientWidth - 56
    const dx = Math.max(0, Math.min(e.clientX - startX.current, max))
    setSwipeX(dx)
  }
  const onPointerUp = () => {
    if (!dragging.current) return
    dragging.current = false
    const track = trackRef.current
    const max = track ? track.clientWidth - 56 : 200
    if (swipeX > max * 0.75) {
      setSwipeX(max)
      setTimeout(() => setSent(true), 400)
    } else {
      setSwipeX(0)
    }
  }

  if (sent) {
    const friend = FRIENDS.find(f => f.id === selectedFriend)
    return (
      <div className={styles.screen}>
        <div className={styles.successWrap}>
          <div className={styles.successCircle}>
            <Check size={48} color="#fff" strokeWidth={3} />
          </div>
          <span className={styles.successAmount}>{parseFloat(amount).toFixed(2)} BYN</span>
          <span className={styles.successText}>Переведено</span>
          <div className={styles.successFriend}>
            <img src={friend.avatar} className={styles.successAvatar} alt="" />
            <span>{friend.name}</span>
          </div>
          {comment && <span className={styles.successComment}>«{comment}»</span>}
          <button className={styles.doneBtn} onClick={onBack}>Готово</button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={28} color="#3d8ef5" />
        </button>
        <span className={styles.topTitle}>Перевод другу</span>
      </div>

      <div className={styles.scrollArea}>
        <span className={styles.sectionLabel}>Кому</span>
        <div className={styles.friendsList}>
          {FRIENDS.map(f => (
            <button
              key={f.id}
              className={`${styles.friendChip} ${selectedFriend === f.id ? styles.friendChipActive : ''}`}
              onClick={() => setSelectedFriend(f.id)}
            >
              <img src={f.avatar} className={styles.chipAvatar} alt="" />
              <span className={styles.chipName}>{f.name.split(' ')[0]}</span>
              {selectedFriend === f.id && <Check size={14} color="#4a80f5" />}
            </button>
          ))}
        </div>

        <span className={styles.sectionLabel}>Сумма, BYN</span>
        <div className={styles.amountWrap}>
          <input
            className={styles.amountInput}
            placeholder="0.00"
            value={amount}
            onChange={e => handleAmount(e.target.value)}
            inputMode="decimal"
          />
        </div>

        <div className={styles.quickAmounts}>
          {['5', '10', '25', '50', '100'].map(v => (
            <button key={v} className={styles.quickBtn} onClick={() => setAmount(v)}>
              {v} BYN
            </button>
          ))}
        </div>

        <span className={styles.sectionLabel}>Комментарий</span>
        <input
          className={styles.commentInput}
          placeholder="За обед, кофе, билеты..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          maxLength={100}
        />

        {selectedFriend && amount && (
          <div className={styles.summaryCard}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Получатель</span>
              <span className={styles.summaryValue}>{FRIENDS.find(f => f.id === selectedFriend)?.name}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Сумма</span>
              <span className={styles.summaryValue}>{parseFloat(amount).toFixed(2)} BYN</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Комиссия</span>
              <span className={styles.summaryValue}>0.00 BYN</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.swipeBarWrap}>
        <div
          ref={trackRef}
          className={`${styles.swipeTrack} ${canSubmit ? styles.swipeTrackActive : ''}`}
        >
          <div
            className={styles.swipeThumb}
            style={{ transform: `translateX(${swipeX}px)`, opacity: canSubmit ? 1 : 0.35 }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            <ArrowUpRight size={22} color="#fff" />
          </div>
          <span className={styles.swipeLabel}>Проведите для перевода</span>
        </div>
      </div>
    </div>
  )
}
