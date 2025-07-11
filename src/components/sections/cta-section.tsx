import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../hooks/use-translation'
import { useSportSelection } from '../../contexts/sport-selection-unified'
import { cn, commonStyles } from '../../utils'
import { ArrowRight, Play, Sparkles, Trophy, Zap } from 'lucide-react'

// Static positions for particles to avoid re-renders and flickering
const PARTICLE_POSITIONS = [
  { left: '25%', top: '30%', delay: '0s', duration: '6s' },
  { left: '75%', top: '20%', delay: '2s', duration: '8s' },
  { left: '40%', top: '70%', delay: '4s', duration: '7s' },
  { left: '80%', top: '60%', delay: '1s', duration: '9s' },
  { left: '60%', top: '25%', delay: '3s', duration: '6s' },
  { left: '30%', top: '80%', delay: '5s', duration: '8s' }
]

// Pre-defined feature pills to avoid recreating on each render
const FEATURE_PILLS = [
  { icon: Trophy, text: 'Professional', color: 'from-yellow-500 to-orange-500' },
  { icon: Zap, text: 'Fast Setup', color: 'from-blue-500 to-cyan-500' },
  { icon: Sparkles, text: 'Modern UI', color: 'from-purple-500 to-pink-500' }
] as const

export function CTASection() {
  const { t } = useTranslation()
  const { selectedSport } = useSportSelection()
  const navigate = useNavigate()

  const handleCreateTournament = () => {
    if (selectedSport) {
      navigate(`/tournaments/create/${selectedSport.id}`)
    } else {
      navigate('/tournaments/create')
    }
  }

  const handleViewDemo = () => {
    navigate('/tournaments')
  }

  const handleViewMatches = () => {
    navigate('/matches')
  }

  if (!selectedSport) {
    return (
      <div className="text-center mt-16 p-12 bg-gradient-to-br from-slate-800/30 via-blue-900/20 to-slate-800/30 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
        <div className="relative">
          {/* Static floating elements - no animation to prevent flicker */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500/20 rounded-full blur-xl opacity-60" />
          <div className="absolute -top-2 -right-6 w-6 h-6 bg-purple-500/20 rounded-full blur-xl opacity-60" />

          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl flex items-center justify-center border border-slate-600/50">
              <Sparkles className="w-8 h-8 text-slate-400" />
            </div>
          </div>

          <p className={cn(commonStyles.text.muted, 'text-xl mb-4 font-medium')}>{t('home.cta.selectSport')}</p>
          <p className="text-slate-500 text-sm">Choose your favorite sport to create amazing tournaments</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative text-center mt-16 p-12 bg-gradient-to-br from-blue-500/10 via-purple-500/15 to-pink-500/10 rounded-3xl border border-blue-500/20 backdrop-blur-sm overflow-hidden">
      {/* Static Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />

      {/* Optimized floating particles with longer, slower animations to reduce flicker */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLE_POSITIONS.map((position, i) => (
          <div
            key={i}
            className={cn(
              'absolute w-1 h-1 rounded-full opacity-30',
              'animate-float-slow', // Slower animation
              i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-pink-400'
            )}
            style={{
              left: position.left,
              top: position.top,
              animationDelay: position.delay,
              animationDuration: position.duration
            }}
          />
        ))}
      </div>

      <div className="relative">
        {/* Simplified Success Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl mb-8 shadow-2xl shadow-green-500/25 transition-transform duration-300 hover:scale-105">
          <Trophy className="w-10 h-10 text-white drop-shadow-lg" />

          {/* Static floating indicators to prevent flicker */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-80" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-400 rounded-full opacity-60" />
        </div>

        {/* Enhanced Title */}
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          {t('home.cta.ready', { sport: t(`home.sports.${selectedSport.id}.title`) })}
        </h2>

        {/* Enhanced Description */}
        <p className={cn(commonStyles.text.muted, 'text-lg mb-8 max-w-md mx-auto leading-relaxed')}>
          {t('home.cta.description')}
        </p>

        {/* Optimized Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary Button - Optimized animations */}
          <button
            onClick={handleCreateTournament}
            className="group relative overflow-hidden w-full sm:w-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 hover:shadow-purple-500/25 hover:scale-105 active:scale-95"
          >
            {/* Optimized shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />

            <div className="relative flex items-center justify-center gap-3">
              <Zap className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
              <span>{t('home.cta.continue')}</span>
              <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </button>

          {/* Secondary Button - View Tournaments */}
          <button
            onClick={handleViewDemo}
            className="group relative overflow-hidden w-full sm:w-auto bg-slate-800/50 border border-slate-600/50 text-slate-300 font-semibold text-lg px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/50 hover:border-slate-500 hover:text-white hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-700/20 to-slate-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative flex items-center justify-center gap-3">
              <Play className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              <span>{t('home.cta.demo')}</span>
            </div>
          </button>

          {/* Tertiary Button - View Matches */}
          <button
            onClick={handleViewMatches}
            className="group relative overflow-hidden w-full sm:w-auto bg-green-600/20 border border-green-500/30 text-green-300 font-semibold text-lg px-6 py-3 rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-green-600/30 hover:border-green-400 hover:text-green-200 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-700/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              <span>Xem lịch thi đấu</span>
            </div>
          </button>
        </div>

        {/* Optimized Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {FEATURE_PILLS.map((item, index) => (
            <div
              key={index}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white',
                'bg-gradient-to-r border border-white/10 backdrop-blur-sm',
                'transition-transform duration-300 hover:scale-105 cursor-default',
                item.color
              )}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
