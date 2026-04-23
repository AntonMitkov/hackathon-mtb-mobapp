import { useEffect, useRef, useState } from 'react'
import styles from './MapScreen.module.css'
import { ChevronDown, ChevronUp, Navigation } from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const MINSK_CENTER = [53.9006, 27.5590]

const FRIENDS = [
  { id: 1, name: 'Егор',  avatar: '/assets/avatars/egor.jpeg',  lat: 53.9085, lng: 27.5515, lastSeen: '5 мин назад' },
  { id: 2, name: 'Злата', avatar: '/assets/avatars/zlata.jpeg', lat: 53.8932, lng: 27.5843, lastSeen: '12 мин назад' },
  { id: 3, name: 'Глеб',  avatar: '/assets/avatars/gleb.jpeg',  lat: 53.9178, lng: 27.5180, lastSeen: '1 ч назад' },
]

const PARTNERS = [
  { id: 'p1',  name: 'Green Cafe',         cat: 'Кафе',        lat: 53.9023, lng: 27.5618, cashback: '10%' },
  { id: 'p2',  name: 'BarBQ',              cat: 'Ресторан',    lat: 53.9102, lng: 27.5490, cashback: '5%' },
  { id: 'p3',  name: 'BeautyLab',          cat: 'Красота',     lat: 53.8875, lng: 27.5735, cashback: '8%' },
  { id: 'p4',  name: 'SportLife',           cat: 'Фитнес',      lat: 53.9210, lng: 27.5330, cashback: '7%' },
  { id: 'p5',  name: 'ТЦ Galleria',        cat: 'Шоппинг',     lat: 53.9057, lng: 27.5467, cashback: '3%' },
  { id: 'p6',  name: 'АЗС Белнефтехим',    cat: 'АЗС',         lat: 53.8790, lng: 27.6100, cashback: '4%' },
  { id: 'p7',  name: 'Аптека Линия',        cat: 'Аптека',      lat: 53.9155, lng: 27.5720, cashback: '6%' },
  { id: 'p8',  name: 'PizzaHut',           cat: 'Кафе',        lat: 53.8985, lng: 27.5380, cashback: '10%' },
  { id: 'p9',  name: 'Евроопт',            cat: 'Продукты',    lat: 53.9245, lng: 27.5555, cashback: '2%' },
  { id: 'p10', name: 'BookCity',            cat: 'Книги',       lat: 53.8915, lng: 27.5290, cashback: '12%' },
  { id: 'p11', name: 'AutoSpa',            cat: 'Авто',        lat: 53.8830, lng: 27.5950, cashback: '5%' },
  { id: 'p12', name: 'CoffeeBreak',        cat: 'Кафе',        lat: 53.9060, lng: 27.5790, cashback: '15%' },
  { id: 'p13', name: 'Мир техники',         cat: 'Электроника', lat: 53.9130, lng: 27.5065, cashback: '4%' },
  { id: 'p14', name: 'Пекарня №1',          cat: 'Кафе',        lat: 53.8960, lng: 27.5670, cashback: '8%' },
  { id: 'p15', name: 'ФитнесHouse',        cat: 'Фитнес',      lat: 53.9070, lng: 27.6020, cashback: '6%' },
]

const CAT_COLORS = {
  'Кафе': '#f59e0b',
  'Ресторан': '#ef4444',
  'Красота': '#ec4899',
  'Фитнес': '#8b5cf6',
  'Шоппинг': '#3b82f6',
  'АЗС': '#6b7280',
  'Аптека': '#10b981',
  'Продукты': '#22c55e',
  'Книги': '#a78bfa',
  'Авто': '#64748b',
  'Электроника': '#0ea5e9',
}

function createFriendIcon(avatar) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:44px;height:44px;border-radius:50%;
      border:3px solid #4a80f5;
      background:url(${avatar}) center/cover no-repeat;
      box-shadow:0 2px 8px rgba(74,128,245,0.5);
    "></div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  })
}

function createPartnerIcon(color) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:14px;height:14px;border-radius:50%;
      background:${color};
      border:2.5px solid rgba(255,255,255,0.9);
      box-shadow:0 1px 6px ${color}88;
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  })
}

