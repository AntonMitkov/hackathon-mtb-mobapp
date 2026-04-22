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
import styles from './App.module.css'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [showTransfer, setShowTransfer] = useState(false)
  const [showPay, setShowPay] = useState(false)

  if (screen === 'card') return <CardDetailScreen onBack={() => setScreen('home')} />
  if (screen === 'topup') return <TopUpScreen onBack={() => setScreen('home')} />
  if (screen === 'points') return <PointsScreen onBack={() => setScreen('home')} />
  if (screen === 'friends') return <FriendsScreen onBack={() => setScreen('home')} />
  if (screen === 'profile') return <ProfileScreen onBack={() => setScreen('home')} onFriends={() => setScreen('friends')} />

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
        />
        <ExchangeBanner />
        <ServiceBanner />
        <AccountCard
          label="Пакет Simple"
          balance="211.38 BYN"
        />
      </div>
      <BottomNav />
      {showTransfer && <TransferBottomSheet onClose={() => setShowTransfer(false)} />}
      {showPay && <PayBottomSheet onClose={() => setShowPay(false)} />}
    </div>
  )
}
