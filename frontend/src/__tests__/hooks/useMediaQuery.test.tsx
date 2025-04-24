import {expect, describe, beforeEach, it} from 'vitest';
import { renderHook } from '@testing-library/react';
import useMediaQuery from '@/hooks/useMediaQuery';

// Мокаем window.matchMedia
const mockMatchMedia = jest.fn();
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: mockMatchMedia,
});

describe('Хук useMediaQuery', () => {
    beforeEach(() => {
        // Сбрасываем все моки перед каждым тестом
        jest.clearAllMocks();
    });

    it('возвращает false при инициализации', () => {
        const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

        expect(result.current).toBe(false);
    });

    it('корректно обрабатывает совпадение медиа-запроса', () => {
        const query = '(min-width: 768px)';
        const mockMediaQuery = {
            matches: true,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        };

        mockMatchMedia.mockReturnValue(mockMediaQuery);

        const { result } = renderHook(() => useMediaQuery(query));

        expect(mockMatchMedia).toHaveBeenCalledWith(query);
        expect(result.current).toBe(true);
    });

    it('корректно обрабатывает несовпадение медиа-запроса', () => {
        const query = '(min-width: 768px)';
        const mockMediaQuery = {
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        };

        mockMatchMedia.mockReturnValue(mockMediaQuery);

        const { result } = renderHook(() => useMediaQuery(query));

        expect(mockMatchMedia).toHaveBeenCalledWith(query);
        expect(result.current).toBe(false);
    });

    it('добавляет и удаляет обработчик события resize', () => {
        const query = '(min-width: 768px)';
        const mockMediaQuery = {
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        };

        mockMatchMedia.mockReturnValue(mockMediaQuery);

        const { unmount } = renderHook(() => useMediaQuery(query));

        expect(mockMediaQuery.addEventListener).toHaveBeenCalledWith(
            'resize',
            expect.any(Function)
        );

        unmount();

        expect(mockMediaQuery.removeEventListener).toHaveBeenCalledWith(
            'resize',
            expect.any(Function)
        );
    });
});


