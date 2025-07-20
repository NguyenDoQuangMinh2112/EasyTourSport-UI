import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '../utils'
import {
  ArrowLeft,
  ArrowRight,
  User,
  Settings,
  Calendar,
  DollarSign,
  Check,
  Trophy,
  Star,
  AlertCircle,
  RefreshCw,
  Copy,
  Lock
} from 'lucide-react'
import { SPORTS_DATA } from '../constants/data'
import { PageHeader } from '../components/ui/page-header'

// Mapping để hiển thị tên môn thể thao
const SPORT_NAMES: Record<string, string> = {
  football: 'Bóng đá',
  badminton: 'Cầu lông',
  tabletennis: 'Bóng bàn',
  basketball: 'Bóng rổ',
  volleyball: 'Bóng chuyền',
  esports: 'Thể thao điện tử'
}

interface TournamentForm {
  // Bước 1: Thông tin cơ bản
  name: string
  description: string
  sport: string

  // Bước 2: Cài đặt giải đấu
  format: 'round-robin' | 'single-elimination' | 'hybrid'
  maxTeams: number
  invitationCode: string

  // Bước 3: Lịch trình & Địa điểm
  startDate: string
  endDate: string
  venue: string

  // Bước 4: Phí & Giải thưởng
  entryFee: number
  prizePool: number

  // Bước 5: Xác nhận
  confirmed: boolean
}

const STEPS = [
  { id: 1, title: 'Thông tin cơ bản', icon: User, description: 'Nhập thông tin cơ bản về giải đấu' },
  { id: 2, title: 'Cài đặt giải đấu', icon: Settings, description: 'Chọn hình thức và quy mô giải đấu' },
  { id: 3, title: 'Lịch trình & Địa điểm', icon: Calendar, description: 'Thiết lập thời gian và địa điểm' },
  { id: 4, title: 'Phí & Giải thưởng', icon: DollarSign, description: 'Cài đặt phí tham gia và vá giải thưởng' },
  { id: 5, title: 'Xác nhận', icon: Check, description: 'Kiểm tra và xác nhận thông tin' }
]

const TOURNAMENT_FORMATS = [
  {
    id: 'round-robin',
    name: 'Giải vòng tròn',
    description: 'Mỗi đội đấu với tất cả các đội khác',
    icon: '⚽'
  },
  {
    id: 'single-elimination',
    name: 'Loại trực tiếp',
    description: 'Thua là bị loại ngay',
    icon: '🏆'
  },
  {
    id: 'hybrid',
    name: 'Vòng bảng + Loại trực tiếp',
    description: 'Kết hợp cả hai hình thức',
    icon: '⚡'
  }
]

