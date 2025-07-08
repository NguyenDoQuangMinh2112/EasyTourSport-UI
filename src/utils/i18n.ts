import type { SupportedLanguage } from '../i18n/config'

/**
 * Format date according to the current language
 */
export function formatDate(date: Date, language: SupportedLanguage): string {
  const locale = language === 'vi' ? 'vi-VN' : 'en-US'
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

/**
 * Format currency according to the current language
 */
export function formatCurrency(amount: number, language: SupportedLanguage): string {
  if (language === 'vi') {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

/**
 * Format number according to the current language
 */
export function formatNumber(number: number, language: SupportedLanguage): string {
  const locale = language === 'vi' ? 'vi-VN' : 'en-US'
  return new Intl.NumberFormat(locale).format(number)
}

/**
 * Get direction for the current language (for RTL support in the future)
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getTextDirection(_language: SupportedLanguage): 'ltr' | 'rtl' {
  // Both Vietnamese and English are LTR
  return 'ltr'
}
