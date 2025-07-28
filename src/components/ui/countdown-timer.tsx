import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Đặt thời gian đích - có thể thay đổi theo yêu cầu
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 17) // 17 ngày từ bây giờ
    targetDate.setHours(targetDate.getHours() + 13) // thêm 13 giờ
    targetDate.setMinutes(targetDate.getMinutes() + 51) // thêm 51 phút
    targetDate.setSeconds(targetDate.getSeconds() + 51) // thêm 51 giây

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="max-w-4xl mx-auto mb-16 relative z-10">
      {/* Event announcement banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full text-white font-semibold text-lg shadow-lg animate-pulse">
          <span className="text-2xl">🔥</span>
          Giải Đấu Mùa Hè 2025 - Đang Mở Đăng Ký
        </div>
      </div>

      {/* Main title */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          TẤT CẢ GIẢI ĐẤU THỂ THAO
        </h1>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          TẠI MỘT{' '}
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
            NƠI DUY NHẤT!
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Nền tảng tổ chức giải đấu thể thao chuyên nghiệp với hệ thống quản lý từ cơ bản đến nâng cao, trực tiếp và
          theo dõi trực tuyến.
        </p>
      </div>

      {/* Countdown section */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="text-2xl">⏰</span>
          <span className="text-orange-400 font-semibold text-lg">Thời gian còn lại để đăng ký:</span>
        </div>

        <div className="flex justify-center items-center gap-4 md:gap-6">
          {/* Days */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white text-4xl md:text-5xl font-bold rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] shadow-xl border-2 border-orange-400/30">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <span className="text-orange-300 font-semibold mt-2 text-sm md:text-base">NGÀY</span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white text-4xl md:text-5xl font-bold rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] shadow-xl border-2 border-orange-400/30">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <span className="text-orange-300 font-semibold mt-2 text-sm md:text-base">GIỜ</span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white text-4xl md:text-5xl font-bold rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] shadow-xl border-2 border-orange-400/30">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <span className="text-orange-300 font-semibold mt-2 text-sm md:text-base">PHÚT</span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white text-4xl md:text-5xl font-bold rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] shadow-xl border-2 border-orange-400/30">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <span className="text-orange-300 font-semibold mt-2 text-sm md:text-base">GIÂY</span>
          </div>
        </div>
      </div>
    </div>
  )
}
