import { useState } from 'react'
import MapView from './map/MapView'
import SettingsMenu from './map/SettingsMenu'
import BottomDrawer from './map/BottomDrawer'
import LeaderboardOverlay from './map/LeaderboardOverlay'
import PartnerModal from './map/PartnerModal'
import UserProfileModal from './map/UserProfileModal'
import { FILTER_GROUPS, CURRENT_USER, FRIENDS, STREAKS, getStreakMembers } from '../data/mapData'
import { Flame, Settings as SettingsIcon, ChevronDown, X } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import '../styles/map.css'

export default function MapScreen() {
  const [activeTab, setActiveTab] = useState('all')
  const [streaksOpen, setStreaksOpen] = useState(false)
  const [selectedStreakId, setSelectedStreakId] = useState(null)

  const [settingsOpen, setSettingsOpen] = useState(false)
  const [geoEnabled, setGeoEnabled] = useState(true)
  const [showOnlyMine, setShowOnlyMine] = useState(false)
  const [categoryFilters, setCategoryFilters] = useState(
    FILTER_GROUPS.reduce((acc, g) => [...acc, ...g.categories], []),
  )

  const [leaderboardOpen, setLeaderboardOpen] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState(null)
  const [detailedPartner, setDetailedPartner] = useState(null)
  const [selectedFriend, setSelectedFriend] = useState(null)

  const [mapCenter, setMapCenter] = useState([CURRENT_USER.lat, CURRENT_USER.lng])
  const [mapZoom, setMapZoom] = useState(13)

  const [focusedFriend, setFocusedFriend] = useState(null)

  const toggleCategory = (categories) => {
    setCategoryFilters(prev => {
      const allOn = categories.every(c => prev.includes(c))
      return allOn
        ? prev.filter(c => !categories.includes(c))
        : [...new Set([...prev, ...categories])]
    })
  }

  const handleCenterGeo = () => {
    setMapCenter([CURRENT_USER.lat, CURRENT_USER.lng])
    setMapZoom(13)
  }

  const handleSelectFriend = (friend) => {
    setFocusedFriend(friend)
    setMapCenter([friend.lat - 0.005, friend.lng])
    setMapZoom(15)
  }

  const handleClearFocus = () => {
    setFocusedFriend(null)
    setMapZoom(13)
  }

  const descriptions = {
    'Рестораны': 'Изысканная кухня и уютная атмосфера. Идеальное место для деловых встреч и семейных ужинов. Накапливайте влияние и получайте эксклюзивные скидки.',
    'Фастфуд': 'Быстро, вкусно и удобно. Заходите за любимыми блюдами и повышайте свой рейтинг в категории быстрых перекусов.',
    'Ювелирная сеть': 'Мир блеска и красоты. Каждая покупка здесь значительно увеличивает ваше влияние и приближает к статусу VIP-клиента.',
    'Супермаркет': 'Все необходимое для дома в одном месте. Регулярные покупки помогут вам удерживать лидерство в районе.',
    'Здоровье': 'Забота о вашем здоровье с современными технологиями. Качественные услуги и бонусы для постоянных клиентов.',
    'Техника': 'Самые современные гаджеты и бытовая электроника. Будьте в центре технологического прогресса и копите баллы.',
  }

  return (
    <div className="map-screen-root">
      {/* Top Toolbar */}
      <div className="tab-bar" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => { setActiveTab('all'); setFocusedFriend(null); setStreaksOpen(false); setSelectedStreakId(null) }}
          >Все</button>

          <button
            className={`tab-btn ${activeTab === 'partners' ? 'active' : ''}`}
            onClick={() => { setActiveTab('partners'); setFocusedFriend(null); setStreaksOpen(false); setSelectedStreakId(null) }}
          >Партнёры</button>

          <button
            className={`tab-btn ${activeTab === 'streaks' ? 'active' : ''}`}
            onClick={() => { setActiveTab('streaks'); setStreaksOpen(!streaksOpen); setSettingsOpen(false) }}
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            Стрики <ChevronDown size={14} style={{ transform: streaksOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
        </div>

        <button
          className={`tab-btn ${settingsOpen ? 'active' : ''}`}
          onClick={() => { setSettingsOpen(!settingsOpen); setStreaksOpen(false) }}
          style={{ padding: '8px 12px' }}
        >
          <SettingsIcon size={18} />
        </button>

        {streaksOpen && (
          <div className="streaks-dropdown">
            {STREAKS.map((s, i) => (
              <div
                key={s.id}
                className={`streak-item ${selectedStreakId === s.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedStreakId(s.id)
                  setStreaksOpen(false)
                  const members = getStreakMembers(s.id)
                  if (members.length > 1) {
                    setMapCenter([members[1].lat, members[1].lng])
                  }
                  setMapZoom(14)
                }}
              >
                <div className="streak-info-col" style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="streak-name">{i + 1}. streak ({s.name})</span>
                  <span className="streak-cashback-badge" style={{ color: '#4bbe6a', fontSize: '0.7rem', fontWeight: 700, marginTop: '2px' }}>
                    Общий кэшбэк: {s.totalCashback}%
                  </span>
                </div>
                <div className="fire-icon-wrap">
                  <Flame
                    size={20}
                    className={`fire-icon ${s.maintained ? 'active' : 'inactive'}`}
                    fill={s.maintained ? 'currentColor' : 'none'}
                  />
                  <span className="streak-count">{s.days}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Settings Overlay */}
      {settingsOpen && (
        <SettingsMenu
          geoEnabled={geoEnabled}
          onToggleGeo={() => setGeoEnabled(!geoEnabled)}
          categoryFilters={categoryFilters}
          onToggleCategory={toggleCategory}
          onOpenLeaderboard={() => { setLeaderboardOpen(true); setSettingsOpen(false) }}
          settingsOpen={settingsOpen}
          onToggleSettings={() => setSettingsOpen(false)}
          onCenterMap={handleCenterGeo}
          showOnlyMine={showOnlyMine}
          onToggleOnlyMine={() => setShowOnlyMine(!showOnlyMine)}
        />
      )}

      {/* Map */}
      <MapView
        activeTab={activeTab === 'streaks' ? 'friends' : activeTab}
        categoryFilters={categoryFilters}
        focusedFriend={focusedFriend}
        selectedStreakId={selectedStreakId}
        onSelectPartner={setSelectedPartner}
        onSelectFriend={setSelectedFriend}
        mapCenter={mapCenter}
        mapZoom={mapZoom}
        geoEnabled={geoEnabled}
        showOnlyMine={showOnlyMine}
      />

      {/* Bottom Drawer */}
      {activeTab !== 'partners' && !leaderboardOpen && (
        <BottomDrawer
          focusedFriend={focusedFriend}
          onSelectFriend={handleSelectFriend}
          onClearFocus={handleClearFocus}
          activeTab={activeTab}
          selectedStreakId={selectedStreakId}
        />
      )}

      {/* Overlays */}
      {leaderboardOpen && (
        <LeaderboardOverlay
          selectedStreakId={selectedStreakId}
          onClose={() => setLeaderboardOpen(false)}
          onSelectUser={(u) => {
            setMapCenter([u.lat, u.lng])
            setMapZoom(16)
            if (FRIENDS.find(f => f.id === u.id)) setSelectedFriend(u)
          }}
        />
      )}

      {selectedPartner && (
        <PartnerModal
          partner={selectedPartner}
          onClose={() => setSelectedPartner(null)}
          onOpenDetails={() => {
            setDetailedPartner(selectedPartner)
            setSelectedPartner(null)
          }}
          onSelectUser={setSelectedFriend}
          context={activeTab}
        />
      )}

      {detailedPartner && (
        <div className={`point-details-view active`}>
          <div className="pd-header">
            <button className="pd-back" onClick={() => setDetailedPartner(null)}><X size={24} /></button>
            <h2>Детали точки</h2>
          </div>
          <div className="pd-content">
            <div className="pd-hero">
              <img src={detailedPartner.logo} alt={detailedPartner.name} className="pd-logo" />
              <div className="pd-main-info">
                <h3 className="pd-partner-name">{detailedPartner.name}</h3>
                <p className="pd-category">{detailedPartner.category}</p>
                <p className="pd-address">{detailedPartner.address}</p>
              </div>
            </div>

            <div className="pd-section">
              <h3>Об организации</h3>
              <p>
                {descriptions[detailedPartner.category] || 'Премиальное заведение нашего города. Мы ценим каждого клиента и предлагаем лучшие условия в рамках программы лояльности.'}
              </p>
            </div>

            <div className="pd-section">
              <h3>Статистика точки</h3>
              <div className="pd-stats-row">
                <div className="pd-stat-box">
                  <span className="pd-stat-val">{Math.floor(Math.random() * 500 + 100)}</span>
                  <span className="pd-stat-lbl">Визитов</span>
                </div>
                <div className="pd-stat-box">
                  <span className="pd-stat-val">{Math.floor(Math.random() * 10000 + 5000)}</span>
                  <span className="pd-stat-lbl">Оборот</span>
                </div>
              </div>
            </div>

            <div className="pd-section">
              <h3>Ваши преимущества</h3>
              <ul className="pd-list">
                <li>Повышенный кэшбэк 5% для всех</li>
                <li>+100 Influence points за чек от 50 BYN</li>
                <li>Скидка 15% для текущего лидера точки</li>
              </ul>
            </div>

            <button className="pd-action-btn" onClick={() => alert('Маршрут построен!')}>
              Построить маршрут
            </button>
          </div>
        </div>
      )}

      {selectedFriend && (
        <UserProfileModal
          user={selectedFriend}
          onClose={() => setSelectedFriend(null)}
        />
      )}
    </div>
  )
}
