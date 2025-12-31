
import SlideContainer from '../shared/SlideContainer';

const SlidePublicContracting = () => (
    <div className="animate-fade-in space-y-8">
        <SlideContainer title="Contratación del Sector Público">
            <div className="flex flex-col xl:grid xl:grid-cols-2 gap-8">
                {/* Tipos de Contrato */}
                <div className="space-y-4">
                    <h3 className="font-bold text-text-main border-b border-border pb-2">Tipos de Contrato</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 bg-orange-50 dark:bg-orange-900/20 p-4 rounded border border-orange-200 dark:border-orange-800">
                            <h4 className="font-bold text-orange-800 dark:text-orange-200">Suministro</h4>
                            <p className="text-xs mt-1 text-text-muted">Adquisición de bienes, equipos o software estándar (Off-the-shelf).</p>
                        </div>
                        <div className="flex-1 bg-blue-50 dark:bg-blue-900/20 p-4 rounded border border-blue-200 dark:border-blue-800">
                            <h4 className="font-bold text-blue-800 dark:text-blue-200">Servicios</h4>
                            <p className="text-xs mt-1 text-text-muted">Actividades para obtener un resultado, desarrollo a medida.</p>
                        </div>
                    </div>
                </div>

                {/* Procedimientos */}
                <div className="space-y-4">
                    <h3 className="font-bold text-text-main border-b border-border pb-2">Procedimientos de Adjudicación</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex justify-between items-center bg-background p-2 rounded">
                            <span className="text-text-main"><strong>Menor:</strong> &lt; 40k€ (Obra) / 15k€ (Otros)</span>
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 text-xs rounded">Directo</span>
                        </li>
                        <li className="flex justify-between items-center bg-background p-2 rounded">
                            <span className="text-text-main"><strong>Negociado:</strong> Se pacta con candidatos.</span>
                            <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 text-xs rounded">Sin publicidad</span>
                        </li>
                        <li className="flex justify-between items-center bg-background p-2 rounded">
                            <span className="text-text-main"><strong>Abierto:</strong> Cualquiera se presenta.</span>
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 text-xs rounded">Público</span>
                        </li>
                        <li className="flex justify-between items-center bg-background p-2 rounded">
                            <span className="text-text-main"><strong>Restringido:</strong> Solo invitados participan.</span>
                            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 text-xs rounded">Selectivo</span>
                        </li>
                    </ul>
                </div>
            </div>
        </SlideContainer>
    </div>
);

export default SlidePublicContracting;
