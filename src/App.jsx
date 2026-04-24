import { useState } from 'react'
import Header from './components/Header'
import TransactionItem from './components/TransactionItem'
import ExchangeBanner from './components/ExchangeBanner'
import ServiceBanner from './components/ServiceBanner'
import AccountCard from './components/AccountCard'
import BottomNav from './components/BottomNav'
import CardDetailScreen from './components/CardDetailScreen'
import TopUpScreen from './components/TopUpScreen'
import TransferBottomSheet from './components/TransferBottomSheet'
import PayBottomSheet from './components/PayBottomSheet'
import PointsScreen from './components/PointsScreen'
import FriendsScreen from './components/FriendsScreen'
import ProfileScreen from './components/ProfileScreen'
import ProductsScreen from './components/ProductsScreen'
import TransactionDetailScreen from './components/TransactionDetailScreen'
import SendMoneyScreen from './components/SendMoneyScreen'
import RequestMoneyScreen from './components/RequestMoneyScreen'
import SplitBillScreen from './components/SplitBillScreen'
import MoreScreen from './components/MoreScreen'
import MapScreen from './components/MapScreen'
import FeatureScreen from './components/FeatureScreen'
import HexProfileScreen from './components/HexProfileScreen'
import ChallengesScreen from './components/ChallengesScreen'
import ClanScreen from './components/ClanScreen'
import MysteryBoxScreen from './components/MysteryBoxScreen'
import HexNotificationsScreen from './components/HexNotificationsScreen'
import PromoScreen from './components/PromoScreen'
import StreaksBanner from './components/StreaksBanner'
import StreaksScreen from './components/StreaksScreen'
import CreateGroupScreen from './components/CreateGroupScreen'
import GroupChatScreen from './components/GroupChatScreen'
import GroupInfluenceScreen from './components/GroupInfluenceScreen'
import StoryScreen from './components/StoryScreen'
import CustomizationScreen from './components/CustomizationScreen'
import MonthlySummaryScreen from './components/MonthlySummaryScreen'
import { ACHIEVEMENTS } from './data/achievements'
import styles from './App.module.css'

const CUSTOMIZATIONS = {
  cardDesigns: [
    { id: 'default', label: 'Кактус (стандарт)', src: '/assets/card.png', achievementId: null },
    { id: 'card1', label: 'Геометрия', src: '/assets/cards/card1.png', achievementId: 1 },
    { id: 'card2', label: 'Стрик Огонь', src: '/assets/cards/card2.png', achievementId: 2 },
    { id: 'card3', label: 'Топ-50 Купюра', src: '/assets/cards/card3.png', achievementId: 4 },
  ],
  avatarBorders: [
    { id: 'default', label: 'Стандарт', style: { border: '3px solid rgba(74,128,245,0.4)' }, achievementId: null },
    { id: 'gold', label: 'Золотая', style: { border: '3px solid #f59e0b', boxShadow: '0 0 12px rgba(245,158,11,0.5)' }, achievementId: 1 },
    { id: 'fire', label: 'Огненная', style: { border: '3px solid #ef4444', boxShadow: '0 0 12px rgba(239,68,68,0.5)' }, achievementId: 2 },
    { id: 'elite', label: 'Элитная', style: { border: '3px solid #8b5cf6', boxShadow: '0 0 12px rgba(139,92,246,0.5)' }, achievementId: 4 },
    { id: 'mystery', label: 'Mystery', style: { border: '3px solid #ec4899', boxShadow: '0 0 12px rgba(236,72,153,0.5)' }, achievementId: 6 },
  ],
  profileEmojis: [
    { id: 'none', label: 'Без эмодзи', emoji: null, achievementId: null },
    { id: 'crown', label: 'Корона', emoji: '👑', achievementId: 1 },
    { id: 'fire', label: 'Огонь', emoji: '🔥', achievementId: 2 },
    { id: 'trophy', label: 'Кубок', emoji: '🏆', achievementId: 4 },
    { id: 'gift', label: 'Подарок', emoji: '🎁', achievementId: 6 },
  ],
}

const HOME_TX = {
  merchant: '"PEREKRESTOK CENTROPOL',
  cardName: 'Кактус BYN 5*4685',
  amount: '-9.79',
  date: '22 апреля 2026 20:53',
  type: 'Оплата товаров и услуг',
  mcc: '5399',
  status: 'В процессе',
}


