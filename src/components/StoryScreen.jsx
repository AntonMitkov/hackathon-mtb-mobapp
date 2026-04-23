import { useState, useRef } from 'react'
import styles from './StoryScreen.module.css'
import { ChevronLeft, Share2, Download, Check } from 'lucide-react'

const CAPTIONS = [
  'Пожир-максились',
  'Мама, я в Минске',
  'Ночной дожор',
  'Кофе — мой допинг',
  'Шопинг-терапия',
  'Чилл-зона',
  'На районе',
  'Gold захвачен',
]

const FRAMES = [
  { id: 'neon', name: 'Neon', gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)' },
  { id: 'fire', name: 'Fire', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
  { id: 'ocean', name: 'Ocean', gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
  { id: 'forest', name: 'Forest', gradient: 'linear-gradient(135deg, #10b981, #059669)' },
]

export default function StoryScreen({ onBack, tx }) {
  const [caption, setCaption] = useState(CAPTIONS[0])
  const [frame, setFrame] = useState('neon')
  const [shared, setShared] = useState(false)
  const storyRef = useRef(null)

  const currentFrame = FRAMES.find(f => f.id === frame)
  const amount = tx?.amount || '-9.79'
  const merchant = tx?.merchant || 'PEREKRESTOK'
  const date = tx?.date || '22 апреля 2026'

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${merchant} — ${caption}`,
          text: `${caption}\n${amount} BYN в ${merchant}\nОтжималка x MTBank`,
        })
      } catch { /* cancelled */ }
    }
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={28} color="#3d8ef5" />
        </button>
        <span className={styles.topTitle}>Создать сторис</span>
      </div>

      <div className={styles.scrollArea}>
        {/* Story preview */}
        <div ref={storyRef} className={styles.storyPreview} style={{ background: currentFrame.gradient }}>
          <div className={styles.storyOverlay}>
            <div className={styles.storyLogo}>
              <span className={styles.logoM}>M</span>
              <span className={styles.logoText}>MTBank</span>
            </div>
            <div className={styles.storyContent}>
              <span className={styles.storyMerchant}>{merchant}</span>
              <span className={styles.storyAmount}>{amount} BYN</span>
              <span className={styles.storyCaption}>"{caption}"</span>
            </div>
            <div className={styles.storyFooter}>
              <span className={styles.storyDate}>{date}</span>
              <span className={styles.storyBrand}>Отжималка</span>
            </div>
          </div>
        </div>

        {/* Captions */}
        <span className={styles.sectionLabel}>Подпись</span>
        <div className={styles.captionsList}>
          {CAPTIONS.map(c => (
            <button
              key={c}
              className={`${styles.captionChip} ${caption === c ? styles.captionActive : ''}`}
              onClick={() => setCaption(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Frames */}
        <span className={styles.sectionLabel}>Рамка</span>
        <div className={styles.framesRow}>
          {FRAMES.map(f => (
            <button
              key={f.id}
              className={`${styles.frameBtn} ${frame === f.id ? styles.frameBtnActive : ''}`}
              onClick={() => setFrame(f.id)}
            >
              <div className={styles.frameSwatch} style={{ background: f.gradient }} />
              <span>{f.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.bottomWrap}>
        <button className={styles.shareBtn} onClick={handleShare}>
          {shared ? <Check size={18} /> : <Share2 size={18} />}
          <span>{shared ? 'Отправлено!' : 'Поделиться'}</span>
        </button>
      </div>
    </div>
  )
}
