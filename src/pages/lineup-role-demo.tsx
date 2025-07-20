import { useState } from 'react'
import type { User } from '../hooks/use-permissions'
import { UserRole } from '../hooks/use-permissions'
import { LineupManager } from '../components/tournament/lineup-manager'
import { RoleBadge, UserCard } from '../components/ui/role-badge'

// Mock data for demonstration
const mockUsers: (User & { avatar: string })[] = [
  {
    id: '1',
    name: 'Nguyễn Văn Admin',
    role: UserRole.ADMIN,
    teamId: undefined,
    avatar: '👨‍💼'
  },
  {
    id: '2',
    name: 'Trần Thị Captain',
    role: UserRole.CAPTAIN,
    teamId: 'team-1',
    avatar: '👩‍🎓'
  },
  {
    id: '3',
    name: 'Lê Văn Player',
    role: UserRole.PLAYER,
    teamId: 'team-1',
    avatar: '⚽'
  },
  {
    id: '4',
    name: 'Phạm Thị Viewer',
    role: UserRole.VIEWER,
    teamId: undefined,
    avatar: '👀'
  }
]

const mockTeams = [
  { id: 'team-1', name: 'FC Barcelona', captainId: '2' },
  { id: 'team-2', name: 'Real Madrid', captainId: '5' },
  { id: 'team-3', name: 'Manchester United', captainId: '6' },
  { id: 'team-4', name: 'Liverpool FC', captainId: '7' }
]

export default function LineupRoleDemo() {
  const [currentUser, setCurrentUser] = useState<User & { avatar: string }>(mockUsers[0])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Hệ thống quản lý đội hình theo vai trò</h1>
          <p className="text-slate-300 text-lg">Demo hệ thống phân quyền cho quản lý đội hình bóng đá</p>
        </div>

        {/* User Selector */}
        <div className="bg-slate-800/50 rounded-xl p-6 mb-8 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">Chọn vai trò để xem:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setCurrentUser(user)}
                className={`cursor-pointer transition-all duration-200 ${
                  currentUser.id === user.id ? 'ring-2 ring-blue-500 scale-105' : 'hover:scale-102'
                }`}
              >
                <UserCard user={user} />
              </div>
            ))}
          </div>
        </div>

        {/* Current User Info */}
        <div className="bg-slate-800/30 rounded-xl p-4 mb-8 border border-slate-700">
          <div className="flex items-center gap-4">
            <span className="text-2xl">{currentUser.avatar}</span>
            <div>
              <h3 className="text-white font-semibold text-lg">{currentUser.name}</h3>
              <div className="flex items-center gap-2">
                <RoleBadge role={currentUser.role} />
                {currentUser.teamId && (
                  <span className="text-slate-400 text-sm">
                    • Đội: {mockTeams.find((t) => t.id === currentUser.teamId)?.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Role-specific permissions info */}
        <div className="bg-slate-800/50 rounded-xl p-6 mb-8 border border-slate-700">
          <h3 className="text-white font-semibold mb-3">Quyền hạn hiện tại:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div
              className={`p-3 rounded-lg ${
                currentUser.role === UserRole.ADMIN
                  ? 'bg-green-900/30 border border-green-500/30 text-green-400'
                  : 'bg-slate-700/30 border border-slate-600/30 text-slate-500'
              }`}
            >
              <div className="font-semibold mb-1">🔧 Quản lý giải đấu</div>
              <div>Xem tất cả đội hình, chỉnh sửa giải đấu</div>
            </div>
            <div
              className={`p-3 rounded-lg ${
                currentUser.role === UserRole.CAPTAIN
                  ? 'bg-blue-900/30 border border-blue-500/30 text-blue-400'
                  : 'bg-slate-700/30 border border-slate-600/30 text-slate-500'
              }`}
            >
              <div className="font-semibold mb-1">⚽ Chỉnh sửa đội hình</div>
              <div>Sắp xếp đội hình cho đội của mình</div>
            </div>
            <div
              className={`p-3 rounded-lg ${
                currentUser.role === UserRole.PLAYER || currentUser.role === UserRole.VIEWER
                  ? 'bg-purple-900/30 border border-purple-500/30 text-purple-400'
                  : 'bg-slate-700/30 border border-slate-600/30 text-slate-500'
              }`}
            >
              <div className="font-semibold mb-1">👁️ Xem đội hình</div>
              <div>Xem đội hình của các đội tham gia</div>
            </div>
          </div>
        </div>

        {/* Main Lineup Manager */}
        <LineupManager user={currentUser} teams={mockTeams} />

        {/* Instructions */}
        <div className="mt-8 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <h3 className="text-white font-semibold mb-3">Hướng dẫn sử dụng:</h3>
          <div className="space-y-2 text-slate-300 text-sm">
            <div>
              <strong>Admin:</strong> Có thể xem đội hình của tất cả các đội, chuyển đổi giữa các đội để xem
            </div>
            <div>
              <strong>Captain:</strong> Chỉ có thể chỉnh sửa đội hình của đội mình, có thể gửi đội hình cuối cùng
            </div>
            <div>
              <strong>Player:</strong> Chỉ có thể xem đội hình của các đội, không thể chỉnh sửa
            </div>
            <div>
              <strong>Viewer:</strong> Chỉ có thể xem đội hình, có giao diện tab để chuyển đổi giữa các đội
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
