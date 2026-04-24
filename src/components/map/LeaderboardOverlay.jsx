import React, { useMemo } from 'react';
import { X, Zap, Percent } from 'lucide-react';
import { ALL_USERS, STREAKS, CURRENT_USER, getStreakMembers } from '../../data/mapData';

export default function LeaderboardOverlay({ onClose, onSelectUser, selectedStreakId }) {
  const streak = useMemo(() => STREAKS.find(s => s.id === selectedStreakId), [selectedStreakId]);

  const list = useMemo(() => {
    if (!selectedStreakId) return [...ALL_USERS].sort((a, b) => b.influencePoints - a.influencePoints);
    return getStreakMembers(selectedStreakId).sort((a, b) => b.influencePoints - a.influencePoints);
  }, [selectedStreakId]);

  const totalInfluence = useMemo(() => list.reduce((acc, u) => acc + u.influencePoints, 0), [list]);
  const streakCashback = streak ? streak.totalCashback : 5;

  const handleUserClick = (u) => {
    onSelectUser(u);
    onClose();
  };

  const rankClass = (i) => {
    if (i === 0) return 'gold';
    if (i === 1) return 'silver';
    if (i === 2) return 'bronze';
    return '';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="lb-fullscreen" onClick={e => e.stopPropagation()}>
        <div className="lb-header">
          <button className="lb-close-btn" onClick={onClose}><X size={20} /></button>
          <h2>{streak ? `Топ стрика: ${streak.name}` : 'Топ по влиянию'}</h2>
          <div style={{ width: 40 }} />
        </div>

        {streak && (
          <div style={{ padding: '0 20px 10px', fontSize: '0.85rem', color: '#888', textAlign: 'center' }}>
            Общий кэшбэк стрика: <span style={{ color: 'var(--map-blue)', fontWeight: 700 }}>{streakCashback}%</span>
          </div>
        )}

        <div className="lb-scroll">
          {list.map((u, i) => {
            const isMe = u.id === CURRENT_USER.id;
            const myCashback = totalInfluence > 0 ? ((u.influencePoints / totalInfluence) * streakCashback).toFixed(1) : 0;

            return (
              <div
                key={u.id}
                className="lb-user-row"
                onClick={() => handleUserClick(u)}
              >
                <div className={`lb-rank ${rankClass(i)}`}>{i + 1}</div>
                <div className={`lb-av-wrap ${isMe ? 'me' : ''}`}>
                  <img src={u.avatar} alt={u.name} className="lb-av" />
                </div>
                <div className="lb-user-info">
                  <p className={`lb-user-name ${isMe ? 'me-name' : ''}`}>
                    {isMe ? 'Вы' : u.name}
                  </p>
                  <p className="lb-user-sub">
                    Влияние: {u.influencePoints.toLocaleString()} pts
                  </p>
                </div>
                <div className="lb-user-stat">
                  <div className="lb-spent" style={{ color: '#4bbe6a', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end', fontSize: '0.85rem', fontWeight: 600 }}>
                    {myCashback}% кэшбэк <Percent size={12} />
                  </div>
                  <div className="lb-inf" style={{ display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end', marginTop: '4px' }}>
                    <Zap size={12} /> {u.influencePoints.toLocaleString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
