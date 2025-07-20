import React from 'react'
import type { User } from '../../hooks/use-permissions'
import { UserRole } from '../../hooks/use-permissions'

interface RoleBadgeProps {
  role: string
  size?: 'sm' | 'md' | 'lg'
}

export function RoleBadge({ role, size = 'md' }: RoleBadgeProps) {
  const getRoleStyle = (role: string) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-red-100 text-red-800 border-red-200'
      case UserRole.CAPTAIN:
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case UserRole.PLAYER:
        return 'bg-green-100 text-green-800 border-green-200'
      case UserRole.VIEWER:
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'Quản trị viên'
      case UserRole.CAPTAIN:
        return 'Đội trưởng'
      case UserRole.PLAYER:
        return 'Cầu thủ'
      case UserRole.VIEWER:
        return 'Khán giả'
      default:
        return 'Không xác định'
    }
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${getRoleStyle(role)} ${sizeClasses[size]}`}
    >
      {getRoleLabel(role)}
    </span>
  )
}

interface UserCardProps {
  user: User
  showTeam?: boolean
  actions?: React.ReactNode
}

export function UserCard({ user, showTeam = true, actions }: UserCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{user.name}</h3>
              {showTeam && user.teamId && <p className="text-sm text-gray-500">Đội: {user.teamId}</p>}
            </div>
          </div>
          <RoleBadge role={user.role} />
        </div>
        {actions && <div className="ml-4">{actions}</div>}
      </div>
    </div>
  )
}
