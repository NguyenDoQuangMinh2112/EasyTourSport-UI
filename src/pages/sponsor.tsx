import { useState } from 'react'
import { useTranslation } from '../hooks/use-translation'
import { Heart, Copy, Check, QrCode, CreditCard, Sparkles, Coffee, Crown, Star, Zap } from 'lucide-react'

// Simplified sponsor tiers for compact display
const SPONSOR_TIERS = [
  { amount: 50000, icon: Coffee, color: 'from-amber-500 to-orange-500', label: 'sponsor.tiers.coffee' },
  { amount: 100000, icon: Star, color: 'from-blue-500 to-indigo-500', label: 'sponsor.tiers.supporter' },
  { amount: 300000, icon: Crown, color: 'from-purple-500 to-pink-500', label: 'sponsor.tiers.champion' },
  { amount: 1000000, icon: Zap, color: 'from-yellow-500 to-red-500', label: 'sponsor.tiers.hero' }
]

const BANK_INFO = {
  bankName: 'MB Bank',
  accountNumber: '0123456789',
  accountName: 'NGUYEN VAN A',
  qrCode: '/qr-code-placeholder.png'
}

export default function SponsorPage() {
  const { t } = useTranslation()
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Compact Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <Heart className="w-5 h-5 text-pink-300 animate-pulse" />
            <span className="text-white font-medium">{t('sponsor.hero.badge')}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
            {t('sponsor.hero.title')}
          </h1>
          
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            {t('sponsor.hero.description')}
          </p>

          {/* Stats Bar */}
          <div className="flex items-center justify-center gap-8 text-purple-200 text-sm">
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              <span>{t('sponsor.stats.users')}</span>
            </div>
            <div className="w-1 h-1 bg-purple-300 rounded-full" />
            <div className="flex items-center gap-1">
              <span>{t('sponsor.stats.tournaments')}</span>
            </div>
            <div className="w-1 h-1 bg-purple-300 rounded-full" />
            <div className="flex items-center gap-1">
              <span>{t('sponsor.stats.free')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Single Row Layout */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Payment Methods - Compact */}
          <div className="lg:col-span-1 space-y-6">
            {/* QR Code */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-center">
                <QrCode className="w-8 h-8 text-blue-300 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-4">{t('sponsor.qr.title')}</h3>
                
                <div className="bg-white p-4 rounded-xl mb-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mx-auto">
                    <QrCode className="w-16 h-16 text-blue-600" />
                  </div>
                </div>
                
                <p className="text-sm text-purple-200">{t('sponsor.qr.description')}</p>
              </div>
            </div>

            {/* Bank Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-6 h-6 text-green-300" />
                <h3 className="text-xl font-bold text-white">{t('sponsor.bank.title')}</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-xs text-purple-300">{t('sponsor.bank.bankName')}</p>
                    <p className="text-white font-semibold">{BANK_INFO.bankName}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex-1">
                    <p className="text-xs text-purple-300">{t('sponsor.bank.accountNumber')}</p>
                    <p className="text-white font-mono font-semibold">{BANK_INFO.accountNumber}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(BANK_INFO.accountNumber, 'account')}
                    className="p-2 text-purple-300 hover:text-white transition-colors"
                  >
                    {copiedField === 'account' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-xs text-purple-300">{t('sponsor.bank.accountName')}</p>
                    <p className="text-white font-semibold">{BANK_INFO.accountName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sponsor Tiers - Compact Grid */}
          <div className="lg:col-span-2">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">{t('sponsor.tiers.title')}</h2>
              <p className="text-purple-200">{t('sponsor.tiers.description')}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {SPONSOR_TIERS.map((tier, index) => {
                const IconComponent = tier.icon
                return (
                  <div
                    key={index}
                    className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                  >
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-2">
                        {t(`${tier.label}.name`)}
                      </h3>
                      
                      <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text mb-3">
                        {formatCurrency(tier.amount)}
                      </div>
                      
                      <p className="text-sm text-purple-200 mb-4">
                        {t(`${tier.label}.description`)}
                      </p>
                      
                      <div className="text-xs text-purple-300 space-y-1">
                        <div className="flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>{t(`${tier.label}.benefits.thanks`)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>{t(`${tier.label}.benefits.name`)}</span>
                        </div>
                        {tier.amount >= 100000 && (
                          <div className="flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>{t(`${tier.label}.benefits.badge`)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* CTA */}
            <div className="text-center mt-8 p-6 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl border border-pink-500/30">
              <h3 className="text-xl font-bold text-white mb-2">{t('sponsor.cta.title')}</h3>
              <p className="text-purple-200 mb-4">{t('sponsor.cta.description')}</p>
              
              <button
                onClick={() => copyToClipboard(BANK_INFO.accountNumber, 'cta')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                {copiedField === 'cta' ? (
                  <>
                    <Check className="w-5 h-5" />
                    {t('sponsor.cta.copied')}
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    {t('sponsor.cta.copyAccount')}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
