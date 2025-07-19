import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '../utils'
import { Search, MapPin, Calendar, Users, Trophy, Clock, Grid, List, Filter, X, Lock, UserPlus } from 'lucide-react'
import { SPORTS_DATA } from '../constants/data'
import { CreateTournamentButton } from '../components/ui/tournament-buttons'
import { LanguageToggle } from '../components/ui/language-toggle'

interface Tournament {
  id: string
  title: string
  sport: string
  location: string
  date: string
  time: string
  participants: number
  maxParticipants: number
  prize: string
  organizer: string
  rating: number
  featured: boolean
}

const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: '1',
    title: 'Summer Football Championship',
    sport: 'football',
    location: 'Hanoi Stadium',
    date: '2025-07-15',
    time: '14:00',
    participants: 12,
    maxParticipants: 16,
    prize: '10,000,000 VND',
    organizer: 'FC Hanoi',
    rating: 4.8,
    featured: true
  },
  {
    id: '2',
    title: 'City Badminton Open',
    sport: 'badminton',
    location: 'Sports Complex HCMC',
    date: '2025-07-20',
    time: '09:00',
    participants: 8,
    maxParticipants: 32,
    prize: '5,000,000 VND',
    organizer: 'Badminton Club',
    rating: 4.6,
    featured: false
  },
  {
    id: '3',
    title: 'Table Tennis Weekly',
    sport: 'tabletennis',
    location: 'Community Center',
    date: '2025-07-12',
    time: '19:00',
    participants: 15,
    maxParticipants: 20,
    prize: '2,000,000 VND',
    organizer: 'TT Club',
    rating: 4.3,
    featured: false
  },
  {
    id: '4',
    title: 'Basketball Street League',
    sport: 'basketball',
    location: 'Street Court Downtown',
    date: '2025-07-18',
    time: '16:30',
    participants: 6,
    maxParticipants: 8,
    prize: '8,000,000 VND',
    organizer: 'Street Ballers',
    rating: 4.7,
    featured: true
  },
  {
    id: '5',
    title: 'Tennis Singles Championship',
    sport: 'tennis',
    location: 'Tennis Club Elite',
    date: '2025-07-25',
    time: '10:00',
    participants: 4,
    maxParticipants: 16,
    prize: '15,000,000 VND',
    organizer: 'Elite Tennis',
    rating: 4.9,
    featured: true
  },
  {
    id: '6',
    title: 'Volleyball Beach Tournament',
    sport: 'volleyball',
    location: 'Beach Resort Da Nang',
    date: '2025-07-30',
    time: '08:00',
    participants: 10,
    maxParticipants: 12,
    prize: '6,000,000 VND',
    organizer: 'Beach Volleyball VN',
    rating: 4.5,
    featured: false
  }
]

