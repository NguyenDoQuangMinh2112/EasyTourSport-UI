import type { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './header'
import { Footer } from './footer'

interface LayoutProps {
  children?: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col">
      <Header />
      <main className="flex-1">{children || <Outlet />}</main>
      <Footer />
    </div>
  )
}
