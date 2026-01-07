import React from 'react';
import {
    Briefcase,
    Target,
    Layers,
    Users,
    CheckCircle
} from 'lucide-react';

interface TabFunctionsProps {
    highlightedFunction: string | null;
}

const TabFunctions: React.FC<TabFunctionsProps> = ({ highlightedFunction }) => {

    const getFunctionCardClass = (id: string, baseColor: string, hoverColor: string) => {
        const isHighlighted = highlightedFunction === id;
        const isOthersDimmed = highlightedFunction && highlightedFunction !== id;

        return `bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border transition-all duration-500 flex flex-col justify-center text-center items-center group
            ${isHighlighted ? `border-${baseColor}-500 shadow-lg scale-105 ring-2 ring-${baseColor}-500/20 z-10` : 'border-border'}
            ${isOthersDimmed ? 'opacity-40 grayscale-[0.5] scale-95' : 'hover:border-' + hoverColor + '-500 hover:shadow-md'}
        `;
    };

    return (
        <div className="animate-fade-in flex-1 flex flex-col justify-center min-h-0">
            <div className="bg-indigo-50 dark:bg-slate-900 p-3 rounded-xl border border-indigo-100 dark:border-slate-800 flex flex-col justify-between h-full w-full shadow-inner">
                <h3 className="mb-4 text-center font-bold text-base md:text-lg text-indigo-900 dark:text-indigo-300 flex items-center justify-center gap-2 shrink-0">
                    <Briefcase className="w-5 h-5" /> Funciones de Gestión
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1 min-h-0 overflow-y-auto p-2">
                    <div className={getFunctionCardClass('plan', 'blue', 'blue')}>
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3 group-hover:scale-110 transition-transform">
                            <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm md:text-lg">Planificar</h4>
                        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-snug">Definir los resultados buscados y diseñar la estrategia para conseguirlos.</p>
                    </div>

                    <div className={getFunctionCardClass('org', 'indigo', 'indigo')}>
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-3 group-hover:scale-110 transition-transform">
                            <Layers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm md:text-lg">Organizar</h4>
                        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-snug">Asignar eficientemente las tareas y recursos a las personas y equipos.</p>
                    </div>

                    <div className={getFunctionCardClass('lead', 'amber', 'amber')}>
                        <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-3 group-hover:scale-110 transition-transform">
                            <Users className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm md:text-lg">Dirigir</h4>
                        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-snug">Liderar, motivar e inspirar al equipo para alcanzar los objetivos.</p>
                    </div>

                    <div className={getFunctionCardClass('ctrl', 'emerald', 'emerald')}>
                        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-3 group-hover:scale-110 transition-transform">
                            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm md:text-lg">Controlar</h4>
                        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-snug">Medir el desempeño y corregir desviaciones para asegurar resultados.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabFunctions;
