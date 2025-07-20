import { useMemo } from 'react'

export const UserRole = {
  ADMIN: 'admin',
  CAPTAIN: 'captain',
  PLAYER: 'player',
  VIEWER: 'viewer'
} as const

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole]

export interface User {
  id: string
  name: string
  role: UserRoleType
  teamId?: string
}

export const usePermissions = (user: User | null) => {
  return useMemo(() => {
    if (!user) {
      return {
        canEditLineup: () => false,
        canViewLineup: true,
        canManageTournament: false,
        canSubmitFinalLineup: () => false,
        canManageTeams: false,
        canApproveTeams: false
      }
    }

    return {
      canEditLineup: (targetTeamId?: string) =>
        user.role === UserRole.ADMIN || (user.role === UserRole.CAPTAIN && user.teamId === targetTeamId),

      canViewLineup: true,

      canManageTournament: user.role === UserRole.ADMIN,

      canSubmitFinalLineup: (targetTeamId?: string) => user.role === UserRole.CAPTAIN && user.teamId === targetTeamId,

      canManageTeams: user.role === UserRole.ADMIN,

      canApproveTeams: user.role === UserRole.ADMIN
    }
  }, [user])
}
