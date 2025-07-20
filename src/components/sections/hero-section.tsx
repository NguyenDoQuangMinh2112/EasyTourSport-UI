import { useTranslation } from '../../hooks/use-translation'
import { cn, commonStyles } from '../../utils'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <div className="text-center mb-16 mt-8">
      {/* Gradient Text Effect with Fade In Animation */}
      <h1 className="text-5xl md:text-7xl mb-6 font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent relative drop-shadow-2xl animate-fade-in-up animate-gradient">
        {t('home.hero.title')}
      </h1>

      {/* Gradient Subtitle with Delayed Animation */}
      <h2 className="text-3xl md:text-4xl mb-8 font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg animate-fade-in-up animation-delay-300 animate-gradient">
        {t('home.hero.subtitle')}
      </h2>

      {/* Description with Delayed Animation */}
      <p
        className={cn(
          commonStyles.text.body,
          'text-xl mb-12 max-w-3xl mx-auto leading-relaxed text-slate-300 animate-fade-in-up animation-delay-600'
        )}
      >
        {t('home.hero.description')}
      </p>

      {/* Enhanced Stats with Fade In Animation */}
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-sm mb-16 animate-fade-in-up animation-delay-900">
        <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105">
          <span className="text-yellow-400 text-lg">🏆</span>
          <span className="text-yellow-300 font-medium">{t('home.stats.tournaments')}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105">
          <span className="text-blue-400 text-lg">👥</span>
          <span className="text-blue-300 font-medium">{t('home.stats.participants')}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105">
          <span className="text-green-400 text-lg">⭐</span>
          <span className="text-green-300 font-medium">{t('home.stats.rating')}</span>
        </div>
      </div>
    </div>
  )
}
