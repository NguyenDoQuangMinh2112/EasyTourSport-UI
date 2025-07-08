import { createContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { SportData } from '../types'

interface SportSelectionContextType {
  selectedSport: SportData | null
  setSelectedSport: (sport: SportData | null) => void
}

const SportSelectionContext = createContext<SportSelectionContextType>({
  selectedSport: null,
  setSelectedSport: () => {}
})

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

export function useSportSelection(): SportSelectionContextType {
  return {
    selectedSport: null,
    setSelectedSport: () => {}
  }
}

export { SportSelectionContext }
