import styles from './ExchangeBanner.module.css'

export default function ExchangeBanner() {
  return (
    <div className={styles.banner}>
      <svg className={styles.coinGraphic} viewBox="0 0 64 64" fill="none">
        <path d="M54 18 A26 26 0 0 1 60 36" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
        <polygon points="60,36 55,28 65,28" fill="white" />
        <path d="M10 50 A26 26 0 0 1 8 30" stroke="rgba(255,255,255,0.7)" strokeWidth="3.5" strokeLinecap="round" />
        <polygon points="8,30 3,38 13,38" fill="rgba(255,255,255,0.7)" />
        <circle cx="28" cy="38" r="18" fill="#b8910f" />
        <circle cx="28" cy="36" r="18" fill="#d4a820" />
        <circle cx="28" cy="36" r="14" fill="#c49818" />
        <text x="28" y="41" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="800">$</text>
        <circle cx="40" cy="28" r="13" fill="#9a7a0f" />
        <circle cx="40" cy="27" r="13" fill="#b89010" />
        <circle cx="40" cy="27" r="10" fill="#a88008" />
        <text x="40" y="31" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="800">€</text>
      </svg>
      <div className={styles.body}>
        <div className={styles.title}>ОБМЕННИК MOBY</div>
        <div className={styles.sub}>Обмен валют по выгодному курсу</div>
      </div>
    </div>
  )
}
