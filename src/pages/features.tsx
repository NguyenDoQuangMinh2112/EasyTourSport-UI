import { useNavigate } from 'react-router-dom'
import {
  Trophy,
  Users,
  Calendar,
  BarChart3,
  Target,
  Award,
  Zap,
  Star,
  Activity,
  TrendingUp,
  MapPin,
  Clock,
  Medal,
  Eye,
  User,
  Settings
} from 'lucide-react'
import { cn } from '../utils'

import type { LucideIcon } from 'lucide-react'

interface Feature {
  id: string
  title: string
  description: string
  icon: LucideIcon
  color: string
  route: string
  status: 'completed' | 'in-progress' | 'planned'
  category: 'core' | 'management' | 'analytics' | 'user'
}

const FEATURES: Feature[] = [
  // Core Features
  {
    id: 'tournaments',
    title: 'Quản lý giải đấu',
    description: 'Tạo, quản lý và theo dõi các giải đấu thể thao',
    icon: Trophy,
    color: 'from-yellow-500 to-orange-500',
    route: '/tournaments',
    status: 'completed',
    category: 'core'
  },
  {
    id: 'matches',
    title: 'Lịch thi đấu',
    description: 'Xem và quản lý lịch thi đấu các trận đấu',
    icon: Calendar,
    color: 'from-blue-500 to-cyan-500',
    route: '/matches',
    status: 'completed',
    category: 'core'
  },
  {
    id: 'teams',
    title: 'Quản lý đội bóng',
    description: 'Tạo và quản lý thông tin đội bóng, cầu thủ',
    icon: Users,
    color: 'from-green-500 to-emerald-500',
    route: '/teams',
    status: 'completed',
    category: 'management'
  },
  {
    id: 'players',
    title: 'Hồ sơ cầu thủ',
    description: 'Quản lý thông tin chi tiết của từng cầu thủ',
    icon: User,
    color: 'from-purple-500 to-pink-500',
    route: '/players',
    status: 'completed',
    category: 'management'
  },

  // Management Features
  {
    id: 'organizer-dashboard',
    title: 'Dashboard ban tổ chức',
    description: 'Bảng điều khiển cho ban tổ chức giải đấu',
    icon: Settings,
    color: 'from-indigo-500 to-purple-500',
    route: '/organizer',
    status: 'completed',
    category: 'management'
  },

  // Analytics Features
  {
    id: 'statistics',
    title: 'Thống kê và báo cáo',
    description: 'Phân tích dữ liệu và tạo báo cáo chi tiết',
    icon: BarChart3,
    color: 'from-teal-500 to-cyan-500',
    route: '/stats',
    status: 'in-progress',
    category: 'analytics'
  },
  {
    id: 'rankings',
    title: 'Bảng xếp hạng',
    description: 'Xếp hạng đội bóng và cầu thủ',
    icon: Medal,
    color: 'from-amber-500 to-yellow-500',
    route: '/rankings',
    status: 'in-progress',
    category: 'analytics'
  },
  {
    id: 'performance',
    title: 'Phân tích hiệu suất',
    description: 'Theo dõi và phân tích hiệu suất thi đấu',
    icon: TrendingUp,
    color: 'from-emerald-500 to-teal-500',
    route: '/performance',
    status: 'planned',
    category: 'analytics'
  },

  // User Features
  {
    id: 'authentication',
    title: 'Xác thực người dùng',
    description: 'Đăng ký, đăng nhập và quản lý tài khoản',
    icon: Eye,
    color: 'from-slate-500 to-gray-500',
    route: '/auth',
    status: 'completed',
    category: 'user'
  },
  {
    id: 'notifications',
    title: 'Thông báo',
    description: 'Hệ thống thông báo thời gian thực',
    icon: Activity,
    color: 'from-orange-500 to-red-500',
    route: '/notifications',
    status: 'planned',
    category: 'user'
  },
  {
    id: 'live-tracking',
    title: 'Theo dõi trực tiếp',
    description: 'Cập nhật kết quả trận đấu theo thời gian thực',
    icon: Zap,
    color: 'from-violet-500 to-purple-500',
    route: '/live',
    status: 'planned',
    category: 'core'
  }
]

const STATUS_CONFIG = {
  completed: {
    label: 'Hoàn thành',
    color: 'bg-green-500/20 text-green-400 border-green-500/30',
    icon: Target
  },
  'in-progress': {
    label: 'Đang phát triển',
    color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    icon: Clock
  },
  planned: {
    label: 'Dự kiến',
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    icon: MapPin
  }
}

const CATEGORY_CONFIG = {
  core: { label: 'Tính năng cốt lõi', color: 'from-blue-500 to-purple-500' },
  management: { label: 'Quản lý', color: 'from-green-500 to-teal-500' },
  analytics: { label: 'Phân tích', color: 'from-orange-500 to-red-500' },
  user: { label: 'Người dùng', color: 'from-purple-500 to-pink-500' }
}

export function FeaturesPage() {
  const navigate = useNavigate()

  const handleFeatureClick = (feature: Feature) => {
    if (feature.status === 'completed') {
      navigate(feature.route)
    }
  }

  const getFeaturesByCategory = () => {
    return Object.entries(CATEGORY_CONFIG).map(([categoryKey, config]) => ({
      category: categoryKey as keyof typeof CATEGORY_CONFIG,
      config,
      features: FEATURES.filter((f) => f.category === categoryKey)
    }))
  }

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
              <Star className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Tính năng hệ thống</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Khám phá tất cả các tính năng mạnh mẽ của nền tảng quản lý giải đấu thể thao
          </p>
        </div>

        {/* Features by Category */}
        <div className="space-y-12">
          {getFeaturesByCategory().map(({ category, config, features }) => (
            <div key={category}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={cn('w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center', config.color)}
                >
                  <Award className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">{config.label}</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-slate-600 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => {
                  const Icon = feature.icon
                  const StatusIcon = STATUS_CONFIG[feature.status].icon
                  const isClickable = feature.status === 'completed'

                  return (
                    <div
                      key={feature.id}
                      onClick={() => handleFeatureClick(feature)}
                      className={cn(
                        'bg-slate-800/30 rounded-xl p-6 border border-slate-700/50 transition-all duration-200',
                        isClickable
                          ? 'hover:border-slate-600 hover:bg-slate-700/40 cursor-pointer hover:scale-105'
                          : 'opacity-75 cursor-not-allowed'
                      )}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={cn(
                            'w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br',
                            feature.color
                          )}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>

                        <div
                          className={cn(
                            'flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium',
                            STATUS_CONFIG[feature.status].color
                          )}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {STATUS_CONFIG[feature.status].label}
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>

                      {isClickable && (
                        <div className="mt-4 pt-4 border-t border-slate-700">
                          <div className="flex items-center text-blue-400 text-sm font-medium">
                            <span>Truy cập ngay</span>
                            <Target className="w-4 h-4 ml-2" />
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16 bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Tiến độ phát triển</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(STATUS_CONFIG).map(([status, config]) => {
              const count = FEATURES.filter((f) => f.status === status).length
              const percentage = ((count / FEATURES.length) * 100).toFixed(1)
              const StatusIcon = config.icon

              return (
                <div key={status} className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <div
                      className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center border',
                        config.color.replace('text-', 'border-').replace('bg-', 'bg-')
                      )}
                    >
                      <StatusIcon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{count}</div>
                  <div className="text-sm text-slate-400">{config.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{percentage}%</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
