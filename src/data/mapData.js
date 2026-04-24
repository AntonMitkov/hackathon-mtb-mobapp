// ============================================================
// MAP DATA — Bank Social Map (Minsk, BYN)
// ============================================================

// ---------- Category colors (border color for partner dots) ----------
export const CATEGORY_COLORS = {
  'Рестораны': '#e8863a',
  'Фастфуд': '#e8863a',
  'Ювелирная сеть': '#4a8ede',
  'Супермаркет': '#4bbe6a',
  'Здоровье': '#a36bdb',
  'Техника': '#a36bdb',
};

export const FILTER_GROUPS = [
  { id: 'food', label: 'Питание', categories: ['Рестораны', 'Фастфуд'], color: '#e8863a' },
  { id: 'jewelry', label: 'Украшения', categories: ['Ювелирная сеть'], color: '#4a8ede' },
  { id: 'grocery', label: 'Продукты', categories: ['Супермаркет'], color: '#4bbe6a' },
  { id: 'health', label: 'Здоровье', categories: ['Здоровье', 'Техника'], color: '#a36bdb' },
];

// ---------- Current user ----------
export const CURRENT_USER = {
  id: 'u1',
  name: 'Я',
  spent: 12500,
  lat: 53.9275,
  lng: 27.6847,
  avatar: '/assets/map/anton.jpg',
  influencePoints: 4250,
  level: 12,
  rank: 1,
  totalRanked: 1,
  district: 'Район Новатор',
  streak: 7,
  pointsCaptured: 0,
  spentAtPartner: {},
};

// ---------- Friends ----------
export const FRIENDS = [
  {
    id: 'f1', name: 'Егор Косенко',
    lat: 53.9282, lng: 27.6855,
    avatar: '/assets/map/f1.jpg',
    spent: 9300,
    influencePoints: 3850,
    level: 10,
    district: 'Центральный район',
  },
  {
    id: 'f2', name: 'Глеб Глебов',
    lat: 53.9268, lng: 27.6838,
    avatar: '/assets/map/f2.jpg',
    spent: 5850,
    influencePoints: 1850,
    level: 5,
    district: 'Фрунзенский район',
  },
  {
    id: 'f3', name: 'Злата Рыбакова',
    lat: 53.9275, lng: 27.6862,
    avatar: '/assets/map/f3.jpg',
    spent: 6200,
    influencePoints: 2100,
    level: 6,
    district: 'Московский район',
  },
  {
    id: 'f4', name: 'Иван Трубчик',
    lat: 53.8950, lng: 27.5350,
    avatar: '/assets/map/f4.jpg',
    spent: 4100,
    influencePoints: 1200,
    level: 3,
    district: 'Октябрьский район',
  },
  {
    id: 'f5', name: 'Павел Мишанин',
    lat: 53.9280, lng: 27.5870,
    avatar: '/assets/map/f5.jpg',
    spent: 7600,
    influencePoints: 3200,
    level: 9,
    district: 'Заводской район',
  },
];

// ---------- Streaks (Group Mode) ----------
export const STREAKS = [
  {
    id: 's1',
    name: 'Работа',
    memberIds: ['u1', 'f1', 'f2', 'f3'],
    days: 12,
    maintained: true,
    totalCashback: 5,
  },
  {
    id: 's2',
    name: 'Семья',
    memberIds: ['u1', 'f4', 'f5'],
    days: 3,
    maintained: false,
    totalCashback: 5,
  }
];

// ---------- Global users (for fallback) ----------
export const GLOBAL_USERS = [
  { id: 'g2', name: 'Мария Семенова', spent: 11800, avatar: 'https://i.pravatar.cc/150?u=g2', influencePoints: 5100, level: 14, rank: 5, district: 'Топ', streak: 10, pointsCaptured: 6 },
];

// Helper to get streak members
export function getStreakMembers(streakId) {
  const streak = STREAKS.find(s => s.id === streakId);
  if (!streak) return [];
  const all = [CURRENT_USER, ...FRIENDS];
  return streak.memberIds.map(id => all.find(u => u.id === id));
}

// ALL_USERS for search etc
export const ALL_USERS = [CURRENT_USER, ...FRIENDS];