export function TournamentBrowsePage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    sport: 'all'
  })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
  const [joinCode, setJoinCode] = useState('')
  const [isJoining, setIsJoining] = useState(false)

  const filteredTournaments = MOCK_TOURNAMENTS.filter((tournament) => {
    const matchesSearch = tournament.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSport = filters.sport === 'all' || tournament.sport === filters.sport

    return matchesSearch && matchesSport
  })

  const getSportIcon = (sportId: string) => {
    const sport = SPORTS_DATA.find((s) => s.id === sportId)
    return sport?.icon || '🏆'
  }

  const handleJoinTournament = (tournament: Tournament) => {
    setSelectedTournament(tournament)
    setShowJoinModal(true)
  }

  const handleJoinSubmit = async () => {
    if (!joinCode.trim()) return

    setIsJoining(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock validation - in real app, this would be API call
    if (joinCode === 'DEMO123') {
      alert(`Successfully joined ${selectedTournament?.title}!`)
      setShowJoinModal(false)
      setJoinCode('')
    } else {
      alert('Invalid tournament code. Please try again.')
    }
    setIsJoining(false)
  }

  const getStatusBadge = (tournament: Tournament) => {
    const tournamentDate = new Date(tournament.date)
    const today = new Date()
    const diffTime = tournamentDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return { label: t('tournaments.status.finished'), color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' }
    } else if (diffDays === 0) {
      return { label: t('tournaments.status.today'), color: 'bg-green-500/20 text-green-400 border-green-500/30' }
    } else if (diffDays <= 3) {
      return { label: t('tournaments.status.upcoming'), color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' }
    } else {
      return { label: t('tournaments.status.open'), color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div
          className="floating-element absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="floating-element absolute bottom-20 left-1/4 w-24 h-24 bg-green-500/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '4s' }}
        ></div>
        <div
          className="floating-element absolute bottom-40 right-1/3 w-28 h-28 bg-yellow-500/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '6s' }}
        ></div>
      </div>

      <div className="relative py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Enhanced Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {t('tournaments.title')}
                </h1>
                <p className="text-slate-400 text-lg">{t('tournaments.subtitle')}</p>
              </div>
              <div className="ml-auto">
                <LanguageToggle />
              </div>
            </div>

            {/* Create Tournament Button */}
            <div className="flex justify-center mb-8">
              <CreateTournamentButton />
            </div>
          </div>

          {/* Enhanced Search and Filters */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 mb-8 hover:border-slate-600/50 transition-all duration-300">
            {/* Filter Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Filter className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold text-white">
                  {t('common.search')} & {t('common.filter')}
                </h3>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-slate-700/50 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded transition-all duration-200',
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  <Grid className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('tournaments.viewModes.grid')}</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded transition-all duration-200',
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  <List className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('tournaments.viewModes.list')}</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('tournaments.searchPlaceholder')}
                  className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                />
              </div>

              {/* Quick Filters */}
              <div className="flex gap-3">
                <select
                  value={filters.sport}
                  onChange={(e) => setFilters((prev) => ({ ...prev, sport: e.target.value }))}
                  className="px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:border-blue-400/50 transition-all duration-200"
                >
                  <option value="all">{t('tournaments.allSports')}</option>
                  {SPORTS_DATA.map((sport) => (
                    <option key={sport.id} value={sport.id}>
                      {sport.icon} {sport.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-400">
              <span className="font-semibold text-white">{filteredTournaments.length}</span> {t('tournaments.found')}
            </p>
          </div>

          {/* Tournament Grid/List */}
          <div
            className={cn(
              'gap-6',
              viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'flex flex-col'
            )}
          >
            {filteredTournaments
              .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
              .map((tournament) => {
                const status = getStatusBadge(tournament)
                const participationRate = (tournament.participants / tournament.maxParticipants) * 100

                return (
                  <div
                    key={tournament.id}
                    className={cn(
                      'group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 hover:from-slate-700/40 hover:to-slate-800/40 hover:border-blue-400/60 transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1 tournament-card-entrance',
                      viewMode === 'list' && 'flex items-center gap-6 p-4'
                    )}
                  >
                    {/* Status Badges */}
                    {participationRate >= 80 && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {t('tournaments.status.almostFull')}
                      </div>
                    )}

                    {viewMode === 'grid' ? (
                      <>
                        {/* Grid View Content */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-xl shadow-lg">
                              {getSportIcon(tournament.sport)}
                            </div>
                            <div>
                              <h3 className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors duration-300">
                                {tournament.title}
                              </h3>
                              <p className="text-slate-400 text-sm">{tournament.organizer}</p>
                            </div>
                          </div>
                        </div>

                        {/* Tournament Details */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center gap-2 text-slate-300">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span className="text-sm">{tournament.location}</span>
                          </div>
                          <div className="flex items-center gap-4 text-slate-300">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              <span className="text-sm">{tournament.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-slate-400" />
                              <span className="text-sm">{tournament.time}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-slate-300">
                            <Users className="w-4 h-4 text-slate-400" />
                            <span className="text-sm">
                              {tournament.participants}/{tournament.maxParticipants}{' '}
                              {t('tournaments.details.participants')}
                            </span>
                            <div className="flex-1 bg-slate-600/50 rounded-full h-2 ml-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300 progress-bar-fill"
                                style={{ width: `${participationRate}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Prize and Status */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-yellow-400" />
                            <span className="text-green-400 font-semibold">{tournament.prize}</span>
                          </div>
                          <span className={cn('px-3 py-1 rounded-full text-xs font-medium border', status.color)}>
                            {status.label}
                          </span>
                        </div>

                        {/* Action Button */}
                        <button
                          onClick={() => handleJoinTournament(tournament)}
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <UserPlus className="w-4 h-4" />
                          {t('tournaments.joinTournament')}
                        </button>
                      </>
                    ) : (
                      <>
                        {/* List View Content */}
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                            {getSportIcon(tournament.sport)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-white text-xl group-hover:text-blue-300 transition-colors duration-300 mb-1">
                              {tournament.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-slate-400 mb-2">
                              <span>{tournament.organizer}</span>
                              <span>•</span>
                              <span>{tournament.location}</span>
                              <span>•</span>
                              <span>{tournament.date}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span className="text-sm">
                                  {tournament.participants}/{tournament.maxParticipants}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Trophy className="w-4 h-4 text-yellow-400" />
                                <span className="text-sm text-green-400">{tournament.prize}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span
                              className={cn(
                                'px-3 py-1 rounded-full text-xs font-medium border shadow-sm',
                                status.color
                              )}
                            >
                              {status.label}
                            </span>

                            <button
                              onClick={() => handleJoinTournament(tournament)}
                              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] transition-all duration-300"
                            >
                              {t('tournaments.joinTournament')}
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                )
              })}
          </div>

          {/* Enhanced Empty State */}
          {filteredTournaments.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-slate-600/50">
                  <Search className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">{t('tournaments.empty.title')}</h3>
                <p className="text-slate-400 mb-6 text-lg">
                  {searchQuery
                    ? t('tournaments.empty.withSearch', { query: searchQuery })
                    : t('tournaments.empty.withoutSearch')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setFilters({ sport: 'all' })
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    {t('tournaments.empty.clearFilters')}
                  </button>
                  <CreateTournamentButton />
                </div>
              </div>
            </div>
          )}

          {/* Join Tournament Modal */}
          {showJoinModal && selectedTournament && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-backdrop">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 p-6 w-full max-w-md mx-auto shadow-2xl modal-content">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{t('tournaments.join.title')}</h3>
                      <p className="text-sm text-slate-400">{t('tournaments.join.subtitle')}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowJoinModal(false)
                      setJoinCode('')
                    }}
                    className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">{getSportIcon(selectedTournament.sport)}</div>
                    <div>
                      <h4 className="font-semibold text-white">{selectedTournament.title}</h4>
                      <p className="text-sm text-slate-400">{selectedTournament.organizer}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Địa điểm:</span>
                      <p className="text-white">{selectedTournament.location}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Ngày:</span>
                      <p className="text-white">{selectedTournament.date}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-white font-medium mb-3">{t('tournaments.join.code')}</label>
                  <input
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    placeholder={t('tournaments.join.codePlaceholder')}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-center font-mono text-lg tracking-wider"
                    maxLength={6}
                  />
                  <p className="text-xs text-slate-400 mt-2">{t('tournaments.join.codeHint')}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowJoinModal(false)
                      setJoinCode('')
                    }}
                    className="flex-1 px-4 py-3 bg-slate-700/50 text-slate-300 rounded-xl hover:bg-slate-600/50 transition-all duration-200"
                  >
                    {t('tournaments.join.cancel')}
                  </button>
                  <button
                    onClick={handleJoinSubmit}
                    disabled={!joinCode.trim() || isJoining}
                    className={cn(
                      'flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2',
                      !joinCode.trim() || isJoining
                        ? 'bg-slate-600/50 text-slate-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:scale-105'
                    )}
                  >
                    {isJoining ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t('tournaments.join.joining')}
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        {t('tournaments.joinTournament')}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