export default function App() {
  const [screen, setScreen] = useState('home')
  const [activeTab, setActiveTab] = useState('home')
  const [showTxDetail, setShowTxDetail] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)
  const [showPay, setShowPay] = useState(false)
  const [featureId, setFeatureId] = useState(null)
  const [featureBack, setFeatureBack] = useState('home')
  const [preselectedFriend, setPreselectedFriend] = useState(null)
  const [storyTx, setStoryTx] = useState(null)
  const [homeTxPhoto, setHomeTxPhoto] = useState(null)
  const [promoBack, setPromoBack] = useState('home')
  const [activeGroupId, setActiveGroupId] = useState(null)

  const [selectedCardDesign, setSelectedCardDesign] = useState('default')
  const [selectedAvatarBorder, setSelectedAvatarBorder] = useState('default')
  const [selectedEmoji, setSelectedEmoji] = useState('none')

  const cardImageSrc = CUSTOMIZATIONS.cardDesigns.find(c => c.id === selectedCardDesign)?.src || '/assets/card.png'
  const avatarBorderStyle = CUSTOMIZATIONS.avatarBorders.find(b => b.id === selectedAvatarBorder)?.style || {}
  const profileEmoji = CUSTOMIZATIONS.profileEmojis.find(e => e.id === selectedEmoji)?.emoji || null

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === 'home') setScreen('home')
    if (tab === 'map') setScreen('map')
    if (tab === 'more') setScreen('more')
    if (tab === 'products') setScreen('products')
  }

  const openFeature = (id, backTo) => {
    setFeatureId(id)
    setFeatureBack(backTo || screen)
    setScreen('feature')
  }

  const handleTransferItemClick = (type) => {
    setShowTransfer(false)
    if (type === 'card') {
      setScreen('topup')
    } else {
      openFeature(type === 'phone' ? 'mobilePayment' : 'customPayment', 'home')
    }
  }

  const handlePayItemClick = (type) => {
    setShowPay(false)
    openFeature(type, 'home')
  }

  // Transaction detail with split/story
  if (showTxDetail) return (
    <TransactionDetailScreen
      tx={HOME_TX}
      onBack={() => setShowTxDetail(false)}
      onSplitBill={() => { setShowTxDetail(false); setScreen('splitBill') }}
      onStory={(tx) => { setShowTxDetail(false); setStoryTx(tx); setScreen('story') }}
      photo={homeTxPhoto}
      onPhotoChange={(_, url) => setHomeTxPhoto(url)}
    />
  )

  // Story screen
  if (screen === 'story') return (
    <StoryScreen
      tx={storyTx}
      onBack={() => setScreen('home')}
    />
  )

  // HEX Game screens
  if (screen === 'customization') return (
    <CustomizationScreen
      onBack={() => setScreen('hex')}
      achievements={ACHIEVEMENTS}
      customizations={CUSTOMIZATIONS}
      selectedCardDesign={selectedCardDesign}
      setSelectedCardDesign={setSelectedCardDesign}
      selectedAvatarBorder={selectedAvatarBorder}
      setSelectedAvatarBorder={setSelectedAvatarBorder}
      selectedEmoji={selectedEmoji}
      setSelectedEmoji={setSelectedEmoji}
    />
  )

  if (screen === 'hex') return (
    <HexProfileScreen
      onBack={() => setScreen('profile')}
      onChallenges={() => setScreen('challenges')}
      onClan={() => setScreen('clan')}
      onBoosts={() => setScreen('hex')}
      onMysteryBox={() => setScreen('mysteryBox')}
      onPromo={() => { setPromoBack('hex'); setScreen('promo') }}
      onCustomization={() => setScreen('customization')}
      avatarBorderStyle={avatarBorderStyle}
      profileEmoji={profileEmoji}
    />
  )

  if (screen === 'challenges') return (
    <ChallengesScreen
      onBack={() => setScreen('hex')}
      onMysteryBox={() => setScreen('mysteryBox')}
    />
  )

  if (screen === 'clan') return <ClanScreen onBack={() => setScreen('hex')} />
  if (screen === 'mysteryBox') return <MysteryBoxScreen onBack={() => setScreen('hex')} />
  if (screen === 'hexNotifications') return <HexNotificationsScreen onBack={() => setScreen('profile')} />
  if (screen === 'promo') return <PromoScreen onBack={() => setScreen(promoBack)} />
  if (screen === 'streaks') return <StreaksScreen onBack={() => setScreen('home')} onCreateGroup={() => setScreen('createGroup')} onGroupChat={(groupId) => { setActiveGroupId(groupId); setScreen('groupChat') }} />
  if (screen === 'createGroup') return <CreateGroupScreen onBack={() => setScreen('streaks')} onGroupCreated={() => { setActiveGroupId(1); setScreen('groupChat') }} />
  if (screen === 'groupChat') return <GroupChatScreen groupId={activeGroupId} onBack={() => setScreen('streaks')} onInfluence={() => setScreen('groupInfluence')} />
  if (screen === 'groupInfluence') return <GroupInfluenceScreen groupId={activeGroupId} onBack={() => setScreen('groupChat')} />
  if (screen === 'monthlySummary') return <MonthlySummaryScreen onBack={() => setScreen('home')} />

  if (screen === 'feature') return (
    <FeatureScreen
      featureId={featureId}
      onBack={() => setScreen(featureBack)}
    />
  )

  if (screen === 'card') return (
    <CardDetailScreen
      onBack={() => setScreen('home')}
      onFeature={(id) => openFeature(id, 'card')}
      cardImageSrc={cardImageSrc}
    />
  )
  if (screen === 'topup') return <TopUpScreen onBack={() => setScreen('home')} />
  if (screen === 'points') return <PointsScreen onBack={() => setScreen('home')} />
  if (screen === 'sendMoney') return (
    <SendMoneyScreen
      onBack={() => setScreen('friends')}
      preselectedFriend={preselectedFriend}
    />
  )
  if (screen === 'requestMoney') return <RequestMoneyScreen onBack={() => setScreen('friends')} />
  if (screen === 'splitBill') return <SplitBillScreen onBack={() => setScreen('home')} />
  if (screen === 'friends') return (
    <FriendsScreen
      onBack={() => setScreen('home')}
      onSendMoney={(friendId) => {
        setPreselectedFriend(friendId || null)
        setScreen('sendMoney')
      }}
      onRequestMoney={() => setScreen('requestMoney')}
      onSplitBill={() => setScreen('splitBill')}
    />
  )
  if (screen === 'profile') return (
    <ProfileScreen
      onBack={() => setScreen('home')}
      onFriends={() => setScreen('friends')}
      onFeature={(id) => openFeature(id, 'profile')}
      onHex={() => setScreen('hex')}
      onHexNotifications={() => setScreen('hexNotifications')}
      avatarBorderStyle={avatarBorderStyle}
      profileEmoji={profileEmoji}
    />
  )

  if (screen === 'map') return (
    <>
      <MapScreen />
      <BottomNav active={activeTab} onTabChange={handleTabChange} />
    </>
  )

  if (screen === 'more') return (
    <>
      <MoreScreen onNavigate={(id) => openFeature(id === 'security' ? 'securityInfo' : id, 'more')} />
      <BottomNav active={activeTab} onTabChange={handleTabChange} />
    </>
  )

  if (screen === 'products') return (
    <>
      <ProductsScreen onFeature={(id) => openFeature(id, 'products')} />
      <BottomNav active={activeTab} onTabChange={handleTabChange} />
    </>
  )

  return (
    <div className={styles.app}>
      <Header
        onCardClick={() => setScreen('card')}
        onTopUp={() => setScreen('topup')}
        onTransfer={() => setShowTransfer(true)}
        onPay={() => setShowPay(true)}
        onPoints={() => setScreen('points')}
        onFriends={() => setScreen('friends')}
        onProfile={() => setScreen('profile')}
        avatarBorderStyle={avatarBorderStyle}
        profileEmoji={profileEmoji}
      />
      <div className={styles.content}>
        <TransactionItem
          merchant='"PEREKRESTOK CENTROPOL'
          cardName="Кактус BYN"
          amount="-9.79"
          onClick={() => setShowTxDetail(true)}
        />
        <StreaksBanner onClick={() => setScreen('streaks')} />
        <div
          className={styles.monthlyBanner}
          onClick={() => setScreen('monthlySummary')}
        >
          <div className={styles.monthlyBannerIcon}>📊</div>
          <div className={styles.monthlyBannerText}>
            <span className={styles.monthlyBannerTitle}>Итоги апреля</span>
            <span className={styles.monthlyBannerSub}>Траты, кэшбэк и фото за месяц</span>
          </div>
          <span className={styles.monthlyBannerArrow}>→</span>
        </div>
        <ExchangeBanner onClick={() => openFeature('mobyExchange', 'home')} />
        <ServiceBanner onClick={() => {
          setActiveTab('products')
          setScreen('products')
        }} />
        <AccountCard
          label="Пакет Simple"
          balance="211.38 BYN"
        />
      </div>
      <BottomNav active={activeTab} onTabChange={handleTabChange} />
      {showTransfer && (
        <TransferBottomSheet
          onClose={() => setShowTransfer(false)}
          onItemClick={handleTransferItemClick}
        />
      )}
      {showPay && (
        <PayBottomSheet
          onClose={() => setShowPay(false)}
          onItemClick={handlePayItemClick}
        />
      )}
    </div>
  )
}
