import { useState } from 'react';
import SlideContainer from '../../shared/SlideContainer';
import CriticalPathFinder from './CriticalPathFinder';
import { AlertTriangle, GitCommit } from 'lucide-react';

const SlideCPM = ({ autoPlay, onAudioComplete }: { autoPlay?: boolean; onAudioComplete?: () => void }) => {
    const [simulationStep, setSimulationStep] = useState(0);

    const ttsSteps = [
        {
            id: 'intro',
            text: "El Método de la Ruta Crítica, o CPM, nos ayuda a calcular la duración mínima del proyecto.",
        },
        {
            id: 'path1',
            text: "Debemos analizar todas las rutas posibles. Por ejemplo, la ruta superior tiene una duración de 5 días.",
        },
        {
            id: 'path3_hover',
            text: "Pero si miramos la ruta inferior, vemos que B y D suman más tiempo.",
        },
        {
            id: 'critical_select',
            text: "La Ruta Crítica es la secuencia más larga. En este caso, 12 días. Cualquier retraso aquí, retrasará todo el proyecto. Su holgura es CERO.",
        }
    ];

    const handleStepChange = (stepId: string | null) => {
        if (stepId === 'intro') setSimulationStep(0);
        if (stepId === 'path1') setSimulationStep(1); // Hover Path 1
        if (stepId === 'path3_hover') setSimulationStep(2); // Hover Path 3
        if (stepId === 'critical_select') setSimulationStep(3); // Select Path 3 (Critical)

        if (stepId === null && onAudioComplete) {
            onAudioComplete();
        }
    };

    return (
        <SlideContainer
            title="3. Ruta Crítica (CPM)"
            rate={1.2}
            ttsSteps={ttsSteps}
            autoPlay={autoPlay}
            onStepChange={handleStepChange}
        >
            <CriticalPathFinder simulationStep={simulationStep} />

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
                            <div className={`transition-all duration-500 ${simulationStep === 3 ? 'ring-2 ring-rose-500 bg-rose-50 dark:bg-rose-900/20' : 'bg-white dark:bg-slate-800'} p-3 rounded border border-slate-200 dark:border-slate-700`}>
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
