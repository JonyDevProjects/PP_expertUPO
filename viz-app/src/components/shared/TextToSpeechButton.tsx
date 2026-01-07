import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Square } from 'lucide-react';

interface TTSStep {
    id: string;
    text: string;
}

interface TextToSpeechProps {
    text?: string;
    steps?: TTSStep[];
    className?: string;
    preload?: boolean; // Not used but kept for compat
    autoPlay?: boolean;
    rate?: number;
    onPlayStateChange?: (isPlaying: boolean) => void;
    onStepChange?: (stepId: string | null) => void;
}

const TextToSpeechButton: React.FC<TextToSpeechProps> = ({
    text,
    steps,
    className = '',
    autoPlay = false,
    rate = 1.5,
    onPlayStateChange,
    onStepChange
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSupported, setIsSupported] = useState(true);
    const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        if (!('speechSynthesis' in window)) {
            setIsSupported(false);
            return;
        }

        // Load voices
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            if (mountedRef.current) {
                setAvailableVoices(voices);
            }
        };

        loadVoices();

        // Chrome loads async, so listener is needed
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        return () => {
            mountedRef.current = false;
            stopAll();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Notify parent of state changes
    useEffect(() => {
        onPlayStateChange?.(isPlaying);
    }, [isPlaying, onPlayStateChange]);

    const stopAll = () => {
        window.speechSynthesis.cancel();
        if (mountedRef.current) {
            setIsPlaying(false);
            onStepChange?.(null);
        }
    };

    // Helper to get the best Spanish voice
    const getBestVoice = (): SpeechSynthesisVoice | null => {
        if (availableVoices.length === 0) return null;

        // Rankings: 
        // 1. Google Español (Chrome)
        // 2. Microsoft Natural (Edge)
        // 3. Paulina (Mexico) or Monica (Spain) - Common high quality
        // 4. Any es-ES
        // 5. Any es-*

        const isGoogle = (v: SpeechSynthesisVoice) => v.name.includes('Google') && v.lang.includes('es');
        const isMicrosoftNatural = (v: SpeechSynthesisVoice) => v.name.includes('Microsoft') && v.name.includes('Natural') && v.lang.includes('es');
        const isPremiumEs = (v: SpeechSynthesisVoice) => (v.name.includes('Paulina') || v.name.includes('Monica')) && v.lang.includes('es');

        const best = availableVoices.find(isGoogle)
            || availableVoices.find(isMicrosoftNatural)
            || availableVoices.find(isPremiumEs)
            || availableVoices.find(v => v.lang === 'es-ES')
            || availableVoices.find(v => v.lang.startsWith('es'));

        return best || null; // Fallback to default if no Spanish voice found (unlikely)
    };

    const handlePlay = () => {
        if (isPlaying) {
            stopAll();
            return;
        }

        setIsPlaying(true);
        window.speechSynthesis.cancel(); // Safety clear

        const selectedVoice = getBestVoice();

        // Debug
        // console.log("Selected Voice:", selectedVoice?.name);

        if (steps && steps.length > 0) {
            // Sequence Mode
            steps.forEach((step, index) => {
                const utterance = new SpeechSynthesisUtterance(step.text);

                if (selectedVoice) {
                    utterance.voice = selectedVoice;
                }
                // Fallback lang if no voice (though voice usually sets lang)
                utterance.lang = selectedVoice ? selectedVoice.lang : 'es-ES';
                utterance.rate = rate;

                // Event: Start of this specific step
                utterance.onstart = () => {
                    if (mountedRef.current) {
                        onStepChange?.(step.id);
                    }
                };

                // Event: End of sequence?
                if (index === steps.length - 1) {
                    utterance.onend = () => {
                        if (mountedRef.current) {
                            setIsPlaying(false);
                            onStepChange?.(null);
                        }
                    };
                }

                utterance.onerror = (e) => {
                    console.error("TTS Error:", e);
                    if (mountedRef.current) stopAll();
                };

                window.speechSynthesis.speak(utterance);
            });
        } else if (text) {
            // Single Text Mode
            const utterance = new SpeechSynthesisUtterance(text);
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }
            utterance.lang = selectedVoice ? selectedVoice.lang : 'es-ES';
            utterance.rate = rate;

            utterance.onend = () => {
                if (mountedRef.current) setIsPlaying(false);
            };

            utterance.onerror = () => {
                if (mountedRef.current) stopAll();
            };

            window.speechSynthesis.speak(utterance);
        }
    };

    // Auto-play Logic
    useEffect(() => {
        if (autoPlay && isSupported && !isPlaying && mountedRef.current) {
            const timer = setTimeout(() => {
                handlePlay();
            }, 500); // Small delay to allow UI to settle
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoPlay, isSupported, availableVoices]);
    // Added availableVoices to dependency: if voices load late, we might want to restart? 
    // Actually, purely creating the utterance later is better, but this is simple enough.

    if (!isSupported) return null;

    return (
        <button
            onClick={handlePlay}
            className={`
                flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs font-bold shadow-sm
                ${isPlaying
                    ? 'bg-red-100 text-red-600 border-red-200 animate-pulse'
                    : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100'
                } 
                ${className}
            `}
        >
            {isPlaying ? (
                <Square size={14} className="fill-current" />
            ) : (
                <Volume2 size={14} />
            )}
            <span>{isPlaying ? 'Detener' : 'Escuchar Lección'}</span>
        </button>
    );
};

export default TextToSpeechButton;
