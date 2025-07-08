import { useState } from 'react'
import { ThemeSelect } from '../../ui/theme-select'
import { LanguageSelect } from '../../ui/language-select'
import { useTranslation } from '../../../hooks/use-translation'
import { NAVIGATION_ITEMS } from '../../../constants/data'
import { Trophy } from 'lucide-react'

const Header = () => {
  const { t } = useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-gradient-to-r from-slate-900/95 via-blue-900/90 to-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-slate-900/70 supports-[backdrop-filter]:via-blue-900/65 supports-[backdrop-filter]:to-slate-900/70 before:absolute before:inset-x-0 before:bottom-0 before:h-[1px] before:bg-gradient-to-r before:from-blue-500/30 before:via-purple-600/30 before:to-blue-500/30">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
            <Trophy />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="font-heading font-bold text-[20px] leading-none bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:from-blue-300 group-hover:to-purple-400">
              {t('app.title')}
            </span>
            <span className="text-xs text-muted-foreground leading-none">{t('app.slogan')}</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAVIGATION_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-600/10 px-3 py-2 rounded-md"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        {/* Right Section - Controls */}
        <div className="flex items-center space-x-4">
          {/* Desktop Controls */}
          <div className="hidden sm:flex items-center space-x-3">
            <LanguageSelect />
            <ThemeSelect />
          </div>

          {/* Login Button - Primary style with gradient */}
          <button className="cursor-pointer inline-flex items-center justify-center rounded-lg border border-blue-500/30 bg-transparent px-4 py-2 text-sm font-medium text-primary transition-all duration-200 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
            {t('auth.login')}
          </button>

          {/* Register Button - Primary style with gradient */}
          <button className="cursor-pointer inline-flex items-center justify-center rounded-lg border border-blue-500/30 bg-transparent px-4 py-2 text-sm font-medium text-primary transition-all duration-200 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
            {t('auth.register')}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex md:hidden items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Navigation */}
            <div className="space-y-3">
              {NAVIGATION_ITEMS.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(item.key)}
                </a>
              ))}
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-3">
                <LanguageSelect />
                <ThemeSelect />
              </div>
              <button className="inline-flex items-center justify-center rounded-lg border border-blue-500/30 bg-transparent px-4 py-2 text-sm font-medium text-primary transition-all duration-200 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/50">
                {t('auth.login')}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
