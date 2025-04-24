import { renderHook } from '@testing-library/react';
import { useUser } from '@/hooks/useUser';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import AuthContext from '@/entities/context/AuthContext';

// Мокаем хуки и контекст
jest.mock('@/hooks/useLocalStorage');
jest.mock('@/entities/context/AuthContext', () => ({
    __esModule: true,
    default: {
        Provider: ({ children }: { children: React.ReactNode }) => children,
    },
}));

describe('Хук useUser', () => {
    const mockUser = {
        url: "localhost.com",
		is_active: true,
		is_staff: true,
        username: 'testuser',
        email: 'test@example.com',
        member: {
            is_admin: true,
            is_creator: true
        },
    };

    const mockSetUser = jest.fn();
    const mockSetItem = jest.fn();

    beforeEach(() => {
        // Сбрасываем все моки перед каждым тестом
        jest.clearAllMocks();

        // Настраиваем моки
        (useLocalStorage as jest.Mock).mockReturnValue({
            setItem: mockSetItem,
        });

        // Мокаем контекст
        jest.spyOn(require('react'), 'useContext').mockImplementation(() => ({
            user: null,
            setUser: mockSetUser,
        }));
    });

    it('корректно инициализируется', () => {
        const { result } = renderHook(() => useUser());

        expect(result.current.user).toBeNull();
        expect(typeof result.current.addUser).toBe('function');
        expect(typeof result.current.removeUser).toBe('function');
        expect(typeof result.current.setUser).toBe('function');
    });

    it('корректно добавляет пользователя', () => {
        const { result } = renderHook(() => useUser());

        result.current.addUser(mockUser);

        expect(mockSetUser).toHaveBeenCalledWith(mockUser);
        expect(mockSetItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
    });

    it('корректно удаляет пользователя', () => {
        const { result } = renderHook(() => useUser());

        result.current.removeUser();

        expect(mockSetUser).toHaveBeenCalledWith(null);
        expect(mockSetItem).toHaveBeenCalledWith('user', '');
    });

    it('возвращает текущего пользователя', () => {
        jest.spyOn(require('react'), 'useContext').mockImplementation(() => ({
            user: mockUser,
            setUser: mockSetUser,
        }));

        const { result } = renderHook(() => useUser());

        expect(result.current.user).toEqual(mockUser);
    });

    it('корректно обновляет пользователя', () => {
        const { result } = renderHook(() => useUser());

        result.current.setUser(mockUser);

        expect(mockSetUser).toHaveBeenCalledWith(mockUser);
    });
});
