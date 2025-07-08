import { HeroSection, SportsGrid, CTASection } from '../../components'
import { cn, commonStyles } from '../../utils'

export function HomePage() {
  return (
    <div className={cn('min-h-screen text-white', commonStyles.gradient.background)}>
      <div className={cn(commonStyles.container, commonStyles.section)}>
        <HeroSection />
        <SportsGrid />
        <CTASection />
      </div>
    </div>
  )
}
