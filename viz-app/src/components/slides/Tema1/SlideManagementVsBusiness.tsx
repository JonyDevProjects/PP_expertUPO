
import { Briefcase, CheckCircle, TrendingUp } from 'lucide-react';
import SlideContainer from '../../shared/SlideContainer';

const SlideManagementVsBusiness = ({ autoPlay, onAudioComplete }: { autoPlay?: boolean; onAudioComplete?: () => void }) => (
    <div className="animate-fade-in space-y-8">
        <SlideContainer
            title="Dos Caras de la Misma Moneda"
            rate={1.2}
            ttsText="Distinguimos dos procesos: Los de Gestión son internos (RRHH, Finanzas) y buscan eficiencia. Los de Negocio son externos (Ventas, Producción) y generan valor directo al cliente."
            autoPlay={autoPlay}
            onStepChange={(id) => {
                if (!id) onAudioComplete?.();
            }}
        >
            <div className="flex flex-col xl:grid xl:grid-cols-2 gap-0 overflow-hidden rounded-xl border border-border">

                {/* Gestión */}
                <div className="bg-background p-8 flex flex-col items-center text-center border-b xl:border-b-0 xl:border-r border-border">
                    <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 text-slate-600 dark:text-slate-200">
                        <Briefcase size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-text-main mb-2">Procesos de Gestión</h3>
                    <span className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-full mb-6">INTERNO</span>

                    <ul className="text-sm space-y-4 text-text-muted w-full text-left">
                        <li className="flex gap-2"><CheckCircle size={16} className="text-slate-400 shrink-0" /> <strong>Fin:</strong> Administrar la organización.</li>
                        <li className="flex gap-2"><CheckCircle size={16} className="text-slate-400 shrink-0" /> <strong>Foco:</strong> Eficiencia y cumplimiento.</li>
                        <li className="flex gap-2"><CheckCircle size={16} className="text-slate-400 shrink-0" /> <strong>Impacto:</strong> Indirecto en el cliente.</li>
                        <li className="mt-4 pt-4 border-t border-border text-center italic">Ej: RRHH, Finanzas, Calidad.</li>
                    </ul>
                </div>

                {/* Negocio */}
                <div className="bg-indigo-600 p-8 flex flex-col items-center text-center text-white">
                    <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mb-4 text-white">
                        <TrendingUp size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Procesos de Negocio</h3>
                    <span className="px-3 py-1 bg-amber-400 text-indigo-900 text-xs font-bold rounded-full mb-6">EXTERNO</span>

                    <ul className="text-sm space-y-4 text-indigo-100 w-full text-left">
                        <li className="flex gap-2"><CheckCircle size={16} className="text-amber-400 shrink-0" /> <strong>Fin:</strong> Generar VALOR para el cliente.</li>
                        <li className="flex gap-2"><CheckCircle size={16} className="text-amber-400 shrink-0" /> <strong>Foco:</strong> Satisfacción y Competitividad.</li>
                        <li className="flex gap-2"><CheckCircle size={16} className="text-amber-400 shrink-0" /> <strong>Impacto:</strong> Directo.</li>
                        <li className="mt-4 pt-4 border-t border-indigo-500 text-center italic text-indigo-200">Ej: Ventas, Producción, Soporte.</li>
                    </ul>
                </div>

            </div>

            <div className="mt-6 text-center text-text-muted text-sm">
                La Gestión de Procesos de Negocio (BPM) busca alinear ambos mundos para la mejora continua.
            </div>
        </SlideContainer>
    </div>
);

export default SlideManagementVsBusiness;
