export const STYLES = {
  list: "flex flex-col gap-2 max-h-[595px] overflow-y-auto p-2",
  emptyState: "text-gray-500 text-center p-4 italic",
  item: "flex items-center justify-between p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow",
  itemInfo: "flex-1 min-w-0",
  itemName: "font-medium whitespace-nowrap overflow-hidden text-ellipsis",
  itemDate: "text-sm text-gray-500",
  deleteButton: "text-red-500 hover:text-red-700 p-2",
  downloadButton: "text-blue-500 hover:text-blue-700 p-2",
  actions: "flex items-center gap-1",
  header: "flex items-center justify-between mb-4",
  clearButton: "text-sm text-red-500 hover:text-red-700 px-3 py-1 border border-red-500 hover:border-red-700 rounded",
} as const; 