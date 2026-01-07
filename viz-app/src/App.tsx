import { useState } from 'react'
import Tema1_Infografic from './Tema1_Infografic'
import Tema2_Infografic from './Tema2_Infografic'
import Tema3_Infografic from './Tema3_Infografic'
import Tema4_Infografic from './Tema4_Infografic'
import Tema5_Infografic from './Tema5_Infografic'
import { ThemeProvider } from './context/ThemeContext'
import { ThemeToggle } from './components/ui/ThemeToggle'

function App() {
  const [activeTheme, setActiveTheme] = useState<'tema1' | 'tema2' | 'tema3' | 'tema4' | 'tema5'>('tema1');

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-background transition-colors duration-300">
        <nav className="sticky top-0 z-50 flex justify-center items-center gap-4 p-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 mb-8">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-full p-1 flex text-sm font-medium shadow-sm">
            <button
              onClick={() => setActiveTheme('tema1')}
              className={`px-4 py-1.5 rounded-full transition-all ${activeTheme === 'tema1' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm font-bold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}`}
            >
              Tema 1
            </button>
            <button
              onClick={() => setActiveTheme('tema2')}
              className={`px-4 py-1.5 rounded-full transition-all ${activeTheme === 'tema2' ? 'bg-white dark:bg-slate-700 text-teal-600 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}`}
            >
              Tema 2
            </button>
            <button
              onClick={() => setActiveTheme('tema3')}
              className={`px-4 py-1.5 rounded-full transition-all ${activeTheme === 'tema3' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}`}
            >
              Tema 3
            </button>
            <button
              onClick={() => setActiveTheme('tema4')}
              className={`px-4 py-1.5 rounded-full transition-all ${activeTheme === 'tema4' ? 'bg-white dark:bg-slate-700 text-orange-600 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}`}
            >
              Tema 4
            </button>
            <button
              onClick={() => setActiveTheme('tema5')}
              className={`px-4 py-1.5 rounded-full transition-all ${activeTheme === 'tema5' ? 'bg-white dark:bg-slate-700 text-purple-600 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}`}
            >
              Tema 5
            </button>
          </div>
          <ThemeToggle />
        </nav>

        {activeTheme === 'tema1' && <Tema1_Infografic />}
        {activeTheme === 'tema2' && <Tema2_Infografic />}
        {activeTheme === 'tema3' && <Tema3_Infografic />}
        {activeTheme === 'tema4' && <Tema4_Infografic />}
        {activeTheme === 'tema5' && <Tema5_Infografic />}
      </div>
    </ThemeProvider>
  )
}

export default App
