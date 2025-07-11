import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Calendar,
  Share2,
  Edit,
  Award,
  Target,
  BarChart3,
  Shield,
  MapPin,
  Medal,
  Activity,
  TrendingUp,
  Users,
  Timer
} from 'lucide-react'
import { cn } from '@/utils'

interface PlayerStats {
  matches: number
  goals?: number
  assists?: number
  yellowCards?: number
  redCards?: number
  saves?: number // for goalkeepers
  cleanSheets?: number // for goalkeepers
  wins?: number
  draws?: number
  losses?: number
  minutesPlayed: number
}

interface Player {
  id: string
  name: string
  position: string
  jerseyNumber: number
  age: number
  height: number
  weight: number
  nationality: string
  joinDate: string
  avatar?: string
  biography: string
  team: {
    id: string
    name: string
  }
  stats: PlayerStats
  achievements: string[]
  isCaptain: boolean
  isGoalkeeper: boolean
  marketValue?: number
  strongFoot: 'left' | 'right' | 'both'
  previousClubs: string[]
}

// Mock data
const MOCK_PLAYER: Player = {
  id: '1',
  name: 'Trần Minh Đức',
  position: 'Tiền đạo',
  jerseyNumber: 10,
  age: 25,
  height: 175,
  weight: 70,
  nationality: 'Việt Nam',
  joinDate: '2022-01-15',
  biography:
    'Tiền đạo tài năng với khả năng ghi bàn xuất sắc và tầm nhìn chiến thuật tốt. Được biết đến với những pha dứt điểm chính xác và khả năng kiến tạo cho đồng đội.',
  team: {
    id: '1',
    name: 'FC Barcelona Legends'
  },
  stats: {
    matches: 42,
    goals: 28,
    assists: 15,
    yellowCards: 5,
    redCards: 1,
    wins: 28,
    draws: 8,
    losses: 6,
    minutesPlayed: 3420
  },
  achievements: [
    'Vua phá lưới Premier League 2023',
    'Cầu thủ xuất sắc nhất tháng (3 lần)',
    'Đội hình tiêu biểu Premier League 2023'
  ],
  isCaptain: true,
  isGoalkeeper: false,
  marketValue: 2500000000, // VND
  strongFoot: 'right',
  previousClubs: ['FC Youth Academy', 'Local City FC']
}

const POSITION_COLORS = {
  'Thủ môn': 'from-yellow-500 to-orange-500',
  'Hậu vệ': 'from-blue-500 to-cyan-500',
  'Tiền vệ': 'from-green-500 to-emerald-500',
  'Tiền đạo': 'from-red-500 to-pink-500'
}

