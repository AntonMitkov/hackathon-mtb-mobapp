import React from 'react';
import { X, Crown, MapPin, TrendingUp } from 'lucide-react';
import {
  ALL_USERS, FRIENDS, CURRENT_USER,
  getFriendLeader, hasFriendVisits,
} from '../../data/mapData';

export default function PartnerModal({ partner, onClose, onOpenDetails, onSelectUser, context }) {
  let leader = null;
  let top5 = [];
  let emptyMessage = null;

  if (context === 'friends') {
    const hasVisits = hasFriendVisits(partner.id, FRIENDS, CURRENT_USER);
    if (!hasVisits) {
      emptyMessage = 'Никто из твоих друзей ещё тут не бывал. Будь первым!';
    } else {
      leader = getFriendLeader(partner.id, FRIENDS, CURRENT_USER);
      const friendsWithSpent = [CURRENT_USER, ...FRIENDS]
        .map(u => ({ ...u, sp: u.spentAtPartner?.[partner.id] || 0 }))
        .filter(u => u.sp > 0)
        .sort((a, b) => b.sp - a.sp)
        .slice(0, 5);
      top5 = friendsWithSpent.map((u, i) => ({
        user: u,
        spent: u.sp,
        influence: Math.max(90 - i * 15, 10),
        rank: i + 1,
      }));
    }
  } else {
    leader = ALL_USERS.find(u => u.id === partner.leaderId) || null;
    top5 = (partner.leaderboard || []).map((entry, i) => {
      const user = ALL_USERS.find(u => u.id === entry.userId);
      return user ? {
        user,
        spent: entry.spent,
        influence: entry.influence,
        rank: i + 1,
      } : null;
    }).filter(Boolean);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="partner-card" onClick={e => e.stopPropagation()}>
        <div className="partner-card-header">
          <button className="partner-card-close" onClick={onClose}><X size={18} /></button>
          <div className="partner-logo-wrap">
            <img src={partner.logo} alt={partner.name} />
          </div>
          <h2 className="partner-card-name">{partner.name}</h2>
          <div className="partner-card-meta">
            <span>{partner.category}</span>
            <span>·</span>
            <span><MapPin size={11} style={{ verticalAlign: -1, marginRight: 2 }} />{partner.address}</span>
          </div>
        </div>

        <div className="partner-card-body">
          <div className="leader-label">
            <Crown size={14} color="#d4a843" />
            <span>{context === 'friends' ? 'Топ среди друзей' : 'Лидеры точки'}</span>
          </div>

          {emptyMessage ? (
            <div className="empty-msg">{emptyMessage}</div>
          ) : (
            <>
              {top5.map((entry, i) => (
                <div
                  key={entry.user.id}
                  className={`leader-row ${i === 0 ? 'top' : ''}`}
                  onClick={() => { onSelectUser(entry.user); onClose(); }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="rank-num">{entry.rank}</div>
                  <div className="av">
                    <img src={entry.user.avatar} alt={entry.user.name} />
                    {i === 0 && <div className="crown-badge">👑</div>}
                  </div>
                  <div className="info">
                    <p className="nm">{entry.user.name}</p>
                    <div className="inf">
                      <TrendingUp size={12} color="#3b6eed" />
                      <span>Влияние: <strong>{entry.influence} pts</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          <button className="partner-action-btn" onClick={onOpenDetails}>Подробнее</button>
        </div>
      </div>
    </div>
  );
}
