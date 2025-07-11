import { useState } from 'react'
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '../../utils'

interface TeamStanding {
  id: string
  name: string
  logo?: string
  matches: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
  form: ('W' | 'D' | 'L')[]
  position: number
  lastPosition?: number
}

const MOCK_STANDINGS: TeamStanding[] = [
  {
    id: '1',
    name: 'FC Barcelona',
    matches: 15,
    wins: 12,
    draws: 2,
    losses: 1,
    goalsFor: 45,
    goalsAgainst: 15,
    goalDifference: 30,
    points: 38,
    form: ['W', 'W', 'D', 'W', 'W'],
    position: 1,
    lastPosition: 1
  },
  {
    id: '2',
    name: 'Real Madrid',
    matches: 15,
    wins: 11,
    draws: 3,
    losses: 1,
    goalsFor: 42,
    goalsAgainst: 18,
    goalDifference: 24,
    points: 36,
    form: ['W', 'D', 'W', 'W', 'D'],
    position: 2,
    lastPosition: 2
  },
  {
    id: '3',
    name: 'Manchester City',
    matches: 15,
    wins: 10,
    draws: 4,
    losses: 1,
    goalsFor: 38,
    goalsAgainst: 12,
    goalDifference: 26,
    points: 34,
    form: ['W', 'W', 'D', 'W', 'W'],
    position: 3,
    lastPosition: 4
  },
  {
    id: '4',
    name: 'Liverpool',
    matches: 15,
    wins: 10,
    draws: 3,
    losses: 2,
    goalsFor: 35,
    goalsAgainst: 20,
    goalDifference: 15,
    points: 33,
    form: ['L', 'W', 'W', 'D', 'W'],
    position: 4,
    lastPosition: 3
  },
  {
    id: '5',
    name: 'Chelsea',
    matches: 15,
    wins: 9,
    draws: 4,
    losses: 2,
    goalsFor: 32,
    goalsAgainst: 18,
    goalDifference: 14,
    points: 31,
    form: ['W', 'D', 'W', 'W', 'D'],
    position: 5,
    lastPosition: 5
  },
  {
    id: '6',
    name: 'Arsenal',
    matches: 15,
    wins: 8,
    draws: 5,
    losses: 2,
    goalsFor: 28,
    goalsAgainst: 16,
    goalDifference: 12,
    points: 29,
    form: ['D', 'W', 'D', 'L', 'W'],
    position: 6,
    lastPosition: 6
  },
  {
    id: '7',
    name: 'Tottenham',
    matches: 15,
    wins: 7,
    draws: 6,
    losses: 2,
    goalsFor: 25,
    goalsAgainst: 19,
    goalDifference: 6,
    points: 27,
    form: ['D', 'D', 'W', 'L', 'D'],
    position: 7,
    lastPosition: 7
  },
  {
    id: '8',
    name: 'Newcastle',
    matches: 15,
    wins: 6,
    draws: 7,
    losses: 2,
    goalsFor: 22,
    goalsAgainst: 18,
    goalDifference: 4,
    points: 25,
    form: ['D', 'W', 'D', 'D', 'L'],
    position: 8,
    lastPosition: 9
  }
]

