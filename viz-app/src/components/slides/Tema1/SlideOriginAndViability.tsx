
import { useState } from 'react';
import { TrendingUp, AlertTriangle, Target, Shield } from 'lucide-react';
import SlideContainer from '../../shared/SlideContainer';
import originData from '../../../data/locales/Tema1/originViability.json';

const SlideOriginAndViability = ({ autoPlay, onAudioComplete }: { autoPlay?: boolean; onAudioComplete?: () => void }) => {
    const [activeStep, setActiveStep] = useState<string | null>(null);

    // Helper class for focus mode
    const getFocusClass = (stepId: string) => {
        if (!activeStep) return "transition-all duration-500 opacity-100";
        return activeStep === stepId
            ? "transition-all duration-500 opacity-100 scale-[1.02] ring-2 ring-indigo-400/50 rounded-xl shadow-lg z-20 bg-surface relative"
            : "transition-all duration-500 opacity-30 blur-[1px] grayscale";
    };

    // Extract UI data
    const getUIData = (id: string) => originData.find((item: any) => item.id === id) as any;
    const uiOrigins = getUIData('ui_origins');
    const uiAnalysis = getUIData('ui_analysis');
    const uiBalance = getUIData('ui_balance');
    const uiFinancials = getUIData('ui_financials');

    const ttsSteps = originData.filter((item: any) => 'text' in item && !item.id.startsWith('ui_')).map((item: any) => ({
        id: item.id,
        text: (item as any).text
    }));

    return (
        <div className="animate-fade-in space-y-8">
            <SlideContainer
                title="El Génesis del Proyecto"
                rate={1.2}
                ttsSteps={ttsSteps}
                onStepChange={(id) => {
                    setActiveStep(id);
                    if (!id) onAudioComplete?.();
                }}
                autoPlay={autoPlay}
            >
                <div className="flex flex-col xl:grid xl:grid-cols-3 gap-6">
                    <div className={`xl:col-span-1 ${getFocusClass('origins')}`}>
                        <div className="bg-indigo-900 dark:bg-slate-800 text-white p-6 rounded-xl flex flex-col justify-between h-full shadow-md">
                            <div>
                                <h3 className="text-xl font-bold text-amber-400 mb-4">{uiOrigins.title}</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2"><TrendingUp className="mt-1 w-4 h-4 text-indigo-300" /> {uiOrigins.items[0]}</li>
                                    <li className="flex items-start gap-2"><AlertTriangle className="mt-1 w-4 h-4 text-indigo-300" /> {uiOrigins.items[1]}</li>
                                    <li className="flex items-start gap-2"><Target className="mt-1 w-4 h-4 text-indigo-300" /> {uiOrigins.items[2]}</li>
                                    <li className="flex items-start gap-2"><Shield className="mt-1 w-4 h-4 text-indigo-300" /> {uiOrigins.items[3]}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="xl:col-span-2 bg-background p-6 rounded-xl border border-border flex flex-col justify-between shadow-sm">
                        <div className={getFocusClass('analysis')}>
                            <h3 className="text-xl font-bold text-primary mb-4">{uiAnalysis.title}</h3>
                            <p className="text-text-muted mb-4">{uiAnalysis.desc}</p>
                        </div>

                        <div className={`flex flex-col sm:flex-row items-stretch gap-4 justify-center my-4 ${getFocusClass('balance')}`}>
                            <div className="bg-surface p-4 rounded shadow-md flex-1 text-center border-t-4 border-red-400 flex flex-col justify-center">
                                <h4 className="font-bold text-text-main">{uiBalance.costs.title}</h4>
                                {uiBalance.costs.items.map((item: string, idx: number) => (
                                    <p key={idx} className={`text-xs text-text-muted ${idx === 0 ? 'mt-1' : ''}`}>{item}</p>
                                ))}
                            </div>
                            <div className="text-2xl font-bold text-slate-400 self-center">VS</div>
                            <div className="bg-surface p-4 rounded shadow-md flex-1 text-center border-t-4 border-green-400 flex flex-col justify-center">
                                <h4 className="font-bold text-text-main">{uiBalance.benefits.title}</h4>
                                {uiBalance.benefits.items.map((item: string, idx: number) => (
                                    <p key={idx} className={`text-xs text-text-muted ${idx === 0 ? 'mt-1' : ''}`}>{item}</p>
                                ))}
                            </div>
                        </div>

                        <div className={`mt-6 ${getFocusClass('financials')}`}>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm text-blue-800 dark:text-blue-200 text-center border border-blue-100 dark:border-blue-900">
                                <strong>{uiFinancials.tip}</strong> {uiFinancials.text}
                            </div>
                        </div>
                    </div>
                </div>
            </SlideContainer>
        </div>
    );
};

export default SlideOriginAndViability;
