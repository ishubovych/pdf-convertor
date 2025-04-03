export interface ConvertPdfState {
  data: Blob | null;
  error: string | null;
  isLoading: boolean;
  progress: number;
} 