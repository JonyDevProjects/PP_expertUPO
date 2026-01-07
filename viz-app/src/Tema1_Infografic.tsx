import React, { useState } from 'react';
import {
    Briefcase,
    Layers,
    Scale,
    Users,
    Search,
    FileText,
    TrendingUp,
    Award
} from 'lucide-react';

// --- Imports from Components ---
import SlideDefinition from './components/slides/Tema1/SlideDefinition';
import SlideLifecycle from './components/slides/Tema1/SlideLifecycle';
import SlideTripleConstraint from './components/slides/Tema1/SlideTripleConstraint';
import SlideSuccessAndRoles from './components/slides/Tema1/SlideSuccessAndRoles';
import SlideOriginAndViability from './components/slides/Tema1/SlideOriginAndViability';
import SlidePublicContracting from './components/slides/Tema1/SlidePublicContracting';
import SlideManagementVsBusiness from './components/slides/Tema1/SlideManagementVsBusiness';

// --- Interfaces ---
interface SlideItem {
    title: string;
    icon: React.ReactNode;
    subtitle: string;
}

// --- Main Layout Component ---

const InfographicDeck = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);

    const slides: SlideItem[] = [
        {
            title: "1. Concepto",
            icon: <Briefcase className="w-5 h-5" />,
            subtitle: "Definición de Proyecto"
        },
        {
            title: "2. Desarrollo",
            icon: <Layers className="w-5 h-5" />,
            subtitle: "Ciclo de Vida del Producto"
        },
        {
            title: "3. La Gestión",
            icon: <Scale className="w-5 h-5" />,
            subtitle: "Funciones y Triple Restricción"
        },
        {
            title: "4. Éxito/Fracaso",
            icon: <TrendingUp className="w-5 h-5" />,
            subtitle: "Factores Clave"
        },
        {
            title: "5. El Director",
            icon: <Users className="w-5 h-5" />,
            subtitle: "Habilidades, Roles y Responsabilidades"
        },
        {
            title: "6. Origen",
            icon: <Search className="w-5 h-5" />,
            subtitle: "¿Cómo surgen? Viabilidad"
        },
        {
            title: "7. Contratación",
            icon: <FileText className="w-5 h-5" />,
            subtitle: "Sector Público"
        },
        {
            title: "8. Gestión vs Negocio",
            icon: <Award className="w-5 h-5" />,
            subtitle: "Diferencias Clave"
        }
    ];

    const renderContent = () => {
        // Pass autoPlay prop to all slides
        const props = { autoPlay: autoPlayEnabled };

        switch (activeTab) {
            case 0: return <SlideDefinition {...props} />;
            case 1: return <SlideLifecycle {...props} />;
            case 2: return <SlideTripleConstraint {...props} />;
            case 3: return <SlideSuccessAndRoles {...props} />; // Éxito y Fracaso
            case 4: return <SlideSuccessAndRoles {...props} />; // Director
            case 5: return <SlideOriginAndViability {...props} />;
            case 6: return <SlidePublicContracting {...props} />;
            case 7: return <SlideManagementVsBusiness {...props} />;
            default: return null;
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <header className="text-center space-y-4 mb-12">
                <div className="flex flex-col md:flex-row justify-between items-center relative">
                    <div className="flex-1"></div> {/* Spacer */}
                    <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
                        Tema 1: Introducción
                    </h1>
                    {/* Auto-play Toggle */}
                    <div className="flex-1 flex justify-end mt-4 md:mt-0 w-full md:w-auto">
                        <button
                            onClick={() => setAutoPlayEnabled(!autoPlayEnabled)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all shadow-sm ${autoPlayEnabled
                                ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-200'
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
                    Este tema establece los cimientos conceptuales de la Dirección de Proyectos, delimitando la naturaleza única y temporal de los <strong>proyectos frente a las operaciones continuas y la producción en masa.</strong> Se profundiza en la dicotomía entre el <strong>Ciclo de Vida del Producto (desarrollo técnico)</strong> y el <strong>Ciclo de Vida del Proyecto (gestión)</strong>, definiendo el <strong>rol crítico del Director de Proyecto</strong> y las competencias necesarias <strong>para equilibrar la Triple Restricción (Alcance, Tiempo y Coste)</strong>. Finalmente, se contextualiza el nacimiento de los proyectos desde la estrategia organizacional <strong>(Business Case)</strong> y se examinan los marcos normativos esenciales de la <strong>Contratación Pública (Suministros vs. Servicios)</strong> que rigen la ejecución en entornos administrativos.
                </p>
            </header>

            {/* Navigation Tabs (Top Grid) */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 relative z-100 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                {slides.map((slide, index) => {
                    const isActive = activeTab === index;
                    return (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`
                                flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 border-2
                                ${isActive
                                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 transform scale-105 shadow-md'
                                    : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
                                }
                            `}
                        >
                            <div className={`p-2 rounded-full ${isActive ? 'bg-indigo-100 dark:bg-indigo-800' : 'bg-slate-100 dark:bg-slate-800'}`}>
                                {slide.icon}
                            </div>
                            <div className="text-center">
                                <span className={`block font-bold text-sm ${isActive ? 'text-slate-800 dark:text-white' : ''}`}>
                                    {slide.title}
                                </span>
                                <span className="text-xs opacity-75 hidden md:block leading-tight mt-1">
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

export default InfographicDeck;
