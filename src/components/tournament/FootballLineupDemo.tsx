import React, { useState } from 'react'
import { DndContext, closestCenter, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

// Professional football pitch with enhanced details
const Pitch = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-full max-w-4xl aspect-[2/1] bg-gradient-to-b from-green-600 to-green-700 rounded-xl border-4 border-green-900 overflow-hidden mx-auto shadow-2xl">
    <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full">
      {/* Grass pattern */}
      <defs>
        <pattern id="grass" patternUnits="userSpaceOnUse" width="20" height="20">
          <rect width="20" height="20" fill="#15803d" />
          <rect width="10" height="20" fill="#166534" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="800" height="400" fill="url(#grass)" />

      {/* Field lines */}
      <rect x="0" y="0" width="800" height="400" fill="none" stroke="#fff" strokeWidth="3" />
      <line x1="400" y1="0" x2="400" y2="400" stroke="#fff" strokeWidth="2" />

      {/* Center circle */}
      <circle cx="400" cy="200" r="60" stroke="#fff" strokeWidth="2" fill="none" />
      <circle cx="400" cy="200" r="3" fill="#fff" />

      {/* Penalty areas */}
      <rect x="0" y="120" width="60" height="160" fill="none" stroke="#fff" strokeWidth="2" />
      <rect x="740" y="120" width="60" height="160" fill="none" stroke="#fff" strokeWidth="2" />

      {/* Goal areas */}
      <rect x="0" y="160" width="20" height="80" fill="none" stroke="#fff" strokeWidth="2" />
      <rect x="780" y="160" width="20" height="80" fill="none" stroke="#fff" strokeWidth="2" />

      {/* Penalty spots */}
      <circle cx="45" cy="200" r="2" fill="#fff" />
      <circle cx="755" cy="200" r="2" fill="#fff" />

      {/* Corner arcs */}
      <path d="M 0,0 A 10,10 0 0,0 10,0" stroke="#fff" strokeWidth="2" fill="none" />
      <path d="M 790,0 A 10,10 0 0,0 800,10" stroke="#fff" strokeWidth="2" fill="none" />
      <path d="M 0,400 A 10,10 0 0,1 10,400" stroke="#fff" strokeWidth="2" fill="none" />
      <path d="M 790,400 A 10,10 0 0,1 800,390" stroke="#fff" strokeWidth="2" fill="none" />
    </svg>
    {children}
  </div>
)

// Các sơ đồ đội hình mẫu
const FORMATIONS = {
  '4-4-2': [
    { id: 'GK', label: 'GK', x: 50, y: 200 },
    { id: 'LB', label: 'LB', x: 180, y: 80 },
    { id: 'LCB', label: 'LCB', x: 180, y: 160 },
    { id: 'RCB', label: 'RCB', x: 180, y: 240 },
    { id: 'RB', label: 'RB', x: 180, y: 320 },
    { id: 'LM', label: 'LM', x: 350, y: 80 },
    { id: 'LCM', label: 'LCM', x: 350, y: 160 },
    { id: 'RCM', label: 'RCM', x: 350, y: 240 },
    { id: 'RM', label: 'RM', x: 350, y: 320 },
    { id: 'ST1', label: 'ST', x: 600, y: 140 },
    { id: 'ST2', label: 'ST', x: 600, y: 260 }
  ],
  '4-3-3': [
    { id: 'GK', label: 'GK', x: 50, y: 200 },
    { id: 'LB', label: 'LB', x: 180, y: 80 },
    { id: 'LCB', label: 'LCB', x: 180, y: 160 },
    { id: 'RCB', label: 'RCB', x: 180, y: 240 },
    { id: 'RB', label: 'RB', x: 180, y: 320 },
    { id: 'LCM', label: 'LCM', x: 350, y: 120 },
    { id: 'CM', label: 'CM', x: 350, y: 200 },
    { id: 'RCM', label: 'RCM', x: 350, y: 280 },
    { id: 'LW', label: 'LW', x: 600, y: 80 },
    { id: 'ST', label: 'ST', x: 600, y: 200 },
    { id: 'RW', label: 'RW', x: 600, y: 320 }
  ],
  '3-5-2': [
    { id: 'GK', label: 'GK', x: 50, y: 200 },
    { id: 'CB1', label: 'CB', x: 180, y: 120 },
    { id: 'CB2', label: 'CB', x: 180, y: 200 },
    { id: 'CB3', label: 'CB', x: 180, y: 280 },
    { id: 'LM', label: 'LM', x: 350, y: 80 },
    { id: 'LCM', label: 'LCM', x: 350, y: 140 },
    { id: 'CM', label: 'CM', x: 350, y: 200 },
    { id: 'RCM', label: 'RCM', x: 350, y: 260 },
    { id: 'RM', label: 'RM', x: 350, y: 320 },
    { id: 'ST1', label: 'ST', x: 600, y: 140 },
    { id: 'ST2', label: 'ST', x: 600, y: 260 }
  ]
}

