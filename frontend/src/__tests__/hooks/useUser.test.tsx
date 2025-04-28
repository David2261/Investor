import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useUser } from '@/hooks/useUser';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import AuthContext from '@/entities/context/AuthContext';

vi.mock('@/hooks/useLocalStorage', () => ({
	useLocalStorage: vi.fn(),
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

	const mockSetUser = vi.fn();
	const mockSetItem = vi.fn();

	const createWrapper = (initialUser: typeof mockUser | null = null) =>
		function Wrapper({ children }: { children: React.ReactNode }) {
			return (
				<AuthContext.Provider value={{ user: initialUser, setUser: mockSetUser }}>
				{children}
				</AuthContext.Provider>
			);
	};

	beforeEach(() => {
		vi.clearAllMocks();
	
		(useLocalStorage as any).mockReturnValue({
		  setItem: mockSetItem,
		  getItem: vi.fn(() => null),
		  removeItem: vi.fn(),
		});
	});

	it('корректно инициализируется', () => {
		const { result } = renderHook(() => useUser());

		expect(result.current.user).toBeNull();
		expect(typeof result.current.addUser).toBe('function');
		expect(typeof result.current.removeUser).toBe('function');
		expect(typeof result.current.setUser).toBe('function');
	});

	it('корректно добавляет пользователя', () => {
		const { result } = renderHook(() => useUser(), { wrapper: createWrapper(mockUser) });

		act(() => {
			result.current.addUser(mockUser);
		});

		expect(mockSetUser).toHaveBeenCalledWith(mockUser);
		expect(mockSetItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
	});

	it('корректно удаляет пользователя', () => {
		const { result } = renderHook(() => useUser(), { wrapper: createWrapper(mockUser) });

		act(() => {
			result.current.removeUser();
		});

		result.current.removeUser();

		expect(mockSetUser).toHaveBeenCalledWith(null);
		expect(mockSetItem).toHaveBeenCalledWith('user', '');
	});

	it('возвращает текущего пользователя', () => {
		const { result } = renderHook(() => useUser(), { wrapper: createWrapper(mockUser) });
	
		expect(result.current.user).toEqual(mockUser);
	  });

	it('корректно обновляет пользователя', () => {
		const mockSetUser = vi.fn();
		const wrapper = ({ children }: any) => (
		  <AuthContext.Provider value={{ user: null, setUser: mockSetUser }}>
			{children}
		  </AuthContext.Provider>
		);
	
		const { result } = renderHook(() => useUser(), { wrapper });
	
		act(() => {
		  result.current.setUser(mockUser);
		});
	
		expect(mockSetUser).toHaveBeenCalledWith(mockUser);
	  });
});
