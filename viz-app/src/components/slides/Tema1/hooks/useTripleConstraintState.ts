import { useState, useEffect } from 'react';

export const useTripleConstraintState = () => {
    // --- State for Navigation ---
    const [activeTab, setActiveTab] = useState('functions');

    // --- State for TTS ---
    const [activeStep, setActiveStep] = useState<string | null>(null);

    // --- State for Functions ---
    const [highlightedFunction, setHighlightedFunction] = useState<string | null>(null);

    // --- State for Triple Constraint ---
    const [active, setActive] = useState<string | null>(null);

    // --- State for Flow Diagram ---
    const [activePhase, setActivePhase] = useState<string | null>(null);

    // --- State for Matrix ---
    const [activeMatrixCell, setActiveMatrixCell] = useState<{ title: string; desc: string; color: string } | null>(null);

    // Guided Tour Logic: Sync UI state with TTS steps
    useEffect(() => {
        if (!activeStep) return;

        // 1. Tab Navigation logic
        if (activeStep.startsWith('functions')) setActiveTab('functions');
        else if (activeStep.startsWith('restrictions')) setActiveTab('restrictions');
        else if (activeStep.startsWith('workflow')) setActiveTab('workflow');
        else if (activeStep.startsWith('curves')) setActiveTab('curves');
        else if (activeStep.startsWith('areas')) setActiveTab('areas');
        else if (activeStep.startsWith('matrix')) setActiveTab('matrix');

        // 2. Specific Interactions based on granular steps

        // Functions
        if (activeStep === 'functions-intro') setHighlightedFunction(null);
        if (activeStep === 'functions-plan') setHighlightedFunction('plan');
        if (activeStep === 'functions-org') setHighlightedFunction('org');
        if (activeStep === 'functions-lead') setHighlightedFunction('lead');
        if (activeStep === 'functions-ctrl') setHighlightedFunction('ctrl');

        // Triple Constraint
        if (activeStep === 'restrictions-intro') setActive(null);
        if (activeStep === 'restrictions-scope') setActive('scope');
        if (activeStep === 'restrictions-time') setActive('time');
        if (activeStep === 'restrictions-cost') setActive('cost');
        if (activeStep === 'restrictions-quality') setActive(null);

        // Workflow
        if (activeStep === 'workflow-intro') setActivePhase(null);
        if (activeStep === 'workflow-init') setActivePhase('init');
        if (activeStep === 'workflow-plan') setActivePhase('plan');
        if (activeStep === 'workflow-exec') setActivePhase('exec');
        if (activeStep === 'workflow-ctrl') setActivePhase('ctrl');
        if (activeStep === 'workflow-close') setActivePhase('close');

        // Matrix
        if (activeStep === 'matrix-intro') setActiveMatrixCell(null);
        if (activeStep === 'matrix-example') {
            setActiveMatrixCell({
                title: '1. Integración',
                desc: 'Desarrollar el Plan para la Dirección del Proyecto',
                color: ''
            });
        }

    }, [activeStep]);

    // Cleanup states on tab change
    useEffect(() => {
        setHighlightedFunction(null);
        setActive(null);
        setActivePhase(null);
        setActiveMatrixCell(null);
    }, [activeTab]);

    return {
        activeTab,
        setActiveTab,
        activeStep,
        setActiveStep,
        highlightedFunction,
        active,
        setActive,
        activePhase,
        setActivePhase,
        activeMatrixCell,
        setActiveMatrixCell
    };
};
