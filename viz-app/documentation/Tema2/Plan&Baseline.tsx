import React, { useState } from 'react';
import { 
  Book, 
  Anchor, 
  List, 
  Users, 
  FileText, 
  AlertCircle, 
  CheckCircle,
  TrendingUp,
  LayoutTemplate,
  ClipboardList
} from 'lucide-react';

const PlanProyectoMaster = () => {
  const [activeSection, setActiveSection] = useState('definicion');

  const sections = {
    definicion: {
      title: "1. El Plan de Proyecto",
      subtitle: "El Mapa de Gestión",
      icon: <Book className="w-6 h-6" />,
      color: "bg-indigo-600",
      content: (
        <div className="space-y-4">
          <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-600">
            <h3 className="font-bold text-indigo-900">Definición</h3>
            <p className="text-indigo-800 text-sm mt-1">
              Documento formal que define cómo se ejecuta, monitorea, controla y cierra el proyecto. 
              <span className="font-bold block mt-2">¡Requiere Aprobación Formal!</span>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow-sm border border-slate-200">
              <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><List size={16}/> Elementos Core</h4>
              <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                <li>Declaración de Alcance (Objetivos/Entregables)</li>
                <li>WBS/EDT (Responsabilidades, Calendario)</li>
                <li>Métricas (Líneas Base)</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded shadow-sm border border-slate-200">
              <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Users size={16}/> Recursos & Riesgos</h4>
              <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                <li>Personal Clave (Esfuerzo/Coste)</li>
                <li>Plan de Gestión de Riesgos</li>
                <li>Planes Auxiliares (Comunicación, Seguridad)</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    indice: {
      title: "2. Estructura del Documento",
      subtitle: "Índice Recomendado",
      icon: <LayoutTemplate className="w-6 h-6" />,
      color: "bg-teal-600",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-500 italic">Estructura estándar para garantizar la integridad del plan:</p>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-4 border-b md:border-b-0 md:border-r border-slate-100">
                <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 font-medium">
                  <li className="p-1 hover:bg-teal-50 rounded">INTRODUCCIÓN</li>
                  <li className="p-1 hover:bg-teal-50 rounded">OBJETIVOS DEL PROYECTO</li>
                  <li className="p-1 hover:bg-teal-50 rounded">ORGANIZACIÓN <span className="text-xs text-slate-400 font-normal block pl-5">(Org. Chart, Interesados, Funciones)</span></li>
                  <li className="p-1 hover:bg-teal-50 rounded">METODOLOGÍA DE GESTIÓN</li>
                  <li className="p-1 hover:bg-teal-50 rounded">PROGRAMA DE TRABAJO <span className="text-xs text-slate-400 font-normal block pl-5">(Alcance, Tareas, Recursos, Asignaciones)</span></li>
                </ol>
              </div>
              <div className="p-4">
                <ol start={6} className="list-decimal list-inside space-y-2 text-sm text-slate-700 font-medium">
                  <li className="p-1 hover:bg-teal-50 rounded">EVALUACIÓN DE RIESGOS</li>
                  <li className="p-1 hover:bg-teal-50 rounded">PLANES AUXILIARES</li>
                  <li className="p-1 hover:bg-teal-50 rounded">TEMAS ABIERTOS / DECISIONES</li>
                  <li className="p-1 hover:bg-teal-50 rounded">OTROS ASPECTOS</li>
                </ol>
                <div className="mt-4 p-3 bg-teal-50 text-teal-800 text-xs rounded border border-teal-200">
                  <strong>Reflexión PMP:</strong> ¿Cómo se alinean estos puntos con las Áreas de Conocimiento del PMBOK? (Alcance, Tiempo, Coste, etc.)
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    lineasbase: {
      title: "3. Líneas Base (Baselines)",
      subtitle: "El Ancla de Medición",
      icon: <Anchor className="w-6 h-6" />,
      color: "bg-rose-600",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-slate-600 mb-4">
              "Medición inicial de los indicadores que sirven como referencia para medir el avance."
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <span className="px-4 py-2 bg-slate-100 rounded-full font-bold text-slate-700 border border-slate-300">Alcance</span>
              <span className="px-4 py-2 bg-slate-100 rounded-full font-bold text-slate-700 border border-slate-300">Tiempo</span>
              <span className="px-4 py-2 bg-slate-100 rounded-full font-bold text-slate-700 border border-slate-300">Coste</span>
            </div>
          </div>

          <div className="bg-rose-50 p-4 rounded-lg border-l-4 border-rose-500">
            <h4 className="font-bold text-rose-800 flex items-center gap-2">
              <AlertCircle size={18}/> Gestión de Cambios (La Triple Restricción)
            </h4>
            <p className="text-sm text-rose-900 mt-2">
              Si se modifica el Alcance (añadir "algo pequeño"):
            </p>
            <ul className="mt-2 space-y-1 text-sm text-rose-800 ml-4 list-disc">
              <li>Debe haberse identificado esa posibilidad como <strong>Riesgo</strong>.</li>
              <li>Inevitablemente modificará el <strong>Tiempo</strong> (más plazo).</li>
              <li>Inevitablemente modificará el <strong>Coste</strong> (más recursos).</li>
            </ul>
          </div>
        </div>
      )
    },
    accion: {
      title: "4. Hoja de Ruta Práctica",
      subtitle: "Instrucciones para el Equipo",
      icon: <ClipboardList className="w-6 h-6" />,
      color: "bg-blue-600",
      content: (
        <div className="space-y-4">
          <div className="grid gap-3">
            <div className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-2 rounded text-blue-700 font-bold">1</div>
              <div>
                <h4 className="font-bold text-slate-800">Organización</h4>
                <p className="text-sm text-slate-600">Formar grupos. Asignar roles. Definir tarifa horaria por persona para costes.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-2 rounded text-blue-700 font-bold">2</div>
              <div>
                <h4 className="font-bold text-slate-800">EDT / WBS</h4>
                <p className="text-sm text-slate-600">Realizar la estructura basada en entregables definidos y el índice propuesto.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-2 rounded text-blue-700 font-bold">3</div>
              <div>
                <h4 className="font-bold text-slate-800">Cronograma</h4>
                <p className="text-sm text-slate-600">Considerar fecha de entrega final, pero también hitos intermedios (Informes de seguimiento).</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-2 rounded text-blue-700 font-bold">4</div>
              <div>
                <h4 className="font-bold text-slate-800">Documentación</h4>
                <p className="text-sm text-slate-600">Usar plantilla obligatoria: <em>“PP-T2-ANEXOS- I- Plantilla Plan de Proyecto”</em>.</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 font-sans text-slate-800 flex flex-col items-center">
      
      <div className="max-w-5xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex justify-center items-center gap-3">
            <FileText className="w-8 h-8 text-indigo-600"/>
            Plan Maestro del Proyecto
          </h1>
          <p className="text-slate-500 mt-2">Guía de estructura, líneas base y ejecución práctica</p>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(sections).map(([key, section]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 border-b-4 shadow-sm ${
                activeSection === key 
                  ? `bg-white ${section.color.replace('bg-', 'border-')} translate-y-1 shadow-inner` 
                  : 'bg-white border-transparent hover:bg-slate-50 hover:-translate-y-1'
              }`}
            >
              <div className={`mb-2 p-2 rounded-full ${activeSection === key ? section.color + ' text-white' : 'bg-slate-100 text-slate-500'}`}>
                {section.icon}
              </div>
              <span className={`font-bold text-sm ${activeSection === key ? 'text-slate-800' : 'text-slate-500'}`}>
                {section.title}
              </span>
            </button>
          ))}
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden min-h-[400px] relative">
          {/* Header Strip */}
          <div className={`${sections[activeSection].color} h-2 w-full`}></div>
          
          <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-lg ${sections[activeSection].color} bg-opacity-10 text-slate-700`}>
                {/* Clone icon with distinct color class if needed, or just use text color */}
                {React.cloneElement(sections[activeSection].icon, { className: `w-6 h-6 ${sections[activeSection].color.replace('bg-', 'text-')}` })}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{sections[activeSection].title}</h2>
                <p className="text-slate-500 font-medium">{sections[activeSection].subtitle}</p>
              </div>
            </div>

            <div className="mt-4">
              {sections[activeSection].content}
            </div>
          </div>
        </div>

        {/* Footer / Key Takeaways */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-200 p-4 rounded-lg text-center">
            <h5 className="font-bold text-slate-700 text-sm mb-1">Propósito</h5>
            <p className="text-xs text-slate-600">Reducir incertidumbre y proveer un mapa claro.</p>
          </div>
          <div className="bg-slate-200 p-4 rounded-lg text-center">
            <h5 className="font-bold text-slate-700 text-sm mb-1">Interesados</h5>
            <p className="text-xs text-slate-600">Su identificación temprana es vital para el éxito.</p>
          </div>
          <div className="bg-slate-200 p-4 rounded-lg text-center">
            <h5 className="font-bold text-slate-700 text-sm mb-1">Planes Auxiliares</h5>
            <p className="text-xs text-slate-600">Seguridad, Comunicación y Riesgos no son opcionales.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlanProyectoMaster;