import { cn } from '../utils'
import { Calendar, Trophy, Users, Plus, MapPin, Star, TrendingUp, Medal, Activity, Zap } from 'lucide-react'

// Mock data for demo
const mockUser = {
  name: 'Alex Johnson',
  avatar: '/api/placeholder/60/60',
  level: 'Pro Player',
  tournaments: {
    created: 12,
    joined: 28,
    won: 8,
    winRate: 75
  }
}

const mockTournaments = [
  {
    id: 1,
    name: 'Summer Football Championship',
    sport: 'football',
    status: 'active',
    participants: 16,
    maxParticipants: 32,
    startDate: '2025-07-15',
    location: 'Ho Chi Minh City',
    isOwner: true
  },
  {
    id: 2,
    name: 'Basketball League 2025',
    sport: 'basketball',
    status: 'upcoming',
    participants: 8,
    maxParticipants: 16,
    startDate: '2025-07-20',
    location: 'Hanoi',
    isOwner: false
  },
  {
    id: 3,
    name: 'Tennis Masters Series',
    sport: 'tennis',
    status: 'completed',
    participants: 12,
    maxParticipants: 12,
    startDate: '2025-06-10',
    location: 'Da Nang',
    isOwner: true,
    position: 2
  }
]

const mockRecommended = [
  {
    id: 4,
    name: 'Weekend Volleyball Tournament',
    sport: 'volleyball',
    participants: 6,
    maxParticipants: 12,
    startDate: '2025-07-12',
    location: 'Ho Chi Minh City',
    difficulty: 'Beginner'
  },
  {
    id: 5,
    name: 'City Swimming Competition',
    sport: 'swimming',
    participants: 24,
    maxParticipants: 50,
    startDate: '2025-07-18',
    location: 'Hanoi',
    difficulty: 'Intermediate'
  }
]

export function DashboardPage() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-8 border border-blue-500/20 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                    AJ
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {mockUser.name}! 👋</h1>
                  <p className="text-slate-300 flex items-center gap-2">
                    <Medal className="w-4 h-4 text-yellow-400" />
                    {mockUser.level} • {mockUser.tournaments.winRate}% Win Rate
                  </p>
                </div>
              </div>

              <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-6 py-3 rounded-xl shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create Tournament
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Tournaments Created',
              value: mockUser.tournaments.created,
              icon: Trophy,
              color: 'from-yellow-500 to-orange-500',
              change: '+2 this month'
            },
            {
              label: 'Tournaments Joined',
              value: mockUser.tournaments.joined,
              icon: Users,
              color: 'from-blue-500 to-cyan-500',
              change: '+5 this month'
            },
            {
              label: 'Tournaments Won',
              value: mockUser.tournaments.won,
              icon: Medal,
              color: 'from-green-500 to-emerald-500',
              change: '+1 this week'
            },
            {
              label: 'Win Rate',
              value: `${mockUser.tournaments.winRate}%`,
              icon: TrendingUp,
              color: 'from-purple-500 to-pink-500',
              change: '+5% this month'
            }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:scale-105 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={cn('w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br', stat.color)}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs text-green-400 font-medium">{stat.change}</div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Tournaments */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Activity className="w-6 h-6 text-blue-400" />
                  My Tournaments
                </h2>
                <div className="flex gap-2">
                  {['all', 'active', 'upcoming', 'completed'].map((filter) => (
                    <button
                      key={filter}
                      className={cn(
                        'px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200',
                        filter === 'all'
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                      )}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {mockTournaments.map((tournament) => (
                  <div
                    key={tournament.id}
                    className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'w-10 h-10 rounded-lg flex items-center justify-center',
                            tournament.status === 'active'
                              ? 'bg-green-500/20 text-green-400'
                              : tournament.status === 'upcoming'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-slate-500/20 text-slate-400'
                          )}
                        >
                          <Trophy className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{tournament.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-400">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {tournament.participants}/{tournament.maxParticipants}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(tournament.startDate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {tournament.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {tournament.isOwner && (
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">Owner</span>
                        )}
                        {tournament.position && (
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">
                            #{tournament.position}
                          </span>
                        )}
                        <span
                          className={cn(
                            'px-3 py-1 rounded-full text-xs font-medium',
                            tournament.status === 'active'
                              ? 'bg-green-500/20 text-green-300'
                              : tournament.status === 'upcoming'
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-slate-500/20 text-slate-300'
                          )}
                        >
                          {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                        View Details
                      </button>
                      {tournament.isOwner && tournament.status === 'active' && (
                        <button className="px-4 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                          Manage
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Quick Actions
              </h3>

              <div className="space-y-3">
                {[
                  { label: 'Create Football Tournament', icon: Trophy, color: 'from-green-500 to-emerald-500' },
                  { label: 'Join Basketball League', icon: Users, color: 'from-orange-500 to-red-500' },
                  { label: 'Browse All Sports', icon: Activity, color: 'from-blue-500 to-purple-500' }
                ].map((action, index) => (
                  <button
                    key={index}
                    className={cn(
                      'w-full p-3 rounded-xl text-left transition-all duration-200 hover:scale-105',
                      'bg-gradient-to-r text-white font-medium flex items-center gap-3',
                      action.color
                    )}
                  >
                    <action.icon className="w-5 h-5" />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recommended Tournaments */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Recommended
              </h3>

              <div className="space-y-4">
                {mockRecommended.map((tournament) => (
                  <div key={tournament.id} className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
                    <h4 className="font-semibold text-white mb-2">{tournament.name}</h4>
                    <div className="space-y-1 text-sm text-slate-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {tournament.participants}/{tournament.maxParticipants} players
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(tournament.startDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {tournament.location}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                        {tournament.difficulty}
                      </span>
                      <button className="bg-green-500/20 hover:bg-green-500/30 text-green-300 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200">
                        Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