export function Standings() {
  const [standings] = useState<TeamStanding[]>(MOCK_STANDINGS)
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)

  const getPositionChange = (team: TeamStanding) => {
    if (!team.lastPosition) return null

    const change = team.lastPosition - team.position
    if (change > 0) return { type: 'up', value: change }
    if (change < 0) return { type: 'down', value: Math.abs(change) }
    return { type: 'same', value: 0 }
  }

  const getFormColor = (result: 'W' | 'D' | 'L') => {
    switch (result) {
      case 'W':
        return 'bg-green-500 text-white'
      case 'D':
        return 'bg-yellow-500 text-white'
      case 'L':
        return 'bg-red-500 text-white'
    }
  }

  const getQualificationZone = (position: number) => {
    if (position <= 4) return 'Champions League'
    if (position <= 6) return 'Europa League'
    if (position >= standings.length - 2) return 'Relegation'
    return null
  }

  const getQualificationColor = (zone: string | null) => {
    switch (zone) {
      case 'Champions League':
        return 'border-l-4 border-l-blue-500'
      case 'Europa League':
        return 'border-l-4 border-l-orange-500'
      case 'Relegation':
        return 'border-l-4 border-l-red-500'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Bảng Xếp Hạng</h3>
          <p className="text-slate-400">Thống kê chi tiết các đội tham gia</p>
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-slate-300">Champions League</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-slate-300">Europa League</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-slate-300">Relegation</span>
          </div>
        </div>
      </div>

      {/* Standings Table */}
      <div className="bg-slate-800/30 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr className="text-left">
                <th className="px-4 py-3 text-slate-300 font-medium">#</th>
                <th className="px-4 py-3 text-slate-300 font-medium">Đội</th>
                <th className="px-4 py-3 text-slate-300 font-medium text-center">Trận</th>
                <th className="px-4 py-3 text-slate-300 font-medium text-center">T</th>
                <th className="px-4 py-3 text-slate-300 font-medium text-center">H</th>
                <th className="px-4 py-3 text-slate-300 font-medium text-center">B</th>
                <th className="px-4 py-3 text-slate-300 font-medium text-center">BT+</th>
                <th className="px-4 py-3 text-slate-300 font-medium text-center">BT-</th>
                <th className="px-4 py-3 text-slate-300 font-medium text-center">HS</th>
                <th className="px-4 py-3 text-slate-300 font-medium text-center">Điểm</th>
                <th className="px-4 py-3 text-slate-300 font-medium text-center">Phong độ</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team) => {
                const positionChange = getPositionChange(team)
                const qualificationZone = getQualificationZone(team.position)

                return (
                  <tr
                    key={team.id}
                    onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
                    className={cn(
                      'border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors cursor-pointer',
                      getQualificationColor(qualificationZone),
                      selectedTeam === team.id && 'bg-slate-700/50'
                    )}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold w-6 text-center">{team.position}</span>
                        {positionChange && (
                          <div className="flex items-center">
                            {positionChange.type === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                            {positionChange.type === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                            {positionChange.type === 'same' && <Minus className="w-4 h-4 text-slate-400" />}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {team.name
                              .split(' ')
                              .map((word) => word[0])
                              .join('')
                              .substring(0, 2)}
                          </span>
                        </div>
                        <span className="text-white font-medium">{team.name}</span>
                        {qualificationZone && (
                          <span
                            className={cn(
                              'text-xs px-2 py-1 rounded-full',
                              qualificationZone === 'Champions League' && 'bg-blue-500/20 text-blue-400',
                              qualificationZone === 'Europa League' && 'bg-orange-500/20 text-orange-400',
                              qualificationZone === 'Relegation' && 'bg-red-500/20 text-red-400'
                            )}
                          >
                            {qualificationZone === 'Champions League' && 'UCL'}
                            {qualificationZone === 'Europa League' && 'UEL'}
                            {qualificationZone === 'Relegation' && 'REL'}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center text-slate-300">{team.matches}</td>
                    <td className="px-4 py-4 text-center text-green-400 font-medium">{team.wins}</td>
                    <td className="px-4 py-4 text-center text-yellow-400 font-medium">{team.draws}</td>
                    <td className="px-4 py-4 text-center text-red-400 font-medium">{team.losses}</td>
                    <td className="px-4 py-4 text-center text-slate-300">{team.goalsFor}</td>
                    <td className="px-4 py-4 text-center text-slate-300">{team.goalsAgainst}</td>
                    <td
                      className={cn(
                        'px-4 py-4 text-center font-medium',
                        team.goalDifference > 0
                          ? 'text-green-400'
                          : team.goalDifference < 0
                          ? 'text-red-400'
                          : 'text-slate-300'
                      )}
                    >
                      {team.goalDifference > 0 ? '+' : ''}
                      {team.goalDifference}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-white font-bold text-lg">{team.points}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-1 justify-center">
                        {team.form.map((result, idx) => (
                          <div
                            key={idx}
                            className={cn(
                              'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                              getFormColor(result)
                            )}
                          >
                            {result}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Details */}
      {selectedTeam && (
        <div className="bg-slate-800/30 rounded-xl p-6">
          {(() => {
            const team = standings.find((t) => t.id === selectedTeam)
            if (!team) return null

            return (
              <div>
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {team.name
                        .split(' ')
                        .map((word) => word[0])
                        .join('')
                        .substring(0, 2)}
                    </span>
                  </div>
                  {team.name}
                  {team.position === 1 && <Trophy className="w-6 h-6 text-yellow-500" />}
                </h4>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{team.points}</div>
                    <div className="text-slate-400 text-sm">Điểm</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{team.wins}</div>
                    <div className="text-slate-400 text-sm">Thắng</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{team.draws}</div>
                    <div className="text-slate-400 text-sm">Hòa</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{team.losses}</div>
                    <div className="text-slate-400 text-sm">Thua</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{team.goalsFor}</div>
                    <div className="text-slate-400 text-sm">Bàn thắng</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">{team.goalsAgainst}</div>
                    <div className="text-slate-400 text-sm">Bàn thua</div>
                  </div>
                  <div className="text-center">
                    <div
                      className={cn(
                        'text-2xl font-bold',
                        team.goalDifference > 0
                          ? 'text-green-400'
                          : team.goalDifference < 0
                          ? 'text-red-400'
                          : 'text-slate-300'
                      )}
                    >
                      {team.goalDifference > 0 ? '+' : ''}
                      {team.goalDifference}
                    </div>
                    <div className="text-slate-400 text-sm">Hiệu số</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {((team.points / (team.matches * 3)) * 100).toFixed(0)}%
                    </div>
                    <div className="text-slate-400 text-sm">Tỷ lệ thắng</div>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}
