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

import { Card } from '../ui/Card';
import { H2, Paragraph } from '../ui/Typography';
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

import { tripleConstraintMessages, flowData } from '../../data/slideData';

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
                <H2 className="text-xl md:text-2xl mb-2">Gestión de Proyectos</H2>
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
            <div className="flex-1 min-h-0 flex flex-col relative w-full max-w-5xl mx-auto overflow-y-auto custom-scrollbar">
                {activeTab === 'functions' && (
                    <div className="animate-fade-in flex-1 flex flex-col justify-center min-h-0">
                        <div className="bg-indigo-50 dark:bg-slate-900 p-3 rounded-xl border border-indigo-100 dark:border-slate-800 flex flex-col justify-center h-full max-h-[500px] mx-auto w-full max-w-3xl">
                            <h3 className="mb-4 text-center font-bold text-base md:text-lg text-indigo-900 dark:text-indigo-300 flex items-center justify-center gap-2">
                                <Briefcase className="w-5 h-5" /> Funciones de Gestión
                            </h3>

                            <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
                                <div className="bg-surface dark:bg-slate-800 p-3 rounded shadow-sm border border-border hover:border-primary transition-colors flex flex-col justify-center">
                                    <h4 className="font-bold text-primary flex items-center gap-1.5 mb-1 text-sm md:text-base">
                                        <Target className="w-4 h-4 text-blue-500" /> Planificar
                                    </h4>
                                    <p className="text-xs text-text-muted leading-snug">Definir los resultados buscados y cómo conseguirlos.</p>
                                </div>
                                <div className="bg-surface dark:bg-slate-800 p-3 rounded shadow-sm border border-border hover:border-primary transition-colors flex flex-col justify-center">
                                    <h4 className="font-bold text-primary flex items-center gap-1.5 mb-1 text-sm md:text-base">
                                        <Layers className="w-4 h-4 text-primary" /> Organizar
                                    </h4>
                                    <p className="text-xs text-text-muted leading-snug">Asignar las tareas planificadas a las personas y equipos.</p>
                                </div>
                                <div className="bg-surface dark:bg-slate-800 p-3 rounded shadow-sm border border-border hover:border-primary transition-colors flex flex-col justify-center">
                                    <h4 className="font-bold text-primary flex items-center gap-1.5 mb-1 text-sm md:text-base">
                                        <CheckCircle className="w-4 h-4 text-emerald-500" /> Controlar
                                    </h4>
                                    <p className="text-xs text-text-muted leading-snug">Comprobar si se están logrando los resultados.</p>
                                </div>
                                <div className="bg-surface dark:bg-slate-800 p-3 rounded shadow-sm border border-border hover:border-primary transition-colors flex flex-col justify-center">
                                    <h4 className="font-bold text-primary flex items-center gap-1.5 mb-1 text-sm md:text-base">
                                        <Users className="w-4 h-4 text-amber-500" /> Dirigir
                                    </h4>
                                    <p className="text-xs text-text-muted leading-snug">Liderar y motivar al equipo para alcanzar los objetivos.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'restrictions' && (
                    <div className="animate-fade-in flex-1 flex flex-col min-h-0">
                        <div className="w-full max-w-4xl mx-auto bg-slate-100 dark:bg-slate-950 rounded-xl p-2 md:p-4 relative overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl transition-colors duration-300 flex flex-col md:flex-row gap-4 items-center h-full">

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

                            {/* Right: Info Panel */}
                            <div className="relative z-10 w-full md:w-1/2 h-40 md:h-auto flex items-center">
                                <div className={`w-full p-4 rounded-xl border backdrop-blur-md transition-all duration-500 ${active ? `bg-white/80 dark:bg-slate-900/80 ${currentMsg?.border} ${currentMsg?.glow}` : 'bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800'}`}>
                                    {active && currentMsg ? (
                                        <div className="animate-fade-in text-center">
                                            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${currentMsg.accent} mb-1 block`}>{currentMsg.type}</span>
                                            <h4 className="text-slate-900 dark:text-white font-bold text-base mb-2 leading-tight transition-colors">{currentMsg.title}</h4>
                                            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed transition-colors">{currentMsg.body}</p>
                                        </div>
                                    ) : (
                                        <div className="text-slate-500 text-center py-2">
                                            <div className="w-10 h-10 rounded-full bg-slate-200/50 dark:bg-slate-800/50 mx-auto mb-2 flex items-center justify-center animate-pulse transition-colors">
                                                <MousePointerClick className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                                            </div>
                                            <p className="text-xs">Toca cada vértice para ver cómo afecta al equilibrio del proyecto.</p>
                                            <p className="text-[10px] mt-1 opacity-60">"Trade-off": No puedes tenerlo todo.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'workflow' && (
                    <div className="animate-fade-in flex-1 flex flex-col min-h-0">
                        <Card className="flex-1 flex flex-col min-h-0" noPadding>
                            <div className="p-2 shrink-0">
                                <h3 className="text-center font-bold text-base mb-0">Workflow de Información</h3>
                                <p className="text-center text-[10px] text-text-muted">Interacción dinámica entre los 5 Grupos de Procesos.</p>
                            </div>

                            <div className="flex-1 relative w-full border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-inner overflow-hidden transition-colors duration-300 min-h-[180px]">
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 900 500" preserveAspectRatio="none">
                                    {/* Paths - Using exact centers: Init(100,250), Plan(350,125), Exec(600,250), Ctrl(350,375), Close(800,250) */}
                                    <path id="path-init-plan" d="M 100 250 Q 225 250 350 125" className={`transition-all duration-300 fill-none ${activePhase === 'init' ? 'stroke-slate-700 dark:stroke-slate-200 stroke-[4px]' : 'stroke-slate-300 dark:stroke-slate-600 stroke-[3px]'}`} />
                                    <path id="path-plan-exec" d="M 350 125 L 600 250" className={`transition-all duration-300 fill-none ${activePhase === 'plan' ? 'stroke-slate-700 dark:stroke-slate-200 stroke-[4px]' : 'stroke-slate-300 dark:stroke-slate-600 stroke-[3px]'}`} />
                                    <path id="path-exec-ctrl" d="M 600 250 L 350 375" className={`transition-all duration-300 fill-none ${activePhase === 'exec' ? 'stroke-slate-700 dark:stroke-slate-200 stroke-[4px]' : 'stroke-slate-300 dark:stroke-slate-600 stroke-[3px]'}`} />
                                    <path id="path-ctrl-plan" d="M 350 375 Q 250 250 350 125" strokeDasharray="5,5" className={`transition-all duration-300 fill-none ${activePhase === 'ctrl' ? 'stroke-slate-700 dark:stroke-slate-200 stroke-[4px]' : 'stroke-slate-300 dark:stroke-slate-600 stroke-[3px]'}`} />
                                    <path id="path-ctrl-close" d="M 350 375 Q 600 450 800 250" className={`transition-all duration-300 fill-none ${activePhase === 'ctrl' ? 'stroke-slate-700 dark:stroke-slate-200 stroke-[4px]' : 'stroke-slate-300 dark:stroke-slate-600 stroke-[3px]'}`} />
                                </svg>

                                {/* Nodes (Absolute Position % based on viewBox 900x500) */}
                                {/* Init: Center X ~11.1% (100px), Y 50% */}
                                <div
                                    onMouseEnter={() => setActivePhase('init')}
                                    className={`absolute left-[11.1%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[12%] aspect-square rounded-full border-2 md:border-4 flex flex-col items-center justify-center bg-white dark:bg-slate-800 shadow-lg cursor-pointer transition-all hover:scale-110 z-10 ${activePhase === 'init' ? 'border-yellow-400 scale-110' : 'border-transparent'}`}
                                >
                                    <span className="text-xl md:text-2xl lg:text-3xl">🚀</span>
                                    <h3 className="font-bold text-slate-700 dark:text-slate-200 text-[8px] md:text-[10px]">Iniciación</h3>
                                </div>

                                {/* Plan: Center X ~38.9% (350px), Y 25% */}
                                <div
                                    onMouseEnter={() => setActivePhase('plan')}
                                    className={`absolute left-[38.9%] top-[25%] -translate-x-1/2 -translate-y-1/2 w-[12%] aspect-square rounded-full border-2 md:border-4 flex flex-col items-center justify-center bg-white dark:bg-slate-800 shadow-lg cursor-pointer transition-all hover:scale-110 z-10 ${activePhase === 'plan' ? 'border-blue-400 scale-110' : 'border-transparent'}`}
                                >
                                    <span className="text-xl md:text-2xl lg:text-3xl">🗺️</span>
                                    <h3 className="font-bold text-slate-700 dark:text-slate-200 text-[8px] md:text-[10px]">Planificación</h3>
                                </div>

                                {/* Exec: Center X ~66.7% (600px), Y 50% */}
                                <div
                                    onMouseEnter={() => setActivePhase('exec')}
                                    className={`absolute left-[66.7%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[12%] aspect-square rounded-full border-2 md:border-4 flex flex-col items-center justify-center bg-white dark:bg-slate-800 shadow-lg cursor-pointer transition-all hover:scale-110 z-10 ${activePhase === 'exec' ? 'border-red-400 scale-110' : 'border-transparent'}`}
                                >
                                    <span className="text-xl md:text-2xl lg:text-3xl">⚙️</span>
                                    <h3 className="font-bold text-slate-700 dark:text-slate-200 text-[8px] md:text-[10px]">Ejecución</h3>
                                </div>

                                {/* Ctrl: Center X ~38.9% (350px), Y 75% */}
                                <div
                                    onMouseEnter={() => setActivePhase('ctrl')}
                                    className={`absolute left-[38.9%] top-[75%] -translate-x-1/2 -translate-y-1/2 w-[12%] aspect-square rounded-full border-2 md:border-4 flex flex-col items-center justify-center bg-white dark:bg-slate-800 shadow-lg cursor-pointer transition-all hover:scale-110 z-10 ${activePhase === 'ctrl' ? 'border-purple-400 scale-110' : 'border-transparent'}`}
                                >
                                    <span className="text-xl md:text-2xl lg:text-3xl">🔍</span>
                                    <h3 className="font-bold text-slate-700 dark:text-slate-200 text-[8px] md:text-[10px]">Control</h3>
                                </div>

                                {/* Close: Center X ~88.9% (800px), Y 50% */}
                                <div
                                    onMouseEnter={() => setActivePhase('close')}
                                    className={`absolute left-[88.9%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[12%] aspect-square rounded-full border-2 md:border-4 flex flex-col items-center justify-center bg-white dark:bg-slate-800 shadow-lg cursor-pointer transition-all hover:scale-110 z-10 ${activePhase === 'close' ? 'border-green-400 scale-110' : 'border-transparent'}`}
                                >
                                    <span className="text-xl md:text-2xl lg:text-3xl">🏁</span>
                                    <h3 className="font-bold text-slate-700 dark:text-slate-200 text-[8px] md:text-[10px]">Cierre</h3>
                                </div>
                            </div>

                            {/* Info Box */}
                            <div className={`p-3 shrink-0 rounded-lg border-l-4 bg-background transition-colors duration-300 ${activePhase ? `border-[${flowData[activePhase]?.color}]` : 'border-border'}`} style={{ borderLeftColor: activePhase ? flowData[activePhase]?.color : undefined }}>
                                <h3 className="font-bold text-indigo-900 text-xs md:text-sm mb-1">{activePhase ? flowData[activePhase].title : "Seleccione una fase"}</h3>
                                <p className="text-slate-600 text-[10px] md:text-xs mb-1 line-clamp-2">{activePhase ? flowData[activePhase].desc : "Explore cómo fluye la información. 'Planificar-Hacer-Controlar' es iterativo."}</p>
                                {activePhase && (
                                    <p className="text-[10px] font-bold text-blue-600">{flowData[activePhase].flow}</p>
                                )}
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'curves' && (
                    <div className="animate-fade-in flex-1 flex flex-col min-h-0">

                        <Card className="flex-1 flex flex-col min-h-0" noPadding>
                            <div className="p-2 shrink-0">
                                <h2 className="text-center font-bold text-base mb-0">Curvas de Actividad</h2>
                                <p className="text-center text-[10px] text-text-muted">Nivel de Actividad/Coste vs. Tiempo</p>
                            </div>

                            <div className="relative flex-1 w-full min-h-[180px] px-2">
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
                            <div className="bg-slate-50 dark:bg-slate-900 border-l-4 border-primary p-3 text-[10px] md:text-xs text-slate-600 dark:text-slate-300 mx-2 mb-2 rounded shrink-0 shadow-sm">
                                <strong className="text-primary block mb-1">💡 Análisis del Experto (PP_Expert):</strong>
                                <span className="leading-snug block">
                                    Observe cómo la curva de <strong>Ejecución</strong> (Roja) representa el mayor consumo de recursos. Sin embargo, note que el <strong>Monitoreo y Control</strong> (Amarillo) está presente durante todo el ciclo, asegurando que no nos desviemos de la línea base. Un error común es subestimar el esfuerzo de <strong>Cierre</strong> (Morado), crucial para la aceptación formal.
                                </span>
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'areas' && (
                    <div className="animate-fade-in flex-1 flex flex-col justify-center min-h-0">
                        <Card className="flex-1 flex flex-col justify-center min-h-0" noPadding>
                            <div className="p-2 shrink-0">
                                <h3 className="text-center font-bold text-base mb-1">Áreas de Conocimiento</h3>
                                <p className="text-center text-[10px] text-text-muted mb-2">Piezas clave para el éxito.</p>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 p-2 overflow-y-auto min-h-0">
                                {[
                                    { icon: <Layers className="w-4 h-4 text-primary" />, title: "Integración", desc: "Coordinar elementos." },
                                    { icon: <Target className="w-4 h-4 text-red-500" />, title: "Alcance", desc: "Cumplir objetivos." },
                                    { icon: <Clock className="w-4 h-4 text-orange-500" />, title: "Tiempo", desc: "Controlar plazos." },
                                    { icon: <BadgeDollarSign className="w-4 h-4 text-green-600" />, title: "Coste", desc: "Presupuesto." },
                                    { icon: <CheckCircle className="w-4 h-4 text-teal-500" />, title: "Calidad", desc: "Satisfacer cliente." },
                                    { icon: <Users className="w-4 h-4 text-blue-500" />, title: "RRHH", desc: "Gestionar personas." },
                                    { icon: <MessageSquare className="w-4 h-4 text-sky-400" />, title: "Comunicación", desc: "Info correcta." },
                                    { icon: <AlertTriangle className="w-4 h-4 text-amber-500" />, title: "Riesgos", desc: "Responder problemas." },
                                    { icon: <ShoppingCart className="w-4 h-4 text-purple-500" />, title: "Adquisiciones", desc: "Compras externas." },
                                    { icon: <HeartHandshake className="w-4 h-4 text-rose-500" />, title: "Interesados", desc: "Expectativas." },
                                ].map((area, idx) => (
                                    <div key={idx} className="bg-background p-1.5 rounded-lg border border-border hover:shadow-md hover:border-primary transition-all group flex flex-col items-center text-center">
                                        <div className="mb-1 p-1 bg-surface rounded-full w-fit shadow-sm group-hover:scale-110 transition-transform">
                                            {area.icon}
                                        </div>
                                        <h4 className="font-bold text-text-main mb-0.5 text-[10px]">{area.title}</h4>
                                        <p className="text-[9px] text-text-muted leading-tight">{area.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'matrix' && (
                    <div className="animate-fade-in flex-1 flex flex-col min-h-0">
                        <Card className="flex-1 flex flex-col min-h-0 overflow-hidden" noPadding>
                            <div className="p-2 shrink-0">
                                <h3 className="text-center font-bold text-base mb-0">Matriz de Procesos</h3>
                                <p className="text-center text-[10px] text-text-muted">Qué vs Cuándo.</p>
                            </div>

                            <div className="flex-1 overflow-auto p-2 scrollbar-thin">
                                <div className="min-w-[600px] grid grid-cols-[120px_repeat(5,1fr)] gap-0.5 bg-border p-0.5 rounded text-[9px] select-none">
                                    {/* Headers */}
                                    <div className="bg-slate-200 dark:bg-slate-800 text-text-main p-1 font-bold flex items-center">Áreas / Grupos</div>
                                    <div className="p-1 font-bold text-center bg-yellow-400 text-slate-800 flex items-center justify-center">Iniciación</div>
                                    <div className="p-1 font-bold text-center bg-blue-500 text-white flex items-center justify-center">Planif.</div>
                                    <div className="p-1 font-bold text-center bg-red-500 text-white flex items-center justify-center">Ejecución</div>
                                    <div className="p-1 font-bold text-center bg-purple-500 text-white flex items-center justify-center">Control</div>
                                    <div className="p-1 font-bold text-center bg-green-500 text-white flex items-center justify-center">Cierre</div>

                                    {/* Content Rows */}
                                    {[
                                        {
                                            name: '1. Integración', cells: [
                                                { g: 'init', has: true, desc: 'Project Charter & Autorización.' },
                                                { g: 'plan', has: true, desc: 'Plan de Dirección (Plan Maestro).' },
                                                { g: 'exec', has: true, desc: 'Dirigir el trabajo del proyecto.' },
                                                { g: 'ctrl', has: true, desc: 'Control de Cambios Integrado.' },
                                                { g: 'close', has: true, desc: 'Cerrar proyecto o fase.' }
                                            ]
                                        },
                                        {
                                            name: '2. Alcance', cells: [
                                                { g: 'init', has: false },
                                                { g: 'plan', has: true, desc: 'Recopilar requisitos, EDT (WBS).' },
                                                { g: 'exec', has: false },
                                                { g: 'ctrl', has: true, desc: 'Validar y Controlar Alcance.' },
                                                { g: 'close', has: false }
                                            ]
                                        },
                                        {
                                            name: '3. Tiempo', cells: [
                                                { g: 'init', has: false },
                                                { g: 'plan', has: true, desc: 'Definir actividades, Cronograma.' },
                                                { g: 'exec', has: false },
                                                { g: 'ctrl', has: true, desc: 'Controlar Cronograma.' },
                                                { g: 'close', has: false }
                                            ]
                                        },
                                        {
                                            name: '4. Coste', cells: [
                                                { g: 'init', has: false },
                                                { g: 'plan', has: true, desc: 'Estimar costes, Presupuesto.' },
                                                { g: 'exec', has: false },
                                                { g: 'ctrl', has: true, desc: 'Controlar Costes (EVM).' },
                                                { g: 'close', has: false }
                                            ]
                                        },
                                        {
                                            name: '5. Calidad', cells: [
                                                { g: 'init', has: false },
                                                { g: 'plan', has: true, desc: 'Planificar Calidad.' },
                                                { g: 'exec', has: true, desc: 'Gestionar la Calidad (QA).' },
                                                { g: 'ctrl', has: true, desc: 'Controlar Calidad (QC).' },
                                                { g: 'close', has: false }
                                            ]
                                        },
                                        {
                                            name: '6. Recursos', cells: [
                                                { g: 'init', has: false },
                                                { g: 'plan', has: true, desc: 'Estimar y Planificar recursos.' },
                                                { g: 'exec', has: true, desc: 'Adquirir, Desarrollar y Dirigir equipo.' },
                                                { g: 'ctrl', has: true, desc: 'Controlar recursos.' },
                                                { g: 'close', has: false }
                                            ]
                                        },
                                        {
                                            name: '7. Comunicaciones', cells: [
                                                { g: 'init', has: false },
                                                { g: 'plan', has: true, desc: 'Planificar comunicaciones.' },
                                                { g: 'exec', has: true, desc: 'Gestionar comunicaciones.' },
                                                { g: 'ctrl', has: true, desc: 'Monitorear comunicaciones.' },
                                                { g: 'close', has: false }
                                            ]
                                        },
                                        {
                                            name: '8. Riesgos', cells: [
                                                { g: 'init', has: false },
                                                { g: 'plan', has: true, desc: 'Identificar, Analizar y Planificar respuestas.' },
                                                { g: 'exec', has: true, desc: 'Implementar respuesta a riesgos.' },
                                                { g: 'ctrl', has: true, desc: 'Monitorear riesgos.' },
                                                { g: 'close', has: false }
                                            ]
                                        },
                                        {
                                            name: '9. Adquisiciones', cells: [
                                                { g: 'init', has: false },
                                                { g: 'plan', has: true, desc: 'Planificar adquisiciones.' },
                                                { g: 'exec', has: true, desc: 'Efectuar adquisiciones.' },
                                                { g: 'ctrl', has: true, desc: 'Controlar adquisiciones.' },
                                                { g: 'close', has: true, desc: 'Cerrar contratos.' }
                                            ]
                                        },
                                        {
                                            name: '10. Interesados', cells: [
                                                { g: 'init', has: true, desc: 'Identificar Interesados.' },
                                                { g: 'plan', has: true, desc: 'Planificar involucramiento.' },
                                                { g: 'exec', has: true, desc: 'Gestionar participación.' },
                                                { g: 'ctrl', has: true, desc: 'Monitorear involucramiento.' },
                                                { g: 'close', has: false }
                                            ]
                                        },
                                    ].map((row, i) => (
                                        <React.Fragment key={i}>
                                            <div className="bg-slate-100 dark:bg-slate-900 text-text-main p-1 font-semibold flex items-center leading-tight">{row.name}</div>
                                            {row.cells.map((cell, j) => (
                                                <div
                                                    key={j}
                                                    onClick={() => cell.has && setActiveMatrixCell({ title: `${row.name}`, desc: cell.desc!, color: '' })}
                                                    className={`flex items-center justify-center h-6 transition-all ${cell.has
                                                        ? 'bg-surface cursor-pointer hover:scale-105 hover:shadow-lg text-text-main font-bold border border-transparent hover:border-primary'
                                                        : 'bg-slate-200 dark:bg-slate-800 opacity-50'}`}
                                                >
                                                    {cell.has && "●"}
                                                </div>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                            {/* Detail Panel */}
                            <div className="mt-1 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg border-l-4 border-amber-400 h-auto min-h-[3rem] flex flex-col justify-center transition-colors duration-300 shrink-0">
                                <h4 className="font-bold text-amber-600 dark:text-amber-400 transition-colors text-xs">{activeMatrixCell ? activeMatrixCell.title : 'Selecciona una celda activa (●)'}</h4>
                                <p className="text-[10px] text-slate-600 dark:text-slate-300 transition-colors leading-snug">{activeMatrixCell ? activeMatrixCell.desc : 'Haz clic sobre cualquier punto de color.'}</p>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div >
    );
};

export default SlideTripleConstraint;
