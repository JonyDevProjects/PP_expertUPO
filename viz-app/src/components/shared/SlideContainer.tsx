import React from 'react';
import { Card } from '../ui/Card';
import { H2 } from '../ui/Typography';

interface SlideContainerProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

import TextToSpeechButton from '../shared/TextToSpeechButton';

interface SlideContainerProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
    ttsText?: string;
}

const SlideContainer: React.FC<SlideContainerProps> = ({ children, title, className = "", ttsText }) => {
    return (
        <Card className={className}>
            {title && (
                <div className="flex justify-between items-start mb-4 gap-4">
                    <H2 className="mb-0">{title}</H2>
                    {ttsText && <TextToSpeechButton text={ttsText} />}
                </div>
            )}
            {children}
        </Card>
    );
};

export default SlideContainer;
