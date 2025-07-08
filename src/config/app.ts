export const APP_CONFIG = {
  name: 'EasyTourSport',
  version: '1.0.0',
  description: 'Modern sports tournament platform',

  // API Configuration
  api: {
    baseUrl: process.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 10000
  },

  // UI Configuration
  ui: {
    maxContainerWidth: '1200px',
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    animations: {
      fastDuration: '150ms',
      normalDuration: '300ms',
      slowDuration: '500ms'
    }
  },

  // Feature flags
  features: {
    darkMode: true,
    multiLanguage: true,
    notifications: true,
    analytics: false
  },

  // Supported languages
  supportedLanguages: ['en', 'vi'] as const,
  defaultLanguage: 'en' as const,

  // Theme configuration
  themes: ['light', 'dark', 'system'] as const,
  defaultTheme: 'dark' as const
} as const

export type SupportedLanguage = (typeof APP_CONFIG.supportedLanguages)[number]
export type Theme = (typeof APP_CONFIG.themes)[number]

/**
 * Environment-specific configuration
 */
export const ENV = {
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  isTest: import.meta.env.MODE === 'test'
} as const

/**
 * External links and social media
 */
export const EXTERNAL_LINKS = {
  github: 'https://github.com/easytoursport',
  documentation: 'https://docs.easytoursport.com',
  support: 'https://support.easytoursport.com',
  social: {
    facebook: 'https://facebook.com/easytoursport',
    twitter: 'https://twitter.com/easytoursport',
    instagram: 'https://instagram.com/easytoursport'
  }
} as const
