import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files
import enCommon from './messages/en/common.json'
import viCommon from './messages/vi/common.json'

const resources = {
  en: {
    common: enCommon
  },
  vi: {
    common: viCommon
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',

    // Language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'easytoursport-language'
    },

    interpolation: {
      escapeValue: false // React already does escaping
    },

    // Development options
    debug: process.env.NODE_ENV === 'development',

    // React options
    react: {
      useSuspense: false
    }
  })

export default i18n

// Export supported languages
export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' }
] as const

export type SupportedLanguage = (typeof supportedLanguages)[number]['code']
