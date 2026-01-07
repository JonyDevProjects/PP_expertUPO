import React from 'react';
import {
    Briefcase,
    Layers,
    Target,
    Clock,
    BadgeDollarSign,
    CheckCircle,
    Users,
    MessageSquare,
    AlertTriangle,
    ShoppingCart,
    HeartHandshake
} from 'lucide-react';

const TabAreas: React.FC = () => {
    return (
        <div className="animate-fade-in flex-1 flex flex-col justify-center min-h-0">
            <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between h-full w-full shadow-inner">
                <h3 className="mb-4 text-center font-bold text-base md:text-lg text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2 shrink-0">
                    <Briefcase className="w-5 h-5" /> Áreas de Conocimiento
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 flex-1 min-h-0 overflow-y-auto p-2">
                    {[
                        { icon: <Layers className="w-5 h-5 md:w-6 md:h-6 text-indigo-600 dark:text-indigo-400" />, title: "Integración", desc: "Coordinar todos los elementos.", bg: "bg-indigo-100 dark:bg-indigo-900/30", bcolor: "hover:border-indigo-500" },
                        { icon: <Target className="w-5 h-5 md:w-6 md:h-6 text-red-600 dark:text-red-400" />, title: "Alcance", desc: "Definir y controlar qué se hace.", bg: "bg-red-100 dark:bg-red-900/30", bcolor: "hover:border-red-500" },
                        { icon: <Clock className="w-5 h-5 md:w-6 md:h-6 text-orange-600 dark:text-orange-400" />, title: "Tiempo", desc: "Gestionar el cronograma.", bg: "bg-orange-100 dark:bg-orange-900/30", bcolor: "hover:border-orange-500" },
                        { icon: <BadgeDollarSign className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" />, title: "Coste", desc: "Presupuestar y controlar gastos.", bg: "bg-green-100 dark:bg-green-900/30", bcolor: "hover:border-green-500" },
                        { icon: <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-teal-600 dark:text-teal-400" />, title: "Calidad", desc: "Satisfacer requisitos y estándares.", bg: "bg-teal-100 dark:bg-teal-900/30", bcolor: "hover:border-teal-500" },
                        { icon: <Users className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />, title: "Recursos", desc: "Gestionar equipo y materiales.", bg: "bg-blue-100 dark:bg-blue-900/30", bcolor: "hover:border-blue-500" },
                        { icon: <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-sky-600 dark:text-sky-400" />, title: "Comunicaciones", desc: "Información a tiempo y forma.", bg: "bg-sky-100 dark:bg-sky-900/30", bcolor: "hover:border-sky-500" },
                        { icon: <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-amber-600 dark:text-amber-400" />, title: "Riesgos", desc: "Identificar y responder a amenazas.", bg: "bg-amber-100 dark:bg-amber-900/30", bcolor: "hover:border-amber-500" },
                        { icon: <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" />, title: "Adquisiciones", desc: "Comprar bienes y servicios externos.", bg: "bg-purple-100 dark:bg-purple-900/30", bcolor: "hover:border-purple-500" },
                        { icon: <HeartHandshake className="w-5 h-5 md:w-6 md:h-6 text-rose-600 dark:text-rose-400" />, title: "Interesados", desc: "Gestionar expectativas y compromiso.", bg: "bg-rose-100 dark:bg-rose-900/30", bcolor: "hover:border-rose-500" },
                    ].map((area, idx) => (
                        <div key={idx} className={`bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-border ${area.bcolor} hover:shadow-md transition-all flex flex-col justify-center text-center items-center group`}>
                            <div className={`p-2.5 ${area.bg} rounded-full mb-2 group-hover:scale-110 transition-transform`}>
                                {area.icon}
                            </div>
                            <h4 className="font-bold text-slate-800 dark:text-white mb-1 text-xs md:text-sm">{area.title}</h4>
                            <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-300 leading-tight">{area.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TabAreas;
