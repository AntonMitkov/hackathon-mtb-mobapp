import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Send } from 'lucide-react';
import { FRIENDS, PARTNERS, CURRENT_USER, distanceKm, STREAKS, getStreakMembers } from '../../data/mapData';

export default function BottomDrawer({
  onSelectFriend,
  focusedFriend,
  onClearFocus,
  activeTab,
  selectedStreakId
}) {
  const [expanded, setExpanded] = useState(false);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: `Привет! Как дела? Вижу ты тоже рядом с ${PARTNERS[0]?.name || 'точкой'} 😊`, type: 'received' },
    { id: 2, text: 'Привет! Да, зашел перекусить. Тут сегодня много народу.', type: 'sent' },
    { id: 3, text: 'Круто! Может пересечемся позже?', type: 'received' },
  ]);

  const handleSend = () => {
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), text: msg, type: 'sent' }]);
    setMsg('');
  };

  const chatMode = activeTab === 'streaks' && selectedStreakId;

  const filteredFriends = useMemo(() => {
    if (selectedStreakId) {
      const members = getStreakMembers(selectedStreakId);
      return members.filter(m => m.id !== CURRENT_USER.id);
    }
    return FRIENDS;
  }, [selectedStreakId]);

  const sortedFriends = useMemo(() => {
    return [...filteredFriends]
      .map(f => ({
        ...f,
        dist: distanceKm(CURRENT_USER.lat, CURRENT_USER.lng, f.lat, f.lng),
      }))
      .sort((a, b) => a.dist - b.dist);
  }, [filteredFriends]);

  const nearbyCount = filteredFriends.length;
  const partnerCount = PARTNERS.length;

  const formatDist = (km) => {
    if (km < 1) return `${Math.round(km * 1000)} м`;
    return `${km.toFixed(1)} км`;
  };

  const selectedStreak = useMemo(() =>
    STREAKS.find(s => s.id === selectedStreakId),
    [selectedStreakId]
  );

  return (
    <div
      className="bottom-drawer"
      style={{ transform: expanded ? 'translateY(0)' : 'translateY(calc(100% - 64px))' }}
    >
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => { setExpanded(!expanded); }}
      >
        <div className="drawer-handle" />
        <div className="drawer-summary">
          <span>
            {chatMode ? (
              <>Чат стрика: <strong>{selectedStreak?.name}</strong></>
            ) : (
              <>Друзей рядом: <strong>{nearbyCount}</strong> · Партнёров: <strong>{partnerCount}</strong></>
            )}
          </span>
          {expanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </div>
      </div>

      {expanded && (
        <div className="drawer-list">
          {chatMode ? (
            <div className="chat-container">
              <div className="chat-messages">
                {messages.map(m => (
                  <div key={m.id} className={`message ${m.type}`}>
                    {m.text}
                  </div>
                ))}
              </div>
              <div className="chat-input-wrap">
                <input
                  type="text"
                  className="chat-input"
                  placeholder="Сообщение..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button className="chat-send-btn" onClick={handleSend}>
                  <Send size={18} />
                </button>
              </div>
            </div>
          ) : (
            <>
              {focusedFriend && (
                <button className="drawer-back-btn" onClick={onClearFocus}>
                  ← Показать всех
                </button>
              )}

              {sortedFriends.map(f => (
                <div
                  key={f.id}
                  className={`drawer-friend ${focusedFriend?.id === f.id ? 'focused' : ''}`}
                  onClick={() => onSelectFriend(f)}
                >
                  <img src={f.avatar} alt={f.name} className="av" />
                  <div className="info">
                    <div className="nm">{f.name}</div>
                    <div className="sub">{f.spent.toLocaleString()} BYN потрачено</div>
                  </div>
                  <div className="dist">{formatDist(f.dist)}</div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
