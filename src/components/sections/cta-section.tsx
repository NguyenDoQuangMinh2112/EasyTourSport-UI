import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../hooks/use-translation'
import { useSportSelection } from '../../contexts/sport-selection-unified'
import { cn, commonStyles } from '../../utils'
import { ArrowRight, Play, Sparkles, Trophy, Zap } from 'lucide-react'

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

  if (!selectedSport) {
    return (
      <div className="max-w-lg mx-auto text-center my-12 p-8 bg-slate-800/40 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl flex items-center justify-center border border-slate-600/50">
            <Sparkles className="w-6 h-6 text-slate-400" />
          </div>
        </div>
        <p className={cn(commonStyles.text.muted, 'text-lg mb-2 font-medium')}>{t('home.cta.selectSport')}</p>
        <p className="text-slate-500 text-sm">Chọn môn thể thao để bắt đầu tạo giải đấu</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto text-center my-12 p-8 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
      <div className="relative">
        {/* Compact Success Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl mb-6 shadow-lg transition-transform duration-300 hover:scale-105">
          <Trophy className="w-8 h-8 text-white drop-shadow-lg" />
        </div>

        {/* Compact Title */}
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          {t('home.cta.ready', { sport: t(`home.sports.${selectedSport.id}.title`) })}
        </h2>

        {/* Compact Description */}
        <p className={cn(commonStyles.text.muted, 'text-sm mb-6 max-w-sm mx-auto')}>{t('home.cta.description')}</p>

        {/* Compact Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          {/* Primary Button */}
          <button
            onClick={handleCreateTournament}
            className="group relative w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-purple-500/25 hover:scale-105 cursor-pointer"
          >
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" />
              <span>{t('home.cta.continue')}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </button>

          {/* Secondary Button */}
          <button
            onClick={handleViewDemo}
            className="group w-full sm:w-auto bg-slate-800/50 border border-slate-600/50 text-slate-300 font-medium text-sm px-6 py-3 rounded-lg backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/50 hover:text-white cursor-pointer"
          >
            <div className="flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              <span>{t('home.cta.demo')}</span>
            </div>
          </button>
        </div>

        {/* Compact Feature Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-green-300 bg-green-500/20 border border-green-500/30">
            <Trophy className="w-3 h-3" />
            Quản lý chuyên nghiệp
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-blue-300 bg-blue-500/20 border border-blue-500/30">
            <Zap className="w-3 h-3" />
            Tự động hóa
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-purple-300 bg-purple-500/20 border border-purple-500/30">
            <Play className="w-3 h-3" />
            Theo dõi trực tiếp
          </span>
        </div>
      </div>
    </div>
  )
}
