import { useState } from 'react';
import { DollarSign, ShieldAlert, ShieldCheck, PieChart, RefreshCw, AlertCircle, ArrowRight } from 'lucide-react';
import { Card } from '../../ui/Card';

interface BudgetItem {
    id: string;
    type: 'activity' | 'contingency' | 'management';
    label: string;
    cost: number;
    color: string;
    location: 'inventory' | 'baseline' | 'management';
}

const SlideBaseline = () => {
    // Estado inicial de los bloques
    const initialItems: BudgetItem[] = [
        { id: 'act1', type: 'activity', label: 'Estimación Actividad A', cost: 5000, color: 'bg-blue-600', location: 'inventory' },
        { id: 'act2', type: 'activity', label: 'Estimación Actividad B', cost: 3000, color: 'bg-blue-600', location: 'inventory' },
        { id: 'cont1', type: 'contingency', label: 'Riesgo "Lluvia" (Contingencia)', cost: 1500, color: 'bg-amber-600', location: 'inventory' },
        { id: 'mgmt1', type: 'management', label: 'Pandemia Global (Gestión)', cost: 10000, color: 'bg-rose-600', location: 'inventory' },
    ];

    const [items, setItems] = useState<BudgetItem[]>(initialItems);
    const [feedback, setFeedback] = useState({ msg: 'Arrastra los bloques a su zona correspondiente.', type: 'info' });
    const [draggedItem, setDraggedItem] = useState<BudgetItem | null>(null);

    // Totales
    const baselineTotal = items.filter(i => i.location === 'baseline').reduce((acc, i) => acc + i.cost, 0);
    const managementTotal = items.filter(i => i.location === 'management').reduce((acc, i) => acc + i.cost, 0);
    const totalBudget = baselineTotal + managementTotal;

    // Handlers para Drag & Drop HTML5
    const handleDragStart = (e: React.DragEvent, item: BudgetItem) => {
        setDraggedItem(item);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault(); // Necesario para permitir el drop
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, targetZone: 'baseline' | 'management') => {
        e.preventDefault();
        if (!draggedItem) return;

        validateAndMove(draggedItem, targetZone);
        setDraggedItem(null);
    };

    // Lógica de Validación PMP
    const validateAndMove = (item: BudgetItem, targetZone: 'baseline' | 'management') => {
        // Regla 1: Reserva de Gestión NO puede ir a Línea Base
        if (item.type === 'management' && targetZone === 'baseline') {
            setFeedback({
                msg: 'Error: El PM no tiene autoridad directa sobre esta reserva. Debe ir fuera de la Línea Base.',
                type: 'error'
            });
            return; // Bloquear movimiento
        }

        // Regla 2: Costes y Contingencias deberían ir a Línea Base (Recomendación)
        if ((item.type === 'activity' || item.type === 'contingency') && targetZone === 'management') {
            setFeedback({
                msg: 'Advertencia: Estos costes suelen formar parte de la Línea Base, aunque podría ser válido en casos raros.',
                type: 'warning'
            });
        } else if (targetZone === 'baseline') {
            setFeedback({
                msg: 'Correcto. Elemento añadido a la Línea Base de Costos.',
                type: 'success'
            });
        } else if (targetZone === 'management') {
            setFeedback({
                msg: 'Correcto. Reserva de Gestión añadida al Presupuesto Total.',
                type: 'success'
            });
        }

        // Actualizar estado
        setItems(prev => prev.map(i =>
            i.id === item.id ? { ...i, location: targetZone } : i
        ));
    };

    const reset = () => {
        setItems(initialItems);
        setFeedback({ msg: 'Simulación reiniciada.', type: 'info' });
    };

    // Renderizado de bloques
    const renderBlock = (item: BudgetItem) => (
        <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            className={`
        ${item.color} text-white p-3 mb-2 rounded shadow-md cursor-grab active:cursor-grabbing 
        flex items-center justify-between transform transition-transform hover:scale-102 select-none
        border-l-4 border-white/30 backdrop-blur-sm
      `}
        >
            <div className="flex items-center gap-2">
                {item.type === 'activity' && <PieChart size={16} />}
                {item.type === 'contingency' && <ShieldCheck size={16} />}
                {item.type === 'management' && <ShieldAlert size={16} />}
                <span className="font-medium text-xs md:text-sm">{item.label}</span>
            </div>
            <span className="font-mono text-xs bg-black/20 px-2 py-1 rounded ml-2">${item.cost}</span>
        </div>
    );

    // Estilos de feedback
    const getFeedbackStyle = () => {
        switch (feedback.type) {
            case 'error': return 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/40 dark:border-red-800 dark:text-red-300';
            case 'success': return 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/40 dark:border-emerald-800 dark:text-emerald-300';
            case 'warning': return 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/40 dark:border-amber-800 dark:text-amber-300';
            default: return 'bg-slate-100 border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300';
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg border-l-4 border-emerald-500">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-3 text-emerald-400">
                            <DollarSign className="w-8 h-8" />
                            Constructor del Presupuesto
                        </h2>
                        <p className="text-slate-300 mt-1">Arrastra los costes a la capa jerárquica correcta.</p>
                    </div>
                    <button onClick={reset} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700" title="Reiniciar">
                        <RefreshCw size={20} />
                    </button>
                </div>
            </div>

            {/* Área de Feedback */}
            <div className={`p-4 rounded-lg border-l-4 flex items-start gap-3 transition-all duration-300 ${getFeedbackStyle()}`}>
                <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
                <div>
                    <h4 className="font-bold text-sm uppercase opacity-90">{feedback.type === 'info' ? 'Instrucción' : feedback.type}</h4>
                    <p className="font-medium text-sm">{feedback.msg}</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 min-h-[500px]">

                {/* COLUMNA IZQUIERDA: INVENTARIO */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4">
                    <Card className="h-full bg-slate-50 dark:bg-slate-900 border-dashed">
                        <h3 className="text-slate-500 font-bold mb-4 uppercase text-xs tracking-wider flex items-center gap-2">
                            <ArrowRight size={14} /> Estimaciones Disponibles
                        </h3>
                        <div className="space-y-2">
                            {items.filter(i => i.location === 'inventory').map(renderBlock)}
                            {items.filter(i => i.location === 'inventory').length === 0 && (
                                <div className="text-center text-slate-400 italic py-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
                                    Inventario vacío
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                {/* COLUMNA DERECHA: PILA DEL PRESUPUESTO */}
                <div className="w-full lg:w-2/3 flex flex-col relative">

                    {/* Contenedor: Presupuesto Total */}
                    <div className="flex-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border-2 border-slate-300 dark:border-slate-600 p-3 flex flex-col relative overflow-hidden shadow-inner">
                        <div className="absolute top-0 right-0 bg-slate-700 text-xs px-3 py-1.5 rounded-bl-xl text-white font-bold z-10 shadow-md">
                            PRESUPUESTO DEL PROYECTO: ${totalBudget}
                        </div>

                        {/* ZONA 1: RESERVA DE GESTIÓN (Superior) */}
                        <div
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, 'management')}
                            className={`
                                flex-1 mb-4 rounded-lg p-4 border-2 transition-all flex flex-col justify-end min-h-[140px]
                                ${draggedItem?.type === 'management'
                                    ? 'bg-rose-50 border-rose-400 dark:bg-rose-900/20 shadow-inner'
                                    : 'bg-white/50 dark:bg-slate-700/30 border-dashed border-slate-300 dark:border-slate-600'}
                            `}
                        >
                            <div className="space-y-1">
                                {items.filter(i => i.location === 'management').map(renderBlock)}
                            </div>
                            <div className="mt-2 text-right text-rose-500 dark:text-rose-400 text-xs font-bold border-t border-rose-200 dark:border-rose-800/30 pt-2">
                                Reserva de Gestión (Desconocidos-Desconocidos)
                            </div>
                        </div>

                        {/* LÍNEA DIVISORIA DE AUTORIDAD */}
                        <div className="relative h-8 w-full mb-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t-2 border-dashed border-emerald-500"></div>
                            </div>
                            <div className="absolute inset-0 flex justify-center">
                                <span className="bg-slate-100 dark:bg-slate-800 px-4 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase border border-emerald-500 rounded-full py-1 shadow-sm z-10">
                                    Línea Base de Costos (Autoridad del PM)
                                </span>
                            </div>
                        </div>

                        {/* ZONA 2: LÍNEA BASE (Inferior) */}
                        <div
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, 'baseline')}
                            className={`
                                flex-grow-[2] rounded-lg p-4 border-2 transition-all flex flex-col justify-end
                                ${(draggedItem?.type === 'activity' || draggedItem?.type === 'contingency')
                                    ? 'bg-emerald-50 border-emerald-400 dark:bg-emerald-900/20 shadow-inner'
                                    : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-500'}
                            `}
                        >
                            {items.filter(i => i.location === 'baseline').length === 0 && (
                                <div className="text-center text-slate-400 mb-auto mt-10 p-8 border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-lg">
                                    <p className="text-sm">Arrastra aquí los costes operativos y contingencias</p>
                                </div>
                            )}

                            <div className="space-y-1 w-full">
                                {/* Visualmente ordenamos primero actividades, luego contingencia para efecto "Stack" */}
                                {items.filter(i => i.location === 'baseline' && i.type === 'activity').map(renderBlock)}
                                {items.filter(i => i.location === 'baseline' && i.type === 'contingency').map(renderBlock)}
                            </div>

                            <div className="mt-4 flex justify-between items-end border-t border-slate-200 dark:border-slate-600 pt-3">
                                <span className="text-xs text-slate-500 dark:text-slate-400">Incluye Costes Directos + Reservas de Contingencia</span>
                                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">${baselineTotal}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* SECCIÓN DE TEORÍA Y GUÍA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                {/* Teoría */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-200">
                        <span className="bg-slate-700 text-white w-6 h-6 rounded flex items-center justify-center text-xs">i</span>
                        Fundamentos Teóricos: Presupuesto
                    </h3>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-sm space-y-4 text-slate-600 dark:text-slate-400">
                        <p>
                            El proceso de <strong>Preparación del Presupuesto</strong> suma los costes estimados para establecer una <strong>Línea Base de Costos</strong> autorizada.
                        </p>
                        <ul className="list-disc pl-4 space-y-2">
                            <li>
                                <strong>Agregación de Costos:</strong> Actividad → Paquete de Trabajo → Cuenta de Control → Proyecto.
                            </li>
                            <li>
                                <strong>Reservas de Contingencia:</strong> Para "conocidos-desconocidos" (Riesgos identificados). <strong>SÍ forma parte de la Línea Base.</strong>
                            </li>
                            <li>
                                <strong>Reservas de Gestión:</strong> Para "desconocidos-desconocidos" (Imprevistos totales). <strong>NO forma parte de la Línea Base</strong>, pero se suma para el Presupuesto Total.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Guía de Uso */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-200">
                        <span className="bg-emerald-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
                        Guía de la Herramienta
                    </h3>
                    <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800/30 text-sm space-y-4 text-slate-600 dark:text-slate-400">
                        <p><strong>Objetivo:</strong> Construir el presupuesto correctamente clasificando los tipos de costes.</p>
                        <ol className="list-decimal pl-4 space-y-2">
                            <li>
                                Observa los bloques en el <strong>Inventario</strong> (Izquierda).
                            </li>
                            <li>
                                Arrástralos a la zona correspondiente en la <strong>Pila del Presupuesto</strong> (Derecha).
                                <ul className="list-disc pl-4 mt-1 opacity-80">
                                    <li>Zona Inferior: Línea Base (Costes directos y contingencias).</li>
                                    <li>Zona Superior: Reserva de Gestión (Solo para imprevistos mayores).</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Validación:</strong> Si intentas poner una Reserva de Gestión dentro de la Línea Base, el sistema te avisará que el Project Manager no tiene autoridad sobre ella.
                            </li>
                        </ol>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SlideBaseline;
