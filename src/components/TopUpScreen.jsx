import { useState, useRef } from 'react'
import styles from './TopUpScreen.module.css'
import { ChevronLeft, Camera, Check } from 'lucide-react'

const COMMISSION_RATE = 0.01 // 1%

function formatCardInput(val) {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

export default function TopUpScreen({ onBack }) {
  const [cardNum, setCardNum] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [amount, setAmount] = useState('')
  const [success, setSuccess] = useState(false)

  const commission = amount ? (parseFloat(amount) * COMMISSION_RATE).toFixed(2) : '0.00'
  const canSubmit = cardNum.replace(/\s/g, '').length === 16 && expiry.length === 5 && cvv.length === 3 && parseFloat(amount) > 0

  const handleExpiry = (v) => {
    const digits = v.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) {
      setExpiry(digits.slice(0, 2) + '/' + digits.slice(2))
    } else {
      setExpiry(digits)
    }
  }

  const handleAmount = (v) => {
    const clean = v.replace(/[^0-9.]/g, '')
    const parts = clean.split('.')
    if (parts.length > 2) return
    if (parts[1]?.length > 2) return
    setAmount(clean)
  }

  // Swipe-to-confirm
  const trackRef = useRef(null)
  const [swipeX, setSwipeX] = useState(0)
  const dragging = useRef(false)
  const startX = useRef(0)

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
      setTimeout(() => setSuccess(true), 400)
    } else {
      setSwipeX(0)
    }
  }

  if (success) {
    return (
      <div className={styles.screen}>
        <div className={styles.successWrap}>
          <div className={styles.successCircle}>
            <Check size={48} color="#fff" strokeWidth={3} />
          </div>
          <span className={styles.successAmount}>{parseFloat(amount).toFixed(2)} BYN</span>
          <span className={styles.successText}>Пополнение выполнено</span>
          <span className={styles.successSub}>Карта Кактус BYN 5*4685</span>
          <span className={styles.successCommission}>Комиссия: {commission} BYN</span>
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
        <span className={styles.topTitle}>Пополнить</span>
      </div>

      <div className={styles.scrollArea}>
        {/* From */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Откуда</span>
          <button className={styles.cameraBtn} onClick={() => {
            setCardNum('4255 1234 5678 9012')
            setExpiry('12/28')
            setCvv('***')
          }}><Camera size={20} color="#fff" /></button>
        </div>

        <div className={styles.cardForm}>
          <input
            className={styles.cardNumInput}
            placeholder="XXXX XXXX XXXX XXXX"
            value={cardNum}
            onChange={e => setCardNum(formatCardInput(e.target.value))}
            inputMode="numeric"
            maxLength={19}
          />
          <div className={styles.cardFormRow}>
            <input
              className={styles.halfInput}
              placeholder="ММ/ГГ"
              value={expiry}
              onChange={e => handleExpiry(e.target.value)}
              inputMode="numeric"
              maxLength={5}
            />
            <input
              className={styles.halfInput}
              placeholder="CVV"
              value={cvv}
              onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
              inputMode="numeric"
              maxLength={3}
              type="password"
            />
          </div>
        </div>

        <div className={styles.dots}>
          <div className={`${styles.dot} ${styles.dotActive}`} />
          <div className={styles.dot} />
        </div>

        {/* To */}
        <div className={styles.sectionLabel} style={{ marginBottom: 10 }}>Куда</div>
        <div className={styles.destCard}>
          <div className={styles.destTop}>
            <span className={styles.destName}>Кактус BYN</span>
            <img src="/assets/card.png" className={styles.destThumb} alt="" />
          </div>
          <div className={styles.destBalance}>
            <span className={styles.destAmount}>9.37</span>
            <span className={styles.destCurrency}> BYN</span>
          </div>
          <div className={styles.destBottom}>
            <span className={styles.destNum}>5*4685 · 06/27</span>
            <div className={styles.destRight}>
              <span className={styles.destPoints}>17.00 баллов</span>
              <div className={styles.mastercardDots}>
                <div className={styles.mcRed} />
                <div className={styles.mcOrange} />
              </div>
            </div>
          </div>
        </div>

        <button className={styles.countriesLink} onClick={() => {
          const el = document.getElementById('countriesInfo')
          if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none'
        }}>Доступные страны для перевода</button>
        <div id="countriesInfo" className={styles.countriesInfo} style={{ display: 'none' }}>
          Россия, Казахстан, Грузия, Армения, Узбекистан, Кыргызстан, Польша
        </div>

        {/* Amount */}
        <div className={styles.amountLabel}>Сумма, BYN</div>
        <div className={styles.amountWrap}>
          <input
            className={styles.amountInput}
            placeholder="0.00"
            value={amount}
            onChange={e => handleAmount(e.target.value)}
            inputMode="decimal"
          />
        </div>

        <div className={styles.commission}>
          Комиссия МТБанка: {commission} BYN
        </div>
      </div>

      {/* Swipe bar */}
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
            <ChevronLeft size={22} color="#fff" style={{ transform: 'rotate(180deg)' }} />
          </div>
          <span className={styles.swipeLabel}>Проведите пальцем{'\n'}для совершения перевода</span>
        </div>
      </div>
    </div>
  )
}
