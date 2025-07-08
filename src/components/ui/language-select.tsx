import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { supportedLanguages } from '../../i18n/config'
import { useClickOutside } from '../../hooks/use-click-outside'

interface LanguageSelectProps {
  className?: string
}

export function LanguageSelect({ className = '' }: LanguageSelectProps) {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const ref = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false)
  })

  const currentLanguage = supportedLanguages.find((lang) => lang.code === i18n.language) || supportedLanguages[0]

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
    <div className={`relative ${className}`} ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <span className="text-base">{getLanguageFlag(currentLanguage.code)}</span>
        <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
        <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800 z-50">
          <div className="py-1">
            {supportedLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  i18n.changeLanguage(language.code)
                  setIsOpen(false)
                }}
                className={`flex items-center gap-3 w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  i18n.language === language.code
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-900 dark:text-gray-300'
                }`}
              >
                <span className="text-base">{getLanguageFlag(language.code)}</span>
                <span>{language.nativeName}</span>
                {i18n.language === language.code && (
                  <svg className="h-4 w-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
