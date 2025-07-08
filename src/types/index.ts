export interface SportData {
  id: string
  icon: string
  color: string
  popular: boolean
}

export interface ThemeOption {
  value: 'light' | 'dark' | 'system'
  label: string
  icon: string
}

export interface LanguageOption {
  code: string
  name: string
  nativeName: string
}

export type Theme = 'light' | 'dark' | 'system'

export interface NavigationItem {
  key: string
  href: string
}
