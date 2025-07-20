import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LanguageSelect } from '../../ui/language-select'
import { LoginModal } from '../../ui/login-modal'
import { useTranslation } from '../../../hooks/use-translation'
import {
  Trophy,
  Sparkles,
  Menu,
  X,
  UserPlus,
  LogIn,
  User,
  Settings,
  LogOut,
  Bell,
  Shield,
  Calendar,
  ChevronDown,
  Trophy as TrophyIcon
} from 'lucide-react'
import { cn } from '../../../utils'

const NAVIGATION_ITEMS = [
  { href: '/', key: 'navigation.home', icon: '🏠' },
  { href: '/tournaments', key: 'navigation.tournaments', icon: '🏆' },
  { href: '/matches', key: 'navigation.matches', icon: '⚽' },
  { href: '/dashboard', key: 'navigation.dashboard', icon: '📊' },
  { href: '/lineup-demo', key: 'navigation.lineupDemo', icon: '⚽' }
]

const Header = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  // Mock user state - in real app this would come from auth context
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    avatar: '/avatar-placeholder.jpg',
    role: 'organizer' as 'user' | 'organizer',
    notifications: 3
  })

  const handleLogin = (userData: any) => {
    setUser(userData)
    setIsLoggedIn(true)
    setIsLoginModalOpen(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsUserDropdownOpen(false)
  }

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

          {/* Conditional Login/User UI */}
          {isLoggedIn ? (
            /* Logged In User UI */
            <div className="hidden sm:flex items-center space-x-3">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="relative p-2 text-slate-400 hover:text-white transition-colors duration-200 rounded-lg cursor-pointer hover:bg-slate-800/50"
                >
                  <Bell className="w-5 h-5" />
                  {user.notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {user.notifications}
                    </span>
                  )}
                </button>

                {/* Enhanced Notifications Dropdown */}
                {isNotificationOpen && (
                  <div className="absolute right-0 mt-2 w-96 bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-2xl z-50 overflow-hidden notification-dropdown">
                    {/* Header with gradient */}
                    <div className="relative p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-slate-700/50">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold text-white flex items-center gap-2">
                          <Bell className="w-4 h-4 text-blue-400" />
                          Thông báo
                        </h3>
                        <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full font-medium pulse-indicator">
                          {user.notifications} mới
                        </span>
                      </div>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-80 overflow-y-auto custom-scrollbar">
                      {/* Tournament Starting Notification */}
                      <div className="group p-4 hover:bg-slate-700/30 border-b border-slate-700/30 transition-all duration-200 cursor-pointer notification-item">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                            <TrophyIcon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                                Giải đấu sắp bắt đầu
                              </p>
                              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                            </div>
                            <p className="text-sm text-slate-300 mb-1 leading-relaxed">
                              "Summer Cup 2024" sẽ bắt đầu trong 2 giờ nữa
                            </p>
                            <p className="text-xs text-slate-500">2 giờ trước</p>
                          </div>
                        </div>
                      </div>

                      {/* New Teams Registration */}
                      <div className="group p-4 hover:bg-slate-700/30 border-b border-slate-700/30 transition-all duration-200 cursor-pointer notification-item">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                                Đăng ký mới
                              </p>
                              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                            </div>
                            <p className="text-sm text-slate-300 mb-1 leading-relaxed">
                              5 đội vừa đăng ký tham gia giải "City League"
                            </p>
                            <p className="text-xs text-slate-500">1 ngày trước</p>
                          </div>
                        </div>
                      </div>

                      {/* Schedule Update */}
                      <div className="group p-4 hover:bg-slate-700/30 border-b border-slate-700/30 transition-all duration-200 cursor-pointer notification-item">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                            <Calendar className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                                Cập nhật lịch thi đấu
                              </p>
                            </div>
                            <p className="text-sm text-slate-300 mb-1 leading-relaxed">
                              Lịch thi đấu vòng bán kết đã được cập nhật
                            </p>
                            <p className="text-xs text-slate-500">2 ngày trước</p>
                          </div>
                        </div>
                      </div>

                      {/* Match Result */}
                      <div className="group p-4 hover:bg-slate-700/30 transition-all duration-200 cursor-pointer notification-item">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                            <Settings className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                                Kết quả trận đấu
                              </p>
                            </div>
                            <p className="text-sm text-slate-300 mb-1 leading-relaxed">
                              FC Barcelona 3-1 Real Madrid đã kết thúc
                            </p>
                            <p className="text-xs text-slate-500">3 ngày trước</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer with actions */}
                    <div className="p-4 bg-slate-800/80 border-t border-slate-700/50">
                      <div className="flex items-center justify-between">
                        <button className="text-xs text-slate-400 hover:text-slate-300 transition-colors hover:underline">
                          Đánh dấu tất cả đã đọc
                        </button>
                        <Link
                          to="/notifications"
                          className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 group"
                          onClick={() => setIsNotificationOpen(false)}
                        >
                          Xem tất cả
                          <ChevronDown className="w-3 h-3 rotate-[-90deg] group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-800/50 transition-colors duration-200 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-slate-400 capitalize">
                      {user.role === 'organizer' ? 'Ban tổ chức' : 'Người dùng'}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </button>

                {/* User Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
                    <div className="p-3 border-b border-slate-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{user.name}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Hồ sơ cá nhân</span>
                      </Link>

                      {user.role === 'organizer' && (
                        <Link
                          to="/organizer"
                          className="flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <Shield className="w-4 h-4" />
                          <span>Dashboard tổ chức</span>
                        </Link>
                      )}

                      <Link
                        to="/my-tournaments"
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <TrophyIcon className="w-4 h-4" />
                        <span>Giải đấu của tôi</span>
                      </Link>

                      <Link
                        to="/my-schedule"
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Lịch thi đấu</span>
                      </Link>

                      <Link
                        to="/settings"
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Cài đặt</span>
                      </Link>
                    </div>

                    <div className="border-t border-slate-700 py-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-slate-700/50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Not Logged In - Login/Register Buttons */
            <div className="hidden sm:flex items-center space-x-2">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="group relative inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600/50 bg-slate-800/50 backdrop-blur-sm px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-300 hover:bg-slate-700/50 hover:border-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
              >
                <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {t('auth.login')}
              </button>

              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="group relative inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:from-blue-600 hover:to-purple-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {t('auth.register')}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </button>
            </div>
          )}

          {/* Test Login Button - Remove in production */}
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="hidden lg:block px-3 py-1 text-xs bg-yellow-600 hover:bg-yellow-700 text-white rounded transition-colors"
          >
            {isLoggedIn ? 'Test Logout' : 'Test Login'}
          </button>

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

              {isLoggedIn ? (
                /* Mobile Logged In UI */
                <div className="space-y-3">
                  {/* User Info */}
                  <div className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-slate-400 capitalize">
                        {user.role === 'organizer' ? 'Ban tổ chức' : 'Người dùng'}
                      </p>
                    </div>
                    {user.notifications > 0 && (
                      <div className="ml-auto">
                        <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                          {user.notifications}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Mobile User Menu */}
                  <div className="space-y-1">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Hồ sơ cá nhân</span>
                    </Link>

                    {user.role === 'organizer' && (
                      <Link
                        to="/organizer"
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Shield className="w-4 h-4" />
                        <span>Dashboard tổ chức</span>
                      </Link>
                    )}

                    <Link
                      to="/my-tournaments"
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <TrophyIcon className="w-4 h-4" />
                      <span>Giải đấu của tôi</span>
                    </Link>

                    <Link
                      to="/notifications"
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Bell className="w-4 h-4" />
                      <span>Thông báo</span>
                      {user.notifications > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium ml-auto">
                          {user.notifications}
                        </span>
                      )}
                    </Link>

                    <Link
                      to="/settings"
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Cài đặt</span>
                    </Link>

                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-slate-800/50 rounded-lg transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Mobile Login/Register */
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
              )}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} />

      {/* Overlay to close dropdowns when clicking outside */}
      {(isUserDropdownOpen || isNotificationOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsUserDropdownOpen(false)
            setIsNotificationOpen(false)
          }}
        />
      )}
    </header>
  )
}

export default Header
