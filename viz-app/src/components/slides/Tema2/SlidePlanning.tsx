import React, { useState } from 'react';
import {
    Layout,
    Users,
    ShieldAlert,
    GitMerge,
    Briefcase,
    BarChart2,
    AlertTriangle
} from 'lucide-react';

const SlidePlanning = () => {
    const [activeTab, setActiveTab] = useState('alcance');

    const tabs: any = {
        alcance: {
            title: "1. Alcance y EDT (WBS)",
            icon: <Layout className="w-6 h-6" />,
            color: "bg-blue-600",
            lightColor: "bg-blue-50",
            hoverBg: "group-hover:bg-blue-600",
            borderColor: "border-blue-600",
            textColor: "text-blue-700",
            content: {
                headline: "Define el 'Qué' antes del 'Cuándo'",
                points: [
                    { title: "Gestión del Alcance", text: "Recopilar requisitos y definir detalladamente qué incluye (y qué no) el proyecto." },
                    { title: "La EDT (WBS)", text: "Herramienta crítica 'Divide y Vencerás'. Descompone el proyecto en entregables manejables, no solo tareas." },
                    { title: "Tipos de Tareas", text: "Incluye tareas de desarrollo, gestión, administrativas y de soporte." }
                ]
            }
        },
        tiempocoste: {
            title: "2. Tiempo y Coste",
            icon: <BarChart2 className="w-6 h-6" />,
            color: "bg-green-600",
            lightColor: "bg-green-50",
            hoverBg: "group-hover:bg-green-600",
            borderColor: "border-green-600",
            textColor: "text-green-700",
            content: {
                headline: "Las restricciones duras",
                points: [
                    { title: "Secuencia Lógica", text: "Definir actividades, dependencias y duración para crear el Cronograma (Hitos y Plazos)." },
                    { title: "Presupuesto", text: "Estimar costes por paquete de trabajo para crear la Línea Base de Coste." },
                    { title: "Ley de la Calidad", text: "Una estimación de calidad es prerrequisito para un proyecto de calidad." }
                ]
            }
        },
        rrhh: {
            title: "3. RRHH y Equipo",
            icon: <Users className="w-6 h-6" />,
            color: "bg-purple-600",
            lightColor: "bg-purple-50",
            hoverBg: "group-hover:bg-purple-600",
            borderColor: "border-purple-600",
            textColor: "text-purple-700",
            content: {
                headline: "¿Quién hará el trabajo?",
                points: [
                    { title: "Definición", text: "Crear el Organigrama y matriz de Roles y Responsabilidades." },
                    { title: "Ciclo de Vida", text: "Determinar -> Adquirir (interno/externo) -> Mantener -> Liberar." },
                    { title: "Objetivo", text: "Conseguir a los mejores profesionales y optimizar su uso." }
                ]
            }
        },
        riesgos: {
            title: "4. Gestión de Riesgos",
            icon: <ShieldAlert className="w-6 h-6" />,
            color: "bg-red-600",
            lightColor: "bg-red-50",
            hoverBg: "group-hover:bg-red-600",
            borderColor: "border-red-600",
            textColor: "text-red-700",
            content: {
                headline: "Anticiparse a lo desconocido",
                points: [
                    { title: "Análisis", text: "Identificación cualitativa (probabilidad/impacto) y cuantitativa." },
                    { title: "4 Estrategias de Respuesta", text: "Evitar, Transferir, Mitigar o Aceptar." },
                    { title: "Planificación", text: "No solo identificar, sino presupuestar las respuestas." }
                ]
            }
        },
        soporte: {
            title: "5. Planes de Soporte",
            icon: <Briefcase className="w-6 h-6" />,
            color: "bg-orange-500",
            lightColor: "bg-orange-50",
            hoverBg: "group-hover:bg-orange-500",
            borderColor: "border-orange-500",
            textColor: "text-orange-700",
            content: {
                headline: "La logística necesaria",
                points: [
                    { title: "Calidad", text: "Definir estándares. Planificar pruebas y métricas." },
                    { title: "Comunicaciones", text: "¿Quién necesita qué información, cuándo y cómo?" },
                    { title: "Adquisiciones", text: "Planificar compras externas, contratos y logística." }
                ]
            }
        },
        integracion: {
            title: "6. Interesados e Integración",
            icon: <GitMerge className="w-6 h-6" />,
            color: "bg-teal-600",
            lightColor: "bg-teal-50",
            hoverBg: "group-hover:bg-teal-600",
            borderColor: "border-teal-600",
            textColor: "text-teal-700",
            content: {
                headline: "El Gobierno del Proyecto",
                points: [
                    { title: "Interesados", text: "Analizar Influencia vs Impacto. Estrategia: Atraer a los negativos, Fidelizar a los positivos." },
                    { title: "Integración", text: "Coordinar todos los planes anteriores en un único Plan para la Dirección del Proyecto." },
                    { title: "Ejecución y Control", text: "Definir cómo se supervisará y cerrará el trabajo." }
                ]
            }
        }
    };

    const activeTabData = tabs[activeTab];

    return (
        <div className="min-h-[calc(100vh-100px)] p-4 md:p-8 font-sans">

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold mb-2">Planificación Detallada del Proyecto</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Una vez aprobado el Charter, entramos en el "Cómo". Estas son las tareas críticas para construir un Plan de Proyecto sólido.
                    </p>
                </div>

                {/* Navigation Tabs */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {Object.entries(tabs).map(([key, tab]: [string, any]) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 border-b-4 shadow-sm ${activeTab === key
                                ? `bg-white dark:bg-slate-800 ${tab.borderColor} translate-y-1 shadow-inner`
                                : 'bg-white dark:bg-slate-800 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 hover:-translate-y-1'
                                }`}
                        >
                            <div className={`mb-2 p-2 rounded-full ${activeTab === key ? tab.lightColor + ' ' + tab.textColor : 'bg-muted text-muted-foreground'} dark:bg-opacity-20`}>
                                {tab.icon}
                            </div>
                            <span className={`font-bold text-sm ${activeTab === key ? 'text-card-foreground' : 'text-muted-foreground'}`}>
                                {tab.title}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Main Content Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden min-h-[400px] relative">
                    {/* Header Strip */}
                    <div className={`${activeTabData.color} h-2 w-full`}></div>

                    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                        <div className="flex items-center gap-3 mb-6">
                            <div className={`p-3 rounded-lg ${activeTabData.lightColor} ${activeTabData.textColor} dark:bg-opacity-10 dark:text-slate-200`}>
                                {React.cloneElement(activeTabData.icon, { className: `w-6 h-6` })}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-card-foreground">{activeTabData.title}</h2>
                                <p className="text-muted-foreground font-medium">{activeTabData.content.headline}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {activeTabData.content.points.map((point: any, idx: number) => (
                                <div key={idx} className="flex gap-4 group">
                                    <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${activeTabData.lightColor} ${activeTabData.textColor} dark:bg-slate-800 ${activeTabData.hoverBg} group-hover:text-white`}>
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-card-foreground">
                                            {point.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed mt-1">
                                            {point.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contextual Tip based on tab */}
                        <div className="mt-10 p-4 bg-muted border border-border rounded-lg flex gap-3 items-start">
                            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                            <div className="text-sm text-muted-foreground">
                                <strong>Nota del Experto (PMP):</strong>
                                {activeTab === 'alcance' && " Sin una EDT (WBS) sólida, es imposible estimar Tiempo y Coste correctamente. Empieza siempre aquí."}
                                {activeTab === 'tiempocoste' && " Recuerda que el Cronograma y el Presupuesto son Líneas Base. Solo se cambian mediante Control de Cambios."}
                                {activeTab === 'rrhh' && " Planifica la 'Liberación' de recursos. Mantener gente sin tareas asignadas quema presupuesto innecesariamente."}
                                {activeTab === 'riesgos' && " Identificar riesgos no es ser pesimista, es ser profesional. Un riesgo no gestionado es un problema futuro asegurado."}
                                {activeTab === 'soporte' && " No olvides la Calidad. Es más barato prevenir errores (Planificar) que corregirlos (Inspeccionar)."}
                                {activeTab === 'integracion' && " La Integración es tu responsabilidad exclusiva como PM. No se puede delegar."}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlidePlanning;