const initialPlayers = [
  { id: '1', name: 'Nguyễn Văn A', number: 1, position: 'GK' },
  { id: '2', name: 'Trần Văn B', number: 2, position: 'DF' },
  { id: '3', name: 'Lê Văn C', number: 3, position: 'DF' },
  { id: '4', name: 'Phạm Văn D', number: 4, position: 'DF' },
  { id: '5', name: 'Hoàng Văn E', number: 5, position: 'DF' },
  { id: '6', name: 'Vũ Văn F', number: 6, position: 'MF' },
  { id: '7', name: 'Ngô Văn G', number: 7, position: 'MF' },
  { id: '8', name: 'Đỗ Văn H', number: 8, position: 'MF' },
  { id: '9', name: 'Bùi Văn I', number: 9, position: 'FW' },
  { id: '10', name: 'Phan Văn K', number: 10, position: 'FW' },
  { id: '11', name: 'Lý Văn L', number: 11, position: 'FW' }
]

// Enhanced player card with jersey number and position
function PlayerCard({
  player,
  isDragging,
  isOnField = false
}: {
  player: any
  isDragging?: boolean
  isOnField?: boolean
}) {
  const getPositionColor = (position: string) => {
    switch (position) {
      case 'GK':
        return 'bg-yellow-600 border-yellow-400'
      case 'DF':
        return 'bg-blue-600 border-blue-400'
      case 'MF':
        return 'bg-green-600 border-green-400'
      case 'FW':
        return 'bg-red-600 border-red-400'
      default:
        return 'bg-slate-600 border-slate-400'
    }
  }

  return (
    <div
      className={
        `relative px-2 py-1 rounded-lg shadow-lg font-medium text-white text-xs text-center select-none transition-all ${getPositionColor(
          player.position
        )}` +
        (isDragging ? ' opacity-70 scale-110 rotate-3' : '') +
        (isOnField ? ' shadow-xl border-2' : ' border')
      }
      style={{ minWidth: 60, minHeight: 40 }}
    >
      <div className="absolute -top-1 -left-1 w-5 h-5 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold">
        {player.number}
      </div>
      <div className="mt-1 leading-tight truncate" title={player.name}>
        {player.name.split(' ').slice(-1)[0]}
      </div>
      <div className="text-xs opacity-75">{player.position}</div>
    </div>
  )
}

function DraggablePlayer({ player, id, readOnly }: { player: any; id: string; readOnly?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled: readOnly
  })
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
      {...attributes}
      {...(readOnly ? {} : listeners)}
      className={readOnly ? 'cursor-default' : 'cursor-grab'}
    >
      <PlayerCard player={player} isDragging={isDragging} />
    </div>
  )
}

