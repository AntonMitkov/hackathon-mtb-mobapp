import { useState } from 'react'
import styles from './SplitBillScreen.module.css'
import { ChevronLeft, Check, Users, Link2, Copy, Share2 } from 'lucide-react'

const FRIENDS = [
  { id: 1, name: 'Егор Косенко',   avatar: '/assets/avatars/egor.jpeg',  phone: '+375 29 111-22-33' },
  { id: 2, name: 'Злата Рыбакова', avatar: '/assets/avatars/zlata.jpeg', phone: '+375 44 222-33-44' },
  { id: 3, name: 'Глеб Глебов',    avatar: '/assets/avatars/gleb.jpeg',  phone: '+375 33 333-44-55' },
]

export default function SplitBillScreen({ onBack }) {
  const [amount, setAmount] = useState('')
  const [comment, setComment] = useState('')
  const [selectedFriends, setSelectedFriends] = useState([])
  const [includeMe, setIncludeMe] = useState(true)
  const [linkGenerated, setLinkGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  const totalPeople = selectedFriends.length + (includeMe ? 1 : 0)
  const perPerson = amount && totalPeople > 0
    ? (parseFloat(amount) / totalPeople).toFixed(2)
    : '0.00'

  const canGenerate = parseFloat(amount) > 0 && selectedFriends.length > 0

  const handleAmount = (v) => {
    const clean = v.replace(/[^0-9.]/g, '')
    const parts = clean.split('.')
    if (parts.length > 2) return
    if (parts[1]?.length > 2) return
    setAmount(clean)
  }

  const toggleFriend = (id) => {
    setSelectedFriends(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const mockLink = 'https://mtbank.by/split/a7x3k9'

  const handleCopy = () => {
    navigator.clipboard?.writeText(mockLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Split Bill - МТБанк',
          text: `Разделите счёт на ${perPerson} BYN с каждого`,
          url: mockLink,
        })
      } catch { /* user cancelled */ }
    } else {
      handleCopy()
    }
  }

  if (linkGenerated) {
    return (
      <div className={styles.screen}>
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={onBack}>
            <ChevronLeft size={28} color="#3d8ef5" />
          </button>
          <span className={styles.topTitle}>Split Bill</span>
        </div>

        <div className={styles.linkWrap}>
          <div className={styles.linkCircle}>
            <Link2 size={44} color="#fff" strokeWidth={2.5} />
          </div>
          <span className={styles.linkTitle}>Ссылка создана!</span>
          <span className={styles.linkSub}>
            Отправьте её друзьям — каждый оплатит свою часть
          </span>

          <div className={styles.linkCard}>
            <div className={styles.linkUrl}>{mockLink}</div>
            <button className={styles.copyBtn} onClick={handleCopy}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Скопировано' : 'Копировать'}</span>
            </button>
          </div>

          <div className={styles.splitSummary}>
            <div className={styles.splitRow}>
              <span className={styles.splitLabel}>Общий счёт</span>
              <span className={styles.splitValue}>{parseFloat(amount).toFixed(2)} BYN</span>
            </div>
            <div className={styles.splitRow}>
              <span className={styles.splitLabel}>Участников</span>
              <span className={styles.splitValue}>{totalPeople}</span>
            </div>
            <div className={styles.splitRow}>
              <span className={styles.splitLabel}>С каждого</span>
              <span className={styles.splitValueHighlight}>{perPerson} BYN</span>
            </div>
          </div>

          <div className={styles.participantsList}>
            <span className={styles.participantsTitle}>Участники</span>
            {includeMe && (
              <div className={styles.participantRow}>
                <div className={styles.participantAvatar} style={{ background: '#4a80f5' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Я</span>
                </div>
                <span className={styles.participantName}>Вы (организатор)</span>
                <span className={styles.participantStatus} style={{ color: '#34d399' }}>Оплачено</span>
              </div>
            )}
            {selectedFriends.map(id => {
              const f = FRIENDS.find(fr => fr.id === id)
              return (
                <div key={id} className={styles.participantRow}>
                  <img src={f.avatar} className={styles.participantAvatarImg} alt="" />
                  <span className={styles.participantName}>{f.name}</span>
                  <span className={styles.participantStatus}>Ожидание</span>
                </div>
              )
            })}
          </div>

          <button className={styles.shareBtn} onClick={handleShare}>
            <Share2 size={18} />
            <span>Поделиться ссылкой</span>
          </button>

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
        <span className={styles.topTitle}>Split Bill</span>
      </div>

      <div className={styles.scrollArea}>
        <div className={styles.heroIcon}>
          <Users size={32} color="#4a80f5" />
        </div>
        <span className={styles.heroText}>Разделите счёт с друзьями</span>
        <span className={styles.heroSub}>Каждый получит ссылку для оплаты своей части</span>

        <span className={styles.sectionLabel}>Общая сумма, BYN</span>
        <div className={styles.amountWrap}>
          <input
            className={styles.amountInput}
            placeholder="0.00"
            value={amount}
            onChange={e => handleAmount(e.target.value)}
            inputMode="decimal"
          />
        </div>

        <span className={styles.sectionLabel}>С кем делим</span>
        <div className={styles.friendsGrid}>
          {FRIENDS.map(f => {
            const selected = selectedFriends.includes(f.id)
            return (
              <button
                key={f.id}
                className={`${styles.friendCard} ${selected ? styles.friendCardActive : ''}`}
                onClick={() => toggleFriend(f.id)}
              >
                <div className={styles.friendCardAvatarWrap}>
                  <img src={f.avatar} className={styles.friendCardAvatar} alt="" />
                  {selected && (
                    <div className={styles.checkBadge}>
                      <Check size={10} color="#fff" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <span className={styles.friendCardName}>{f.name.split(' ')[0]}</span>
              </button>
            )
          })}
        </div>

        <button
          className={`${styles.meToggle} ${includeMe ? styles.meToggleActive : ''}`}
          onClick={() => setIncludeMe(!includeMe)}
        >
          <div className={styles.meCheck}>
            {includeMe && <Check size={14} color="#4a80f5" />}
          </div>
          <span>Включить себя в раздел</span>
        </button>

        {amount && selectedFriends.length > 0 && (
          <div className={styles.calcCard}>
            <div className={styles.calcRow}>
              <span className={styles.calcLabel}>Общий счёт</span>
              <span className={styles.calcValue}>{parseFloat(amount).toFixed(2)} BYN</span>
            </div>
            <div className={styles.calcDivider} />
            <div className={styles.calcRow}>
              <span className={styles.calcLabel}>{totalPeople} чел.</span>
              <span className={styles.calcHighlight}>{perPerson} BYN / чел.</span>
            </div>
          </div>
        )}

        <span className={styles.sectionLabel}>Описание (необязательно)</span>
        <input
          className={styles.commentInput}
          placeholder="Ужин, поездка, подарок..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          maxLength={100}
        />
      </div>

      <div className={styles.bottomWrap}>
        <button
          className={`${styles.generateBtn} ${canGenerate ? styles.generateBtnActive : ''}`}
          disabled={!canGenerate}
          onClick={() => setLinkGenerated(true)}
        >
          <Link2 size={20} />
          <span>Создать ссылку</span>
        </button>
      </div>
    </div>
  )
}
