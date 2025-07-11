import { useState } from 'react'
import { Plus, Edit, Trash2, User, Shield, X } from 'lucide-react'
import { cn } from '../../utils'

interface Player {
  id: string
  name: string
  jerseyNumber: number
  position: 'GK' | 'DF' | 'MF' | 'FW'
  age: number
  height: number
  weight: number
  isCaptain: boolean
  isViceCaptain: boolean
  phone?: string
  email?: string
  photo?: string
}

interface Team {
  id: string
  name: string
  logo?: string
  players: Player[]
  captain?: string
  contact: string
  status: 'pending' | 'confirmed' | 'rejected'
}

interface PlayerManagementProps {
  teams: Team[]
  onUpdateTeam: (teamId: string, updatedTeam: Team) => void
  maxPlayersPerTeam?: number
}

const POSITIONS = [
  { value: 'GK', label: 'Thủ môn', color: 'bg-red-500' },
  { value: 'DF', label: 'Hậu vệ', color: 'bg-blue-500' },
  { value: 'MF', label: 'Tiền vệ', color: 'bg-green-500' },
  { value: 'FW', label: 'Tiền đạo', color: 'bg-purple-500' }
] as const

export function PlayerManagement({ teams, onUpdateTeam, maxPlayersPerTeam = 25 }: PlayerManagementProps) {
  const [selectedTeam, setSelectedTeam] = useState<string>(teams[0]?.id || '')
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false)
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null)
  const [newPlayer, setNewPlayer] = useState<Partial<Player>>({
    name: '',
    jerseyNumber: 1,
    position: 'MF',
    age: 18,
    height: 170,
    weight: 70,
    isCaptain: false,
    isViceCaptain: false,
    phone: '',
    email: ''
  })

  const currentTeam = teams.find((team) => team.id === selectedTeam)
  const usedJerseyNumbers = currentTeam?.players.map((p) => p.jerseyNumber) || []

  const handleAddPlayer = () => {
    if (!currentTeam || !newPlayer.name) return

    const player: Player = {
      id: Date.now().toString(),
      name: newPlayer.name!,
      jerseyNumber: newPlayer.jerseyNumber!,
      position: newPlayer.position!,
      age: newPlayer.age!,
      height: newPlayer.height!,
      weight: newPlayer.weight!,
      isCaptain: newPlayer.isCaptain!,
      isViceCaptain: newPlayer.isViceCaptain!,
      phone: newPlayer.phone,
      email: newPlayer.email
    }

    const updatedTeam = {
      ...currentTeam,
      players: [...currentTeam.players, player]
    }

    onUpdateTeam(selectedTeam, updatedTeam)
    setShowAddPlayerModal(false)
    setNewPlayer({
      name: '',
      jerseyNumber: getNextAvailableNumber(),
      position: 'MF',
      age: 18,
      height: 170,
      weight: 70,
      isCaptain: false,
      isViceCaptain: false,
      phone: '',
      email: ''
    })
  }

  const handleUpdatePlayer = () => {
    if (!currentTeam || !editingPlayer) return

    const updatedTeam = {
      ...currentTeam,
      players: currentTeam.players.map((p) => (p.id === editingPlayer.id ? editingPlayer : p))
    }

    onUpdateTeam(selectedTeam, updatedTeam)
    setEditingPlayer(null)
  }

  const handleDeletePlayer = (playerId: string) => {
    if (!currentTeam) return

    const updatedTeam = {
      ...currentTeam,
      players: currentTeam.players.filter((p) => p.id !== playerId)
    }

    onUpdateTeam(selectedTeam, updatedTeam)
  }

  const getNextAvailableNumber = () => {
    for (let i = 1; i <= 99; i++) {
      if (!usedJerseyNumbers.includes(i)) {
        return i
      }
    }
    return 1
  }

  const getPositionStats = () => {
    if (!currentTeam) return {}

    return currentTeam.players.reduce((acc, player) => {
      acc[player.position] = (acc[player.position] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }

  const positionStats = getPositionStats()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Quản lý cầu thủ</h3>
          <p className="text-slate-400">Thêm và quản lý danh sách cầu thủ cho từng đội</p>
        </div>

        <div className="flex gap-3">
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none min-w-[200px]"
          >
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name} ({team.players?.length || 0} cầu thủ)
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowAddPlayerModal(true)}
            disabled={!currentTeam || (currentTeam.players?.length || 0) >= maxPlayersPerTeam}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Thêm cầu thủ
          </button>
        </div>
      </div>

      {currentTeam && (
        <>
          {/* Team Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {POSITIONS.map((pos) => (
              <div key={pos.value} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={cn('w-3 h-3 rounded-full', pos.color)} />
                  <span className="text-slate-300 text-sm">{pos.label}</span>
                </div>
                <div className="text-2xl font-bold text-white">{positionStats[pos.value] || 0}</div>
              </div>
            ))}
          </div>

          {/* Players List */}
          <div className="bg-slate-700/50 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-600">
              <h4 className="font-semibold text-white">Danh sách cầu thủ - {currentTeam.name}</h4>
              <p className="text-slate-400 text-sm mt-1">
                {currentTeam.players?.length || 0}/{maxPlayersPerTeam} cầu thủ
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-600/30">
                  <tr>
                    <th className="text-left p-4 text-slate-300 font-medium">Số áo</th>
                    <th className="text-left p-4 text-slate-300 font-medium">Tên cầu thủ</th>
                    <th className="text-left p-4 text-slate-300 font-medium">Vị trí</th>
                    <th className="text-left p-4 text-slate-300 font-medium">Tuổi</th>
                    <th className="text-left p-4 text-slate-300 font-medium">Chiều cao</th>
                    <th className="text-left p-4 text-slate-300 font-medium">Cân nặng</th>
                    <th className="text-left p-4 text-slate-300 font-medium">Vai trò</th>
                    <th className="text-right p-4 text-slate-300 font-medium">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTeam.players?.map((player) => (
                    <tr key={player.id} className="border-b border-slate-600/50 hover:bg-slate-600/20">
                      <td className="p-4">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {player.jerseyNumber}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-slate-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{player.name}</div>
                            {player.phone && <div className="text-xs text-slate-400">{player.phone}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={cn(
                            'px-2 py-1 rounded text-xs font-medium text-white',
                            POSITIONS.find((p) => p.value === player.position)?.color
                          )}
                        >
                          {POSITIONS.find((p) => p.value === player.position)?.label}
                        </span>
                      </td>
                      <td className="p-4 text-slate-300">{player.age}</td>
                      <td className="p-4 text-slate-300">{player.height}cm</td>
                      <td className="p-4 text-slate-300">{player.weight}kg</td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          {player.isCaptain && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">
                              <Shield className="w-3 h-3" />C
                            </span>
                          )}
                          {player.isViceCaptain && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs">
                              <Shield className="w-3 h-3" />
                              VC
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingPlayer(player)}
                            className="p-1 text-slate-400 hover:text-blue-400"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePlayer(player.id)}
                            className="p-1 text-slate-400 hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(!currentTeam.players || currentTeam.players.length === 0) && (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-400">
                        Chưa có cầu thủ nào. Hãy thêm cầu thủ đầu tiên.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Add Player Modal */}
      {showAddPlayerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Thêm cầu thủ mới</h3>
              <button onClick={() => setShowAddPlayerModal(false)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm mb-2">Tên cầu thủ *</label>
                <input
                  type="text"
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  placeholder="Nhập tên cầu thủ"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Số áo *</label>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={newPlayer.jerseyNumber}
                  onChange={(e) => setNewPlayer({ ...newPlayer, jerseyNumber: parseInt(e.target.value) })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                />
                {usedJerseyNumbers.includes(newPlayer.jerseyNumber!) && (
                  <p className="text-red-400 text-xs mt-1">Số áo này đã được sử dụng</p>
                )}
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Vị trí *</label>
                <select
                  value={newPlayer.position}
                  onChange={(e) => setNewPlayer({ ...newPlayer, position: e.target.value as Player['position'] })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                >
                  {POSITIONS.map((pos) => (
                    <option key={pos.value} value={pos.value}>
                      {pos.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Tuổi *</label>
                <input
                  type="number"
                  min="16"
                  max="50"
                  value={newPlayer.age}
                  onChange={(e) => setNewPlayer({ ...newPlayer, age: parseInt(e.target.value) })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Chiều cao (cm)</label>
                <input
                  type="number"
                  min="150"
                  max="220"
                  value={newPlayer.height}
                  onChange={(e) => setNewPlayer({ ...newPlayer, height: parseInt(e.target.value) })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Cân nặng (kg)</label>
                <input
                  type="number"
                  min="50"
                  max="120"
                  value={newPlayer.weight}
                  onChange={(e) => setNewPlayer({ ...newPlayer, weight: parseInt(e.target.value) })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Số điện thoại</label>
                <input
                  type="text"
                  value={newPlayer.phone}
                  onChange={(e) => setNewPlayer({ ...newPlayer, phone: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={newPlayer.email}
                  onChange={(e) => setNewPlayer({ ...newPlayer, email: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  placeholder="Nhập email"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <label className="flex items-center gap-2 text-slate-300">
                <input
                  type="checkbox"
                  checked={newPlayer.isCaptain}
                  onChange={(e) => setNewPlayer({ ...newPlayer, isCaptain: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                Đội trưởng
              </label>
              <label className="flex items-center gap-2 text-slate-300">
                <input
                  type="checkbox"
                  checked={newPlayer.isViceCaptain}
                  onChange={(e) => setNewPlayer({ ...newPlayer, isViceCaptain: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                Đội phó
              </label>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddPlayerModal(false)}
                className="flex-1 py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleAddPlayer}
                disabled={!newPlayer.name || usedJerseyNumbers.includes(newPlayer.jerseyNumber!)}
                className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                Thêm cầu thủ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Player Modal */}
      {editingPlayer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Chỉnh sửa cầu thủ</h3>
              <button onClick={() => setEditingPlayer(null)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm mb-2">Tên cầu thủ *</label>
                <input
                  type="text"
                  value={editingPlayer.name}
                  onChange={(e) => setEditingPlayer({ ...editingPlayer, name: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Số áo *</label>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={editingPlayer.jerseyNumber}
                  onChange={(e) => setEditingPlayer({ ...editingPlayer, jerseyNumber: parseInt(e.target.value) })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Vị trí *</label>
                <select
                  value={editingPlayer.position}
                  onChange={(e) =>
                    setEditingPlayer({ ...editingPlayer, position: e.target.value as Player['position'] })
                  }
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                >
                  {POSITIONS.map((pos) => (
                    <option key={pos.value} value={pos.value}>
                      {pos.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Tuổi *</label>
                <input
                  type="number"
                  min="16"
                  max="50"
                  value={editingPlayer.age}
                  onChange={(e) => setEditingPlayer({ ...editingPlayer, age: parseInt(e.target.value) })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Chiều cao (cm)</label>
                <input
                  type="number"
                  min="150"
                  max="220"
                  value={editingPlayer.height}
                  onChange={(e) => setEditingPlayer({ ...editingPlayer, height: parseInt(e.target.value) })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Cân nặng (kg)</label>
                <input
                  type="number"
                  min="50"
                  max="120"
                  value={editingPlayer.weight}
                  onChange={(e) => setEditingPlayer({ ...editingPlayer, weight: parseInt(e.target.value) })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Số điện thoại</label>
                <input
                  type="text"
                  value={editingPlayer.phone || ''}
                  onChange={(e) => setEditingPlayer({ ...editingPlayer, phone: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={editingPlayer.email || ''}
                  onChange={(e) => setEditingPlayer({ ...editingPlayer, email: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <label className="flex items-center gap-2 text-slate-300">
                <input
                  type="checkbox"
                  checked={editingPlayer.isCaptain}
                  onChange={(e) => setEditingPlayer({ ...editingPlayer, isCaptain: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                Đội trưởng
              </label>
              <label className="flex items-center gap-2 text-slate-300">
                <input
                  type="checkbox"
                  checked={editingPlayer.isViceCaptain}
                  onChange={(e) => setEditingPlayer({ ...editingPlayer, isViceCaptain: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                Đội phó
              </label>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditingPlayer(null)}
                className="flex-1 py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleUpdatePlayer}
                className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