// ---------- Partners ----------
const RAW_PARTNERS = [
  { id: 'p_tempo_1', name: 'Pizza Tempo', category: 'Рестораны', lat: 53.9231, lng: 27.6015, address: 'пр. Независимости 78', logo: '/assets/map/pizza.jpeg' },
  { id: 'p_tempo_2', name: 'Pizza Tempo', category: 'Рестораны', lat: 53.9255, lng: 27.5925, address: 'ул. Якуба Коласа 37', logo: '/assets/map/pizza.jpeg' },
  { id: 'p_tempo_3', name: 'Pizza Tempo', category: 'Рестораны', lat: 53.8995, lng: 27.5555, address: 'пр. Независимости 18', logo: '/assets/map/pizza.jpeg' },
  { id: 'p_tempo_4', name: 'Pizza Tempo', category: 'Рестораны', lat: 53.9085, lng: 27.5485, address: 'пр-т. Победителей 9', logo: '/assets/map/pizza.jpeg' },
  { id: 'p_tempo_5', name: 'Pizza Tempo', category: 'Рестораны', lat: 53.8985, lng: 27.5585, address: 'ул. Карла Маркса 26', logo: '/assets/map/pizza.jpeg' },
  { id: 'p_tempo_6', name: 'Pizza Tempo', category: 'Рестораны', lat: 53.8915, lng: 27.5515, address: 'ул. Бобруйская 6', logo: '/assets/map/pizza.jpeg' },
  { id: 'p_invitro_1', name: 'INVITRO', category: 'Здоровье', lat: 53.9470, lng: 27.6970, address: 'пр. Независимости 181', logo: '/assets/map/invitro.jpeg' },
  { id: 'p_invitro_2', name: 'INVITRO', category: 'Здоровье', lat: 53.8860, lng: 27.4350, address: 'ул. Сухаревская 46', logo: '/assets/map/invitro.jpeg' },
  { id: 'p_invitro_3', name: 'INVITRO', category: 'Здоровье', lat: 53.8760, lng: 27.5950, address: 'проспект Рокоссовского 5/1', logo: '/assets/map/invitro.jpeg' },
  { id: 'p_invitro_4', name: 'INVITRO', category: 'Здоровье', lat: 53.9390, lng: 27.4770, address: 'пр-т. Победителей 127', logo: '/assets/map/invitro.jpeg' },
  { id: 'p_7karat_1', name: '7 Карат', category: 'Ювелирная сеть', lat: 53.9085, lng: 27.5485, address: 'ТРЦ Galleria, пр-т. Победителей 9', logo: '/assets/map/7.jpeg' },
  { id: 'p_7karat_2', name: '7 Карат', category: 'Ювелирная сеть', lat: 53.8590, lng: 27.6740, address: 'ТЦ Момо, Партизанский просп. 150А', logo: '/assets/map/7.jpeg' },
  { id: 'p_7karat_3', name: '7 Карат', category: 'Ювелирная сеть', lat: 53.9330, lng: 27.6520, address: 'ТЦ Dana mall, ул. Петра Мстиславца 11', logo: '/assets/map/7.jpeg' },
  { id: 'p_green_1', name: 'Green', category: 'Супермаркет', lat: 53.8698, lng: 27.5342, address: 'Братская улица, 18', logo: '/assets/map/green.jpeg' },
  { id: 'p_green_2', name: 'Green', category: 'Супермаркет', lat: 53.8902, lng: 27.5401, address: 'Улица Толстого, 1', logo: '/assets/map/green.jpeg' },
  { id: 'p_green_3', name: 'Green', category: 'Супермаркет', lat: 53.8821, lng: 27.5668, address: 'Улица Маяковского, 6', logo: '/assets/map/green.jpeg' },
  { id: 'p_green_4', name: 'Green', category: 'Супермаркет', lat: 53.9330, lng: 27.6520, address: 'Петра Мстиславца, 11', logo: '/assets/map/green.jpeg' },
];

function assignLeaders(partners) {
  return partners.map((p, i) => {
    let leader;
    const pool = ALL_USERS.filter(u => u.id !== 'u1');
    if (i < 3) {
      leader = CURRENT_USER;
    } else {
      leader = pool[i % pool.length];
    }

    const top5 = [];
    if (leader.id === 'u1') {
      top5.push({ userId: 'u1', spent: 5000 + (i * 100), influence: 4250 + (i * 50) });
      for (let j = 1; j < 5; j++) {
        const user = pool[(i + j) % pool.length];
        top5.push({ userId: user.id, spent: 4000 - j * 500, influence: 3000 - j * 200 });
      }
    } else {
      for (let j = 0; j < 5; j++) {
        const user = pool[(i + j) % pool.length];
        top5.push({ userId: user.id, spent: Math.floor(5000 - j * 600 + (i * 137) % 500), influence: Math.floor(4000 - j * 400) });
      }
    }
    return { ...p, leaderId: leader.id, leaderboard: top5 };
  });
}
export const PARTNERS = assignLeaders(RAW_PARTNERS);

export function getFriendLeader(partnerId, friends, currentUser) {
  const allInvolved = [currentUser, ...friends];
  let leader = null;
  let maxSpent = 0;
  allInvolved.forEach(u => {
    const spent = u.spentAtPartner?.[partnerId] || 0;
    if (spent > maxSpent) { maxSpent = spent; leader = u; }
  });
  return leader;
}

export function hasFriendVisits(partnerId, friends, currentUser) {
  return [currentUser, ...friends].some(f => (f.spentAtPartner?.[partnerId] || 0) > 0);
}

export function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
