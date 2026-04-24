import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import {
  CURRENT_USER, FRIENDS, PARTNERS,
  CATEGORY_COLORS, getFriendLeader, getStreakMembers
} from '../../data/mapData';

export function MapController({ center, zoom }) {
  const map = useMap();
  React.useEffect(() => {
    if (center && zoom) map.flyTo(center, zoom, { duration: 0.6 });
  }, [center, zoom]);
  return null;
}

const myIcon = () => L.divIcon({
  className: '',
  html: '<div class="my-location-pulse"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const friendIcon = (url, size = 48, focused = false) => L.divIcon({
  className: '',
  html: `<img src="${url}" class="friend-marker ${focused ? 'focused' : ''}"
           style="width:${size}px;height:${size}px;" />`,
  iconSize: [size, size],
  iconAnchor: [size / 2, size / 2],
});

const partnerDot = (category, grow = false) => {
  const color = CATEGORY_COLORS[category] || '#888';
  const sz = grow ? 16 : 10;
  const bw = grow ? 4 : 3;
  return L.divIcon({
    className: '',
    html: `<div class="partner-dot ${grow ? 'grow' : ''}"
              style="width:${sz}px;height:${sz}px;border-width:${bw}px;border-color:${color};"></div>`,
    iconSize: [sz, sz],
    iconAnchor: [sz / 2, sz / 2],
  });
};

export default function MapView({
  activeTab,
  categoryFilters,
  focusedFriend,
  selectedStreakId,
  onSelectPartner,
  onSelectFriend,
  mapCenter,
  mapZoom,
  geoEnabled,
  showOnlyMine,
}) {
  const center = [CURRENT_USER.lat, CURRENT_USER.lng];

  const friendLedIds = useMemo(() => {
    const set = new Set();
    PARTNERS.forEach(p => {
      const leader = getFriendLeader(p.id, FRIENDS, CURRENT_USER);
      if (leader) set.add(p.id);
    });
    return set;
  }, []);

  const filteredPartners = useMemo(
    () => PARTNERS.filter(p => categoryFilters.includes(p.category)),
    [categoryFilters],
  );

  const showFriends = activeTab === 'all' || activeTab === 'friends';

  const visiblePartners = useMemo(() => {
    let list = filteredPartners;

    if (showOnlyMine) {
      list = list.filter(p => p.leaderId === CURRENT_USER.id);
    }

    if (focusedFriend) {
      return list.filter(p => {
        const leader = getFriendLeader(p.id, FRIENDS, CURRENT_USER);
        return leader && leader.id === focusedFriend.id;
      });
    }
    return list;
  }, [focusedFriend, filteredPartners, showOnlyMine]);

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
      attributionControl={false}
      zoomDelta={0.5}
      zoomSnap={0.5}
      wheelPxPerZoomLevel={120}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        updateWhenZooming={false}
        updateWhenIdle={true}
      />
      <MapController center={mapCenter} zoom={mapZoom} />

      {geoEnabled && (
        <Marker position={center} icon={myIcon()} zIndexOffset={900} />
      )}

      {showFriends && FRIENDS.filter(f => {
        if (!selectedStreakId) return true;
        const streakMembers = getStreakMembers(selectedStreakId);
        return streakMembers.some(m => m.id === f.id);
      }).map(f => {
        const isFocused = focusedFriend?.id === f.id;
        const sz = isFocused ? 64 : 48;
        return (
          <Marker
            key={f.id}
            position={[f.lat, f.lng]}
            icon={friendIcon(f.avatar, sz, isFocused)}
            zIndexOffset={isFocused ? 1100 : 800}
            eventHandlers={{ click: () => onSelectFriend(f) }}
          />
        );
      })}

      {visiblePartners.map(p => {
        const grow = activeTab === 'friends' && friendLedIds.has(p.id);
        return (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            icon={partnerDot(p.category, grow)}
            zIndexOffset={100}
            eventHandlers={{ click: () => onSelectPartner(p) }}
          />
        );
      })}
    </MapContainer>
  );
}
