
import { useState } from 'react';
import {
    BarChart2,
    Activity,
    Network,
    PlayCircle
} from 'lucide-react';

import SlideExecution from './components/slides/Tema3/SlideExecution';
import SlideControl from './components/slides/Tema3/SlideControl';
import SlideNetworkAnatomy from './components/slides/Tema3/SlideNetworkAnatomy';
import SlideCriticalPath from './components/slides/Tema3/SlideCriticalPath';
import SlideEVMSemaphore from './components/slides/Tema3/SlideEVMSemaphore';
import SlideSCurve from './components/slides/Tema3/SlideSCurve';
import SlideEstimation from './components/slides/Tema3/SlideEstimation';

interface SlideItem {
    title: string;
    icon: React.ReactNode;
    subtitle: string;
}

const Tema3_Infografic = () => {
    const [activeTab, setActiveTab] = useState(0);

    const slides: SlideItem[] = [
        {
            title: "1. Cronograma y Redes",
            icon: <Network className="w-5 h-5" />,
            subtitle: "Estimación, PDM, Ruta Crítica" // Modified subtitle
        },
        {
            title: "2. Ejecución y Control",
            icon: <PlayCircle className="w-5 h-5" />, // Changed icon to PlayCircle
            subtitle: "Calidad, RRHH y Cambios" // Modified subtitle
        },
        {
            title: "3. Laboratorio EVM",
            icon: <BarChart2 className="w-5 h-5" />,
            subtitle: "Valor Ganado y Curva S" // Modified subtitle
        },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 0:
                return (
                    <div className="space-y-12">
                        <SlideEstimation /> {/* Added SlideEstimation */}
                        <div className="border-t-2 border-dashed border-slate-200 dark:border-slate-700" />
                        <SlideNetworkAnatomy />
                        <div className="border-t-2 border-dashed border-slate-200 dark:border-slate-700" />
                        <SlideCriticalPath />
                    </div>
                );
            case 1:
                return (
                    <div className="space-y-12">
                        <SlideExecution />
                        <div className="border-t-2 border-dashed border-slate-200 dark:border-slate-700" />
                        <SlideControl />
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-12">
                        <SlideEVMSemaphore />
                        <div className="border-t-2 border-dashed border-slate-200 dark:border-slate-700" />
                        <SlideSCurve />
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans text-text-main flex flex-col transition-colors duration-300">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white p-6 shadow-lg z-20 relative">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Activity className="w-8 h-8 text-blue-300" />
                        Tema 3: Ejecución, Monitorización y Control del Proyecto.
                    </h1>
                    <p className="mt-2 text-blue-100 opacity-90">
                        Domina los diagramas de red, gestiona la ejecución y controla los costos con el Laboratorio EVM interactivo.
                    </p>
                </div>
            </header>

            {/* Layout Container */}
            <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-8 p-6">

                {/* Navigation Sidebar */}
                <aside className="w-full md:w-72 shrink-0">
                    <nav
                        className="bg-surface rounded-xl shadow-sm border border-border sticky top-6 overflow-hidden transition-colors duration-300"
                        role="tablist"
                        aria-label="Diapositivas de la infografía"
                    >
                        <div className="flex flex-col">
                            {slides.map((slide, index) => {
                                const isActive = activeTab === index;
                                return (
                                    <button
                                        key={index}
                                        role="tab"
                                        aria-selected={isActive}
                                        aria-controls={`panel - ${index} `}
                                        id={`tab - ${index} `}
                                        onClick={() => setActiveTab(index)}
                                        className={`flex items - center gap - 3 px - 5 py - 4 text - sm transition - all border - l - 4 text - left ${isActive
                                            ? 'border-blue-500 text-blue-700 bg-blue-50 dark:bg-slate-800 dark:text-blue-400'
                                            : 'border-transparent text-text-muted hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800'
                                            } `}
                                    >
                                        <span className={`shrink - 0 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'} `}>
                                            {slide.icon}
                                        </span>
                                        <div>
                                            <span className="font-bold block">{slide.title}</span>
                                            <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">{slide.subtitle}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main
                    className="flex-1 min-w-0"
                    role="tabpanel"
                    id={`panel - ${activeTab} `}
                    aria-labelledby={`tab - ${activeTab} `}
                >
                    {renderContent()}
                </main>
            </div>

            {/* Footer */}
            <footer className="max-w-7xl mx-auto p-6 text-center text-text-muted text-sm">
                <p>© PP_Expert - Material Docente Interactivo - Basado en PMBOK® Guide</p>
            </footer>
        </div>
    );
};

export default Tema3_Infografic;
