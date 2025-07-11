import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

const ROUTE_LABELS: Record<string, string> = {
  tournaments: 'Giải đấu',
  matches: 'Lịch thi đấu',
  teams: 'Đội bóng',
  players: 'Cầu thủ',
  dashboard: 'Bảng điều khiển',
  profile: 'Hồ sơ',
  setup: 'Thiết lập',
  create: 'Tạo mới',
  edit: 'Chỉnh sửa',
  organizer: 'Ban tổ chức',
  auth: 'Xác thực',
  login: 'Đăng nhập',
  register: 'Đăng ký',
  features: 'Tính năng'
}

export function Breadcrumb() {
  const location = useLocation()
  const pathSegments = location.pathname.split('/').filter(Boolean)

  if (pathSegments.length === 0) {
    return null
  }

  const breadcrumbItems: BreadcrumbItem[] = [{ label: 'Trang chủ', href: '/' }]

  let currentPath = ''
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`

    // Skip dynamic segments (IDs)
    if (segment.match(/^[0-9]+$/)) {
      return
    }

    const label = ROUTE_LABELS[segment] || segment
    const isLast = index === pathSegments.length - 1

    breadcrumbItems.push({
      label,
      href: isLast ? undefined : currentPath
    })
  })

  if (breadcrumbItems.length <= 1) {
    return null
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 text-slate-400 mx-2" />}

          {index === 0 && <Home className="w-4 h-4 text-slate-400 mr-2" />}

          {item.href ? (
            <Link to={item.href} className="text-slate-400 hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
