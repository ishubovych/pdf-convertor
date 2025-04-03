import { useConvertPdf } from "../model/useConvertPdf";
import { useState, useCallback } from "react";
import { ConvertButton } from "./ConvertButton";
import { STYLES } from "./styles";

interface ConvertFormProps {
  onAfterConvert: () => void;
  onConvertComplete: (pdfBlob: Blob) => void;
}

export const ConvertForm = ({
  onAfterConvert,
  onConvertComplete,
}: ConvertFormProps) => {
  const [text, setText] = useState("");
  const { convert, loading, progress } = useConvertPdf();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!text.trim()) return;

      try {
        const pdfBlob = await convert(text);
        if (pdfBlob) {
          onConvertComplete(pdfBlob);
          onAfterConvert();
          setText("");
        }
      } catch (error) {
        console.error("Conversion failed:", error);
      }
    },
    [text, convert, onAfterConvert, onConvertComplete]
  );

  return (
    <form onSubmit={handleSubmit} className={STYLES.form}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введіть текст для конвертації в PDF..."
        className={STYLES.textarea}
        disabled={loading}
      />
      <div className={STYLES.buttonContainer}>
        <ConvertButton
          loading={loading}
          isPending={false}
          progress={progress}
          disabled={loading || !text.trim()}
        />
      </div>
    </form>
  );
};
