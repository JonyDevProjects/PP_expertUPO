import React, { useState } from 'react';
import {
    Book,
    Anchor,
    List,
    Users,
    AlertCircle,
    LayoutTemplate,
    ClipboardList
} from 'lucide-react';
import SlideContainer from '../../shared/SlideContainer';

const SlidePlanAndBaseline = ({ autoPlay, onAudioComplete }: { autoPlay?: boolean; onAudioComplete?: () => void }) => {
    const [activeSection, setActiveSection] = useState('definicion');

    const sections: any = {
        definicion: {
            title: "1. El Plan de Proyecto",
            subtitle: "El Mapa de Gestión",
            icon: <Book className="w-6 h-6" />,
            color: "bg-indigo-600",
            ttsText: "Definición. Documento formal que define cómo se ejecuta, monitorea, controla y cierra el proyecto. Requiere Aprobación Formal. Elementos Core: Declaración de Alcance, WBS/EDT, Métricas. Recursos y Riesgos: Personal Clave, Plan de Gestión de Riesgos, Planes Auxiliares.",
            content: (
                <div className="space-y-4">
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border-l-4 border-indigo-600">
                        <h3 className="font-bold text-indigo-900 dark:text-indigo-300">Definición</h3>
                        <p className="text-indigo-800 dark:text-indigo-200 text-sm mt-1">
                            Documento formal que define cómo se ejecuta, monitorea, controla y cierra el proyecto.
                            <span className="font-bold block mt-2">¡Requiere Aprobación Formal!</span>
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow-sm border border-slate-200 dark:border-border">
                            <h4 className="font-bold text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-2"><List size={16} /> Elementos Core</h4>
                            <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc list-inside space-y-1">
                                <li>Declaración de Alcance (Objetivos/Entregables)</li>
                                <li>WBS/EDT (Responsabilidades, Calendario)</li>
                                <li>Métricas (Líneas Base)</li>
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow-sm border border-slate-200 dark:border-border">
                            <h4 className="font-bold text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-2"><Users size={16} /> Recursos & Riesgos</h4>
                            <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc list-inside space-y-1">
                                <li>Personal Clave (Esfuerzo/Coste)</li>
                                <li>Plan de Gestión de Riesgos</li>
                                <li>Planes Auxiliares (Comunicación, Seguridad)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        },
        indice: {
            title: "2. Estructura del Documento",
            subtitle: "Índice Recomendado",
            icon: <LayoutTemplate className="w-6 h-6" />,
            color: "bg-teal-600",
            ttsText: "Estructura del Documento. Índice Recomendado para garantizar la integridad del plan: Introducción, Objetivos, Organización, Metodología de Gestión, Programa de Trabajo, Evaluación de Riesgos, Planes Auxiliares, Temas Abiertos, Otros Aspectos. Reflexión PMP: ¿Cómo se alinean estos puntos con las Áreas de Conocimiento del PMBOK?",
            content: (
                <div className="space-y-4">
                    <p className="text-sm text-slate-500 italic">Estructura estándar para garantizar la integridad del plan:</p>
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-border overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="p-4 border-b md:border-b-0 md:border-r border-slate-100 dark:border-border">
                                <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                                    <li className="p-1 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded">INTRODUCCIÓN</li>
                                    <li className="p-1 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded">OBJETIVOS DEL PROYECTO</li>
                                    <li className="p-1 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded">ORGANIZACIÓN <span className="text-xs text-slate-400 font-normal block pl-5">(Org. Chart, Interesados, Funciones)</span></li>
                                    <li className="p-1 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded">METODOLOGÍA DE GESTIÓN</li>
                                    <li className="p-1 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded">PROGRAMA DE TRABAJO <span className="text-xs text-slate-400 font-normal block pl-5">(Alcance, Tareas, Recursos, Asignaciones)</span></li>
                                </ol>
                            </div>
                            <div className="p-4">
                                <ol start={6} className="list-decimal list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                                    <li className="p-1 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded">EVALUACIÓN DE RIESGOS</li>
                                    <li className="p-1 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded">PLANES AUXILIARES</li>
                                    <li className="p-1 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded">TEMAS ABIERTOS / DECISIONES</li>
                                    <li className="p-1 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded">OTROS ASPECTOS</li>
                                </ol>
                                <div className="mt-4 p-3 bg-teal-50 dark:bg-teal-900/20 text-teal-800 dark:text-teal-200 text-xs rounded border border-teal-200 dark:border-teal-800">
                                    <strong>Reflexión PMP:</strong> ¿Cómo se alinean estos puntos con las Áreas de Conocimiento del PMBOK? (Alcance, Tiempo, Coste, etc.)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        lineasbase: {
            title: "3. Líneas Base (Baselines)",
            subtitle: "El Ancla de Medición",
            icon: <Anchor className="w-6 h-6" />,
            color: "bg-rose-600",
            ttsText: "Líneas Base. Medición inicial de los indicadores que sirven como referencia para medir el avance: Alcance, Tiempo y Coste. Gestión de Cambios (La Triple Restricción): Cualquier modificación requiere control de cambios, ya que afecta inevitablemente a plazo y coste.",
            content: (
                <div className="space-y-6">
                    <div className="text-center">
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            "Medición inicial de los indicadores que sirven como referencia para medir el avance."
                        </p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            <span className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full font-bold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">Alcance</span>
                            <span className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full font-bold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">Tiempo</span>
                            <span className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full font-bold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">Coste</span>
                        </div>
                    </div>

                    <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-lg border-l-4 border-rose-500">
                        <h4 className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2">
                            <AlertCircle size={18} /> Gestión de Cambios (La Triple Restricción)
                        </h4>
                        <p className="text-sm text-rose-900 dark:text-rose-200 mt-2">
                            Si se modifica el Alcance (añadir "algo pequeño"):
                        </p>
                        <ul className="mt-2 space-y-1 text-sm text-rose-800 dark:text-rose-200 ml-4 list-disc">
                            <li>Debe haberse identificado esa posibilidad como <strong>Riesgo</strong>.</li>
                            <li>Inevitablemente modificará el <strong>Tiempo</strong> (más plazo).</li>
                            <li>Inevitablemente modificará el <strong>Coste</strong> (más recursos).</li>
                        </ul>
                    </div>
                </div>
            )
        },
        accion: {
            title: "4. Hoja de Ruta Práctica",
            subtitle: "Instrucciones para el Equipo",
            icon: <ClipboardList className="w-6 h-6" />,
            color: "bg-blue-600",
            ttsText: "Hoja de Ruta Práctica. Instrucciones para el Equipo. 1: Organización (roles y tarifas). 2: EDT/WBS (estructura basada en entregables). 3: Cronograma (hitos intermedios). 4: Documentación (usar plantilla obligatoria).",
            content: (
                <div className="space-y-4">
                    <div className="grid gap-3">
                        {[
                            { id: 1, title: "Organización", desc: "Formar grupos. Asignar roles. Definir tarifa horaria por persona para costes." },
                            { id: 2, title: "EDT / WBS", desc: "Realizar la estructura basada en entregables definidos y el índice propuesto." },
                            { id: 3, title: "Cronograma", desc: "Considerar fecha de entrega final, pero también hitos intermedios (Informes de seguimiento)." },
                            { id: 4, title: "Documentación", desc: "Usar plantilla obligatoria: “PP-T2-ANEXOS- I- Plantilla Plan de Proyecto”." }
                        ].map((item) => (
                            <div key={item.id} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-border rounded hover:shadow-md transition-shadow">
                                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded text-blue-700 dark:text-blue-300 font-bold">{item.id}</div>
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200">{item.title}</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    };

    const activeSectionData = sections[activeSection];

    // Generate TTS steps
    const ttsSteps = Object.entries(sections).map(([key, section]: [string, any]) => ({
        id: key,
        text: section.ttsText || `${section.title}. ${section.subtitle}` // Fallback if ttsText not manually added
    }));

    return (
        <div className="animate-fade-in p-6 font-sans flex flex-col items-center">
            <SlideContainer
                title="Plan Maestro del Proyecto"
                rate={1.2}
                ttsSteps={ttsSteps}
                autoPlay={autoPlay}
                onStepChange={(id) => {
                    if (!id) {
                        onAudioComplete?.();
                        return;
                    }
                    if (id && sections[id]) {
                        setActiveSection(id);
                    }
                }}
            >
                <div className="max-w-5xl w-full">
                    <div className="text-center mb-8">
                        <p className="text-muted-foreground mt-2">Guía de estructura, líneas base y ejecución práctica</p>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {Object.entries(sections).map(([key, section]: [string, any]) => (
                            <button
                                key={key}
                                onClick={() => setActiveSection(key)}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 border-b-4 shadow-sm ${activeSection === key
                                    ? `bg-white dark:bg-slate-800 ${section.color.replace('bg-', 'border-')} translate-y-1 shadow-inner`
                                    : 'bg-white dark:bg-slate-800 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 hover:-translate-y-1'
                                    }`}
                            >
                                <div className={`mb-2 p-2 rounded-full ${activeSection === key ? section.color + ' text-white' : 'bg-muted text-muted-foreground'}`}>
                                    {section.icon}
                                </div>
                                <span className={`font-bold text-sm ${activeSection === key ? 'text-card-foreground' : 'text-muted-foreground'}`}>
                                    {section.title}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Main Content Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden min-h-[400px] relative">
                        {/* Header Strip */}
                        <div className={`${activeSectionData.color} h-2 w-full`}></div>

                        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`p-3 rounded-lg ${activeSectionData.color} bg-opacity-10 text-slate-700`}>
                                    {/* Clone icon with distinct color class if needed, or just use text color */}
                                    {React.cloneElement(activeSectionData.icon, { className: `w-6 h-6 ${activeSectionData.color.replace('bg-', 'text-')}` })}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-card-foreground">{activeSectionData.title}</h2>
                                    <p className="text-muted-foreground font-medium">{activeSectionData.subtitle}</p>
                                </div>
                            </div>

                            <div className="mt-4">
                                {activeSectionData.content}
                            </div>
                        </div>
                    </div>

                    {/* Footer / Key Takeaways */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-muted p-4 rounded-lg text-center">
                            <h5 className="font-bold text-card-foreground text-sm mb-1">Propósito</h5>
                            <p className="text-xs text-muted-foreground">Reducir incertidumbre y proveer un mapa claro.</p>
                        </div>
                        <div className="bg-muted p-4 rounded-lg text-center">
                            <h5 className="font-bold text-card-foreground text-sm mb-1">Interesados</h5>
                            <p className="text-xs text-muted-foreground">Su identificación temprana es vital para el éxito.</p>
                        </div>
                        <div className="bg-muted p-4 rounded-lg text-center">
                            <h5 className="font-bold text-card-foreground text-sm mb-1">Planes Auxiliares</h5>
                            <p className="text-xs text-muted-foreground">Seguridad, Comunicación y Riesgos no son opcionales.</p>
                        </div>
                    </div>

                </div>
            </SlideContainer>
        </div>
    );
};

export default SlidePlanAndBaseline;
