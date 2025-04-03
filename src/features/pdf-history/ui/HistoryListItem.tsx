import { memo } from "react";
import { STYLES } from "./styles";
import { HistoryItemProps } from "../model";

export const HistoryListItem = memo(({ item, onSelect, onDelete }: HistoryItemProps) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = URL.createObjectURL(item.pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.text}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <li className={STYLES.item} onClick={() => onSelect?.(item)}>
      <div className={STYLES.itemInfo}>
        <div className={STYLES.itemName}>{item.text}</div>
        <div className={STYLES.itemDate}>{item.date}</div>
      </div>
      <div className={STYLES.actions}>
        <button
          className={STYLES.downloadButton}
          onClick={handleDownload}
          title="Завантажити PDF"
        >
          ⬇️
        </button>
        <button
          className={STYLES.deleteButton}
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(item.id);
          }}
          title="Видалити"
        >
          ✕
        </button>
      </div>
    </li>
  );
});