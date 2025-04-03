import { memo, useState } from "react";
import { PdfViewerProps } from "../model/types";
import { usePdfViewer } from "../model/usePdfViewer";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { STYLES } from "./styles";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export const PdfViewer = memo(({ document }: PdfViewerProps) => {
  const { data, error } = usePdfViewer(document);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoadingError(null);
  }

  function onDocumentLoadError() {
    setLoadingError("Помилка завантаження PDF документа");
  }

  if (error) {
    return <div className={STYLES.error}>{error}</div>;
  }

  if (!data) {
    return <div className={STYLES.empty}>PDF документ не завантажено</div>;
  }

  if (loadingError) {
    return <div className={STYLES.error}>{loadingError}</div>;
  }

  return (
    <div className={STYLES.container}>
      <Document
        file={data}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={<div className={STYLES.loading}>Завантаження PDF...</div>}
      >
        <Page
          pageNumber={pageNumber}
          renderTextLayer={true}
          renderAnnotationLayer={true}
        />
      </Document>
      {numPages > 0 && (
        <div className={STYLES.navigation}>
          <button
            onClick={() => setPageNumber((page) => Math.max(1, page - 1))}
            disabled={pageNumber <= 1}
            className={STYLES.button}
          >
            Попередня
          </button>
          <span className={STYLES.pageInfo}>
            Сторінка {pageNumber} з {numPages}
          </span>
          <button
            onClick={() => setPageNumber((page) => Math.min(numPages, page + 1))}
            disabled={pageNumber >= numPages}
            className={STYLES.button}
          >
            Наступна
          </button>
        </div>
      )}
    </div>
  );
});

PdfViewer.displayName = "PdfViewer";
