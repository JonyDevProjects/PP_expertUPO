import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', noPadding = false }) => {
    return (
        <div className={`bg-surface rounded-xl shadow-md border border-border ${noPadding ? '' : 'p-6'} ${className}`}>
            {children}
        </div>
    );
};
