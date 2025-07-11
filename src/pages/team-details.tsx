import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, Trophy, Calendar, Target, Shield, Edit, Phone, Mail } from 'lucide-react'
import { cn } from '../utils'

interface Player {
  id: string
  name: string
  jerseyNumber: number
  position: 'GK' | 'DF' | 'MF' | 'FW'
  age: number
  height: number
  weight: number
  isCaptain: boolean
  isViceCaptain: boolean
  phone?: string
  email?: string
  goals?: number
  assists?: number
  yellowCards?: number
  redCards?: number
  matchesPlayed?: number
}

interface TeamStats {
  matches: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
  position: number
}

interface TeamDetails {
  id: string
  name: string
  logo?: string
  foundedYear: number
  manager: string
  captain: string
  contact: string
  email?: string
  description?: string
  players: Player[]
  stats: TeamStats
  status: 'pending' | 'confirmed' | 'rejected'
}

const MOCK_TEAM: TeamDetails = {
  id: '1',
  name: 'FC Barcelona',
  foundedYear: 2020,
  manager: 'HLV Nguyễn Văn A',
  captain: 'Trần Văn B',
  contact: '0123456789',
  email: 'contact@fcbarcelona.vn',
  description:
    'Đội bóng đá chuyên nghiệp với lối chơi tiki-taka đặc trưng. Chúng tôi luôn hướng tới sự hoàn hảo và fair play trong mọi trận đấu.',
  players: [
    {
      id: '1',
      name: 'Nguyễn Văn A',
      jerseyNumber: 1,
      position: 'GK',
      age: 25,
      height: 185,
      weight: 80,
      isCaptain: false,
      isViceCaptain: false,
      phone: '0123456789',
      email: 'gk@team.com',
      goals: 0,
      assists: 2,
      yellowCards: 1,
      redCards: 0,
      matchesPlayed: 15
    },
    {
      id: '2',
      name: 'Trần Văn B',
      jerseyNumber: 10,
      position: 'MF',
      age: 28,
      height: 175,
      weight: 72,
      isCaptain: true,
      isViceCaptain: false,
      phone: '0123456790',
      email: 'captain@team.com',
      goals: 8,
      assists: 12,
      yellowCards: 3,
      redCards: 0,
      matchesPlayed: 15
    },
    {
      id: '3',
      name: 'Lê Văn C',
      jerseyNumber: 9,
      position: 'FW',
      age: 26,
      height: 180,
      weight: 75,
      isCaptain: false,
      isViceCaptain: true,
      phone: '0123456791',
      email: 'striker@team.com',
      goals: 15,
      assists: 5,
      yellowCards: 2,
      redCards: 1,
      matchesPlayed: 14
    },
    {
      id: '4',
      name: 'Phạm Văn D',
      jerseyNumber: 4,
      position: 'DF',
      age: 24,
      height: 178,
      weight: 73,
      isCaptain: false,
      isViceCaptain: false,
      phone: '0123456792',
      email: 'defender@team.com',
      goals: 2,
      assists: 3,
      yellowCards: 4,
      redCards: 0,
      matchesPlayed: 15
    },
    {
      id: '5',
      name: 'Hoàng Văn E',
      jerseyNumber: 7,
      position: 'MF',
      age: 27,
      height: 172,
      weight: 70,
      isCaptain: false,
      isViceCaptain: false,
      phone: '0123456793',
      email: 'midfielder@team.com',
      goals: 6,
      assists: 9,
      yellowCards: 2,
      redCards: 0,
      matchesPlayed: 13
    }
  ],
  stats: {
    matches: 15,
    wins: 12,
    draws: 2,
    losses: 1,
    goalsFor: 45,
    goalsAgainst: 15,
    goalDifference: 30,
    points: 38,
    position: 1
  },
  status: 'confirmed'
}

const POSITION_COLORS = {
  GK: 'bg-red-500',
  DF: 'bg-blue-500',
  MF: 'bg-green-500',
  FW: 'bg-purple-500'
}

const POSITION_NAMES = {
  GK: 'Thủ môn',
  DF: 'Hậu vệ',
  MF: 'Tiền vệ',
  FW: 'Tiền đạo'
}

