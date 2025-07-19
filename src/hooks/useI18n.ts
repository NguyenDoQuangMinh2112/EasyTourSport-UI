import { useTranslation } from 'react-i18next'

export function useI18n() {
  const { t, i18n } = useTranslation()

  const getSportName = (sportId: string) => {
    const sport = SPORTS_DATA.find((s) => s.id === sportId)
    return sport?.name || sportId
  }

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date))
  }

  const formatTime = (time: string) => {
    return new Intl.DateTimeFormat(i18n.language, {
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(`2000-01-01T${time}`))
  }

  return {
    t,
    i18n,
    getSportName,
    formatDate,
    formatTime,
    currentLanguage: i18n.language
  }
}

// Import SPORTS_DATA here to avoid circular dependencies
const SPORTS_DATA = [
  { id: 'football', name: 'Football', icon: '⚽' },
  { id: 'badminton', name: 'Badminton', icon: '🏸' },
  { id: 'tabletennis', name: 'Table Tennis', icon: '🏓' },
  { id: 'basketball', name: 'Basketball', icon: '🏀' },
  { id: 'volleyball', name: 'Volleyball', icon: '🏐' },
  { id: 'esports', name: 'E-Sports', icon: '🎮' }
]
