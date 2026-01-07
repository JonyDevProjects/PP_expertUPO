
import { useState } from 'react';
import { TrendingUp, AlertTriangle, Target, Shield } from 'lucide-react';
import SlideContainer from '../../shared/SlideContainer';

const steps = [
    {
        id: 'origins',
        text: "Los proyectos nacen de necesidades concretas: oportunidades de mercado, problemas técnicos, nuevos objetivos estratégicos o requisitos legales."
    },
    {
        id: 'analysis',
        text: "Pero antes de aprobar nada, debemos analizar su viabilidad mediante el Business Case."
    },
    {
        id: 'balance',
        text: "Es una balanza: comparamos los costes y riesgos estimados contra los beneficios tangibles e intangibles que esperamos obtener."
    },
    {
        id: 'financials',
        text: "Para justificar la inversión, usamos métricas financieras clave como el ROI (Retorno de Inversión) o el VAN (Valor Actual Neto)."
    }
];

const SlideOriginAndViability = ({ autoPlay }: { autoPlay?: boolean }) => {
    const [activeStep, setActiveStep] = useState<string | null>(null);

    // Helper class for focus mode
    const getFocusClass = (stepId: string) => {
        if (!activeStep) return "transition-all duration-500 opacity-100";
        return activeStep === stepId
            ? "transition-all duration-500 opacity-100 scale-[1.02] ring-2 ring-indigo-400/50 rounded-xl shadow-lg z-20 bg-surface relative"
            : "transition-all duration-500 opacity-30 blur-[1px] grayscale";
    };

    return (
        <div className="animate-fade-in space-y-8">
            <SlideContainer
                title="El Génesis del Proyecto"
                rate={1.2}
                ttsSteps={steps}
                onStepChange={setActiveStep}
                autoPlay={autoPlay}
            >
                <div className="flex flex-col xl:grid xl:grid-cols-3 gap-6">
                    <div className={`xl:col-span-1 ${getFocusClass('origins')}`}>
                        <div className="bg-indigo-900 dark:bg-slate-800 text-white p-6 rounded-xl flex flex-col justify-between h-full shadow-md">
                            <div>
                                <h3 className="text-xl font-bold text-amber-400 mb-4">¿De dónde nacen?</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2"><TrendingUp className="mt-1 w-4 h-4 text-indigo-300" /> Oportunidades de Negocio</li>
                                    <li className="flex items-start gap-2"><AlertTriangle className="mt-1 w-4 h-4 text-indigo-300" /> Problemas (Tecnología obsoleta)</li>
                                    <li className="flex items-start gap-2"><Target className="mt-1 w-4 h-4 text-indigo-300" /> Objetivos Estratégicos</li>
                                    <li className="flex items-start gap-2"><Shield className="mt-1 w-4 h-4 text-indigo-300" /> Requisitos Legales</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="xl:col-span-2 bg-background p-6 rounded-xl border border-border flex flex-col justify-between shadow-sm">
                        <div className={getFocusClass('analysis')}>
                            <h3 className="text-xl font-bold text-primary mb-4">Análisis de Viabilidad (Business Case)</h3>
                            <p className="text-text-muted mb-4">Antes de autorizar el proyecto (Project Charter), debemos ponerlo en la balanza:</p>
                        </div>

                        <div className={`flex flex-col sm:flex-row items-stretch gap-4 justify-center my-4 ${getFocusClass('balance')}`}>
                            <div className="bg-surface p-4 rounded shadow-md flex-1 text-center border-t-4 border-red-400 flex flex-col justify-center">
                                <h4 className="font-bold text-text-main">COSTES</h4>
                                <p className="text-xs text-text-muted mt-1">Económicos</p>
                                <p className="text-xs text-text-muted">Recursos</p>
                                <p className="text-xs text-text-muted">Riesgos</p>
                            </div>
                            <div className="text-2xl font-bold text-slate-400 self-center">VS</div>
                            <div className="bg-surface p-4 rounded shadow-md flex-1 text-center border-t-4 border-green-400 flex flex-col justify-center">
                                <h4 className="font-bold text-text-main">BENEFICIOS</h4>
                                <p className="text-xs text-text-muted mt-1">Ingresos (Cuantitativo)</p>
                                <p className="text-xs text-text-muted">Imagen de Marca (Cualitativo)</p>
                                <p className="text-xs text-text-muted">Posicionamiento</p>
                            </div>
                        </div>

                        <div className={`mt-6 ${getFocusClass('financials')}`}>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm text-blue-800 dark:text-blue-200 text-center border border-blue-100 dark:border-blue-900">
                                <strong>Tip Pro:</strong> Usa herramientas financieras como ROI (Retorno de Inversión) y VAN (Valor Actual Neto) para justificar la decisión.
                            </div>
                        </div>
                    </div>
                </div>
            </SlideContainer>
        </div>
    );
};

export default SlideOriginAndViability;
