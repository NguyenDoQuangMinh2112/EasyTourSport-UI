import React from 'react'
import type { User } from '../../hooks/use-permissions'
import { usePermissions } from '../../hooks/use-permissions'

interface PermissionGuardProps {
  user: User | null
  permission:
    | 'canEditLineup'
    | 'canViewLineup'
    | 'canManageTournament'
    | 'canSubmitFinalLineup'
    | 'canManageTeams'
    | 'canApproveTeams'
  targetTeamId?: string
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PermissionGuard({ user, permission, targetTeamId, children, fallback }: PermissionGuardProps) {
  const permissions = usePermissions(user)

  const hasPermission =
    typeof permissions[permission] === 'function'
      ? (permissions[permission] as (targetTeamId?: string) => boolean)(targetTeamId)
      : permissions[permission]

  if (!hasPermission) {
    return <>{fallback || null}</>
  }

  return <>{children}</>
}

// HOC wrapper for permission-based rendering
export function withPermission<T extends object>(
  Component: React.ComponentType<T>,
  permission: PermissionGuardProps['permission'],
  targetTeamId?: string,
  fallback?: React.ReactNode
) {
  return function PermissionWrappedComponent(props: T & { user: User | null }) {
    const { user, ...componentProps } = props

    return (
      <PermissionGuard user={user} permission={permission} targetTeamId={targetTeamId} fallback={fallback}>
        <Component {...(componentProps as T)} />
      </PermissionGuard>
    )
  }
}
