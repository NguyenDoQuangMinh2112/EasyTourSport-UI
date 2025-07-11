import { useState } from 'react'
import { Plus, Edit, Trash2, Calendar, MapPin, Clock } from 'lucide-react'
import { cn } from '../../utils'
import type { TournamentData } from '../../pages/tournament-setup'

interface Player {
  id: string
  name: string
  rating?: number
  contact: string
  status: 'pending' | 'confirmed' | 'rejected'
  category: 'men-singles' | 'women-singles' | 'men-doubles' | 'women-doubles' | 'mixed-doubles'
  partner?: string
  age: number
}

interface Match {
  id: string
  round: string
  category: string
  player1: string
  player2: string
  date: string
  time: string
  table: number
  status: 'scheduled' | 'ongoing' | 'completed'
  score?: {
    player1Sets: number
    player2Sets: number
    sets: Array<{ player1: number; player2: number }>
  }
}

interface TabletennisTournamentSetupProps {
  tournament: TournamentData
  activeTab: string
}

const CATEGORIES = [
  { id: 'men-singles', name: 'Nam đơn', maxPlayers: 64 },
  { id: 'women-singles', name: 'Nữ đơn', maxPlayers: 64 },
  { id: 'men-doubles', name: 'Nam đôi', maxPlayers: 32 },
  { id: 'women-doubles', name: 'Nữ đôi', maxPlayers: 32 },
  { id: 'mixed-doubles', name: 'Đôi nam nữ', maxPlayers: 32 }
]

const AGE_GROUPS = [
  { id: 'u15', name: 'U15 (Dưới 15 tuổi)', min: 0, max: 14 },
  { id: 'u18', name: 'U18 (Dưới 18 tuổi)', min: 15, max: 17 },
  { id: 'open', name: 'Mở rộng (18+ tuổi)', min: 18, max: 50 },
  { id: 'veteran', name: 'Cao tuổi (50+ tuổi)', min: 50, max: 100 }
]

const MOCK_PLAYERS: Player[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    rating: 1800,
    contact: '0123456789',
    status: 'confirmed',
    category: 'men-singles',
    age: 25
  },
  {
    id: '2',
    name: 'Trần Thị B',
    rating: 1650,
    contact: '0987654321',
    status: 'confirmed',
    category: 'women-singles',
    age: 22
  },
  {
    id: '3',
    name: 'Lê Văn C',
    rating: 1700,
    contact: '0111222333',
    status: 'pending',
    category: 'men-doubles',
    partner: 'Phạm Văn D',
    age: 28
  }
]

const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    round: 'Vòng 1/32',
    category: 'Nam đơn',
    player1: 'Nguyễn Văn A',
    player2: 'Trần Văn E',
    date: '2024-08-15',
    time: '09:00',
    table: 1,
    status: 'scheduled'
  },
  {
    id: '2',
    round: 'Vòng 1/32',
    category: 'Nữ đơn',
    player1: 'Trần Thị B',
    player2: 'Nguyễn Thị F',
    date: '2024-08-15',
    time: '09:30',
    table: 2,
    status: 'scheduled'
  }
]

