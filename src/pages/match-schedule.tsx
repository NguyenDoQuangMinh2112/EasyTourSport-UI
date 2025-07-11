import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Calendar,
  Clock,
  MapPin,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Eye,
  Users
} from 'lucide-react'
import { cn } from '../utils'

interface Match {
  id: string
  round: number
  homeTeam: {
    id: string
    name: string
    logo?: string
  }
  awayTeam: {
    id: string
    name: string
    logo?: string
  }
  date: string
  time: string
  venue: string
  status: 'scheduled' | 'ongoing' | 'completed' | 'postponed' | 'cancelled'
  score?: {
    home: number
    away: number
  }
  tournament: {
    id: string
    name: string
    sport: string
  }
}

const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    round: 1,
    homeTeam: { id: '1', name: 'FC Barcelona' },
    awayTeam: { id: '2', name: 'Real Madrid' },
    date: '2024-08-15',
    time: '19:00',
    venue: 'Sân vận động Mỹ Đình',
    status: 'completed',
    score: { home: 2, away: 1 },
    tournament: { id: '1', name: 'Premier League 2024', sport: 'football' }
  },
  {
    id: '2',
    round: 1,
    homeTeam: { id: '3', name: 'Manchester United' },
    awayTeam: { id: '4', name: 'Arsenal' },
    date: '2024-08-16',
    time: '20:00',
    venue: 'Sân Thống Nhất',
    status: 'ongoing',
    tournament: { id: '1', name: 'Premier League 2024', sport: 'football' }
  },
  {
    id: '3',
    round: 2,
    homeTeam: { id: '5', name: 'Chelsea' },
    awayTeam: { id: '6', name: 'Liverpool' },
    date: '2024-08-17',
    time: '15:00',
    venue: 'Sân Lạch Tray',
    status: 'scheduled',
    tournament: { id: '1', name: 'Premier League 2024', sport: 'football' }
  },
  {
    id: '4',
    round: 1,
    homeTeam: { id: '7', name: 'Team Alpha' },
    awayTeam: { id: '8', name: 'Team Beta' },
    date: '2024-08-18',
    time: '09:00',
    venue: 'Nhà thi đấu Quân khu 7',
    status: 'scheduled',
    tournament: { id: '2', name: 'Badminton Championship 2024', sport: 'badminton' }
  },
  {
    id: '5',
    round: 2,
    homeTeam: { id: '1', name: 'FC Barcelona' },
    awayTeam: { id: '3', name: 'Manchester United' },
    date: '2024-08-19',
    time: '19:30',
    venue: 'Sân vận động Mỹ Đình',
    status: 'postponed',
    tournament: { id: '1', name: 'Premier League 2024', sport: 'football' }
  },
  {
    id: '6',
    round: 1,
    homeTeam: { id: '9', name: 'Ping Pong Masters' },
    awayTeam: { id: '10', name: 'Table Tennis Pro' },
    date: '2024-08-20',
    time: '14:00',
    venue: 'Trung tâm thể thao Phan Đình Phùng',
    status: 'scheduled',
    tournament: { id: '3', name: 'Table Tennis League 2024', sport: 'tabletennis' }
  }
]

const STATUS_CONFIG = {
  scheduled: {
    label: 'Chưa thi đấu',
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    icon: Clock
  },
  ongoing: {
    label: 'Đang diễn ra',
    color: 'bg-green-500/20 text-green-400 border-green-500/30',
    icon: Users
  },
  completed: {
    label: 'Đã kết thúc',
    color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    icon: Eye
  },
  postponed: {
    label: 'Hoãn lại',
    color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    icon: Clock
  },
  cancelled: {
    label: 'Hủy bỏ',
    color: 'bg-red-500/20 text-red-400 border-red-500/30',
    icon: Eye
  }
}

const SPORT_NAMES = {
  football: 'Bóng đá',
  badminton: 'Cầu lông',
  tabletennis: 'Bóng bàn',
  basketball: 'Bóng rổ',
  volleyball: 'Bóng chuyền'
}

