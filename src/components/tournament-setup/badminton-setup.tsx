import { useState } from 'react'
import { Plus, Edit, Trash2, Calendar, MapPin, Clock } from 'lucide-react'
import { cn } from '../../utils'
import type { TournamentData } from '../../pages/tournament-setup'

interface Player {
  id: string
  name: string
  ranking?: string
  contact: string
  status: 'pending' | 'confirmed' | 'rejected'
  category: 'men-singles' | 'women-singles' | 'men-doubles' | 'women-doubles' | 'mixed-doubles'
  partner?: string
}

interface Match {
  id: string
  round: string
  category: string
  player1: string
  player2: string
  date: string
  time: string
  court: string
  status: 'scheduled' | 'ongoing' | 'completed'
  score?: {
    player1Sets: number
    player2Sets: number
    sets: Array<{ player1: number; player2: number }>
  }
}

interface BadmintonTournamentSetupProps {
  tournament: TournamentData
  activeTab: string
}

const CATEGORIES = [
  { id: 'men-singles', name: 'Nam đơn', maxPlayers: 32 },
  { id: 'women-singles', name: 'Nữ đơn', maxPlayers: 32 },
  { id: 'men-doubles', name: 'Nam đôi', maxPlayers: 16 },
  { id: 'women-doubles', name: 'Nữ đôi', maxPlayers: 16 },
  { id: 'mixed-doubles', name: 'Đôi nam nữ', maxPlayers: 16 }
]

const MOCK_PLAYERS: Player[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    ranking: 'A+',
    contact: '0123456789',
    status: 'confirmed',
    category: 'men-singles'
  },
  {
    id: '2',
    name: 'Trần Thị B',
    ranking: 'A',
    contact: '0987654321',
    status: 'confirmed',
    category: 'women-singles'
  },
  {
    id: '3',
    name: 'Lê Văn C',
    contact: '0111222333',
    status: 'pending',
    category: 'men-doubles',
    partner: 'Phạm Văn D'
  }
]

const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    round: 'Vòng 1/16',
    category: 'Nam đơn',
    player1: 'Nguyễn Văn A',
    player2: 'Trần Văn E',
    date: '2024-08-15',
    time: '09:00',
    court: 'Sân 1',
    status: 'scheduled'
  },
  {
    id: '2',
    round: 'Vòng 1/16',
    category: 'Nữ đơn',
    player1: 'Trần Thị B',
    player2: 'Nguyễn Thị F',
    date: '2024-08-15',
    time: '10:00',
    court: 'Sân 2',
    status: 'scheduled'
  }
]

