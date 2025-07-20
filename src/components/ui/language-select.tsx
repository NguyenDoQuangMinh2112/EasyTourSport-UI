import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { supportedLanguages } from '../../i18n/config'
import { useClickOutside } from '../../hooks/use-click-outside'
import { Languages, ChevronDown } from 'lucide-react'

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

  const getLanguageCode = (langCode: string) => {
    switch (langCode) {
      case 'en':
        return 'US'
      case 'vi':
        return 'VN'
      default:
        return 'VN'
    }
  }

  const getLanguageName = (langCode: string) => {
    switch (langCode) {
      case 'en':
        return 'English'
      case 'vi':
        return 'Tiếng Việt'
      default:
        return 'Tiếng Việt'
    }
  }

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-600/50 bg-slate-800/50 backdrop-blur-sm px-3 py-2 text-sm font-medium text-white hover:bg-slate-700/50 hover:border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 cursor-pointer"
      >
        <Languages className="w-4 h-4 text-slate-400" />
        <span className="text-sm font-medium">{getLanguageCode(currentLanguage.code)}</span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-600/50 bg-slate-800/90 backdrop-blur-lg shadow-xl z-50 overflow-hidden">
          <div className="py-1">
            {supportedLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  i18n.changeLanguage(language.code)
                  setIsOpen(false)
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 text-left text-sm transition-all duration-200 cursor-pointer ${
                  i18n.language === language.code
                    ? 'bg-blue-500/20 text-blue-300 border-l-2 border-blue-400'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <span className="text-sm font-medium min-w-[24px]">{getLanguageCode(language.code)}</span>
                <span className="font-medium">{getLanguageName(language.code)}</span>
                {i18n.language === language.code && (
                  <svg className="h-4 w-4 ml-auto text-blue-400" fill="currentColor" viewBox="0 0 20 20">
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
