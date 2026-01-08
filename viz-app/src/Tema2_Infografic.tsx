import { useState } from 'react';
import {
    Lightbulb,
    Settings,
    Book
} from 'lucide-react';

import SlidePrePlanning from './components/slides/Tema2/SlidePrePlanning';
import SlidePlanning from './components/slides/Tema2/SlidePlanning';
import SlidePlanAndBaseline from './components/slides/Tema2/SlidePlanAndBaseline';

interface SlideItem {
    title: string;
    icon: React.ReactNode;
    subtitle: string;
}

const Tema2_Infografic = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);

    const slides: SlideItem[] = [
        {
            title: "1-2. Propósito y Procesos Previos",
            icon: <Lightbulb className="w-5 h-5" />,
            subtitle: "Génesis, Business Case y Charter"
        },
        {
            title: "3. Planificación (Decálogo)",
            icon: <Settings className="w-5 h-5" />,
            subtitle: "Alcance, Cronograma, Costes y Riesgos"
        },
        {
            title: "4-5. Plan de Proyecto y Líneas Base",
            icon: <Book className="w-5 h-5" />,
            subtitle: "Estructura del Documento y Referencias"
        },
    ];

    const handleAudioComplete = () => {
        if (activeTab < slides.length - 1) {
            setActiveTab(prev => prev + 1);
        } else {
            setAutoPlayEnabled(false);
        }
    };

    const renderContent = () => {
        const props = {
            autoPlay: autoPlayEnabled,
            onAudioComplete: handleAudioComplete
        };

        switch (activeTab) {
            case 0:
                return (
                    <div className="space-y-12">
                        <SlidePrePlanning {...props} />
                    </div>
                );
            case 1:
                return (
                    <div className="space-y-12">
                        <SlidePlanning {...props} />
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-12">
                        <SlidePlanAndBaseline {...props} />
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
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent flex justify-center items-center gap-4">
                        Tema 2: Planificación de Proyectos
                    </h1>
                    {/* Auto-play Toggle */}
                    <div className="flex-1 flex justify-end mt-4 md:mt-0 w-full md:w-auto">
                        <button
                            onClick={() => setAutoPlayEnabled(!autoPlayEnabled)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all shadow-sm ${autoPlayEnabled
                                ? 'bg-teal-600 text-white border-teal-600 ring-2 ring-teal-200'
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
                    Este tema abarca el ciclo integral de la planificación, comenzando desde la <strong>Génesis y el Acta de Constitución (Charter)</strong> que autorizan el proyecto, hasta la elaboración del <strong>Plan de Proyecto</strong> detallado. Se profundiza en la creación de planes subsidiarios críticos, con énfasis en la <strong>Estructura de Desglose del Trabajo (EDT/WBS)</strong> para el alcance, y la definición de <strong>Líneas Base (Alcance, Tiempo y Coste)</strong> como referencias inmutables para medir el desempeño y gestionar cambios durante la ejecución.
                </p>
            </header>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-100 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-2 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                {slides.map((slide, index) => {
                    const isActive = activeTab === index;
                    return (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`
                                flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 border-2
                                ${isActive
                                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 transform scale-105 shadow-md'
                                    : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
                                }
                            `}
                        >
                            <div className={`p-2 rounded-full ${isActive ? 'bg-teal-100 dark:bg-teal-800' : 'bg-slate-100 dark:bg-slate-800'}`}>
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

export default Tema2_Infografic;
