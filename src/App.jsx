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
import StoryScreen from './components/StoryScreen'
import styles from './App.module.css'

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
  if (screen === 'hex') return (
    <HexProfileScreen
      onBack={() => setScreen('profile')}
      onChallenges={() => setScreen('challenges')}
      onClan={() => setScreen('clan')}
      onBoosts={() => setScreen('hex')}
      onMysteryBox={() => setScreen('mysteryBox')}
      onPromo={() => setScreen('promo')}
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
  if (screen === 'promo') return <PromoScreen onBack={() => setScreen('hex')} />

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
      />
      <div className={styles.content}>
        <TransactionItem
          merchant='"PEREKRESTOK CENTROPOL'
          cardName="Кактус BYN"
          amount="-9.79"
          onClick={() => setShowTxDetail(true)}
        />
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
