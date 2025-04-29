import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import type { Mocked } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { useAdminApps } from '../../../hooks/adminPanel/useAdminApps';
import AuthContext from '../../../entities/context/AuthContext';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;

// Mock AuthContext
const mockAuthTokens = {
    access: 'test-access-token'
};

const mockAuthContext = {
    authTokens: mockAuthTokens,
    user: null,
    setUser: vi.fn(),
    loginUser: vi.fn(),
    registrationUser: vi.fn(),
    logoutUser: vi.fn(),
    refreshAuthTokens: vi.fn(),
    updateUser: vi.fn(),
    deleteUser: vi.fn()
};

// Mock environment variable
const originalEnv = process.env;
beforeAll(() => {
    process.env = {
        ...originalEnv,
        VITE_API_URL: 'http://test-api.com'
    };
});

afterAll(() => {
    process.env = originalEnv;
});

describe('useAdminApps', () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = new QueryClient();
        vi.clearAllMocks();
    });

    afterEach(() => {
        queryClient.clear();
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthContext.Provider value={mockAuthContext}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </AuthContext.Provider>
    );

    it('should handle API errors', async () => {
        const errorMessage = 'Network Error';
        mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

        const { result } = renderHook(() => useAdminApps(), { wrapper });

        // Wait for the query to complete
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.isError).toBe(false);
    });

    it('should not make API call when auth tokens are not available', () => {
        const wrapperWithoutAuth = ({ children }: { children: React.ReactNode }) => (
            <AuthContext.Provider value={{ ...mockAuthContext, authTokens: null }}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </AuthContext.Provider>
        );

        const { result } = renderHook(() => useAdminApps(), { wrapper: wrapperWithoutAuth });

        expect(result.current.isLoading).toBe(false);
        expect(mockedAxios.get).not.toHaveBeenCalled();
    });

});


