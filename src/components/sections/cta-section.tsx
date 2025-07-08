import { useTranslation } from '../../hooks/use-translation'
import { useSportSelection } from '../../contexts/sport-selection-unified'
import { cn, commonStyles } from '../../utils'

export function CTASection() {
  const { t } = useTranslation()
  const { selectedSport } = useSportSelection()

  if (!selectedSport) {
    return (
      <div className="text-center mt-16">
        <p className={cn(commonStyles.text.muted, 'text-lg mb-6')}>{t('home.cta.selectSport')}</p>
      </div>
    )
  }

  return (
    <div className="text-center mt-16 p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <h2 className={cn(commonStyles.typography.heading.h2, 'text-3xl mb-4')}>
        {t('home.cta.ready', { sport: t(`home.sports.${selectedSport.id}.title`) })}
      </h2>

      <p className={cn(commonStyles.text.muted, 'text-lg mb-8')}>{t('home.cta.description')}</p>

      <div className="flex gap-4 justify-center">
        <button className={cn(commonStyles.button.primary, 'text-lg px-8 py-3 cursor-pointer')}>
          {t('home.cta.continue')}
        </button>
        <button className={cn(commonStyles.button.secondary, 'text-lg px-8 py-3 cursor-pointer')}>
          {t('home.cta.demo')}
        </button>
      </div>
    </div>
  )
}
