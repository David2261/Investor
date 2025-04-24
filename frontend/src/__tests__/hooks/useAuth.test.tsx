import { renderHook, act } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Swal from 'sweetalert2';

// Мокаем хуки
jest.mock('@/hooks/useUser');
jest.mock('@/hooks/useLocalStorage');
jest.mock('sweetalert2');

describe('Хук useAuth', () => {
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

    const mockAddUser = jest.fn();
    const mockRemoveUser = jest.fn();
    const mockSetUser = jest.fn();
    const mockGetItem = jest.fn();

    beforeEach(() => {
        // Сбрасываем все моки перед каждым тестом
        jest.clearAllMocks();

        // Настраиваем моки хуков
        (useUser as jest.Mock).mockReturnValue({
            user: null,
            addUser: mockAddUser,
            removeUser: mockRemoveUser,
            setUser: mockSetUser,
        });

        (useLocalStorage as jest.Mock).mockReturnValue({
            getItem: mockGetItem,
        });
    });

    it('корректно инициализируется', () => {
        const { result } = renderHook(() => useAuth());

        expect(result.current.user).toBeNull();
        expect(typeof result.current.login).toBe('function');
        expect(typeof result.current.logout).toBe('function');
        expect(typeof result.current.setUser).toBe('function');
    });

    it('загружает пользователя из localStorage при инициализации', () => {
        mockGetItem.mockReturnValue(JSON.stringify(mockUser));

        renderHook(() => useAuth());

        expect(mockGetItem).toHaveBeenCalledWith('user');
        expect(mockAddUser).toHaveBeenCalledWith(mockUser);
    });

    it('корректно выполняет вход пользователя', () => {
        const { result } = renderHook(() => useAuth());

        act(() => {
            result.current.login(mockUser);
        });

        expect(mockAddUser).toHaveBeenCalledWith(mockUser);
    });

    it('корректно выполняет выход пользователя', () => {
        const { result } = renderHook(() => useAuth());

        act(() => {
            result.current.logout();
        });

        expect(mockRemoveUser).toHaveBeenCalled();
        expect(Swal.fire).toHaveBeenCalledWith({
            title: "You have been logged out...",
            icon: "success",
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        });
    });

    it('корректно обновляет данные пользователя', () => {
        const { result } = renderHook(() => useAuth());

        act(() => {
            result.current.setUser(mockUser);
        });

        expect(mockSetUser).toHaveBeenCalledWith(mockUser);
    });

    it('не загружает пользователя из localStorage, если данных нет', () => {
        mockGetItem.mockReturnValue(null);

        renderHook(() => useAuth());

        expect(mockGetItem).toHaveBeenCalledWith('user');
        expect(mockAddUser).not.toHaveBeenCalled();
    });

    it('обрабатывает ошибку при некорректных данных в localStorage', () => {
        mockGetItem.mockReturnValue('invalid json');

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        renderHook(() => useAuth());

        expect(consoleSpy).toHaveBeenCalled();
        expect(mockAddUser).not.toHaveBeenCalled();

        consoleSpy.mockRestore();
    });
});
