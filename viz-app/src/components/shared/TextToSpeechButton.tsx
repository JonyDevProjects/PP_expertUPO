import React, { useState, useRef, useEffect } from 'react';
import { Volume2, StopCircle, Loader2, AlertCircle } from 'lucide-react';
import { getAudioFromCache, saveAudioToCache } from '../../utils/audioCache';

interface TextToSpeechProps {
    text: string;
    className?: string;
    preload?: boolean;
}

const TextToSpeechButton: React.FC<TextToSpeechProps> = ({ text, className = '', preload = true }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPreloaded, setIsPreloaded] = useState(false); // Visual feedback
    const [error, setError] = useState<string | null>(null);

    // Almacenamos la URL del objeto en memoria para acceso inmediato
    const audioUrlRef = useRef<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const mountedRef = useRef(true);

    // Limpieza
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            if (audioUrlRef.current) {
                URL.revokeObjectURL(audioUrlRef.current);
            }
        };
    }, []);

    // Helper: WAV Header
    const addWavHeader = (pcmData: Uint8Array, sampleRate = 24000, numChannels = 1, bitDepth = 16) => {
        const header = new ArrayBuffer(44);
        const view = new DataView(header);
        const writeString = (view: DataView, offset: number, string: string) => {
            for (let i = 0; i < string.length; i++) view.setUint8(offset + i, string.charCodeAt(i));
        };

        writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + pcmData.length, true);
        writeString(view, 8, 'WAVE');
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, numChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * numChannels * (bitDepth / 8), true);
        view.setUint16(32, numChannels * (bitDepth / 8), true);
        view.setUint16(34, bitDepth, true);
        writeString(view, 36, 'data');
        view.setUint32(40, pcmData.length, true);

        const wavBuffer = new Uint8Array(header.byteLength + pcmData.length);
        wavBuffer.set(new Uint8Array(header), 0);
        wavBuffer.set(pcmData, header.byteLength);
        return wavBuffer;
    };

    // Core Load Logic
    const fetchAudio = async (): Promise<string> => {
        // 1. Memoria
        if (audioUrlRef.current) return audioUrlRef.current;

        // 2. Cache (IndexedDB)
        const cachedBlob = await getAudioFromCache(text);
        if (cachedBlob) {
            console.log("TTS: Cache Hit");
            const url = URL.createObjectURL(cachedBlob);
            audioUrlRef.current = url;
            if (mountedRef.current) setIsPreloaded(true);
            return url;
        }

        // 3. Network (Gemini API)
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
        if (!apiKey) throw new Error('Falta API Key');

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;
        const payload = {
            contents: [{ parts: [{ text: `Read aloud clearly: ${text}` }] }],
            generationConfig: {
                responseModalities: ["AUDIO"],
                speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Erinome" } } }
            }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(`Error API (${response.status}): ${errData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        const inlineData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData;
        if (!inlineData?.data) throw new Error('La IA no devolvió audio válido');

        // Decode & Convert
        const binaryString = window.atob(inlineData.data);
        const len = binaryString.length;
        const pcmBytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) pcmBytes[i] = binaryString.charCodeAt(i);

        const wavData = addWavHeader(pcmBytes);
        const wavBlob = new Blob([wavData], { type: 'audio/wav' });

        // Save to Cache
        await saveAudioToCache(text, wavBlob);

        const audioUrl = URL.createObjectURL(wavBlob);
        audioUrlRef.current = audioUrl;
        if (mountedRef.current) setIsPreloaded(true);
        return audioUrl;
    };

    // Preload Effect
    useEffect(() => {
        if (preload && text && !audioUrlRef.current) {
            fetchAudio().catch(e => console.warn("Preload failed:", e));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, preload]);

    const handlePlay = async () => {
        if (audioRef.current && !isPlaying) {
            await audioRef.current.play();
            setIsPlaying(true);
            return;
        }

        if (isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const url = await fetchAudio();

            const audio = new Audio(url);
            audioRef.current = audio;

            audio.onended = () => {
                if (mountedRef.current) setIsPlaying(false);
            };
            audio.onerror = () => {
                setError("Error reproducción");
                if (mountedRef.current) setIsPlaying(false);
            };

            await audio.play();
            if (mountedRef.current) setIsPlaying(true);

        } catch (err: any) {
            console.error("TTS Logic Error:", err);
            if (mountedRef.current) setError("Error al cargar audio");
        } finally {
            if (mountedRef.current) setIsLoading(false);
        }
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {error && (
                <span className="text-xs text-red-500 flex items-center gap-1 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded border border-red-200 dark:border-red-800 animate-pulse">
                    <AlertCircle size={12} /> {error}
                </span>
            )}

            <button
                onClick={handlePlay}
                disabled={isLoading}
                className={`
            flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all
            ${isPlaying
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)]'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg hover:shadow-indigo-500/50'}
            ${isLoading ? 'opacity-70 cursor-wait' : ''}
            disabled:opacity-50
        `}
                title="Escuchar contenido (Gemini TTS)"
            >
                {isLoading ? (
                    <Loader2 size={14} className="animate-spin" />
                ) : isPlaying ? (
                    <StopCircle size={14} />
                ) : (
                    <Volume2 size={14} />
                )}

                {isLoading ? 'Cargando...' : isPlaying ? 'Detener' : 'Escuchar Lección'}

                {/* Visual Indicator for Cached/Preloaded status */}
                {isPreloaded && !isPlaying && !isLoading && (
                    <span className="ml-1 w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_5px_rgba(74,222,128,0.8)]" title="Audio listo (Cacheado)"></span>
                )}
            </button>
        </div>
    );
};

export default TextToSpeechButton;
