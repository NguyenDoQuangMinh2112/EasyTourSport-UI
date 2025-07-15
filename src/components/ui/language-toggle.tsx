import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, Check } from 'lucide-react'
import { cn } from '../../utils'
import { supportedLanguages } from '../../i18n/config'

export function LanguageToggle() {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode)
    setIsOpen(false)
  }

  const currentLanguage = supportedLanguages.find((lang) => lang.code === i18n.language) || supportedLanguages[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 hover:border-slate-500/50 transition-all duration-200 text-white"
        title={t('language.toggle')}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-sm border border-slate-600/50 rounded-xl shadow-xl z-50">
          <div className="p-2">
            {supportedLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 text-left',
                  i18n.language === language.code
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                )}
              >
                <div>
                  <div className="font-medium">{language.nativeName}</div>
                  <div className="text-xs opacity-75">{language.name}</div>
                </div>
                {i18n.language === language.code && <Check className="w-4 h-4 text-blue-400" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
