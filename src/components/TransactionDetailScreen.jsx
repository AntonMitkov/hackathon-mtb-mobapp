import { useState, useRef } from 'react'
import styles from './TransactionDetailScreen.module.css'
import { ChevronLeft, Camera, Share2, Users, Zap, Crown, Image, X } from 'lucide-react'
import { IconCard } from './icons'

export default function TransactionDetailScreen({ tx, onBack, onSplitBill, onStory }) {
  const [photo, setPhoto] = useState(null)
  const fileRef = useRef(null)

  const influencePts = Math.round(Math.abs(parseFloat(tx.amount)) * 10)

  const handlePhoto = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPhoto(url)
    }
  }

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack} aria-label="Назад">
          <ChevronLeft size={28} color="#3d8ef5" />
        </button>
        <span className={styles.topTitle}>Детали операции</span>
      </div>

      <div className={styles.body}>
        <div className={styles.iconCircle}>
          <IconCard size={26} color="#4a80f5" />
        </div>

        <div className={styles.merchant}>{tx.merchant}</div>
        <div className={styles.date}>{tx.date}</div>
        <div className={styles.amount}>{tx.amount} BYN</div>

        {/* HEX influence earned */}
        <div className={styles.influenceBanner}>
          <Zap size={16} color="#f59e0b" />
          <span className={styles.influenceText}>+{influencePts} Influence Points</span>
          <Crown size={14} color="#f59e0b" />
        </div>

        <div className={styles.divider} />

        <div className={styles.infoList}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Карта / счет</span>
            <span className={styles.infoValue}>{tx.cardName}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Тип операции</span>
            <span className={styles.infoValue}>{tx.type}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>МСС-код</span>
            <span className={styles.infoValue}>{tx.mcc}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Результат операции</span>
            <span className={`${styles.infoValue} ${styles.muted}`}>{tx.status}</span>
          </div>
        </div>

        {/* Photo */}
        <div className={styles.divider} />
        <div className={styles.photoSection}>
          <span className={styles.photoLabel}>Фото к транзакции</span>
          {photo ? (
            <div className={styles.photoPreview}>
              <img src={photo} className={styles.photoImg} alt="" />
              <button className={styles.photoRemove} onClick={() => setPhoto(null)}>
                <X size={14} color="#fff" />
              </button>
            </div>
          ) : (
            <button className={styles.photoBtn} onClick={() => fileRef.current?.click()}>
              <Camera size={20} color="#4a80f5" />
              <span>Прикрепить фото</span>
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={handlePhoto} />
        </div>

        {/* Actions */}
        <div className={styles.divider} />
        <div className={styles.actionsRow}>
          <button className={styles.actionBtn} onClick={onSplitBill}>
            <Users size={18} color="#4a80f5" />
            <span>Поделить</span>
          </button>
          <button className={styles.actionBtn} onClick={() => onStory?.(tx)}>
            <Share2 size={18} color="#ec4899" />
            <span>Сторис</span>
          </button>
        </div>
      </div>
    </div>
  )
}
