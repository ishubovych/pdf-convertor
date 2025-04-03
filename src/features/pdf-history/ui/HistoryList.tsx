import { memo } from "react";
import { STYLES } from "./styles";
import { HistoryListProps } from "../model";
import { HistoryListItem } from "./HistoryListItem";

export const HistoryList = memo(({ items, onSelect, onDelete }: HistoryListProps) => {
  if (!items?.length) {
    return (
      <ul className={STYLES.list}>
        <li className={STYLES.emptyState}>
          Поки що порожньо
        </li>
      </ul>
    );
  }

  return (
    <ul className={STYLES.list} role="list">
      {items.map((item) => (
        <HistoryListItem
          key={item.id}
          item={item}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
});
