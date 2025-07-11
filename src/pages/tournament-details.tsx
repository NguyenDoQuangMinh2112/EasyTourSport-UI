import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Star,
  Share2,
  Download,
  Play,
  Eye,
  BarChart3,
  Target,
  Award,
  UserPlus,
  Timer,
  Medal
} from 'lucide-react'
import { cn } from '../utils'

interface Tournament {
  id: string
  name: string
  sport: string
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  startDate: string
  endDate: string
  registrationDeadline: string
  venue: string
  description: string
  prize: string
  maxTeams: number
  registeredTeams: number
  format: string
  rules: string
  organizer: {
    name: string
    avatar?: string
    verified: boolean
  }
  stats: {
    totalMatches: number
    completedMatches: number
    totalGoals?: number
    averageScore?: number
  }
  featured: boolean
  tags: string[]
}

// Mock data
const MOCK_TOURNAMENT: Tournament = {
  id: '1',
  name: 'Premier League Championship 2024',
  sport: 'football',
  status: 'ongoing',
  startDate: '2024-08-15',
  endDate: '2024-12-20',
  registrationDeadline: '2024-08-10',
  venue: 'Sân vận động Mỹ Đình, Hà Nội',
  description:
    'Giải đấu bóng đá chuyên nghiệp hàng đầu Việt Nam với sự tham gia của các đội bóng mạnh nhất cả nước. Đây là cơ hội tuyệt vời để các cầu thủ thể hiện tài năng và các đội bóng tranh tài.',
  prize: '1,000,000,000 VND',
  maxTeams: 16,
  registeredTeams: 14,
  format: 'Vòng tròn tính điểm + Play-off',
  rules: 'Theo quy định của FIFA và VFF',
  organizer: {
    name: 'Liên đoàn Bóng đá Việt Nam',
    verified: true
  },
  stats: {
    totalMatches: 56,
    completedMatches: 28,
    totalGoals: 142,
    averageScore: 2.5
  },
  featured: true,
  tags: ['Professional', 'Championship', 'Prize Money', 'Live Stream']
}

const STATUS_CONFIG = {
  upcoming: {
    label: 'Sắp diễn ra',
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    icon: Calendar
  },
  ongoing: {
    label: 'Đang diễn ra',
    color: 'bg-green-500/20 text-green-400 border-green-500/30',
    icon: Play
  },
  completed: {
    label: 'Đã kết thúc',
    color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    icon: Trophy
  },
  cancelled: {
    label: 'Đã hủy',
    color: 'bg-red-500/20 text-red-400 border-red-500/30',
    icon: Target
  }
}

const SPORT_NAMES = {
  football: 'Bóng đá',
  badminton: 'Cầu lông',
  tabletennis: 'Bóng bàn',
  basketball: 'Bóng rổ',
  volleyball: 'Bóng chuyền'
}

