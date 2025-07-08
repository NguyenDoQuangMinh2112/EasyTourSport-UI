import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for proper Tailwind class merging
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Common CSS class combinations for reusability
 */
export const commonStyles = {
  // Button variants
  button: {
    primary:
      'px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:-translate-y-0.5',
    secondary:
      'px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200',
    ghost: 'px-4 py-2 hover:bg-gray-800 text-gray-300 hover:text-white rounded-lg transition-colors duration-200'
  },

  // Card variants
  card: {
    primary: 'bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6',
    interactive:
      'bg-gray-800/50 backdrop-blur-sm border-gray-700 rounded-2xl p-6 hover:bg-gray-800/70 transition-all duration-300 cursor-pointer group'
  },

  // Text variants
  text: {
    heading: 'font-heading font-bold text-white leading-tight tracking-tight',
    subheading: 'font-heading font-semibold text-blue-400 leading-tight tracking-tight',
    body: 'font-primary text-gray-300 leading-normal tracking-normal',
    muted: 'font-primary text-gray-400 leading-normal tracking-normal',
    accent: 'font-primary text-blue-400 leading-normal tracking-normal',
    vietnamese: 'leading-relaxed tracking-normal text-vietnamese'
  },

  // Typography scale with Vietnamese optimization
  typography: {
    // Display text for hero sections
    display: {
      lg: 'font-heading text-5xl md:text-7xl font-bold leading-tight tracking-tight',
      md: 'font-heading text-4xl md:text-5xl font-bold leading-tight tracking-tight',
      sm: 'font-heading text-3xl md:text-4xl font-semibold leading-tight tracking-tight'
    },

    // Headings
    heading: {
      h1: 'font-heading text-3xl font-bold leading-tight tracking-tight',
      h2: 'font-heading text-2xl font-semibold leading-tight tracking-tight',
      h3: 'font-heading text-xl font-semibold leading-tight tracking-tight',
      h4: 'font-heading text-lg font-medium leading-tight tracking-tight'
    },

    // Body text
    body: {
      lg: 'font-primary text-lg leading-normal tracking-normal',
      md: 'font-primary text-base leading-normal tracking-normal',
      sm: 'font-primary text-sm leading-normal tracking-normal',
      xs: 'font-primary text-xs leading-normal tracking-normal'
    },

    // Special text styles
    special: {
      caption: 'font-primary text-xs text-gray-500 uppercase tracking-wide',
      quote: 'font-primary text-lg italic leading-relaxed tracking-normal',
      code: 'font-mono text-sm bg-gray-800 px-2 py-1 rounded'
    }
  },

  // Layout
  container: 'container mx-auto px-4',
  section: 'py-16',

  // Effects
  gradient: {
    background: 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'
  },

  // Animations and interactions
  animations: {
    // Card animations
    card: {
      base: 'sport-card sport-card-default',
      interactive: 'sport-card sport-card-default group cursor-pointer',
      hover: 'transform transition-all duration-300 hover:scale-105 hover:-translate-y-1'
    },

    // Border effects
    border: {
      glow: 'border-glow-animation',
      pulse: 'border-pulse-animation',
      default: 'sport-card-default'
    },

    // Icon effects
    icon: {
      base: 'sport-icon transition-all duration-300',
      hover: 'group-hover:scale-110 group-hover:rotate-1'
    },

    // Badge effects
    badge: {
      popular: 'popular-badge',
      glow: 'animate-pulse'
    }
  },

  // Interaction states
  states: {
    hover: 'hover:shadow-2xl hover:shadow-blue-500/25',
    focus: 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900',
    active: 'active:scale-95',
    disabled: 'opacity-50 cursor-not-allowed'
  }
} as const
