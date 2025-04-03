import { PdfViewer } from "./PdfViewer";
import { STYLES as APP_STYLES } from "@/app/styles";

interface ViewerSectionProps {
  document: Blob | null;
}

export const ViewerSection = ({ document }: ViewerSectionProps) => {
  return (
    <div className="col-span-8 bg-white rounded-lg p-4 shadow-sm mr-6 h-100/100">
      <h2 className={APP_STYLES.cardTitle}>Перегляд</h2>
      <PdfViewer document={document} />
    </div>
  );
}; 