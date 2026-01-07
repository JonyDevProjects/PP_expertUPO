export const CACHE_NAME = 'TTS_CACHE_V2';
export const STORE_NAME = 'audio_store';

const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        // Validación de soporte
        if (!('indexedDB' in window)) {
            reject(new Error("IndexedDB no soportado"));
            return;
        }

        const request = indexedDB.open(CACHE_NAME, 1);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };

        request.onsuccess = (event) => {
            resolve((event.target as IDBOpenDBRequest).result);
        };

        request.onerror = (event) => {
            reject((event.target as IDBOpenDBRequest).error);
        };
    });
};

/**
 * Genera una clave única simple para el texto (hash simple)
 * para evitar usar strings muy largos como key si fuera necesario,
 * pero IndexedDB soporta strings largos como keys. 
 * Usaremos el texto directo para simplicidad y colisiones nulas.
 */
const getKey = (text: string) => text.trim();

export const getAudioFromCache = async (text: string): Promise<Blob | null> => {
    try {
        const db = await openDB();
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const key = getKey(text);

        return new Promise((resolve, reject) => {
            const request = store.get(key);
            request.onsuccess = () => resolve(request.result as Blob || null);
            request.onerror = () => reject(request.error);
        });
    } catch (e) {
        console.warn("Error leyendo cache TTS:", e);
        return null; // Fallback grácil
    }
};

export const saveAudioToCache = async (text: string, audioBlob: Blob): Promise<void> => {
    try {
        const db = await openDB();
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const key = getKey(text);

        store.put(audioBlob, key);
    } catch (e) {
        console.warn("Error guardando cache TTS:", e);
    }
};
