// Unified Color Scheme for EasyTourSport - Component Colors Only
// This file defines consistent colors for UI components (buttons, cards, etc.)
// Background colors are kept as-is and not modified by this system

export const colors = {
  // Primary Brand Colors
  primary: {
    blue: {
      50: 'blue-50',
      400: 'blue-400',
      500: 'blue-500',
      600: 'blue-600',
      900: 'blue-900'
    },
    purple: {
      400: 'purple-400',
      500: 'purple-500',
      600: 'purple-600',
      700: 'purple-700'
    },
    pink: {
      400: 'pink-400',
      500: 'pink-500'
    }
  },

  // Secondary/Accent Colors
  secondary: {
    green: {
      400: 'green-400',
      500: 'green-500',
      600: 'green-600'
    },
    emerald: {
      500: 'emerald-500',
      600: 'emerald-600'
    },
    yellow: {
      400: 'yellow-400',
      500: 'yellow-500'
    },
    orange: {
      500: 'orange-500'
    },
    red: {
      400: 'red-400',
      500: 'red-500'
    },
    cyan: {
      500: 'cyan-500'
    }
  },

  // Neutral Colors
  neutral: {
    slate: {
      300: 'slate-300',
      400: 'slate-400',
      500: 'slate-500',
      600: 'slate-600',
      700: 'slate-700',
      800: 'slate-800',
      900: 'slate-900'
    }
  }
} as const

// Gradient Patterns - Consistent throughout the app
export const gradients = {
  // Primary brand gradient (blue -> purple -> pink)
  brand: {
    primary: 'from-blue-500 via-purple-500 to-pink-500',
    text: 'from-blue-400 via-purple-400 to-pink-400',
    textHover: 'from-blue-300 via-purple-300 to-pink-300',
    subtle: 'from-blue-500/10 via-purple-500/10 to-pink-500/10'
  },

  // Action gradients
  action: {
    primary: 'from-blue-500 to-purple-600',
    primaryHover: 'from-blue-600 to-purple-700',
    success: 'from-green-500 to-emerald-500',
    successHover: 'from-green-600 to-emerald-600',
    warning: 'from-yellow-500 to-orange-500',
    danger: 'from-red-500 to-pink-500'
  },

  // Status gradients
  status: {
    beginner: 'from-green-500 to-blue-500',
    intermediate: 'from-yellow-500 to-orange-500',
    advanced: 'from-red-500 to-purple-500',
    featured: 'from-yellow-500 to-orange-500'
  },

  // Section-specific gradients
  section: {
    navigation: 'from-blue-500/10 to-purple-600/10',
    quickLinks: 'from-blue-500 to-purple-500',
    sports: 'from-purple-500 to-pink-500',
    contact: 'from-pink-500 to-red-500'
  }
} as const

// Theme colors for consistent usage
export const theme = {
  text: {
    primary: 'text-white',
    secondary: 'text-slate-300',
    muted: 'text-slate-400',
    accent: 'text-blue-400'
  },
  border: {
    primary: 'border-slate-700/50',
    accent: 'border-blue-500/20',
    muted: 'border-slate-600/30'
  },
  bg: {
    primary: 'bg-slate-900',
    secondary: 'bg-slate-800/50',
    accent: 'bg-blue-500/10',
    card: 'bg-slate-800/30'
  }
} as const

// Helper functions for common gradient combinations
export const getGradient = {
  brand: () => `bg-gradient-to-br ${gradients.brand.primary}`,
  brandText: () => `bg-gradient-to-r ${gradients.brand.text}`,
  action: () => `bg-gradient-to-r ${gradients.action.primary}`,
  status: (level: 'beginner' | 'intermediate' | 'advanced') => `bg-gradient-to-r ${gradients.status[level]}`
} as const
