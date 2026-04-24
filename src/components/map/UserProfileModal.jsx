import React from 'react';
import { X, Trophy } from 'lucide-react';

export default function UserProfileModal({ user, onClose }) {
  const influence = user.influencePoints || 0;
  const level = user.level || 1;
  const nextLevelPts = 5000;
  const district = user.district || 'Район Новатор';
  const rank = user.rank || 48;
  const totalRanked = user.totalRanked || 1240;
  const streak = user.streak || 0;
  const pointsCaptured = user.pointsCaptured || 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="profile-card premium" onClick={e => e.stopPropagation()}>
        <button className="profile-close-btn top-right" onClick={onClose}><X size={22} /></button>

        <div className="profile-header-new">
          <div className="profile-avatar-wrap">
            <img src={user.avatar} alt={user.name} className="profile-avatar-main" />
            <div className="profile-level-badge">{level}</div>
          </div>
          <div className="profile-title-area">
            <h2 className="profile-name-new">{user.id === 'u1' ? 'Антон' : user.name}</h2>
            <p className="profile-district">{district}</p>
            <p className="profile-rank-status"><Trophy size={14} /> #{rank} из {totalRanked}</p>
          </div>
        </div>

        <div className="influence-section-new">
          <div className="influence-labels">
            <span className="influence-title">INFLUENCE POINTS</span>
            <span className="influence-numbers">{influence.toLocaleString()} / {nextLevelPts.toLocaleString()}</span>
          </div>
          <div className="influence-bar-new">
            <div className="influence-fill-new" style={{ width: `${(influence / nextLevelPts) * 100}%` }} />
          </div>
          <p className="influence-subtext">Lvl {level + 1} — ещё {(nextLevelPts - influence).toLocaleString()} pts</p>
        </div>

        <div className="profile-stats-new">
          <div className="stat-item-new">
            <span className="stat-val-new">{pointsCaptured}</span>
            <span className="stat-label-new">Точки</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item-new">
            <span className="stat-val-new">{streak}</span>
            <span className="stat-label-new">Стрик</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item-new">
            <span className="stat-val-new">#{rank}</span>
            <span className="stat-label-new">Ранг</span>
          </div>
        </div>
      </div>
    </div>
  );
}
