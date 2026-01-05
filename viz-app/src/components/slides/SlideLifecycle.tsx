
import { Layers } from 'lucide-react';
import SlideContainer from '../shared/SlideContainer';

const SlideLifecycle = () => (
    <div className="animate-fade-in space-y-8">
        <SlideContainer title="Desarrollo de un Proyecto">
            <h3 className="font-bold text-primary flex items-center gap-2 text-lg">
                Ciclo de Vida
            </h3>
            {/* Timeline Vertical */}
            <div className="relative mb-12 py-8 rounded-xl border border-border items-center">
                <h3 className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-primary text-sm bg-indigo-50 dark:bg-slate-800 px-4 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-900 shadow-sm z-10">
                    Procesos Productivos
                </h3>
                {/* Vertical Line */}
                <div className="absolute top-0 bottom-0 left-1/2 w-1.5 bg-gradient-to-b from-rose-200 via-amber-200 to-blue-200 -translate-x-1/2 z-0 rounded-full"></div>

                <div className="flex flex-col gap-12 relative z-10">
                    {[
                        { label: 'Conceptualización', sub: 'Requisitos y Viabilidad', color: 'bg-rose-500', shadow: 'shadow-rose-200' },
                        { label: 'Planificación & Diseño', sub: 'La hoja de ruta (WBS, Cronograma)', color: 'bg-amber-500', shadow: 'shadow-amber-200' },
                        { label: 'Construcción', sub: 'Ejecución técnica y QA', color: 'bg-emerald-500', shadow: 'shadow-emerald-200' },
                        { label: 'Entrega & Cierre', sub: 'Aceptación y Lecciones Aprendidas', color: 'bg-blue-500', shadow: 'shadow-blue-200' }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center group">
                            {/* Number Node */}
                            <div className={`w-16 h-16 ${item.color} text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-xl ${item.shadow} z-10 transition-transform hover:scale-110 mb-4 border-4 border-white`}>
                                {i + 1}
                            </div>

                            {/* Content Card */}
                            <div className="bg-surface p-4 rounded-xl shadow-sm border border-border text-center min-w-[240px] max-w-xs relative hover:shadow-md transition-shadow">
                                <h3 className="font-bold text-text-main text-lg mb-1">{item.label}</h3>
                                <p className="text-sm text-text-muted">{item.sub}</p>
                                {/* Little arrow pointing up to the bubble */}
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-surface border-t border-l border-border rotate-45"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Methodologies */}
            <div className="bg-background p-6 rounded-xl border border-border">
                <h3 className="font-bold text-primary mb-4 flex items-center">
                    <Layers className="w-5 h-5" /> Metodologías
                </h3>
                <p className="text-xs text-text-muted mb-4">Son los marcos de trabajo (como SCRUM o CRISP-DM) que nos dan las herramientas y procesos para gestionar el trabajo.</p>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                    <div className="bg-surface p-4 rounded shadow-sm border-t-4 border-blue-500 hover:-translate-y-1 transition-transform cursor-default">
                        <h4 className="font-bold text-text-main">Predictiva (Waterfall)</h4>
                        <p className="text-xs text-text-muted mt-2">Planificación total al inicio. Ideal para construcción y alcances fijos.</p>
                    </div>
                    <div className="bg-surface p-4 rounded shadow-sm border-t-4 border-green-500 hover:-translate-y-1 transition-transform cursor-default">
                        <h4 className="font-bold text-text-main">Ágil (Scrum/Kanban)</h4>
                        <p className="text-xs text-text-muted mt-2">Iterativa e incremental. Ideal para software y entornos cambiantes.</p>
                    </div>
                    <div className="bg-surface p-4 rounded shadow-sm border-t-4 border-purple-500 hover:-translate-y-1 transition-transform cursor-default">
                        <h4 className="font-bold text-text-main">Híbrida</h4>
                        <p className="text-xs text-text-muted mt-2">Mezcla lo mejor de ambos mundos según la fase del proyecto.</p>
                    </div>
                </div>
            </div>

            {/* Gestión de Proyectos - Gantt Visual */}

            <div className="mt-8 pt-6 border-t border-border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                    <div>
                        <h3 className="font-bold text-primary flex items-center gap-2 text-lg">
                            Gestión de Proyectos
                        </h3>
                        <p className="text-sm text-text-muted">Procesos de Negocio: Cronograma y Seguimiento</p>
                    </div>
                    {/* Legend */}
                    <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase text-text-muted">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400"></span>Iniciación</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500"></span>Planificación</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>Ejecución</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Control</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span>Cierre</span>
                    </div>
                </div>

                <div className="bg-surface dark:bg-slate-900 rounded-xl p-6 overflow-hidden shadow-inner border border-border dark:border-slate-800">
                    <div className="min-w-[500px] overflow-x-auto">
                        {/* Header Timeline */}
                        <div className="grid grid-cols-[100px_1fr] gap-4 mb-4 border-b border-border dark:border-slate-700 pb-2">
                            <div className="text-right text-[10px] font-bold text-text-muted uppercase tracking-wider self-end">Fase</div>
                            <div className="flex justify-between text-[10px] font-bold text-text-muted uppercase tracking-wider relative">
                                <span>Ene 01</span>
                                <span>Ene 08</span>
                                <span>Ene 15</span>
                                <span>Ene 22</span>
                                <span>Ene 29</span>
                            </div>
                        </div>

                        {/* Gantt Rows Container */}
                        <div className="space-y-4 relative">
                            {/* Vertical Grid Lines (every 20%) */}
                            <div className="absolute inset-0 grid grid-cols-5 pointer-events-none z-0">
                                <div className="border-r border-slate-200 dark:border-slate-800/40 h-full"></div>
                                <div className="border-r border-slate-200 dark:border-slate-800/40 h-full"></div>
                                <div className="border-r border-slate-200 dark:border-slate-800/40 h-full"></div>
                                <div className="border-r border-slate-200 dark:border-slate-800/40 h-full"></div>
                                <div className="border-r border-slate-200 dark:border-slate-800/40 h-full"></div>
                            </div>

                            {/* Row: Iniciación */}
                            <div className="grid grid-cols-[100px_1fr] gap-4 items-center group relative z-10">
                                <div className="text-right text-xs font-medium text-blue-600 dark:text-blue-300">Iniciación</div>
                                <div className="h-7 bg-slate-100 dark:bg-slate-800/50 rounded-lg relative w-full overflow-hidden">
                                    <div className="absolute left-[0%] h-full bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-lg group-hover:brightness-110 transition-all flex items-center px-2 border border-blue-400/30" style={{ width: '16%' }}>
                                        <span className="text-[9px] text-white font-bold truncate">Inicio (5d)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Row: Planificación */}
                            <div className="grid grid-cols-[100px_1fr] gap-4 items-center group relative z-10">
                                <div className="text-right text-xs font-medium text-indigo-600 dark:text-indigo-300">Planificación</div>
                                <div className="h-7 bg-slate-100 dark:bg-slate-800/50 rounded-lg relative w-full overflow-hidden">
                                    <div className="absolute left-[13%] h-full bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-lg shadow-lg group-hover:brightness-110 transition-all flex items-center px-2 border border-indigo-400/30" style={{ width: '40%' }}>
                                        <span className="text-[9px] text-white font-bold truncate">Alcance, Cronograma, Riesgos</span>
                                    </div>
                                </div>
                            </div>

                            {/* Row: Ejecución */}
                            <div className="grid grid-cols-[100px_1fr] gap-4 items-center group relative z-10">
                                <div className="text-right text-xs font-medium text-emerald-600 dark:text-emerald-300">Ejecución</div>
                                <div className="h-7 bg-slate-100 dark:bg-slate-800/50 rounded-lg relative w-full overflow-hidden">
                                    <div className="absolute left-[40%] h-full bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-lg shadow-lg group-hover:brightness-110 transition-all flex items-center px-2 border border-emerald-400/30" style={{ width: '33%' }}>
                                        <span className="text-[9px] text-white font-bold truncate">Desarrollo de Tareas (10d)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Row: Seguimiento */}
                            <div className="grid grid-cols-[100px_1fr] gap-4 items-center group relative z-10">
                                <div className="text-right text-xs font-medium text-amber-600 dark:text-amber-300 leading-tight">Seguimiento <br /><span className="text-[9px] opacity-60">y Control</span></div>
                                <div className="h-7 bg-slate-100 dark:bg-slate-800/50 rounded-lg relative w-full overflow-hidden">
                                    <div className="absolute left-[43%] h-full bg-gradient-to-r from-amber-600 to-amber-500 rounded-lg shadow-lg group-hover:brightness-110 transition-all flex items-center px-2 border border-amber-400/30" style={{ width: '46%' }}>
                                        <span className="text-[9px] text-white font-bold truncate">Monitoreo y QA</span>
                                    </div>
                                </div>
                            </div>

                            {/* Row: Cierre */}
                            <div className="grid grid-cols-[100px_1fr] gap-4 items-center group relative z-10">
                                <div className="text-right text-xs font-medium text-rose-600 dark:text-rose-300">Cierre</div>
                                <div className="h-7 bg-slate-100 dark:bg-slate-800/50 rounded-lg relative w-full overflow-hidden">
                                    <div className="absolute left-[83%] h-full bg-gradient-to-r from-rose-600 to-rose-500 rounded-lg shadow-lg group-hover:brightness-110 transition-all flex items-center px-2 border border-rose-400/30" style={{ width: '17%' }}>
                                        <span className="text-[9px] text-white font-bold truncate">Entrega Final</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </SlideContainer>
    </div>
);

export default SlideLifecycle;
