import React, { useState } from 'react';
import {
    Briefcase,
    Target,
    Layers,
    CheckCircle,
    Users,
    MousePointerClick,
    Clock,
    BadgeDollarSign,
    MessageSquare,
    AlertTriangle,
    ShoppingCart,
    HeartHandshake
} from 'lucide-react';

import { Card } from '../../ui/Card';
import { H2, Paragraph } from '../../ui/Typography';
import TextToSpeechButton from '../../shared/TextToSpeechButton';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

import { tripleConstraintMessages, flowData } from '../../../data/slideData';

const SlideTripleConstraint = () => {
    // --- State for Navigation ---
    const [activeTab, setActiveTab] = useState('restrictions');

    // --- State for Triple Constraint ---
    const [active, setActive] = useState<string | null>(null);

    // --- State for Flow Diagram ---
    const [activePhase, setActivePhase] = useState<string | null>(null);

    // --- State for Matrix ---
    const [activeMatrixCell, setActiveMatrixCell] = useState<{ title: string; desc: string; color: string } | null>(null);

    const currentMsg = active ? tripleConstraintMessages[active as keyof typeof tripleConstraintMessages] : null;

    const sections = [
        { id: 'functions', label: 'Gestión', icon: <Briefcase className="w-3 h-3 md:w-4 md:h-4" /> },
        { id: 'restrictions', label: 'Triple R.', icon: <Target className="w-3 h-3 md:w-4 md:h-4" /> },
        { id: 'workflow', label: 'Workflow', icon: <Layers className="w-3 h-3 md:w-4 md:h-4" /> },
        { id: 'curves', label: 'Curvas', icon: <Clock className="w-3 h-3 md:w-4 md:h-4" /> },
        { id: 'areas', label: 'Áreas', icon: <Briefcase className="w-3 h-3 md:w-4 md:h-4" /> },
        { id: 'matrix', label: 'Matriz', icon: <CheckCircle className="w-3 h-3 md:w-4 md:h-4" /> }
    ];

    return (
        <div className="flex flex-col h-full w-full p-2 md:p-4 font-sans overflow-hidden">

            {/* Header */}
            <div className="text-center mb-2 shrink-0">
                <div className="flex justify-center items-center gap-3">
                    <H2 className="text-xl md:text-2xl mb-2">Gestión de Proyectos</H2>
                    <TextToSpeechButton text="La gestión de proyectos equilibra la Triple Restricción: Alcance, Tiempo y Coste. Si cambias uno, afectas a la calidad. Las funciones clave son Planificar, Organizar, Dirigir y Controlar. El flujo de gestión es cíclico: Iniciación, Planificación, Ejecución, Control y Cierre." />
                </div>
                <Paragraph className="text-center text-xs md:text-sm max-w-3xl mx-auto mt-0 mb-2">
                    Organizar trabajo para objetivo <span className="font-bold text-amber-600">único</span> y <span className="font-bold text-amber-600">temporal</span>.
                </Paragraph>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-1.5 mb-2 shrink-0">
                {sections.map(section => (
                    <button
                        key={section.id}
                        onClick={() => setActiveTab(section.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold transition-all ${activeTab === section.id
                            ? 'bg-primary text-primary-foreground shadow-md transform scale-105'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                            }`}
                    >
                        {section.icon}
                        {section.label}
                    </button>
                ))}
            </div>

            {/* Content Display */}
            <div className="flex-1 min-h-0 flex flex-col relative w-full h-full mx-auto overflow-y-auto custom-scrollbar">
                {activeTab === 'functions' && (
                    <div className="animate-fade-in flex-1 flex flex-col justify-center min-h-0">
                        <div className="bg-indigo-50 dark:bg-slate-900 p-3 rounded-xl border border-indigo-100 dark:border-slate-800 flex flex-col justify-between h-full w-full shadow-inner">
                            <h3 className="mb-4 text-center font-bold text-base md:text-lg text-indigo-900 dark:text-indigo-300 flex items-center justify-center gap-2 shrink-0">
                                <Briefcase className="w-5 h-5" /> Funciones de Gestión
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1 min-h-0 overflow-y-auto p-2">
                                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-border hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-center text-center items-center group">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                        <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm md:text-lg">Planificar</h4>
                                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-snug">Definir los resultados buscados y diseñar la estrategia para conseguirlos.</p>
                                </div>

                                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-border hover:border-indigo-500 hover:shadow-md transition-all flex flex-col justify-center text-center items-center group">
                                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                        <Layers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm md:text-lg">Organizar</h4>
                                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-snug">Asignar eficientemente las tareas y recursos a las personas y equipos.</p>
                                </div>

                                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-border hover:border-amber-500 hover:shadow-md transition-all flex flex-col justify-center text-center items-center group">
                                    <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                        <Users className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm md:text-lg">Dirigir</h4>
                                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-snug">Liderar, motivar e inspirar al equipo para alcanzar los objetivos.</p>
                                </div>

                                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-border hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-center text-center items-center group">
                                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                        <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm md:text-lg">Controlar</h4>
                                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-snug">Medir el desempeño y corregir desviaciones para asegurar resultados.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'restrictions' && (
                    <div className="animate-fade-in flex-1 flex flex-col min-h-0">
                        <div className="w-full h-full bg-slate-100 dark:bg-slate-950 rounded-xl p-2 md:p-6 relative overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl transition-colors duration-300 flex flex-col lg:flex-row gap-6 items-center">

                            {/* Background Effects */}
                            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_10%_0,_rgba(56,189,248,0.15),transparent_55%),radial-gradient(circle_at_90%_100%,_rgba(236,72,153,0.15),transparent_60%)] mix-blend-multiply dark:mix-blend-normal" />

                            {/* Left: Interactive Triangle Stage */}
                            <div className="relative z-10 flex-1 flex items-center justify-center w-full min-h-0">
                                <div className="relative aspect-square max-h-[250px] w-full max-w-[250px]">
                                    <svg className="absolute inset-0 w-full h-full drop-shadow-xl dark:drop-shadow-[0_12px_28px_rgba(15,23,42,0.9)] transition-all duration-300" viewBox="0 0 100 90" preserveAspectRatio="xMidYMid meet">
                                        <polygon points="50,5 5,85 95,85" className="fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-600 transition-colors duration-300" strokeWidth="1.5" />
                                    </svg>

                                    {/* Center Label */}
                                    <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-500/50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-600 dark:text-slate-400 text-[9px] uppercase tracking-[0.2em] z-10 text-center shadow-sm dark:shadow-lg transition-colors duration-300">
                                        Calidad <span className="text-slate-400 dark:text-slate-200 block text-[8px] tracking-normal opacity-80 mt-0.5">percibida</span>
                                    </div>

                                    {/* Scope Button (Top) */}
                                    <button
                                        onClick={() => setActive(active === 'scope' ? null : 'scope')}
                                        className={`absolute top-[5%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full border bg-white/95 dark:bg-slate-900/95 transition-all duration-300 hover:scale-105 active:scale-95 ${active === 'scope' ? 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)] scale-105 ring-1 ring-green-500/50' : 'border-slate-200 dark:border-transparent text-green-600 hover:bg-slate-50 dark:hover:bg-slate-900 shadow-sm dark:shadow-none'}`}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_currentColor]`}></div>
                                        <span className={`${active === 'scope' ? 'text-green-600 dark:text-green-400 font-bold' : 'text-green-700 dark:text-green-600 font-medium'} text-[10px] uppercase tracking-wider`}>Alcance</span>
                                    </button>

                                    {/* Time Button (Bottom Left) */}
                                    <button
                                        onClick={() => setActive(active === 'time' ? null : 'time')}
                                        className={`absolute top-[90%] left-[5%] -translate-y-1/2 -translate-x-[10px] flex items-center gap-1.5 px-2.5 py-1 rounded-full border bg-white/95 dark:bg-slate-900/95 transition-all duration-300 hover:scale-105 active:scale-95 ${active === 'time' ? 'border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)] scale-105 ring-1 ring-orange-500/50' : 'border-slate-200 dark:border-transparent text-orange-600 hover:bg-slate-50 dark:hover:bg-slate-900 shadow-sm dark:shadow-none'}`}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_currentColor]`}></div>
                                        <span className={`${active === 'time' ? 'text-orange-600 dark:text-orange-400 font-bold' : 'text-orange-700 dark:text-orange-600 font-medium'} text-[10px] uppercase tracking-wider`}>Tiempo</span>
                                    </button>

                                    {/* Cost Button (Bottom Right) */}
                                    <button
                                        onClick={() => setActive(active === 'cost' ? null : 'cost')}
                                        className={`absolute top-[90%] right-[5%] -translate-y-1/2 translate-x-[10px] flex flex-row-reverse items-center gap-1.5 px-2.5 py-1 rounded-full border bg-white/95 dark:bg-slate-900/95 transition-all duration-300 hover:scale-105 active:scale-95 ${active === 'cost' ? 'border-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.4)] scale-105 ring-1 ring-rose-600/50' : 'border-slate-200 dark:border-transparent text-rose-600 hover:bg-slate-50 dark:hover:bg-slate-900 shadow-sm dark:shadow-none'}`}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full bg-rose-600 shadow-[0_0_8px_currentColor]`}></div>
                                        <span className={`${active === 'cost' ? 'text-rose-600 dark:text-rose-500 font-bold' : 'text-rose-700 dark:text-rose-700 font-medium'} text-[10px] uppercase tracking-wider`}>Coste</span>
                                    </button>
                                </div>
                            </div>

                            {/* Right: Info Panel - Takes full height and remaining width */}
                            <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center p-2">
                                <div className={`w-full max-w-lg p-6 rounded-2xl border backdrop-blur-md transition-all duration-500 shadow-lg ${active ? `bg-white/80 dark:bg-slate-900/80 ${currentMsg?.border} ${currentMsg?.glow}` : 'bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800'}`}>
                                    {active && currentMsg ? (
                                        <div className="animate-fade-in text-center">
                                            <span className={`text-xs font-bold uppercase tracking-[0.25em] ${currentMsg.accent} mb-3 block`}>{currentMsg.type}</span>
                                            <h4 className="text-slate-900 dark:text-white font-bold text-xl md:text-2xl mb-4 leading-tight transition-colors">{currentMsg.title}</h4>
                                            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed transition-colors">{currentMsg.body}</p>
                                        </div>
                                    ) : (
                                        <div className="text-slate-500 text-center py-8">
                                            <div className="w-16 h-16 rounded-full bg-slate-200/50 dark:bg-slate-800/50 mx-auto mb-4 flex items-center justify-center animate-pulse transition-colors">
                                                <MousePointerClick className="w-8 h-8 text-slate-400 dark:text-slate-600" />
                                            </div>
                                            <p className="text-sm md:text-base font-medium">Toca cada vértice para ver cómo afecta al equilibrio del proyecto.</p>
                                            <p className="text-xs mt-2 opacity-60">"Trade-off": No puedes tenerlo todo.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'workflow' && (
                    <div className="animate-fade-in flex-1 flex flex-col min-h-0">
                        <Card className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-slate-900 border-none shadow-none" noPadding>
                            <div className="p-2 shrink-0">
                                <h3 className="text-center font-bold text-base mb-0">Workflow de Información</h3>
                                <p className="text-center text-[10px] text-text-muted">Interacción dinámica entre los 5 Grupos de Procesos.</p>
                            </div>

                            {/* Responsive Container Preserving Aspect Ratio */}
                            <div className="flex-1 w-full relative flex items-center justify-center p-2 min-h-0 overflow-hidden">
                                <div className="relative w-full max-h-full aspect-[1.8] max-w-6xl shadow-xl bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">

                                    {/* Grid Background */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]"></div>

                                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 900 500" preserveAspectRatio="xMidYMid meet">
                                        {/* Paths - Using exact centers: Init(100,250), Plan(350,125), Exec(600,250), Ctrl(350,375), Close(800,250) */}
                                        <path id="path-init-plan" d="M 100 250 Q 225 250 350 125" className={`transition-all duration-300 fill-none ${activePhase === 'init' ? 'stroke-yellow-500 dark:stroke-yellow-400 stroke-[4px]' : 'stroke-slate-300 dark:stroke-slate-700 stroke-[3px]'}`} />
                                        <path id="path-plan-exec" d="M 350 125 L 600 250" className={`transition-all duration-300 fill-none ${activePhase === 'plan' ? 'stroke-blue-500 dark:stroke-blue-400 stroke-[4px]' : 'stroke-slate-300 dark:stroke-slate-700 stroke-[3px]'}`} />
                                        <path id="path-exec-ctrl" d="M 600 250 L 350 375" className={`transition-all duration-300 fill-none ${activePhase === 'exec' ? 'stroke-red-500 dark:stroke-red-400 stroke-[4px]' : 'stroke-slate-300 dark:stroke-slate-700 stroke-[3px]'}`} />
                                        <path id="path-ctrl-plan" d="M 350 375 Q 250 250 350 125" strokeDasharray="5,5" className={`transition-all duration-300 fill-none ${activePhase === 'ctrl' ? 'stroke-purple-500 dark:stroke-purple-400 stroke-[4px]' : 'stroke-slate-300 dark:stroke-slate-700 stroke-[3px]'}`} />
                                        <path id="path-ctrl-close" d="M 350 375 Q 600 450 800 250" className={`transition-all duration-300 fill-none ${activePhase === 'ctrl' ? 'stroke-purple-500 dark:stroke-purple-400 stroke-[4px]' : 'stroke-slate-300 dark:stroke-slate-700 stroke-[3px]'}`} />
                                    </svg>

                                    {/* Nodes */}
                                    {/* Init: Center X ~11.1% (100px), Y 50% */}
                                    <div
                                        onMouseEnter={() => setActivePhase('init')}
                                        className={`absolute left-[11.1%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[12%] aspect-square rounded-full border-2 md:border-4 flex flex-col items-center justify-center bg-white dark:bg-slate-900 shadow-lg cursor-pointer transition-all hover:scale-110 z-10 ${activePhase === 'init' ? 'border-yellow-400 shadow-yellow-400/20 scale-110' : 'border-slate-100 dark:border-slate-700'}`}
                                    >
                                        <span className="text-xl md:text-3xl lg:text-4xl drop-shadow-md">🚀</span>
                                        <h3 className="font-bold text-slate-700 dark:text-slate-200 text-[9px] md:text-xs mt-1">Iniciación</h3>
                                    </div>

                                    {/* Plan: Center X ~38.9% (350px), Y 25% */}
                                    <div
                                        onMouseEnter={() => setActivePhase('plan')}
                                        className={`absolute left-[38.9%] top-[25%] -translate-x-1/2 -translate-y-1/2 w-[12%] aspect-square rounded-full border-2 md:border-4 flex flex-col items-center justify-center bg-white dark:bg-slate-900 shadow-lg cursor-pointer transition-all hover:scale-110 z-10 ${activePhase === 'plan' ? 'border-blue-400 shadow-blue-400/20 scale-110' : 'border-slate-100 dark:border-slate-700'}`}
                                    >
                                        <span className="text-xl md:text-3xl lg:text-4xl drop-shadow-md">🗺️</span>
                                        <h3 className="font-bold text-slate-700 dark:text-slate-200 text-[9px] md:text-xs mt-1">Planificación</h3>
                                    </div>

                                    {/* Exec: Center X ~66.7% (600px), Y 50% */}
                                    <div
                                        onMouseEnter={() => setActivePhase('exec')}
                                        className={`absolute left-[66.7%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[12%] aspect-square rounded-full border-2 md:border-4 flex flex-col items-center justify-center bg-white dark:bg-slate-900 shadow-lg cursor-pointer transition-all hover:scale-110 z-10 ${activePhase === 'exec' ? 'border-red-400 shadow-red-400/20 scale-110' : 'border-slate-100 dark:border-slate-700'}`}
                                    >
                                        <span className="text-xl md:text-3xl lg:text-4xl drop-shadow-md">⚙️</span>
                                        <h3 className="font-bold text-slate-700 dark:text-slate-200 text-[9px] md:text-xs mt-1">Ejecución</h3>
                                    </div>

                                    {/* Ctrl: Center X ~38.9% (350px), Y 75% */}
                                    <div
                                        onMouseEnter={() => setActivePhase('ctrl')}
                                        className={`absolute left-[38.9%] top-[75%] -translate-x-1/2 -translate-y-1/2 w-[12%] aspect-square rounded-full border-2 md:border-4 flex flex-col items-center justify-center bg-white dark:bg-slate-900 shadow-lg cursor-pointer transition-all hover:scale-110 z-10 ${activePhase === 'ctrl' ? 'border-purple-400 shadow-purple-400/20 scale-110' : 'border-slate-100 dark:border-slate-700'}`}
                                    >
                                        <span className="text-xl md:text-3xl lg:text-4xl drop-shadow-md">🔍</span>
                                        <h3 className="font-bold text-slate-700 dark:text-slate-200 text-[9px] md:text-xs mt-1">Control</h3>
                                    </div>

                                    {/* Close: Center X ~88.9% (800px), Y 50% */}
                                    <div
                                        onMouseEnter={() => setActivePhase('close')}
                                        className={`absolute left-[88.9%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[12%] aspect-square rounded-full border-2 md:border-4 flex flex-col items-center justify-center bg-white dark:bg-slate-900 shadow-lg cursor-pointer transition-all hover:scale-110 z-10 ${activePhase === 'close' ? 'border-green-400 shadow-green-400/20 scale-110' : 'border-slate-100 dark:border-slate-700'}`}
                                    >
                                        <span className="text-xl md:text-3xl lg:text-4xl drop-shadow-md">🏁</span>
                                        <h3 className="font-bold text-slate-700 dark:text-slate-200 text-[9px] md:text-xs mt-1">Cierre</h3>
                                    </div>

                                    {/* Floating Info Box */}
                                    <div className={`absolute bottom-4 right-4 max-w-[200px] p-3 rounded-lg border-l-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur shadow-lg transition-all duration-300 ${activePhase ? `border-[${flowData[activePhase]?.color}] translate-y-0 opacity-100` : 'border-slate-300 translate-y-2 opacity-0'}`} style={{ borderLeftColor: activePhase ? flowData[activePhase]?.color : undefined }}>
                                        <h3 className="font-bold text-slate-800 dark:text-white text-xs mb-1">{activePhase ? flowData[activePhase].title : ""}</h3>
                                        <p className="text-slate-600 dark:text-slate-300 text-[10px] leading-tight">{activePhase ? flowData[activePhase].desc : ""}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'curves' && (
                    <div className="animate-fade-in flex-1 flex flex-col min-h-0">
                        <Card className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-slate-900 border-none shadow-none" noPadding>
                            <div className="p-2 shrink-0">
                                <h2 className="text-center font-bold text-base mb-0">Curvas de Actividad</h2>
                                <p className="text-center text-[10px] text-text-muted">Nivel de Actividad/Coste vs. Tiempo</p>
                            </div>

                            {/* Responsive Container Preserving Aspect Ratio */}
                            <div className="flex-1 w-full relative flex items-center justify-center p-2 min-h-0 overflow-hidden">
                                <div className="relative w-full max-h-full aspect-[1.8] max-w-6xl shadow-xl bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                                    <div className="absolute inset-0 p-4 pb-16">
                                        <Line
                                            data={{
                                                labels: ['Inicio', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', 'Fin'],
                                                datasets: [
                                                    {
                                                        label: 'Iniciación',
                                                        data: [5, 40, 20, 5, 0, 0, 0, 0, 0, 0, 0],
                                                        borderColor: 'rgba(46, 204, 113, 1)', // Verde
                                                        backgroundColor: 'rgba(46, 204, 113, 0.2)',
                                                        borderWidth: 2,
                                                        tension: 0.4,
                                                        fill: true
                                                    },
                                                    {
                                                        label: 'Planificación',
                                                        data: [0, 20, 55, 60, 45, 30, 20, 15, 10, 5, 0],
                                                        borderColor: 'rgba(52, 152, 219, 1)', // Azul
                                                        backgroundColor: 'rgba(52, 152, 219, 0.2)',
                                                        borderWidth: 2,
                                                        tension: 0.4,
                                                        fill: true
                                                    },
                                                    {
                                                        label: 'Ejecución',
                                                        data: [0, 5, 15, 30, 70, 95, 90, 70, 40, 10, 0],
                                                        borderColor: 'rgba(231, 76, 60, 1)', // Rojo
                                                        backgroundColor: 'rgba(231, 76, 60, 0.2)',
                                                        borderWidth: 3, // Más grueso
                                                        tension: 0.4,
                                                        fill: true
                                                    },
                                                    {
                                                        label: 'Monitoreo y Control',
                                                        data: [2, 10, 20, 25, 30, 35, 35, 35, 30, 25, 10],
                                                        borderColor: 'rgba(241, 196, 15, 1)', // Amarillo
                                                        backgroundColor: 'rgba(241, 196, 15, 0.1)',
                                                        borderWidth: 2,
                                                        borderDash: [5, 5],
                                                        tension: 0.4,
                                                        fill: false
                                                    },
                                                    {
                                                        label: 'Cierre',
                                                        data: [0, 0, 0, 0, 0, 0, 0, 10, 35, 60, 10],
                                                        borderColor: 'rgba(142, 68, 173, 1)', // Morado
                                                        backgroundColor: 'rgba(142, 68, 173, 0.2)',
                                                        borderWidth: 2,
                                                        tension: 0.4,
                                                        fill: true
                                                    }
                                                ]
                                            }}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: false,
                                                interaction: {
                                                    mode: 'index',
                                                    intersect: false,
                                                },
                                                plugins: {
                                                    legend: {
                                                        position: 'top',
                                                        labels: {
                                                            font: { size: 10, family: "'Segoe UI', sans-serif" },
                                                            usePointStyle: true,
                                                            boxWidth: 6
                                                        }
                                                    },
                                                    tooltip: {
                                                        callbacks: {
                                                            label: function (context: any) {
                                                                return context.dataset.label + ': ' + context.parsed.y + '% Actividad';
                                                            }
                                                        }
                                                    }
                                                },
                                                scales: {
                                                    x: {
                                                        title: { display: true, text: 'Tiempo del Proyecto →', font: { weight: 'bold', size: 10 } },
                                                        grid: { display: false },
                                                        ticks: { font: { size: 9 } }
                                                    },
                                                    y: {
                                                        title: { display: true, text: 'Nivel de Interacción / Coste', font: { weight: 'bold', size: 10 } },
                                                        min: 0,
                                                        max: 100,
                                                        grid: { color: 'rgba(0,0,0,0.05)' },
                                                        ticks: { font: { size: 9 } }
                                                    }
                                                },
                                                elements: {
                                                    point: {
                                                        radius: 0,
                                                        hitRadius: 10,
                                                        hoverRadius: 5
                                                    }
                                                }
                                            }}
                                        />
                                    </div>

                                    {/* Overlay Info Box */}
                                    <div className="absolute bottom-3 left-3 right-3 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur border-l-4 border-amber-400 p-2.5 text-[9px] md:text-[11px] text-slate-600 dark:text-slate-300 rounded shadow-md z-10 flex gap-2 items-center">
                                        <span className="text-xl">💡</span>
                                        <div className="leading-snug">
                                            <strong className="text-slate-800 dark:text-white">Análisis del Experto:</strong> La curva de <strong className="text-red-500">Ejecución</strong> consume más recursos. <strong className="text-yellow-500">Monitoreo</strong> es constante. No subestimes el <strong className="text-purple-500">Cierre</strong>.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'areas' && (
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
                )}

                {activeTab === 'matrix' && (
                    <div className="animate-fade-in flex-1 flex flex-col min-h-0">
                        <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between h-full w-full shadow-inner overflow-hidden">
                            <div className="p-2 shrink-0">
                                <h3 className="text-center font-bold text-base mb-0 text-slate-800 dark:text-slate-200">Matriz de Procesos</h3>
                                <p className="text-center text-[10px] text-text-muted">Qué vs Cuándo.</p>
                            </div>

                            <div className="flex-1 overflow-auto p-2 scrollbar-thin">
                                <div className="min-w-[600px] h-full grid grid-cols-[120px_repeat(5,1fr)] auto-rows-fr gap-0.5 bg-border p-0.5 rounded text-[9px] select-none">
                                    {/* Headers */}
                                    <div className="bg-slate-200 dark:bg-slate-800 text-text-main p-1 font-bold flex items-center justify-center">Áreas / Grupos</div>
                                    <div className="p-1 font-bold text-center bg-yellow-400 text-slate-900 flex items-center justify-center">Iniciación</div>
                                    <div className="p-1 font-bold text-center bg-blue-500 text-white flex items-center justify-center">Planif.</div>
                                    <div className="p-1 font-bold text-center bg-red-500 text-white flex items-center justify-center">Ejecución</div>
                                    <div className="p-1 font-bold text-center bg-purple-500 text-white flex items-center justify-center">Control</div>
                                    <div className="p-1 font-bold text-center bg-green-500 text-white flex items-center justify-center">Cierre</div>

                                    {/* Content Rows */}
                                    {[
                                        {
                                            name: '1. Integración', cells: [
                                                { g: 'init', has: true, desc: 'Desarrollar el Acta de Constitución de Proyecto(Project Charter)' },
                                                { g: 'plan', has: true, desc: 'Desarrollar el Plan para la Dirección del Proyecto' },
                                                { g: 'exec', has: true, desc: 'Dirigir y Gestionar el Trabajo del Proyecto.' },
                                                { g: 'ctrl', has: true, desc: '- Monitorear y Controlar el Trabajo del Proyecto.\n- Realizar el Control Integrado de Cambios.' },
                                                { g: 'close', has: true, desc: 'Cerrar Proyecto o Fase.' }
                                            ]
                                        },
                                        {
                                            name: '2. Alcance', cells: [
                                                { g: 'init', has: false },
                                                { g: 'plan', has: true, desc: '- Planificar la Gestion del Alcance.\n- Recopilar Requisito.\n- Definir el Alcance.\n- Crear la EDT' },
                                                { g: 'exec', has: false },
                                                { g: 'ctrl', has: true, desc: '- Validar el Alcance.\n- Controlar Alcance.' },
                                                { g: 'close', has: false }
                                            ]
                                        },
                                        {
                                            name: '3. Tiempo', cells: [
                                                { g: 'init', has: false },
                                                { g: 'plan', has: true, desc: '- Panificar la Gestión del Cronograma.\n- Definir las Actividades.\n- Secuenciar las Actividades.\n- Estimar los Recursos de las Actividades.\n- Estimar la Duración de las Actividades.\n- Desarrollar el Cronograma.' },
                                                { g: 'exec', has: false },
                                                { g: 'ctrl', has: true, desc: 'Controlar Cronograma.' },
                                                { g: 'close', has: false }
                                            ]
                                        },
                                        {
                                            name: '4. Coste', cells: [
                                                { g: 'init', has: false },
                                                { g: 'plan', has: true, desc: '- Planificar la Gestión de Costos.\n- Estimar los Costos.\n- Determinar el Presupuesto.' },
                                                { g: 'exec', has: false },
                                                { g: 'ctrl', has: true, desc: 'Controlar los Costos (EVM).' },
                                                { g: 'close', has: false }
                                            ]
                                        },
                                        {
                                            name: '5. Calidad', cells: [
                                                { g: 'init', has: false },
                                                { g: 'plan', has: true, desc: 'Planificar la Gestión de la Calidad.' },
                                                { g: 'exec', has: true, desc: 'Realizar el Aseguramiento de Calidad (QA).' },
                                                { g: 'ctrl', has: true, desc: 'Controlar la Calidad (QC).' },
                                                { g: 'close', has: false }
                                            ]
                                        },
                                        {
                                            name: '6. R.R.H.H', cells: [
                                                { g: 'init', has: false },
                                                { g: 'plan', has: true, desc: 'Planificar la Gestión de Recursos Humanos.' },
                                                { g: 'exec', has: true, desc: '- Adquirir el Equipo del Proyecto.\n- Desarrollar el Equipo del Proyecto.\n- Dirigir el Equipo del Proyecto.' },
                                                { g: 'ctrl', has: false },
                                                { g: 'close', has: false }
                                            ]
                                        },
                                        {
                                            name: '7. Comunicaciones', cells: [
                                                { g: 'init', has: false },
                                                { g: 'plan', has: true, desc: 'Planificar la Gestión de las Comunicaciones.' },
                                                { g: 'exec', has: true, desc: 'Gestionar las Comunicaciones.' },
                                                { g: 'ctrl', has: true, desc: 'Controlar las Comunicaciones.' },
                                                { g: 'close', has: false }
                                            ]
                                        },
                                        {
                                            name: '8. Riesgos', cells: [
                                                { g: 'init', has: false },
                                                { g: 'plan', has: true, desc: '- Planificar la Gestión de Riesgos.\n- Identificar los Riesgos.\n- Realizar el Análisis Cualitativo de Riesgos.\n- Realizar el Análisis Cuantitativo de Riesgos.\n- Planificar la Respuesta a los Riesgos' },
                                                { g: 'exec', has: false },
                                                { g: 'ctrl', has: true, desc: 'Controlar los Riesgos.' },
                                                { g: 'close', has: false }
                                            ]
                                        },
                                        {
                                            name: '9. Adquisiciones', cells: [
                                                { g: 'init', has: false },
                                                { g: 'plan', has: true, desc: 'Planificar la Gestión de las Adquisiciones del Proyecto.' },
                                                { g: 'exec', has: true, desc: 'Efectuar las Adquisiciones.' },
                                                { g: 'ctrl', has: true, desc: 'Controlar las Adquisiciones.' },
                                                { g: 'close', has: true, desc: 'Cerrar las Adquisiciones' }
                                            ]
                                        },
                                        {
                                            name: '10. Interesados', cells: [
                                                { g: 'init', has: true, desc: 'Identificar a los Interesados.' },
                                                { g: 'plan', has: true, desc: 'Planificar la Gestión de los Interesados.' },
                                                { g: 'exec', has: true, desc: 'Gestionar la Participación de los Interesados.' },
                                                { g: 'ctrl', has: true, desc: 'Contrlar la Participación de los Interesados.' },
                                                { g: 'close', has: false }
                                            ]
                                        },
                                    ].map((row, i) => (
                                        <React.Fragment key={i}>
                                            <div className="bg-slate-100 dark:bg-slate-800 text-text-main p-1 font-semibold flex items-center leading-tight justify-center">{row.name}</div>
                                            {row.cells.map((cell, j) => (
                                                <div
                                                    key={j}
                                                    onClick={() => cell.has && setActiveMatrixCell({ title: `${row.name}`, desc: cell.desc!, color: '' })}
                                                    className={`flex items-center justify-center transition-all h-full w-full ${cell.has
                                                        ? 'bg-white dark:bg-slate-700 cursor-pointer hover:scale-105 hover:shadow-lg text-slate-800 dark:text-slate-200 font-bold border border-transparent hover:border-blue-500'
                                                        : 'bg-slate-50 dark:bg-slate-900/50 opacity-30 pointer-events-none'}`}
                                                >
                                                    {cell.has && "●"}
                                                </div>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                            {/* Detail Panel */}
                            <div className="mt-2 bg-white dark:bg-slate-800 p-3 rounded-lg border-l-4 border-amber-400 h-auto min-h-[3.5rem] flex flex-col justify-center transition-colors duration-300 shrink-0 shadow-sm mx-2 mb-1">
                                <h4 className="font-bold text-amber-600 dark:text-amber-400 transition-colors text-xs md:text-sm">{activeMatrixCell ? activeMatrixCell.title : 'Selecciona una celda activa (●)'}</h4>
                                <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-300 transition-colors leading-snug whitespace-pre-line">{activeMatrixCell ? activeMatrixCell.desc : 'Haz clic sobre cualquier punto de color para ver el detalle del proceso.'}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default SlideTripleConstraint;
