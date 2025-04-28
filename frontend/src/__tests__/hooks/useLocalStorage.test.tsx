import { expect, describe, beforeEach, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// Мокаем localStorage
const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
});

describe('Хук useLocalStorage', () => {
    beforeEach(() => {
        // Сбрасываем все моки перед каждым тестом
        vi.clearAllMocks();
    });

    it('корректно инициализируется', () => {
        const { result } = renderHook(() => useLocalStorage());

        expect(result.current.value).toBeNull();
        expect(typeof result.current.setItem).toBe('function');
        expect(typeof result.current.getItem).toBe('function');
        expect(typeof result.current.removeItem).toBe('function');
    });

    it('корректно сохраняет значение в localStorage', () => {
        const { result } = renderHook(() => useLocalStorage());
        const key = 'testKey';
        const value = 'testValue';

        act(() => {
            result.current.setItem(key, value);
        });

        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(key, value);
        expect(result.current.value).toBe(value);
    });

    it('корректно получает значение из localStorage', () => {
        const { result } = renderHook(() => useLocalStorage());
        const key = 'testKey';
        const value = 'testValue';

        mockLocalStorage.getItem.mockReturnValue(value);

        act(() => {
            const retrievedValue = result.current.getItem(key);
            expect(retrievedValue).toBe(value);
        });

        expect(mockLocalStorage.getItem).toHaveBeenCalledWith(key);
        expect(result.current.value).toBe(value);
    });

    it('корректно удаляет значение из localStorage', () => {
        const { result } = renderHook(() => useLocalStorage());
        const key = 'testKey';

        act(() => {
            result.current.removeItem(key);
        });

        expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(key);
        expect(result.current.value).toBeNull();
    });

    it('возвращает null при отсутствии значения в localStorage', () => {
        const { result } = renderHook(() => useLocalStorage());
        const key = 'nonExistentKey';

        mockLocalStorage.getItem.mockReturnValue(null);

        act(() => {
            const retrievedValue = result.current.getItem(key);
            expect(retrievedValue).toBeNull();
        });

        expect(result.current.value).toBeNull();
    });
});
