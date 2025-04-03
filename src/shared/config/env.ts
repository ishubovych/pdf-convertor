interface Env {
  VITE_PDF_API_KEY: string;
  VITE_PDF_API_URL: string;
}

const getEnvVars = (): Env => {
  if (process.env.NODE_ENV === 'test') {
    return {
      VITE_PDF_API_KEY: 'test-api-key',
      VITE_PDF_API_URL: 'http://test-api.com',
    };
  }

  return {
    VITE_PDF_API_KEY: import.meta.env.VITE_PDF_API_KEY,
    VITE_PDF_API_URL: import.meta.env.VITE_PDF_API_URL,
  };
};

export const env = getEnvVars(); 