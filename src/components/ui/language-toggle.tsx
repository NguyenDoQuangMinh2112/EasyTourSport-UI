import { useTranslation } from 'react-i18next'
import { supportedLanguages } from '../../i18n/config'

interface LanguageToggleProps {
  className?: string
}

export function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const { i18n, t } = useTranslation()

  const currentLanguage = supportedLanguages.find((lang) => lang.code === i18n.language) || supportedLanguages[0]

  const toggleLanguage = () => {
    const currentIndex = supportedLanguages.findIndex((lang) => lang.code === i18n.language)
    const nextIndex = (currentIndex + 1) % supportedLanguages.length
    const nextLanguage = supportedLanguages[nextIndex]
    i18n.changeLanguage(nextLanguage.code)
  }

  const getLanguageFlag = (langCode: string) => {
    switch (langCode) {
      case 'en':
        return '🇺🇸'
      case 'vi':
        return '🇻🇳'
      default:
        return '🌐'
    }
  }

  return (
    <button
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 ${className}`}
      type="button"
      title={t('language.current', { language: currentLanguage.nativeName })}
    >
      <span className="text-lg">{getLanguageFlag(currentLanguage.code)}</span>
      <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
    </button>
  )
}
