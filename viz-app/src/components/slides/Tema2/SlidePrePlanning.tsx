import { useState } from 'react';
import {
    Lightbulb,
    Settings,
    FileText,
    Target,
    Users,
    Rocket,
    CheckCircle,
    HelpCircle
} from 'lucide-react';

const SlidePrePlanning = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            id: 1,
            title: "1. Génesis y Valoración",
            subtitle: "¿De dónde surge la necesidad?",
            icon: <Lightbulb className="w-12 h-12 text-yellow-500" />,
            color: "border-yellow-500",
            bg: "bg-yellow-50",
            content: [
                { label: "Detonantes", text: "Obsolescencia técnica, competencia, ideas de empleados u oportunidades de ahorro." },
                { label: "Acción Clave", text: "Valorar si la idea se alinea con la estrategia y si es financieramente viable." }
            ]
        },
        {
            id: 2,
            title: "2. Solución Conceptual",
            subtitle: "¿Cómo lo vamos a resolver?",
            icon: <Settings className="w-12 h-12 text-blue-500" />,
            color: "border-blue-500",
            bg: "bg-blue-50",
            content: [
                { label: "Análisis de Alternativas", text: "¿Comprar software (COTS)? ¿Desarrollo a medida? ¿Adaptar sistema actual? ¿Externalizar?" },
                { label: "Criterios", text: "Decidir basándose en Tiempo, Coste, Riesgo y Conocimiento del equipo." }
            ]
        },
        {
            id: 3,
            title: "3. Estudio de Negocio",
            subtitle: "Justificando la inversión (Business Case)",
            icon: <FileText className="w-12 h-12 text-indigo-500" />,
            color: "border-indigo-500",
            bg: "bg-indigo-50",
            content: [
                { label: "Propósito", text: "Convencer a la Alta Dirección para aprobar el presupuesto." },
                { label: "Componentes", text: "Visión estratégica, análisis financiero (ROI/VAN), análisis competitivo y riesgos iniciales." }
            ]
        },
        {
            id: 4,
            title: "4. Alcance Preliminar",
            subtitle: "Dibujando la cancha",
            icon: <Target className="w-12 h-12 text-red-500" />,
            color: "border-red-500",
            bg: "bg-red-50",
            content: [
                { label: "Límites", text: "Definir claramente qué está DENTRO y qué está FUERA del proyecto." },
                { label: "Datos Clave", text: "Criterios de aceptación, EDT inicial (WBS), Hitos principales y Costes ROM (Orden de Magnitud)." }
            ]
        },
        {
            id: 5,
            title: "5. Interesados (Stakeholders)",
            subtitle: "¿A quién afecta?",
            icon: <Users className="w-12 h-12 text-green-500" />,
            color: "border-green-500",
            bg: "bg-green-50",
            content: [
                { label: "Mapeo", text: "Identificar a todos los actores relevantes desde el inicio." },
                { label: "Preguntas", text: "¿Quién recibe el beneficio? ¿Quién provee los datos? ¿Quién lo supervisa? ¿Quién sufre las repercusiones?" }
            ]
        },
        {
            id: 6,
            title: "6. Lanzamiento (Project Charter)",
            subtitle: "Luz verde oficial",
            icon: <Rocket className="w-12 h-12 text-purple-600" />,
            color: "border-purple-600",
            bg: "bg-purple-50",
            content: [
                { label: "Oficialización", text: "Firma del Acta de Constitución (Project Charter)." },
                { label: "Equipo", text: "Nombrar al Project Manager (PM) y formar el equipo núcleo." },
                { label: "Kick-off", text: "Reunión de lanzamiento para alinear expectativas." }
            ]
        }
    ];

    return (
        <div className="min-h-[calc(100vh-100px)] p-4 md:p-8 font-sans">

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold mb-2">Ruta de Pre-Planificación</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Antes de crear el cronograma, debemos definir el "Qué" y el "Por qué".
                        Este es el flujo crítico desde la idea hasta la autorización formal.
                    </p>
                </div>

                {/* Navigation Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {steps.map((step, index) => (
                        <button
                            key={step.id}
                            onClick={() => setCurrentStep(index)}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 border-b-4 shadow-sm ${currentStep === index
                                ? `bg-white dark:bg-slate-800 ${step.color} translate-y-1 shadow-inner`
                                : 'bg-white dark:bg-slate-800 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 hover:-translate-y-1'
                                }`}
                        >
                            <div className={`mb-2 p-2 rounded-full ${currentStep === index ? step.bg : 'bg-muted'} dark:bg-opacity-20`}>
                                {step.icon}
                            </div>
                            <span className={`font-bold text-sm ${currentStep === index ? 'text-card-foreground' : 'text-muted-foreground'}`}>
                                {step.title}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Main Content Card */}
                <div className={`relative w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border-t-8 ${steps[currentStep].color} transition-all duration-300`}>

                    <div className="p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Header of Card */}
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                            <div className={`p-4 rounded-full ${steps[currentStep].bg} shadow-inner`}>
                                {steps[currentStep].icon}
                            </div>
                            <div className="text-center md:text-left flex-1">
                                <h2 className="text-2xl md:text-3xl font-bold text-card-foreground">{steps[currentStep].title}</h2>
                                <p className="text-lg text-muted-foreground font-medium">{steps[currentStep].subtitle}</p>
                            </div>
                            <div className="text-4xl font-black text-slate-100 dark:text-slate-800 hidden md:block">
                                0{steps[currentStep].id}
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {steps[currentStep].content.map((item, index) => (
                                <div key={index} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-border hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-card-foreground mb-2 flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-indigo-500" />
                                        {item.label}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Helper Tip */}
                        <div className="mt-8 flex items-center gap-2 text-muted-foreground text-sm bg-muted px-4 py-2 rounded-full shadow-sm border border-border mx-auto w-fit">
                            <HelpCircle className="w-4 h-4" />
                            <span>Tip de PMP: Este proceso culmina con el <strong>Project Charter</strong>. Sin él, no debes iniciar la planificación detallada.</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SlidePrePlanning;