export function TeamDetailsPage() {
  const { teamId } = useParams<{ teamId: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'overview' | 'players' | 'stats' | 'matches'>('overview')

  // In real app, fetch team data based on teamId
  const team = MOCK_TEAM

  // Prevent unused variable warning - will be used when implementing real data fetching
  void teamId

  const getPositionStats = () => {
    return team.players.reduce((acc, player) => {
      acc[player.position] = (acc[player.position] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }

  const getTopScorer = () => {
    return team.players.reduce((top, player) => ((player.goals || 0) > (top.goals || 0) ? player : top))
  }

  const getTopAssister = () => {
    return team.players.reduce((top, player) => ((player.assists || 0) > (top.assists || 0) ? player : top))
  }

  const positionStats = getPositionStats()
  const topScorer = getTopScorer()
  const topAssister = getTopAssister()

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Team Info */}
      <div className="bg-slate-700/50 rounded-xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Thông tin đội</h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Năm thành lập:</span>
                <span className="text-white">{team.foundedYear}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Huấn luyện viên:</span>
                <span className="text-white">{team.manager}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Đội trưởng:</span>
                <span className="text-white">{team.captain}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Số cầu thủ:</span>
                <span className="text-white">{team.players.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Trạng thái:</span>
                <span
                  className={cn(
                    'font-medium',
                    team.status === 'confirmed' && 'text-green-400',
                    team.status === 'pending' && 'text-yellow-400',
                    team.status === 'rejected' && 'text-red-400'
                  )}
                >
                  {team.status === 'confirmed' && 'Đã xác nhận'}
                  {team.status === 'pending' && 'Chờ duyệt'}
                  {team.status === 'rejected' && 'Từ chối'}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-600">
              <h4 className="font-medium text-white mb-3">Liên hệ</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">{team.contact}</span>
                </div>
                {team.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">{team.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Thành tích hiện tại</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-slate-600/30 rounded-lg">
                <div className="text-2xl font-bold text-white">{team.stats.position}</div>
                <div className="text-sm text-slate-400">Vị trí</div>
              </div>
              <div className="text-center p-4 bg-slate-600/30 rounded-lg">
                <div className="text-2xl font-bold text-white">{team.stats.points}</div>
                <div className="text-sm text-slate-400">Điểm</div>
              </div>
              <div className="text-center p-4 bg-slate-600/30 rounded-lg">
                <div className="text-2xl font-bold text-white">{team.stats.goalsFor}</div>
                <div className="text-sm text-slate-400">Bàn thắng</div>
              </div>
              <div className="text-center p-4 bg-slate-600/30 rounded-lg">
                <div className="text-2xl font-bold text-white">{team.stats.goalsAgainst}</div>
                <div className="text-sm text-slate-400">Bàn thua</div>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="font-medium text-white mb-3">Vị trí cầu thủ</h4>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(POSITION_NAMES).map(([key, name]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className={cn('w-3 h-3 rounded-full', POSITION_COLORS[key as keyof typeof POSITION_COLORS])} />
                    <span className="text-slate-300 text-sm">
                      {name}: {positionStats[key] || 0}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {team.description && (
          <div className="mt-6 pt-6 border-t border-slate-600">
            <h4 className="font-medium text-white mb-3">Giới thiệu đội</h4>
            <p className="text-slate-300 leading-relaxed">{team.description}</p>
          </div>
        )}
      </div>

      {/* Top Players */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-700/50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-400" />
            Vua phá lưới
          </h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
              {topScorer.jerseyNumber}
            </div>
            <div className="flex-1">
              <div className="font-medium text-white">{topScorer.name}</div>
              <div className="text-sm text-slate-400">{POSITION_NAMES[topScorer.position]}</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-400">{topScorer.goals}</div>
              <div className="text-xs text-slate-400">bàn thắng</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-700/50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            Vua kiến tạo
          </h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {topAssister.jerseyNumber}
            </div>
            <div className="flex-1">
              <div className="font-medium text-white">{topAssister.name}</div>
              <div className="text-sm text-slate-400">{POSITION_NAMES[topAssister.position]}</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-400">{topAssister.assists}</div>
              <div className="text-xs text-slate-400">kiến tạo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPlayersTab = () => (
    <div className="space-y-6">
      <div className="bg-slate-700/50 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-600">
          <h3 className="text-xl font-bold text-white">Danh sách cầu thủ</h3>
          <p className="text-slate-400 text-sm mt-1">{team.players.length} cầu thủ</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-600/30">
              <tr>
                <th className="text-left p-4 text-slate-300 font-medium">Số áo</th>
                <th className="text-left p-4 text-slate-300 font-medium">Tên cầu thủ</th>
                <th className="text-left p-4 text-slate-300 font-medium">Vị trí</th>
                <th className="text-left p-4 text-slate-300 font-medium">Tuổi</th>
                <th className="text-left p-4 text-slate-300 font-medium">Trận đấu</th>
                <th className="text-left p-4 text-slate-300 font-medium">Bàn thắng</th>
                <th className="text-left p-4 text-slate-300 font-medium">Kiến tạo</th>
                <th className="text-left p-4 text-slate-300 font-medium">Thẻ</th>
                <th className="text-left p-4 text-slate-300 font-medium">Vai trò</th>
              </tr>
            </thead>
            <tbody>
              {team.players.map((player) => (
                <tr key={player.id} className="border-b border-slate-600/50 hover:bg-slate-600/20">
                  <td className="p-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {player.jerseyNumber}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-white">{player.name}</div>
                    <div className="text-xs text-slate-400">{player.phone}</div>
                  </td>
                  <td className="p-4">
                    <span
                      className={cn(
                        'px-2 py-1 rounded text-xs font-medium text-white',
                        POSITION_COLORS[player.position]
                      )}
                    >
                      {POSITION_NAMES[player.position]}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300">{player.age}</td>
                  <td className="p-4 text-slate-300">{player.matchesPlayed || 0}</td>
                  <td className="p-4 text-slate-300">{player.goals || 0}</td>
                  <td className="p-4 text-slate-300">{player.assists || 0}</td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      {(player.yellowCards || 0) > 0 && (
                        <div className="w-3 h-4 bg-yellow-400 rounded-sm flex items-center justify-center text-xs text-black font-bold">
                          {player.yellowCards}
                        </div>
                      )}
                      {(player.redCards || 0) > 0 && (
                        <div className="w-3 h-4 bg-red-500 rounded-sm flex items-center justify-center text-xs text-white font-bold">
                          {player.redCards}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      {player.isCaptain && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">
                          <Shield className="w-3 h-3" />C
                        </span>
                      )}
                      {player.isViceCaptain && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs">
                          <Shield className="w-3 h-3" />
                          VC
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderStatsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-700/50 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">{team.stats.wins}</div>
          <div className="text-slate-400">Thắng</div>
        </div>
        <div className="bg-slate-700/50 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-yellow-400 mb-2">{team.stats.draws}</div>
          <div className="text-slate-400">Hòa</div>
        </div>
        <div className="bg-slate-700/50 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-red-400 mb-2">{team.stats.losses}</div>
          <div className="text-slate-400">Thua</div>
        </div>
        <div className="bg-slate-700/50 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {((team.stats.wins / team.stats.matches) * 100).toFixed(1)}%
          </div>
          <div className="text-slate-400">Tỷ lệ thắng</div>
        </div>
      </div>

      <div className="bg-slate-700/50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Phong độ gần đây</h3>
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <div className="text-slate-400 text-lg mb-2">Chức năng đang phát triển</div>
          <div className="text-slate-500 text-sm">Thống kê chi tiết sẽ được cập nhật sớm</div>
        </div>
      </div>
    </div>
  )

  const renderMatchesTab = () => (
    <div className="space-y-6">
      <div className="bg-slate-700/50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Lịch thi đấu</h3>
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <div className="text-slate-400 text-lg mb-2">Chức năng đang phát triển</div>
          <div className="text-slate-500 text-sm">Lịch thi đấu chi tiết sẽ được cập nhật sớm</div>
        </div>
      </div>
    </div>
  )

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: Users },
    { id: 'players', label: 'Cầu thủ', icon: Users },
    { id: 'stats', label: 'Thống kê', icon: Trophy },
    { id: 'matches', label: 'Trận đấu', icon: Calendar }
  ]

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">{team.name}</h1>
            <p className="text-slate-400">Thông tin chi tiết đội bóng</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
            <Edit className="w-4 h-4" />
            Chỉnh sửa
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-slate-700">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={cn(
                    'flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors',
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-300'
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'players' && renderPlayersTab()}
          {activeTab === 'stats' && renderStatsTab()}
          {activeTab === 'matches' && renderMatchesTab()}
        </div>
      </div>
    </div>
  )
}
