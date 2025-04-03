import { ConvertSection } from "@/features/convert-pdf/ui/ConvertSection";
import { HistorySection } from "@/features/pdf-history";
import { ViewerSection } from "@/features/pdf-viewer/ui/ViewerSection";
import { STYLES } from "./styles";
import {
  getHistoryItems,
  HistoryItem,
  deleteHistoryItem,
  clearHistory,
} from "@/shared/lib/indexDb/historyStore";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [currentPdf, setCurrentPdf] = useState<Blob | null>(null);

  const loadHistory = useCallback(async () => {
    try {
      const items = await getHistoryItems();
      setHistory(items.reverse());
      setError(null);
    } catch (err) {
      setError("Помилка завантаження історії");
      console.error("Failed to load history:", err);
    }
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await deleteHistoryItem(id);
        await loadHistory();
      } catch (err) {
        console.error("Failed to delete item:", err);
      }
    },
    [loadHistory]
  );

  const handleClearHistory = useCallback(async () => {
    try {
      await clearHistory();
      setSelectedItem(null);
      await loadHistory();
    } catch (err) {
      console.error("Failed to clear history:", err);
      setError("Помилка очищення історії");
    }
  }, [loadHistory]);

  const handleSelect = useCallback((item: HistoryItem) => {
    console.log("Selected item:", item);
    setSelectedItem(item);
    setCurrentPdf(null);
  }, []);

  const handleConvertComplete = useCallback((pdfBlob: Blob) => {
    setCurrentPdf(pdfBlob);
    setSelectedItem(null);
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return (
    <div className={STYLES.container}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className={STYLES.grid}>
        <div className="col-span-4 h-62/100">
          <ConvertSection 
            onAfterConvert={loadHistory} 
            onConvertComplete={handleConvertComplete}
          />
          <HistorySection
            history={history}
            onSelect={handleSelect}
            onDelete={handleDelete}
            onClear={handleClearHistory}
          />
        </div>
        <ViewerSection document={currentPdf ?? selectedItem?.pdfBlob ?? null} />
      </div>
    </div>
  );
}

export default App;