export function PlayerProfilePage() {
  const { playerId } = useParams()
  const navigate = useNavigate()
  const [player] = useState<Player>(MOCK_PLAYER)
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'matches' | 'achievements'>('overview')

  const winRate =
    player.stats.wins && player.stats.matches ? ((player.stats.wins / player.stats.matches) * 100).toFixed(1) : '0'

  const averageGoalsPerMatch =
    player.stats.goals && player.stats.matches ? (player.stats.goals / player.stats.matches).toFixed(2) : '0'

  const handleEditPlayer = () => {
    navigate(`/players/${playerId}/edit`)
  }

  const handleViewTeam = () => {
    navigate(`/teams/${player.team.id}`)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: Target },
    { id: 'stats', label: 'Thống kê', icon: BarChart3 },
    { id: 'matches', label: 'Trận đấu', icon: Calendar },
    { id: 'achievements', label: 'Thành tích', icon: Award }
  ]

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Personal Info */}
      <div className="bg-slate-800/30 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Thông tin cá nhân</h3>
        <p className="text-slate-300 leading-relaxed mb-6">{player.biography}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-sm text-slate-400">Tuổi</div>
                <div className="font-semibold text-white">{player.age} tuổi</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-sm text-slate-400">Chiều cao / Cân nặng</div>
                <div className="font-semibold text-white">
                  {player.height}cm / {player.weight}kg
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-red-400" />
              <div>
                <div className="text-sm text-slate-400">Quốc tịch</div>
                <div className="font-semibold text-white">{player.nationality}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Timer className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-sm text-slate-400">Ngày gia nhập</div>
                <div className="font-semibold text-white">{new Date(player.joinDate).toLocaleDateString('vi-VN')}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="text-sm text-slate-400">Chân thuận</div>
                <div className="font-semibold text-white">
                  {player.strongFoot === 'left' ? 'Trái' : player.strongFoot === 'right' ? 'Phải' : 'Cả hai'}
                </div>
              </div>
            </div>
            {player.marketValue && (
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-sm text-slate-400">Giá trị chuyển nhượng</div>
                  <div className="font-semibold text-white">{formatCurrency(player.marketValue)}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Current Team */}
      <div className="bg-slate-800/30 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Đội bóng hiện tại</h3>
        <div
          onClick={handleViewTeam}
          className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-600/30 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              {player.jerseyNumber}
            </div>
            <div>
              <div className="font-semibold text-white">{player.team.name}</div>
              <div className="text-slate-400">{player.position}</div>
            </div>
          </div>
          {player.isCaptain && (
            <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-sm">
              <Shield className="w-4 h-4" />
              Đội trưởng
            </div>
          )}
        </div>
      </div>

      {/* Previous Clubs */}
      {player.previousClubs.length > 0 && (
        <div className="bg-slate-800/30 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Các đội bóng từng khoác áo</h3>
          <div className="space-y-2">
            {player.previousClubs.map((club, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                <Users className="w-5 h-5 text-slate-400" />
                <span className="text-white">{club}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderStats = () => (
    <div className="space-y-8">
      {/* Performance Stats */}
      <div className="bg-slate-800/30 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Thống kê thi đấu</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">{player.stats.matches}</div>
            <div className="text-slate-400">Trận đấu</div>
          </div>
          {player.stats.goals !== undefined && (
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{player.stats.goals}</div>
              <div className="text-slate-400">Bàn thắng</div>
            </div>
          )}
          {player.stats.assists !== undefined && (
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{player.stats.assists}</div>
              <div className="text-slate-400">Kiến tạo</div>
            </div>
          )}
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">{Math.round(player.stats.minutesPlayed / 60)}</div>
            <div className="text-slate-400">Giờ thi đấu</div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-300">Tỷ lệ thắng</span>
              <span className="text-white font-semibold">{winRate}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${winRate}%` }}
              />
            </div>
          </div>

          {player.stats.goals !== undefined && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300">Trung bình bàn thắng/trận</span>
                <span className="text-white font-semibold">{averageGoalsPerMatch}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${Math.min(parseFloat(averageGoalsPerMatch) * 50, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Disciplinary Record */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">{player.stats.wins || 0}</div>
            <div className="text-slate-400">Thắng</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-2">{player.stats.yellowCards || 0}</div>
            <div className="text-slate-400">Thẻ vàng</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400 mb-2">{player.stats.redCards || 0}</div>
            <div className="text-slate-400">Thẻ đỏ</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAchievements = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">Thành tích cá nhân</h3>
      <div className="space-y-4">
        {player.achievements.map((achievement, index) => (
          <div key={index} className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-white">{achievement}</div>
              <div className="text-slate-400 text-sm">Thành tích xuất sắc</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Player Info */}
            <div className="flex-1">
              <div className="flex items-center gap-6 mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl">
                  {player.jerseyNumber}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{player.name}</h1>
                  <div className="flex items-center gap-4 text-slate-300">
                    <span className="flex items-center gap-2">
                      <div
                        className={cn(
                          'w-3 h-3 rounded-full bg-gradient-to-r',
                          POSITION_COLORS[player.position as keyof typeof POSITION_COLORS] ||
                            'from-gray-500 to-gray-600'
                        )}
                      />
                      {player.position}
                    </span>
                    <span className="cursor-pointer hover:text-blue-400 transition-colors" onClick={handleViewTeam}>
                      {player.team.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleEditPlayer}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
                Chỉnh sửa
              </button>
              <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors">
                <Share2 className="w-4 h-4" />
                Chia sẻ
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/30 rounded-xl p-4 text-center">
            <Activity className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{player.stats.matches}</div>
            <div className="text-slate-400 text-sm">Trận đấu</div>
          </div>
          {player.stats.goals !== undefined && (
            <div className="bg-slate-800/30 rounded-xl p-4 text-center">
              <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{player.stats.goals}</div>
              <div className="text-slate-400 text-sm">Bàn thắng</div>
            </div>
          )}
          {player.stats.assists !== undefined && (
            <div className="bg-slate-800/30 rounded-xl p-4 text-center">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{player.stats.assists}</div>
              <div className="text-slate-400 text-sm">Kiến tạo</div>
            </div>
          )}
          <div className="bg-slate-800/30 rounded-xl p-4 text-center">
            <Medal className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{winRate}%</div>
            <div className="text-slate-400 text-sm">Tỷ lệ thắng</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex items-center space-x-1 bg-slate-800/30 rounded-xl p-1 overflow-x-auto">
            {tabs.map((tab) => {
              const TabIcon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-all duration-200',
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  )}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'stats' && renderStats()}
          {activeTab === 'achievements' && renderAchievements()}
          {activeTab === 'matches' && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <div className="text-slate-400 text-lg mb-2">Lịch sử trận đấu</div>
              <div className="text-slate-500 text-sm">Đang phát triển...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
