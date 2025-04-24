import React from 'react';
import { render, screen } from '@testing-library/react';
import {expect, describe, beforeEach, jest, it} from '@jest/globals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayoutRoute from '@/entities/routers/AdminLayoutRoute.tsx';
import AuthContext from '@/entities/context/AuthContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock hooks
jest.mock('@/hooks/adminPanel/useAdminApps.tsx');
jest.mock('@/hooks/adminPanel/useAdminModels.tsx');

const mockUseAdminApps: jest.Mock = jest.requireMock('@/hooks/adminPanel/useAdminApps.tsx');
const mockUseAdminModels: jest.Mock = jest.requireMock('@/hooks/adminPanel/useAdminModels.tsx');

describe('AdminLayoutRoute', () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = new QueryClient();
        jest.clearAllMocks();
    });

    afterEach(() => {
        queryClient.clear();
    });

    const renderWithProviders = (authContextValue: any) => {
        return render(
            <QueryClientProvider client={queryClient}>
                <AuthContext.Provider value={authContextValue}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/admin/*" element={<AdminLayoutRoute />}>
                                <Route path="dashboard" element={<div>Admin Dashboard</div>} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </AuthContext.Provider>
            </QueryClientProvider>
        );
    };

    it('should show preloader when loading', () => {
        mockUseAdminApps.mockReturnValue({ isLoading: true });
        mockUseAdminModels.mockReturnValue({ isLoading: true });

        renderWithProviders({
            user: null,
            loading: true
        });

        expect(screen.getByTestId('preloader')).toBeInTheDocument();
    });

    it('should show error message when apps loading fails', () => {
        mockUseAdminApps.mockReturnValue({ 
            isLoading: false,
            error: new Error('Apps loading failed')
        });
        mockUseAdminModels.mockReturnValue({ isLoading: false });

        renderWithProviders({
            user: { member: { is_admin: true } },
            loading: false
        });

        expect(screen.getByText(/Ошибка при загрузке приложений/i)).toBeInTheDocument();
    });

    it('should show error message when models loading fails', () => {
        mockUseAdminApps.mockReturnValue({ 
            isLoading: false,
            data: []
        });
        mockUseAdminModels.mockReturnValue({ 
            isLoading: false,
            error: new Error('Models loading failed')
        });

        renderWithProviders({
            user: { member: { is_admin: true } },
            loading: false
        });

        expect(screen.getByText(/Ошибка при загрузке моделей/i)).toBeInTheDocument();
    });

    it('should show no data message when no apps or models', () => {
        mockUseAdminApps.mockReturnValue({ 
            isLoading: false,
            data: null
        });
        mockUseAdminModels.mockReturnValue({ 
            isLoading: false,
            data: null
        });

        renderWithProviders({
            user: { member: { is_admin: true } },
            loading: false
        });

        expect(screen.getByText(/Нет данных для отображения/i)).toBeInTheDocument();
    });

    it('should redirect to home when user is not admin', () => {
        mockUseAdminApps.mockReturnValue({ 
            isLoading: false,
            data: []
        });
        mockUseAdminModels.mockReturnValue({ 
            isLoading: false,
            data: {}
        });

        renderWithProviders({
            user: { member: { is_admin: false } },
            loading: false
        });

        expect(window.location.pathname).toBe('/');
    });

    it('should render admin layout when user is admin', () => {
        mockUseAdminApps.mockReturnValue({ 
            isLoading: false,
            data: []
        });
        mockUseAdminModels.mockReturnValue({ 
            isLoading: false,
            data: {}
        });

        renderWithProviders({
            user: { member: { is_admin: true } },
            loading: false
        });

        expect(screen.getByTestId('preloader')).toBeInTheDocument();
        expect(screen.getByRole('complementary')).toBeInTheDocument();
        expect(screen.getByRole('main')).toBeInTheDocument();
    });
});
