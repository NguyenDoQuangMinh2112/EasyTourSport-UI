import { useState } from 'react'
import { Plus, Edit, Trash2, Calendar, MapPin, Clock } from 'lucide-react'
import { cn } from '../../utils'
import { TeamAvatar } from '../ui/team-avatar'
import { PlayerManagement } from '../tournament/player-management'
import { Standings } from '../tournament/standings'
import type { TournamentData } from '../../pages/tournament-setup'
import TeamModal from '../modals/team-modal'

interface Player {
  id: string
  name: string
  jerseyNumber: number
  position: 'GK' | 'DF' | 'MF' | 'FW'
  age: number
  height: number
  weight: number
  isCaptain: boolean
  isViceCaptain: boolean
  phone?: string
  email?: string
  photo?: string
}

interface Team {
  id: string
  name: string
  logo?: string
  players: Player[]
  captain?: string
  contact: string
  status: 'pending' | 'confirmed' | 'rejected'
}

interface Match {
  id: string
  round: number
  homeTeam: string
  awayTeam: string
  date: string
  time: string
  venue: string
  status: 'scheduled' | 'ongoing' | 'completed'
  score?: {
    home: number
    away: number
  }
}

interface FootballTournamentSetupProps {
  tournament: TournamentData
  activeTab: string
}

const MOCK_TEAMS: Team[] = [
  {
    id: '1',
    name: 'FC Barcelona',
    logo: 'https://logos-world.net/wp-content/uploads/2020/06/Barcelona-Logo.png',
    players: [
      {
        id: '1',
        name: 'Nguyễn Văn A',
        jerseyNumber: 1,
        position: 'GK',
        age: 25,
        height: 185,
        weight: 80,
        isCaptain: false,
        isViceCaptain: false,
        phone: '0123456789',
        email: 'player1@team.com'
      },
      {
        id: '2',
        name: 'Trần Văn B',
        jerseyNumber: 10,
        position: 'MF',
        age: 28,
        height: 175,
        weight: 72,
        isCaptain: true,
        isViceCaptain: false,
        phone: '0123456790',
        email: 'captain@team.com'
      },
      {
        id: '3',
        name: 'Lê Văn C',
        jerseyNumber: 9,
        position: 'FW',
        age: 26,
        height: 180,
        weight: 75,
        isCaptain: false,
        isViceCaptain: true,
        phone: '0123456791',
        email: 'player3@team.com'
      }
    ],
    captain: 'Trần Văn B',
    contact: '0123456789',
    status: 'confirmed'
  },
  {
    id: '2',
    name: 'Real Madrid',
    logo: 'https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo.png',
    players: [
      {
        id: '4',
        name: 'Phạm Văn D',
        jerseyNumber: 1,
        position: 'GK',
        age: 24,
        height: 188,
        weight: 82,
        isCaptain: false,
        isViceCaptain: false,
        phone: '0987654321',
        email: 'keeper@real.com'
      },
      {
        id: '5',
        name: 'Hoàng Văn E',
        jerseyNumber: 7,
        position: 'FW',
        age: 27,
        height: 178,
        weight: 73,
        isCaptain: true,
        isViceCaptain: false,
        phone: '0987654322',
        email: 'captain@real.com'
      }
    ],
    captain: 'Hoàng Văn E',
    contact: '0987654321',
    status: 'confirmed'
  },
  {
    id: '3',
    name: 'Manchester United',
    players: [],
    captain: 'Vũ Văn F',
    contact: '0369852147',
    status: 'pending'
  }
]

const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    round: 1,
    homeTeam: 'FC Barcelona',
    awayTeam: 'Real Madrid',
    date: '2024-08-15',
    time: '19:00',
    venue: 'Sân A',
    status: 'scheduled'
  },
  {
    id: '2',
    round: 1,
    homeTeam: 'Manchester United',
    awayTeam: 'FC Barcelona',
    date: '2024-08-22',
    time: '19:00',
    venue: 'Sân B',
    status: 'scheduled'
  }
]

