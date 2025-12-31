import React from 'react';
import { Card } from '../ui/Card';
import { H2 } from '../ui/Typography';

interface SlideContainerProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

const SlideContainer: React.FC<SlideContainerProps> = ({ children, title, className = "" }) => {
    return (
        <Card className={className}>
            {title && (
                <H2>{title}</H2>
            )}
            {children}
        </Card>
    );
};

export default SlideContainer;
