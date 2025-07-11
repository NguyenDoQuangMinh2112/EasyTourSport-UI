import { useState } from 'react'
import { cn } from '../utils'
import { Search, MapPin, Calendar, Users, Trophy, Star, Clock } from 'lucide-react'
import { SPORTS_DATA } from '../constants/data'
import { CreateTournamentButton } from '../components/ui/tournament-buttons'

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
  difficulty: 'beginner' | 'intermediate' | 'advanced'
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
    difficulty: 'intermediate',
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
    difficulty: 'advanced',
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
    difficulty: 'beginner',
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
    difficulty: 'intermediate',
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
    difficulty: 'advanced',
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
    difficulty: 'intermediate',
    organizer: 'Beach Volleyball VN',
    rating: 4.5,
    featured: false
  }
]

export function TournamentBrowsePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    sport: 'all',
    difficulty: 'all'
  })

  const filteredTournaments = MOCK_TOURNAMENTS.filter((tournament) => {
    const matchesSearch = tournament.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSport = filters.sport === 'all' || tournament.sport === filters.sport
    const matchesDifficulty = filters.difficulty === 'all' || tournament.difficulty === filters.difficulty

    return matchesSearch && matchesSport && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-400 bg-green-500/20'
      case 'intermediate':
        return 'text-yellow-400 bg-yellow-500/20'
      case 'advanced':
        return 'text-red-400 bg-red-500/20'
      default:
        return 'text-slate-400 bg-slate-500/20'
    }
  }

  const getSportIcon = (sportId: string) => {
    const sport = SPORTS_DATA.find((s) => s.id === sportId)
    return sport?.icon || '🏆'
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Tournament Marketplace</h1>
          <p className="text-slate-400 text-lg mb-6">Discover and join amazing sports tournaments</p>

          {/* Create Tournament Button */}
          <div className="flex justify-center">
            <CreateTournamentButton />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tournaments..."
                className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex gap-4">
              <select
                value={filters.sport}
                onChange={(e) => setFilters((prev) => ({ ...prev, sport: e.target.value }))}
                className="px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:border-blue-500"
              >
                <option value="all">All Sports</option>
                {SPORTS_DATA.map((sport) => (
                  <option key={sport.id} value={sport.id}>
                    {sport.icon} {sport.id}
                  </option>
                ))}
              </select>

              <select
                value={filters.difficulty}
                onChange={(e) => setFilters((prev) => ({ ...prev, difficulty: e.target.value }))}
                className="px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:border-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-400">{filteredTournaments.length} tournaments found</p>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Star className="w-4 h-4 text-yellow-400" />
            Featured tournaments first
          </div>
        </div>

        {/* Tournament Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments
            .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
            .map((tournament) => (
              <div
                key={tournament.id}
                className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 hover:border-blue-500/50 hover:bg-slate-700/50 transition-all duration-300 cursor-pointer"
              >
                {/* Featured Badge */}
                {tournament.featured && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    <Star className="w-3 h-3 inline mr-1" />
                    Featured
                  </div>
                )}

                {/* Sport Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-xl">
                      {getSportIcon(tournament.sport)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors">
                        {tournament.title}
                      </h3>
                      <p className="text-slate-400 text-sm">{tournament.organizer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{tournament.rating}</span>
                  </div>
                </div>

                {/* Tournament Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{tournament.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{tournament.date}</span>
                    <Clock className="w-4 h-4 text-slate-400 ml-2" />
                    <span className="text-sm">{tournament.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">
                      {tournament.participants}/{tournament.maxParticipants} players
                    </span>
                    <div className="flex-1 bg-slate-600 rounded-full h-2 ml-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Prize and Difficulty */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-green-400 font-semibold">{tournament.prize}</span>
                  </div>
                  <span
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium',
                      getDifficultyColor(tournament.difficulty)
                    )}
                  >
                    {tournament.difficulty}
                  </span>
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 hover:scale-105 active:scale-95 transition-all duration-200">
                  Join Tournament
                </button>
              </div>
            ))}
        </div>

        {/* Empty State */}
        {filteredTournaments.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No tournaments found</h3>
            <p className="text-slate-400 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setFilters({ sport: 'all', difficulty: 'all' })
              }}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
