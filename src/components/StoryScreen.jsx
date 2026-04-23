import { useState, useRef, useCallback } from 'react'
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
  'Деньги любят тишину',
  'Кошелёк плачет',
  'Транзакция одобрена 💅',
  'За всё заплачено',
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
  const txPhoto = tx?.photo || null

  const loadImage = (src) =>
    new Promise((resolve, reject) => {
      const img = new window.Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })

  const renderStoryImage = useCallback(async () => {
    const W = 1080, H = 1920
    const canvas = document.createElement('canvas')
    canvas.width = W; canvas.height = H
    const ctx = canvas.getContext('2d')

    // Background gradient
    const colors = currentFrame.gradient.match(/#[a-f0-9]{6}/gi)
    const grad = ctx.createLinearGradient(0, 0, W, H)
    grad.addColorStop(0, colors[0])
    grad.addColorStop(1, colors[1])
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, W, H)

    // Photo (cover-fill)
    if (txPhoto) {
      try {
        const img = await loadImage(txPhoto)
        const scale = Math.max(W / img.width, H / img.height)
        const w = img.width * scale, h = img.height * scale
        ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h)
      } catch { /* photo load failed, keep gradient */ }
    }

    // Dark overlay
    ctx.fillStyle = 'rgba(0,0,0,0.38)'
    ctx.fillRect(0, 0, W, H)

    // Logo "M" box
    const logoX = 60, logoY = 100
    ctx.fillStyle = 'rgba(255,255,255,0.2)'
    ctx.beginPath()
    ctx.roundRect(logoX, logoY, 80, 80, 20)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = '800 48px -apple-system, BlinkMacSystemFont, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('M', logoX + 40, logoY + 42)

    // Logo text "MTBank"
    ctx.fillStyle = 'rgba(255,255,255,0.8)'
    ctx.font = '700 42px -apple-system, BlinkMacSystemFont, sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText('MTBank', logoX + 96, logoY + 42)

    // Center content
    const cy = H / 2
    ctx.textAlign = 'center'

    // Merchant
    ctx.fillStyle = 'rgba(255,255,255,0.7)'
    ctx.font = '600 38px -apple-system, BlinkMacSystemFont, sans-serif'
    ctx.letterSpacing = '3px'
    ctx.fillText(merchant.toUpperCase(), W / 2, cy - 90)

    // Amount
    ctx.fillStyle = '#fff'
    ctx.font = '800 96px -apple-system, BlinkMacSystemFont, sans-serif'
    ctx.letterSpacing = '0px'
    ctx.fillText(`${amount} BYN`, W / 2, cy + 20)

    // Caption
    ctx.fillStyle = 'rgba(255,255,255,0.9)'
    ctx.font = 'italic 600 48px -apple-system, BlinkMacSystemFont, sans-serif'
    ctx.fillText(`\u201C${caption}\u201D`, W / 2, cy + 110)

    // Footer — date (left)
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.font = '34px -apple-system, BlinkMacSystemFont, sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText(date, 60, H - 120)

    // Footer — brand badge (right)
    ctx.fillStyle = 'rgba(255,255,255,0.12)'
    const brandText = 'Отжималка'
    ctx.font = '700 34px -apple-system, BlinkMacSystemFont, sans-serif'
    const bw = ctx.measureText(brandText).width + 40
    ctx.beginPath()
    ctx.roundRect(W - 60 - bw, H - 148, bw, 48, 14)
    ctx.fill()
    ctx.fillStyle = 'rgba(255,255,255,0.65)'
    ctx.textAlign = 'center'
    ctx.fillText(brandText, W - 60 - bw / 2, H - 116)

    return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
  }, [currentFrame, txPhoto, merchant, amount, caption, date])

  const handleShare = async () => {
    try {
      const blob = await renderStoryImage()
      const file = new File([blob], 'story.png', { type: 'image/png' })

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${merchant} — ${caption}`,
        })
      } else {
        // Fallback: download the image
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'mtbank-story.png'
        a.click()
        URL.revokeObjectURL(url)
      }
    } catch (err) {
      if (err.name !== 'AbortError') console.error('Share failed:', err)
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
          {txPhoto && <img src={txPhoto} className={styles.storyPhoto} alt="" />}
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
          <span>{shared ? 'Готово!' : 'Поделиться в Instagram'}</span>
        </button>
      </div>
    </div>
  )
}
