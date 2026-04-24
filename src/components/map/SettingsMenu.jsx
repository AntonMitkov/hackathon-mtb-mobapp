import React, { useState } from 'react';
import { MapPin, Filter, Trophy, Check, Navigation } from 'lucide-react';
import { FILTER_GROUPS } from '../../data/mapData';

export default function SettingsMenu({
  geoEnabled, onToggleGeo,
  categoryFilters, onToggleCategory,
  onOpenLeaderboard,
  settingsOpen, onToggleSettings,
  onCenterMap,
  showOnlyMine, onToggleOnlyMine,
}) {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="settings-area">
      {settingsOpen && (
        <div className="settings-train">
          <button
            className="circle-btn train-item"
            onClick={onToggleGeo}
            title="Геолокация друзей"
          >
            <div className="icon-wrap" style={{ background: geoEnabled ? 'rgba(75,190,106,0.12)' : 'transparent' }}>
              <MapPin size={18} color={geoEnabled ? '#4bbe6a' : '#555'} />
            </div>
          </button>

          <button
            className="circle-btn train-item"
            onClick={() => setFilterOpen(!filterOpen)}
            title="Фильтр"
          >
            <div className="icon-wrap">
              <Filter size={18} />
            </div>
          </button>

          <button
            className="circle-btn train-item"
            onClick={onOpenLeaderboard}
            title="Рейтинг"
          >
            <div className="icon-wrap" style={{ background: 'rgba(212,168,67,0.1)' }}>
              <Trophy size={18} color="#d4a843" />
            </div>
          </button>
        </div>
      )}

      {settingsOpen && filterOpen && (
        <div className="filter-panel">
          <div className="filter-mode-toggle">
            <button
              className={`fmt-btn ${!showOnlyMine ? 'active' : ''}`}
              onClick={() => showOnlyMine && onToggleOnlyMine()}
            >Все точки</button>
            <button
              className={`fmt-btn ${showOnlyMine ? 'active' : ''}`}
              onClick={() => !showOnlyMine && onToggleOnlyMine()}
            >Мои точки</button>
          </div>
          <p className="filter-title">Категории</p>
          {FILTER_GROUPS.map((g) => {
            const isOn = g.categories.every(c => categoryFilters.includes(c));
            return (
              <div
                key={g.id}
                className="filter-chip"
                onClick={() => onToggleCategory(g.categories)}
              >
                <div className="filter-dot" style={{ background: g.color }} />
                <span>{g.label}</span>
                <div className={`filter-check ${isOn ? 'on' : ''}`}>
                  {isOn && <Check size={12} />}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button
        className={`circle-btn geo ${!geoEnabled ? 'disabled' : ''}`}
        onClick={() => geoEnabled && onCenterMap()}
        disabled={!geoEnabled}
        title="К моей локации"
      >
        <Navigation size={20} fill="currentColor" />
      </button>
    </div>
  );
}
