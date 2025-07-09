import { HeroSection } from '../components/sections/hero-section'
import { SportsGrid } from '../components/sections/sports-grid'
import { CTASection } from '../components/sections/cta-section'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <SportsGrid />
      <CTASection />
    </>
  )
}
