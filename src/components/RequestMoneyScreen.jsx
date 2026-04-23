import { useState } from 'react'
import styles from './RequestMoneyScreen.module.css'
import { ChevronLeft, Check, ArrowDownLeft } from 'lucide-react'

const FRIENDS = [
  { id: 1, name: 'Егор Косенко',   avatar: '/assets/avatars/egor.jpeg',  phone: '+375 29 111-22-33' },
  { id: 2, name: 'Злата Рыбакова', avatar: '/assets/avatars/zlata.jpeg', phone: '+375 44 222-33-44' },
  { id: 3, name: 'Глеб Глебов',    avatar: '/assets/avatars/gleb.jpeg',  phone: '+375 33 333-44-55' },
]

export default function RequestMoneyScreen({ onBack, preselectedFriend }) {
  const [selectedFriend, setSelectedFriend] = useState(preselectedFriend || null)
  const [amount, setAmount] = useState('')
  const [comment, setComment] = useState('')
  const [sent, setSent] = useState(false)

  const canSubmit = selectedFriend && parseFloat(amount) > 0

  const handleAmount = (v) => {
    const clean = v.replace(/[^0-9.]/g, '')
    const parts = clean.split('.')
    if (parts.length > 2) return
    if (parts[1]?.length > 2) return
    setAmount(clean)
  }

  if (sent) {
    const friend = FRIENDS.find(f => f.id === selectedFriend)
    return (
      <div className={styles.screen}>
        <div className={styles.successWrap}>
          <div className={styles.successCircle}>
            <ArrowDownLeft size={48} color="#fff" strokeWidth={3} />
          </div>
          <span className={styles.successAmount}>{parseFloat(amount).toFixed(2)} BYN</span>
          <span className={styles.successText}>Запрос отправлен</span>
          <div className={styles.successFriend}>
            <img src={friend.avatar} className={styles.successAvatar} alt="" />
            <span>{friend.name}</span>
          </div>
          {comment && <span className={styles.successComment}>«{comment}»</span>}
          <span className={styles.successHint}>Друг получит уведомление и сможет подтвердить перевод</span>
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
        <span className={styles.topTitle}>Запросить перевод</span>
      </div>

      <div className={styles.scrollArea}>
        <span className={styles.sectionLabel}>У кого</span>
        <div className={styles.friendsList}>
          {FRIENDS.map(f => (
            <button
              key={f.id}
              className={`${styles.friendChip} ${selectedFriend === f.id ? styles.friendChipActive : ''}`}
              onClick={() => setSelectedFriend(f.id)}
            >
              <img src={f.avatar} className={styles.chipAvatar} alt="" />
              <span className={styles.chipName}>{f.name.split(' ')[0]}</span>
              {selectedFriend === f.id && <Check size={14} color="#34d399" />}
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
          placeholder="Верни за обед, кофе..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          maxLength={100}
        />

        {selectedFriend && amount && (
          <div className={styles.previewCard}>
            <div className={styles.previewHeader}>Запрос будет выглядеть так:</div>
            <div className={styles.previewBody}>
              <img src={'/assets/avatars/anton.jpeg'} className={styles.previewMyAvatar} alt="" />
              <div className={styles.previewBubble}>
                <span className={styles.previewName}>Антон просит</span>
                <span className={styles.previewAmount}>{parseFloat(amount).toFixed(2)} BYN</span>
                {comment && <span className={styles.previewComment}>{comment}</span>}
                <div className={styles.previewActions}>
                  <span className={styles.previewAccept}>Перевести</span>
                  <span className={styles.previewDecline}>Отклонить</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.bottomWrap}>
        <button
          className={`${styles.sendBtn} ${canSubmit ? styles.sendBtnActive : ''}`}
          disabled={!canSubmit}
          onClick={() => setSent(true)}
        >
          <ArrowDownLeft size={20} />
          <span>Отправить запрос</span>
        </button>
      </div>
    </div>
  )
}
