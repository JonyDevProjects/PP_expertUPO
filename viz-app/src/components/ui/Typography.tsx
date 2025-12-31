import React from 'react';

interface TypographyProps {
    children: React.ReactNode;
    className?: string;
}

export const H2: React.FC<TypographyProps> = ({ children, className = '' }) => (
    <h2 className={`text-2xl font-bold text-primary mb-6 flex justify-center text-center gap-3 ${className}`}>
        {children}
    </h2>
);

export const H3: React.FC<TypographyProps> = ({ children, className = '' }) => (
    <h3 className={`font-bold text-primary mb-4 flex items-center gap-2 ${className}`}>
        {children}
    </h3>
);

export const Paragraph: React.FC<TypographyProps> = ({ children, className = '' }) => (
    <p className={`text-text-main mb-6 font-medium ${className}`}>
        {children}
    </p>
);

export const Subtle: React.FC<TypographyProps> = ({ children, className = '' }) => (
    <p className={`text-sm text-text-muted ${className}`}>
        {children}
    </p>
);
