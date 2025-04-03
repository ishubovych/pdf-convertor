export interface CreatePdfRequest {
  text: string;
}

export interface PdfApiConfig {
  apiKey: string;
  baseUrl: string;
}

export interface PdfApiResponse {
  blob: Blob;
  progress: number;
} 