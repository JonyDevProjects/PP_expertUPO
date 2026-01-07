import React from 'react';

interface TabMatrixProps {
    activeMatrixCell: { title: string; desc: string; color: string } | null;
    setActiveMatrixCell: (cell: { title: string; desc: string; color: string } | null) => void;
}

const TabMatrix: React.FC<TabMatrixProps> = ({ activeMatrixCell, setActiveMatrixCell }) => {
    return (
        <div className="animate-fade-in flex-1 flex flex-col min-h-0">
            <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between h-full w-full shadow-inner overflow-hidden">
                <div className="p-2 shrink-0">
                    <h3 className="text-center font-bold text-base mb-0 text-slate-800 dark:text-slate-200">Matriz de Procesos</h3>
                    <p className="text-center text-[10px] text-text-muted">Qué vs Cuándo.</p>
                </div>

                <div className="flex-1 overflow-auto p-2 scrollbar-thin">
                    <div className="min-w-[600px] h-full grid grid-cols-[120px_repeat(5,1fr)] auto-rows-fr gap-0.5 bg-border p-0.5 rounded text-[9px] select-none">
                        {/* Headers */}
                        <div className="bg-slate-200 dark:bg-slate-800 text-text-main p-1 font-bold flex items-center justify-center">Áreas / Grupos</div>
                        <div className="p-1 font-bold text-center bg-yellow-400 text-slate-900 flex items-center justify-center">Iniciación</div>
                        <div className="p-1 font-bold text-center bg-blue-500 text-white flex items-center justify-center">Planif.</div>
                        <div className="p-1 font-bold text-center bg-red-500 text-white flex items-center justify-center">Ejecución</div>
                        <div className="p-1 font-bold text-center bg-purple-500 text-white flex items-center justify-center">Control</div>
                        <div className="p-1 font-bold text-center bg-green-500 text-white flex items-center justify-center">Cierre</div>

                        {/* Content Rows */}
                        {[
                            {
                                name: '1. Integración', cells: [
                                    { g: 'init', has: true, desc: 'Desarrollar el Acta de Constitución de Proyecto(Project Charter)' },
                                    { g: 'plan', has: true, desc: 'Desarrollar el Plan para la Dirección del Proyecto' },
                                    { g: 'exec', has: true, desc: 'Dirigir y Gestionar el Trabajo del Proyecto.' },
                                    { g: 'ctrl', has: true, desc: '- Monitorear y Controlar el Trabajo del Proyecto.\n- Realizar el Control Integrado de Cambios.' },
                                    { g: 'close', has: true, desc: 'Cerrar Proyecto o Fase.' }
                                ]
                            },
                            {
                                name: '2. Alcance', cells: [
                                    { g: 'init', has: false },
                                    { g: 'plan', has: true, desc: '- Planificar la Gestion del Alcance.\n- Recopilar Requisito.\n- Definir el Alcance.\n- Crear la EDT' },
                                    { g: 'exec', has: false },
                                    { g: 'ctrl', has: true, desc: '- Validar el Alcance.\n- Controlar Alcance.' },
                                    { g: 'close', has: false }
                                ]
                            },
                            {
                                name: '3. Tiempo', cells: [
                                    { g: 'init', has: false },
                                    { g: 'plan', has: true, desc: '- Panificar la Gestión del Cronograma.\n- Definir las Actividades.\n- Secuenciar las Actividades.\n- Estimar los Recursos de las Actividades.\n- Estimar la Duración de las Actividades.\n- Desarrollar el Cronograma.' },
                                    { g: 'exec', has: false },
                                    { g: 'ctrl', has: true, desc: 'Controlar Cronograma.' },
                                    { g: 'close', has: false }
                                ]
                            },
                            {
                                name: '4. Coste', cells: [
                                    { g: 'init', has: false },
                                    { g: 'plan', has: true, desc: '- Planificar la Gestión de Costos.\n- Estimar los Costos.\n- Determinar el Presupuesto.' },
                                    { g: 'exec', has: false },
                                    { g: 'ctrl', has: true, desc: 'Controlar los Costos (EVM).' },
                                    { g: 'close', has: false }
                                ]
                            },
                            {
                                name: '5. Calidad', cells: [
                                    { g: 'init', has: false },
                                    { g: 'plan', has: true, desc: 'Planificar la Gestión de la Calidad.' },
                                    { g: 'exec', has: true, desc: 'Realizar el Aseguramiento de Calidad (QA).' },
                                    { g: 'ctrl', has: true, desc: 'Controlar la Calidad (QC).' },
                                    { g: 'close', has: false }
                                ]
                            },
                            {
                                name: '6. R.R.H.H', cells: [
                                    { g: 'init', has: false },
                                    { g: 'plan', has: true, desc: 'Planificar la Gestión de Recursos Humanos.' },
                                    { g: 'exec', has: true, desc: '- Adquirir el Equipo del Proyecto.\n- Desarrollar el Equipo del Proyecto.\n- Dirigir el Equipo del Proyecto.' },
                                    { g: 'ctrl', has: false },
                                    { g: 'close', has: false }
                                ]
                            },
                            {
                                name: '7. Comunicaciones', cells: [
                                    { g: 'init', has: false },
                                    { g: 'plan', has: true, desc: 'Planificar la Gestión de las Comunicaciones.' },
                                    { g: 'exec', has: true, desc: 'Gestionar las Comunicaciones.' },
                                    { g: 'ctrl', has: true, desc: 'Controlar las Comunicaciones.' },
                                    { g: 'close', has: false }
                                ]
                            },
                            {
                                name: '8. Riesgos', cells: [
                                    { g: 'init', has: false },
                                    { g: 'plan', has: true, desc: '- Planificar la Gestión de Riesgos.\n- Identificar los Riesgos.\n- Realizar el Análisis Cualitativo de Riesgos.\n- Realizar el Análisis Cuantitativo de Riesgos.\n- Planificar la Respuesta a los Riesgos' },
                                    { g: 'exec', has: false },
                                    { g: 'ctrl', has: true, desc: 'Controlar los Riesgos.' },
                                    { g: 'close', has: false }
                                ]
                            },
                            {
                                name: '9. Adquisiciones', cells: [
                                    { g: 'init', has: false },
                                    { g: 'plan', has: true, desc: 'Planificar la Gestión de las Adquisiciones del Proyecto.' },
                                    { g: 'exec', has: true, desc: 'Efectuar las Adquisiciones.' },
                                    { g: 'ctrl', has: true, desc: 'Controlar las Adquisiciones.' },
                                    { g: 'close', has: true, desc: 'Cerrar las Adquisiciones' }
                                ]
                            },
                            {
                                name: '10. Interesados', cells: [
                                    { g: 'init', has: true, desc: 'Identificar a los Interesados.' },
                                    { g: 'plan', has: true, desc: 'Planificar la Gestión de los Interesados.' },
                                    { g: 'exec', has: true, desc: 'Gestionar la Participación de los Interesados.' },
                                    { g: 'ctrl', has: true, desc: 'Contrlar la Participación de los Interesados.' },
                                    { g: 'close', has: false }
                                ]
                            },
                        ].map((row, i) => (
                            <React.Fragment key={i}>
                                <div className="bg-slate-100 dark:bg-slate-800 text-text-main p-1 font-semibold flex items-center leading-tight justify-center">{row.name}</div>
                                {row.cells.map((cell, j) => (
                                    <div
                                        key={j}
                                        onClick={() => cell.has && setActiveMatrixCell({ title: `${row.name}`, desc: cell.desc!, color: '' })}
                                        className={`flex items-center justify-center transition-all h-full w-full ${cell.has
                                            ? 'bg-white dark:bg-slate-700 cursor-pointer hover:scale-105 hover:shadow-lg text-slate-800 dark:text-slate-200 font-bold border border-transparent hover:border-blue-500'
                                            : 'bg-slate-50 dark:bg-slate-900/50 opacity-30 pointer-events-none'}`}
                                    >
                                        {cell.has && "●"}
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                {/* Detail Panel */}
                <div className="mt-2 bg-white dark:bg-slate-800 p-3 rounded-lg border-l-4 border-amber-400 h-auto min-h-[3.5rem] flex flex-col justify-center transition-colors duration-300 shrink-0 shadow-sm mx-2 mb-1">
                    <h4 className="font-bold text-amber-600 dark:text-amber-400 transition-colors text-xs md:text-sm">{activeMatrixCell ? activeMatrixCell.title : 'Selecciona una celda activa (●)'}</h4>
                    <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-300 transition-colors leading-snug whitespace-pre-line">{activeMatrixCell ? activeMatrixCell.desc : 'Haz clic sobre cualquier punto de color para ver el detalle del proceso.'}</p>
                </div>
            </div>
        </div>
    );
};

export default TabMatrix;
