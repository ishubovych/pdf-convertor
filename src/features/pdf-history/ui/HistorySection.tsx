import { HistoryList } from "./HistoryList";
import { STYLES as HISTORY_STYLES } from "./styles";
import { STYLES as APP_STYLES } from "@/app/styles";
import { HistoryItem } from "@/shared/lib/indexDb/historyStore";

interface HistorySectionProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onDelete: (id: number) => void;
  onClear: () => void;
}

export const HistorySection = ({
  history,
  onSelect,
  onDelete,
  onClear,
}: HistorySectionProps) => {
  return (
    <div className={`${APP_STYLES.card} overflow-y-auto`}>
      <div className={HISTORY_STYLES.header}>
        <h2 className={APP_STYLES.cardTitle}>Історія конвертацій</h2>
        <button onClick={onClear} className={HISTORY_STYLES.clearButton}>
          Очистити
        </button>
      </div>
      <HistoryList items={history} onSelect={onSelect} onDelete={onDelete} />
    </div>
  );
}; 