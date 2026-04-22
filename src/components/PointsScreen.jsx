import { useState } from 'react'
import styles from './PointsScreen.module.css'
import { ChevronLeft, ListFilter, EyeOff, CreditCard, CheckSquare, Square } from 'lucide-react'

const POINTS_BALANCE = 17.00

const OPERATIONS = [
  { id: 1, merchant: 'PEREKRESTOK', date: '22.04.2025', amount: 9.79, available: true },
  { id: 2, merchant: 'Яндекс Такси', date: '21.04.2025', amount: 4.50, available: true },
  { id: 3, merchant: 'Burger King', date: '20.04.2025', amount: 12.30, available: true },
  { id: 4, merchant: 'OZON', date: '19.04.2025', amount: 35.00, available: false },
  { id: 5, merchant: 'Магнит', date: '18.04.2025', amount: 6.15, available: true },
  { id: 6, merchant: 'Кино Мир', date: '17.04.2025', amount: 18.00, available: false },
]

export default function PointsScreen({ onBack }) {
  const [selected, setSelected] = useState(new Set())
  const [hideUnavailable, setHideUnavailable] = useState(false)
  const [sortAsc, setSortAsc] = useState(false)

  const toggle = (id) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  let list = hideUnavailable ? OPERATIONS.filter(o => o.available) : OPERATIONS
  list = [...list].sort((a, b) => sortAsc ? a.amount - b.amount : b.amount - a.amount)

  const selectedTotal = OPERATIONS
    .filter(o => selected.has(o.id))
    .reduce((sum, o) => sum + o.amount, 0)

  const canUse = selected.size > 0 && selectedTotal <= POINTS_BALANCE * 100

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={28} color="#3d8ef5" />
        </button>
        <span className={styles.topTitle}>Использовать баллы</span>
      </div>

      <div className={styles.scrollArea}>
        {/* Card info */}
        <div className={styles.cardRow}>
          <img src="/assets/card.png" className={styles.cardThumb} alt="Кактус" />
          <div className={styles.cardInfo}>
            <span className={styles.cardName}>Кактус</span>
            <span className={styles.cardSub}>Накопленные баллы:</span>
          </div>
          <span className={styles.pointsBadge}>{POINTS_BALANCE.toFixed(2)} BYN</span>
        </div>

        {/* Section label */}
        <div className={styles.sectionLabel}>Выберите операции</div>
        <div className={styles.divider} />

        {/* Filters */}
        <div className={styles.filters}>
          <button className={styles.filterBtn} onClick={() => setSortAsc(v => !v)}>
            <ListFilter size={16} color="#4a80f5" />
            <span>Сортировать</span>
          </button>
          <button
            className={`${styles.filterBtn} ${hideUnavailable ? styles.filterActive : ''}`}
            onClick={() => setHideUnavailable(v => !v)}
          >
            <EyeOff size={16} color="#4a80f5" />
            <span>Скрыть недоступные</span>
          </button>
        </div>

        {/* Operations list */}
        {list.length === 0 ? (
          <div className={styles.empty}>
            <CreditCard size={40} color="rgba(255,255,255,0.2)" />
            <span>Операции для использования отсутствуют</span>
          </div>
        ) : (
          <div className={styles.list}>
            {list.map(op => {
              const isSelected = selected.has(op.id)
              return (
                <button
                  key={op.id}
                  className={`${styles.opRow} ${!op.available ? styles.opDisabled : ''} ${isSelected ? styles.opSelected : ''}`}
                  onClick={() => op.available && toggle(op.id)}
                  disabled={!op.available}
                >
                  <div className={styles.opCheck}>
                    {op.available
                      ? (isSelected
                          ? <CheckSquare size={20} color="#4a80f5" />
                          : <Square size={20} color="rgba(255,255,255,0.3)" />)
                      : <Square size={20} color="rgba(255,255,255,0.12)" />
                    }
                  </div>
                  <div className={styles.opInfo}>
                    <span className={styles.opMerchant}>{op.merchant}</span>
                    <span className={styles.opDate}>{op.date}</span>
                  </div>
                  <div className={styles.opRight}>
                    <span className={styles.opAmount}>{op.amount.toFixed(2)} BYN</span>
                    {!op.available && <span className={styles.opUnavail}>Недоступно</span>}
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* Selected total */}
        {selected.size > 0 && (
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Итого к погашению:</span>
            <span className={styles.totalValue}>{selectedTotal.toFixed(2)} BYN</span>
          </div>
        )}
      </div>

      {/* Bottom button */}
      <div className={styles.bottomBar}>
        <button
          className={`${styles.useBtn} ${canUse ? styles.useBtnActive : ''}`}
          disabled={!canUse}
        >
          {canUse
            ? `Погасить ${selectedTotal.toFixed(2)} BYN баллами`
            : 'Использовать'}
        </button>
      </div>
    </div>
  )
}
