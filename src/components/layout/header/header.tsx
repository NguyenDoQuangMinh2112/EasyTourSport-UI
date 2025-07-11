import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LanguageSelect } from '../../ui/language-select'
import { LoginModal } from '../../ui/login-modal'
import { useTranslation } from '../../../hooks/use-translation'
import { Trophy, Sparkles, Menu, X, UserPlus, LogIn } from 'lucide-react'
import { cn } from '../../../utils'

const NAVIGATION_ITEMS = [
  { href: '/', key: 'navigation.home', icon: '🏠' },
  { href: '/tournaments', key: 'navigation.tournaments', icon: '🏆' },
  { href: '/matches', key: 'navigation.matches', icon: '⚽' },
  { href: '/dashboard', key: 'navigation.dashboard', icon: '📊' }
]

const Header = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-slate-900/70 supports-[backdrop-filter]:via-slate-800/65 supports-[backdrop-filter]:to-slate-900/70 before:absolute before:inset-x-0 before:bottom-0 before:h-[1px] before:bg-gradient-to-r before:from-slate-500/30 before:via-slate-600/30 before:to-slate-500/30">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Enhanced Logo Section */}
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg group-hover:scale-110 transition-all duration-300">
              <div className="absolute inset-0.5 bg-slate-900/90 rounded-lg" />
              <Trophy className="relative w-6 h-6 text-blue-400 drop-shadow-sm" />
            </div>
            {/* Floating sparkle */}
            <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl leading-none bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-300 group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-pink-300">
              {t('app.title')}
            </span>
            <span className="text-xs text-slate-400 leading-none font-medium tracking-wide">{t('app.slogan')}</span>
          </div>
        </div>

        {/* Enhanced Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'relative text-sm font-medium transition-all duration-300 hover:text-blue-400 px-4 py-2 rounded-lg group overflow-hidden',
                location.pathname === item.href ? 'text-blue-400' : 'text-slate-300'
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              <span className="relative">{t(item.key)}</span>
            </Link>
          ))}
        </nav>

        {/* Enhanced Right Section */}
        <div className="flex items-center space-x-3">
          {/* Desktop Controls */}
          <div className="hidden sm:flex items-center space-x-3">
            <LanguageSelect />
          </div>

          {/* Enhanced Login/Register Buttons */}
          <div className="hidden sm:flex items-center space-x-2">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="group relative inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600/50 bg-slate-800/50 backdrop-blur-sm px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-300 hover:bg-slate-700/50 hover:border-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {t('auth.login')}
            </button>

            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="group relative inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:from-blue-600 hover:to-purple-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-lg hover:shadow-xl"
            >
              <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {t('auth.register')}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </button>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex md:hidden items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-800/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-200"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 transition-transform duration-200 rotate-90" />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-200" />
            )}
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-600/30 bg-slate-900/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Navigation */}
            <div className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  className="block text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 px-3 py-2 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>

            {/* Mobile Controls */}
            <div className="pt-4 border-t border-slate-600/30 space-y-3">
              <div className="flex justify-center">
                <LanguageSelect />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600/50 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  {t('auth.login')}
                </button>
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                >
                  <UserPlus className="w-4 h-4" />
                  {t('auth.register')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  )
}

export default Header
