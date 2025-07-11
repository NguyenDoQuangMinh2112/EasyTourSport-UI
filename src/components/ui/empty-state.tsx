import type { LucideIcon } from 'lucide-react'
import { cn } from '../../utils'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('text-center py-12', className)}>
      <Icon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
      <div className="text-slate-400 text-lg mb-2">{title}</div>
      <div className="text-slate-500 text-sm mb-6">{description}</div>

      {action && (
        <button
          onClick={action.onClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
