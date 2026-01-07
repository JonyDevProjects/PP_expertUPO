import React from 'react';
import { BookOpen, Target, CheckCircle } from 'lucide-react';
import SlideContainer from '../../shared/SlideContainer';
import TextToSpeechButton from '../../shared/TextToSpeechButton';

const SlideDefinition: React.FC = () => {
  // Texto completo para la IA (Basado en tu prompt)
  const fullLessonText = `
    Tema 1: Concepto de proyecto.
    Un proyecto es un esfuerzo temporal que se lleva a cabo para crear un producto, servicio o resultado único.
    Sus características principales son:
    Uno. Temporalidad: Tiene un inicio y un final definidos.
    Dos. Unicidad: El entregable final es diferente a otros anteriores.
    Tres. Recursos Limitados: Opera bajo restricciones de dinero, personas y tiempo.
    Cuatro. Claridad: Requiere objetivos claros.
    Es importante distinguir entre Producción en masa, que busca economías de escala como fabricar coches, y Proyectos, que son resultados únicos.
  `;

  return (
    <SlideContainer 
        title="1. Concepto de Proyecto" 
        currentSlide={1} 
        totalSlides={8}
        // Pasamos el componente de audio al header del SlideContainer si este lo soportara, 
        // o lo renderizamos directamente en el contenido.
    >
      <div className="flex flex-col h-full relative">
        
        {/* Barra de herramientas superior de la diapositiva */}
        <div className="flex justify-between items-center mb-6 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
            <div className="flex items-center gap-2 text-slate-300 text-sm">
                <BookOpen size={18} className="text-blue-400"/>
                <span>Definición PMBOK® Guide</span>
            </div>
            {/* INTEGRACIÓN DEL NUEVO FEATURE */}
            <TextToSpeechButton text={fullLessonText} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
          {/* Columna Izquierda: Definición */}
          <div className="flex flex-col justify-center space-y-6">
            <blockquote className="border-l-4 border-blue-500 pl-6 py-2 bg-slate-800/30 rounded-r-lg">
              <p className="text-xl md:text-2xl font-serif italic text-slate-200 mb-2">
                "Un esfuerzo temporal que se lleva a cabo para crear un producto, servicio o resultado único."
              </p>
              <footer className="text-sm text-blue-400 font-bold">— Project Management Institute (PMI)</footer>
            </blockquote>

            <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Target className="text-red-400"/> Características Clave
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18}/>
                  <div>
                    <span className="font-bold text-slate-200">Temporal:</span>
                    <p className="text-sm text-slate-400">Tiene un inicio y un final definidos. No es un esfuerzo continuo.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18}/>
                  <div>
                    <span className="font-bold text-slate-200">Único:</span>
                    <p className="text-sm text-slate-400">El entregable final es diferente a otros anteriores.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18}/>
                  <div>
                    <span className="font-bold text-slate-200">Elaboración Gradual:</span>
                    <p className="text-sm text-slate-400">Se desarrolla por pasos y se incrementa mediante incrementos.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Columna Derecha: Comparativa Visual */}
          <div className="flex flex-col justify-center space-y-4">
             <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-1 rounded-xl shadow-2xl">
                <div className="bg-slate-900 rounded-lg p-6 relative overflow-hidden group hover:border-blue-500/50 transition-colors border border-slate-700">
                    <h3 className="text-center text-white font-bold mb-6 text-lg border-b border-slate-700 pb-2">Organización del Trabajo</h3>
                    
                    <div className="space-y-4">
                        {/* Producción en Masa */}
                        <div className="flex items-center gap-4 p-3 rounded bg-slate-800/50 opacity-50 hover:opacity-100 transition-opacity">
                            <div className="w-10 h-10 rounded bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold">1</div>
                            <div>
                                <h4 className="font-bold text-orange-300">Producción en Masa</h4>
                                <p className="text-xs text-slate-400">Repetitivo, Escala (Ej. Fábrica de Coches)</p>
                            </div>
                        </div>

                         {/* Producción por Lotes */}
                         <div className="flex items-center gap-4 p-3 rounded bg-slate-800/50 opacity-50 hover:opacity-100 transition-opacity">
                            <div className="w-10 h-10 rounded bg-yellow-500/20 flex items-center justify-center text-yellow-500 font-bold">2</div>
                            <div>
                                <h4 className="font-bold text-yellow-300">Producción por Lotes</h4>
                                <p className="text-xs text-slate-400">Sistemas flexibles (Ej. Panadería)</p>
                            </div>
                        </div>

                         {/* PROYECTO (Highlight) */}
                         <div className="flex items-center gap-4 p-4 rounded bg-blue-900/20 border border-blue-500 transform scale-105 shadow-lg shadow-blue-900/20">
                            <div className="w-12 h-12 rounded bg-blue-500 flex items-center justify-center text-white font-bold text-xl">3</div>
                            <div>
                                <h4 className="font-bold text-blue-300 text-lg">PROYECTO</h4>
                                <p className="text-xs text-blue-100">Objetivo único no repetitivo (Ej. Este Software)</p>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

export default SlideDefinition;