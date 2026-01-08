
import { useState, useEffect } from 'react';
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
    const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
    const [audioSequenceStep, setAudioSequenceStep] = useState(0);

    // Reset sequence on tab change
    useEffect(() => {
        setAudioSequenceStep(0);
    }, [activeTab]);

    // Define the number of sequential slides per tab
    const tabSteps = [1, 3, 2, 1];

    const handleAudioComplete = () => {
        const currentTabTotalSteps = tabSteps[activeTab];

        if (audioSequenceStep < currentTabTotalSteps - 1) {
            // Move to next slide within the same tab
            setAudioSequenceStep(prev => prev + 1);
        } else {
            // Move to next tab
            if (activeTab < slides.length - 1) {
                setActiveTab(prev => prev + 1);
                setAudioSequenceStep(0); // Explicit reset for immediate sync
            } else {
                // End of presentation
                setAutoPlayEnabled(false);
            }
        }
    };

    const slides: SlideItem[] = [
        {
            title: "1. Ejecución (Índice 1-5)",
            icon: <PlayCircle className="w-5 h-5" />,
            subtitle: "Procesos, Fases y Definiciones"
        },
        {
            title: "2. Cronograma (Índice 6.4)",
            icon: <Network className="w-5 h-5" />,
            subtitle: "Estimación, Redes y Ruta Crítica"
        },
        {
            title: "3. Coste y Estado (Índice 6.5)",
            icon: <BarChart2 className="w-5 h-5" />,
            subtitle: "EVM, Curva S y Pronósticos"
        },
        {
            title: "4. Control y Soporte (Índice 6.6-12)",
            icon: <Activity className="w-5 h-5" />,
            subtitle: "Cambios, Calidad y Riesgos"
        }
    ];

    const renderContent = () => {
        // Helper to generate props for sequential playback
        const getProps = (stepIndex: number) => ({
            autoPlay: autoPlayEnabled && audioSequenceStep === stepIndex,
            onAudioComplete: handleAudioComplete
        });

        switch (activeTab) {
            case 0: // Ejecución
                return (
                    <div className="space-y-12">
                        <SlideExecution {...getProps(0)} />
                    </div>
                );
            case 1: // Cronograma (6.4 Tiempo)
                return (
                    <div className="space-y-12">
                        <SlideEstimation {...getProps(0)} />
                        <div className="border-t-2 border-dashed border-slate-200 dark:border-slate-700" />
                        <SlideNetworkAnatomy {...getProps(1)} />
                        <div className="border-t-2 border-dashed border-slate-200 dark:border-slate-700" />
                        <SlideCriticalPath {...getProps(2)} />
                    </div>
                );
            case 2: // Coste y Estado (6.4 Coste + 6.5 EVM)
                return (
                    <div className="space-y-12">
                        <SlideEVMSemaphore {...getProps(0)} />
                        <div className="border-t-2 border-dashed border-slate-200 dark:border-slate-700" />
                        <SlideSCurve {...getProps(1)} />
                    </div>
                );
            case 3: // Control y Soporte
                return (
                    <div className="space-y-12">
                        <SlideControl {...getProps(0)} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <header className="text-center space-y-4 mb-12">
                <div className="flex flex-col md:flex-row justify-between items-center relative">
                    <div className="flex-1"></div> {/* Spacer */}
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
                        Tema 3: Ejecución, Monitorización y Control
                    </h1>
                    {/* Auto-play Toggle */}
                    <div className="flex-1 flex justify-end mt-4 md:mt-0 w-full md:w-auto">
                        <button
                            onClick={() => setAutoPlayEnabled(!autoPlayEnabled)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all shadow-sm ${autoPlayEnabled
                                ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200'
                                : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                                }`}
                        >
                            <span className={`w-2 h-2 rounded-full ${autoPlayEnabled ? 'bg-white animate-pulse' : 'bg-slate-300'}`}></span>
                            <span className="text-xs font-bold uppercase tracking-wider">
                                {autoPlayEnabled ? 'Modo Lectura: ON' : 'Modo Lectura: OFF'}
                            </span>
                        </button>
                    </div>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                    Este tema aborda la fase de <strong>realización del trabajo</strong> y la <strong>vigilancia del desempeño</strong> del proyecto. Se analiza cómo transformar <strong>la planificación en entregables tangibles</strong> mediante la <em>coordinación de recursos, equipos y stakeholders</em>. Simultáneamente, se profundiza en los procesos de <strong>Monitorización y Control</strong> para medir la salud del proyecto utilizando técnicas avanzadas como el <strong>Método de la Ruta Crítica</strong> y la <strong>Gestión del Valor Ganado (EVM)</strong>, asegurando que las variaciones en la <strong>triple restricción (Alcance, Tiempo, Coste)</strong> se gestionen mediante un <strong>Control Integrado de Cambios</strong> formal.
                </p>
            </header>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-100 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-2 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                {slides.map((slide, index) => {
                    const isActive = activeTab === index;
                    return (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`
                                flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 border-2
                                ${isActive
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 transform scale-105 shadow-md'
                                    : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
                                }
                            `}
                        >
                            <div className={`p-2 rounded-full ${isActive ? 'bg-blue-100 dark:bg-blue-800' : 'bg-slate-100 dark:bg-slate-800'}`}>
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

export default Tema3_Infografic;
