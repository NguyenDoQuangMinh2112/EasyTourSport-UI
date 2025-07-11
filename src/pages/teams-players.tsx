import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Search, Filter, Plus, Trophy, Star, User, MapPin } from 'lucide-react'
import { cn } from '../utils'
import { EmptyState } from '../components/ui'

interface Team {
  id: string
  name: string
  sport: string
  logo?: string
  coach: string
  players: number
  matches: number
  wins: number
  losses: number
  ranking: number
  location: string
  founded: string
}

interface Player {
  id: string
  name: string
  position: string
  jerseyNumber: number
  age: number
  team: {
    id: string
    name: string
  }
  matches: number
  goals?: number
  assists?: number
}

const MOCK_TEAMS: Team[] = [
  {
    id: '1',
    name: 'FC Barcelona Legends',
    sport: 'football',
    coach: 'Nguyễn Văn A',
    players: 18,
    matches: 45,
    wins: 28,
    losses: 5,
    ranking: 2,
    location: 'Hà Nội',
    founded: '2020'
  },
  {
    id: '2',
    name: 'Real Madrid Warriors',
    sport: 'football',
    coach: 'Trần Văn B',
    players: 20,
    matches: 42,
    wins: 25,
    losses: 8,
    ranking: 3,
    location: 'TP.HCM',
    founded: '2019'
  }
]

const MOCK_PLAYERS: Player[] = [
  {
    id: '1',
    name: 'Trần Minh Đức',
    position: 'Tiền đạo',
    jerseyNumber: 10,
    age: 25,
    team: { id: '1', name: 'FC Barcelona Legends' },
    matches: 42,
    goals: 28,
    assists: 15
  },
  {
    id: '2',
    name: 'Nguyễn Văn Nam',
    position: 'Thủ môn',
    jerseyNumber: 1,
    age: 28,
    team: { id: '1', name: 'FC Barcelona Legends' },
    matches: 40,
    goals: 0,
    assists: 2
  }
]

type ViewMode = 'teams' | 'players'

export function TeamsPlayersPage() {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<ViewMode>('teams')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSport, setSelectedSport] = useState<string>('all')

  const filteredTeams = MOCK_TEAMS.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.coach.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSport = selectedSport === 'all' || team.sport === selectedSport
    return matchesSearch && matchesSport
  })

  const filteredPlayers = MOCK_PLAYERS.filter((player) => {
    const matchesSearch =
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.team.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleCreateTeam = () => {
    navigate('/tournaments/create')
  }

  const handleViewTeam = (teamId: string) => {
    navigate(`/teams/${teamId}`)
  }

  const handleViewPlayer = (playerId: string) => {
    navigate(`/players/${playerId}`)
  }

  const renderTeamCard = (team: Team) => (
    <div
      key={team.id}
      onClick={() => handleViewTeam(team.id)}
      className="bg-slate-800/30 rounded-xl p-6 hover:bg-slate-700/40 transition-all duration-200 cursor-pointer border border-slate-700/50 hover:border-slate-600 hover:scale-105"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{team.name}</h3>
            <p className="text-slate-400 text-sm">{team.sport}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-yellow-400">
          <Star className="w-4 h-4" />
          <span className="text-sm font-medium">#{team.ranking}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <div className="text-slate-400">Cầu thủ</div>
          <div className="text-white font-medium">{team.players}</div>
        </div>
        <div>
          <div className="text-slate-400">Trận thắng</div>
          <div className="text-green-400 font-medium">{team.wins}</div>
        </div>
        <div>
          <div className="text-slate-400">HLV</div>
          <div className="text-white font-medium">{team.coach}</div>
        </div>
        <div>
          <div className="text-slate-400">Thành lập</div>
          <div className="text-white font-medium">{team.founded}</div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-slate-400 text-sm">
        <MapPin className="w-4 h-4" />
        <span>{team.location}</span>
      </div>
    </div>
  )

  const renderPlayerCard = (player: Player) => (
    <div
      key={player.id}
      onClick={() => handleViewPlayer(player.id)}
      className="bg-slate-800/30 rounded-xl p-6 hover:bg-slate-700/40 transition-all duration-200 cursor-pointer border border-slate-700/50 hover:border-slate-600 hover:scale-105"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
          {player.jerseyNumber}
        </div>
        <div>
          <h3 className="font-semibold text-white">{player.name}</h3>
          <p className="text-slate-400 text-sm">{player.position}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <div className="text-slate-400">Tuổi</div>
          <div className="text-white font-medium">{player.age}</div>
        </div>
        <div>
          <div className="text-slate-400">Trận đấu</div>
          <div className="text-blue-400 font-medium">{player.matches}</div>
        </div>
        {player.goals !== undefined && (
          <div>
            <div className="text-slate-400">Bàn thắng</div>
            <div className="text-green-400 font-medium">{player.goals}</div>
          </div>
        )}
        {player.assists !== undefined && (
          <div>
            <div className="text-slate-400">Kiến tạo</div>
            <div className="text-purple-400 font-medium">{player.assists}</div>
          </div>
        )}
      </div>

      <div className="text-slate-400 text-sm">{player.team.name}</div>
    </div>
  )

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{viewMode === 'teams' ? 'Đội bóng' : 'Cầu thủ'}</h1>
            <p className="text-slate-400">
              {viewMode === 'teams' ? 'Khám phá và quản lý các đội bóng' : 'Khám phá và quản lý các cầu thủ'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-700/50 rounded-lg p-1">
              <button
                onClick={() => setViewMode('teams')}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded transition-colors',
                  viewMode === 'teams' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
                )}
              >
                <Users className="w-4 h-4" />
                Đội bóng
              </button>
              <button
                onClick={() => setViewMode('players')}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded transition-colors',
                  viewMode === 'players' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
                )}
              >
                <User className="w-4 h-4" />
                Cầu thủ
              </button>
            </div>

            <button
              onClick={handleCreateTeam}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Tạo đội
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/30 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">Bộ lọc</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={`Tìm kiếm ${viewMode === 'teams' ? 'đội bóng...' : 'cầu thủ...'}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Sport Filter */}
            {viewMode === 'teams' && (
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
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div>
          {viewMode === 'teams' ? (
            filteredTeams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeams.map(renderTeamCard)}
              </div>
            ) : (
              <EmptyState
                icon={Users}
                title="Không tìm thấy đội bóng nào"
                description="Thử thay đổi bộ lọc hoặc tạo đội bóng mới"
                action={{
                  label: 'Tạo đội mới',
                  onClick: handleCreateTeam
                }}
              />
            )
          ) : filteredPlayers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlayers.map(renderPlayerCard)}
            </div>
          ) : (
            <EmptyState icon={User} title="Không tìm thấy cầu thủ nào" description="Thử thay đổi từ khóa tìm kiếm" />
          )}
        </div>
      </div>
    </div>
  )
}
