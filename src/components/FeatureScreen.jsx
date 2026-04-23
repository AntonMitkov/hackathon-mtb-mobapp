import styles from './FeatureScreen.module.css'
import { ChevronLeft } from 'lucide-react'

const FEATURE_DATA = {
  personalData: {
    title: 'Персональные данные',
    rows: [
      { label: 'ФИО', value: 'Митьков Антон Сергеевич' },
      { label: 'Дата рождения', value: '01.01.1990' },
      { label: 'Паспорт', value: 'МС 1234567' },
      { label: 'Телефон', value: '+375 29 000-00-00' },
      { label: 'Email', value: 'anton@mail.by' },
      { label: 'Адрес регистрации', value: 'г. Минск, ул. Центральная, 1' },
    ],
  },
  documents: {
    title: 'Документы',
    rows: [
      { label: 'Договор обслуживания', value: '№ 12345 от 15.01.2024' },
      { label: 'Договор карты Кактус', value: '№ 67890 от 15.01.2024' },
      { label: 'Тарифы и условия', value: 'Актуальная версия' },
      { label: 'Выписки', value: 'Доступны за последние 12 мес.' },
    ],
  },
  notifications: {
    title: 'Уведомления',
    notifications: [
      { id: 1, text: 'Кэшбэк 2.21 BYN начислен за покупки в апреле', time: '22 апреля, 21:00', unread: true },
      { id: 2, text: 'Операция на сумму 9.79 BYN в PEREKRESTOK', time: '22 апреля, 20:53', unread: false },
      { id: 3, text: 'Пополнение карты на 500.00 BYN', time: '17 апреля, 10:00', unread: false },
      { id: 4, text: 'Подключён пакет услуг Simple', time: '15 января, 12:30', unread: false },
    ],
  },
  exchangeRates: {
    title: 'Курсы валют',
    rates: [
      { currency: 'USD', buy: '3.2100', sell: '3.2500', flag: '🇺🇸' },
      { currency: 'EUR', buy: '3.4800', sell: '3.5300', flag: '🇪🇺' },
      { currency: 'RUB (100)', buy: '3.4500', sell: '3.5200', flag: '🇷🇺' },
      { currency: 'PLN', buy: '0.8100', sell: '0.8450', flag: '🇵🇱' },
      { currency: 'GBP', buy: '4.0200', sell: '4.0900', flag: '🇬🇧' },
      { currency: 'CNY', buy: '0.4400', sell: '0.4550', flag: '🇨🇳' },
    ],
  },
  loyalty: {
    title: 'Манички',
    rows: [
      { label: 'Статус', value: 'Стандарт' },
      { label: 'Баллы', value: '2.21' },
      { label: 'Кэшбэк за апрель', value: '2.21 BYN' },
      { label: 'Всего за 2026', value: '47.50 BYN' },
      { label: 'Партнёры', value: '150+ магазинов и сервисов' },
    ],
  },
  mobyExchange: {
    title: 'Обменник Moby',
    rows: [
      { label: 'USD → BYN', value: '3.2300' },
      { label: 'EUR → BYN', value: '3.5050' },
      { label: 'BYN → USD', value: '3.2100' },
      { label: 'BYN → EUR', value: '3.4800' },
      { label: 'Статус', value: 'Доступен' },
      { label: 'Лимит', value: '10 000 BYN / день' },
    ],
  },
  bankOnMap: {
    title: 'Банк на карте',
    rows: [
      { label: 'Ближайшее отделение', value: 'ул. Я. Коласа, 12' },
      { label: 'Режим работы', value: 'Пн-Пт 9:00-18:00' },
      { label: 'Ближайший банкомат', value: 'ТЦ «Галерея», 1 этаж' },
      { label: 'Банкоматов в городе', value: '48' },
      { label: 'Отделений в городе', value: '12' },
    ],
  },
  aboutBank: {
    title: 'О Банке',
    rows: [
      { label: 'Полное название', value: 'ЗАО «МТБанк»' },
      { label: 'Лицензия', value: '№ 5 от 14.12.2016' },
      { label: 'БИК', value: 'MTBKBY22' },
      { label: 'УНП', value: '100394906' },
      { label: 'Телефон', value: '8-017-229-99-99' },
      { label: 'Сайт', value: 'mtbank.by' },
    ],
  },
  securityInfo: {
    title: 'Ваша безопасность',
    rows: [
      { label: 'Биометрия', value: 'Включена' },
      { label: 'Последний вход', value: '22 апреля, 18:02' },
      { label: 'Активные сессии', value: '1 устройство' },
      { label: 'Двухфакторная аутентификация', value: 'Включена' },
      { label: 'Блокировка при утере', value: 'Активна' },
    ],
  },
  cardOptions: {
    title: 'Настройка опций',
    rows: [
      { label: 'Бесконтактная оплата', value: 'Включена' },
      { label: 'Оплата в интернете', value: 'Включена' },
      { label: 'Оплата за рубежом', value: 'Включена' },
      { label: 'Снятие наличных', value: 'Включено' },
      { label: '3D-Secure', value: 'Активен' },
    ],
  },
  cardLimits: {
    title: 'Лимиты',
    rows: [
      { label: 'Оплата в день', value: '5 000 BYN' },
      { label: 'Снятие в день', value: '2 000 BYN' },
      { label: 'Переводы в день', value: '3 000 BYN' },
      { label: 'Оплата в интернете', value: '1 500 BYN' },
      { label: 'Оплата за рубежом', value: '5 000 BYN' },
    ],
  },
  changePin: {
    title: 'Сменить ПИН-код',
    successMessage: 'ПИН-код успешно изменён',
  },
  reissueCard: {
    title: 'Перевыпустить карту',
    rows: [
      { label: 'Карта', value: 'Кактус BYN 5*4685' },
      { label: 'Срок действия', value: '06/27' },
      { label: 'Причина', value: 'По желанию клиента' },
      { label: 'Стоимость', value: 'Бесплатно' },
      { label: 'Срок изготовления', value: '5 рабочих дней' },
    ],
  },
  mobilePayment: {
    title: 'Мобильная связь',
    rows: [
      { label: 'Оператор', value: 'Выберите оператора' },
      { label: 'А1 (МТС)', value: 'Доступен' },
      { label: 'life:)', value: 'Доступен' },
      { label: 'МТС', value: 'Доступен' },
    ],
  },
  erip: {
    title: 'ЕРИП',
    rows: [
      { label: 'Коммунальные услуги', value: 'Доступно' },
      { label: 'Интернет и ТВ', value: 'Доступно' },
      { label: 'Образование', value: 'Доступно' },
      { label: 'Транспорт', value: 'Доступно' },
      { label: 'Налоги и сборы', value: 'Доступно' },
    ],
  },
  creditPayment: {
    title: 'Погашение кредита',
    rows: [
      { label: 'Активные кредиты', value: '0' },
      { label: 'Статус', value: 'Нет активных обязательств' },
    ],
  },
  customPayment: {
    title: 'Произвольный платёж',
    rows: [
      { label: 'Получатель', value: 'Введите данные' },
      { label: 'УНП', value: 'Введите УНП' },
      { label: 'Расчётный счёт', value: 'Введите счёт' },
    ],
  },
  qrPayment: {
    title: 'QR оплата',
    infoMessage: 'Наведите камеру на QR-код для оплаты',
  },
  templates: {
    title: 'Шаблоны',
    rows: [
      { label: 'Сохранённых шаблонов', value: '0' },
      { label: 'Подсказка', value: 'Создайте шаблон при оплате, чтобы он появился здесь' },
    ],
  },
  help: {
    title: 'Помощь',
    rows: [
      { label: 'Телефон поддержки', value: '8-017-229-99-99' },
      { label: 'Режим работы', value: 'Круглосуточно' },
      { label: 'Email', value: 'support@mtbank.by' },
      { label: 'Часто задаваемые вопросы', value: 'Более 50 ответов' },
    ],
  },
  devices: {
    title: 'Устройства',
    rows: [
      { label: 'Текущее устройство', value: 'iPhone (активно)' },
      { label: 'Последний вход', value: '22 апреля 2026, 18:02' },
      { label: 'IP-адрес', value: '192.168.1.***' },
    ],
  },
  cardsAndAccounts: {
    title: 'Карты и счета',
    rows: [
      { label: 'Кактус BYN', value: '9.37 BYN' },
      { label: 'Пакет Simple', value: '211.38 BYN' },
      { label: 'Всего карт', value: '1' },
      { label: 'Всего счетов', value: '2' },
    ],
  },
  credits: {
    title: 'Кредиты',
    rows: [
      { label: 'Активные кредиты', value: '0' },
      { label: 'Доступный лимит', value: 'Не установлен' },
    ],
  },
  deposits: {
    title: 'Вклады',
    rows: [
      { label: 'Активные вклады', value: '0' },
      { label: 'Лучшая ставка', value: '13.5% годовых' },
    ],
  },
  applications: {
    title: 'Заявки на продукты',
    rows: [
      { label: 'Активные заявки', value: '0' },
      { label: 'Одобренные', value: '0' },
    ],
  },
  countries: {
    title: 'Доступные страны',
    rows: [
      { label: 'Россия', value: 'Доступно' },
      { label: 'Казахстан', value: 'Доступно' },
      { label: 'Украина', value: 'Ограничено' },
      { label: 'Грузия', value: 'Доступно' },
      { label: 'Армения', value: 'Доступно' },
      { label: 'Узбекистан', value: 'Доступно' },
      { label: 'Кыргызстан', value: 'Доступно' },
      { label: 'Польша', value: 'Доступно' },
    ],
  },
  notifSettings: {
    title: 'Уведомления',
    rows: [
      { label: 'Push-уведомления', value: 'Включены' },
      { label: 'SMS-уведомления', value: 'Отключены' },
      { label: 'Email-рассылка', value: 'Включена' },
    ],
  },
  securitySettings: {
    title: 'Безопасность',
    rows: [
      { label: 'Биометрический вход', value: 'Включён' },
      { label: 'ПИН-код при входе', value: 'Включён' },
      { label: 'Автоблокировка', value: '5 минут' },
      { label: 'Сменить пароль', value: 'Последняя смена: 01.03.2026' },
    ],
  },
}

