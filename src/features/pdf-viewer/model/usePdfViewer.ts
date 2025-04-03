import { useState, useEffect } from 'react';
import { PdfViewerState } from './types';

export const usePdfViewer = (document?: Blob | null) => {
  const [state, setState] = useState<PdfViewerState>({
    data: null,
    error: null,
  });

  useEffect(() => {
    if (!document) {
      setState({ data: null, error: null });
      return;
    }

    const reader = new FileReader();
    
    reader.onload = () => {
      try {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        
        setState({
          data: { data: uint8Array },
          error: null,
        });
      } catch (error) {
        console.error("Помилка обробки PDF даних:", error);
        setState({
          data: null,
          error: "Помилка обробки PDF даних",
        });
      }
    };

    reader.onerror = () => {
      console.error("Помилка читання файлу");
      setState({
        data: null,
        error: "Помилка читання файлу",
      });
    };

    reader.readAsArrayBuffer(document);
  }, [document]);

  return state;
}; 