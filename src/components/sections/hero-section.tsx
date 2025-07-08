import { useTranslation } from '../../hooks/use-translation'
import { cn, commonStyles } from '../../utils'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <div className="text-center mb-16">
      <h1 className={cn(commonStyles.text.heading, 'text-5xl md:text-7xl mb-6')}>{t('home.hero.title')}</h1>
      <h2 className={cn(commonStyles.text.subheading, 'text-3xl md:text-4xl mb-8')}>{t('home.hero.subtitle')}</h2>
      <p className={cn(commonStyles.text.body, 'text-xl mb-12 max-w-3xl mx-auto')}>{t('home.hero.description')}</p>

      {/* Stats */}
      <div className="flex justify-center items-center gap-8 text-sm text-gray-400 mb-16">
        <div className="flex items-center gap-2">
          <span className="text-yellow-500">🏆</span>
          <span>{t('home.stats.tournaments')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-500">👥</span>
          <span>{t('home.stats.participants')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-yellow-500">⭐</span>
          <span>{t('home.stats.rating')}</span>
        </div>
      </div>
    </div>
  )
}
