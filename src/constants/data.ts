import type { SportData, NavigationItem } from '../types'

export const SPORTS_DATA: SportData[] = [
  {
    id: 'football',
    icon: '⚽',
    color: 'from-green-500 to-green-600',
    popular: true
  },
  {
    id: 'badminton',
    icon: '🏸',
    color: 'from-blue-500 to-blue-600',
    popular: false
  },
  {
    id: 'tabletennis',
    icon: '🏓',
    color: 'from-red-500 to-red-600',
    popular: false
  },
  {
    id: 'basketball',
    icon: '🏀',
    color: 'from-orange-500 to-orange-600',
    popular: true
  },
  {
    id: 'volleyball',
    icon: '🏐',
    color: 'from-purple-500 to-purple-600',
    popular: false
  },
  {
    id: 'esports',
    icon: '🎮',
    color: 'from-pink-500 to-pink-600',
    popular: true
  }
]

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { key: 'navigation.home', href: '#home' },
  { key: 'navigation.tours', href: '#tours' },
  { key: 'navigation.about', href: '#about' },
  { key: 'navigation.contact', href: '#contact' }
]
