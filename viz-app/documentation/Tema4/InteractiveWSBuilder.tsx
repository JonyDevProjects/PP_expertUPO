import React, { useState, useEffect } from 'react';
import { Plus, Trash2, AlertCircle, CheckCircle2, ChevronDown, ChevronRight, HelpCircle, Layout, Package, FolderOpen } from 'lucide-react';

/**
 * InteractiveWBSBuilder
 * * Una herramienta educativa para entender la descomposición del alcance y la Regla del 100%.
 * Permite construir un árbol jerárquico y valida matemáticamente que los hijos sumen el 100% del padre.
 */

// --- Componentes UI Básicos ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = "neutral", className = "" }) => {
  const variants = {
    neutral: "bg-slate-100 text-slate-700",
    success: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    error: "bg-rose-100 text-rose-800 border border-rose-200",
    warning: "bg-amber-100 text-amber-800 border border-amber-200",
  };
  return (
    <span className={`px-2 py-0.5 rounded-md text-xs font-medium flex items-center gap-1 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// --- Lógica del Árbol ---

const initialData = {
  id: 'root',
  name: 'Proyecto: Nueva App Móvil',
  type: 'project',
  percentage: 100, // El proyecto raíz siempre es 100% de sí mismo
  children: [
    {
      id: 'c1',
      name: '1. Gestión',
      type: 'phase',
      percentage: 20,
      children: []
    },
    {
      id: 'c2',
      name: '2. Desarrollo',
      type: 'phase',
      percentage: 50, // Intencionalmente erróneo para demo (falta 30%)
      children: [
        {
          id: 'c2-1',
          name: '2.1 Backend',
          type: 'package',
          percentage: 50,
          children: []
        },
        {
          id: 'c2-2',
          name: '2.2 Frontend',
          type: 'package',
          percentage: 50,
          children: []
        }
      ]
    }
  ]
};

export default function InteractiveWBSBuilder() {
  const [treeData, setTreeData] = useState(initialData);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [showGuide, setShowGuide] = useState(true);

  // --- Funciones de Manipulación del Árbol ---

  const updateNodeName = (nodeId, newName, node = treeData) => {
    if (node.id === nodeId) {
      return { ...node, name: newName };
    }
    if (node.children) {
      return {
        ...node,
        children: node.children.map(child => updateNodeName(nodeId, newName, child))
      };
    }
    return node;
  };

  const updateNodePercentage = (nodeId, newPercentage, node = treeData) => {
    if (node.id === nodeId) {
      return { ...node, percentage: parseInt(newPercentage) || 0 };
    }
    if (node.children) {
      return {
        ...node,
        children: node.children.map(child => updateNodePercentage(nodeId, newPercentage, child))
      };
    }
    return node;
  };

  const addNode = (parentId, type, node = treeData) => {
    if (node.id === parentId) {
      const newNode = {
        id: Math.random().toString(36).substr(2, 9),
        name: type === 'phase' ? 'Nueva Fase' : 'Nuevo Entregable',
        type: type,
        percentage: 0,
        children: []
      };
      return { ...node, children: [...node.children, newNode] };
    }
    if (node.children) {
      return {
        ...node,
        children: node.children.map(child => addNode(parentId, type, child))
      };
    }
    return node;
  };

  const deleteNode = (nodeId, node = treeData) => {
    if (node.id === nodeId) return null; // No debería suceder para root
    if (node.children) {
      return {
        ...node,
        children: node.children
          .map(child => deleteNode(nodeId, child))
          .filter(child => child !== null)
      };
    }
    return node;
  };

  // --- Renderizado Recursivo de Nodos ---

  const WBSNode = ({ node, parentTotalPercentage, level }) => {
    const hasChildren = node.children && node.children.length > 0;
    
    // Cálculo de la Regla del 100%
    const childrenSum = node.children.reduce((acc, child) => acc + child.percentage, 0);
    const isBalanced = childrenSum === 100;
    const isLeaf = !hasChildren;
    
    // Estado del nodo actual
    const isError = !isLeaf && !isBalanced;
    
    return (
      <div className="flex flex-col items-center">
        {/* Nodo Visual */}
        <div className="relative group">
          <div 
            className={`
              w-64 p-3 rounded-lg border-2 transition-all duration-300 relative bg-white
              ${isError ? 'border-rose-400 shadow-md shadow-rose-100' : 'border-slate-300 hover:border-blue-400'}
              ${node.id === 'root' ? 'bg-slate-50 border-slate-800 border-4' : ''}
            `}
          >
            {/* Header del Nodo: Tipo e Icono */}
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                {node.type === 'project' && <Layout className="w-3 h-3" />}
                {node.type === 'phase' && <FolderOpen className="w-3 h-3" />}
                {node.type === 'package' && <Package className="w-3 h-3" />}
                {node.type === 'project' ? 'PROYECTO' : node.type === 'phase' ? 'FASE / ENTREGABLE' : 'PAQUETE DE TRABAJO'}
              </div>
              
              {node.id !== 'root' && (
                <button 
                  onClick={() => setTreeData(prev => deleteNode(node.id, prev))}
                  className="text-slate-300 hover:text-rose-500 transition-colors"
                  title="Eliminar nodo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Input Nombre */}
            <input 
              type="text" 
              value={node.name}
              onChange={(e) => setTreeData(prev => updateNodeName(node.id, e.target.value, prev))}
              className="w-full font-semibold text-slate-800 border-b border-transparent hover:border-slate-200 focus:border-blue-500 focus:outline-none bg-transparent transition-colors mb-2"
            />

            {/* Input Porcentaje (Solo si no es root) */}
            {node.id !== 'root' && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">Peso:</span>
                <input 
                  type="number" 
                  min="0" max="100"
                  value={node.percentage}
                  onChange={(e) => setTreeData(prev => updateNodePercentage(node.id, e.target.value, prev))}
                  className={`w-16 p-1 rounded border text-center font-mono font-bold
                    ${node.percentage === 0 ? 'text-slate-300' : 'text-blue-600'}
                  `}
                />
                <span className="text-slate-500">% del padre</span>
              </div>
            )}

            {/* Botones de Acción (Añadir hijos) */}
            <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button 
                onClick={() => setTreeData(prev => addNode(node.id, 'phase', prev))}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs py-1 rounded flex items-center justify-center gap-1"
                title="Añadir sub-entregable"
              >
                <FolderOpen className="w-3 h-3" /> Sub
              </button>
              <button 
                onClick={() => setTreeData(prev => addNode(node.id, 'package', prev))}
                className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs py-1 rounded flex items-center justify-center gap-1"
                title="Añadir paquete de trabajo"
              >
                <Package className="w-3 h-3" /> WP
              </button>
            </div>

            {/* Indicador de Error de la Regla del 100% */}
            {!isLeaf && (
              <div className={`absolute -right-3 -top-3 shadow-sm rounded-full bg-white p-1
                ${isBalanced ? 'text-emerald-500' : 'text-rose-500 animate-pulse'}
              `}>
                 {isBalanced ? <CheckCircle2 className="w-6 h-6 fill-emerald-50" /> : <AlertCircle className="w-6 h-6 fill-rose-50" />}
              </div>
            )}
            
            {/* Resumen de hijos */}
            {!isLeaf && (
              <div className={`mt-2 text-xs text-center border-t pt-1 font-mono
                ${isBalanced ? 'text-emerald-600' : 'text-rose-600 font-bold'}
              `}>
                Suma Hijos: {childrenSum}% {isBalanced ? '✓' : '≠ 100%'}
              </div>
            )}

          </div>

          {/* Línea conectora vertical hacia abajo */}
          {hasChildren && (
            <div className="absolute left-1/2 bottom-0 w-px h-8 bg-slate-300 transform translate-y-full translate-x-[-50%]"></div>
          )}
        </div>

        {/* Contenedor de Hijos */}
        {hasChildren && (
          <div className="mt-8 flex gap-8 items-start relative">
             {/* Línea conectora horizontal superior para unir a los hermanos */}
             {node.children.length > 1 && (
                <div className="absolute top-0 left-0 right-0 h-px bg-slate-300 transform -translate-y-[1px]" 
                     style={{ 
                       left: `calc(${100 / (node.children.length * 2)}%)`, 
                       right: `calc(${100 / (node.children.length * 2)}%)` 
                     }}>
                </div>
             )}
             
            {node.children.map((child, index) => (
              <div key={child.id} className="relative pt-4 flex flex-col items-center">
                 {/* Línea conectora vertical pequeña desde la barra horizontal al hijo */}
                 <div className="absolute top-0 w-px h-4 bg-slate-300"></div>
                 <WBSNode node={child} parentTotalPercentage={node.percentage} level={level + 1} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Layout className="w-8 h-8 text-blue-600" />
              Constructor WBS Interactivo
            </h1>
            <p className="text-slate-500 mt-1">
              Descompone el alcance y valida la <span className="font-bold text-slate-700">Regla del 100%</span>.
            </p>
          </div>
          
          <button 
            onClick={() => setShowGuide(!showGuide)}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium bg-blue-50 px-4 py-2 rounded-lg transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            {showGuide ? 'Ocultar Guía' : 'Ver Guía Pedagógica'}
          </button>
        </div>

        {/* Guía Pedagógica */}
        {showGuide && (
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
            <div className="p-6">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5" /> ¿Cómo usar esta herramienta?
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-blue-800">
                <div>
                  <strong className="block mb-1 text-blue-900">1. Descomposición</strong>
                  La WBS no es una lista de tareas, es una jerarquía de entregables. Usa los botones <FolderOpen className="w-3 h-3 inline"/> y <Package className="w-3 h-3 inline"/> que aparecen al pasar el mouse sobre una caja para añadir hijos.
                </div>
                <div>
                  <strong className="block mb-1 text-blue-900">2. La Regla del 100%</strong>
                  La suma del trabajo de los niveles inferiores debe ser igual al 100% del trabajo del nivel superior. <span className="underline decoration-rose-400 decoration-2">Ni más, ni menos.</span>
                </div>
                <div>
                  <strong className="block mb-1 text-blue-900">3. Identifica Errores</strong>
                  Si una caja padre tiene un borde <span className="text-rose-600 font-bold">ROJO</span>, significa que sus hijos no suman el 100%. Ajusta los porcentajes para corregirlo.
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Zona de Trabajo (Canvas) */}
        <div className="overflow-x-auto pb-12 cursor-grab active:cursor-grabbing border border-slate-200 rounded-xl bg-slate-100 shadow-inner min-h-[600px] flex justify-center p-8">
            <WBSNode node={treeData} parentTotalPercentage={100} level={0} />
        </div>

        {/* Leyenda Footer */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white border-2 border-slate-800 rounded"></div>
            <span>Proyecto (Raíz)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white border border-slate-300 rounded"></div>
            <span>Entregable Correcto</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white border-2 border-rose-400 rounded shadow shadow-rose-200"></div>
            <span>Error de Alcance (≠100%)</span>
          </div>
        </div>

      </div>
    </div>
  );
}