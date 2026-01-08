import { useState } from 'react';
import SlideContainer from '../../shared/SlideContainer';
import CrashingVsFastTracking from './CrashingVsFastTracking';
import { Gauge, TrendingDown } from 'lucide-react';

const SlideOptimization = ({ autoPlay, onAudioComplete }: { autoPlay?: boolean; onAudioComplete?: () => void }) => {
    const [activeScenario, setActiveScenario] = useState<'none' | 'crashing' | 'fast-tracking'>('none');

    const ttsSteps = [
        {
            id: 'intro',
            text: "Si la Ruta Crítica es demasiado larga y necesitamos entregar antes, tenemos dos opciones de compresión.",
        },
        {
            id: 'crashing',
            text: "El Crashing o Intensificación. Añadimos recursos (dinero, personas) para acortar tareas. Cuesta más, pero mantiene la secuencia.",
        },
        {
            id: 'fast_tracking',
            text: "El Fast Tracking o Ejecución Rápida. Ponemos tareas en paralelo que deberían ser secuenciales. Aumenta el riesgo de retrabajo.",
        },
        {
            id: 'conclusion',
            text: "La elección depende de las restricciones: ¿Tienes presupuesto extra? Usa Crashing. ¿Solo tienes riesgo tolerable? Usa Fast Tracking.",
        }
    ];

    const handleStepChange = (stepId: string | null) => {
        if (stepId === 'intro') setActiveScenario('none');
        if (stepId === 'crashing') setActiveScenario('crashing');
        if (stepId === 'fast_tracking') setActiveScenario('fast-tracking');
        if (stepId === 'conclusion') setActiveScenario('none');

        if (stepId === null && onAudioComplete) {
            onAudioComplete();
        }
    };

    return (
        <SlideContainer
            title="4. Optimización (Compresión)"
            rate={1.2}
            ttsSteps={ttsSteps}
            autoPlay={autoPlay}
            onStepChange={handleStepChange}
        >
            <div className="min-h-[600px] mb-8">
                <CrashingVsFastTracking activeScenario={activeScenario} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`transition-all duration-500 ${activeScenario === 'crashing' ? 'bg-rose-100 dark:bg-rose-900/40 ring-2 ring-rose-500' : 'bg-rose-50 dark:bg-rose-900/20'} p-6 rounded-xl border border-rose-100 dark:border-rose-900/50`}>
                    <h3 className="font-bold text-rose-800 dark:text-rose-300 mb-2 flex items-center gap-2">
                        <Gauge className="w-5 h-5" />
                        Crashing (Intensificación)
                    </h3>
                    <p className="text-sm text-rose-700 dark:text-rose-200 mb-3">
                        Técnica de compresión que busca acortar la duración del cronograma con el menor coste incremental, añadiendo recursos.
                    </p>
                    <ul className="text-xs space-y-1 text-rose-600/80 dark:text-rose-300/80">
                        <li>• Horas extras</li>
                        <li>• Pagos por entrega rápida</li>
                        <li>• Contratar más personal</li>
                    </ul>
                </div>

                <div className={`transition-all duration-500 ${activeScenario === 'fast-tracking' ? 'bg-amber-100 dark:bg-amber-900/40 ring-2 ring-amber-500' : 'bg-amber-50 dark:bg-amber-900/20'} p-6 rounded-xl border border-amber-100 dark:border-amber-900/50`}>
                    <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-2">
                        <TrendingDown className="w-5 h-5" />
                        Fast Tracking (Ejecución Rápida)
                    </h3>
                    <p className="text-sm text-amber-700 dark:text-amber-200 mb-3">
                        Técnica que implica realizar en paralelo actividades que normalmente se harían en secuencia.
                    </p>
                    <ul className="text-xs space-y-1 text-amber-600/80 dark:text-amber-300/80">
                        <li>• Aumenta el RIESGO</li>
                        <li>• Puede resultar en retrabajo</li>
                        <li>• No siempre es posible (física)</li>
                    </ul>
                </div>
            </div>
        </SlideContainer>
    );
};

export default SlideOptimization;
