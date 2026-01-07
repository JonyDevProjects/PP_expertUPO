import React, { useState } from 'react';
import { DollarSign, ShieldAlert, ShieldCheck, PieChart, RefreshCw, AlertCircle } from 'lucide-react';

const BudgetBuilder = () => {
  // Estado inicial de los bloques
  // Locations: 'inventory', 'baseline', 'management'
  const initialItems = [
    { id: 'act1', type: 'activity', label: 'Estimación Actividad A', cost: 5000, color: 'bg-blue-600' },
    { id: 'act2', type: 'activity', label: 'Estimación Actividad B', cost: 3000, color: 'bg-blue-600' },
    { id: 'cont1', type: 'contingency', label: 'Riesgo "Lluvia" (Contingencia)', cost: 1500, color: 'bg-yellow-600' },
    { id: 'mgmt1', type: 'management', label: 'Pandemia Global (Gestión)', cost: 10000, color: 'bg-red-600' },
  ];

  const [items, setItems] = useState(initialItems.map(i => ({ ...i, location: 'inventory' })));
  const [feedback, setFeedback] = useState({ msg: 'Arrastra los bloques a su zona correspondiente.', type: 'info' });
  const [draggedItem, setDraggedItem] = useState(null);

  // Totales
  const baselineTotal = items.filter(i => i.location === 'baseline').reduce((acc, i) => acc + i.cost, 0);
  const managementTotal = items.filter(i => i.location === 'management').reduce((acc, i) => acc + i.cost, 0);
  const totalBudget = baselineTotal + managementTotal;

  // Handlers para Drag & Drop HTML5
  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    // Hack para ocultar el elemento fantasma si se quisiera customizar, pero default está bien
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necesario para permitir el drop
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetZone) => {
    e.preventDefault();
    if (!draggedItem) return;

    validateAndMove(draggedItem, targetZone);
    setDraggedItem(null);
  };

  // Lógica de Validación PMP
  const validateAndMove = (item, targetZone) => {
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
        msg: 'Advertencia: Estos costes operativos suelen formar parte de la Línea Base.', 
        type: 'warning' 
      });
      // Permitimos moverlo pero con warning, o podríamos bloquearlo. 
      // Para efectos educativos, lo permitimos con advertencia visual.
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
    setItems(initialItems.map(i => ({ ...i, location: 'inventory' })));
    setFeedback({ msg: 'Simulación reiniciada.', type: 'info' });
  };

  // Renderizado de bloques
  const renderBlock = (item) => (
    <div
      key={item.id}
      draggable
      onDragStart={(e) => handleDragStart(e, item)}
      className={`
        ${item.color} text-white p-3 mb-2 rounded shadow-lg cursor-grab active:cursor-grabbing 
        flex items-center justify-between transform transition-transform hover:scale-105 select-none
        border-l-4 border-white/30
      `}
    >
      <div className="flex items-center gap-2">
        {item.type === 'activity' && <PieChart size={16}/>}
        {item.type === 'contingency' && <ShieldCheck size={16}/>}
        {item.type === 'management' && <ShieldAlert size={16}/>}
        <span className="font-medium text-sm">{item.label}</span>
      </div>
      <span className="font-mono text-xs bg-black/20 px-2 py-1 rounded">${item.cost}</span>
    </div>
  );

  // Estilos de feedback
  const getFeedbackStyle = () => {
    switch (feedback.type) {
      case 'error': return 'bg-red-900/50 border-red-500 text-red-200';
      case 'success': return 'bg-green-900/50 border-green-500 text-green-200';
      case 'warning': return 'bg-yellow-900/50 border-yellow-500 text-yellow-200';
      default: return 'bg-slate-700 border-slate-600 text-slate-300';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-slate-900 rounded-xl shadow-2xl font-sans text-slate-200">
      <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <DollarSign className="text-green-400"/> Constructor del Presupuesto
          </h2>
          <p className="text-sm text-slate-400">Arrastra los costes a la capa jerárquica correcta.</p>
        </div>
        <button onClick={reset} className="p-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors" title="Reiniciar">
          <RefreshCw size={20}/>
        </button>
      </div>

      {/* Área de Feedback */}
      <div className={`mb-6 p-4 rounded border-l-4 flex items-start gap-3 transition-all duration-300 ${getFeedbackStyle()}`}>
        <AlertCircle size={24} className="mt-0.5 flex-shrink-0"/>
        <div>
          <h4 className="font-bold text-sm uppercase opacity-80">{feedback.type === 'info' ? 'Instrucción' : feedback.type}</h4>
          <p className="font-medium">{feedback.msg}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 min-h-[500px]">
        
        {/* COLUMNA IZQUIERDA: INVENTARIO */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 h-full">
            <h3 className="text-slate-400 font-bold mb-4 uppercase text-xs tracking-wider">Estimaciones Disponibles</h3>
            <div className="space-y-2">
              {items.filter(i => i.location === 'inventory').map(renderBlock)}
              {items.filter(i => i.location === 'inventory').length === 0 && (
                <div className="text-center text-slate-600 italic py-10">Inventario vacío</div>
              )}
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: PILA DEL PRESUPUESTO */}
        <div className="w-full md:w-2/3 flex flex-col relative">
          
          {/* Contenedor: Presupuesto Total */}
          <div className="flex-1 bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-600 p-2 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-slate-600 text-xs px-2 py-1 rounded-bl text-white font-bold z-10">
              PRESUPUESTO DEL PROYECTO: ${totalBudget}
            </div>

            {/* ZONA 1: RESERVA DE GESTIÓN (Superior) */}
            <div 
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'management')}
              className={`
                flex-1 mb-2 rounded-lg p-4 border-2 transition-colors flex flex-col justify-end min-h-[150px]
                ${draggedItem?.type === 'management' ? 'bg-red-900/20 border-red-400/50' : 'bg-transparent border-transparent'}
              `}
            >
              <div className="space-y-1">
                {items.filter(i => i.location === 'management').map(renderBlock)}
              </div>
              <div className="mt-2 text-right text-red-300 text-xs font-bold border-t border-red-800/30 pt-1">
                Reserva de Gestión (Desconocidos-Desconocidos)
              </div>
            </div>

            {/* LÍNEA DIVISORIA DE AUTORIDAD */}
            <div className="relative h-6 w-full my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-dashed border-green-500"></div>
              </div>
              <div className="absolute inset-0 flex justify-center">
                <span className="bg-slate-900 px-3 text-green-400 text-xs font-bold uppercase border border-green-500 rounded-full">
                  Línea Base de Costos (Autoridad del PM)
                </span>
              </div>
            </div>

            {/* ZONA 2: LÍNEA BASE (Inferior) */}
            <div 
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'baseline')}
              className={`
                flex-grow-[2] rounded-lg p-4 border-2 transition-colors flex flex-col justify-end bg-slate-800
                ${(draggedItem?.type === 'activity' || draggedItem?.type === 'contingency') ? 'border-green-400/50 bg-green-900/10' : 'border-slate-700'}
              `}
            >
              {items.filter(i => i.location === 'baseline').length === 0 && (
                <div className="text-center text-slate-600 mb-auto mt-10">Arrastra aquí los costes operativos</div>
              )}
              
              <div className="space-y-1 w-full">
                {/* Visualmente ordenamos primero actividades, luego contingencia para efecto "Stack" */}
                {items.filter(i => i.location === 'baseline' && i.type === 'activity').map(renderBlock)}
                {items.filter(i => i.location === 'baseline' && i.type === 'contingency').map(renderBlock)}
              </div>
              
              <div className="mt-4 flex justify-between items-end border-t border-slate-600 pt-2">
                <span className="text-xs text-slate-400">Incluye Costes Directos + Reservas de Contingencia</span>
                <span className="text-xl font-bold text-green-400">${baselineTotal}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetBuilder;