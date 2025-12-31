import InfographicDeck from './Tema1_Infografic'
import { ThemeProvider } from './context/ThemeContext'
import { ThemeToggle } from './components/ui/ThemeToggle'

function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-background transition-colors duration-300">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <InfographicDeck />
      </div>
    </ThemeProvider>
  )
}

export default App
