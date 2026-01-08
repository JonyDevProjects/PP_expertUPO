import { useState } from 'react';
import {
    ListTree,
    Link,
    TrendingUp,
    Gauge
} from 'lucide-react';

import SlideScope from './components/slides/Tema4/SlideScope';
import SlideSequencing from './components/slides/Tema4/SlideSequencing';
import SlideCPM from './components/slides/Tema4/SlideCPM';
import SlideOptimization from './components/slides/Tema4/SlideOptimization';

interface SlideItem {
    title: string;
    icon: React.ReactNode;
    subtitle: string;
}

const Tema4_Infografic = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
    const [audioSequenceStep, setAudioSequenceStep] = useState(0);

    const slides: SlideItem[] = [
        {
            title: "1. Alcance (WBS)",
            icon: <ListTree className="w-5 h-5" />,
            subtitle: "Descomposición y Regla 100%"
        },
        {
            title: "2. Secuencia (PDM)",
            icon: <Link className="w-5 h-5" />,
            subtitle: "Dependencias y Lógica"
        },
        {
            title: "3. Ruta Crítica (CPM)",
            icon: <TrendingUp className="w-5 h-5" />,
            subtitle: "Holguras y Duración Mínima"
        },
        {
            title: "4. Optimización",
            icon: <Gauge className="w-5 h-5" />,
            subtitle: "Crashing vs Fast Tracking"
        }
    ];

    // Reset sequence on tab change
    if (activeTab !== audioSequenceStep && autoPlayEnabled) {
        // This logic keeps tab in sync with audio sequence if user didn't manually change tab
        // If user manually changes tab, we might want to respect that, but for auto-play, we generally drive tab via sequence.
        // Actually, simpler approach used in Tema 3:
    }

    // Effect to switch tabs based on sequence step? 
    // In Tema 3 we did manually syncing or just let `audioSequenceStep` drive components if they are all rendered. 
    // But here we switch tabs. 
    // Let's copy the pattern: if autoPlay is on, `audioSequenceStep` determines the active concept.
    // However, `renderContent` switches based on `activeTab`. 
    // We need to sync them if we want auto-advance across tabs.

    // For now, let's just pass the props and handle the logic:
    const handleAudioComplete = () => {
        if (activeTab < slides.length - 1) {
            setAudioSequenceStep(0); // Reset internal step for next slide
            setActiveTab(prev => prev + 1);
        } else {
            setAutoPlayEnabled(false); // End of show
        }
    };

    const getProps = () => ({
        autoPlay: autoPlayEnabled,
        onAudioComplete: handleAudioComplete
    });

    const renderContent = () => {
        switch (activeTab) {
            case 0:
                // @ts-ignore
                return <SlideScope {...getProps()} />;
            case 1:
                // @ts-ignore
                return <SlideSequencing {...getProps()} />;
            case 2:
                // @ts-ignore
                return <SlideCPM {...getProps()} />;
            case 3:
                // @ts-ignore
                return <SlideOptimization {...getProps()} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <header className="text-center space-y-4 mb-12 relative">
                <div className="absolute top-0 right-0">
                    <button
                        onClick={() => setAutoPlayEnabled(!autoPlayEnabled)}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all
                            ${autoPlayEnabled
                                ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30 ring-2 ring-orange-400 ring-offset-2 dark:ring-offset-slate-900'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }
                        `}
                    >
                        {autoPlayEnabled ? 'Modo Lectura: ON' : 'Modo Lectura: OFF'}
                    </button>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
                    Tema 4: Planificación, Alcance y Cronograma
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                    Este tema aborda la transición crítica desde la planificación del <strong>Alcance</strong>, centrándose en la descomposición del trabajo mediante la <strong>EDT/WBS</strong>, hacia la gestión del <strong>Tiempo</strong>. Se detalla el proceso de definición y <strong>secuenciación de actividades</strong> utilizando el <strong>Método de Diagramación por Precedencia (PDM)</strong>, fundamental para construir el cronograma. Finalmente, se profundiza en el cálculo de la <strong>Ruta Crítica (CPM)</strong> para determinar la duración del proyecto y se exploran <strong>técnicas</strong> de optimización y compresión del cronograma como el <strong>Crashing (intensificación) y el Fast Tracking (ejecución rápida).</strong>
                </p>
            </header>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-2 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                {slides.map((slide, index) => {
                    const isActive = activeTab === index;
                    return (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`
                                flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 border-2
                                ${isActive
                                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 transform scale-105 shadow-md'
                                    : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
                                }
                            `}
                        >
                            <div className={`p-2 rounded-full ${isActive ? 'bg-orange-100 dark:bg-orange-800' : 'bg-slate-100 dark:bg-slate-800'}`}>
                                {slide.icon}
                            </div>
                            <div className="text-center">
                                <span className={`block font-bold text-sm ${isActive ? 'text-slate-800 dark:text-white' : ''}`}>
                                    {slide.title}
                                </span>
                                <span className="text-xs opacity-75 hidden md:block">
                                    {slide.subtitle}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Main Content Area */}
            <main className="min-h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                {renderContent()}
            </main>
        </div>
    );
};

export default Tema4_Infografic;
