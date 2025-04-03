import { HistoryItem } from "@/shared/lib/indexDb/historyStore";

export interface HistoryItemProps {
  item: HistoryItem;
  onSelect?: (item: HistoryItem) => void;
  onDelete?: (id: number) => void;
}

export interface HistoryListProps {
  items: HistoryItem[];
  onSelect?: (item: HistoryItem) => void;
  onDelete?: (id: number) => void;
} 