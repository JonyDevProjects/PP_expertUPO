
import SlideContainer from '../../shared/SlideContainer';
import CriticalPathFinder from './CriticalPathFinder';
import { AlertTriangle, GitCommit } from 'lucide-react';

const SlideCPM = () => {
    return (
        <SlideContainer title="3. Ruta Crítica (CPM)">
            <CriticalPathFinder />

            <div className="mt-8 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-lg text-rose-600 dark:text-rose-400">
                        <GitCommit className="w-6 h-6" />
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">
                            Conceptos Clave del CPM
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            La <strong>Ruta Crítica</strong> es la secuencia de actividades con la mayor duración total a través de la red del proyecto. Determina la duración más corta posible para completar el proyecto.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div className="bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700">
                                <strong className="text-rose-600 dark:text-rose-400 text-sm block mb-1">Holgura Total (Float) = 0</strong>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                    Las actividades críticas no tienen margen. Cualquier retraso en ellas retrasa la fecha fin del proyecto.
                                </span>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700">
                                <strong className="text-blue-600 dark:text-blue-400 text-sm block mb-1">Rutas Casi-Críticas</strong>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                    Rutas con poca holgura que pueden volverse críticas ante riesgos pequeños.
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg border border-amber-100 dark:border-amber-900/50">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            <span><strong>¡Ojo!</strong> Puede haber más de una ruta crítica en un proyecto.</span>
                        </div>
                    </div>
                </div>
            </div>
        </SlideContainer>
    );
};

export default SlideCPM;