// Enhanced droppable position with better visual feedback
function DroppablePosition({
  position,
  player,
  onRemove,
  readOnly
}: {
  position: any
  player: any
  onRemove: () => void
  readOnly?: boolean
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: position.id,
    disabled: readOnly
  })
  return (
    <div
      ref={setNodeRef}
      className={
        'absolute flex flex-col items-center transition-all duration-200' +
        (isOver && !readOnly ? ' ring-4 ring-blue-400 ring-opacity-60 scale-110' : '')
      }
      style={{ left: position.x, top: position.y, width: 80 }}
    >
      <div className="text-xs text-white mb-1 font-bold drop-shadow-lg bg-black bg-opacity-30 px-2 py-0.5 rounded">
        {position.label}
      </div>
      {player ? (
        <div className="relative">
          <PlayerCard player={player} isOnField={true} />
          {!readOnly && (
            <button
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transition-colors shadow-lg"
              onClick={onRemove}
              title="Bỏ khỏi vị trí"
            >
              ×
            </button>
          )}
        </div>
      ) : (
        <div className="w-16 h-10 bg-white/10 border-2 border-dashed border-white/50 rounded-lg flex flex-col items-center justify-center text-white text-xs hover:bg-white/20 transition-colors">
          <div className="text-xs opacity-60">Trống</div>
        </div>
      )}
    </div>
  )
}

interface FootballLineupDemoProps {
  readOnly?: boolean
}

