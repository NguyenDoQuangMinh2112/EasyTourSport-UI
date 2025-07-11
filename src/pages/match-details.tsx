import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, MapPin, Users, Target, Award, AlertCircle } from 'lucide-react'
import { cn } from '../utils'

interface Player {
  id: string
  name: string
  jerseyNumber: number
  position: 'GK' | 'DF' | 'MF' | 'FW'
  goals?: number
  assists?: number
  yellowCards?: number
  redCards?: number
}

interface TeamLineup {
  id: string
  name: string
  formation: string
  players: Player[]
}

interface MatchEvent {
  id: string
  minute: number
  type: 'goal' | 'yellow-card' | 'red-card' | 'substitution'
  teamId: string
  playerId: string
  playerName: string
  description: string
}

interface MatchDetails {
  id: string
  round: number
  homeTeam: TeamLineup
  awayTeam: TeamLineup
  date: string
  time: string
  venue: string
  status: 'scheduled' | 'ongoing' | 'completed'
  score?: {
    home: number
    away: number
  }
  events: MatchEvent[]
  referee?: string
  attendance?: number
}

const MOCK_MATCH: MatchDetails = {
  id: '1',
  round: 1,
  homeTeam: {
    id: '1',
    name: 'FC Barcelona',
    formation: '4-3-3',
    players: [
      { id: '1', name: 'Nguyễn Văn A', jerseyNumber: 1, position: 'GK' },
      { id: '2', name: 'Trần Văn B', jerseyNumber: 2, position: 'DF' },
      { id: '3', name: 'Lê Văn C', jerseyNumber: 3, position: 'DF' },
      { id: '4', name: 'Phạm Văn D', jerseyNumber: 4, position: 'DF' },
      { id: '5', name: 'Hoàng Văn E', jerseyNumber: 5, position: 'DF' },
      { id: '6', name: 'Vũ Văn F', jerseyNumber: 6, position: 'MF' },
      { id: '7', name: 'Đỗ Văn G', jerseyNumber: 7, position: 'MF' },
      { id: '8', name: 'Bùi Văn H', jerseyNumber: 8, position: 'MF' },
      { id: '9', name: 'Đặng Văn I', jerseyNumber: 9, position: 'FW' },
      { id: '10', name: 'Cao Văn J', jerseyNumber: 10, position: 'FW' },
      { id: '11', name: 'Mai Văn K', jerseyNumber: 11, position: 'FW' }
    ]
  },
  awayTeam: {
    id: '2',
    name: 'Real Madrid',
    formation: '4-4-2',
    players: [
      { id: '12', name: 'Ngô Văn L', jerseyNumber: 1, position: 'GK' },
      { id: '13', name: 'Tô Văn M', jerseyNumber: 2, position: 'DF' },
      { id: '14', name: 'Lý Văn N', jerseyNumber: 3, position: 'DF' },
      { id: '15', name: 'Võ Văn O', jerseyNumber: 4, position: 'DF' },
      { id: '16', name: 'Hồ Văn P', jerseyNumber: 5, position: 'DF' },
      { id: '17', name: 'Đinh Văn Q', jerseyNumber: 6, position: 'MF' },
      { id: '18', name: 'Trịnh Văn R', jerseyNumber: 7, position: 'MF' },
      { id: '19', name: 'Dương Văn S', jerseyNumber: 8, position: 'MF' },
      { id: '20', name: 'Lương Văn T', jerseyNumber: 9, position: 'MF' },
      { id: '21', name: 'Phan Văn U', jerseyNumber: 10, position: 'FW' },
      { id: '22', name: 'Huỳnh Văn V', jerseyNumber: 11, position: 'FW' }
    ]
  },
  date: '2024-08-15',
  time: '19:00',
  venue: 'Sân vận động Mỹ Đình',
  status: 'completed',
  score: {
    home: 2,
    away: 1
  },
  events: [
    {
      id: '1',
      minute: 23,
      type: 'goal',
      teamId: '1',
      playerId: '10',
      playerName: 'Cao Văn J',
      description: 'Bàn thắng từ chấm phạt đền'
    },
    {
      id: '2',
      minute: 45,
      type: 'yellow-card',
      teamId: '2',
      playerId: '17',
      playerName: 'Trịnh Văn R',
      description: 'Thẻ vàng do phạm lỗi thô bạo'
    },
    {
      id: '3',
      minute: 67,
      type: 'goal',
      teamId: '2',
      playerId: '21',
      playerName: 'Phan Văn U',
      description: 'Bàn thắng từ tình huống phản công'
    },
    {
      id: '4',
      minute: 89,
      type: 'goal',
      teamId: '1',
      playerId: '9',
      playerName: 'Đặng Văn I',
      description: 'Bàn thắng quyết định ở phút cuối'
    }
  ],
  referee: 'Trọng tài Nguyễn Thanh Nam',
  attendance: 15000
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

export function MatchDetailsPage() {
  const { matchId } = useParams<{ matchId: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'overview' | 'lineup' | 'events' | 'stats'>('overview')

  // In real app, fetch match data based on matchId
  // For now using mock data
  const match = MOCK_MATCH

  // Prevent unused variable warning - will be used when implementing real data fetching
  void matchId

  const getEventIcon = (type: MatchEvent['type']) => {
    switch (type) {
      case 'goal':
        return <Target className="w-4 h-4" />
      case 'yellow-card':
        return <div className="w-3 h-4 bg-yellow-400 rounded-sm" />
      case 'red-card':
        return <div className="w-3 h-4 bg-red-500 rounded-sm" />
      case 'substitution':
        return <Users className="w-4 h-4" />
      default:
        return null
    }
  }

  const getEventColor = (type: MatchEvent['type']) => {
    switch (type) {
      case 'goal':
        return 'text-green-400'
      case 'yellow-card':
        return 'text-yellow-400'
      case 'red-card':
        return 'text-red-400'
      case 'substitution':
        return 'text-blue-400'
      default:
        return 'text-slate-400'
    }
  }

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Match Score */}
      <div className="bg-slate-700/50 rounded-xl p-8">
        <div className="text-center mb-6">
          <div className="text-slate-400 mb-2">Vòng {match.round}</div>
          <div className="text-lg text-slate-300">{match.venue}</div>
          <div className="text-sm text-slate-400">
            {new Date(`${match.date} ${match.time}`).toLocaleString('vi-VN')}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1 text-center">
            <div className="text-2xl font-bold text-white mb-2">{match.homeTeam.name}</div>
            <div className="text-sm text-slate-400">Đội nhà</div>
          </div>

          <div className="px-8">
            {match.score ? (
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {match.score.home} - {match.score.away}
                </div>
                <div
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium',
                    match.status === 'completed' && 'bg-green-500/20 text-green-400',
                    match.status === 'ongoing' && 'bg-blue-500/20 text-blue-400',
                    match.status === 'scheduled' && 'bg-slate-500/20 text-slate-400'
                  )}
                >
                  {match.status === 'completed' && 'Kết thúc'}
                  {match.status === 'ongoing' && 'Đang diễn ra'}
                  {match.status === 'scheduled' && 'Chưa bắt đầu'}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-400 mb-2">VS</div>
                <div className="px-3 py-1 bg-slate-500/20 text-slate-400 rounded-full text-xs">{match.time}</div>
              </div>
            )}
          </div>

          <div className="flex-1 text-center">
            <div className="text-2xl font-bold text-white mb-2">{match.awayTeam.name}</div>
            <div className="text-sm text-slate-400">Đội khách</div>
          </div>
        </div>
      </div>

      {/* Match Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-700/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-5 h-5 text-blue-400" />
            <div className="font-semibold text-white">Địa điểm</div>
          </div>
          <div className="text-slate-300">{match.venue}</div>
        </div>

        <div className="bg-slate-700/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-green-400" />
            <div className="font-semibold text-white">Thời gian</div>
          </div>
          <div className="text-slate-300">{new Date(`${match.date} ${match.time}`).toLocaleString('vi-VN')}</div>
        </div>

        <div className="bg-slate-700/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-5 h-5 text-purple-400" />
            <div className="font-semibold text-white">Khán giả</div>
          </div>
          <div className="text-slate-300">{match.attendance?.toLocaleString('vi-VN') || 'Chưa có thông tin'}</div>
        </div>
      </div>

      {/* Match Officials */}
      {match.referee && (
        <div className="bg-slate-700/50 rounded-xl p-6">
          <h4 className="font-semibold text-white mb-3">Ban tổ chức</h4>
          <div className="text-slate-300">{match.referee}</div>
        </div>
      )}
    </div>
  )

  const renderLineupTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Home Team */}
        <div className="bg-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">{match.homeTeam.name}</h3>
            <div className="text-sm text-slate-400">Sơ đồ: {match.homeTeam.formation}</div>
          </div>

          <div className="space-y-3">
            {match.homeTeam.players.map((player) => (
              <div key={player.id} className="flex items-center gap-3 p-3 bg-slate-600/30 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {player.jerseyNumber}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">{player.name}</div>
                  <div className="text-xs text-slate-400">{POSITION_NAMES[player.position]}</div>
                </div>
                <div
                  className={cn('px-2 py-1 rounded text-xs font-medium text-white', POSITION_COLORS[player.position])}
                >
                  {player.position}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Away Team */}
        <div className="bg-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">{match.awayTeam.name}</h3>
            <div className="text-sm text-slate-400">Sơ đồ: {match.awayTeam.formation}</div>
          </div>

          <div className="space-y-3">
            {match.awayTeam.players.map((player) => (
              <div key={player.id} className="flex items-center gap-3 p-3 bg-slate-600/30 rounded-lg">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {player.jerseyNumber}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">{player.name}</div>
                  <div className="text-xs text-slate-400">{POSITION_NAMES[player.position]}</div>
                </div>
                <div
                  className={cn('px-2 py-1 rounded text-xs font-medium text-white', POSITION_COLORS[player.position])}
                >
                  {player.position}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderEventsTab = () => (
    <div className="space-y-6">
      <div className="bg-slate-700/50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Diễn biến trận đấu</h3>

        <div className="space-y-4">
          {match.events.map((event) => (
            <div key={event.id} className="flex items-center gap-4 p-4 bg-slate-600/30 rounded-lg">
              <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{event.minute}'</span>
              </div>

              <div className={cn('flex items-center gap-2', getEventColor(event.type))}>{getEventIcon(event.type)}</div>

              <div className="flex-1">
                <div className="font-medium text-white">{event.playerName}</div>
                <div className="text-sm text-slate-400">{event.description}</div>
              </div>

              <div className="text-right">
                <div className="text-sm font-medium text-white">
                  {event.teamId === match.homeTeam.id ? match.homeTeam.name : match.awayTeam.name}
                </div>
              </div>
            </div>
          ))}

          {match.events.length === 0 && (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <div className="text-slate-400">Chưa có sự kiện nào trong trận đấu</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderStatsTab = () => (
    <div className="space-y-6">
      <div className="bg-slate-700/50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Thống kê trận đấu</h3>

        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <div className="text-slate-400 text-lg mb-2">Chức năng đang phát triển</div>
          <div className="text-slate-500 text-sm">Thống kê chi tiết sẽ được cập nhật sớm</div>
        </div>
      </div>
    </div>
  )

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: AlertCircle },
    { id: 'lineup', label: 'Đội hình', icon: Users },
    { id: 'events', label: 'Diễn biến', icon: Clock },
    { id: 'stats', label: 'Thống kê', icon: Award }
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
          <div>
            <h1 className="text-3xl font-bold text-white">Chi tiết trận đấu</h1>
            <p className="text-slate-400">
              {match.homeTeam.name} vs {match.awayTeam.name}
            </p>
          </div>
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
          {activeTab === 'lineup' && renderLineupTab()}
          {activeTab === 'events' && renderEventsTab()}
          {activeTab === 'stats' && renderStatsTab()}
        </div>
      </div>
    </div>
  )
}
