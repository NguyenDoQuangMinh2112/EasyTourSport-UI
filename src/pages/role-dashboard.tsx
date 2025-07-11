import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users,
  Trophy,
  Calendar,
  BarChart3,
  Settings,
  Bell,
  Plus,
  TrendingUp,
  UserPlus,
  Activity,
  Zap
} from 'lucide-react'
import { cn } from '../utils'

type UserRole = 'user' | 'organizer'

interface DashboardStats {
  tournaments: number
  matches: number
  teams: number
  players: number
  revenue?: number
  activeUsers?: number
}

interface Tournament {
  id: string
  name: string
  sport: string
  status: 'upcoming' | 'ongoing' | 'completed'
  startDate: string
  participants: number
  maxParticipants: number
}

interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  date: string
  time: string
  status: 'scheduled' | 'ongoing' | 'completed'
  tournamentName: string
}

// Mock data
const MOCK_STATS: Record<UserRole, DashboardStats> = {
  user: {
    tournaments: 5,
    matches: 23,
    teams: 2,
    players: 15
  },
  organizer: {
    tournaments: 12,
    matches: 156,
    teams: 48,
    players: 540,
    revenue: 125000000
  }
}

const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: '1',
    name: 'Premier League Championship 2024',
    sport: 'football',
    status: 'ongoing',
    startDate: '2024-08-15',
    participants: 14,
    maxParticipants: 16
  },
  {
    id: '2',
    name: 'Badminton Masters Cup',
    sport: 'badminton',
    status: 'upcoming',
    startDate: '2024-09-01',
    participants: 32,
    maxParticipants: 32
  },
  {
    id: '3',
    name: 'Table Tennis Open',
    sport: 'tabletennis',
    status: 'completed',
    startDate: '2024-07-15',
    participants: 24,
    maxParticipants: 24
  }
]

const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    homeTeam: 'FC Barcelona',
    awayTeam: 'Real Madrid',
    date: '2024-08-20',
    time: '19:00',
    status: 'scheduled',
    tournamentName: 'Premier League Championship 2024'
  },
  {
    id: '2',
    homeTeam: 'Manchester United',
    awayTeam: 'Arsenal',
    date: '2024-08-18',
    time: '20:30',
    status: 'ongoing',
    tournamentName: 'Premier League Championship 2024'
  }
]

const STATUS_COLORS = {
  upcoming: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  ongoing: 'bg-green-500/20 text-green-400 border-green-500/30',
  completed: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  scheduled: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
}

