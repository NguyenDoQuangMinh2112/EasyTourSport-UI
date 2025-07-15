import { cn } from '@/utils'

interface TeamAvatarProps {
  teamName: string
  logoUrl?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function TeamAvatar({ teamName, logoUrl, size = 'md', className }: TeamAvatarProps) {
  const generateInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-20 h-20 text-lg'
  }

  const colors = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-blue-600',
    'from-purple-500 to-pink-600',
    'from-yellow-500 to-red-600',
    'from-indigo-500 to-purple-600',
    'from-pink-500 to-rose-600',
    'from-teal-500 to-cyan-600',
    'from-orange-500 to-red-600'
  ]

  // Generate consistent color based on team name
  const colorIndex = teamName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
  const gradientClass = colors[colorIndex]

  if (logoUrl) {
    return (
      <div className={cn('rounded-lg overflow-hidden flex-shrink-0', sizeClasses[size], className)}>
        <img
          src={logoUrl}
          alt={`${teamName} logo`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // If image fails to load, hide it and show initials instead
            e.currentTarget.style.display = 'none'
            const parent = e.currentTarget.parentElement
            if (parent) {
              parent.innerHTML = `
                <div class="w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white font-bold ${
                sizeClasses[size].includes('text-xs')
                  ? 'text-xs'
                  : sizeClasses[size].includes('text-sm')
                  ? 'text-sm'
                  : sizeClasses[size].includes('text-base')
                  ? 'text-base'
                  : 'text-lg'
              }">
                  ${generateInitials(teamName)}
                </div>
              `
            }
          }}
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0',
        `bg-gradient-to-br ${gradientClass}`,
        sizeClasses[size],
        className
      )}
    >
      {generateInitials(teamName)}
    </div>
  )
}
