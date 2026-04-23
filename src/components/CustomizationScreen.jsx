import styles from './CustomizationScreen.module.css'
import { ChevronLeft, Lock, Check } from 'lucide-react'

export default function CustomizationScreen({
  onBack,
  achievements,
  customizations,
  selectedCardDesign,
  setSelectedCardDesign,
  selectedAvatarBorder,
  setSelectedAvatarBorder,
  selectedEmoji,
  setSelectedEmoji,
}) {
  const isUnlocked = (achievementId) => {
    if (achievementId === null) return true
    return achievements.find(a => a.id === achievementId)?.done === true
  }

  const getAchievementName = (achievementId) => {
    return achievements.find(a => a.id === achievementId)?.name || ''
  }

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={28} color="#3d8ef5" />
        </button>
        <span className={styles.topTitle}>Стиль профиля</span>
      </div>

      <div className={styles.scrollArea}>

        {/* Card Design */}
        <div className={styles.section}>
          <span className={styles.sectionTitle}>Дизайн карты</span>
          <span className={styles.sectionSub}>Выбери фон для своей карты</span>
          <div className={styles.cardGrid}>
            {customizations.cardDesigns.map(item => {
              const unlocked = isUnlocked(item.achievementId)
              const selected = selectedCardDesign === item.id
              return (
                <button
                  key={item.id}
                  className={`${styles.cardItem} ${selected ? styles.itemSelected : ''} ${!unlocked ? styles.itemLocked : ''}`}
                  onClick={() => unlocked && setSelectedCardDesign(item.id)}
                  disabled={!unlocked}
                >
                  <div className={styles.cardPreview}>
                    <img src={item.src} className={styles.cardPreviewImg} alt={item.label} />
                    {!unlocked && (
                      <div className={styles.lockOverlay}>
                        <Lock size={20} color="#fff" />
                        <span className={styles.lockText}>{getAchievementName(item.achievementId)}</span>
                      </div>
                    )}
                    {selected && unlocked && (
                      <div className={styles.selectedBadge}>
                        <Check size={14} color="#fff" />
                      </div>
                    )}
                  </div>
                  <span className={styles.itemLabel}>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Avatar Border */}
        <div className={styles.section}>
          <span className={styles.sectionTitle}>Обводка аватара</span>
          <span className={styles.sectionSub}>Укрась рамку своего профиля</span>
          <div className={styles.borderRow}>
            {customizations.avatarBorders.map(item => {
              const unlocked = isUnlocked(item.achievementId)
              const selected = selectedAvatarBorder === item.id
              return (
                <button
                  key={item.id}
                  className={`${styles.borderItem} ${selected ? styles.itemSelected : ''} ${!unlocked ? styles.itemLocked : ''}`}
                  onClick={() => unlocked && setSelectedAvatarBorder(item.id)}
                  disabled={!unlocked}
                >
                  <div className={styles.avatarPreviewWrap}>
                    <div className={styles.avatarPreview} style={unlocked ? item.style : {}}>
                      <img src="/assets/avatars/anton.jpeg" className={styles.avatarImg} alt="" />
                    </div>
                    {!unlocked && (
                      <div className={styles.lockOverlayRound}>
                        <Lock size={14} color="#fff" />
                      </div>
                    )}
                    {selected && unlocked && (
                      <div className={styles.selectedBadgeRound}>
                        <Check size={10} color="#fff" />
                      </div>
                    )}
                  </div>
                  <span className={styles.itemLabel}>{unlocked ? item.label : getAchievementName(item.achievementId)}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Profile Emoji */}
        <div className={styles.section}>
          <span className={styles.sectionTitle}>Эмодзи профиля</span>
          <span className={styles.sectionSub}>Покажи своё настроение</span>
          <div className={styles.emojiRow}>
            {customizations.profileEmojis.map(item => {
              const unlocked = isUnlocked(item.achievementId)
              const selected = selectedEmoji === item.id
              return (
                <button
                  key={item.id}
                  className={`${styles.emojiItem} ${selected ? styles.emojiSelected : ''} ${!unlocked ? styles.itemLocked : ''}`}
                  onClick={() => unlocked && setSelectedEmoji(item.id)}
                  disabled={!unlocked}
                >
                  {item.emoji
                    ? <span className={styles.emojiChar}>{item.emoji}</span>
                    : <span className={styles.emojiNone}>—</span>
                  }
                  {!unlocked && <Lock size={10} color="rgba(255,255,255,0.4)" className={styles.emojiLock} />}
                  {selected && unlocked && <div className={styles.emojiCheckDot}><Check size={8} color="#fff" /></div>}
                </button>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
