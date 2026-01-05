import { useState } from 'react'
import Tema1_Infografic from './Tema1_Infografic'
import Tema2_Infografic from './Tema2_Infografic'
import Tema3_Infografic from './Tema3_Infografic'
import { ThemeProvider } from './context/ThemeContext'
import { ThemeToggle } from './components/ui/ThemeToggle'

function App() {
  const [activeTheme, setActiveTheme] = useState<'tema1' | 'tema2' | 'tema3'>('tema1');

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-background transition-colors duration-300">
        <div className="fixed top-4 right-4 z-50 flex gap-4 items-center">
          <div className="bg-white dark:bg-slate-800 rounded-full shadow-md p-1 border border-border flex text-sm font-medium">
            <button
              onClick={() => setActiveTheme('tema1')}
              className={`px-4 py-1.5 rounded-full transition-colors ${activeTheme === 'tema1' ? 'bg-primary text-white' : 'text-text-muted hover:bg-slate-100 dark:hover:bg-slate-700'}`}
            >
              Tema 1
            </button>
            <button
              onClick={() => setActiveTheme('tema2')}
              className={`px-4 py-1.5 rounded-full transition-colors ${activeTheme === 'tema2' ? 'bg-teal-600 text-white' : 'text-text-muted hover:bg-slate-100 dark:hover:bg-slate-700'}`}
            >
              Tema 2
            </button>
            <button
              onClick={() => setActiveTheme('tema3')}
              className={`px-4 py-1.5 rounded-full transition-colors ${activeTheme === 'tema3' ? 'bg-blue-600 text-white' : 'text-text-muted hover:bg-slate-100 dark:hover:bg-slate-700'}`}
            >
              Tema 3
            </button>
          </div>
          <ThemeToggle />
        </div>

        {activeTheme === 'tema1' && <Tema1_Infografic />}
        {activeTheme === 'tema2' && <Tema2_Infografic />}
        {activeTheme === 'tema3' && <Tema3_Infografic />}
      </div>
    </ThemeProvider>
  )
}

export default App
