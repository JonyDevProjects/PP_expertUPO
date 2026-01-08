import { useState } from 'react';
import { Target, Clock, Users, BookOpen } from 'lucide-react';
import SlideContainer from '../../shared/SlideContainer';
import definitionData from '../../../data/locales/Tema1/definition.json';

const SlideDefinition = ({ autoPlay, onAudioComplete }: { autoPlay?: boolean; onAudioComplete?: () => void }) => {
    const [activeStep, setActiveStep] = useState<string | null>(null);

    // Helper class for focus mode
    const getFocusClass = (stepId: string) => {
        if (!activeStep) return "transition-all duration-500 opacity-100"; // Normal state
        return activeStep === stepId
            ? "transition-all duration-500 opacity-100 scale-[1.02] ring-4 ring-amber-400/50 rounded-xl shadow-xl z-20 bg-surface" // Active Highlight
            : "transition-all duration-500 opacity-20 blur-[1px] grayscale"; // Dimmed
    };

    // Extract UI data helper
    const getUIData = (id: string) => definitionData.find((item: any) => item.id === id) as any;
    const uiDefinition = getUIData('ui_definition');
    const uiCharacteristics = getUIData('ui_characteristics');
    const uiComparison = getUIData('ui_comparison');
    const uiTypes = getUIData('ui_types');

    // Filter only steps for TTS (items with 'text' property directly)
    const ttsSteps = definitionData.filter((item: any) => 'text' in item && !item.id.startsWith('ui_')).map((item: any) => ({
        id: item.id,
        text: (item as any).text
    }));

    return (
        <div className="animate-fade-in space-y-8">
            <SlideContainer
                title="¿Qué es un Proyecto?"
                rate={1.2}
                ttsSteps={ttsSteps}
                onStepChange={(id) => {
                    setActiveStep(id);
                    if (!id) onAudioComplete?.();
                }}
                autoPlay={autoPlay}
            >
                <div className="flex flex-col gap-8 h-full">

                    {/* Barra de herramientas superior de la diapositiva */}
                    <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-300 text-sm">
                            <BookOpen size={18} className="text-blue-500 dark:text-blue-400" />
                            <span>Definición PMBOK® Guide</span>
                        </div>
                    </div>

                    <div className="grid xl:grid-cols-2 gap-8 items-start">
                        {/* Left: Definition & Characteristics */}
                        <div className="space-y-6">
                            <div className={`bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg ${getFocusClass('definition')}`}>
                                <p className="text-xl font-medium text-primary dark:text-indigo-300"
                                    dangerouslySetInnerHTML={{ __html: uiDefinition.main_text.replace(/className/g, 'class') }} // Quick fix for JSON className
                                >
                                </p>
                                <p className="text-sm text-indigo-400 mt-2 text-right">{uiDefinition.source}</p>
                            </div>
                            <div className={getFocusClass('characteristics')}>
                                <h3 className="font-bold text-text-main mb-3">{uiCharacteristics.title}</h3>
                                <ul className="space-y-3">
                                    {uiCharacteristics.items.map((item: any, idx: number) => (
                                        <li key={idx} className="flex items-center gap-3 bg-surface border border-border p-3 rounded shadow-sm">
                                            {idx === 0 && <Clock className="text-blue-500" />}
                                            {idx === 1 && <Target className="text-amber-500" />}
                                            {idx === 2 && <Users className="text-green-500" />}
                                            {idx === 3 && <Target className="text-red-500" />}
                                            <span className="text-text-main"><strong>{item.label}</strong> {item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right: Comparison Card */}
                        <div className={`bg-surface dark:bg-slate-800 text-text-main dark:text-white p-6 rounded-xl w-full border border-border shadow-sm transition-colors duration-300 h-full ${getFocusClass('comparison')}`}>
                            <h3 className="text-lg font-bold text-primary dark:text-amber-400 mb-4 border-b border-border dark:border-slate-600 pb-2">{uiComparison.title}</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm h-fit">
                                <div className="space-y-2">
                                    <p className="font-bold text-primary dark:text-indigo-300">{uiComparison.project.title}</p>
                                    {uiComparison.project.items.map((item: string, idx: number) => (
                                        <div key={idx} className="bg-background dark:bg-slate-700 p-2 rounded border border-border dark:border-slate-600 shadow-sm transition-colors duration-300">{item}</div>
                                    ))}
                                </div>
                                <div className="space-y-2">
                                    <p className="font-bold text-primary dark:text-indigo-300">{uiComparison.operations.title}</p>
                                    {uiComparison.operations.items.map((item: string, idx: number) => (
                                        <div key={idx} className="bg-background dark:bg-slate-700 p-2 rounded border border-border dark:border-slate-600 shadow-sm transition-colors duration-300">{item}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Organization Types */}
                    <div className={getFocusClass('types')}>
                        <h3 className="font-bold text-text-main mb-4">{uiTypes.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {uiTypes.items.map((item: any, idx: number) => (
                                <div key={idx} className={`p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow ${idx === 2 ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800 border-l-4 border-l-primary' : 'bg-background border-border'}`}>
                                    <h4 className={`font-bold mb-2 ${idx === 2 ? 'text-primary' : 'text-text-main'}`}>{item.title}</h4>
                                    <p className={`text-sm ${idx === 2 ? 'text-primary dark:text-indigo-300' : 'text-text-muted'}`}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SlideContainer>
        </div >
    );
};


export default SlideDefinition;
