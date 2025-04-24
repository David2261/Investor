import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { useAdminApps } from '../../../hooks/adminPanel/useAdminApps';
import AuthContext from '../../../entities/context/AuthContext';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock AuthContext
const mockAuthTokens = {
    access: 'test-access-token'
};

const mockAuthContext = {
    authTokens: mockAuthTokens,
    user: null,
    setUser: jest.fn(),
    loginUser: jest.fn(),
    registrationUser: jest.fn(),
    logoutUser: jest.fn(),
    refreshAuthTokens: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn()
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
        jest.clearAllMocks();
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

    it('should fetch admin apps successfully', async () => {
        const mockResponse = [
            {
                id: 1,
                name: 'articles',
                label: 'Articles',
                verbose_name: 'Articles'
            },
            {
                id: 2,
                name: 'bonds',
                label: 'Bonds',
                verbose_name: 'Bonds'
            }
        ];

        mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

        const { result } = renderHook(() => useAdminApps(), { wrapper });

        // Initial state
        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toBeUndefined();

        // Wait for the query to complete
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Verify the request was made with correct parameters
        expect(mockedAxios.get).toHaveBeenCalledWith(
            'http://test-api.com/api/admin/apps/',
            {
                headers: {
                    Authorization: `Bearer ${mockAuthTokens.access}`
                }
            }
        );

        // Verify the response was handled correctly
        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toEqual(mockResponse);
    });

    it('should handle API errors', async () => {
        const errorMessage = 'Network Error';
        mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

        const { result } = renderHook(() => useAdminApps(), { wrapper });

        // Wait for the query to complete
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.isError).toBe(true);
        expect(result.current.error).toBeInstanceOf(Error);
        expect(result.current.error?.message).toBe(errorMessage);
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

    it('should have correct query configuration', () => {
        const { result } = renderHook(() => useAdminApps(), { wrapper });

        expect(result.current.queryKey).toEqual(['adminApps']);
        expect(result.current.retry).toBe(2);
        expect(result.current.staleTime).toBe(5 * 60 * 1000);
    });
});


