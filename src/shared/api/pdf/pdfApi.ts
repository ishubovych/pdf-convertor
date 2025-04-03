import { CreatePdfRequest } from './types';
import { env } from '@/shared/config/env';


export const createPdf = async (
  request: CreatePdfRequest,
  onProgress?: (progress: number) => void
): Promise<Blob> => {
  try {
    const response = await fetch(`${env.VITE_PDF_API_URL}?apiKey=${env.VITE_PDF_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentLength = Number(response.headers.get('Content-Length')) || 0;
    const reader = response.body?.getReader();
    const chunks: Uint8Array[] = [];
    let received = 0;

    if (!reader) {
      throw new Error('ReadableStream not supported');
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      if (value) {
        chunks.push(value);
        received += value.length;

        if (contentLength > 0 && onProgress) {
          const percentage = Math.floor((received / contentLength) * 100);
          onProgress(percentage);
        }
      }
    }

    return new Blob(chunks, { type: 'application/pdf' });
  } catch (error) {
    console.error('Помилка створення PDF:', error);
    throw error;
  }
}; 