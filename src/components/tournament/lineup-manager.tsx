import { useState } from 'react'
import type { User } from '../../hooks/use-permissions'
import { PermissionGuard } from '../ui/permission-guard'
import FootballLineupDemo from './FootballLineupDemo'

interface LineupManagerProps {
  user: User | null
  teams: Array<{ id: string; name: string; captainId: string }>
}

// Component cho Captain - chỉ quản lý đội của mình
function CaptainLineupManager({ user }: { user: User }) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLocked] = useState(false)

  const handleSubmitLineup = () => {
    // TODO: API call to submit final lineup
    setIsSubmitted(true)
    console.log('Lineup submitted for team:', user.teamId)
  }

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      <div
        className={`rounded-lg p-4 ${
          isSubmitted ? 'bg-green-100 border-green-200' : 'bg-blue-100 border-blue-200'
        } border`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-semibold ${isSubmitted ? 'text-green-800' : 'text-blue-800'}`}>
              {isSubmitted ? 'Đội hình đã được gửi' : 'Đang soạn đội hình'}
            </h3>
            <p className={`text-sm ${isSubmitted ? 'text-green-600' : 'text-blue-600'}`}>
              {isSubmitted
                ? 'Đội hình của bạn đã được gửi và đang chờ phê duyệt'
                : 'Sắp xếp đội hình và gửi khi sẵn sàng'}
            </p>
          </div>
          {!isSubmitted && !isLocked && (
            <button
              onClick={handleSubmitLineup}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Gửi đội hình
            </button>
          )}
        </div>
      </div>

      {/* Lineup Editor */}
      <FootballLineupDemo readOnly={isLocked} />
    </div>
  )
}

// Component cho Admin - xem tất cả đội
function AdminLineupManager({ teams }: { teams: Array<{ id: string; name: string; captainId: string }> }) {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(teams[0]?.id || null)

  return (
    <div className="space-y-6">
      {/* Team Selector */}
      <div className="bg-white rounded-lg border p-4">
        <label htmlFor="team-select" className="block text-sm font-medium text-gray-700 mb-2">
          Chọn đội để xem đội hình
        </label>
        <select
          id="team-select"
          value={selectedTeam || ''}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>

      {/* Teams Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {teams.map((team) => (
          <div
            key={team.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedTeam === team.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedTeam(team.id)}
          >
            <h3 className="font-semibold text-gray-900 mb-2">{team.name}</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <div>Đội trưởng: {team.captainId}</div>
              <div className="flex items-center gap-2">
                <span>Trạng thái:</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Đã gửi
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Team Lineup */}
      {selectedTeam && (
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Đội hình: {teams.find((t) => t.id === selectedTeam)?.name}</h2>
          <FootballLineupDemo readOnly={true} />
        </div>
      )}
    </div>
  )
}

// Component cho Viewer - chỉ xem
function ViewerLineupDisplay({ teams }: { teams: Array<{ id: string; name: string; captainId: string }> }) {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(teams[0]?.id || null)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Đội hình các đội tham gia</h2>
        <p className="text-gray-600">Xem đội hình của các đội trong giải đấu</p>
      </div>

      {/* Team Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {teams.map((team) => (
            <button
              key={team.id}
              onClick={() => setSelectedTeam(team.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTeam === team.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {team.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Selected Team Lineup */}
      {selectedTeam && <FootballLineupDemo readOnly={true} />}
    </div>
  )
}

// Main Lineup Manager Component
export function LineupManager({ user, teams }: LineupManagerProps) {
  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Vui lòng đăng nhập để xem đội hình</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Role-based rendering */}
      <PermissionGuard user={user} permission="canManageTournament">
        <AdminLineupManager teams={teams} />
      </PermissionGuard>

      <PermissionGuard
        user={user}
        permission="canEditLineup"
        targetTeamId={user.teamId}
        fallback={
          <PermissionGuard user={user} permission="canViewLineup">
            <ViewerLineupDisplay teams={teams} />
          </PermissionGuard>
        }
      >
        <CaptainLineupManager user={user} />
      </PermissionGuard>
    </div>
  )
}
