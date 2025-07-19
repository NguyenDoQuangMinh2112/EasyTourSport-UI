import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Settings, Users, Calendar, Trophy, UserCheck, BarChart3 } from 'lucide-react'
import { cn } from '../utils'
import {
  FootballTournamentSetup,
  BadmintonTournamentSetup,
  TabletennisTournamentSetup
} from '../components/tournament-setup'

// Mapping để hiển thị tên môn thể thao
const SPORT_NAMES: Record<string, string> = {
  football: 'Bóng đá',
  badminton: 'Cầu lông',
  tabletennis: 'Bóng bàn',
  basketball: 'Bóng rổ',
  volleyball: 'Bóng chuyền',
  esports: 'Thể thao điện tử'
}

export interface TournamentData {
  id: string
  name: string
  sport: string
  format: string
  maxTeams: number
  startDate: string
  endDate: string
  venue: string
  entryFee: number
  prizePool: number
  status: 'setup' | 'registration' | 'ongoing' | 'completed'
}

const SETUP_TABS = [
  { id: 'teams', label: 'Đội tham gia', icon: Users, description: 'Quản lý danh sách đội' },
  { id: 'schedule', label: 'Lịch thi đấu', icon: Calendar, description: 'Tạo lịch trận đấu' },
  { id: 'rules', label: 'Luật thi đấu', icon: Settings, description: 'Cài đặt quy định' },
  { id: 'prizes', label: 'Giải thưởng', icon: Trophy, description: 'Thiết lập phần thưởng' }
]

const FOOTBALL_SETUP_TABS = [
  { id: 'teams', label: 'Đội tham gia', icon: Users, description: 'Quản lý danh sách đội' },
  { id: 'players', label: 'Cầu thủ', icon: UserCheck, description: 'Quản lý cầu thủ từng đội' },
  { id: 'schedule', label: 'Lịch thi đấu', icon: Calendar, description: 'Tạo lịch trận đấu' },
  { id: 'standings', label: 'Bảng xếp hạng', icon: BarChart3, description: 'Xem bảng xếp hạng' },
  { id: 'rules', label: 'Luật thi đấu', icon: Settings, description: 'Cài đặt quy định' },
  { id: 'prizes', label: 'Giải thưởng', icon: Trophy, description: 'Thiết lập phần thưởng' }
]

const getTabsForSport = (sport: string) => {
  switch (sport) {
    case 'football':
      return FOOTBALL_SETUP_TABS
    default:
      return SETUP_TABS
  }
}

export function TournamentSetupPage() {
  const { sportId, tournamentId } = useParams<{ sportId: string; tournamentId: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('teams')
  const [tournamentData, setTournamentData] = useState<TournamentData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulation: Load tournament data
    const mockTournamentData: TournamentData = {
      id: tournamentId || '1',
      name: 'Enclave EFC-2025',
      sport: sportId || 'football',
      format: 'round-robin',
      maxTeams: 16,
      startDate: '2024-08-01',
      endDate: '2024-12-01',
      venue: 'Sân vận động Mỹ Đình',
      entryFee: 500000,
      prizePool: 10000000,
      status: 'setup'
    }

    setTimeout(() => {
      setTournamentData(mockTournamentData)
      setLoading(false)
    }, 1000)
  }, [tournamentId, sportId])

  const renderSportSpecificSetup = () => {
    if (!tournamentData) return null

    switch (tournamentData.sport) {
      case 'football':
        return <FootballTournamentSetup tournament={tournamentData} activeTab={activeTab} />
      case 'badminton':
        return <BadmintonTournamentSetup tournament={tournamentData} activeTab={activeTab} />
      case 'tabletennis':
        return <TabletennisTournamentSetup tournament={tournamentData} activeTab={activeTab} />
      default:
        return (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">Môn thể thao này chưa được hỗ trợ</div>
            <button
              onClick={() => navigate('/tournaments')}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Quay về danh sách giải đấu
            </button>
          </div>
        )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen py-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white">Đang tải dữ liệu giải đấu...</div>
        </div>
      </div>
    )
  }

  if (!tournamentData) {
    return (
      <div className="min-h-screen py-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">Không tìm thấy giải đấu</div>
          <button
            onClick={() => navigate('/tournaments')}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Quay về danh sách giải đấu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/tournaments')}
            className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">{tournamentData.name}</h1>
            <p className="text-slate-400">Thiết lập chi tiết giải đấu {SPORT_NAMES[tournamentData.sport]}</p>
          </div>
        </div>

        {/* Tournament Info Summary */}
        <div className="bg-slate-800/30 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{tournamentData.maxTeams}</div>
              <div className="text-slate-400 text-sm">Số đội tối đa</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{tournamentData.format}</div>
              <div className="text-slate-400 text-sm">Hình thức</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {new Date(tournamentData.startDate).toLocaleDateString('vi-VN')}
              </div>
              <div className="text-slate-400 text-sm">Ngày bắt đầu</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {(tournamentData.prizePool / 1000000).toFixed(1)}M VNĐ
              </div>
              <div className="text-slate-400 text-sm">Giải thưởng</div>
            </div>
          </div>
        </div>

        {/* Setup Tabs */}
        <div className="mb-8">
          <div className="border-b border-slate-700">
            <nav className="flex space-x-8">
              {getTabsForSport(tournamentData.sport).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors cursor-pointer',
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
        <div className="bg-slate-800/30 rounded-2xl p-8">{renderSportSpecificSetup()}</div>
      </div>
    </div>
  )
}
