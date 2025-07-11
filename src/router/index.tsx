import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '../components'
import {
  HomePage,
  DashboardPage,
  ProfileSetupPage,
  TournamentBrowsePage,
  TournamentCreatePage,
  TournamentSetupPage,
  TournamentDetailsPage,
  MatchDetailsPage,
  TeamProfilePage,
  PlayerProfilePage,
  MatchSchedulePage,
  UserDashboardPage,
  AuthPage,
  FeaturesPage,
  TeamsPlayersPage
} from '../pages'
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
      // Trang chủ
      {
        index: true,
        element: <HomePage />
      },

      // Dashboard
      {
        path: 'dashboard',
        element: <DashboardPage />
      },

      // Profile setup
      {
        path: 'profile/setup',
        element: <ProfileSetupPage />
      },

      // Tournament routes - theo thứ tự logic
      {
        path: 'tournaments',
        element: <TournamentBrowsePage />
      },
      {
        path: 'tournaments/create/:sportId?',
        element: <TournamentCreatePage />
      },
      {
        path: 'tournaments/setup/:sportId/:tournamentId',
        element: <TournamentSetupPage />
      },
      {
        path: 'tournaments/:id',
        element: <TournamentDetailsPage />
      },
      // Match and team details
      {
        path: 'matches',
        element: <MatchSchedulePage />
      },
      {
        path: 'matches/:matchId',
        element: <MatchDetailsPage />
      },
      {
        path: 'teams/:teamId',
        element: <TeamProfilePage />
      },
      {
        path: 'players/:playerId',
        element: <PlayerProfilePage />
      },

      // Authentication
      {
        path: 'auth',
        element: <AuthPage />
      },
      {
        path: 'login',
        element: <AuthPage />
      },
      {
        path: 'register',
        element: <AuthPage />
      },

      // User and organizer dashboards
      {
        path: 'organizer',
        element: <UserDashboardPage />
      },
      {
        path: 'user-dashboard',
        element: <UserDashboardPage />
      },

      // Features overview
      {
        path: 'features',
        element: <FeaturesPage />
      },

      // Redirects and aliases
      {
        path: 'teams',
        element: <TeamsPlayersPage />
      },
      {
        path: 'players',
        element: <TeamsPlayersPage />
      }
    ]
  }
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