export function MatchSchedulePage() {
  const navigate = useNavigate()
  const [matches] = useState<Match[]>(MOCK_MATCHES)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedSport, setSelectedSport] = useState<string>('all')
  const [selectedTournament, setSelectedTournament] = useState<string>('all')
  const [currentWeek, setCurrentWeek] = useState(0)

  // Get unique tournaments for filter
  const tournaments = Array.from(new Set(matches.map((m) => m.tournament.id)))
    .map((id) => matches.find((m) => m.tournament.id === id)?.tournament)
    .filter(Boolean)

  // Filter matches
  const filteredMatches = matches.filter((match) => {
    const matchesSearch =
      searchTerm === '' ||
      match.homeTeam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.awayTeam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.tournament.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDate = selectedDate === '' || match.date === selectedDate
    const matchesStatus = selectedStatus === 'all' || match.status === selectedStatus
    const matchesSport = selectedSport === 'all' || match.tournament.sport === selectedSport
    const matchesTournament = selectedTournament === 'all' || match.tournament.id === selectedTournament

    return matchesSearch && matchesDate && matchesStatus && matchesSport && matchesTournament
  })

  // Group matches by date for calendar view
  const matchesByDate = filteredMatches.reduce((acc, match) => {
    const date = match.date
    if (!acc[date]) acc[date] = []
    acc[date].push(match)
    return acc
  }, {} as Record<string, Match[]>)

  // Get week dates for week view
  const getWeekDates = (weekOffset: number) => {
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay() + weekOffset * 7)

    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }
    return dates
  }

  const weekDates = getWeekDates(currentWeek)

  const getMatchesForDate = (date: string) => {
    return filteredMatches.filter((match) => match.date === date)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return timeString
  }

  const handleMatchClick = (matchId: string) => {
    navigate(`/matches/${matchId}`)
  }

  const renderMatchCard = (match: Match, compact = false) => {
    const StatusIcon = STATUS_CONFIG[match.status].icon

    return (
      <div
        key={match.id}
        onClick={() => handleMatchClick(match.id)}
        className={cn(
          'bg-slate-800/30 rounded-xl p-4 hover:bg-slate-700/40 transition-all duration-200 cursor-pointer border border-slate-700/50 hover:border-slate-600',
          compact && 'p-3'
        )}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">Vòng {match.round}</span>
            <span className="text-xs text-slate-400">
              {SPORT_NAMES[match.tournament.sport as keyof typeof SPORT_NAMES]}
            </span>
          </div>
          <div
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium',
              STATUS_CONFIG[match.status].color
            )}
          >
            <StatusIcon className="w-3 h-3" />
            {STATUS_CONFIG[match.status].label}
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 text-center">
            <div className="font-semibold text-white">{match.homeTeam.name}</div>
          </div>

          <div className="px-4">
            {match.score ? (
              <div className="text-center">
                <div className="text-lg font-bold text-white">
                  {match.score.home} - {match.score.away}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-slate-400 font-medium">VS</div>
                {!compact && <div className="text-xs text-slate-500">{formatTime(match.time)}</div>}
              </div>
            )}
          </div>

          <div className="flex-1 text-center">
            <div className="font-semibold text-white">{match.awayTeam.name}</div>
          </div>
        </div>

        {!compact && (
          <>
            <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatTime(match.time)}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {match.venue}
              </div>
            </div>

            <div className="text-xs text-slate-500 truncate">{match.tournament.name}</div>
          </>
        )}
      </div>
    )
  }

  const renderListView = () => (
    <div className="space-y-4">
      {Object.entries(matchesByDate)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, dayMatches]) => (
          <div key={date} className="space-y-4">
            <div className="flex items-center gap-3 py-2 border-b border-slate-700">
              <Calendar className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">{formatDate(date)}</h3>
              <span className="text-slate-400 text-sm">{dayMatches.length} trận đấu</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dayMatches.map((match) => renderMatchCard(match))}
            </div>
          </div>
        ))}

      {filteredMatches.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <div className="text-slate-400 text-lg mb-2">Không có trận đấu nào</div>
          <div className="text-slate-500 text-sm">Thử thay đổi bộ lọc của bạn</div>
        </div>
      )}
    </div>
  )

  const renderWeekView = () => (
    <div className="space-y-6">
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentWeek(currentWeek - 1)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Tuần trước
        </button>
        <div className="text-lg font-semibold text-white">
          {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
        </div>
        <button
          onClick={() => setCurrentWeek(currentWeek + 1)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
        >
          Tuần sau
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-7 gap-4">
        {weekDates.map((date) => {
          const dayMatches = getMatchesForDate(date)
          const dayName = new Date(date).toLocaleDateString('vi-VN', { weekday: 'short' })
          const dayNumber = new Date(date).getDate()

          return (
            <div key={date} className="space-y-2">
              <div className="text-center p-2 bg-slate-700/50 rounded-lg">
                <div className="text-xs text-slate-400 uppercase">{dayName}</div>
                <div className="text-lg font-semibold text-white">{dayNumber}</div>
              </div>
              <div className="space-y-2">{dayMatches.map((match) => renderMatchCard(match, true))}</div>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Lịch thi đấu</h1>
            <p className="text-slate-400">Theo dõi và quản lý lịch trình các trận đấu</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-700/50 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded transition-colors',
                  viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
                )}
              >
                <List className="w-4 h-4" />
                Danh sách
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded transition-colors',
                  viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
                )}
              >
                <Grid className="w-4 h-4" />
                Tuần
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/30 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">Bộ lọc</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm đội, giải đấu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Date Filter */}
            <div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="scheduled">Chưa thi đấu</option>
                <option value="ongoing">Đang diễn ra</option>
                <option value="completed">Đã kết thúc</option>
                <option value="postponed">Hoãn lại</option>
                <option value="cancelled">Hủy bỏ</option>
              </select>
            </div>

            {/* Sport Filter */}
            <div>
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">Tất cả môn thể thao</option>
                <option value="football">Bóng đá</option>
                <option value="badminton">Cầu lông</option>
                <option value="tabletennis">Bóng bàn</option>
                <option value="basketball">Bóng rổ</option>
                <option value="volleyball">Bóng chuyền</option>
              </select>
            </div>

            {/* Tournament Filter */}
            <div>
              <select
                value={selectedTournament}
                onChange={(e) => setSelectedTournament(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">Tất cả giải đấu</option>
                {tournaments.map(
                  (tournament) =>
                    tournament && (
                      <option key={tournament.id} value={tournament.id}>
                        {tournament.name}
                      </option>
                    )
                )}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {(searchTerm ||
            selectedDate ||
            selectedStatus !== 'all' ||
            selectedSport !== 'all' ||
            selectedTournament !== 'all') && (
            <div className="mt-4 pt-4 border-t border-slate-700">
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedDate('')
                  setSelectedStatus('all')
                  setSelectedSport('all')
                  setSelectedTournament('all')
                }}
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div>{viewMode === 'list' ? renderListView() : renderWeekView()}</div>
      </div>
    </div>
  )
}