export default function FeatureScreen({ featureId, onBack }) {
  const data = FEATURE_DATA[featureId] || { title: 'Информация', rows: [] }

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ChevronLeft size={28} color="#3d8ef5" />
        </button>
        <span className={styles.topTitle}>{data.title}</span>
      </div>

      <div className={styles.scrollArea}>
        {data.successMessage && (
          <div className={styles.successBlock}>
            <div className={styles.successCircle}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className={styles.successText}>{data.successMessage}</span>
          </div>
        )}

        {data.infoMessage && (
          <div className={styles.infoBlock}>
            <div className={styles.infoCircle}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <line x1="7" y1="12" x2="17" y2="12" />
                <line x1="12" y1="7" x2="12" y2="17" />
              </svg>
            </div>
            <span className={styles.infoText}>{data.infoMessage}</span>
          </div>
        )}

        {data.notifications && (
          <div className={styles.notifList}>
            {data.notifications.map(n => (
              <div key={n.id} className={`${styles.notifRow} ${n.unread ? styles.notifUnread : ''}`}>
                {n.unread && <div className={styles.notifDot} />}
                <div className={styles.notifContent}>
                  <span className={styles.notifText}>{n.text}</span>
                  <span className={styles.notifTime}>{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {data.rates && (
          <div className={styles.ratesTable}>
            <div className={styles.ratesHeader}>
              <span className={styles.ratesHeaderCell}>Валюта</span>
              <span className={styles.ratesHeaderCell}>Покупка</span>
              <span className={styles.ratesHeaderCell}>Продажа</span>
            </div>
            {data.rates.map(r => (
              <div key={r.currency} className={styles.rateRow}>
                <span className={styles.rateCurrency}>
                  <span className={styles.rateFlag}>{r.flag}</span>
                  {r.currency}
                </span>
                <span className={styles.rateValue}>{r.buy}</span>
                <span className={styles.rateValue}>{r.sell}</span>
              </div>
            ))}
            <div className={styles.ratesFooter}>Курсы на 22 апреля 2026</div>
          </div>
        )}

        {data.rows && (
          <div className={styles.infoList}>
            {data.rows.map((row, i) => (
              <div key={i} className={styles.infoRow} style={{ animationDelay: `${i * 0.05}s` }}>
                <span className={styles.infoLabel}>{row.label}</span>
                <span className={styles.infoValue}>{row.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
