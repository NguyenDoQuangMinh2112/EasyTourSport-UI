import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Users,
  Trophy,
  Calendar,
  Star,
  Share2,
  Edit,
  Plus,
  Award,
  Target,
  BarChart3,
  User,
  Shield,
  MapPin,
  Medal,
  Activity,
  TrendingUp
} from 'lucide-react'
import { cn } from '../utils'

interface Player {
  id: string
  name: string
  position: string
  jerseyNumber: number
  age: number
  height?: number
  weight?: number
  avatar?: string
  stats: {
    matches: number
    goals?: number
    assists?: number
    yellowCards?: number
    redCards?: number
  }
  isCaptain: boolean
  isGoalkeeper: boolean
}

interface Team {
  id: string
  name: string
  logo?: string
  sport: string
  founded: string
  coach: string
  homeVenue: string
  description: string
  stats: {
    totalMatches: number
    wins: number
    draws: number
    losses: number
    goalsFor?: number
    goalsAgainst?: number
    points: number
    ranking: number
  }
  achievements: string[]
  currentTournaments: string[]
  players: Player[]
}

// Mock data
const MOCK_TEAM: Team = {
  id: '1',
  name: 'FC Barcelona Legends',
  sport: 'football',
  founded: '2020',
  coach: 'Nguyễn Văn A',
  homeVenue: 'Sân vận động Mỹ Đình',
  description:
    'Đội bóng chuyên nghiệp với đội hình mạnh và kinh nghiệm thi đấu phong phú. Chúng tôi luôn hướng đến việc phát triển bóng đá cộng đồng và đào tạo tài năng trẻ.',
  stats: {
    totalMatches: 45,
    wins: 28,
    draws: 12,
    losses: 5,
    goalsFor: 89,
    goalsAgainst: 32,
    points: 96,
    ranking: 2
  },
  achievements: ['Vô địch Premier League 2023', 'Á quân Cup Quốc gia 2023', 'Vô địch League Cup 2022'],
  currentTournaments: ['Premier League Championship 2024', 'National Cup 2024'],
  players: [
    {
      id: '1',
      name: 'Nguyễn Văn Nam',
      position: 'Thủ môn',
      jerseyNumber: 1,
      age: 28,
      height: 185,
      weight: 80,
      stats: {
        matches: 40,
        goals: 0,
        assists: 2,
        yellowCards: 3,
        redCards: 0
      },
      isCaptain: false,
      isGoalkeeper: true
    },
    {
      id: '2',
      name: 'Trần Minh Đức',
      position: 'Tiền đạo',
      jerseyNumber: 10,
      age: 25,
      height: 175,
      weight: 70,
      stats: {
        matches: 42,
        goals: 28,
        assists: 15,
        yellowCards: 5,
        redCards: 1
      },
      isCaptain: true,
      isGoalkeeper: false
    },
    {
      id: '3',
      name: 'Lê Hoàng Anh',
      position: 'Hậu vệ',
      jerseyNumber: 4,
      age: 26,
      height: 180,
      weight: 75,
      stats: {
        matches: 38,
        goals: 3,
        assists: 8,
        yellowCards: 7,
        redCards: 0
      },
      isCaptain: false,
      isGoalkeeper: false
    }
  ]
}

const SPORT_NAMES = {
  football: 'Bóng đá',
  badminton: 'Cầu lông',
  tabletennis: 'Bóng bàn',
  basketball: 'Bóng rổ',
  volleyball: 'Bóng chuyền'
}

