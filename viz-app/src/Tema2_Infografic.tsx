import React, { useState } from 'react';
import {
    Briefcase,
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
}

const Tema2_Infografic = () => {
    const [activeTab, setActiveTab] = useState(0);

    const slides: SlideItem[] = [
        { title: "1. Pre-Planificación (Génesis)", icon: <Lightbulb className="w-5 h-5" /> },
        { title: "2. Planificación Detallada", icon: <Settings className="w-5 h-5" /> },
        { title: "3. El Plan Maestro & Líneas Base", icon: <Book className="w-5 h-5" /> },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 0: return <SlidePrePlanning />;
            case 1: return <SlidePlanning />;
            case 2: return <SlidePlanAndBaseline />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans text-text-main flex flex-col transition-colors duration-300">
            {/* Header */}
            <header className="bg-teal-600 text-white p-6 shadow-lg z-20 relative">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Briefcase className="w-8 h-8 text-teal-200" />
                        Tema 2: Planificación de Proyectos
                    </h1>
                    <p className="mt-2 text-teal-100">Del Acta de Constitución al Plan de Dirección de Proyecto</p>
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
                                            ? 'border-teal-500 text-teal-600 bg-teal-50 dark:bg-slate-800 dark:text-teal-400'
                                            : 'border-transparent text-text-muted hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        <span className={`shrink-0 ${isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 dark:text-slate-500'}`}>
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
                <p>© PP_Expert - Material didáctico enriquecido basado en "Tema 2: Planificación"</p>
            </footer>
        </div>
    );
};

export default Tema2_Infografic;
