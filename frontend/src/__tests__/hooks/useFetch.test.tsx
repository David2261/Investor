import { expect, describe, beforeEach, it, vi } from 'vitest';
import type { Mock } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useFetch } from '@/hooks/useFetch.ts';

// Мокаем fetch
global.fetch = vi.fn() as any;

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
        vi.clearAllMocks();
        (global.fetch as Mock).mockClear();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('должен корректно инициализироваться', () => {
        const { result } = renderHook(() => useFetch(mockUrl));
        
        expect(result.current.data).toBeUndefined();
        expect(result.current.error).toBeUndefined();
    });

    it('должен успешно загружать данные', async () => {
        const mockFetchResponse: FetchResponse = {
            ok: true,
            json: () => Promise.resolve(mockData)
        };
    
        (global.fetch as Mock).mockResolvedValueOnce(mockFetchResponse as never);

        const { result } = renderHook(() => useFetch(mockUrl));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.data).toEqual(mockData);
        expect(result.current.error).toBeUndefined();
    });

    it('должен обрабатывать ошибки при загрузке', async () => {
        const errorMessage = 'Network error';
        (global.fetch as Mock).mockRejectedValueOnce(new Error(errorMessage) as never);

        const { result } = renderHook(() => useFetch(mockUrl));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.data).toBeUndefined();
        expect(result.current.error).toBeDefined();
    });

    it('должен обновлять данные при изменении URL', async () => {
        const newUrl = 'https://api.example.com/new-data';
        const newData = { id: 2, name: 'New Test' };

        (global.fetch as Mock)
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

        (global.fetch as Mock).mockResolvedValueOnce({
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
        (global.fetch as Mock).mockImplementationOnce(() =>
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
        (global.fetch as Mock).mockImplementationOnce(() =>
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
        (global.fetch as Mock).mockImplementationOnce(() =>
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

});