export function FootballTournamentSetup({ tournament, activeTab }: FootballTournamentSetupProps) {
  const [teams, setTeams] = useState<Team[]>(MOCK_TEAMS)
  const [matches] = useState<Match[]>(MOCK_MATCHES)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)

  const handleUpdateTeam = (teamId: string, updatedTeam: Team) => {
    setTeams(teams.map((team) => (team.id === teamId ? updatedTeam : team)))
  }

  const handleAddTeam = () => {
    setModalMode('add')
    setSelectedTeam(null)
    setIsModalOpen(true)
  }

  const handleEditTeam = (team: Team) => {
    setModalMode('edit')
    setSelectedTeam(team)
    setIsModalOpen(true)
  }

  const handleDeleteTeam = (teamId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đội này?')) {
      setTeams(teams.filter((team) => team.id !== teamId))
    }
  }

  const handleSaveTeam = (teamData: { name: string; captain?: string; contact: string; logo?: string }) => {
    if (modalMode === 'add') {
      const newTeam: Team = {
        id: Date.now().toString(),
        name: teamData.name,
        captain: teamData.captain,
        contact: teamData.contact,
        logo: teamData.logo,
        players: [],
        status: 'pending'
      }
      setTeams([...teams, newTeam])
    } else if (selectedTeam) {
      const updatedTeam = {
        ...selectedTeam,
        name: teamData.name,
        captain: teamData.captain,
        contact: teamData.contact,
        logo: teamData.logo
      }
      setTeams(teams.map((team) => (team.id === selectedTeam.id ? updatedTeam : team)))
    }
  }

  const renderTeamsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Đội tham gia</h3>
          <p className="text-slate-400">
            Quản lý danh sách các đội bóng tham gia giải đấu ({teams.length}/{tournament.maxTeams})
          </p>
        </div>
        <button
          onClick={handleAddTeam}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Thêm đội
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <div key={team.id} className="bg-slate-700/50 rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <TeamAvatar teamName={team.name} logoUrl={team.logo} size="md" />
                <div>
                  <h4 className="font-semibold text-white">{team.name}</h4>
                  <p className="text-sm text-slate-400">Đội trưởng: {team.captain || 'Chưa có'}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditTeam(team)}
                  className="p-1 text-slate-400 hover:text-blue-400 cursor-pointer"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteTeam(team.id)}
                  className="p-1 text-slate-400 hover:text-red-400 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Số cầu thủ:</span>
                <span className="text-white">{team.players.length}/25</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Liên hệ:</span>
                <span className="text-white">{team.contact}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Trạng thái:</span>
                <span
                  className={cn(
                    'font-medium',
                    team.status === 'confirmed' && 'text-green-400',
                    team.status === 'pending' && 'text-yellow-400',
                    team.status === 'rejected' && 'text-red-400'
                  )}
                >
                  {team.status === 'confirmed' && 'Đã xác nhận'}
                  {team.status === 'pending' && 'Chờ duyệt'}
                  {team.status === 'rejected' && 'Từ chối'}
                </span>
              </div>
            </div>

            {team.status === 'pending' && (
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors">
                  Duyệt
                </button>
                <button className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors">
                  Từ chối
                </button>
              </div>
            )}
          </div>
        ))}

        {teams.length < tournament.maxTeams && (
          <button
            onClick={handleAddTeam}
            className="bg-slate-700/30 border-2 border-dashed border-slate-600 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:border-slate-500 transition-colors cursor-pointer"
          >
            <Plus className="w-8 h-8 text-slate-400" />
            <span className="text-slate-400">Thêm đội mới</span>
          </button>
        )}
      </div>

      <TeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTeam}
        team={selectedTeam}
        mode={modalMode}
      />
    </div>
  )

  const renderScheduleTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Lịch thi đấu</h3>
          <p className="text-slate-400">Quản lý lịch trình các trận đấu trong giải</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
          <Calendar className="w-4 h-4" />
          Tạo lịch tự động
        </button>
      </div>

      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="bg-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                    Vòng {match.round}
                  </span>
                  <span
                    className={cn(
                      'px-3 py-1 rounded-full text-sm font-medium',
                      match.status === 'scheduled' && 'bg-yellow-500/20 text-yellow-400',
                      match.status === 'ongoing' && 'bg-green-500/20 text-green-400',
                      match.status === 'completed' && 'bg-slate-500/20 text-slate-400'
                    )}
                  >
                    {match.status === 'scheduled' && 'Sắp diễn ra'}
                    {match.status === 'ongoing' && 'Đang diễn ra'}
                    {match.status === 'completed' && 'Đã kết thúc'}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="text-center flex-1 flex items-center justify-center gap-3">
                    <TeamAvatar teamName={match.homeTeam} size="sm" />
                    <div>
                      <div className="font-semibold text-white">{match.homeTeam}</div>
                      <div className="text-sm text-slate-400">Chủ nhà</div>
                    </div>
                  </div>
                  <div className="text-center px-4">
                    <div className="text-2xl font-bold text-white">
                      {match.score ? `${match.score.home} - ${match.score.away}` : 'VS'}
                    </div>
                  </div>
                  <div className="text-center flex-1 flex items-center justify-center gap-3">
                    <div>
                      <div className="font-semibold text-white">{match.awayTeam}</div>
                      <div className="text-sm text-slate-400">Khách</div>
                    </div>
                    <TeamAvatar teamName={match.awayTeam} size="sm" />
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(match.date).toLocaleDateString('vi-VN')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {match.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {match.venue}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 ml-4">
                <button className="p-2 text-slate-400 hover:text-blue-400">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderRulesTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">Luật thi đấu bóng đá</h3>
        <p className="text-slate-400">Cài đặt các quy định và luật chơi cho giải đấu</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quy định chung */}
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-white mb-4">Quy định chung</h4>
            <div className="space-y-4">
              {/* Thời gian thi đấu */}
              <div>
                <label className="block text-slate-300 text-sm mb-2">Thời gian thi đấu</label>
                <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none">
                  <option value="90">90 phút (2 hiệp)</option>
                  <option value="60">60 phút (2 hiệp)</option>
                  <option value="45">45 phút (2 hiệp)</option>
                </select>
              </div>

              {/* Số cầu thủ */}
              <div>
                <label className="block text-slate-300 text-sm mb-2">Số cầu thủ</label>
                <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none">
                  <option value="11">11 vs 11</option>
                  <option value="7">7 vs 7</option>
                  <option value="5">5 vs 5</option>
                </select>
              </div>

              {/* Thay người */}
              <div>
                <label className="block text-slate-300 text-sm mb-2">Thay người</label>
                <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none">
                  <option value="3">3 lượt thay</option>
                  <option value="5">5 lượt thay</option>
                  <option value="unlimited">Không giới hạn</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cài đặt trận đấu */}
          <div>
            <h4 className="font-semibold text-white mb-4">Cài đặt trận đấu</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm mb-2">Thời gian thi đấu (phút)</label>
                <input
                  type="number"
                  defaultValue={90}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-2">Thời gian nghỉ giữa hiệp (phút)</label>
                <input
                  type="number"
                  defaultValue={15}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hình phạt */}
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-white mb-4">Hình phạt</h4>
            <div className="space-y-4">
              {/* Thẻ vàng */}
              <div>
                <label className="block text-slate-300 text-sm mb-2">Thẻ vàng</label>
                <input
                  type="number"
                  defaultValue={1}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none text-center"
                  min="0"
                />
              </div>

              {/* Thẻ đỏ */}
              <div>
                <label className="block text-slate-300 text-sm mb-2">Thẻ đỏ</label>
                <input
                  type="number"
                  defaultValue={1}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none text-center"
                  min="0"
                />
              </div>

              {/* Penalty khi hòa */}
              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div>
                  <div className="text-white font-medium">Penalty khi hòa</div>
                  <div className="text-sm text-slate-400">Sau hiệp phụ vẫn hòa</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Hệ thống tính điểm */}
          <div>
            <h4 className="font-semibold text-white mb-4">Hệ thống tính điểm</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 text-sm mb-2">Điểm thắng</label>
                <input
                  type="number"
                  defaultValue={3}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none text-center"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-2">Điểm hòa</label>
                <input
                  type="number"
                  defaultValue={1}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none text-center"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-2">Điểm thua</label>
                <input
                  type="number"
                  defaultValue={0}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none text-center"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Cách phân định thứ hạng khi hòa điểm */}
          <div>
            <label className="block text-slate-300 text-sm mb-2">Cách phân định thứ hạng khi hòa điểm</label>
            <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none">
              <option value="goal-difference">Hiệu số bàn thắng</option>
              <option value="head-to-head">Đối đầu trực tiếp</option>
              <option value="goals-scored">Số bàn thắng ghi được</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cho phép hiệp phụ */}
      <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
        <div>
          <div className="text-white font-medium">Cho phép hiệp phụ</div>
          <div className="text-sm text-slate-400">Khi trận đấu hòa trong vòng loại trực tiếp</div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="relative w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
        </label>
      </div>

      {/* Cho phép đá penalty */}
      <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
        <div>
          <div className="text-white font-medium">Cho phép đá penalty</div>
          <div className="text-sm text-slate-400">Sau hiệp phụ vẫn hòa</div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="relative w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
        </label>
      </div>
    </div>
  )

  const renderPrizesTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">Giải thưởng</h3>
        <p className="text-slate-400">Thiết lập cơ cấu giải thưởng cho giải đấu</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-xl p-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🥇</div>
            <h4 className="font-semibold text-white mb-2">Giải Nhất</h4>
            <div className="text-2xl font-bold text-yellow-400 mb-2">
              {(tournament.prizePool * 0.5).toLocaleString('vi-VN')} VNĐ
            </div>
            <div className="text-sm text-slate-400">50% tổng giải thưởng</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-400/20 to-gray-400/20 border border-slate-400/30 rounded-xl p-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🥈</div>
            <h4 className="font-semibold text-white mb-2">Giải Nhì</h4>
            <div className="text-2xl font-bold text-slate-300 mb-2">
              {(tournament.prizePool * 0.3).toLocaleString('vi-VN')} VNĐ
            </div>
            <div className="text-sm text-slate-400">30% tổng giải thưởng</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 border border-amber-600/30 rounded-xl p-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🥉</div>
            <h4 className="font-semibold text-white mb-2">Giải Ba</h4>
            <div className="text-2xl font-bold text-amber-400 mb-2">
              {(tournament.prizePool * 0.2).toLocaleString('vi-VN')} VNĐ
            </div>
            <div className="text-sm text-slate-400">20% tổng giải thưởng</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-700/50 rounded-xl p-6">
        <h4 className="font-semibold text-white mb-4">Giải thưởng cá nhân</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Vua phá lưới</span>
            <input
              type="text"
              placeholder="Nhập giải thưởng"
              className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Cầu thủ xuất sắc nhất</span>
            <input
              type="text"
              placeholder="Nhập giải thưởng"
              className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Thủ môn xuất sắc nhất</span>
            <input
              type="text"
              placeholder="Nhập giải thưởng"
              className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Fair Play</span>
            <input
              type="text"
              placeholder="Nhập giải thưởng"
              className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderPlayersTab = () => (
    <PlayerManagement teams={teams} onUpdateTeam={handleUpdateTeam} maxPlayersPerTeam={25} />
  )

  const renderStandingsTab = () => <Standings />

  switch (activeTab) {
    case 'teams':
      return renderTeamsTab()
    case 'players':
      return renderPlayersTab()
    case 'schedule':
      return renderScheduleTab()
    case 'standings':
      return renderStandingsTab()
    case 'rules':
      return renderRulesTab()
    case 'prizes':
      return renderPrizesTab()
    default:
      return renderTeamsTab()
  }
}
