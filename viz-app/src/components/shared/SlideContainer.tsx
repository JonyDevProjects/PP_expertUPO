import React from 'react';
import { Card } from '../ui/Card';
import { H2 } from '../ui/Typography';
import TextToSpeechButton from '../shared/TextToSpeechButton';

interface TTSStep {
    id: string;
    text: string;
}

interface SlideContainerProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
    ttsText?: string;
    ttsSteps?: TTSStep[];
    autoPlay?: boolean;
    rate?: number;
    onStepChange?: (stepId: string | null) => void;
}

const SlideContainer: React.FC<SlideContainerProps> = ({
    children,
    title,
    className = "",
    ttsText,
    ttsSteps,
    autoPlay = false,
    rate = 1.0,
    onStepChange
}) => {
    const [isReading, setIsReading] = React.useState(false);

    return (
        <Card className={`transition-all duration-500 ${className} ${isReading ? 'ring-4 ring-indigo-400 dark:ring-indigo-500 shadow-2xl scale-[1.01]' : ''}`}>
            {title && (
                <div className="flex justify-between items-start mb-4 gap-4">
                    <H2 className="mb-0">{title}</H2>
                    {(ttsText || ttsSteps) && (
                        <TextToSpeechButton
                            text={ttsText}
                            steps={ttsSteps}
                            autoPlay={autoPlay}
                            rate={rate}
                            onPlayStateChange={setIsReading}
                            onStepChange={onStepChange}
                        />
                    )}
                </div>
            )}
            <div className={isReading ? 'opacity-100' : 'opacity-100'}>
                {children}
            </div>
        </Card>
    );
};

export default SlideContainer;
