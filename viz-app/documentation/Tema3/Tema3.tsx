import React, { useState } from 'react';
import {
  Play,
  Activity,
  CheckCircle,
  AlertTriangle,
  Users,
  FileText,
  TrendingUp,
  ShieldCheck,
  BarChart2,
  GitPullRequest,
  Search,
  ArrowRight
} from 'lucide-react';

// Tipos para las secciones de contenido
type SectionType = 'execution' | 'control' | 'evm';

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  content: string;
  pmpTip: string;
  color: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, content, pmpTip, color }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border-l-4 ${color} bg-white shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            <span className={`p-2 rounded-full bg-opacity-20 ${color.replace('border-', 'bg-')}`}>
              {icon}
            </span>
            {title}
          </h3>
          <ArrowRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">
          {isOpen ? content : `${content.substring(0, 80)}...`}
        </p>

        <div className={`mt-4 pt-4 border-t border-gray-100 transition-all duration-500 ${isOpen ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 hidden'}`}>
          <div className="flex items-start gap-2 bg-yellow-50 p-3 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="block font-bold text-yellow-800 text-xs uppercase tracking-wide">PMP Expert Tip</span>
              <p className="text-yellow-700 text-sm italic">{pmpTip}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EvmCalculator = () => {
  const [bac, setBac] = useState(100000); // Budget at Completion
  const [percentComplete, setPercentComplete] = useState(50);
  const [ac, setAc] = useState(60000); // Actual Cost

  // Cálculos
  const ev = (percentComplete / 100) * bac; // Earned Value
  const pv = (percentComplete / 100) * bac; // Planned Value (Simplificación asumiendo linealidad para el ejemplo)
  // Nota: En realidad PV depende del plan, aquí lo simulamos igual al EV para enfocarnos en Coste, 
  // o podríamos añadir un slider de "Tiempo Planificado" para ser más exactos.
  // Para hacerlo más didáctico, vamos a asumir que debíamos llevar el 50% (PV) pero el usuario controla el % real.

  const plannedPercent = 50;
  const pvFixed = (plannedPercent / 100) * bac;

  const cv = ev - ac;
  const sv = ev - pvFixed;
  const cpi = ev / (ac || 1);
  const spi = ev / (pvFixed || 1);

  const getStatusColor = (val: number) => {
    if (val >= 1) return 'text-green-600';
    if (val >= 0.9) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-slate-800 text-white p-6 rounded-xl shadow-2xl">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Activity className="text-cyan-400" />
        Laboratorio EVM (Gestión del Valor Ganado)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="space-y-2">
          <label className="text-xs text-slate-400 uppercase">Presupuesto (BAC)</label>
          <input
            type="number"
            value={bac}
            onChange={(e) => setBac(Number(e.target.value))}
            className="w-full bg-slate-700 p-2 rounded text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-slate-400 uppercase">% Completado Real</label>
          <input
            type="range"
            min="0" max="100"
            value={percentComplete}
            onChange={(e) => setPercentComplete(Number(e.target.value))}
            className="w-full accent-cyan-500"
          />
          <div className="text-right text-cyan-400 font-mono">{percentComplete}%</div>
        </div>
        <div className="space-y-2">
          <label className="text-xs text-slate-400 uppercase">Gasto Real (AC)</label>
          <input
            type="number"
            value={ac}
            onChange={(e) => setAc(Number(e.target.value))}
            className="w-full bg-slate-700 p-2 rounded text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-700/50 p-4 rounded-lg">
        <div className="text-center p-2 bg-slate-800 rounded">
          <div className="text-xs text-slate-400">EV (Valor Ganado)</div>
          <div className="font-mono text-lg font-bold text-white">€{ev.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500">% Real * BAC</div>
        </div>
        <div className="text-center p-2 bg-slate-800 rounded">
          <div className="text-xs text-slate-400">PV (Valor Plan.)</div>
          <div className="font-mono text-lg font-bold text-white">€{pvFixed.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500">Asumido al 50%</div>
        </div>
        <div className="text-center p-2 bg-slate-800 rounded">
          <div className="text-xs text-slate-400">CPI (Eficiencia Coste)</div>
          <div className={`font-mono text-xl font-bold ${getStatusColor(cpi)}`}>{cpi.toFixed(2)}</div>
          <div className="text-[10px] text-slate-500">EV / AC</div>
        </div>
        <div className="text-center p-2 bg-slate-800 rounded">
          <div className="text-xs text-slate-400">SPI (Eficiencia Crono)</div>
          <div className={`font-mono text-xl font-bold ${getStatusColor(spi)}`}>{spi.toFixed(2)}</div>
          <div className="text-[10px] text-slate-500">EV / PV</div>
        </div>
      </div>

      <div className="mt-4 text-sm italic text-slate-300 bg-slate-700 p-3 rounded border-l-4 border-cyan-500">
        {cpi < 1 && spi < 1 ? "⚠️ Proyecto en CRISIS: Gastando más de lo previsto y retrasado." :
          cpi < 1 && spi >= 1 ? "⚠️ Sobrecosto: Vas rápido, pero es caro (¿Crashing?)." :
            cpi >= 1 && spi < 1 ? "⚠️ Retraso: Ahorras dinero pero no cumples fechas." :
              "✅ Proyecto Saludable: En coste y tiempo."}
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<SectionType>('execution');

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-12">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white p-8 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-blue-300 mb-2 uppercase tracking-widest text-xs font-semibold">
            <span className="border border-blue-400 px-2 py-0.5 rounded">PMBOK Guide</span>
            <span>Tema 3</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ejecución y Control</h1>
          <p className="text-blue-100 max-w-2xl text-lg opacity-90">
            La fase donde se consume el presupuesto, se gestiona al equipo y se mide el desempeño para garantizar el éxito.
          </p>
        </div>
      </header>

      {/* Navigation */}
      <div className="max-w-6xl mx-auto -mt-8 px-4">
        <div className="bg-white rounded-xl shadow-md p-2 flex flex-wrap justify-center md:justify-start gap-2">
          <button
            onClick={() => setActiveTab('execution')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'execution' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <Play className="w-5 h-5" /> Ejecución (Hacer)
          </button>
          <button
            onClick={() => setActiveTab('control')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'control' ? 'bg-orange-600 text-white shadow-lg' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <Search className="w-5 h-5" /> Monitoreo y Control (Revisar)
          </button>
          <button
            onClick={() => setActiveTab('evm')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'evm' ? 'bg-teal-600 text-white shadow-lg' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <BarChart2 className="w-5 h-5" /> Matemáticas EVM
          </button>
        </div>
      </div>

      {/* Content Area */}
      <main className="max-w-6xl mx-auto mt-10 px-4">

        {/* EXECUTION SECTION */}
        {activeTab === 'execution' && (
          <div className="animate-fadeIn">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">Grupo de Procesos de Ejecución</h2>
              <p className="text-blue-800">
                Integra a las personas y los recursos para llevar a cabo el plan de gestión del proyecto. Es donde se gasta la mayor parte del presupuesto.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoCard
                title="Dirigir el Trabajo"
                icon={<Activity className="w-6 h-6 text-blue-600" />}
                content="Consiste en liderar y realizar el trabajo definido en el plan y implementar los cambios aprobados. Se generan los 'Datos de Desempeño del Trabajo'."
                pmpTip="No confundir 'Datos' (Ejecución) con 'Información' (Control). Aquí solo se generan los datos brutos."
                color="border-blue-500"
              />
              <InfoCard
                title="Gestionar la Calidad"
                icon={<ShieldCheck className="w-6 h-6 text-blue-600" />}
                content="Traduce el Plan de Calidad en actividades ejecutables de calidad. Incluye auditorías de calidad y mejora de procesos."
                pmpTip="Esto es 'Aseguramiento de la Calidad' (QA). Se centra en el PROCESO, no en el producto final (eso es Control)."
                color="border-blue-500"
              />
              <InfoCard
                title="Adquirir Recursos"
                icon={<Users className="w-6 h-6 text-blue-600" />}
                content="Obtener miembros del equipo, instalaciones, equipos y materiales necesarios para completar el trabajo del proyecto."
                pmpTip="Si no consigues los recursos planificados, afecta directamente al cronograma y costo. Negociación es clave."
                color="border-blue-500"
              />
              <InfoCard
                title="Desarrollar el Equipo"
                icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
                content="Mejorar las competencias, la interacción y el ambiente global del equipo para lograr un mejor desempeño."
                pmpTip="Recuerda el modelo de Tuckman: Formación, Turbulencia, Normalización, Desempeño y Disolución."
                color="border-blue-500"
              />
              <InfoCard
                title="Gestionar Comunicaciones"
                icon={<FileText className="w-6 h-6 text-blue-600" />}
                content="Asegurar la recopilación, creación, distribución, almacenamiento y disposición final de la información del proyecto."
                pmpTip="El 90% del tiempo de un Director de Proyectos se dedica a la comunicación."
                color="border-blue-500"
              />
              <InfoCard
                title="Implementar Respuesta a Riesgos"
                icon={<AlertTriangle className="w-6 h-6 text-blue-600" />}
                content="Proceso de ejecutar los planes acordados de respuesta a los riesgos (mitigar, transferir, evitar, aceptar)."
                pmpTip="Los riesgos se identifican en planificación, pero las respuestas (acciones) se ejecutan aquí."
                color="border-blue-500"
              />
            </div>
          </div>
        )}

        {/* CONTROL SECTION */}
        {activeTab === 'control' && (
          <div className="animate-fadeIn">
            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-8 rounded-r-lg">
              <h2 className="text-2xl font-bold text-orange-900 mb-2">Grupo de Procesos de Monitoreo y Control</h2>
              <p className="text-orange-800">
                Mide y analiza el desempeño a intervalos regulares para identificar variaciones respecto al plan y recomendar acciones correctivas o preventivas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Control Integrado de Cambios */}
              <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-orange-500">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <GitPullRequest className="text-orange-500" /> Control Integrado de Cambios
                </h3>
                <p className="text-gray-600 mb-4">
                  El proceso final donde se revisan todas las solicitudes de cambio. Nada cambia en la Línea Base sin pasar por aquí.
                </p>
                <ul className="space-y-2 text-sm bg-gray-50 p-4 rounded">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Evaluar el impacto en TODAS las áreas.</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Buscar alternativas.</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Aprobar o rechazar (CCB - Change Control Board).</li>
                </ul>
              </div>

              {/* Validar Alcance */}
              <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-orange-500">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <CheckCircle className="text-orange-500" /> Validar el Alcance
                </h3>
                <p className="text-gray-600 mb-4">
                  Formalizar la aceptación de los entregables completados por parte del cliente o patrocinador.
                </p>
                <div className="bg-orange-100 p-3 rounded text-sm text-orange-800 font-semibold border border-orange-200">
                  ¡OJO! Control de Calidad se hace internamente ANTES. Validar Alcance lo hace el cliente DESPUÉS.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard
                title="Controlar Cronograma"
                icon={<Activity className="w-6 h-6 text-orange-600" />}
                content="Monitorear el estado del proyecto para actualizar el cronograma y gestionar cambios en la línea base."
                pmpTip="Herramientas clave: Análisis de tendencias, Método de la Ruta Crítica y Compresión (Crashing/Fast Tracking)."
                color="border-orange-500"
              />
              <InfoCard
                title="Controlar Costos"
                icon={<TrendingUp className="w-6 h-6 text-orange-600" />}
                content="Monitorear el estado del proyecto para actualizar los costos y gestionar cambios en la línea base de costo."
                pmpTip="Aquí es donde EVM (Valor Ganado) es la herramienta estrella."
                color="border-orange-500"
              />
              <InfoCard
                title="Controlar Calidad"
                icon={<ShieldCheck className="w-6 h-6 text-orange-600" />}
                content="Monitorear y registrar los resultados de la ejecución de actividades de calidad para evaluar el desempeño."
                pmpTip="Verifica que el entregable sea correcto (Inspección). Salida principal: Entregables Verificados."
                color="border-orange-500"
              />
            </div>
          </div>
        )}

        {/* EVM SECTION */}
        {activeTab === 'evm' && (
          <div className="animate-fadeIn">
            <div className="bg-teal-50 border-l-4 border-teal-600 p-6 mb-8 rounded-r-lg">
              <h2 className="text-2xl font-bold text-teal-900 mb-2">Gestión del Valor Ganado (EVM)</h2>
              <p className="text-teal-800">
                La metodología que integra alcance, cronograma y recursos para medir el desempeño y el progreso del proyecto de manera objetiva.
              </p>
            </div>

            {/* Definitions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded shadow border-l-4 border-gray-400">
                <h4 className="font-bold text-gray-700">PV (Valor Planificado)</h4>
                <p className="text-xs text-gray-500 mt-1">Lo que DEBERÍAS haber hecho.</p>
                <div className="mt-2 font-mono text-sm bg-gray-100 p-1 rounded">Presupuesto asignado al trabajo programado.</div>
              </div>
              <div className="bg-white p-4 rounded shadow border-l-4 border-teal-500">
                <h4 className="font-bold text-teal-700">EV (Valor Ganado)</h4>
                <p className="text-xs text-gray-500 mt-1">Lo que REALMENTE hiciste (en valor monetario).</p>
                <div className="mt-2 font-mono text-sm bg-gray-100 p-1 rounded">Trabajo realizado expresado en presupuesto.</div>
              </div>
              <div className="bg-white p-4 rounded shadow border-l-4 border-red-500">
                <h4 className="font-bold text-red-700">AC (Costo Actual)</h4>
                <p className="text-xs text-gray-500 mt-1">Lo que te COSTÓ hacerlo.</p>
                <div className="mt-2 font-mono text-sm bg-gray-100 p-1 rounded">Gasto real incurrido por el trabajo realizado.</div>
              </div>
            </div>

            {/* Interactive Calculator */}
            <div className="mb-10">
              <EvmCalculator />
            </div>

            {/* Formulas Reference */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">Chuleta de Fórmulas PMP</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 hover:bg-gray-50 px-2 transition">
                  <span className="font-semibold text-gray-700">Variación del Costo (CV)</span>
                  <span className="font-mono text-blue-600">EV - AC</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 hover:bg-gray-50 px-2 transition">
                  <span className="font-semibold text-gray-700">Variación Cronograma (SV)</span>
                  <span className="font-mono text-blue-600">EV - PV</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 hover:bg-gray-50 px-2 transition">
                  <span className="font-semibold text-gray-700">Índice Desempeño Costo (CPI)</span>
                  <span className="font-mono text-purple-600">EV / AC</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 hover:bg-gray-50 px-2 transition">
                  <span className="font-semibold text-gray-700">Índice Desempeño Crono (SPI)</span>
                  <span className="font-mono text-purple-600">EV / PV</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 hover:bg-gray-50 px-2 transition">
                  <span className="font-semibold text-gray-700">Estimación a la Conclusión (EAC)</span>
                  <span className="font-mono text-green-600">BAC / CPI</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 hover:bg-gray-50 px-2 transition">
                  <span className="font-semibold text-gray-700">Variación a la Conclusión (VAC)</span>
                  <span className="font-mono text-green-600">BAC - EAC</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      <footer className="max-w-6xl mx-auto mt-12 px-4 text-center text-gray-400 text-sm">
        <p>© 2024 Dirección de Proyectos - Material Docente Interactivo</p>
        <p className="mt-1">Basado en PMBOK® Guide & Documentación del Curso</p>
      </footer>
    </div>
  );
}