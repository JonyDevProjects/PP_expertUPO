import React from 'react';
import { Card } from '../../../../ui/Card';
import { flowData } from '../../../../../data/slideData';

interface TabWorkflowProps {
    activePhase: string | null;
    setActivePhase: (phase: string | null) => void;
}

const TabWorkflow: React.FC<TabWorkflowProps> = ({ activePhase, setActivePhase }) => {
    return (
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
    );
};

export default TabWorkflow;
