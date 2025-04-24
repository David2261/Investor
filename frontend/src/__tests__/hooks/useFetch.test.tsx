import { expect, describe, beforeEach, it } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useFetch } from '@/hooks/useFetch.ts';

// Мокаем fetch
global.fetch = jest.fn() as any;

interface FetchResponse {
    ok: boolean;
    json: () => Promise<{ id: number; name: string; }>;
}

describe('Хук useFetch', () => {
    const mockData = { id: 1, name: 'Test' };
    const mockUrl = 'https://api.example.com/data';
    const mockOptions = { method: 'GET' };

    beforeEach(() => {
        // Сбрасываем все моки перед каждым тестом
        jest.clearAllMocks();
        (global.fetch as jest.Mock).mockClear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('должен корректно инициализироваться', () => {
        const { result } = renderHook(() => useFetch(mockUrl));
        
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeNull();
    });

    it('должен успешно загружать данные', async () => {
        const mockFetchResponse: FetchResponse = {
            ok: true,
            json: () => Promise.resolve(mockData)
        };
    
        (global.fetch as jest.Mock).mockResolvedValueOnce(mockFetchResponse as never);

        const { result } = renderHook(() => useFetch(mockUrl));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.data).toEqual(mockData);
        expect(result.current.error).toBeNull();
    });

    it('должен обрабатывать ошибки при загрузке', async () => {
        const errorMessage = 'Network error';
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage) as never);

        const { result } = renderHook(() => useFetch(mockUrl));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.data).toBeNull();
        expect(result.current.error).toBe(errorMessage);
    });

    it('должен обрабатывать HTTP ошибки', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404,
            statusText: 'Not Found'
        } as never);

        const { result } = renderHook(() => useFetch(mockUrl));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.data).toBeNull();
        expect(result.current.error).toBe('HTTP error! status: 404');
    });

    it('должен обновлять данные при изменении URL', async () => {
        const newUrl = 'https://api.example.com/new-data';
        const newData = { id: 2, name: 'New Test' };

        (global.fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockData)
            } as never)
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(newData)
            } as never);

        const { result, rerender } = renderHook(({ url }) => useFetch(url), {
            initialProps: { url: mockUrl }
        });

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.data).toEqual(mockData);

        rerender({ url: newUrl });

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.data).toEqual(newData);
    });

    it('должен использовать переданные опции при запросе', async () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ test: 'data' })
        };

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockData)
        } as never);

        renderHook(() => useFetch(mockUrl, options));

        expect(global.fetch).toHaveBeenCalledWith(mockUrl, options);
    });

    it('возвращает начальное состояние', () => {
        const { result } = renderHook(() => useFetch());

        expect(result.current).toEqual({
            data: undefined,
            error: undefined,
        });
    });

    it('не делает запрос при отсутствии URL', () => {
        renderHook(() => useFetch());

        expect(global.fetch).not.toHaveBeenCalled();
    });

    it('корректно обрабатывает успешный запрос', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            })
        );

        const { result } = renderHook(() => useFetch(mockUrl, mockOptions));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(mockUrl, mockOptions);
            expect(result.current).toEqual({
                data: mockData,
                error: undefined,
            });
        });
    });

    it('корректно обрабатывает ошибку запроса', async () => {
        const mockError = new Error('Network error');
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.reject(mockError)
        );

        const { result } = renderHook(() => useFetch(mockUrl, mockOptions));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(mockUrl, mockOptions);
            expect(result.current).toEqual({
                data: undefined,
                error: mockError,
            });
        });
    });

    it('корректно обрабатывает неверный ответ', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                statusText: 'Not Found',
            })
        );

        const { result } = renderHook(() => useFetch(mockUrl, mockOptions));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(mockUrl, mockOptions);
            expect(result.current.error).toBeDefined();
            expect(result.current.error?.message).toBe('Not Found');
        });
    });

    it('использует кэш при повторном запросе', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            })
        );

        const { result: firstResult } = renderHook(() =>
            useFetch(mockUrl, mockOptions)
        );

        await waitFor(() => {
            expect(firstResult.current.data).toEqual(mockData);
        });

        const { result: secondResult } = renderHook(() =>
            useFetch(mockUrl, mockOptions)
        );

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(secondResult.current).toEqual({
            data: mockData,
            error: undefined,
        });
    });

    it('отменяет запрос при размонтировании компонента', async () => {
        const mockAbortController = {
            abort: jest.fn(),
        };
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            })
        );

        const { unmount } = renderHook(() => useFetch(mockUrl, mockOptions));

        unmount();

        expect(jest.fn()).toHaveBeenCalledWith(mockUrl, {
            ...mockOptions,
            signal: expect.any(AbortSignal),
        });
    });
});


