import { ConvertForm } from "./ConvertForm";
import { STYLES as APP_STYLES } from "@/app/styles";

interface ConvertSectionProps {
  onAfterConvert: () => void;
  onConvertComplete: (pdfBlob: Blob) => void;
}

export const ConvertSection = ({ onAfterConvert, onConvertComplete }: ConvertSectionProps) => {
  return (
    <div className={`${APP_STYLES.card} mb-6`}>
      <h2 className={APP_STYLES.cardTitle}>Форма</h2>
      <ConvertForm 
        onAfterConvert={onAfterConvert} 
        onConvertComplete={onConvertComplete}
      />
    </div>
  );
}; 