import { useTranslation as useI18nTranslation } from 'react-i18next'
import type { SupportedLanguage } from '../i18n/config'

export function useTranslation(namespace?: string) {
  return useI18nTranslation(namespace || 'common')
}

export function useLanguage() {
  const { i18n } = useI18nTranslation()

  const changeLanguage = (language: SupportedLanguage) => {
    i18n.changeLanguage(language)
  }

  const currentLanguage = i18n.language as SupportedLanguage

  return {
    currentLanguage,
    changeLanguage,
    isLoading: i18n.isInitialized === false
  }
}
