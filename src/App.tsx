import { Layout } from './components'
import { HomePage } from './pages'
import { SportSelectionProvider } from './contexts/sport-selection-unified'

function App() {
  return (
    <SportSelectionProvider>
      <Layout>
        <HomePage />
      </Layout>
    </SportSelectionProvider>
  )
}

export default App
