import { useState } from 'react'
import { Modal } from './modal'
import { useTranslation } from '../../hooks/use-translation'
import { cn } from '../../utils'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Sparkles,
  Shield,
  ArrowRight,
  Github,
  Chrome,
  Check,
  Star,
  Zap
} from 'lucide-react'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin?: (userData: { name: string; email: string; role: string }) => void
}

interface UserData {
  name: string
  email: string
  role: 'user' | 'organizer'
  avatar?: string
  notifications?: number
}

interface ValidationState {
  email: boolean
  password: boolean
  name: boolean
  confirmPassword: boolean
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const { t } = useTranslation()
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [validationState, setValidationState] = useState<ValidationState>({
    email: false,
    password: false,
    name: false,
    confirmPassword: false
  })
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })

  // Advanced validation
  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      case 'password':
        return value.length >= 6
      case 'name':
        return value.trim().length >= 2
      case 'confirmPassword':
        return value === formData.password && value.length >= 6
      default:
        return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call with realistic timing
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Mock user data based on form input
    const userData: UserData = {
      name: isLoginMode ? 'Nguyễn Văn A' : formData.name,
      email: formData.email,
      role: formData.email.includes('admin') || formData.email.includes('organizer') ? 'organizer' : 'user',
      avatar: '/avatar-placeholder.jpg',
      notifications: Math.floor(Math.random() * 5) + 1
    }

    setIsLoading(false)

    // Call the onLogin callback if provided
    if (onLogin) {
      onLogin(userData)
    } else {
      onClose()
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Real-time validation
    const isValid = validateField(field, value)
    setValidationState((prev) => ({ ...prev, [field]: isValid }))
  }

  const switchMode = () => {
    setIsLoginMode(!isLoginMode)
    setFormData({ email: '', password: '', name: '', confirmPassword: '' })
    setValidationState({ email: false, password: false, name: false, confirmPassword: false })
  }

  const handleSocialLogin = (_provider: string) => {
    // TODO: Implement social login
  }

  // Animated particles effect
  const AnimatedParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={cn(
            'absolute w-1 h-1 rounded-full opacity-40',
            i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-pink-400',
            'animate-float'
          )}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg max-h-[90vh]">
      <div className="relative max-h-[85vh] overflow-y-auto custom-scrollbar">
        <div className="space-y-6 p-1">
          {/* Animated Background Elements */}
          <AnimatedParticles />

          {/* Background Gradient Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
            <div
              className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: '1s' }}
            />
          </div>

          {/* Enhanced Header with 3D animated logo */}
          <div className="relative text-center space-y-4 pt-2">
            <div className="relative mx-auto w-20 h-20 group perspective-1000">
              {/* Multiple animated rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-spin-slow opacity-20" />
              <div className="absolute inset-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-reverse-spin opacity-15" />

              {/* 3D Logo container */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500 transform-gpu">
                <div className="absolute inset-1 bg-slate-900/95 rounded-xl backdrop-blur-sm" />
                <div className="relative">
                  {isLoginMode ? (
                    <Shield className="w-10 h-10 text-blue-400 drop-shadow-lg" />
                  ) : (
                    <Sparkles className="w-10 h-10 text-purple-400 drop-shadow-lg" />
                  )}
                </div>

                {/* Floating micro elements */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-bounce opacity-80" />
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping opacity-60" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                {isLoginMode ? t('auth.login') : t('auth.register')}
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                {isLoginMode ? t('auth.loginDescription') : t('auth.registerDescription')}
              </p>

              {/* Status indicator */}
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span>Secure Connection</span>
              </div>
            </div>
          </div>

          {/* Enhanced Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field (only for register) */}
            {!isLoginMode && (
              <div className="space-y-2 transform transition-all duration-500 animate-fade-in">
                <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-purple-400" />
                  {t('auth.fullName')}
                  <Star className="w-2.5 h-2.5 text-yellow-400 opacity-60" />
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={cn(
                      'w-full pl-10 pr-10 py-3 bg-slate-800/50 backdrop-blur-sm border rounded-lg text-white placeholder-slate-400',
                      'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50',
                      'transition-all duration-300 hover:border-slate-500 hover:bg-slate-800/70',
                      validationState.name ? 'border-green-500/50' : 'border-slate-600/50'
                    )}
                    placeholder={t('auth.enterFullName')}
                    required={!isLoginMode}
                  />
                  <User
                    className={cn(
                      'absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors',
                      validationState.name ? 'text-green-400' : 'text-slate-400 group-focus-within:text-blue-400'
                    )}
                  />
                  {validationState.name && (
                    <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400 animate-scale-in" />
                  )}
                </div>
              </div>
            )}

            {/* Email field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                {t('auth.email')}
                <Zap className="w-2.5 h-2.5 text-blue-400 opacity-60" />
              </label>
              <div className="relative group">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={cn(
                    'w-full pl-10 pr-10 py-3 bg-slate-800/50 backdrop-blur-sm border rounded-lg text-white placeholder-slate-400',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50',
                    'transition-all duration-300 hover:border-slate-500 hover:bg-slate-800/70',
                    validationState.email ? 'border-green-500/50' : 'border-slate-600/50'
                  )}
                  placeholder={t('auth.enterEmail')}
                  required
                />
                <Mail
                  className={cn(
                    'absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors',
                    validationState.email ? 'text-green-400' : 'text-slate-400 group-focus-within:text-blue-400'
                  )}
                />
                {validationState.email && (
                  <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400 animate-scale-in" />
                )}
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-purple-400" />
                {t('auth.password')}
                <Shield className="w-2.5 h-2.5 text-purple-400 opacity-60" />
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={cn(
                    'w-full pl-10 pr-14 py-3 bg-slate-800/50 backdrop-blur-sm border rounded-lg text-white placeholder-slate-400',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50',
                    'transition-all duration-300 hover:border-slate-500 hover:bg-slate-800/70',
                    validationState.password ? 'border-green-500/50' : 'border-slate-600/50'
                  )}
                  placeholder={t('auth.enterPassword')}
                  required
                />
                <Lock
                  className={cn(
                    'absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors',
                    validationState.password ? 'text-green-400' : 'text-slate-400 group-focus-within:text-blue-400'
                  )}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  {validationState.password && <Check className="w-4 h-4 text-green-400 animate-scale-in" />}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-300 transition-colors p-0.5 hover:scale-110"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Password strength indicator */}
              {formData.password && (
                <div className="flex gap-1 mt-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'h-0.5 flex-1 rounded-full transition-all duration-300',
                        formData.password.length > i * 2 + 2
                          ? 'bg-gradient-to-r from-red-500 via-yellow-500 to-green-500'
                          : 'bg-slate-700'
                      )}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password field (only for register) */}
            {!isLoginMode && (
              <div className="space-y-2 transform transition-all duration-500 animate-fade-in">
                <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-green-400" />
                  {t('auth.confirmPassword')}
                  <Check className="w-2.5 h-2.5 text-green-400 opacity-60" />
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={cn(
                      'w-full pl-10 pr-10 py-3 bg-slate-800/50 backdrop-blur-sm border rounded-lg text-white placeholder-slate-400',
                      'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50',
                      'transition-all duration-300 hover:border-slate-500 hover:bg-slate-800/70',
                      validationState.confirmPassword ? 'border-green-500/50' : 'border-slate-600/50'
                    )}
                    placeholder={t('auth.confirmPassword')}
                    required={!isLoginMode}
                  />
                  <Lock
                    className={cn(
                      'absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors',
                      validationState.confirmPassword
                        ? 'text-green-400'
                        : 'text-slate-400 group-focus-within:text-blue-400'
                    )}
                  />
                  {validationState.confirmPassword && (
                    <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400 animate-scale-in" />
                  )}
                </div>
              </div>
            )}

            {/* Forgot password (only for login) */}
            {isLoginMode && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-all duration-200 hover:underline hover:scale-105"
                >
                  {t('auth.forgotPassword')}
                </button>
              </div>
            )}

            {/* Enhanced Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                'w-full relative group overflow-hidden',
                'py-4 px-6 rounded-lg font-bold text-base transition-all duration-500',
                'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
                'hover:from-blue-600 hover:via-purple-600 hover:to-pink-600',
                'focus:outline-none focus:ring-4 focus:ring-blue-500/30',
                'text-white shadow-2xl hover:shadow-purple-500/25',
                'transform hover:scale-[1.02] active:scale-[0.98]',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
                'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
                'before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700'
              )}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

              {/* Button content */}
              <div className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{isLoginMode ? t('auth.signIn') : t('auth.createAccount')}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Elegant Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
            <div className="relative px-4">
              <div className="bg-slate-900 px-3 py-1 text-sm text-slate-400 rounded-full border border-slate-700 backdrop-blur-sm">
                {t('auth.or')}
              </div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          </div>

          {/* Enhanced Social login buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleSocialLogin('google')}
              className="w-full relative group overflow-hidden flex items-center justify-center gap-3 py-3 px-4 border border-slate-600/50 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Chrome className="w-5 h-5 group-hover:scale-110 transition-transform text-white" />
              <span className="font-medium">{t('auth.continueWithGoogle')}</span>
            </button>

            <button
              onClick={() => handleSocialLogin('github')}
              className="w-full relative group overflow-hidden flex items-center justify-center gap-3 py-3 px-4 border border-slate-600/50 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-700/20 to-slate-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{t('auth.continueWithGithub')}</span>
            </button>
          </div>

          {/* Enhanced Switch mode */}
          <div className="relative text-center p-4 bg-gradient-to-r from-slate-800/20 via-slate-800/40 to-slate-800/20 rounded-xl border border-slate-700/50 backdrop-blur-sm mb-2">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl" />
            <div className="relative">
              <span className="text-slate-400 text-sm">
                {isLoginMode ? t('auth.noAccount') : t('auth.haveAccount')}
              </span>{' '}
              <button
                onClick={switchMode}
                className="text-blue-400 hover:text-blue-300 font-semibold transition-all duration-300 hover:underline hover:scale-105 inline-flex items-center gap-1"
              >
                {isLoginMode ? t('auth.signUp') : t('auth.signIn')}
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
