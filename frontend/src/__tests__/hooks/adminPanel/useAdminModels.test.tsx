import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { jest, expect, describe, it, beforeAll, afterAll, beforeEach, afterEach } from '@jest/globals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { useAdminModels } from '../../../hooks/adminPanel/useAdminModels';
import AuthContext from '../../../entities/context/AuthContext';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock AuthContext
const mockAuthTokens = {
    access: 'test-access-token'
};

const mockAuthContext = {
    authTokens: mockAuthTokens
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

describe('useAdminModels', () => {
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

    it('should fetch admin models successfully', async () => {
        const mockResponse = {
            articles: ['article', 'category'],
            bonds: ['bond', 'type']
        };

        mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

        const { result } = renderHook(() => useAdminModels(), { wrapper });

        // Initial state
        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toBeUndefined();

        // Wait for the query to complete
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Verify the request was made with correct parameters
        expect(mockedAxios.get).toHaveBeenCalledWith(
            'http://test-api.com/api/admin/apps/models/',
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

        const { result } = renderHook(() => useAdminModels(), { wrapper });

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
            <AuthContext.Provider value={{ authTokens: null }}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </AuthContext.Provider>
        );

        const { result } = renderHook(() => useAdminModels(), { wrapper: wrapperWithoutAuth });

        expect(result.current.isLoading).toBe(false);
        expect(mockedAxios.get).not.toHaveBeenCalled();
    });
});


