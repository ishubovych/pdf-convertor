import { createPdf } from "@/shared/api/pdf/pdfApi";
import { addHistoryItem } from "@/shared/lib/indexDb/historyStore";
import { useState } from "react";

export const useConvertPdf = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // от 0 до 100

  const convert = async (text: string): Promise<Blob | null> => {
    if (!text.trim()) return null;
    setLoading(true);
    setProgress(0);

    try {
      const pdfBlob = await createPdf(
        { text },
        (currentProgress: number) => setProgress(currentProgress)
      );

      await addHistoryItem({
        text,
        pdfBlob,
        date: new Date().toISOString(),
      });

      return pdfBlob;
    } catch (err) {
      console.error("Помилка завантаження PDF:", err);
      return null;
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  return { convert, loading, progress };
};
