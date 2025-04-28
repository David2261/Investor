import {expect, describe, beforeEach, it, vi} from 'vitest';
import { renderHook } from '@testing-library/react';
import useMediaQuery from '@/hooks/useMediaQuery';

// Мокаем window.matchMedia
const mockMatchMedia = vi.fn();

describe('Хук useMediaQuery', () => {
    let originalAddEventListener: typeof window.addEventListener;
    let originalRemoveEventListener: typeof window.removeEventListener;

    beforeEach(() => {
        vi.clearAllMocks();
        originalAddEventListener = window.addEventListener;
        originalRemoveEventListener = window.removeEventListener;

        // Мокаем window.matchMedia
        Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: mockMatchMedia,
        });

        // Мокаем window.addEventListener и window.removeEventListener
        window.addEventListener = vi.fn();
        window.removeEventListener = vi.fn();
    });

    afterEach(() => {
        window.addEventListener = originalAddEventListener;
        window.removeEventListener = originalRemoveEventListener;
    });

    it('возвращает false при инициализации', () => {
        const mockMediaQuery = {
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        };
        mockMatchMedia.mockReturnValue(mockMediaQuery);
    
        const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    
        expect(result.current).toBe(false);
    });

    it('корректно обрабатывает совпадение медиа-запроса', () => {
        const query = '(min-width: 768px)';
        const mockMediaQuery = {
            matches: true,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
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
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
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
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        };
    
        mockMatchMedia.mockReturnValue(mockMediaQuery);
    
        const { unmount } = renderHook(() => useMediaQuery(query));
    
        expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    
        unmount();
    
        expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    });
});


