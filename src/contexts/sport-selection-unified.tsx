import { createContext, useState, useContext } from 'react'
import type { ReactNode } from 'react'
import type { SportData } from '../types'

interface SportSelectionContextType {
  selectedSport: SportData | null
  setSelectedSport: (sport: SportData | null) => void
}

const SportSelectionContext = createContext<SportSelectionContextType | null>(null)

interface SportSelectionProviderProps {
  children: ReactNode
}

export function SportSelectionProvider({ children }: SportSelectionProviderProps) {
  const [selectedSport, setSelectedSport] = useState<SportData | null>(null)

  return (
    <SportSelectionContext.Provider value={{ selectedSport, setSelectedSport }}>
      {children}
    </SportSelectionContext.Provider>
  )
}

export function useSportSelection() {
  const context = useContext(SportSelectionContext)
  if (!context) {
    return { selectedSport: null, setSelectedSport: () => {} }
  }
  return context
}