export function TabletennisTournamentSetup({ activeTab }: TabletennisTournamentSetupProps) {
  const [players] = useState<Player[]>(MOCK_PLAYERS)
  const [matches] = useState<Match[]>(MOCK_MATCHES)
  const [selectedCategory, setSelectedCategory] = useState('men-singles')
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('open')

  const renderTeamsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Vận động viên tham gia</h3>
          <p className="text-slate-400">Quản lý danh sách vận động viên theo nội dung và độ tuổi</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          Thêm VĐV
        </button>
      </div>

      {/* Category and Age Group Selectors */}
      <div className="space-y-4">
        <div>
          <label className="block text-white font-medium mb-2">Nội dung thi đấu</label>
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
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Nhóm tuổi</label>
          <div className="flex flex-wrap gap-2">
            {AGE_GROUPS.map((ageGroup) => (
              <button
                key={ageGroup.id}
                onClick={() => setSelectedAgeGroup(ageGroup.id)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  selectedAgeGroup === ageGroup.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                )}
              >
                {ageGroup.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {players
          .filter((player) => {
            const ageGroup = AGE_GROUPS.find((ag) => ag.id === selectedAgeGroup)
            return (
              player.category === selectedCategory &&
              ageGroup &&
              player.age >= ageGroup.min &&
              player.age <= ageGroup.max
            )
          })
          .map((player) => (
            <div key={player.id} className="bg-slate-700/50 rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-white">{player.name}</h4>
                  <p className="text-sm text-slate-400">Tuổi: {player.age}</p>
                  {player.rating && <p className="text-sm text-green-400">Rating: {player.rating}</p>}
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
          <h3 className="text-xl font-bold text-white mb-2">Lịch thi đấu bóng bàn</h3>
          <p className="text-slate-400">Quản lý lịch trình các trận đấu và bàn thi đấu</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
            <MapPin className="w-4 h-4" />
            Quản lý bàn
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
            <Calendar className="w-4 h-4" />
            Tạo lịch tự động
          </button>
        </div>
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
                  <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm font-medium">
                    Bàn {match.table}
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
                    Bàn {match.table}
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
        <h3 className="text-xl font-bold text-white mb-2">Luật thi đấu bóng bàn</h3>
        <p className="text-slate-400">Cài đặt các quy định và luật chơi cho giải đấu bóng bàn</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-white">Quy định thi đấu</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Số set thắng</span>
              <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
                <option>Thắng 4/7 set</option>
                <option>Thắng 3/5 set</option>
                <option>Thắng 2/3 set</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Điểm một set</span>
              <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
                <option>11 điểm</option>
                <option>21 điểm</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Deuce 10-10</span>
              <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
                <option>Phải hơn 2 điểm</option>
                <option>Tối đa đến 15 điểm</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-white">Quy định thiết bị</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Vợt chuẩn ITTF</span>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 text-blue-500 bg-slate-700 border-slate-600 rounded"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Bóng 3 sao</span>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 text-blue-500 bg-slate-700 border-slate-600 rounded"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Đồng phục bắt buộc</span>
              <input type="checkbox" className="w-5 h-5 text-blue-500 bg-slate-700 border-slate-600 rounded" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-700/50 rounded-xl p-6">
        <h4 className="font-semibold text-white mb-4">Cài đặt nhóm tuổi</h4>
        <div className="space-y-3">
          {AGE_GROUPS.map((ageGroup) => (
            <div key={ageGroup.id} className="flex justify-between items-center">
              <div>
                <span className="text-slate-300">{ageGroup.name}</span>
                <span className="text-slate-400 text-sm ml-2">
                  ({ageGroup.min} - {ageGroup.max === 100 ? '∞' : ageGroup.max} tuổi)
                </span>
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

      <div className="bg-slate-700/50 rounded-xl p-6">
        <h4 className="font-semibold text-white mb-4">Rating và Seeding</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Sử dụng rating làm seeding</span>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-blue-500 bg-slate-700 border-slate-600 rounded"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Rating tối thiểu</span>
            <input
              type="number"
              defaultValue={1000}
              className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white w-24"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Rating tối đa</span>
            <input
              type="number"
              defaultValue={2500}
              className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white w-24"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderPrizesTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">Giải thưởng</h3>
        <p className="text-slate-400">Thiết lập cơ cấu giải thưởng cho từng nội dung và nhóm tuổi</p>
      </div>

      <div className="space-y-6">
        {CATEGORIES.map((category) => (
          <div key={category.id} className="bg-slate-700/50 rounded-xl p-6">
            <h4 className="font-semibold text-white mb-4">{category.name}</h4>

            {AGE_GROUPS.map((ageGroup) => (
              <div key={`${category.id}-${ageGroup.id}`} className="mb-6 last:mb-0">
                <h5 className="text-slate-300 font-medium mb-3">{ageGroup.name}</h5>
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
