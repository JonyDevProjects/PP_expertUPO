import React from 'react';
import { MousePointerClick } from 'lucide-react';

interface TabRestrictionsProps {
    active: string | null;
    currentMsg: any;
    setActive: (id: string | null) => void;
}

const TabRestrictions: React.FC<TabRestrictionsProps> = ({ active, currentMsg, setActive }) => {
    return (
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
    );
};

export default TabRestrictions;
