import { useEffect, useState } from 'react'

interface FloatingIcon {
  id: number
  icon: string
  left: number
  top: number
  animationDuration: number
  size: number
  delay: number
}

export function AnimatedBackground() {
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([])

  const sportIcons = ['⚽', '🏆', '🏅', '🎾', '🏀', '🏐', '⛹️', '🥇', '🎯', '🏓']

  useEffect(() => {
    const icons: FloatingIcon[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      icon: sportIcons[i % sportIcons.length],
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: 15 + Math.random() * 20, // 15-35 seconds
      size: 20 + Math.random() * 30, // 20-50px
      delay: Math.random() * 10 // 0-10 seconds delay
    }))
    setFloatingIcons(icons)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950" />

      {/* Floating icons */}
      {floatingIcons.map((icon) => (
        <div
          key={icon.id}
          className="absolute opacity-20 hover:opacity-40 transition-opacity"
          style={{
            left: `${icon.left}%`,
            top: `${icon.top}%`,
            fontSize: `${icon.size}px`,
            animationDelay: `${icon.delay}s`
          }}
        >
          <div
            className="animate-float"
            style={{
              animationDuration: `${icon.animationDuration}s`
            }}
          >
            {icon.icon}
          </div>
        </div>
      ))}

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/50 via-transparent to-blue-900/30" />
    </div>
  )
}
