import React, { useState } from 'react';
import { 
  Layout, 
  Clock, 
  DollarSign, 
  Users, 
  ShieldAlert, 
  MessageSquare, 
  GitMerge, 
  Briefcase,
  CheckSquare,
  BarChart2,
  AlertTriangle
} from 'lucide-react';

const PlanificacionDetallada = () => {
  const [activeTab, setActiveTab] = useState('alcance');

  const tabs = {
    alcance: {
      title: "1. Alcance y EDT (WBS)",
      icon: <Layout className="w-6 h-6" />,
      color: "bg-blue-600",
      lightColor: "bg-blue-50",
      borderColor: "border-blue-600",
      textColor: "text-blue-700",
      content: {
        headline: "Define el 'Qué' antes del 'Cuándo'",
        points: [
          { title: "Gestión del Alcance", text: "Recopilar requisitos y definir detalladamente qué incluye (y qué no) el proyecto." },
          { title: "La EDT (WBS)", text: "Herramienta crítica 'Divide y Vencerás'. Descompone el proyecto en entregables manejables, no solo tareas." },
          { title: "Tipos de Tareas", text: "Incluye tareas de desarrollo, gestión, administrativas y de soporte." }
        ]
      }
    },
    tiempocoste: {
      title: "2. Tiempo y Coste",
      icon: <BarChart2 className="w-6 h-6" />,
      color: "bg-green-600",
      lightColor: "bg-green-50",
      borderColor: "border-green-600",
      textColor: "text-green-700",
      content: {
        headline: "Las restricciones duras",
        points: [
          { title: "Secuencia Lógica", text: "Definir actividades, dependencias y duración para crear el Cronograma (Hitos y Plazos)." },
          { title: "Presupuesto", text: "Estimar costes por paquete de trabajo para crear la Línea Base de Coste." },
          { title: "Ley de la Calidad", text: "Una estimación de calidad es prerrequisito para un proyecto de calidad." }
        ]
      }
    },
    rrhh: {
      title: "3. RRHH y Equipo",
      icon: <Users className="w-6 h-6" />,
      color: "bg-purple-600",
      lightColor: "bg-purple-50",
      borderColor: "border-purple-600",
      textColor: "text-purple-700",
      content: {
        headline: "¿Quién hará el trabajo?",
        points: [
          { title: "Definición", text: "Crear el Organigrama y matriz de Roles y Responsabilidades." },
          { title: "Ciclo de Vida", text: "Determinar -> Adquirir (interno/externo) -> Mantener -> Liberar." },
          { title: "Objetivo", text: "Conseguir a los mejores profesionales y optimizar su uso." }
        ]
      }
    },
    riesgos: {
      title: "4. Gestión de Riesgos",
      icon: <ShieldAlert className="w-6 h-6" />,
      color: "bg-red-600",
      lightColor: "bg-red-50",
      borderColor: "border-red-600",
      textColor: "text-red-700",
      content: {
        headline: "Anticiparse a lo desconocido",
        points: [
          { title: "Análisis", text: "Identificación cualitativa (probabilidad/impacto) y cuantitativa." },
          { title: "4 Estrategias de Respuesta", text: "Evitar, Transferir, Mitigar o Aceptar." },
          { title: "Planificación", text: "No solo identificar, sino presupuestar las respuestas." }
        ]
      }
    },
    soporte: {
      title: "5. Planes de Soporte",
      icon: <Briefcase className="w-6 h-6" />,
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      borderColor: "border-orange-500",
      textColor: "text-orange-700",
      content: {
        headline: "La logística necesaria",
        points: [
          { title: "Calidad", text: "Definir estándares. Planificar pruebas y métricas." },
          { title: "Comunicaciones", text: "¿Quién necesita qué información, cuándo y cómo?" },
          { title: "Adquisiciones", text: "Planificar compras externas, contratos y logística." }
        ]
      }
    },
    integracion: {
      title: "6. Interesados e Integración",
      icon: <GitMerge className="w-6 h-6" />,
      color: "bg-slate-700",
      lightColor: "bg-slate-100",
      borderColor: "border-slate-700",
      textColor: "text-slate-800",
      content: {
        headline: "El Gobierno del Proyecto",
        points: [
          { title: "Interesados", text: "Analizar Influencia vs Impacto. Estrategia: Atraer a los negativos, Fidelizar a los positivos." },
          { title: "Integración", text: "Coordinar todos los planes anteriores en un único Plan para la Dirección del Proyecto." },
          { title: "Ejecución y Control", text: "Definir cómo se supervisará y cerrará el trabajo." }
        ]
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Planificación Detallada del Proyecto</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Una vez aprobado el Charter, entramos en el "Cómo". Estas son las tareas críticas para construir un Plan de Proyecto sólido.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {Object.entries(tabs).map(([key, tab]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-300 border-l-4 shadow-sm hover:shadow-md ${
                  activeTab === key 
                    ? `${tab.lightColor} ${tab.textColor} ${tab.borderColor} translate-x-2` 
                    : 'bg-white text-slate-600 border-transparent hover:bg-slate-50'
                }`}
              >
                <div className={`${activeTab === key ? tab.textColor : 'text-slate-400'}`}>
                  {tab.icon}
                </div>
                <span className="font-bold text-sm md:text-base">{tab.title}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-8 h-full transition-all duration-500 animate-in fade-in slide-in-from-right-4"
                 style={{ borderColor: tabs[activeTab].color.replace('bg-', 'var(--tw-bg-opacity)') }}> {/* Hack for tailwind color map */}
              
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 ${tabs[activeTab].lightColor} ${tabs[activeTab].textColor}`}>
                Área de Conocimiento
              </div>
              
              <h2 className={`text-3xl font-bold mb-2 ${tabs[activeTab].textColor}`}>
                {tabs[activeTab].title}
              </h2>
              <p className="text-xl text-slate-500 font-light italic mb-8 border-b pb-4">
                "{tabs[activeTab].content.headline}"
              </p>

              <div className="space-y-6">
                {tabs[activeTab].content.points.map((point, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${tabs[activeTab].lightColor} ${tabs[activeTab].textColor} group-hover:bg-slate-800 group-hover:text-white`}>
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-800 group-hover:text-slate-900">
                        {point.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed mt-1">
                        {point.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contextual Tip based on tab */}
              <div className="mt-10 p-4 bg-slate-50 border border-slate-200 rounded-lg flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-sm text-slate-600">
                  <strong>Nota del Experto (PMP):</strong>
                  {activeTab === 'alcance' && " Sin una EDT (WBS) sólida, es imposible estimar Tiempo y Coste correctamente. Empieza siempre aquí."}
                  {activeTab === 'tiempocoste' && " Recuerda que el Cronograma y el Presupuesto son Líneas Base. Solo se cambian mediante Control de Cambios."}
                  {activeTab === 'rrhh' && " Planifica la 'Liberación' de recursos. Mantener gente sin tareas asignadas quema presupuesto innecesariamente."}
                  {activeTab === 'riesgos' && " Identificar riesgos no es ser pesimista, es ser profesional. Un riesgo no gestionado es un problema futuro asegurado."}
                  {activeTab === 'soporte' && " No olvides la Calidad. Es más barato prevenir errores (Planificar) que corregirlos (Inspeccionar)."}
                  {activeTab === 'integracion' && " La Integración es tu responsabilidad exclusiva como PM. No se puede delegar."}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlanificacionDetallada;