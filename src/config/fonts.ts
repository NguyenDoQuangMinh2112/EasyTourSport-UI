/**
 * Font configuration for multilingual support (English & Vietnamese)
 * Optimized for readability, accessibility, and aesthetic appeal
 */

export const FONT_CONFIG = {
  // Primary font stack - Modern sans-serif with excellent Vietnamese support
  primary: {
    family: '"Inter", "SF Pro Display", "Segoe UI", "Roboto", "Noto Sans", "Source Sans Pro", sans-serif',
    weights: [300, 400, 500, 600, 700],
    fallbacks: [
      '"Segoe UI"', // Windows default
      '"Roboto"', // Android default
      '"SF Pro Display"', // macOS/iOS
      '"Noto Sans"', // Google Fonts Vietnamese support
      'sans-serif'
    ]
  },

  // Secondary font for headings - More distinctive
  heading: {
    family: '"Manrope", "Inter", "SF Pro Display", "Segoe UI", sans-serif',
    weights: [400, 500, 600, 700, 800],
    fallbacks: ['"Inter"', '"SF Pro Display"', '"Segoe UI"', 'sans-serif']
  },

  // Monospace for code and technical content
  mono: {
    family: '"JetBrains Mono", "Fira Code", "SF Mono", "Monaco", "Cascadia Code", monospace',
    weights: [400, 500, 600],
    fallbacks: ['"SF Mono"', '"Monaco"', '"Cascadia Code"', 'monospace']
  },

  // Font features for better Vietnamese typography
  features: {
    vietnamese: {
      fontFeatureSettings: '"liga" 1, "kern" 1, "calt" 1',
      fontVariantLigatures: 'common-ligatures',
      textRendering: 'optimizeLegibility'
    }
  }
} as const

/**
 * Recommended font combinations for different use cases
 */
export const FONT_COMBINATIONS = {
  // Modern and clean - Best for most UI
  modern: {
    heading: 'Manrope',
    body: 'Inter',
    description: 'Perfect balance of modernity and readability'
  },

  // Professional and trustworthy
  professional: {
    heading: 'Inter',
    body: 'Source Sans Pro',
    description: 'Corporate-friendly with excellent Vietnamese support'
  },

  // Friendly and approachable
  friendly: {
    heading: 'Poppins',
    body: 'Open Sans',
    description: 'Warm and welcoming feel'
  },

  // Technical and precise
  technical: {
    heading: 'Space Grotesk',
    body: 'Inter',
    description: 'Great for tech-focused applications'
  }
} as const

/**
 * Vietnamese-specific font considerations
 */
export const VIETNAMESE_FONTS = {
  // Fonts with excellent Vietnamese diacritic support
  recommended: [
    'Inter', // Excellent Vietnamese support, modern
    'Noto Sans', // Google's comprehensive font family
    'Source Sans Pro', // Adobe's open-source font
    'Open Sans', // Google Fonts, very readable
    'Roboto', // Google's system font
    'Manrope', // Modern geometric sans-serif
    'Poppins' // Friendly rounded font
  ],

  // System fonts with good Vietnamese support
  system: [
    'SF Pro Display', // macOS/iOS
    'Segoe UI', // Windows
    'Roboto', // Android
    'system-ui' // Generic system font
  ],

  // Font features for Vietnamese text
  features: {
    // Improve diacritic positioning
    fontFeatureSettings: '"mark" 1, "mkmk" 1, "kern" 1',
    // Better line height for Vietnamese text
    lineHeight: '1.6',
    // Letter spacing adjustment
    letterSpacing: '0.01em'
  }
} as const

/**
 * Font loading strategy
 */
export const FONT_LOADING = {
  // Preload critical fonts
  preload: ['Inter-400.woff2', 'Inter-500.woff2', 'Inter-600.woff2'],

  // Font display strategy
  display: 'swap', // Use fallback while loading

  // Optimization settings
  optimization: {
    // Subset fonts to include only needed characters
    subset: 'latin,latin-ext,vietnamese',
    // Unicode ranges for Vietnamese
    unicodeRange: 'U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9'
  }
} as const
