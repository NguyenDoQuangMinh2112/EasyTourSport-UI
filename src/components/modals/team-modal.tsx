import { useState, useEffect } from 'react'
import { X, Upload, User, Mail } from 'lucide-react'
import { cn } from '../../utils'

interface TeamModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (teamData: { name: string; captain?: string; contact: string; logo?: string }) => void
  team?: { id: string; name: string; captain?: string; contact: string; logo?: string } | null
  mode: 'add' | 'edit'
}

const TeamModal = ({ isOpen, onClose, onSave, team, mode }: TeamModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    captain: '',
    contact: '',
    logo: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (team && mode === 'edit') {
      setFormData({
        name: team.name,
        captain: team.captain || '',
        contact: team.contact,
        logo: team.logo || ''
      })
    } else {
      setFormData({
        name: '',
        captain: '',
        contact: '',
        logo: ''
      })
    }
    setErrors({})
  }, [team, mode, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Tên đội là bắt buộc'
    }

    if (!formData.captain.trim()) {
      newErrors.captain = 'Tên đội trưởng là bắt buộc'
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Thông tin liên hệ là bắt buộc'
    } else if (
      !/^[\w._%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(formData.contact) &&
      !/^[\d\s\-+()]+$/.test(formData.contact)
    ) {
      newErrors.contact = 'Vui lòng nhập email hoặc số điện thoại hợp lệ'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSave(formData)
      onClose()
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const generateInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl w-full max-w-md border border-slate-700">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h3 className="text-xl font-bold text-white">{mode === 'add' ? 'Thêm đội mới' : 'Chỉnh sửa đội'}</h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Team Logo */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Logo đội (tùy chọn)</label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-600 overflow-hidden">
                {formData.logo ? (
                  <img src={formData.logo} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                ) : formData.name ? (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {generateInitials(formData.name)}
                  </div>
                ) : (
                  <Upload className="w-6 h-6 text-slate-400" />
                )}
              </div>
              <div className="flex-1">
                <input
                  type="url"
                  placeholder="URL logo (https://...)"
                  value={formData.logo}
                  onChange={(e) => handleInputChange('logo', e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
                <p className="text-xs text-slate-400 mt-1">Để trống để sử dụng avatar tự động từ tên đội</p>
              </div>
            </div>
          </div>

          {/* Team Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Tên đội <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Nhập tên đội"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={cn(
                'w-full bg-slate-700 border rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none',
                errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-600 focus:border-blue-500'
              )}
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Captain Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              Đội trưởng <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Nhập tên đội trưởng"
              value={formData.captain}
              onChange={(e) => handleInputChange('captain', e.target.value)}
              className={cn(
                'w-full bg-slate-700 border rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none',
                errors.captain ? 'border-red-500 focus:border-red-500' : 'border-slate-600 focus:border-blue-500'
              )}
            />
            {errors.captain && <p className="text-red-400 text-sm mt-1">{errors.captain}</p>}
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Mail className="w-4 h-4 inline mr-1" />
              Thông tin liên hệ <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Email hoặc số điện thoại"
              value={formData.contact}
              onChange={(e) => handleInputChange('contact', e.target.value)}
              className={cn(
                'w-full bg-slate-700 border rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none',
                errors.contact ? 'border-red-500 focus:border-red-500' : 'border-slate-600 focus:border-blue-500'
              )}
            />
            {errors.contact && <p className="text-red-400 text-sm mt-1">{errors.contact}</p>}
            <p className="text-xs text-slate-400 mt-1">Có thể là email hoặc số điện thoại</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
            >
              {mode === 'add' ? 'Thêm đội' : 'Cập nhật'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TeamModal
