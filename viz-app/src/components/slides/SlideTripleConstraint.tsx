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
import { H2, H3, Paragraph } from '../ui/Typography';
import { getSmoothPath } from '../../utils/drawingUtils';
import { tripleConstraintMessages, flowData, curveData } from '../../data/slideData';

const SlideTripleConstraint = () => {
    // --- State for Triple Constraint ---
    const [active, setActive] = useState<string | null>(null);

    // --- State for Flow Diagram ---
    const [activePhase, setActivePhase] = useState<string | null>(null);

    // --- State for Matrix ---
    const [activeMatrixCell, setActiveMatrixCell] = useState<{ title: string; desc: string; color: string } | null>(null);

    const currentMsg = active ? tripleConstraintMessages[active as keyof typeof tripleConstraintMessages] : null;

    return (
        <div className="animate-fade-in space-y-12">
            <Card className="border-primary">
                <H2>
                    Gestión de Proyectos
                </H2>
                <Paragraph className="text-center text-lg">
                    Forma de organizar el trabajo para alcanzar ese objetivo <span className="font-bold text-amber-600">único</span> y <span className="font-bold text-amber-600">temporal</span>.
                </Paragraph>
                <div className="bg-indigo-50 dark:bg-slate-900 p-6 rounded-xl border border-indigo-100 dark:border-slate-800 mb-8">


                    <H3>
                        <Briefcase className="w-5 h-5 text-primary" /> Funciones de Gestión:
                    </H3>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-surface dark:bg-slate-800 p-4 rounded shadow-sm border border-border hover:border-primary transition-colors">
                            <h4 className="font-bold text-primary flex items-center gap-2 mb-2">
                                <Target className="w-4 h-4 text-blue-500" /> Planificar
                            </h4>
                            <p className="text-sm text-text-muted">Definir los resultados buscados y cómo conseguirlos.</p>
                        </div>
                        <div className="bg-surface dark:bg-slate-800 p-4 rounded shadow-sm border border-border hover:border-primary transition-colors">
                            <h4 className="font-bold text-primary flex items-center gap-2 mb-2">
                                <Layers className="w-4 h-4 text-primary" /> Organizar
                            </h4>
                            <p className="text-sm text-text-muted">Asignar las tareas planificadas a las personas y equipos.</p>
                        </div>
                        <div className="bg-surface dark:bg-slate-800 p-4 rounded shadow-sm border border-border hover:border-primary transition-colors">
                            <h4 className="font-bold text-primary flex items-center gap-2 mb-2">
                                <CheckCircle className="w-4 h-4 text-emerald-500" /> Controlar
                            </h4>
                            <p className="text-sm text-text-muted">Comprobar si se están logrando los resultados y corregir desviaciones.</p>
                        </div>
                        <div className="bg-surface dark:bg-slate-800 p-4 rounded shadow-sm border border-border hover:border-primary transition-colors">
                            <h4 className="font-bold text-primary flex items-center gap-2 mb-2">
                                <Users className="w-4 h-4 text-amber-500" /> Dirigir
                            </h4>
                            <p className="text-sm text-text-muted">Liderar y motivar al equipo para alcanzar los objetivos.</p>
                        </div>
                    </div>
                </div>
                <H3>
                    La Triple Restricción:
                </H3>
                {/* Dark Mode Component Integration */}
                <div className="w-full max-w-2xl mx-auto bg-slate-100 dark:bg-slate-950 rounded-2xl p-8 relative overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl transition-colors duration-300">

                    {/* Background Effects */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_10%_0,_rgba(56,189,248,0.15),transparent_55%),radial-gradient(circle_at_90%_100%,_rgba(236,72,153,0.15),transparent_60%)] mix-blend-multiply dark:mix-blend-normal" />

                    <div className="flex flex-col gap-8 items-center relative z-10">
                        {/* Interactive Triangle Stage */}
                        <div className="relative aspect-square max-w-[320px] mx-auto w-full mt-4 md:mt-0">
                            <svg className="absolute inset-0 w-full h-full drop-shadow-xl dark:drop-shadow-[0_12px_28px_rgba(15,23,42,0.9)] transition-all duration-300" viewBox="0 0 100 90" preserveAspectRatio="xMidYMid meet">
                                <polygon points="50,5 5,85 95,85" className="fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-600 transition-colors duration-300" strokeWidth="1.5" />
                            </svg>

                            {/* Center Label */}
                            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-500/50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-600 dark:text-slate-400 text-[10px] uppercase tracking-[0.2em] z-10 text-center shadow-sm dark:shadow-lg transition-colors duration-300">
                                Calidad <span className="text-slate-400 dark:text-slate-200 block text-[9px] tracking-normal opacity-80 mt-0.5">percibida</span>
                            </div>

                            {/* Scope Button (Top) */}
                            <button
                                onClick={() => setActive(active === 'scope' ? null : 'scope')}
                                className={`absolute top-[5%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white/95 dark:bg-slate-900/95 transition-all duration-300 hover:scale-105 active:scale-95 ${active === 'scope' ? 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)] scale-105 ring-1 ring-green-500/50' : 'border-slate-200 dark:border-transparent text-green-600 hover:bg-slate-50 dark:hover:bg-slate-900 shadow-sm dark:shadow-none'}`}
                            >
                                <div className={`w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_currentColor]`}></div>
                                <span className={`${active === 'scope' ? 'text-green-600 dark:text-green-400 font-bold' : 'text-green-700 dark:text-green-600 font-medium'} text-xs uppercase tracking-wider`}>Alcance</span>
                            </button>

                            {/* Time Button (Bottom Left) */}
                            <button
                                onClick={() => setActive(active === 'time' ? null : 'time')}
                                className={`absolute top-[90%] left-[5%] -translate-y-1/2 -translate-x-[16px] flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white/95 dark:bg-slate-900/95 transition-all duration-300 hover:scale-105 active:scale-95 ${active === 'time' ? 'border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)] scale-105 ring-1 ring-orange-500/50' : 'border-slate-200 dark:border-transparent text-orange-600 hover:bg-slate-50 dark:hover:bg-slate-900 shadow-sm dark:shadow-none'}`}
                            >
                                <div className={`w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_currentColor]`}></div>
                                <span className={`${active === 'time' ? 'text-orange-600 dark:text-orange-400 font-bold' : 'text-orange-700 dark:text-orange-600 font-medium'} text-xs uppercase tracking-wider`}>Tiempo</span>
                            </button>

                            {/* Cost Button (Bottom Right) */}
                            <button
                                onClick={() => setActive(active === 'cost' ? null : 'cost')}
                                className={`absolute top-[90%] right-[5%] -translate-y-1/2 translate-x-[16px] flex flex-row-reverse items-center gap-2 px-3 py-1.5 rounded-full border bg-white/95 dark:bg-slate-900/95 transition-all duration-300 hover:scale-105 active:scale-95 ${active === 'cost' ? 'border-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.4)] scale-105 ring-1 ring-rose-600/50' : 'border-slate-200 dark:border-transparent text-rose-600 hover:bg-slate-50 dark:hover:bg-slate-900 shadow-sm dark:shadow-none'}`}
                            >
                                <div className={`w-2 h-2 rounded-full bg-rose-600 shadow-[0_0_8px_currentColor]`}></div>
                                <span className={`${active === 'cost' ? 'text-rose-600 dark:text-rose-500 font-bold' : 'text-rose-700 dark:text-rose-700 font-medium'} text-xs uppercase tracking-wider`}>Coste</span>
                            </button>
                        </div>

                        {/* Info Panel */}
                        <div className="w-full">
                            <div className={`p-6 rounded-xl border backdrop-blur-md transition-all duration-500 ${active ? `bg-white/80 dark:bg-slate-900/80 ${currentMsg?.border} ${currentMsg?.glow}` : 'bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800'}`}>
                                {active && currentMsg ? (
                                    <div className="animate-fade-in">
                                        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${currentMsg.accent} mb-2 block`}>{currentMsg.type}</span>
                                        <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-3 leading-tight transition-colors">{currentMsg.title}</h4>
                                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed transition-colors">{currentMsg.body}</p>
                                    </div>
                                ) : (
                                    <div className="text-slate-500 text-center py-4">
                                        <div className="w-12 h-12 rounded-full bg-slate-200/50 dark:bg-slate-800/50 mx-auto mb-4 flex items-center justify-center animate-pulse transition-colors">
                                            <MousePointerClick className="w-6 h-6 text-slate-400 dark:text-slate-600" />
                                        </div>
                                        <p className="text-sm">Toca cada vértice para ver cómo afecta al equilibrio del proyecto.</p>
                                        <p className="text-xs mt-2 opacity-60">"Trade-off": No puedes tenerlo todo.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* 1. Workflow de Información */}
            <Card>
                <H2>Workflow de Información del Proyecto</H2>
                <Paragraph className="text-center text-text-muted mb-8">Interacción dinámica entre los 5 Grupos de Procesos. Pase el cursor sobre una fase.</Paragraph>

                <div className="relative w-full aspect-[16/9] max-w-4xl mx-auto border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900 shadow-inner overflow-hidden transition-colors duration-300">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 900 500">
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" className="fill-slate-300 dark:fill-slate-600 transition-colors duration-300" />
                            </marker>
                            <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" className="fill-slate-700 dark:fill-slate-200 transition-colors duration-300" />
                            </marker>
                        </defs>

                        {/* Paths */}
                        <path id="path-init-plan" d="M 150 250 Q 250 250 300 175" className={`transition-all duration-300 fill-none ${activePhase === 'init' ? 'stroke-slate-700 dark:stroke-slate-200 stroke-[4px]' : 'stroke-slate-300 dark:stroke-slate-600 stroke-[3px]'}`} markerEnd={activePhase === 'init' ? "url(#arrowhead-active)" : "url(#arrowhead)"} />
                        <path id="path-plan-exec" d="M 400 150 L 550 220" className={`transition-all duration-300 fill-none ${activePhase === 'plan' ? 'stroke-slate-700 dark:stroke-slate-200 stroke-[4px]' : 'stroke-slate-300 dark:stroke-slate-600 stroke-[3px]'}`} markerEnd={activePhase === 'plan' ? "url(#arrowhead-active)" : "url(#arrowhead)"} />
                        <path id="path-exec-ctrl" d="M 550 280 L 400 350" className={`transition-all duration-300 fill-none ${activePhase === 'exec' ? 'stroke-slate-700 dark:stroke-slate-200 stroke-[4px]' : 'stroke-slate-300 dark:stroke-slate-600 stroke-[3px]'}`} markerEnd={activePhase === 'exec' ? "url(#arrowhead-active)" : "url(#arrowhead)"} />
                        <path id="path-ctrl-plan" d="M 300 375 Q 200 250 300 125" strokeDasharray="5,5" className={`transition-all duration-300 fill-none ${activePhase === 'ctrl' ? 'stroke-slate-700 dark:stroke-slate-200 stroke-[4px]' : 'stroke-slate-300 dark:stroke-slate-600 stroke-[3px]'}`} markerEnd={activePhase === 'ctrl' ? "url(#arrowhead-active)" : "url(#arrowhead)"} />
                        <path id="path-ctrl-close" d="M 400 400 Q 600 450 750 280" className={`transition-all duration-300 fill-none ${activePhase === 'ctrl' ? 'stroke-slate-700 dark:stroke-slate-200 stroke-[4px]' : 'stroke-slate-300 dark:stroke-slate-600 stroke-[3px]'}`} markerEnd={activePhase === 'ctrl' ? "url(#arrowhead-active)" : "url(#arrowhead)"} />
                    </svg>

                    {/* Nodes (Absolute Position % based on viewBox 900x500) */}
                    {/* Init: Center X ~11% (100px), Y 50% */}
                    <div
                        onMouseEnter={() => setActivePhase('init')}
                        className={`absolute left-[11%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-32 md:h-32 rounded-full border-2 md:border-4 flex flex-col items-center justify-center bg-white dark:bg-slate-800 shadow-lg cursor-pointer transition-all hover:scale-110 z-10 ${activePhase === 'init' ? 'border-yellow-400 scale-110' : 'border-transparent'}`}
                    >
                        <span className="text-base md:text-2xl">🚀</span>
                        <h3 className="font-bold text-slate-700 dark:text-slate-200 text-[9px] md:text-sm">Iniciación</h3>
                    </div>

                    {/* Plan: Center X ~39% (350px), Y 25% */}
                    <div
                        onMouseEnter={() => setActivePhase('plan')}
                        className={`absolute left-[39%] top-[25%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-32 md:h-32 rounded-full border-2 md:border-4 flex flex-col items-center justify-center bg-white dark:bg-slate-800 shadow-lg cursor-pointer transition-all hover:scale-110 z-10 ${activePhase === 'plan' ? 'border-blue-400 scale-110' : 'border-transparent'}`}
                    >
                        <span className="text-base md:text-2xl">🗺️</span>
                        <h3 className="font-bold text-slate-700 dark:text-slate-200 text-[9px] md:text-sm">Planificación</h3>
                    </div>

                    {/* Exec: Center X ~67% (600px), Y 50% */}
                    <div
                        onMouseEnter={() => setActivePhase('exec')}
                        className={`absolute left-[67%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-32 md:h-32 rounded-full border-2 md:border-4 flex flex-col items-center justify-center bg-white dark:bg-slate-800 shadow-lg cursor-pointer transition-all hover:scale-110 z-10 ${activePhase === 'exec' ? 'border-red-400 scale-110' : 'border-transparent'}`}
                    >
                        <span className="text-base md:text-2xl">⚙️</span>
                        <h3 className="font-bold text-slate-700 dark:text-slate-200 text-[9px] md:text-sm">Ejecución</h3>
                    </div>

                    {/* Ctrl: Center X ~39% (350px), Y 75% */}
                    <div
                        onMouseEnter={() => setActivePhase('ctrl')}
                        className={`absolute left-[39%] top-[75%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-32 md:h-32 rounded-full border-2 md:border-4 flex flex-col items-center justify-center bg-white dark:bg-slate-800 shadow-lg cursor-pointer transition-all hover:scale-110 z-10 ${activePhase === 'ctrl' ? 'border-purple-400 scale-110' : 'border-transparent'}`}
                    >
                        <span className="text-base md:text-2xl">🔍</span>
                        <h3 className="font-bold text-slate-700 dark:text-slate-200 text-[9px] md:text-sm">Control</h3>
                    </div>

                    {/* Close: Center X ~89% (800px), Y 50% */}
                    <div
                        onMouseEnter={() => setActivePhase('close')}
                        className={`absolute left-[89%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-32 md:h-32 rounded-full border-2 md:border-4 flex flex-col items-center justify-center bg-white dark:bg-slate-800 shadow-lg cursor-pointer transition-all hover:scale-110 z-10 ${activePhase === 'close' ? 'border-green-400 scale-110' : 'border-transparent'}`}
                    >
                        <span className="text-base md:text-2xl">🏁</span>
                        <h3 className="font-bold text-slate-700 dark:text-slate-200 text-[9px] md:text-sm">Cierre</h3>
                    </div>
                </div>

                {/* Info Box */}
                <div className={`mt-6 p-6 rounded-lg border-l-4 bg-background transition-colors duration-300 ${activePhase ? `border-[${flowData[activePhase]?.color}]` : 'border-border'}`} style={{ borderLeftColor: activePhase ? flowData[activePhase]?.color : undefined }}>
                    <h3 className="font-bold text-indigo-900 text-lg mb-2">{activePhase ? flowData[activePhase].title : "Seleccione una fase"}</h3>
                    <p className="text-slate-600 mb-2">{activePhase ? flowData[activePhase].desc : "Explore cómo fluye la información. Note que 'Planificar-Hacer-Controlar' forma un ciclo iterativo."}</p>
                    {activePhase && (
                        <p className="text-sm font-bold text-blue-600 mt-2">{flowData[activePhase].flow}</p>
                    )}
                </div>
            </Card>

            {/* 2. Curva de Actividad */}
            <Card>
                <H2>Curvas de Actividad</H2>
                <Paragraph className="text-center text-text-muted mb-6">Nivel de Actividad/Coste vs. Tiempo (Basado en PMBOK®)</Paragraph>

                <div className="relative h-80 w-full mb-6">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 800 300" preserveAspectRatio="none">
                        {/* Grid Lines */}
                        <line x1="0" y1="300" x2="800" y2="300" className="stroke-border" strokeWidth="2" />
                        <line x1="0" y1="0" x2="0" y2="300" className="stroke-border" strokeWidth="2" />

                        {/* Area Fills & Lines */}
                        {/* Init (Green) */}
                        <path d={`${getSmoothPath(curveData.init)} L 800 300 L 0 300 Z`} className="fill-green-500/10 dark:fill-green-500/20" />
                        <path d={getSmoothPath(curveData.init)} fill="none" className="stroke-green-500" strokeWidth="2" />

                        {/* Plan (Blue) */}
                        <path d={`${getSmoothPath(curveData.plan)} L 800 300 L 0 300 Z`} className="fill-blue-500/10 dark:fill-blue-500/20" />
                        <path d={getSmoothPath(curveData.plan)} fill="none" className="stroke-blue-500" strokeWidth="2" />

                        {/* Exec (Red) */}
                        <path d={`${getSmoothPath(curveData.exec)} L 800 300 L 0 300 Z`} className="fill-red-500/10 dark:fill-red-500/20" />
                        <path d={getSmoothPath(curveData.exec)} fill="none" className="stroke-red-500" strokeWidth="3" />

                        {/* Ctrl (Yellow + Dashed) */}
                        <path d={getSmoothPath(curveData.ctrl)} fill="none" className="stroke-yellow-500" strokeWidth="2" strokeDasharray="5,5" />

                        {/* Close (Purple) */}
                        <path d={`${getSmoothPath(curveData.close)} L 800 300 L 0 300 Z`} className="fill-purple-500/10 dark:fill-purple-500/20" />
                        <path d={getSmoothPath(curveData.close)} fill="none" className="stroke-purple-500" strokeWidth="2" />

                    </svg>
                    <div className="absolute top-4 right-4 bg-surface/90 p-3 rounded shadow text-xs space-y-1">
                        <div className="flex items-center gap-2"><div className="w-3 h-1 bg-green-500"></div> Iniciación</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-1 bg-blue-500"></div> Planificación</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Ejecución (Pico)</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-1 border-t-2 border-dashed border-yellow-500"></div> Control</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-1 bg-purple-500"></div> Cierre</div>
                    </div>
                </div>
                <div className="bg-background border-l-4 border-primary p-4 text-sm rounded">
                    <strong>💡 Análisis del Experto:</strong> Observe cómo la curva de <strong>Ejecución</strong> (Roja) representa el mayor consumo de recursos. Sin embargo, note que el <strong>Monitoreo y Control</strong> (Amarillo) está presente durante todo el ciclo.
                </div>
            </Card>


            {/* 3. Áreas de Conocimiento */}
            <Card>
                <H2>Áreas de Conocimiento</H2>
                <Paragraph className="text-center text-text-muted mb-8">Son las "piezas" que el gestor debe malabarear para el éxito del proyecto.</Paragraph>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {[
                        { icon: <Layers className="w-6 h-6 text-primary" />, title: "Integración", desc: "Coordinar todos los elementos del proyecto." },
                        { icon: <Target className="w-6 h-6 text-red-500" />, title: "Alcance", desc: "Asegurar que se cumplen los objetivos definidos." },
                        { icon: <Clock className="w-6 h-6 text-orange-500" />, title: "Tiempo", desc: "Controlar los plazos acordados." },
                        { icon: <BadgeDollarSign className="w-6 h-6 text-green-600" />, title: "Coste", desc: "Controlar que el proyecto se mantenga en presupuesto." },
                        { icon: <CheckCircle className="w-6 h-6 text-teal-500" />, title: "Calidad", desc: "Verificar que se satisfacen las necesidades del cliente." },
                        { icon: <Users className="w-6 h-6 text-blue-500" />, title: "RRHH", desc: "Gestionar eficazmente a las personas involucradas." },
                        { icon: <MessageSquare className="w-6 h-6 text-sky-400" />, title: "Comunicación", desc: "Asegurar que la información fluye correctamente." },
                        { icon: <AlertTriangle className="w-6 h-6 text-amber-500" />, title: "Riesgos", desc: "Identificar, analizar y responder a problemas." },
                        { icon: <ShoppingCart className="w-6 h-6 text-purple-500" />, title: "Adquisiciones", desc: "Comprar bienes y servicios a terceros." },
                        { icon: <HeartHandshake className="w-6 h-6 text-rose-500" />, title: "Interesados", desc: "Gestionar expectativas de las personas afectadas." },
                    ].map((area, idx) => (
                        <div key={idx} className="bg-background p-4 rounded-lg border border-border hover:shadow-md hover:border-primary transition-all group">
                            <div className="mb-3 p-2 bg-surface rounded-full w-fit shadow-sm group-hover:scale-110 transition-transform">
                                {area.icon}
                            </div>
                            <h4 className="font-bold text-text-main mb-1 text-sm">{area.title}</h4>
                            <p className="text-xs text-text-muted leading-relaxed">{area.desc}</p>
                        </div>
                    ))}
                </div>
            </Card>

            {/* 4. Matriz de Procesos */}
            <Card className="overflow-x-auto">
                <H3 className="mb-2">Matriz de Procesos y Áreas de Conocimiento</H3>
                <Paragraph className="text-xs text-text-muted mb-4">Intersección entre "Qué gestionamos" y "Cuándo lo gestionamos". Haz clic en los puntos.</Paragraph>

                <div className="min-w-[800px] grid grid-cols-[160px_repeat(5,1fr)] gap-1 bg-border p-1 rounded text-xs select-none">
                    {/* Headers */}
                    <div className="bg-slate-200 dark:bg-slate-800 text-text-main p-2 font-bold flex items-center">Áreas / Grupos</div>
                    <div className="p-2 font-bold text-center bg-yellow-400 text-slate-800">Iniciación</div>
                    <div className="p-2 font-bold text-center bg-blue-500 text-white">Planif.</div>
                    <div className="p-2 font-bold text-center bg-red-500 text-white">Ejecución</div>
                    <div className="p-2 font-bold text-center bg-purple-500 text-white">Control</div>
                    <div className="p-2 font-bold text-center bg-green-500 text-white">Cierre</div>

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
                            <div className="bg-slate-100 dark:bg-slate-900 text-text-main p-2 font-semibold flex items-center">{row.name}</div>
                            {row.cells.map((cell, j) => (
                                <div
                                    key={j}
                                    onClick={() => cell.has && setActiveMatrixCell({ title: `${row.name}`, desc: cell.desc!, color: '' })}
                                    className={`flex items-center justify-center h-10 transition-all ${cell.has
                                        ? 'bg-surface cursor-pointer hover:scale-105 hover:shadow-lg text-text-main font-bold border border-transparent hover:border-primary'
                                        : 'bg-slate-200 dark:bg-slate-800 opacity-50'}`}
                                >
                                    {cell.has && "●"}
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>

                {/* Detail Panel */}
                <div className="mt-4 bg-slate-100 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-amber-400 h-24 flex flex-col justify-center transition-colors duration-300">
                    <h4 className="font-bold text-amber-600 dark:text-amber-400 transition-colors">{activeMatrixCell ? activeMatrixCell.title : 'Selecciona una celda activa (●)'}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 transition-colors">{activeMatrixCell ? activeMatrixCell.desc : 'Haz clic sobre cualquier punto de color para ver qué procesos ocurren allí.'}</p>
                </div>
            </Card>
        </div >
    );
};

export default SlideTripleConstraint;
