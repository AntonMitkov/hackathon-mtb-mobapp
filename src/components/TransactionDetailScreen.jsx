import { useState, useRef } from 'react'
import styles from './TransactionDetailScreen.module.css'
import { ChevronLeft, Camera, Share2, Users, Zap, Crown, Image, X, Check } from 'lucide-react'
import { IconCard } from './icons'
import { supabase } from '../lib/supabase'

export default function TransactionDetailScreen({ tx, onBack, onSplitBill, onStory, photo, onPhotoChange }) {
  const [pendingFile, setPendingFile] = useState(null)
  const [pendingPreview, setPendingPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef(null)

  const influencePts = Math.round(Math.abs(parseFloat(tx.amount)) * 10)

  const compressImage = (file, maxSize = 1024, quality = 0.75) =>
    new Promise((resolve) => {
      const img = new window.Image()
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(resolve, 'image/jpeg', quality)
      }
      img.src = URL.createObjectURL(file)
    })

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPendingFile(file)
    setPendingPreview(URL.createObjectURL(file))
  }

  const handleConfirmPhoto = async () => {
    if (!pendingFile) return
    setUploading(true)
    const localUrl = pendingPreview
    onPhotoChange(tx.id, localUrl)
    setPendingFile(null)
    setPendingPreview(null)
    try {
      const compressed = await compressImage(pendingFile)
      const path = `tx-${tx.id}-${Date.now()}.jpg`
      const { error } = await supabase.storage
        .from('transaction-photos')
        .upload(path, compressed, { upsert: true, contentType: 'image/jpeg' })
      if (error) throw error
      const { data } = supabase.storage
        .from('transaction-photos')
        .getPublicUrl(path)
      onPhotoChange(tx.id, data.publicUrl)
    } catch (err) {
      console.error('Photo upload failed, using local preview:', err)
    } finally {
      setUploading(false)
    }
  }

  const handleCancelPending = () => {
    setPendingFile(null)
    setPendingPreview(null)
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
          {pendingPreview ? (
            <>
              <div className={styles.photoPreview}>
                <img src={pendingPreview} className={styles.photoImg} alt="" />
                <button className={styles.photoRemove} onClick={handleCancelPending}>
                  <X size={14} color="#fff" />
                </button>
              </div>
              <button className={styles.confirmBtn} onClick={handleConfirmPhoto} disabled={uploading}>
                <Check size={18} />
                <span>{uploading ? 'Загрузка...' : 'Прикрепить фото'}</span>
              </button>
            </>
          ) : photo ? (
            <div className={styles.photoPreview}>
              <img src={photo} className={styles.photoImg} alt="" />
              <button className={styles.photoRemove} onClick={() => onPhotoChange(tx.id, null)}>
                <X size={14} color="#fff" />
              </button>
            </div>
          ) : (
            <button className={styles.photoBtn} onClick={() => fileRef.current?.click()}>
              <Camera size={20} color="#4a80f5" />
              <span>Выбрать фото</span>
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileSelect} />
        </div>

        {/* Actions */}
        <div className={styles.divider} />
        <div className={styles.actionsRow}>
          <button className={styles.actionBtn} onClick={onSplitBill}>
            <Users size={18} color="#4a80f5" />
            <span>Поделить</span>
          </button>
          <button className={styles.actionBtn} onClick={() => onStory?.({ ...tx, photo })}>
            <Share2 size={18} color="#ec4899" />
            <span>Сторис</span>
          </button>
        </div>
      </div>
    </div>
  )
}
