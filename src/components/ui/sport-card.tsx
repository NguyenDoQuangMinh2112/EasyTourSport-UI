import type { SportData } from '../../types'
import { useTranslation } from '../../hooks/use-translation'
import { useSportSelection } from '../../contexts/sport-selection-unified'
import { cn, commonStyles } from '../../utils'

interface SportCardProps {
  sport: SportData
}

export function SportCard({ sport }: SportCardProps) {
  const { t } = useTranslation()
  const { selectedSport, setSelectedSport } = useSportSelection()

  const isSelected = selectedSport?.id === sport.id

  const handleClick = () => {
    setSelectedSport(sport)
  }

  return (
    <div
      className={cn(
        'sport-card sport-card-default',
        commonStyles.states.hover,
        sport.popular && 'popular-card',
        isSelected && 'selected-card',
        'cursor-pointer'
      )}
      onClick={handleClick}
    >
      {sport.popular && <div className="popular-badge">{t('common.labels.popular')}</div>}

      <div
        className={cn(
          commonStyles.animations.icon.base,
          commonStyles.animations.icon.hover,
          'w-16 h-16 rounded-xl flex items-center justify-center text-2xl mb-6',
          `bg-gradient-to-br ${sport.color}`
        )}
      >
        {sport.icon}
      </div>

      <h3 className={cn(commonStyles.typography.heading.h3, 'text-2xl mb-3')}>{t(`home.sports.${sport.id}.title`)}</h3>
      <p className={cn(commonStyles.typography.body.md, commonStyles.text.muted, 'mb-4 leading-relaxed')}>
        {t(`home.sports.${sport.id}.description`)}
      </p>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-sm">
          <span className={cn(commonStyles.text.accent, 'font-medium')}>{t(`home.sports.${sport.id}.details`)}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
            {t(`home.sports.${sport.id}.format`)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400 border-t border-gray-700 pt-4">
        <div className="flex items-center gap-1">
          <span className="text-blue-500">🏆</span>
          <span>{t(`home.sports.${sport.id}.tournaments`)}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-green-500">👥</span>
          <span>{t(`home.sports.${sport.id}.participants`)}</span>
        </div>
      </div>
    </div>
  )
}
