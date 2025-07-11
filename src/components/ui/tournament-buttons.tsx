import { useNavigate } from 'react-router-dom'
import { Plus, Trophy } from 'lucide-react'
import { cn } from '../../utils'

interface CreateTournamentButtonProps {
  sportId?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  className?: string
}

export function CreateTournamentButton({
  sportId,
  variant = 'primary',
  size = 'md',
  children,
  className
}: CreateTournamentButtonProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (sportId) {
      navigate(`/tournaments/create/${sportId}`)
    } else {
      navigate('/tournaments/create')
    }
  }

  const baseClasses = 'inline-flex items-center gap-2 font-medium transition-all duration-200 rounded-xl'

  const variants = {
    primary:
      'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <button onClick={handleClick} className={cn(baseClasses, variants[variant], sizes[size], className)}>
      {children || (
        <>
          <Plus className="w-4 h-4" />
          Tạo giải đấu
        </>
      )}
    </button>
  )
}

interface ViewTournamentsButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  className?: string
}

export function ViewTournamentsButton({
  variant = 'secondary',
  size = 'md',
  children,
  className
}: ViewTournamentsButtonProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/tournaments')
  }

  const baseClasses = 'inline-flex items-center gap-2 font-medium transition-all duration-200 rounded-xl'

  const variants = {
    primary:
      'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <button onClick={handleClick} className={cn(baseClasses, variants[variant], sizes[size], className)}>
      {children || (
        <>
          <Trophy className="w-4 h-4" />
          Xem giải đấu
        </>
      )}
    </button>
  )
}
