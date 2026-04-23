import styles from './ServiceBanner.module.css'

export default function ServiceBanner({ onClick }) {
  return (
    <div className={styles.banner}>
      <div className={styles.textBlock}>
        <div className={styles.title}>ПАКЕТ УСЛУГ</div>
        <div className={styles.sub}>
          Оформите МТкарту,<br />чтобы получать<br />
          <strong>дополнительные бонусы</strong>
        </div>
        <button className={styles.btn} onClick={onClick}>Оформить карту &rsaquo;</button>
      </div>

      <div className={styles.phoneArt}>
        <svg width="140" height="155" viewBox="0 0 140 155" fill="none">
          <rect x="18" y="4" width="104" height="147" rx="18" fill="#0a0a18" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          <rect x="24" y="14" width="92" height="127" rx="12" fill="#12122a" />
          <text x="70" y="95" textAnchor="middle" fill="#1435a8" fontSize="68" fontWeight="900" fontStyle="italic" opacity="0.9">M</text>
          <rect x="42" y="0" width="56" height="10" rx="5" fill="#0a0a18" />
          <rect x="30" y="118" width="80" height="14" rx="4" fill="rgba(255,255,255,0.06)" />
          <rect x="30" y="136" width="50" height="5" rx="2.5" fill="rgba(255,255,255,0.04)" />
          <rect x="34" y="28" width="72" height="44" rx="8" fill="url(#cardGrad)" />
          <defs>
            <linearGradient id="cardGrad" x1="34" y1="28" x2="106" y2="72" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1a40c0" />
              <stop offset="1" stopColor="#6a1090" />
            </linearGradient>
          </defs>
          <text x="42" y="58" fill="white" fontSize="16" fontWeight="900" fontStyle="italic" opacity="0.8">M</text>
          <circle cx="88" cy="55" r="7" fill="#eb001b" opacity="0.8" />
          <circle cx="98" cy="55" r="7" fill="#f79e1b" opacity="0.8" />
        </svg>
      </div>
    </div>
  )
}