export function TournamentDetailsPage() {
  const { tournamentId } = useParams()
  const navigate = useNavigate()
  const [tournament] = useState<Tournament>(MOCK_TOURNAMENT)
  const [activeTab, setActiveTab] = useState<'overview' | 'teams' | 'matches' | 'standings' | 'stats'>('overview')

  const StatusIcon = STATUS_CONFIG[tournament.status].icon
  const progress = (tournament.stats.completedMatches / tournament.stats.totalMatches) * 100

  const handleJoinTournament = () => {
    // Navigate to registration page
    navigate(`/tournaments/${tournamentId}/register`)
  }

  const handleViewMatches = () => {
    navigate('/matches', { state: { tournamentFilter: tournamentId } })
  }

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: Eye },
    { id: 'teams', label: 'Đội tham gia', icon: Users },
    { id: 'matches', label: 'Lịch thi đấu', icon: Calendar },
    { id: 'standings', label: 'Bảng xếp hạng', icon: Trophy },
    { id: 'stats', label: 'Thống kê', icon: BarChart3 }
  ]

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Description */}
      <div className="bg-slate-800/30 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Mô tả giải đấu</h3>
        <p className="text-slate-300 leading-relaxed mb-6">{tournament.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="text-sm text-slate-400">Giải thưởng</div>
                <div className="font-semibold text-white">{tournament.prize}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-sm text-slate-400">Số đội tham gia</div>
                <div className="font-semibold text-white">
                  {tournament.registeredTeams}/{tournament.maxTeams}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-sm text-slate-400">Thể thức</div>
                <div className="font-semibold text-white">{tournament.format}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-sm text-slate-400">Thời gian</div>
                <div className="font-semibold text-white">
                  {new Date(tournament.startDate).toLocaleDateString('vi-VN')} -{' '}
                  {new Date(tournament.endDate).toLocaleDateString('vi-VN')}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-red-400" />
              <div>
                <div className="text-sm text-slate-400">Địa điểm</div>
                <div className="font-semibold text-white">{tournament.venue}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Timer className="w-5 h-5 text-orange-400" />
              <div>
                <div className="text-sm text-slate-400">Hạn đăng ký</div>
                <div className="font-semibold text-white">
                  {new Date(tournament.registrationDeadline).toLocaleDateString('vi-VN')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tournament Progress */}
      <div className="bg-slate-800/30 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Tiến độ giải đấu</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Đã hoàn thành</span>
            <span className="text-white font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{tournament.stats.totalMatches}</div>
              <div className="text-sm text-slate-400">Tổng trận đấu</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{tournament.stats.completedMatches}</div>
              <div className="text-sm text-slate-400">Đã hoàn thành</div>
            </div>
            {tournament.stats.totalGoals && (
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{tournament.stats.totalGoals}</div>
                <div className="text-sm text-slate-400">Tổng bàn thắng</div>
              </div>
            )}
            {tournament.stats.averageScore && (
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{tournament.stats.averageScore}</div>
                <div className="text-sm text-slate-400">TB bàn thắng/trận</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="bg-slate-800/30 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Quy định</h3>
        <p className="text-slate-300">{tournament.rules}</p>
      </div>

      {/* Tags */}
      <div className="bg-slate-800/30 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Đặc điểm</h3>
        <div className="flex flex-wrap gap-2">
          {tournament.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
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
            {/* Tournament Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={cn(
                    'flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium',
                    STATUS_CONFIG[tournament.status].color
                  )}
                >
                  <StatusIcon className="w-4 h-4" />
                  {STATUS_CONFIG[tournament.status].label}
                </div>

                {tournament.featured && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-sm">
                    <Star className="w-4 h-4" />
                    Nổi bật
                  </div>
                )}

                <span className="text-slate-400 text-sm">
                  {SPORT_NAMES[tournament.sport as keyof typeof SPORT_NAMES]}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-white mb-4">{tournament.name}</h1>

              <div className="flex items-center gap-4 text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Ban tổ chức</div>
                    <div className="font-medium">{tournament.organizer.name}</div>
                  </div>
                  {tournament.organizer.verified && (
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Medal className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 lg:w-80">
              {tournament.status === 'upcoming' && (
                <button
                  onClick={handleJoinTournament}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-6 py-3 rounded-xl hover:scale-105 transition-all duration-200"
                >
                  <UserPlus className="w-5 h-5" />
                  Đăng ký tham gia
                </button>
              )}

              <button
                onClick={handleViewMatches}
                className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <Eye className="w-5 h-5" />
                Xem lịch thi đấu
              </button>

              <div className="flex gap-2">
                <button className="flex items-center justify-center gap-2 bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-lg hover:bg-slate-700/50 transition-colors flex-1">
                  <Share2 className="w-4 h-4" />
                  Chia sẻ
                </button>
                <button className="flex items-center justify-center gap-2 bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-lg hover:bg-slate-700/50 transition-colors flex-1">
                  <Download className="w-4 h-4" />
                  Tải về
                </button>
              </div>
            </div>
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
          {activeTab === 'teams' && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <div className="text-slate-400 text-lg mb-2">Danh sách đội tham gia</div>
              <div className="text-slate-500 text-sm">Đang phát triển...</div>
            </div>
          )}
          {activeTab === 'matches' && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <div className="text-slate-400 text-lg mb-2">Lịch thi đấu chi tiết</div>
              <div className="text-slate-500 text-sm">Đang phát triển...</div>
            </div>
          )}
          {activeTab === 'standings' && (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <div className="text-slate-400 text-lg mb-2">Bảng xếp hạng</div>
              <div className="text-slate-500 text-sm">Đang phát triển...</div>
            </div>
          )}
          {activeTab === 'stats' && (
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <div className="text-slate-400 text-lg mb-2">Thống kê chi tiết</div>
              <div className="text-slate-500 text-sm">Đang phát triển...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
