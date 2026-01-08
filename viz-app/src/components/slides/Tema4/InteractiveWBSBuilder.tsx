import React, { useState } from 'react';
import { Trash2, AlertCircle, CheckCircle2, Package, FolderOpen, Layout, HelpCircle } from 'lucide-react';

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 ${className}`}>
        {children}
    </div>
);

const initialData = {
    id: 'root',
    name: 'Proyecto: Nueva App Móvil',
    type: 'project',
    percentage: 100,
    children: []
};

// Simulation States
const step1_Phases = {
    ...initialData,
    children: [
        { id: 'c1', name: '1. Gestión', type: 'phase', percentage: 20, children: [] },
        { id: 'c2', name: '2. Desarrollo', type: 'phase', percentage: 80, children: [] }
    ]
};

const step2_Packages = {
    ...step1_Phases,
    children: [
        step1_Phases.children[0],
        {
            ...step1_Phases.children[1],
            children: [
                { id: 'c2-1', name: '2.1 Backend', type: 'package', percentage: 50, children: [] },
                { id: 'c2-2', name: '2.2 Frontend', type: 'package', percentage: 50, children: [] }
            ]
        }
    ]
};

const step3_Error = {
    ...step2_Packages,
    children: [
        step1_Phases.children[0],
        {
            ...step2_Packages.children[1],
            children: [
                { id: 'c2-1', name: '2.1 Backend', type: 'package', percentage: 40, children: [] }, // Error: 40+50 = 90 != 100
                { id: 'c2-2', name: '2.2 Frontend', type: 'package', percentage: 50, children: [] }
            ]
        }
    ]
};

interface InteractiveWBSBuilderProps {
    simulationStep?: number;
}

export default function InteractiveWBSBuilder({ simulationStep = 0 }: InteractiveWBSBuilderProps) {
    const [treeData, setTreeData] = useState<any>(initialData);
    const [showGuide, setShowGuide] = useState(true);

    // Simulation Effect
    React.useEffect(() => {
        if (simulationStep === 0) setTreeData(initialData); // Empty Project
        if (simulationStep === 1) setTreeData(step1_Phases); // Add Phases
        if (simulationStep === 2) setTreeData(step2_Packages); // Add Packages
        if (simulationStep === 3) setTreeData(step3_Error); // Show Error
        if (simulationStep === 4) setTreeData(step2_Packages); // Fix Error
    }, [simulationStep]);

    const updateNodeName = (nodeId: string, newName: string, node: any = treeData): any => {
        if (node.id === nodeId) {
            return { ...node, name: newName };
        }
        if (node.children) {
            return {
                ...node,
                children: node.children.map((child: any) => updateNodeName(nodeId, newName, child))
            };
        }
        return node;
    };

    const updateNodePercentage = (nodeId: string, newPercentage: string, node: any = treeData): any => {
        if (node.id === nodeId) {
            return { ...node, percentage: parseInt(newPercentage) || 0 };
        }
        if (node.children) {
            return {
                ...node,
                children: node.children.map((child: any) => updateNodePercentage(nodeId, newPercentage, child))
            };
        }
        return node;
    };

    const addNode = (parentId: string, type: string, node: any = treeData): any => {
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
                children: node.children.map((child: any) => addNode(parentId, type, child))
            };
        }
        return node;
    };

    const deleteNode = (nodeId: string, node: any = treeData): any => {
        if (node.id === nodeId) return null;
        if (node.children) {
            return {
                ...node,
                children: node.children
                    .map((child: any) => deleteNode(nodeId, child))
                    .filter((child: any) => child !== null)
            };
        }
        return node;
    };

    const WBSNode = ({ node, level }: { node: any; parentTotalPercentage: number; level: number }) => {
        const hasChildren = node.children && node.children.length > 0;
        const childrenSum = node.children.reduce((acc: number, child: any) => acc + child.percentage, 0);
        const isBalanced = childrenSum === 100;
        const isLeaf = !hasChildren;
        const isError = !isLeaf && !isBalanced;

        return (
            <div className="flex flex-col items-center">
                <div className="relative group">
                    <div
                        className={`
              w-64 p-3 rounded-lg border-2 transition-all duration-300 relative bg-white dark:bg-slate-800
              ${isError ? 'border-rose-400 shadow-md shadow-rose-100 dark:shadow-rose-900/20' : 'border-slate-300 dark:border-slate-500 hover:border-blue-400 dark:hover:border-blue-500'}
              ${node.id === 'root' ? 'bg-slate-50 dark:bg-slate-900 border-slate-800 dark:border-slate-400 border-4' : ''}
            `}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                {node.type === 'project' && <Layout className="w-3 h-3" />}
                                {node.type === 'phase' && <FolderOpen className="w-3 h-3" />}
                                {node.type === 'package' && <Package className="w-3 h-3" />}
                                {node.type === 'project' ? 'PROYECTO' : node.type === 'phase' ? 'FASE / ENTREGABLE' : 'PAQUETE DE TRABAJO'}
                            </div>

                            {node.id !== 'root' && (
                                <button
                                    onClick={() => setTreeData((prev: any) => deleteNode(node.id, prev))}
                                    className="text-slate-300 hover:text-rose-500 transition-colors"
                                    title="Eliminar nodo"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        <input
                            type="text"
                            value={node.name}
                            onChange={(e) => setTreeData((prev: any) => updateNodeName(node.id, e.target.value, prev))}
                            className="w-full font-semibold text-slate-800 dark:text-slate-100 border-b border-transparent hover:border-slate-200 dark:hover:border-slate-700 focus:border-blue-500 focus:outline-none bg-transparent transition-colors mb-2"
                        />

                        {node.id !== 'root' && (
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Peso:</span>
                                <input
                                    type="number"
                                    min="0" max="100"
                                    value={node.percentage}
                                    onChange={(e) => setTreeData((prev: any) => updateNodePercentage(node.id, e.target.value, prev))}
                                    className={`w-16 p-1 rounded border text-center font-mono font-bold bg-white dark:bg-slate-700
                    ${node.percentage === 0 ? 'text-slate-300 dark:text-slate-500 border-slate-200 dark:border-slate-500' : 'text-blue-600 dark:text-blue-400 border-slate-300 dark:border-slate-500'}
                  `}
                                />
                                <span className="text-slate-500 dark:text-slate-400">% del padre</span>
                            </div>
                        )}

                        <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => setTreeData((prev: any) => addNode(node.id, 'phase', prev))}
                                className="flex-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 text-xs py-1 rounded flex items-center justify-center gap-1"
                                title="Añadir sub-entregable"
                            >
                                <FolderOpen className="w-3 h-3" /> Sub
                            </button>
                            <button
                                onClick={() => setTreeData((prev: any) => addNode(node.id, 'package', prev))}
                                className="flex-1 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-300 text-xs py-1 rounded flex items-center justify-center gap-1"
                                title="Añadir paquete de trabajo"
                            >
                                <Package className="w-3 h-3" /> WP
                            </button>
                        </div>

                        {!isLeaf && (
                            <div className={`absolute -right-3 -top-3 shadow-sm rounded-full p-1 bg-white dark:bg-slate-800
                ${isBalanced ? 'text-emerald-500' : 'text-rose-500 animate-pulse'}
              `}>
                                {isBalanced ? <CheckCircle2 className="w-6 h-6 fill-emerald-50 dark:fill-emerald-900/20" /> : <AlertCircle className="w-6 h-6 fill-rose-50 dark:fill-rose-900/20" />}
                            </div>
                        )}

                        {!isLeaf && (
                            <div className={`mt-2 text-xs text-center border-t border-slate-200 dark:border-slate-400 pt-1 font-mono
                ${isBalanced ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400 font-bold'}
              `}>
                                Suma Hijos: {childrenSum}% {isBalanced ? '✓' : '≠ 100%'}
                            </div>
                        )}

                    </div>

                    {hasChildren && (
                        <div className="absolute left-1/2 bottom-0 w-px h-8 bg-slate-300 dark:bg-slate-400 transform translate-y-full translate-x-[-50%]"></div>
                    )}
                </div>

                {hasChildren && (
                    <div className="mt-8 flex gap-8 items-start relative">
                        {node.children.length > 1 && (
                            <div className="absolute top-0 left-0 right-0 h-px bg-slate-300 dark:bg-slate-400 transform -translate-y-[1px]"
                                style={{
                                    left: `calc(${100 / (node.children.length * 2)}%)`,
                                    right: `calc(${100 / (node.children.length * 2)}%)`
                                }}>
                            </div>
                        )}

                        {node.children.map((child: any) => (
                            <div key={child.id} className="relative pt-4 flex flex-col items-center">
                                <div className="absolute top-0 w-px h-4 bg-slate-300 dark:bg-slate-400"></div>
                                <WBSNode node={child} parentTotalPercentage={node.percentage} level={level + 1} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 md:p-8 font-sans text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                            <Layout className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            Constructor WBS Interactivo
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                            Descompone el alcance y valida la <span className="font-bold text-slate-800 dark:text-slate-300">Regla del 100%</span>.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowGuide(!showGuide)}
                        className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg transition-colors"
                    >
                        <HelpCircle className="w-4 h-4" />
                        {showGuide ? 'Ocultar Guía' : 'Ver Guía'}
                    </button>
                </div>

                {showGuide && (
                    <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-700">
                        <div className="p-4">
                            <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2 text-sm">
                                <HelpCircle className="w-4 h-4" /> ¿Cómo usar esta herramienta?
                            </h4>
                            <div className="grid md:grid-cols-3 gap-4 text-xs text-slate-700 dark:text-slate-300">
                                <div>
                                    <strong className="block mb-1 text-slate-900 dark:text-white">1. Descomposición</strong>
                                    La WBS no es una lista de tareas, es una jerarquía de entregables. Usa los botones <FolderOpen className="w-3 h-3 inline" /> y <Package className="w-3 h-3 inline" /> que aparecen al pasar el mouse sobre una caja para añadir hijos.
                                </div>
                                <div>
                                    <strong className="block mb-1 text-slate-900 dark:text-white">2. La Regla del 100%</strong>
                                    La suma del trabajo de los niveles inferiores debe ser igual al 100% del trabajo del nivel superior. <span className="underline decoration-rose-400 decoration-2">Ni más, ni menos.</span>
                                </div>
                                <div>
                                    <strong className="block mb-1 text-slate-900 dark:text-white">3. Identifica Errores</strong>
                                    Si una caja padre tiene un borde <span className="text-rose-600 dark:text-rose-400 font-bold">ROJO</span>, significa que sus hijos no suman el 100%. Ajusta los porcentajes para corregirlo.
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                <div className="overflow-x-auto pb-12 cursor-grab active:cursor-grabbing border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-100 dark:bg-slate-800/50 shadow-inner min-h-[500px] flex justify-center p-8">
                    <WBSNode node={treeData} parentTotalPercentage={100} level={0} />
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-white dark:bg-slate-900 border-2 border-slate-800 dark:border-slate-400 rounded"></div>
                        <span>Proyecto (Raíz)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-500 rounded"></div>
                        <span>Entregable Correcto</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-white dark:bg-slate-800 border-2 border-rose-400 rounded shadow shadow-rose-200 dark:shadow-none"></div>
                        <span>Error de Alcance (≠100%)</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
