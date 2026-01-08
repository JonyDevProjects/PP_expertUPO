import {
    Briefcase,
    Target,
    Layers,
    CheckCircle,
    Clock
} from 'lucide-react';

import { Paragraph } from '../../ui/Typography';
import SlideContainer from '../../shared/SlideContainer';

import { tripleConstraintMessages } from '../../../data/slideData';
import tripleData from '../../../data/locales/Tema1/tripleConstraint.json';

// Hook
import { useTripleConstraintState } from './hooks/useTripleConstraintState';

// Sub-components
import TabFunctions from './components/TripleConstraint/TabFunctions';
import TabRestrictions from './components/TripleConstraint/TabRestrictions';
import TabWorkflow from './components/TripleConstraint/TabWorkflow';
import TabCurves from './components/TripleConstraint/TabCurves';
import TabAreas from './components/TripleConstraint/TabAreas';
import TabMatrix from './components/TripleConstraint/TabMatrix';

const SlideTripleConstraint = ({ autoPlay, onAudioComplete }: { autoPlay?: boolean; onAudioComplete?: () => void }) => {
    const {
        activeTab,
        setActiveTab,
        setActiveStep,
        highlightedFunction,
        active,
        setActive,
        activePhase,
        setActivePhase,
        activeMatrixCell,
        setActiveMatrixCell
    } = useTripleConstraintState();

    const currentMsg = active ? tripleConstraintMessages[active as keyof typeof tripleConstraintMessages] : null;

    // Extract UI data
    const getUIData = (id: string) => tripleData.find((item: any) => item.id === id) as any;
    const uiHeader = getUIData('ui_header');
    const uiTabs = getUIData('ui_tabs');

    const steps = tripleData.filter((item: any) => 'text' in item && !item.id.startsWith('ui_')).map((item: any) => ({
        id: item.id,
        text: (item as any).text
    }));

    const icons: Record<string, any> = {
        'functions': <Briefcase className="w-3 h-3 md:w-4 md:h-4" />,
        'restrictions': <Target className="w-3 h-3 md:w-4 md:h-4" />,
        'workflow': <Layers className="w-3 h-3 md:w-4 md:h-4" />,
        'curves': <Clock className="w-3 h-3 md:w-4 md:h-4" />,
        'areas': <Briefcase className="w-3 h-3 md:w-4 md:h-4" />,
        'matrix': <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
    };

    return (
        <div className={`flex flex-col h-full w-full font-sans overflow-hidden transition-all duration-500`}>

            <SlideContainer
                title={uiHeader.title}
                rate={1.1} // Slightly slower for better comprehension of steps
                ttsSteps={steps}
                onStepChange={(id) => {
                    setActiveStep(id);
                    if (!id) onAudioComplete?.();
                }}
                autoPlay={autoPlay}
                className="h-full flex flex-col"
            >
                <div className="flex flex-col h-full">
                    {/* Header Subtitle */}
                    <div className="text-center mb-2 shrink-0">
                        <Paragraph className="text-center text-xs md:text-sm max-w-3xl mx-auto mt-0 mb-2">
                            {uiHeader.subtitle_prefix} <span className="font-bold text-amber-600">{uiHeader.subtitle_highlight_1}</span> {uiHeader.subtitle_connector} <span className="font-bold text-amber-600">{uiHeader.subtitle_highlight_2}</span>{uiHeader.subtitle_suffix}
                        </Paragraph>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex flex-wrap justify-center gap-1.5 mb-2 shrink-0">
                        {uiTabs.items.map((section: any) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveTab(section.id)}
                                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold transition-all ${activeTab === section.id
                                    ? 'bg-primary text-primary-foreground shadow-md transform scale-105'
                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                                    }`}
                            >
                                {icons[section.id]}
                                {section.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Display */}
                    <div className="flex-1 min-h-0 flex flex-col relative w-full overflow-y-auto custom-scrollbar">
                        {activeTab === 'functions' && (
                            <TabFunctions highlightedFunction={highlightedFunction} />
                        )}

                        {activeTab === 'restrictions' && (
                            <TabRestrictions active={active} currentMsg={currentMsg} setActive={setActive} />
                        )}

                        {activeTab === 'workflow' && (
                            <TabWorkflow activePhase={activePhase} setActivePhase={setActivePhase} />
                        )}

                        {activeTab === 'curves' && (
                            <TabCurves />
                        )}

                        {activeTab === 'areas' && (
                            <TabAreas />
                        )}

                        {activeTab === 'matrix' && (
                            <TabMatrix activeMatrixCell={activeMatrixCell} setActiveMatrixCell={setActiveMatrixCell} />
                        )}
                    </div>
                </div>

            </SlideContainer>
        </div>
    );
};

export default SlideTripleConstraint;
