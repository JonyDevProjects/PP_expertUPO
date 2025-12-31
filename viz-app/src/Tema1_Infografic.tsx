import React, { useState } from 'react';
import {
    Briefcase,
    Layers,
    Scale,
    Users,
    Search,
    FileText,
    TrendingUp
} from 'lucide-react';

// --- Imports from Components ---
import SlideDefinition from './components/slides/SlideDefinition';
import SlideLifecycle from './components/slides/SlideLifecycle';
import SlideTripleConstraint from './components/slides/SlideTripleConstraint';
import SlideSuccessAndRoles from './components/slides/SlideSuccessAndRoles';
import SlideOriginAndViability from './components/slides/SlideOriginAndViability';
import SlidePublicContracting from './components/slides/SlidePublicContracting';
import SlideManagementVsBusiness from './components/slides/SlideManagementVsBusiness';

// --- Interfaces ---
interface SlideItem {
    title: string;
    icon: React.ReactNode;
}

// --- Main Layout Component ---

const InfographicDeck = () => {
    const [activeTab, setActiveTab] = useState(0);

    const slides: SlideItem[] = [
        { title: "1. Concepto de Proyecto", icon: <Briefcase className="w-5 h-5" /> },
        { title: "2. Desarrollo de un Proyecto", icon: <Layers className="w-5 h-5" /> },
        { title: "3. Gestión de Proyectos", icon: <Scale className="w-5 h-5" /> },
        { title: "4. Roles & Skills del PM(fracaso y exito)", icon: <Users className="w-5 h-5" /> },
        { title: "5. Origen y Viabilidad", icon: <Search className="w-5 h-5" /> },
        { title: "6. Contratación Pública", icon: <FileText className="w-5 h-5" /> },
        { title: "7. Gestión vs. Negocio", icon: <TrendingUp className="w-5 h-5" /> },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 0: return <SlideDefinition />;
            case 1: return <SlideLifecycle />;
            case 2: return <SlideTripleConstraint />;
            case 3: return <SlideSuccessAndRoles />;
            case 4: return <SlideOriginAndViability />;
            case 5: return <SlidePublicContracting />;
            case 6: return <SlideManagementVsBusiness />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans text-text-main flex flex-col transition-colors duration-300">
            {/* Header */}
            <header className="bg-primary text-white p-6 shadow-lg z-20 relative">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Briefcase className="w-8 h-8 text-amber-400" />
                        Tema 1: Fundamentos de Gestión de Proyectos
                    </h1>
                    <p className="mt-2 text-indigo-100">Visualización Estratégica basada en PMBOK® & Mejores Prácticas</p>
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
                                        aria-controls={`panel-${index}`}
                                        id={`tab-${index}`}
                                        onClick={() => setActiveTab(index)}
                                        className={`flex items-center gap-3 px-5 py-4 text-sm font-semibold transition-all border-l-4 text-left ${isActive
                                            ? 'border-amber-500 text-primary bg-indigo-50 dark:bg-slate-800'
                                            : 'border-transparent text-text-muted hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        <span className={`shrink-0 ${isActive ? 'text-amber-600' : 'text-slate-400 dark:text-slate-500'}`}>
                                            {slide.icon}
                                        </span>
                                        {slide.title}
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
                    id={`panel-${activeTab}`}
                    aria-labelledby={`tab-${activeTab}`}
                >
                    {renderContent()}
                </main>
            </div>

            {/* Footer */}
            <footer className="max-w-7xl mx-auto p-6 text-center text-text-muted text-sm">
                <p>© PP_Expert - Material didáctico enriquecido basado en "Tema 1: Gestión de Proyectos"</p>
            </footer>
        </div>
    );
};

export default InfographicDeck;
