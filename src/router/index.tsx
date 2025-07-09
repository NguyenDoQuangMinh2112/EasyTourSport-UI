import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '../components'
import { HomePage, DashboardPage, ProfileSetupPage, TournamentBrowsePage } from '../pages'
import { SportSelectionProvider } from '../contexts/sport-selection-unified'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SportSelectionProvider>
        <Layout />
      </SportSelectionProvider>
    ),
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: 'profile/setup',
        element: <ProfileSetupPage />
      },
      {
        path: 'tournaments',
        element: <TournamentBrowsePage />
      },
      {
        path: 'tournaments/create/:sportId?',
        element: (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Create Tournament</h1>
              <p className="text-slate-400">Coming Soon...</p>
            </div>
          </div>
        )
      },
      {
        path: 'tournaments/:id',
        element: (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Tournament Details</h1>
              <p className="text-slate-400">Coming Soon...</p>
            </div>
          </div>
        )
      }
    ]
  }
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
