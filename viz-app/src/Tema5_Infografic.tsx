import { useState } from 'react';
import {
    Layout,
    DollarSign,
    BarChart2,
    Calculator
} from 'lucide-react';

import SlideTripleConstraint from './components/slides/Tema5/SlideTripleConstraint';
import SlideBaseline from './components/slides/Tema5/SlideBaseline';
import SlideResourceLeveling from './components/slides/Tema5/SlideResourceLeveling';
import SlideEVM from './components/slides/Tema5/SlideEVM';

interface SlideItem {
    title: string;
    icon: React.ReactNode;
    subtitle: string;
}

const Tema5_Infografic = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);

    const handleAudioComplete = () => {
        if (activeTab < slides.length - 1) {
            setActiveTab(prev => prev + 1);
        } else {
            setAutoPlayEnabled(false);
        }
    };

    const slides: SlideItem[] = [
        {
            title: "1. Triple Restricción",
            icon: <Layout className="w-5 h-5" />,
            subtitle: "Alcance, Tiempo, Coste"
        },
        {
            title: "2. Presupuesto",
            icon: <DollarSign className="w-5 h-5" />,
            subtitle: "Líneas Base y Reservas"
        },
        {
            title: "3. Recursos y Nivelación",
            icon: <BarChart2 className="w-5 h-5" />,
            subtitle: "Optimización Crítica"
        },
        {
            title: "4. Control y EVM",
            icon: <Calculator className="w-5 h-5" />,
            subtitle: "Valor Ganado"
        }
    ];

    const renderContent = () => {
        const props = {
            autoPlay: autoPlayEnabled,
            onAudioComplete: handleAudioComplete,
        };

        switch (activeTab) {
            case 0:
                return <SlideTripleConstraint {...props} />;
            case 1:
                return <SlideBaseline {...props} />;
            case 2:
                return <SlideResourceLeveling {...props} />;
            case 3:
                return <SlideEVM {...props} />;
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
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
                        Tema 5: Costes, Recursos y Monitorización
                    </h1>
                    {/* Auto-play Toggle */}
                    <div className="flex-1 flex justify-end mt-4 md:mt-0 w-full md:w-auto">
                        <button
                            onClick={() => setAutoPlayEnabled(!autoPlayEnabled)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all shadow-sm ${autoPlayEnabled
                                ? 'bg-purple-600 text-white border-purple-600 ring-2 ring-purple-200'
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
                    Este tema integra la gestión de <strong>Recursos y Costes</strong> para establecer la <strong>Línea Base del Proyecto</strong>.
                    Exploramos cómo equilibrar la <strong>Triple Restricción</strong>, definir presupuestos con reservas adecuadas, optimizar la carga de trabajo mediante <strong>Nivelación</strong> y controlar la salud financiera del proyecto mediante <strong>EVM (Earned Value Management)</strong>.
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
                                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 transform scale-105 shadow-md'
                                    : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
                                }
                            `}
                        >
                            <div className={`p-2 rounded-full ${isActive ? 'bg-purple-100 dark:bg-purple-800' : 'bg-slate-100 dark:bg-slate-800'}`}>
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

export default Tema5_Infografic;