export function BadmintonTournamentSetup({ activeTab }: BadmintonTournamentSetupProps) {
  const [players] = useState<Player[]>(MOCK_PLAYERS)
  const [matches] = useState<Match[]>(MOCK_MATCHES)
  const [selectedCategory, setSelectedCategory] = useState('men-singles')

  const renderTeamsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Vận động viên tham gia</h3>
          <p className="text-slate-400">Quản lý danh sách vận động viên theo từng nội dung thi đấu</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          Thêm VĐV
        </button>
      </div>

      {/* Category Selector */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {players
          .filter((player) => player.category === selectedCategory)
          .map((player) => (
            <div key={player.id} className="bg-slate-700/50 rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-white">{player.name}</h4>
                  {player.ranking && <p className="text-sm text-blue-400">Hạng: {player.ranking}</p>}
                  {player.partner && <p className="text-sm text-slate-400">Đối tác: {player.partner}</p>}
                </div>
                <div className="flex gap-2">
                  <button className="p-1 text-slate-400 hover:text-blue-400">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-slate-400 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Liên hệ:</span>
                  <span className="text-white">{player.contact}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Trạng thái:</span>
                  <span
                    className={cn(
                      'font-medium',
                      player.status === 'confirmed' && 'text-green-400',
                      player.status === 'pending' && 'text-yellow-400',
                      player.status === 'rejected' && 'text-red-400'
                    )}
                  >
                    {player.status === 'confirmed' && 'Đã xác nhận'}
                    {player.status === 'pending' && 'Chờ duyệt'}
                    {player.status === 'rejected' && 'Từ chối'}
                  </span>
                </div>
              </div>

              {player.status === 'pending' && (
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
      </div>
    </div>
  )

  const renderScheduleTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Lịch thi đấu cầu lông</h3>
          <p className="text-slate-400">Quản lý lịch trình các trận đấu theo từng nội dung</p>
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
                    {match.round}
                  </span>
                  <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                    {match.category}
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
                  <div className="text-center flex-1">
                    <div className="font-semibold text-white">{match.player1}</div>
                  </div>
                  <div className="text-center px-4">
                    <div className="text-xl font-bold text-white">
                      {match.score ? `${match.score.player1Sets} - ${match.score.player2Sets}` : 'VS'}
                    </div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="font-semibold text-white">{match.player2}</div>
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
                    {match.court}
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
        <h3 className="text-xl font-bold text-white mb-2">Luật thi đấu cầu lông</h3>
        <p className="text-slate-400">Cài đặt các quy định và luật chơi cho giải đấu cầu lông</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-white">Quy định thi đấu</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Số set thắng</span>
              <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
                <option>Thắng 2/3 set</option>
                <option>Thắng 1/1 set</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Điểm một set</span>
              <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
                <option>21 điểm</option>
                <option>15 điểm</option>
                <option>11 điểm</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Deuce</span>
              <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
                <option>Có (phải hơn 2 điểm)</option>
                <option>Không (hết giờ là thắng)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-white">Quy định đăng ký</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Giới hạn tuổi tối thiểu</span>
              <input
                type="number"
                defaultValue={16}
                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white w-20"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Giới hạn tuổi tối đa</span>
              <input
                type="number"
                defaultValue={50}
                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white w-20"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Yêu cầu ranking</span>
              <input type="checkbox" className="w-5 h-5 text-blue-500 bg-slate-700 border-slate-600 rounded" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-700/50 rounded-xl p-6">
        <h4 className="font-semibold text-white mb-4">Cài đặt nội dung thi đấu</h4>
        <div className="space-y-3">
          {CATEGORIES.map((category) => (
            <div key={category.id} className="flex justify-between items-center">
              <div>
                <span className="text-slate-300">{category.name}</span>
                <span className="text-slate-400 text-sm ml-2">(Tối đa {category.maxPlayers} VĐV)</span>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 text-blue-500 bg-slate-700 border-slate-600 rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPrizesTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">Giải thưởng</h3>
        <p className="text-slate-400">Thiết lập cơ cấu giải thưởng cho từng nội dung thi đấu</p>
      </div>

      <div className="space-y-6">
        {CATEGORIES.map((category) => (
          <div key={category.id} className="bg-slate-700/50 rounded-xl p-6">
            <h4 className="font-semibold text-white mb-4">{category.name}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">🥇</div>
                  <div className="font-semibold text-white">Huy chương Vàng</div>
                  <input
                    type="text"
                    placeholder="Nhập giải thưởng"
                    className="mt-2 w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-sm"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-400/20 to-gray-400/20 border border-slate-400/30 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">🥈</div>
                  <div className="font-semibold text-white">Huy chương Bạc</div>
                  <input
                    type="text"
                    placeholder="Nhập giải thưởng"
                    className="mt-2 w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-sm"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 border border-amber-600/30 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">🥉</div>
                  <div className="font-semibold text-white">Huy chương Đồng</div>
                  <input
                    type="text"
                    placeholder="Nhập giải thưởng"
                    className="mt-2 w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  switch (activeTab) {
    case 'teams':
      return renderTeamsTab()
    case 'schedule':
      return renderScheduleTab()
    case 'rules':
      return renderRulesTab()
    case 'prizes':
      return renderPrizesTab()
    default:
      return renderTeamsTab()
  }
}
