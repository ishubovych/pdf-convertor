export interface PdfViewerProps {
  document?: Blob | null;
}

export interface PdfViewerState {
  data: { data: Uint8Array } | null;
  error: string | null;
} 