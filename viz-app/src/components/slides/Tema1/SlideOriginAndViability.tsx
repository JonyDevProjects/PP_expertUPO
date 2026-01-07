
import { TrendingUp, AlertTriangle, Target, Shield } from 'lucide-react';
import SlideContainer from '../../shared/SlideContainer';

const SlideOriginAndViability = () => (
    <div className="animate-fade-in space-y-8">
        <SlideContainer
            title="El Génesis del Proyecto"
            ttsText="Los proyectos nacen de oportunidades de negocio o requisitos legales. Antes de aprobarse, se analiza su viabilidad mediante el Business Case, comparando costes y riesgos contra los beneficios esperados."
        >
            <div className="flex flex-col xl:grid xl:grid-cols-3 gap-6">
                <div className="xl:col-span-1 bg-indigo-900 dark:bg-slate-800 text-white p-6 rounded-xl flex flex-col justify-between">
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

                <div className="xl:col-span-2 bg-background p-6 rounded-xl border border-border">
                    <h3 className="text-xl font-bold text-primary mb-4">Análisis de Viabilidad (Business Case)</h3>
                    <p className="text-text-muted mb-4">Antes de autorizar el proyecto (Project Charter), debemos ponerlo en la balanza:</p>

                    <div className="flex flex-col sm:flex-row items-stretch gap-4 justify-center">
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

                    <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm text-blue-800 dark:text-blue-200 text-center">
                        <strong>Tip Pro:</strong> Usa herramientas financieras como ROI (Retorno de Inversión) y VAN (Valor Actual Neto) para justificar la decisión.
                    </div>
                </div>
            </div>
        </SlideContainer>
    </div>
);

export default SlideOriginAndViability;