export function TournamentCreatePage() {
  const { t } = useTranslation()
  const { sportId } = useParams<{ sportId: string }>()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [copiedCode, setCopiedCode] = useState(false)
  const [isCustomCode, setIsCustomCode] = useState(false)
  const [customTeamCount, setCustomTeamCount] = useState(false)

  // Function to generate random invitation code
  const generateInvitationCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  // Function to copy invitation code
  const copyInvitationCode = async () => {
    try {
      await navigator.clipboard.writeText(formData.invitationCode)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const [formData, setFormData] = useState<TournamentForm>({
    name: '',
    description: '',
    sport: sportId || 'football',
    format: 'round-robin',
    maxTeams: 16,
    invitationCode: generateInvitationCode(),
    startDate: '',
    endDate: '',
    venue: '',
    entryFee: 0,
    prizePool: 0,
    confirmed: false
  })

  const selectedSport = SPORTS_DATA.find((s) => s.id === formData.sport)

  const updateFormData = (field: keyof TournamentForm, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    // Validation for step 2 (invitation code)
    if (currentStep === 2 && isCustomCode && formData.invitationCode.length < 3) {
      alert('Mã tham gia cần có ít nhất 3 ký tự')
      return
    }

    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCreateTournament = () => {
    // Simulation of creating tournament
    updateFormData('confirmed', true)
    setTimeout(() => {
      // Redirect to tournament setup page with sport and mock tournament ID
      navigate(`/tournaments/setup/${formData.sport}/mock-tournament-${Date.now()}`)
    }, 2000)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-1">Thông tin cơ bản</h2>
              <p className="text-sm text-slate-400">Nhập thông tin cơ bản về giải đấu của bạn</p>
            </div>

            <div className="space-y-5">
              {/* Chọn môn thể thao - compact grid */}
              <div>
                <label className="block text-white font-medium text-sm mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Chọn môn thể thao
                </label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {SPORTS_DATA.map((sport) => (
                    <button
                      key={sport.id}
                      onClick={() => updateFormData('sport', sport.id)}
                      className={cn(
                        'p-4 rounded-xl border-2 transition-all duration-200 text-center group hover:scale-105 relative cursor-pointer',
                        formData.sport === sport.id
                          ? 'border-blue-400 bg-gradient-to-br from-blue-500/20 to-purple-500/20 shadow-lg shadow-blue-500/25'
                          : 'border-slate-600 hover:border-slate-500 bg-slate-800/50'
                      )}
                    >
                      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                        {sport.icon}
                      </div>
                      <div className="font-medium text-white text-xs">{SPORT_NAMES[sport.id]}</div>
                      {formData.sport === sport.id && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tên giải đấu và số đội */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium text-sm mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Tên giải đấu
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    placeholder="VD: Premier League 2024"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium text-sm mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Số đội tham gia
                  </label>
                  <div className="space-y-3">
                    {/* Toggle between preset and custom */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setCustomTeamCount(false)}
                        className={cn(
                          'px-3 py-1.5 text-xs rounded-lg transition-all duration-200 cursor-pointer',
                          !customTeamCount
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-slate-700/50 text-slate-400 hover:bg-slate-600/50'
                        )}
                      >
                        Chọn sẵn
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomTeamCount(true)}
                        className={cn(
                          'px-3 py-1.5 text-xs rounded-lg transition-all duration-200 cursor-pointer',
                          customTeamCount
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-slate-700/50 text-slate-400 hover:bg-slate-600/50'
                        )}
                      >
                        Tùy chỉnh
                      </button>
                    </div>

                    {!customTeamCount ? (
                      <select
                        value={formData.maxTeams}
                        onChange={(e) => updateFormData('maxTeams', parseInt(e.target.value))}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none cursor-pointer"
                      >
                        <option value={4}>4 đội</option>
                        <option value={8}>8 đội</option>
                        <option value={16}>16 đội</option>
                        <option value={32}>32 đội</option>
                        <option value={64}>64 đội</option>
                      </select>
                    ) : (
                      <input
                        type="number"
                        value={formData.maxTeams}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 2
                          updateFormData('maxTeams', Math.max(2, Math.min(128, value)))
                        }}
                        min="2"
                        max="128"
                        placeholder="Nhập số đội (2-128)"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                      />
                    )}
                    <p className="text-xs text-slate-400">
                      {customTeamCount
                        ? '💡 Có thể nhập từ 2 đến 128 đội'
                        : '💡 Hoặc chọn "Tùy chỉnh" để nhập số đội bất kỳ'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mô tả */}
              <div>
                <label className="block text-white font-medium text-sm mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  Mô tả giải đấu
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  placeholder="Nhập mô tả chi tiết về giải đấu của bạn..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none resize-none transition-all duration-200"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-5">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-1">Cài đặt giải đấu</h2>
              <p className="text-sm text-slate-400">Chọn hình thức và quy mô giải đấu</p>
            </div>

            <div className="space-y-4">
              {/* Hình thức thi đấu - compact cards */}
              <div>
                <label className="block text-white font-medium text-sm mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Hình thức thi đấu
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {TOURNAMENT_FORMATS.map((format) => (
                    <button
                      key={format.id}
                      onClick={() => updateFormData('format', format.id)}
                      className={cn(
                        'p-4 rounded-lg border text-center transition-all duration-200 hover:scale-105 relative cursor-pointer',
                        formData.format === format.id
                          ? 'border-purple-500 bg-purple-500/10 shadow-lg'
                          : 'border-slate-600 hover:border-slate-500 bg-slate-800/30'
                      )}
                    >
                      <div className="text-2xl mb-2">{format.icon}</div>
                      <div className="font-medium text-white text-sm mb-1">{format.name}</div>
                      <div className="text-xs text-slate-400">{format.description}</div>
                      {formData.format === format.id && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mã tham gia giải đấu */}
              <div>
                <label className="block text-white font-medium text-sm mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  Mã tham gia giải đấu
                </label>

                {/* Toggle between auto and custom code */}
                <div className="flex items-center gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomCode(false)
                      updateFormData('invitationCode', generateInvitationCode())
                    }}
                    className={cn(
                      'px-3 py-1.5 text-xs rounded-lg transition-all duration-200 cursor-pointer',
                      !isCustomCode
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-slate-700/50 text-slate-400 hover:bg-slate-600/50'
                    )}
                  >
                    Tự động
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCustomCode(true)}
                    className={cn(
                      'px-3 py-1.5 text-xs rounded-lg transition-all duration-200 cursor-pointer',
                      isCustomCode
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-slate-700/50 text-slate-400 hover:bg-slate-600/50'
                    )}
                  >
                    Tùy chỉnh
                  </button>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Lock className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.invitationCode}
                      onChange={(e) => {
                        if (isCustomCode) {
                          const value = e.target.value
                            .toUpperCase()
                            .replace(/[^A-Z0-9]/g, '')
                            .slice(0, 8)
                          updateFormData('invitationCode', value)
                        }
                      }}
                      readOnly={!isCustomCode}
                      placeholder={isCustomCode ? 'VD: MYTEAM24, LEAGUE1, TOURN2025' : ''}
                      className={cn(
                        'w-full pl-10 pr-4 py-3 border rounded-lg text-white font-mono text-center text-lg tracking-wider transition-all duration-200',
                        isCustomCode
                          ? 'bg-slate-800/70 border-slate-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20'
                          : 'bg-slate-800/50 border-slate-600 cursor-not-allowed'
                      )}
                      maxLength={8}
                    />
                  </div>

                  {!isCustomCode && (
                    <button
                      type="button"
                      onClick={() => updateFormData('invitationCode', generateInvitationCode())}
                      className="px-4 py-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 hover:bg-yellow-500/30 transition-all duration-200 flex items-center gap-2 cursor-pointer"
                      title="Tạo mã mới"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={copyInvitationCode}
                    className={cn(
                      'px-4 py-3 border rounded-lg transition-all duration-200 flex items-center gap-2 cursor-pointer',
                      copiedCode
                        ? 'bg-green-500/20 border-green-500/30 text-green-400'
                        : 'bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30'
                    )}
                    title="Sao chép mã"
                  >
                    {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <p className="text-xs text-slate-400 mt-2 flex items-center gap-2">
                  <span>💡</span>
                  {isCustomCode
                    ? 'Tạo mã riêng của bạn (tối đa 8 ký tự, chỉ chữ và số)'
                    : 'Mã này sẽ được dùng để người chơi tham gia vào giải đấu của bạn'}
                </p>

                {/* Validation warning for custom code */}
                {isCustomCode && formData.invitationCode.length > 0 && formData.invitationCode.length < 3 && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-orange-400">
                    <AlertCircle className="w-3 h-3" />
                    <span>Mã tham gia nên có ít nhất 3 ký tự để dễ nhớ</span>
                  </div>
                )}

                {/* Show success for valid custom code */}
                {isCustomCode && formData.invitationCode.length >= 3 && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-green-400">
                    <Check className="w-3 h-3" />
                    <span>Mã tham gia hợp lệ!</span>
                  </div>
                )}
              </div>

              {/* Quick stats */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">i</span>
                  </div>
                  <span className="text-blue-400 font-medium">Thống kê nhanh:</span>
                  <span className="text-slate-300">
                    {formData.maxTeams} đội • Mã: {formData.invitationCode} •{' '}
                    {formData.format === 'round-robin'
                      ? 'Vòng tròn'
                      : formData.format === 'single-elimination'
                      ? 'Loại trực tiếp'
                      : 'Kết hợp'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-5">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-1">Lịch trình & Địa điểm</h2>
              <p className="text-sm text-slate-400">Thiết lập thời gian và địa điểm</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Ngày bắt đầu */}
                <div>
                  <label className="block text-white font-medium text-sm mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Ngày bắt đầu
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => updateFormData('startDate', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Ngày kết thúc */}
                <div>
                  <label className="block text-white font-medium text-sm mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Ngày kết thúc
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => updateFormData('endDate', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Địa điểm */}
              <div>
                <label className="block text-white font-medium text-sm mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  Địa điểm thi đấu
                </label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => updateFormData('venue', e.target.value)}
                  placeholder="VD: Sân vận động Mỹ Đình"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Lưu ý */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium text-blue-400 mb-1">Lưu ý về lịch trình</div>
                    <div className="text-slate-300 text-xs">
                      Hệ thống sẽ tự động tạo lịch thi đấu dựa trên số đội và hình thức thi đấu.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-5">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-1">Phí & Giải thưởng</h2>
              <p className="text-sm text-slate-400">Cài đặt chi phí và giải thưởng</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Lệ phí tham gia */}
                <div>
                  <label className="block text-white font-medium text-sm mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Lệ phí tham gia (VNĐ)
                  </label>
                  <input
                    type="number"
                    value={formData.entryFee}
                    onChange={(e) => updateFormData('entryFee', parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Tổng giải thưởng */}
                <div>
                  <label className="block text-white font-medium text-sm mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Tổng giải thưởng (VNĐ)
                  </label>
                  <input
                    type="number"
                    value={formData.prizePool}
                    onChange={(e) => updateFormData('prizePool', parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Phân bổ giải thưởng */}
              {formData.prizePool > 0 && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="font-medium text-green-400 text-sm">Phân bổ đề xuất</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <div className="text-lg mb-1">🥇</div>
                      <div className="text-yellow-400 font-medium">Nhất</div>
                      <div className="text-slate-300">{(formData.prizePool * 0.5).toLocaleString('vi-VN')} VNĐ</div>
                    </div>
                    <div className="text-center p-3 bg-gray-500/10 rounded-lg border border-gray-500/20">
                      <div className="text-lg mb-1">🥈</div>
                      <div className="text-gray-400 font-medium">Nhì</div>
                      <div className="text-slate-300">{(formData.prizePool * 0.3).toLocaleString('vi-VN')} VNĐ</div>
                    </div>
                    <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <div className="text-lg mb-1">🥉</div>
                      <div className="text-orange-400 font-medium">Ba</div>
                      <div className="text-slate-300">{(formData.prizePool * 0.2).toLocaleString('vi-VN')} VNĐ</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-5">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-1">Xác nhận thông tin</h2>
              <p className="text-sm text-slate-400">Kiểm tra và xác nhận thông tin giải đấu</p>
            </div>

            <div className="space-y-4">
              {/* Summary cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                  <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Thông tin cơ bản
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tên:</span>
                      <span className="text-white">{formData.name || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Môn:</span>
                      <span className="text-white">{SPORT_NAMES[selectedSport?.id || '']}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Hình thức:</span>
                      <span className="text-white">
                        {TOURNAMENT_FORMATS.find((f) => f.id === formData.format)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Số đội:</span>
                      <span className="text-white">{formData.maxTeams} đội</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                  <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Lịch trình & Chi phí
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Thời gian:</span>
                      <span className="text-white text-xs">
                        {formData.startDate && formData.endDate ? `${formData.startDate} - ${formData.endDate}` : '-'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Địa điểm:</span>
                      <span className="text-white text-xs">{formData.venue || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Phí tham gia:</span>
                      <span className="text-white">{formData.entryFee.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Giải thưởng:</span>
                      <span className="text-white">{formData.prizePool.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invitation Code Card */}
              <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-lg p-4 border border-yellow-500/30">
                <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-yellow-400" />
                  Mã tham gia giải đấu
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="font-mono text-2xl text-yellow-400 bg-yellow-500/10 px-4 py-2 rounded-lg border border-yellow-500/20">
                      {formData.invitationCode}
                    </div>
                    <div className="text-sm text-slate-300">
                      <p>Chia sẻ mã này với người chơi</p>
                      <p className="text-xs text-slate-400">để họ có thể tham gia giải đấu</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={copyInvitationCode}
                    className={cn(
                      'px-4 py-2 border rounded-lg transition-all duration-200 flex items-center gap-2 cursor-pointer',
                      copiedCode
                        ? 'bg-green-500/20 border-green-500/30 text-green-400'
                        : 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/30'
                    )}
                  >
                    {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span className="text-sm">{copiedCode ? 'Đã sao chép!' : 'Sao chép'}</span>
                  </button>
                </div>
              </div>

              {/* Description if exists */}
              {formData.description && (
                <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                  <h3 className="font-medium text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    Mô tả
                  </h3>
                  <p className="text-sm text-slate-300">{formData.description}</p>
                </div>
              )}

              {/* Next steps info */}
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium text-yellow-400 mb-1">Bước tiếp theo</div>
                    <div className="text-slate-300 text-xs">
                      Sau khi tạo giải đấu, bạn sẽ được chuyển đến trang cài đặt để thêm đội và lên lịch thi đấu.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="floating-element absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-20 left-1/4 w-24 h-24 bg-green-500/10 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-40 right-1/3 w-28 h-28 bg-yellow-500/10 rounded-full blur-xl"></div>
      </div>

      {/* Header compact với gradient */}
      <div className="relative bg-gradient-to-r from-slate-800/90 to-slate-900/90 backdrop-blur-lg border-b border-slate-700/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 group cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center tournament-step-icon">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Tạo giải đấu mới</h1>
                <p className="text-sm text-slate-400">Bước {currentStep}/5</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-6">
        {/* Progress Steps - compact version */}
        <div className="mb-6">
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-600 -translate-y-1/2 rounded-full" />
              <div
                className="absolute top-1/2 left-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 -translate-y-1/2 transition-all duration-500 rounded-full"
                style={{ width: `calc(${((currentStep - 1) / (STEPS.length - 1)) * 100}% - 32px)` }}
              />

              {STEPS.map((step, index) => (
                <div key={step.id} className="relative flex flex-col items-center z-10">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-lg',
                      currentStep > step.id
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-400 text-white'
                        : currentStep === step.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-blue-400 text-white scale-110'
                        : 'bg-slate-700 border-slate-600 text-slate-400'
                    )}
                  >
                    {currentStep > step.id ? <Check className="w-5 h-5" /> : <step.icon className="w-4 h-4" />}
                  </div>
                  <div className="mt-2 text-center hidden md:block">
                    <div
                      className={cn('text-xs font-medium', currentStep >= step.id ? 'text-white' : 'text-slate-400')}
                    >
                      {step.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - single column compact */}
        <div className="tournament-card bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-2xl">
          {/* Step indicator bar */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-6 py-3 border-b border-slate-700/50 tournament-progress-bar">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center tournament-step-icon">
                  {React.createElement(STEPS[currentStep - 1].icon, { className: 'w-4 h-4 text-white' })}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{STEPS[currentStep - 1].title}</div>
                  <div className="text-xs text-slate-400">{STEPS[currentStep - 1].description}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-slate-700 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-500 "
                    style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {Math.round((currentStep / STEPS.length) * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 tournament-form-group">{renderStepContent()}</div>

          {/* Navigation Buttons */}
          <div className="bg-slate-800/50 px-6 py-4 border-t border-slate-700/50 flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200',
                currentStep === 1
                  ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white shadow-md hover:shadow-lg tournament-button cursor-pointer'
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Quay lại</span>
            </button>

            {currentStep < STEPS.length ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg tournament-button cursor-pointer"
              >
                <span className="hidden sm:inline">Tiếp theo</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleCreateTournament}
                disabled={formData.confirmed}
                className={cn(
                  'flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg',
                  formData.confirmed
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:scale-105 tournament-button cursor-pointer'
                )}
              >
                {formData.confirmed ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="hidden sm:inline">Hoàn tất</span>
                  </>
                ) : (
                  <>
                    <Trophy className="w-4 h-4" />
                    <span className="hidden sm:inline">Tạo giải đấu</span>
                    <span className="sm:hidden">Create</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