export function RoleDashboardPage() {
  const navigate = useNavigate()
  const [userRole] = useState<UserRole>('organizer') // This would come from auth context
  const [stats] = useState<DashboardStats>(MOCK_STATS[userRole])
  const [tournaments] = useState<Tournament[]>(MOCK_TOURNAMENTS)
  const [matches] = useState<Match[]>(MOCK_MATCHES)

  const getDashboardTitle = () => {
    switch (userRole) {
      case 'user':
        return 'Bảng điều khiển người dùng'
      case 'organizer':
        return 'Bảng điều khiển ban tổ chức'
      default:
        return 'Bảng điều khiển'
    }
  }

  const getStatsCards = () => {
    const baseCards = [
      {
        title: 'Giải đấu',
        value: stats.tournaments,
        icon: Trophy,
        color: 'from-yellow-500 to-orange-500',
        description: userRole === 'user' ? 'Đã tham gia' : 'Đã tổ chức'
      },
      {
        title: 'Trận đấu',
        value: stats.matches,
        icon: Activity,
        color: 'from-green-500 to-emerald-500',
        description: userRole === 'user' ? 'Đã thi đấu' : 'Đã quản lý'
      },
      {
        title: 'Đội bóng',
        value: stats.teams,
        icon: Users,
        color: 'from-blue-500 to-cyan-500',
        description: userRole === 'user' ? 'Đang tham gia' : 'Đã đăng ký'
      },
      {
        title: 'Cầu thủ',
        value: stats.players,
        icon: UserPlus,
        color: 'from-purple-500 to-pink-500',
        description: 'Tổng số'
      }
    ]

    if (userRole === 'organizer') {
      baseCards.push({
        title: 'Doanh thu',
        value: stats.revenue || 0,
        icon: TrendingUp,
        color: 'from-emerald-500 to-teal-500',
        description: 'VND'
      })
    }

    return baseCards
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B'
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const handleCreateTournament = () => {
    navigate('/tournaments/create')
  }

  const handleViewTournament = (tournamentId: string) => {
    navigate(`/tournaments/${tournamentId}`)
  }

  const handleViewMatch = (matchId: string) => {
    navigate(`/matches/${matchId}`)
  }

  const renderQuickActions = () => {
    const actions = [
      {
        title: 'Tạo giải đấu mới',
        description: 'Tổ chức giải đấu chuyên nghiệp',
        icon: Plus,
        color: 'from-blue-500 to-purple-500',
        onClick: handleCreateTournament
      },
      {
        title: 'Xem lịch thi đấu',
        description: 'Theo dõi các trận đấu',
        icon: Calendar,
        color: 'from-green-500 to-emerald-500',
        onClick: () => navigate('/matches')
      },
      {
        title: 'Quản lý đội bóng',
        description: 'Thêm và quản lý đội',
        icon: Users,
        color: 'from-purple-500 to-pink-500',
        onClick: () => navigate('/teams')
      },
      {
        title: 'Thống kê',
        description: 'Xem báo cáo chi tiết',
        icon: BarChart3,
        color: 'from-orange-500 to-red-500',
        onClick: () => navigate('/stats')
      }
    ]

    if (userRole === 'user') {
      return actions.filter((action) => action.title !== 'Tạo giải đấu mới' && action.title !== 'Thống kê')
    }

    return actions
  }

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{getDashboardTitle()}</h1>
            <p className="text-slate-400">Chào mừng bạn trở lại! Đây là tổng quan về hoạt động của bạn.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
              <Bell className="w-4 h-4" />
              Thông báo
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
              Cài đặt
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {getStatsCards().map((card, index) => {
            const Icon = card.icon
            return (
              <div
                key={index}
                className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br',
                      card.color
                    )}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>

                <div className="space-y-1">
                  <div className="text-2xl font-bold text-white">
                    {card.title === 'Doanh thu' ? formatNumber(card.value) : card.value.toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-slate-300">{card.title}</div>
                  <div className="text-xs text-slate-400">{card.description}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Thao tác nhanh</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {renderQuickActions().map((action, index) => {
              const Icon = action.icon
              return (
                <button
                  key={index}
                  onClick={action.onClick}
                  className="group bg-slate-800/30 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600 hover:bg-slate-700/30 transition-all duration-200 text-left"
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br mb-4 group-hover:scale-110 transition-transform',
                      action.color
                    )}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-white font-semibold mb-1">{action.title}</div>
                  <div className="text-slate-400 text-sm">{action.description}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Tournaments */}
          <div className="bg-slate-800/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Giải đấu gần đây</h3>
              <button
                onClick={() => navigate('/tournaments')}
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                Xem tất cả
              </button>
            </div>

            <div className="space-y-4">
              {tournaments.slice(0, 3).map((tournament) => (
                <div
                  key={tournament.id}
                  onClick={() => handleViewTournament(tournament.id)}
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-600/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{tournament.name}</div>
                      <div className="text-sm text-slate-400">
                        {tournament.participants}/{tournament.maxParticipants} đội
                      </div>
                    </div>
                  </div>
                  <div className={cn('px-2 py-1 rounded text-xs border', STATUS_COLORS[tournament.status])}>
                    {tournament.status === 'upcoming' && 'Sắp diễn ra'}
                    {tournament.status === 'ongoing' && 'Đang diễn ra'}
                    {tournament.status === 'completed' && 'Đã kết thúc'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Matches */}
          <div className="bg-slate-800/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Trận đấu gần đây</h3>
              <button
                onClick={() => navigate('/matches')}
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                Xem tất cả
              </button>
            </div>

            <div className="space-y-4">
              {matches.map((match) => (
                <div
                  key={match.id}
                  onClick={() => handleViewMatch(match.id)}
                  className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-600/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-white">
                      {match.homeTeam} vs {match.awayTeam}
                    </div>
                    <div className={cn('px-2 py-1 rounded text-xs border', STATUS_COLORS[match.status])}>
                      {match.status === 'scheduled' && 'Chưa thi đấu'}
                      {match.status === 'ongoing' && 'Đang diễn ra'}
                      {match.status === 'completed' && 'Đã kết thúc'}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <div>{match.tournamentName}</div>
                    <div>
                      {match.date} - {match.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
