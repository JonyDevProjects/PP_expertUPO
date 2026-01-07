import React, { useState, useRef, useEffect } from 'react';
import { Volume2, StopCircle, Loader2, AlertCircle } from 'lucide-react';

interface TextToSpeechProps {
  text: string; // El texto que la IA leerá
  className?: string;
}

const TextToSpeechButton: React.FC<TextToSpeechProps> = ({ text, className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Limpieza al desmontar
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const handlePlay = async () => {
    // Si ya hay audio cargado, solo reproducir
    if (audioRef.current && !isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
        return;
    }

    // 1. Gestión de Riesgos: Validación
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ''; 
    if (!apiKey) {
      setError('Falta API Key (VITE_GEMINI_API_KEY)');
      return;
    }

    if (!text || text.trim().length === 0) {
        setError('No hay texto para leer');
        return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 2. Comunicación con la API (Adquisiciones externas)
      // Usamos fetch directo para evitar problemas de dependencias de Node en el navegador
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;
      
      const payload = {
        contents: [{
          parts: [{ text: `Read aloud in a warm and friendly tone, clearly and slowly for students: ${text}` }]
        }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: "Erinome" // La voz solicitada en tu script
              }
            }
          }
        }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Error API: ${response.statusText}`);
      }

      const data = await response.json();

      // 3. Procesamiento de la Respuesta (Base64 a Audio Blob)
      // La API devuelve inlineData con base64
      const inlineData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData;
      
      if (!inlineData || !inlineData.data) {
        throw new Error('No se recibió audio de la IA');
      }

      // Decodificar Base64
      const binaryString = window.atob(inlineData.data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Crear Blob y URL
      const blob = new Blob([bytes], { type: 'audio/wav' }); // Gemini suele devolver PCM/WAV encapsulado
      const audioUrl = URL.createObjectURL(blob);

      // 4. Reproducción
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
          setError("Error al reproducir audio");
          setIsPlaying(false);
      };

      await audio.play();
      setIsPlaying(true);

    } catch (err: any) {
      console.error("Error TTS:", err);
      setError(err.message || "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {error && (
        <span className="text-xs text-red-400 flex items-center gap-1 bg-red-900/20 px-2 py-1 rounded border border-red-500/50 animate-pulse">
          <AlertCircle size={12} /> {error}
        </span>
      )}
      
      <button
        onClick={isPlaying ? handleStop : handlePlay}
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
        {isLoading ? 'Generando Voz...' : isPlaying ? 'Detener Audio' : 'Escuchar Lección'}
      </button>
    </div>
  );
};

export default TextToSpeechButton;