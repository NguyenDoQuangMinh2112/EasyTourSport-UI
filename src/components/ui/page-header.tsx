import { LanguageToggle } from './language-toggle'

interface PageHeaderProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  showLanguageToggle?: boolean
  children?: React.ReactNode
}

export function PageHeader({ title, subtitle, icon, showLanguageToggle = true, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
      <div className="text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-4 mb-2">
          {icon && (
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {title}
            </h1>
            {subtitle && <p className="text-slate-400 text-lg">{subtitle}</p>}
          </div>
        </div>
        {children}
      </div>

      {showLanguageToggle && (
        <div className="flex justify-center lg:justify-end">
          <LanguageToggle />
        </div>
      )}
    </div>
  )
}
