import { useState } from 'react';
import SlideContainer from '../../shared/SlideContainer';
import DependencyLogicLab from './DependencyLogicLab';
import { ArrowLeftRight, Link, Clock } from 'lucide-react';

const SlideSequencing = ({ autoPlay, onAudioComplete }: { autoPlay?: boolean; onAudioComplete?: () => void }) => {
    const [simulationStep, setSimulationStep] = useState(0);

    const ttsSteps = [
        {
            id: 'intro',
            text: "Una vez tenemos las actividades, debemos secuenciarlas usando el Método de Diagramación por Precedencia, o PDM.",
        },
        {
            id: 'fs',
            text: "La relación más común es Fin-Inicio. Por ejemplo, no podemos instalar ventanas hasta que los muros estén construidos.",
        },
        {
            id: 'chainer',
            text: "Y no podemos pintar hasta tener las ventanas. Esto crea una cadena lógica.",
        },
        {
            id: 'lag',
            text: "A veces necesitamos un tiempo de espera o LAG. Por ejemplo, esperar a que el cemento seque antes de seguir.",
        },
        {
            id: 'lead',
            text: "O podemos aplicar un LEAD o adelanto para hacer Fast Tracking, solapando tareas para ganar tiempo, aunque aumente el riesgo.",
        }
    ];

    const handleStepChange = (stepId: string | null) => {
        if (stepId === 'intro') setSimulationStep(0);
        if (stepId === 'fs') setSimulationStep(1);
        if (stepId === 'chainer') setSimulationStep(2);
        if (stepId === 'lag') setSimulationStep(3);
        if (stepId === 'lead') setSimulationStep(4);

        if (stepId === null && onAudioComplete) {
            onAudioComplete();
        }
    };

    return (
        <SlideContainer
            title="2. Secuenciación: Método PDM"
            rate={1.2}
            ttsSteps={ttsSteps}
            autoPlay={autoPlay}
            onStepChange={handleStepChange}
        >
            <DependencyLogicLab simulationStep={simulationStep} />

            <div className="mt-8 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                    <Link className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    Teoría: Diagramación por Precedencia (PDM)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                    <div>
                        <h4 className="font-bold text-slate-700 dark:text-slate-200 mb-2 border-b border-indigo-100 dark:border-indigo-900/50 pb-1">Tipos de Dependencias</h4>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                            <li><span className={`font-mono font-bold transition-colors ${simulationStep >= 1 ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>FS (Fin-Inicio):</span> La más común (95%). B empieza cuando A termina.</li>
                            <li><span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">SS (Inicio-Inicio):</span> B empieza al mismo tiempo que A. (Ej. vertido de hormigón y nivelado).</li>
                            <li><span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">FF (Fin-Fin):</span> B no puede terminar hasta que A termine.</li>
                            <li><span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">SF (Inicio-Fin):</span> Rara. B no puede terminar hasta que A empiece.</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-700 dark:text-slate-200 mb-2 border-b border-indigo-100 dark:border-indigo-900/50 pb-1">Adelantos y Retrasos</h4>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                            <li className={`flex items-start gap-2 transition-opacity ${simulationStep === 3 ? 'opacity-100 bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded' : 'opacity-100'}`}>
                                <Clock className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mt-0.5 shrink-0" />
                                <div>
                                    <strong>Lag (Retraso):</strong> Tiempo de espera obligatorio. <br />
                                    <span className="text-xs italic text-slate-500 dark:text-slate-500">Ej: Esperar 3 días a que seque la pintura (FS + 3d).</span>
                                </div>
                            </li>
                            <li className={`flex items-start gap-2 transition-opacity ${simulationStep === 4 ? 'opacity-100 bg-amber-50 dark:bg-amber-900/20 p-2 rounded' : 'opacity-100'}`}>
                                <ArrowLeftRight className="w-4 h-4 text-amber-500 dark:text-amber-400 mt-0.5 shrink-0" />
                                <div>
                                    <strong>Lead (Adelanto):</strong> Superposición de tareas. Representado como Lag negativo. <br />
                                    <span className="text-xs italic text-slate-500 dark:text-slate-500">Ej: Empezar a redactar el cap. 2 antes de terminar el 1 (FS - 2d).</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </SlideContainer>
    );
};

export default SlideSequencing;
