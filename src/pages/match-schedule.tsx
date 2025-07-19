import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
import { LanguageToggle } from '../components/ui/language-toggle'

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
  const { t } = useTranslation()
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

  // Get sport emoji
  const getSportEmoji = (sport: string) => {
    const emojis: Record<string, string> = {
      football: '⚽',
      badminton: '🏸',
      tabletennis: '🏓',
      basketball: '🏀',
      volleyball: '🏐'
    }
    return emojis[sport] || '🏆'
  }

  const renderMatchCard = (match: Match, compact = false) => {
    const StatusIcon = STATUS_CONFIG[match.status].icon
    const isLive = match.status === 'ongoing'
    const isCompleted = match.status === 'completed'
    const isUpcoming = match.status === 'scheduled'

    return (
      <div
        key={match.id}
        onClick={() => handleMatchClick(match.id)}
        className={cn(
          'bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-4 hover:from-slate-700/60 hover:to-slate-800/60 transition-all duration-300 cursor-pointer border border-slate-700/50 hover:border-slate-600/70 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10 group',
          compact && 'p-3 hover:scale-105',
          isLive && 'ring-2 ring-green-500/30 shadow-lg shadow-green-500/20',
          isCompleted && 'border-slate-600/30',
          isUpcoming && 'hover:ring-1 hover:ring-blue-500/30'
        )}
      >
        {/* Live indicator */}
        {isLive && (
          <div className="absolute -top-1 -right-1 flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
            LIVE
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-700/50 text-slate-300 px-2.5 py-1 rounded-full text-xs">
              <span className="text-sm">{getSportEmoji(match.tournament.sport)}</span>
              <span>Vòng {match.round}</span>
            </div>
            {!compact && (
              <span className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded">
                {SPORT_NAMES[match.tournament.sport as keyof typeof SPORT_NAMES]}
              </span>
            )}
          </div>
          <div
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium transition-all duration-200',
              STATUS_CONFIG[match.status].color,
              'group-hover:scale-105'
            )}
          >
            <StatusIcon className="w-3 h-3" />
            {STATUS_CONFIG[match.status].label}
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          {/* Home Team */}
          <div className="flex-1 text-center">
            <div className="mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-1 text-white font-bold text-sm group-hover:scale-110 transition-transform duration-200">
                {match.homeTeam.name.charAt(0)}
              </div>
            </div>
            <div className="font-semibold text-white text-sm group-hover:text-blue-300 transition-colors truncate">
              {match.homeTeam.name}
            </div>
          </div>

          {/* Score / VS */}
          <div className="px-4">
            {match.score ? (
              <div className="text-center">
                <div
                  className={cn(
                    'text-lg font-bold transition-all duration-200',
                    isCompleted ? 'text-white' : 'text-green-400'
                  )}
                >
                  {match.score.home} - {match.score.away}
                </div>
                {isLive && <div className="text-xs text-green-400 animate-pulse">Đang thi đấu</div>}
              </div>
            ) : (
              <div className="text-center">
                <div className="text-slate-400 font-medium text-lg group-hover:text-blue-400 transition-colors">VS</div>
                {!compact && (
                  <div className="text-xs text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded mt-1">
                    {formatTime(match.time)}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex-1 text-center">
            <div className="mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-1 text-white font-bold text-sm group-hover:scale-110 transition-transform duration-200">
                {match.awayTeam.name.charAt(0)}
              </div>
            </div>
            <div className="font-semibold text-white text-sm group-hover:text-purple-300 transition-colors truncate">
              {match.awayTeam.name}
            </div>
          </div>
        </div>

        {!compact && (
          <>
            <div className="flex items-center justify-between text-sm text-slate-400 mb-2 group-hover:text-slate-300 transition-colors">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="font-medium">{formatTime(match.time)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="truncate max-w-[120px]">{match.venue}</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 truncate bg-slate-800/30 px-2 py-1 rounded flex items-center gap-1.5">
              <span className="text-sm">{getSportEmoji(match.tournament.sport)}</span>
              {match.tournament.name}
            </div>
          </>
        )}

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    )
  }

  const renderListView = () => (
    <div className="space-y-6">
      {Object.entries(matchesByDate)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, dayMatches]) => (
          <div key={date} className="space-y-4 tournament-form-group">
            <div className="flex items-center gap-3 py-3 px-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl border border-slate-700/50">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{formatDate(date)}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span>{dayMatches.length} trận đấu</span>
                  {dayMatches.some((m) => m.status === 'ongoing') && (
                    <span className="flex items-center gap-1 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      {dayMatches.filter((m) => m.status === 'ongoing').length} đang diễn ra
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-blue-400">
                  {new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                </div>
                <div className="text-xs text-slate-400">
                  {new Date(date).toLocaleDateString('vi-VN', { weekday: 'short' })}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dayMatches.map((match) => renderMatchCard(match))}
            </div>
          </div>
        ))}

      {filteredMatches.length === 0 && (
        <div className="text-center py-16 tournament-form-group">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-slate-400" />
            </div>
            <div className="text-slate-400 text-xl font-medium mb-2">Không có trận đấu nào</div>
            <div className="text-slate-500 text-sm mb-6">Thử thay đổi bộ lọc của bạn để tìm thêm trận đấu</div>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedDate('')
                setSelectedStatus('all')
                setSelectedSport('all')
                setSelectedTournament('all')
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>
      )}
    </div>
  )

  const renderWeekView = () => (
    <div className="space-y-6 tournament-form-group">
      {/* Week Navigation */}
      <div className="flex items-center justify-between bg-slate-800/40 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
        <button
          onClick={() => setCurrentWeek(currentWeek - 1)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white rounded-lg transition-all duration-200 hover:scale-105 border border-slate-600"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Tuần trước</span>
        </button>
        <div className="text-center">
          <div className="text-lg font-semibold text-white">
            {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
          </div>
          <div className="text-sm text-slate-400">
            {weekDates.reduce((total, date) => total + getMatchesForDate(date).length, 0)} trận đấu trong tuần
          </div>
        </div>
        <button
          onClick={() => setCurrentWeek(currentWeek + 1)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white rounded-lg transition-all duration-200 hover:scale-105 border border-slate-600"
        >
          <span className="hidden sm:inline">Tuần sau</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-7 gap-3">
        {weekDates.map((date) => {
          const dayMatches = getMatchesForDate(date)
          const dayName = new Date(date).toLocaleDateString('vi-VN', { weekday: 'short' })
          const dayNumber = new Date(date).getDate()
          const isToday = date === new Date().toISOString().split('T')[0]
          const hasMatches = dayMatches.length > 0
          const hasLiveMatches = dayMatches.some((m) => m.status === 'ongoing')

          return (
            <div key={date} className="space-y-2">
              <div
                className={cn(
                  'text-center p-3 rounded-xl border transition-all duration-200',
                  isToday
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30'
                    : hasMatches
                    ? 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50'
                    : 'bg-slate-800/30 border-slate-700/30',
                  hasLiveMatches && 'ring-2 ring-green-500/30'
                )}
              >
                <div className={cn('text-xs uppercase font-medium mb-1', isToday ? 'text-blue-400' : 'text-slate-400')}>
                  {dayName}
                </div>
                <div
                  className={cn(
                    'text-lg font-semibold',
                    isToday ? 'text-white' : hasMatches ? 'text-white' : 'text-slate-500'
                  )}
                >
                  {dayNumber}
                </div>
                {hasMatches && <div className="text-xs text-slate-400 mt-1">{dayMatches.length} trận</div>}
                {hasLiveMatches && (
                  <div className="text-xs text-green-400 flex items-center justify-center gap-1 mt-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    LIVE
                  </div>
                )}
              </div>
              <div className="space-y-2 min-h-[100px]">{dayMatches.map((match) => renderMatchCard(match, true))}</div>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="floating-element absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-20 left-1/4 w-24 h-24 bg-green-500/10 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-40 right-1/3 w-28 h-28 bg-yellow-500/10 rounded-full blur-xl"></div>
      </div>

      <div className="relative py-6">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center tournament-step-icon">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{t('matches.title')}</h1>
                </div>
              </div>
              <p className="text-slate-400">{t('matches.subtitle')}</p>

              {/* Stats */}
              <div className="flex items-center justify-center lg:justify-start gap-6 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {matches.filter((m) => m.status === 'ongoing').length}
                  </div>
                  <div className="text-xs text-slate-400">{t('matches.status.live')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {matches.filter((m) => m.status === 'scheduled').length}
                  </div>
                  <div className="text-xs text-slate-400">{t('matches.status.upcoming')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-400">
                    {matches.filter((m) => m.status === 'completed').length}
                  </div>
                  <div className="text-xs text-slate-400">{t('matches.status.finished')}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center bg-slate-800/40 backdrop-blur-sm rounded-xl p-1 border border-slate-700/50">
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium',
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  )}
                >
                  <List className="w-4 h-4" />
                  <span className="hidden sm:inline">Danh sách</span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium',
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  )}
                >
                  <Grid className="w-4 h-4" />
                  <span className="hidden sm:inline">Tuần</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 mb-8 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Filter className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-white">Bộ lọc nâng cao</h3>
              <div className="flex-1"></div>
              {filteredMatches.length !== matches.length && (
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                  {filteredMatches.length} / {matches.length} trận đấu
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <label className="block text-white font-medium text-sm mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Tìm kiếm
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm đội, giải đấu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:bg-slate-700/70"
                  />
                </div>
              </div>

              {/* Date Filter */}
              <div>
                <label className="block text-white font-medium text-sm mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Ngày thi đấu
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-all duration-200 hover:bg-slate-700/70"
                />
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-white font-medium text-sm mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Trạng thái
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-all duration-200 hover:bg-slate-700/70"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="scheduled">⏰ Chưa thi đấu</option>
                  <option value="ongoing">🟢 Đang diễn ra</option>
                  <option value="completed">✅ Đã kết thúc</option>
                  <option value="postponed">⏸️ Hoãn lại</option>
                  <option value="cancelled">❌ Hủy bỏ</option>
                </select>
              </div>

              {/* Sport Filter */}
              <div>
                <label className="block text-white font-medium text-sm mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  Môn thể thao
                </label>
                <select
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="w-full px-3 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-all duration-200 hover:bg-slate-700/70"
                >
                  <option value="all">Tất cả môn thể thao</option>
                  <option value="football">⚽ Bóng đá</option>
                  <option value="badminton">🏸 Cầu lông</option>
                  <option value="tabletennis">🏓 Bóng bàn</option>
                  <option value="basketball">🏀 Bóng rổ</option>
                  <option value="volleyball">🏐 Bóng chuyền</option>
                </select>
              </div>

              {/* Tournament Filter */}
              <div>
                <label className="block text-white font-medium text-sm mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Giải đấu
                </label>
                <select
                  value={selectedTournament}
                  onChange={(e) => setSelectedTournament(e.target.value)}
                  className="w-full px-3 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-all duration-200 hover:bg-slate-700/70"
                >
                  <option value="all">Tất cả giải đấu</option>
                  {tournaments.map(
                    (tournament) =>
                      tournament && (
                        <option key={tournament.id} value={tournament.id}>
                          🏆 {tournament.name}
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
              <div className="mt-6 pt-4 border-t border-slate-700/50">
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedDate('')
                    setSelectedStatus('all')
                    setSelectedSport('all')
                    setSelectedTournament('all')
                  }}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-lg border border-blue-500/20"
                >
                  <Filter className="w-4 h-4" />
                  Xóa tất cả bộ lọc
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div>{viewMode === 'list' ? renderListView() : renderWeekView()}</div>
        </div>
      </div>
    </div>
  )
}