export function TeamProfilePage() {
  const { teamId } = useParams()
  const navigate = useNavigate()
  const [team] = useState<Team>(MOCK_TEAM)
  const [activeTab, setActiveTab] = useState<'overview' | 'players' | 'stats' | 'matches'>('overview')

  const winRate = ((team.stats.wins / team.stats.totalMatches) * 100).toFixed(1)

  const handleEditTeam = () => {
    navigate(`/teams/${teamId}/edit`)
  }

  const handleViewPlayer = (playerId: string) => {
    navigate(`/players/${playerId}`)
  }

  const handleAddPlayer = () => {
    navigate(`/teams/${teamId}/players/add`)
  }

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: Target },
    { id: 'players', label: 'Cầu thủ', icon: Users },
    { id: 'stats', label: 'Thống kê', icon: BarChart3 },
    { id: 'matches', label: 'Trận đấu', icon: Calendar }
  ]

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Team Info */}
      <div className="bg-slate-800/30 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Thông tin đội</h3>
        <p className="text-slate-300 leading-relaxed mb-6">{team.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-sm text-slate-400">Thành lập</div>
                <div className="font-semibold text-white">{team.founded}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-sm text-slate-400">Huấn luyện viên</div>
                <div className="font-semibold text-white">{team.coach}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-red-400" />
              <div>
                <div className="text-sm text-slate-400">Sân nhà</div>
                <div className="font-semibold text-white">{team.homeVenue}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-sm text-slate-400">Số cầu thủ</div>
                <div className="font-semibold text-white">{team.players.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Tournaments */}
      <div className="bg-slate-800/30 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Giải đấu hiện tại</h3>
        <div className="space-y-3">
          {team.currentTournaments.map((tournament, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">{tournament}</span>
              </div>
              <div className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-sm">
                Đang tham gia
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-slate-800/30 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Thành tích</h3>
        <div className="space-y-3">
          {team.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-white">{achievement}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPlayers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Danh sách cầu thủ</h3>
        <button
          onClick={handleAddPlayer}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Thêm cầu thủ
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.players.map((player) => (
          <div
            key={player.id}
            onClick={() => handleViewPlayer(player.id)}
            className="bg-slate-800/30 rounded-xl p-4 hover:bg-slate-700/40 transition-all duration-200 cursor-pointer border border-slate-700/50 hover:border-slate-600"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {player.jerseyNumber}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{player.name}</span>
                  {player.isCaptain && <Shield className="w-4 h-4 text-yellow-400" />}
                </div>
                <div className="text-sm text-slate-400">{player.position}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-slate-400">Tuổi</div>
                <div className="text-white font-medium">{player.age}</div>
              </div>
              <div>
                <div className="text-slate-400">Trận đấu</div>
                <div className="text-white font-medium">{player.stats.matches}</div>
              </div>
              {player.stats.goals !== undefined && (
                <div>
                  <div className="text-slate-400">Bàn thắng</div>
                  <div className="text-white font-medium">{player.stats.goals}</div>
                </div>
              )}
              {player.stats.assists !== undefined && (
                <div>
                  <div className="text-slate-400">Kiến tạo</div>
                  <div className="text-white font-medium">{player.stats.assists}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderStats = () => (
    <div className="space-y-8">
      {/* Team Stats */}
      <div className="bg-slate-800/30 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Thống kê đội</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">{team.stats.totalMatches}</div>
            <div className="text-slate-400">Tổng trận</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{team.stats.wins}</div>
            <div className="text-slate-400">Thắng</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{team.stats.draws}</div>
            <div className="text-slate-400">Hòa</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">{team.stats.losses}</div>
            <div className="text-slate-400">Thua</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
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

        {team.sport === 'football' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">{team.stats.goalsFor}</div>
              <div className="text-slate-400">Bàn thắng ghi được</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400 mb-2">{team.stats.goalsAgainst}</div>
              <div className="text-slate-400">Bàn thắng thủng lưới</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-2">
                {(team.stats.goalsFor || 0) - (team.stats.goalsAgainst || 0) > 0 ? '+' : ''}
                {(team.stats.goalsFor || 0) - (team.stats.goalsAgainst || 0)}
              </div>
              <div className="text-slate-400">Hiệu số bàn thắng</div>
            </div>
          </div>
        )}
      </div>

      {/* Ranking */}
      <div className="bg-slate-800/30 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Xếp hạng hiện tại</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">#{team.stats.ranking}</span>
            </div>
            <div>
              <div className="text-xl font-semibold text-white">{team.stats.points} điểm</div>
              <div className="text-slate-400">Trong giải đấu hiện tại</div>
            </div>
          </div>
          <TrendingUp className="w-8 h-8 text-green-400" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Team Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{team.name}</h1>
                  <div className="flex items-center gap-4 text-slate-300">
                    <span>{SPORT_NAMES[team.sport as keyof typeof SPORT_NAMES]}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>#{team.stats.ranking}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleEditTeam}
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

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/30 rounded-xl p-4 text-center">
            <Activity className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{team.stats.totalMatches}</div>
            <div className="text-slate-400 text-sm">Tổng trận đấu</div>
          </div>
          <div className="bg-slate-800/30 rounded-xl p-4 text-center">
            <Trophy className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{team.stats.wins}</div>
            <div className="text-slate-400 text-sm">Chiến thắng</div>
          </div>
          <div className="bg-slate-800/30 rounded-xl p-4 text-center">
            <Medal className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{winRate}%</div>
            <div className="text-slate-400 text-sm">Tỷ lệ thắng</div>
          </div>
          <div className="bg-slate-800/30 rounded-xl p-4 text-center">
            <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{team.players.length}</div>
            <div className="text-slate-400 text-sm">Cầu thủ</div>
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
          {activeTab === 'players' && renderPlayers()}
          {activeTab === 'stats' && renderStats()}
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