export default function FootballLineupDemo({ readOnly = false }: FootballLineupDemoProps) {
  const [formation, setFormation] = useState<'4-4-2' | '4-3-3' | '3-5-2'>('4-4-2')
  const [bench, setBench] = useState(initialPlayers)
  const [lineup, setLineup] = useState<{ [posId: string]: any | null }>(
    Object.fromEntries(FORMATIONS[formation].map((p) => [p.id, null]))
  )
  const [activeId, setActiveId] = useState<string | null>(null)
  const [savedLineups, setSavedLineups] = useState<{ [formation: string]: any }>({})

  // Khi đổi sơ đồ, reset lineup và trả cầu thủ về bench
  const handleFormationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFormation = e.target.value as '4-4-2' | '4-3-3' | '3-5-2'

    // Lưu lineup hiện tại
    setSavedLineups({ ...savedLineups, [formation]: lineup })

    // Trả tất cả cầu thủ về bench
    setBench([...bench, ...Object.values(lineup).filter(Boolean)])

    // Load lineup đã lưu hoặc tạo mới
    const savedLineup = savedLineups[newFormation]
    if (savedLineup) {
      setLineup(savedLineup)
      // Remove saved players from bench
      const savedPlayerIds = Object.values(savedLineup)
        .filter(Boolean)
        .map((p: any) => p.id)
      setBench(bench.filter((p) => !savedPlayerIds.includes(p.id)))
    } else {
      setLineup(Object.fromEntries(FORMATIONS[newFormation].map((p) => [p.id, null])))
    }

    setFormation(newFormation)
  }

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (!over) {
      setActiveId(null)
      return
    }

    // Kéo từ bench lên sân
    if (bench.find((p) => p.id === active.id) && lineup[over.id] == null) {
      const player = bench.find((p) => p.id === active.id)
      setLineup({ ...lineup, [over.id]: player })
      setBench(bench.filter((p) => p.id !== active.id))
    }
    // Kéo từ vị trí này sang vị trí khác
    else if (Object.values(lineup).find((p: any) => p && p.id === active.id) && lineup[over.id] == null) {
      const sourcePos = Object.keys(lineup).find((key) => lineup[key] && lineup[key].id === active.id)
      if (sourcePos) {
        const player = lineup[sourcePos]
        setLineup({ ...lineup, [sourcePos]: null, [over.id]: player })
      }
    }
    setActiveId(null)
  }

  const handleRemoveFromPosition = (posId: string) => {
    const player = lineup[posId]
    if (player) {
      setBench([...bench, player])
      setLineup({ ...lineup, [posId]: null })
    }
  }

  const handleClearAll = () => {
    setBench([...bench, ...Object.values(lineup).filter(Boolean)])
    setLineup(Object.fromEntries(FORMATIONS[formation].map((p) => [p.id, null])))
  }

  const handleAutoFill = () => {
    const availablePlayers = [...bench]
    const newLineup = { ...lineup }

    FORMATIONS[formation].forEach((pos) => {
      if (!newLineup[pos.id] && availablePlayers.length > 0) {
        // Ưu tiên cầu thủ theo vị trí
        let playerIndex = availablePlayers.findIndex(
          (p) =>
            (pos.label === 'GK' && p.position === 'GK') ||
            (['LB', 'RB', 'CB', 'LCB', 'RCB', 'CB1', 'CB2', 'CB3'].includes(pos.label) && p.position === 'DF') ||
            (['LM', 'RM', 'LCM', 'RCM', 'CM'].includes(pos.label) && p.position === 'MF') ||
            (['ST', 'LW', 'RW', 'ST1', 'ST2'].includes(pos.label) && p.position === 'FW')
        )

        if (playerIndex === -1) playerIndex = 0 // Nếu không tìm thấy vị trí phù hợp, lấy cầu thủ đầu tiên

        newLineup[pos.id] = availablePlayers[playerIndex]
        availablePlayers.splice(playerIndex, 1)
      }
    })

    setLineup(newLineup)
    setBench(availablePlayers)
  }

  const getPositionStats = () => {
    const positions = { GK: 0, DF: 0, MF: 0, FW: 0 }
    Object.values(lineup).forEach((player) => {
      if (player) positions[player.position as keyof typeof positions]++
    })
    return positions
  }

  const positionStats = getPositionStats()
  const totalPlayers = Object.values(lineup).filter(Boolean).length

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Sắp xếp đội hình chuyên nghiệp
            {readOnly && <span className="text-slate-400 text-lg ml-2">(Chế độ xem)</span>}
          </h2>
          <p className="text-slate-400 text-sm">
            {readOnly ? 'Xem đội hình đã được sắp xếp' : 'Kéo thả cầu thủ vào vị trí mong muốn trên sân'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <label htmlFor="formation" className="text-white font-medium text-sm">
              Sơ đồ:
            </label>
            <select
              id="formation"
              value={formation}
              onChange={handleFormationChange}
              disabled={readOnly}
              className="bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600 focus:border-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="4-4-2">4-4-2 (Cân bằng)</option>
              <option value="4-3-3">4-3-3 (Tấn công)</option>
              <option value="3-5-2">3-5-2 (Linh hoạt)</option>
            </select>
          </div>

          {!readOnly && (
            <div className="flex gap-2">
              <button
                onClick={handleAutoFill}
                className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Tự động
              </button>
              <button
                onClick={handleClearAll}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Xóa tất cả
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats panel */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-yellow-400 font-bold text-lg">{positionStats.GK}</div>
              <div className="text-xs text-slate-400">Thủ môn</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-bold text-lg">{positionStats.DF}</div>
              <div className="text-xs text-slate-400">Hậu vệ</div>
            </div>
            <div className="text-center">
              <div className="text-green-400 font-bold text-lg">{positionStats.MF}</div>
              <div className="text-xs text-slate-400">Tiền vệ</div>
            </div>
            <div className="text-center">
              <div className="text-red-400 font-bold text-lg">{positionStats.FW}</div>
              <div className="text-xs text-slate-400">Tiền đạo</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-white font-bold text-lg">{totalPlayers}/11</div>
            <div className="text-xs text-slate-400">Cầu thủ</div>
          </div>
        </div>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={readOnly ? undefined : handleDragStart}
        onDragEnd={readOnly ? undefined : handleDragEnd}
      >
        <Pitch>
          {FORMATIONS[formation].map((pos) => (
            <DroppablePosition
              key={pos.id}
              position={pos}
              player={lineup[pos.id]}
              onRemove={() => handleRemoveFromPosition(pos.id)}
              readOnly={readOnly}
            />
          ))}
        </Pitch>

        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded"></span>
            {readOnly ? `Danh sách cầu thủ dự bị (${bench.length})` : `Danh sách cầu thủ dự bị (${bench.length})`}
            {readOnly && <span className="text-slate-400 text-sm font-normal ml-2">- Chỉ xem</span>}
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {bench.map((player) => (
              <DraggablePlayer key={player.id} player={player} id={player.id} readOnly={readOnly} />
            ))}
            {bench.length === 0 && (
              <div className="text-slate-400 text-sm italic py-4">Tất cả cầu thủ đã được xếp vào sân</div>
            )}
          </div>
        </div>

        <DragOverlay>
          {activeId && (
            <PlayerCard
              player={bench.find((p) => p.id === activeId) || Object.values(lineup).find((p) => p && p.id === activeId)}
              isDragging={true}
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
