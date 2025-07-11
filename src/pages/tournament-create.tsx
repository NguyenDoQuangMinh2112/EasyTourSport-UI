import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
  AlertCircle
} from 'lucide-react'
import { SPORTS_DATA } from '../constants/data'

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
  const { sportId } = useParams<{ sportId: string }>()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<TournamentForm>({
    name: '',
    description: '',
    sport: sportId || 'football',
    format: 'round-robin',
    maxTeams: 16,
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
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Thông tin cơ bản</h2>
              <p className="text-slate-400">Nhập thông tin cơ bản về giải đấu của bạn</p>
            </div>

            <div className="space-y-8">
              {/* Chọn môn thể thao */}
              <div>
                <label className="block text-white font-semibold text-lg mb-4">Chọn môn thể thao</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {SPORTS_DATA.slice(0, 4).map((sport) => (
                    <button
                      key={sport.id}
                      onClick={() => updateFormData('sport', sport.id)}
                      className={cn(
                        'p-6 rounded-2xl border-2 transition-all duration-300 text-center group hover:scale-105',
                        formData.sport === sport.id
                          ? 'border-blue-400 bg-gradient-to-br from-blue-500/20 to-purple-500/20 shadow-lg shadow-blue-500/25'
                          : 'border-slate-600 hover:border-slate-500 bg-slate-800/50'
                      )}
                    >
                      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
                        {sport.icon}
                      </div>
                      <div className="font-semibold text-white text-sm">{SPORT_NAMES[sport.id]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tên giải đấu */}
              <div>
                <label className="block text-white font-semibold text-lg mb-3">Tên giải đấu</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="VD: Premier League 2024"
                  className="w-full px-6 py-4 bg-slate-800/50 border-2 border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-all duration-200 text-lg"
                />
              </div>

              {/* Mô tả */}
              <div>
                <label className="block text-white font-semibold text-lg mb-3">Mô tả giải đấu</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  placeholder="Nhập mô tả chi tiết về giải đấu của bạn..."
                  rows={5}
                  className="w-full px-6 py-4 bg-slate-800/50 border-2 border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none resize-none transition-all duration-200 text-lg"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Bước 2: Cài đặt giải đấu</h2>
            <p className="text-slate-400 mb-6">Chọn hình thức và quy mô giải đấu</p>

            <div className="space-y-6">
              {/* Hình thức thi đấu */}
              <div>
                <label className="block text-white font-medium mb-3">Hình thức thi đấu</label>
                <div className="space-y-3">
                  {TOURNAMENT_FORMATS.map((format) => (
                    <button
                      key={format.id}
                      onClick={() => updateFormData('format', format.id)}
                      className={cn(
                        'w-full p-4 rounded-lg border text-left transition-all duration-200',
                        formData.format === format.id
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-slate-600 hover:border-slate-500'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{format.icon}</span>
                        <div>
                          <div className="font-medium text-white">{format.name}</div>
                          <div className="text-sm text-slate-400">{format.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Số đội tối đa */}
              <div>
                <label className="block text-white font-medium mb-2">Số đội tối đa</label>
                <select
                  value={formData.maxTeams}
                  onChange={(e) => updateFormData('maxTeams', parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value={8}>8 đội</option>
                  <option value={16}>16 đội</option>
                  <option value={32}>32 đội</option>
                  <option value={64}>64 đội</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Bước 3: Lịch trình & Địa điểm</h2>
            <p className="text-slate-400 mb-6">Thiết lập thời gian và địa điểm</p>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ngày bắt đầu */}
                <div>
                  <label className="block text-white font-medium mb-2">Ngày bắt đầu</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => updateFormData('startDate', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Ngày kết thúc */}
                <div>
                  <label className="block text-white font-medium mb-2">Ngày kết thúc</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => updateFormData('endDate', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Địa điểm thi đấu */}
              <div>
                <label className="block text-white font-medium mb-2">Địa điểm thi đấu</label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => updateFormData('venue', e.target.value)}
                  placeholder="VD: Sân vận động Mỹ Đình"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Lưu ý về lịch trình */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <div className="font-medium text-blue-400 mb-1">Lưu ý về lịch trình</div>
                    <div className="text-sm text-slate-300">
                      Hệ thống sẽ tự động tạo lịch thi đấu dựa trên số đội và hình thức thi đấu bạn chọn.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Bước 4: Phí & Giải thưởng</h2>
            <p className="text-slate-400 mb-6">Cài đặt phí tham gia và vá giải thưởng</p>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lệ phí tham gia */}
                <div>
                  <label className="block text-white font-medium mb-2">Lệ phí tham gia (VNĐ)</label>
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
                  <label className="block text-white font-medium mb-2">Tổng giải thưởng (VNĐ)</label>
                  <input
                    type="number"
                    value={formData.prizePool}
                    onChange={(e) => updateFormData('prizePool', parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Phân bổ giải thưởng đề xuất */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-green-400 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium text-green-400 mb-2">Phân bổ giải thưởng đề xuất</div>
                    {formData.prizePool > 0 && (
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between text-slate-300">
                          <span>🥇 Nhất: 50% tổng giải thưởng</span>
                          <span>{(formData.prizePool * 0.5).toLocaleString('vi-VN')} VNĐ</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>🥈 Nhì: 30% tổng giải thưởng</span>
                          <span>{(formData.prizePool * 0.3).toLocaleString('vi-VN')} VNĐ</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>🥉 Ba: 20% tổng giải thưởng</span>
                          <span>{(formData.prizePool * 0.2).toLocaleString('vi-VN')} VNĐ</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Bước 5: Xác nhận</h2>
            <p className="text-slate-400 mb-6">Kiểm tra và xác nhận thông tin</p>

            <div className="space-y-6">
              {/* Xác nhận thông tin giải đấu */}
              <div className="bg-slate-800/30 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-white mb-4">Xác nhận thông tin giải đấu</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Tên giải đấu:</span>
                    <div className="text-white font-medium">{formData.name || '-'}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Môn thể thao:</span>
                    <div className="text-white font-medium">{SPORT_NAMES[selectedSport?.id || '']}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Hình thức:</span>
                    <div className="text-white font-medium">
                      {TOURNAMENT_FORMATS.find((f) => f.id === formData.format)?.name}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Số đội:</span>
                    <div className="text-white font-medium">{formData.maxTeams} đội</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Thời gian:</span>
                    <div className="text-white font-medium">
                      {formData.startDate && formData.endDate ? `${formData.startDate} - ${formData.endDate}` : '-'}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Địa điểm:</span>
                    <div className="text-white font-medium">{formData.venue || '-'}</div>
                  </div>
                </div>
              </div>

              {/* Bước tiếp theo */}
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <div className="font-medium text-yellow-400 mb-1">Bước tiếp theo</div>
                    <div className="text-sm text-slate-300">
                      Sau khi tạo giải đấu, bạn sẽ được chuyển đến trang cài đặt chi tiết để thêm đội bóng và lên lịch
                      thi đấu.
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
    <div className="min-h-screen py-6">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header với Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">Tạo giải đấu mới</h1>
            <p className="text-slate-400">Thiết lập giải đấu chuyên nghiệp trong vài bước đơn giản</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="bg-slate-800/20 rounded-2xl p-6">
            <div className="flex items-center justify-between relative max-w-4xl mx-auto">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-700 -translate-y-1/2 rounded-full" />
              <div
                className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 -translate-y-1/2 transition-all duration-500 rounded-full"
                style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
              />

              {STEPS.map((step) => (
                <div key={step.id} className="relative flex flex-col items-center z-10">
                  <div
                    className={cn(
                      'w-14 h-14 rounded-full flex items-center justify-center border-3 transition-all duration-300 shadow-lg',
                      currentStep > step.id
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-400 text-white'
                        : currentStep === step.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-blue-400 text-white animate-pulse'
                        : 'bg-slate-800 border-slate-600 text-slate-400'
                    )}
                  >
                    {currentStep > step.id ? <Check className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
                  </div>
                  <div className="mt-3 text-center">
                    <div
                      className={cn(
                        'text-sm font-semibold mb-1',
                        currentStep >= step.id ? 'text-white' : 'text-slate-400'
                      )}
                    >
                      {step.title}
                    </div>
                    <div
                      className={cn(
                        'text-xs hidden lg:block max-w-24',
                        currentStep >= step.id ? 'text-slate-300' : 'text-slate-500'
                      )}
                    >
                      {step.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Step Info */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/30 rounded-2xl p-6 sticky top-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  {React.createElement(STEPS[currentStep - 1].icon, { className: 'w-5 h-5 text-white' })}
                </div>
                <div>
                  <div className="text-sm text-slate-400">Bước {currentStep}</div>
                  <div className="font-semibold text-white">{STEPS[currentStep - 1].title}</div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mb-6">{STEPS[currentStep - 1].description}</p>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tiến độ</span>
                  <span className="text-white">
                    {currentStep}/{STEPS.length}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/30 rounded-2xl p-8 mb-8">{renderStepContent()}</div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200',
                  currentStep === 1
                    ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white shadow-lg hover:shadow-xl'
                )}
              >
                <ArrowLeft className="w-4 h-4" />
                Bước trước
              </button>

              {currentStep < STEPS.length ? (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Bước tiếp theo
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleCreateTournament}
                  disabled={formData.confirmed}
                  className={cn(
                    'flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl',
                    formData.confirmed
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:scale-105'
                  )}
                >
                  {formData.confirmed ? (
                    <>
                      <Check className="w-4 h-4" />
                      Đã tạo thành công
                    </>
                  ) : (
                    <>
                      <Trophy className="w-4 h-4" />
                      Tạo giải đấu
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
