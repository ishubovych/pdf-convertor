import { renderHook, act } from '@testing-library/react';
import { useConvertPdf } from '../index';

const mockFetch = global.fetch as jest.MockedFunction<typeof global.fetch>;

jest.mock('@/shared/config/env', () => ({
  env: {
    VITE_PDF_API_KEY: 'test-api-key',
    VITE_PDF_API_URL: 'http://test-api.com',
  },
}));

jest.mock('@/shared/lib/indexDb/historyStore', () => ({
  addHistoryItem: jest.fn(),
}));

describe('useConvertPdf', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle empty text', async () => {
    const { result } = renderHook(() => useConvertPdf());

    await act(async () => {
      const blob = await result.current.convert('');
      expect(blob).toBeNull();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.progress).toBe(0);
  });

  it('should handle successful conversion', async () => {
    const mockBlob = new Blob(['test'], { type: 'application/pdf' });
    const mockReader = {
      read: jest.fn()
        .mockResolvedValueOnce({ done: false, value: new Uint8Array([1, 2, 3]) })
        .mockResolvedValueOnce({ done: true }),
      cancel: jest.fn(),
    };
    const mockBody = {
      getReader: () => mockReader,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      headers: new Headers({ 'Content-Length': '3' }),
      body: mockBody,
      blob: () => Promise.resolve(mockBlob),
    } as unknown as Response);

    const { result } = renderHook(() => useConvertPdf());

    let blob;
    await act(async () => {
      blob = await result.current.convert('test text');
    });

    expect(blob).toEqual(mockBlob);
    expect(result.current.loading).toBe(false);
    expect(result.current.progress).toBe(100);

    expect(mockFetch).toHaveBeenCalledWith(
      'http://test-api.com?apiKey=test-api-key',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: 'test text',
        }),
      })
    );
  });

  it('should handle API error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    const { result } = renderHook(() => useConvertPdf());

    await act(async () => {
      const blob = await result.current.convert('test text');
      expect(blob).toBeNull();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.progress).toBe(100);
  });

  it('should handle network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useConvertPdf());

    await act(async () => {
      const blob = await result.current.convert('test text');
      expect(blob).toBeNull();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.progress).toBe(100);
  });
}); 