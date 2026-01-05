import { useState } from 'react';
import {
    Activity,
    GitPullRequest,
    ShieldCheck,
    CheckCircle,
    ArrowRight,
    AlertTriangle,
    FileText,
    Search,
    Database,
    ThumbsUp,
    XCircle,
    ClipboardCheck
} from 'lucide-react';
import SlideContainer from '../../shared/SlideContainer';

const SlideControl = () => {

    // --- WIDGET 1: CONTROL INTEGRADO DE CAMBIOS (CCB) ---
    const [ccbStep, setCcbStep] = useState<'request' | 'analyzing' | 'decided'>('request');
    const [ccbDecision, setCcbDecision] = useState<'approved' | 'rejected' | null>(null);

    const resetCcb = () => {
        setCcbStep('request');
        setCcbDecision(null);
    };

    const analyzeImpact = () => {
        // Simulating analysis delay
        setCcbStep('analyzing');
    };

    const makeDecision = (decision: 'approved' | 'rejected') => {
        setCcbDecision(decision);
        setCcbStep('decided');
    };

    // --- WIDGET 2: CALIDAD VS ALCANCE ---
    const [validationStep, setValidationStep] = useState(0);
    // 0: Entregable Bruto, 1: Control Calidad OK (Verificado), 2: Validar Alcance OK (Aceptado)

    // --- WIDGET 3: DATOS -> INFO -> REPORTES ---
    const [dataFlowStep, setDataFlowStep] = useState(0);

    return (
        <SlideContainer title="Monitoreo y Control: La Torre de Control" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                {/* --- SIMULADOR 1: CONTROL INTEGRADO DE CAMBIOS --- */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border-l-4 border-blue-600 overflow-hidden flex flex-col lg:col-span-2">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 border-b dark:border-slate-700 flex justify-between items-center">
                        <h3 className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                            <GitPullRequest className="w-5 h-5 text-blue-600" />
                            Simulador CCB (Control de Cambios)
                        </h3>
                        <div className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full font-semibold">
                            Proceso Clave PMP
                        </div>
                    </div>

                    <div className="p-6 flex flex-col md:flex-row gap-8 items-start">
                        {/* La Solicitud (Ticket) */}
                        <div className={`flex-1 bg-white dark:bg-slate-700 border-2 ${ccbDecision === 'approved' ? 'border-green-500' : ccbDecision === 'rejected' ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'} rounded-lg p-4 shadow-sm relative transition-all duration-300`}>
                            <div className="absolute -top-3 left-4 bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-300 text-xs px-2 py-0.5 rounded border border-slate-300 dark:border-slate-500 font-mono">
                                REQ-2025-001
                            </div>
                            <h4 className="font-bold text-slate-800 dark:text-white mt-2">Añadir Módulo de Pagos con Cripto</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4">Solicitante: Cliente Principal</p>

                            {ccbStep === 'request' && (
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-xs p-2 rounded border border-yellow-200 dark:border-yellow-800 flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 shrink-0" />
                                    <div>
                                        <strong>Regla de Oro:</strong> Nunca apruebes una solicitud sin analizar antes su impacto en la Triple Restricción.
                                    </div>
                                </div>
                            )}

                            {ccbStep === 'analyzing' && ccbDecision === null && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs p-2 rounded border border-blue-200 dark:border-blue-800 animate-in fade-in">
                                    <strong>Análisis de Impacto Realizado:</strong>
                                    <ul className="list-disc list-inside mt-1 ml-1">
                                        <li>Alcance: +2 Paquetes de trabajo</li>
                                        <li>Tiempo: +5 días (Ruta Crítica)</li>
                                        <li>Coste: +$3,500</li>
                                    </ul>
                                </div>
                            )}

                            {ccbStep === 'decided' && (
                                <div className={`text-xs p-2 rounded border font-bold text-center animate-in zoom-in ${ccbDecision === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'}`}>
                                    {ccbDecision === 'approved' ? 'SOLICITUD APROBADA' : 'SOLICITUD RECHAZADA'}
                                </div>
                            )}
                        </div>

                        {/* Panel de Control */}
                        <div className="flex-1 flex flex-col justify-center items-center gap-4 w-full">
                            {ccbStep === 'request' && (
                                <button
                                    onClick={analyzeImpact}
                                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                                >
                                    <Search className="w-5 h-5" /> 1. Analizar Impacto
                                </button>
                            )}

                            {ccbStep === 'analyzing' && (
                                <div className="flex gap-4 w-full">
                                    <button
                                        onClick={() => makeDecision('approved')}
                                        className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        <ThumbsUp className="w-5 h-5" /> Aprobar
                                    </button>
                                    <button
                                        onClick={() => makeDecision('rejected')}
                                        className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        <XCircle className="w-5 h-5" /> Rechazar
                                    </button>
                                </div>
                            )}

                            {ccbStep === 'decided' && (
                                <div className="w-full space-y-3">
                                    <p className="text-sm text-center text-slate-600 dark:text-slate-400">
                                        {ccbDecision === 'approved'
                                            ? "Acciones: Actualizar Línea Base de Alcance, Cronograma y Costes. Emitir Orden de Cambio."
                                            : "Acciones: Registrar en el Log de Cambios como rechazado y notificar al solicitante."}
                                    </p>
                                    <button
                                        onClick={resetCcb}
                                        className="w-full py-2 border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg font-bold transition-all"
                                    >
                                        Reiniciar Simulador
                                    </button>
                                </div>
                            )}

                            {/* Flow Arrow Visual */}
                            <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                                <span>Solicitud</span> <ArrowRight className="w-3 h-3" />
                                <span className={ccbStep !== 'request' ? 'font-bold text-blue-600 dark:text-blue-400' : ''}>Análisis</span> <ArrowRight className="w-3 h-3" />
                                <span className={ccbStep === 'decided' ? 'font-bold text-slate-800 dark:text-white' : ''}>Decisión</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- SIMULADOR 2: CALIDAD VS ALCANCE --- */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border-l-4 border-purple-600 overflow-hidden flex flex-col">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 border-b dark:border-slate-700">
                        <h3 className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-purple-600" />
                            Validación: Interna vs Externa
                        </h3>
                    </div>

                    <div className="p-6 flex-1 flex flex-col items-center justify-center">
                        <div className="w-full max-w-md relative mb-6">
                            {/* Progress Line */}
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-700 -z-0"></div>

                            <div className="flex justify-between relative z-10">
                                {/* Step 1: Deliverable */}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${validationStep >= 0 ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-500 text-purple-700 dark:text-purple-300' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-300 dark:text-slate-600'}`}>
                                    <Database className="w-5 h-5" />
                                </div>
                                {/* Step 2: Quality */}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${validationStep >= 1 ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-500 text-blue-700 dark:text-blue-300' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-300 dark:text-slate-600'}`}>
                                    <ClipboardCheck className="w-5 h-5" />
                                </div>
                                {/* Step 3: Scope */}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${validationStep >= 2 ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-300 dark:text-slate-600'}`}>
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                            </div>
                        </div>

                        {/* Interactive Area */}
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 w-full text-center min-h-[140px] flex flex-col items-center justify-center">
                            {validationStep === 0 && (
                                <>
                                    <p className="font-bold text-slate-700 dark:text-white mb-2">Paso 1: Entregable Generado</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-300 mb-4">El equipo ha terminado el trabajo. ¿Está listo para el cliente? ¡No todavía!</p>
                                    <button onClick={() => setValidationStep(1)} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                                        Ejecutar Control de Calidad
                                    </button>
                                </>
                            )}
                            {validationStep === 1 && (
                                <>
                                    <p className="font-bold text-blue-700 dark:text-blue-300 mb-2">Paso 2: Entregable Verificado</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-300 mb-4">
                                        Inspección Interna OK. Cumple requisitos técnicos. <br />
                                        <em>(Salida de "Controlar la Calidad")</em>
                                    </p>
                                    <button onClick={() => setValidationStep(2)} className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition">
                                        Presentar al Cliente (Validar Alcance)
                                    </button>
                                </>
                            )}
                            {validationStep === 2 && (
                                <>
                                    <p className="font-bold text-green-700 dark:text-green-300 mb-2">Paso 3: Entregable Aceptado</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-300 mb-4">
                                        El Cliente ha dado su visto bueno formal. <br />
                                        <em>(Salida de "Validar el Alcance")</em>
                                    </p>
                                    <button onClick={() => setValidationStep(0)} className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 underline">
                                        Reiniciar ciclo
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- SIMULADOR 3: FLUJO DE DATOS --- */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border-l-4 border-orange-500 overflow-hidden flex flex-col">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 border-b dark:border-slate-700">
                        <h3 className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-orange-500" />
                            Refinería de Datos (DIKW)
                        </h3>
                    </div>

                    <div className="p-6 flex-1">
                        <div className="flex flex-col space-y-4">
                            {/* Level 1: Data */}
                            <div
                                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${dataFlowStep === 0 ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 shadow-md scale-105' : 'border-slate-100 dark:border-slate-700 opacity-60'}`}
                                onClick={() => setDataFlowStep(0)}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-sm text-slate-700 dark:text-slate-200">1. Datos de Desempeño (WPD)</span>
                                    <Database className="w-4 h-4 text-orange-500" />
                                </div>
                                {dataFlowStep === 0 && (
                                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 animate-in fade-in">
                                        La materia prima. Hechos observados.<br />
                                        <em>Ej: "La tarea A terminó en 5 días."</em>
                                    </p>
                                )}
                            </div>

                            {/* Level 2: Information */}
                            <div
                                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${dataFlowStep === 1 ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-md scale-105' : 'border-slate-100 dark:border-slate-700 opacity-60'}`}
                                onClick={() => setDataFlowStep(1)}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-sm text-slate-700 dark:text-slate-200">2. Información de Desempeño (WPI)</span>
                                    <Search className="w-4 h-4 text-blue-500" />
                                </div>
                                {dataFlowStep === 1 && (
                                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 animate-in fade-in">
                                        Datos analizados vs Plan.<br />
                                        <em>Ej: "SPI = 0.8. Vamos con 1 día de retraso."</em>
                                    </p>
                                )}
                            </div>

                            {/* Level 3: Reports */}
                            <div
                                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${dataFlowStep === 2 ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 shadow-md scale-105' : 'border-slate-100 dark:border-slate-700 opacity-60'}`}
                                onClick={() => setDataFlowStep(2)}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-sm text-slate-700 dark:text-slate-200">3. Informes de Desempeño (WPR)</span>
                                    <FileText className="w-4 h-4 text-purple-500" />
                                </div>
                                {dataFlowStep === 2 && (
                                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 animate-in fade-in">
                                        Información formateada para stakeholders.<br />
                                        <em>Ej: Dashboard de Estado Semanal.</em>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* THEORY & GUIDE SECTION */}
            <section className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mt-8">
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                    <span className="bg-slate-700 text-white w-6 h-6 rounded flex items-center justify-center text-xs">i</span>
                    Fundamentos Teóricos: Monitoreo y Control
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 dark:text-slate-400">
                    <div>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                <strong>Control Integrado de Cambios:</strong> El "cuello de botella" necesario. Evalúa el impacto de CUALQUIER cambio en Tiempo, Coste, Alcance y Riesgos antes de aprobarlo.
                            </li>
                            <li>
                                <strong>Validar el Alcance:</strong> ¡Importante diferencia! Control de Calidad es interno (¿Funciona bien?). Validar Alcance es externo con el cliente (¿Es lo que pedí? &rarr; Aceptación Formal).
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                <strong>Datos vs Información:</strong>
                                <ul className="list-none pl-4 mt-1 space-y-1 text-xs">
                                    <li><em>Datos de Desempeño (WPD):</em> La materia prima. Hechos observados (Nivel 1).</li>
                                    <li><em>Información de Desempeño (WPI):</em> Datos analizados vs Plan (Nivel 2).</li>
                                    <li><em>Informes de Desempeño (WPR):</em> Documentos físicos/digitales para comunicar (Nivel 3).</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-2">💡 Guía de Uso Interactivo</h4>
                    <ul className="list-disc list-inside text-xs text-slate-500 dark:text-slate-400 space-y-1">
                        <li><strong>Simulador CCB:</strong> Actúa como el Comité de Control de Cambios. Analiza el impacto, y decide si aprobar o rechazar la solicitud de cambio.</li>
                        <li><strong>Validación:</strong> Sigue el flujo desde que el equipo termina el trabajo hasta que el cliente lo acepta. Observa la diferencia entre "Verificado" (Calidad) y "Aceptado" (Alcance).</li>
                        <li><strong>Refinería DIKW:</strong> Haz clic en cada nivel (1, 2, 3) para ver cómo los datos brutos se transforman en informes útiles para la toma de decisiones.</li>
                    </ul>
                </div>
            </section>
        </SlideContainer>
    );
};

export default SlideControl;
