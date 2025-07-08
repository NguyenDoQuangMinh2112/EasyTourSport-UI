import { SportCard } from '../ui/sport-card'
import { SPORTS_DATA } from '../../constants/data'

export function SportsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {SPORTS_DATA.map((sport) => (
        <SportCard key={sport.id} sport={sport} />
      ))}
    </div>
  )
}