export default function MapScreen() {
  const mapContainer = useRef(null)
  const mapRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all') // 'all' | 'friends' | 'partners'
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    if (mapRef.current) return

    const map = L.map(mapContainer.current, {
      center: MINSK_CENTER,
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    })

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map)

    mapRef.current = map

    // Friends
    FRIENDS.forEach(f => {
      const marker = L.marker([f.lat, f.lng], { icon: createFriendIcon(f.avatar) }).addTo(map)
      marker.on('click', () => {
        setSelected({ type: 'friend', data: f })
        setPanelOpen(true)
      })
      marker._friendId = f.id
    })

    // Partners
    PARTNERS.forEach(p => {
      const color = CAT_COLORS[p.cat] || '#4a80f5'
      const marker = L.marker([p.lat, p.lng], { icon: createPartnerIcon(color) }).addTo(map)
      marker.on('click', () => {
        setSelected({ type: 'partner', data: p })
        setPanelOpen(true)
      })
      marker._partnerId = p.id
    })

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  // Filter markers
  useEffect(() => {
    if (!mapRef.current) return
    mapRef.current.eachLayer(layer => {
      if (!layer._friendId && !layer._partnerId) return
      if (filter === 'all') {
        layer.getElement()?.style && (layer.getElement().style.display = '')
      } else if (filter === 'friends') {
        layer.getElement()?.style && (layer.getElement().style.display = layer._friendId ? '' : 'none')
      } else {
        layer.getElement()?.style && (layer.getElement().style.display = layer._partnerId ? '' : 'none')
      }
    })
  }, [filter])

  const recenter = () => {
    mapRef.current?.flyTo(MINSK_CENTER, 13, { duration: 0.5 })
  }

  return (
    <div className={styles.screen}>
      {/* Filter chips */}
      <div className={styles.filterBar}>
        {[
          { id: 'all', label: 'Все' },
          { id: 'friends', label: 'Друзья' },
          { id: 'partners', label: 'Партнёры' },
        ].map(f => (
          <button
            key={f.id}
            className={`${styles.chip} ${filter === f.id ? styles.chipActive : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Recenter button */}
      <button className={styles.recenterBtn} onClick={recenter}>
        <Navigation size={20} color="#4a80f5" />
      </button>

      {/* Map */}
      <div ref={mapContainer} className={styles.mapContainer} />

      {/* Bottom panel */}
      <div className={`${styles.panel} ${panelOpen ? styles.panelOpen : ''}`}>
        <button className={styles.panelHandle} onClick={() => setPanelOpen(!panelOpen)}>
          {panelOpen ? <ChevronDown size={20} color="rgba(255,255,255,0.4)" /> : <ChevronUp size={20} color="rgba(255,255,255,0.4)" />}
        </button>

        {selected ? (
          selected.type === 'friend' ? (
            <div className={styles.panelContent}>
              <img src={selected.data.avatar} className={styles.panelAvatar} alt="" />
              <div className={styles.panelInfo}>
                <span className={styles.panelName}>{selected.data.name}</span>
                <span className={styles.panelSub}>{selected.data.lastSeen}</span>
              </div>
            </div>
          ) : (
            <div className={styles.panelContent}>
              <div className={styles.panelPartnerIcon} style={{ background: CAT_COLORS[selected.data.cat] || '#4a80f5' }}>
                <span>{selected.data.name.charAt(0)}</span>
              </div>
              <div className={styles.panelInfo}>
                <span className={styles.panelName}>{selected.data.name}</span>
                <span className={styles.panelSub}>{selected.data.cat}</span>
              </div>
              <div className={styles.panelCashback}>
                <span className={styles.cashbackValue}>{selected.data.cashback}</span>
                <span className={styles.cashbackLabel}>кэшбэк</span>
              </div>
            </div>
          )
        ) : (
          <div className={styles.panelHint}>
            <span>Друзей рядом: <b>{FRIENDS.length}</b></span>
            <span className={styles.panelDot}>·</span>
            <span>Партнёров: <b>{PARTNERS.length}</b></span>
          </div>
        )}

        {panelOpen && (
          <div className={styles.panelList}>
            <div className={styles.panelSection}>
              <span className={styles.panelSectionTitle}>Друзья рядом</span>
              {FRIENDS.map(f => (
                <button key={f.id} className={styles.listRow} onClick={() => {
                  setSelected({ type: 'friend', data: f })
                  mapRef.current?.flyTo([f.lat, f.lng], 15, { duration: 0.4 })
                }}>
                  <img src={f.avatar} className={styles.listAvatar} alt="" />
                  <div className={styles.listInfo}>
                    <span className={styles.listName}>{f.name}</span>
                    <span className={styles.listSub}>{f.lastSeen}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className={styles.panelSection}>
              <span className={styles.panelSectionTitle}>Партнёры с кэшбэком</span>
              {PARTNERS.slice(0, 6).map(p => (
                <button key={p.id} className={styles.listRow} onClick={() => {
                  setSelected({ type: 'partner', data: p })
                  mapRef.current?.flyTo([p.lat, p.lng], 15, { duration: 0.4 })
                }}>
                  <div className={styles.listPartnerDot} style={{ background: CAT_COLORS[p.cat] || '#4a80f5' }} />
                  <div className={styles.listInfo}>
                    <span className={styles.listName}>{p.name}</span>
                    <span className={styles.listSub}>{p.cat}</span>
                  </div>
                  <span className={styles.listCashback}>{p.cashback}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
