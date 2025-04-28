import { render, screen } from '@testing-library/react';
import { expect, describe, beforeEach, it } from 'vitest';
import { vi } from 'vitest';
import type { Mock } from 'vitest';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import AdminLayoutRoute from '@/entities/routers/AdminLayoutRoute.tsx';
import AuthContext from '@/entities/context/AuthContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock hooks
vi.mock('@/hooks/adminPanel/useAdminApps.tsx', () => ({
  useAdminApps: vi.fn(),
}));

vi.mock('@/hooks/adminPanel/useAdminModels.tsx', () => ({
  useAdminModels: vi.fn(),
}));

describe('AdminLayoutRoute', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
  });

  const renderWithProviders = (authContextValue: any, initialEntries = ['/admin/dashboard']) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={authContextValue}>
          <MemoryRouter initialEntries={initialEntries}>
            <Routes>
              <Route path="/admin/*" element={<AdminLayoutRoute />}>
                <Route path="dashboard" element={<div>Admin Dashboard</div>} />
              </Route>
              <Route path="/" element={<div>Home Page</div>} />
            </Routes>
          </MemoryRouter>
        </AuthContext.Provider>
      </QueryClientProvider>
    );
  };

  it('should show preloader when loading', () => {
    mockUseAdminApps.mockReturnValue({ isLoading: true, data: null, error: null });
    mockUseAdminModels.mockReturnValue({ isLoading: true, data: null, error: null });

    renderWithProviders({
      user: null,
      loading: true,
    });

    expect(screen.getByTestId('preloader')).toBeInTheDocument();
  });

  it('should show preloader when user.member is undefined', () => {
    mockUseAdminApps.mockReturnValue({ isLoading: false, data: [], error: null });
    mockUseAdminModels.mockReturnValue({ isLoading: false, data: {}, error: null });

    renderWithProviders({
      user: { member: undefined },
      loading: false,
    });

    expect(screen.getByTestId('preloader')).toBeInTheDocument();
  });

  it('should show error message when apps loading fails', () => {
    mockUseAdminApps.mockReturnValue({
      isLoading: false,
      error: new Error('Apps loading failed'),
      data: null,
    });
    mockUseAdminModels.mockReturnValue({ isLoading: false, data: {}, error: null });

    renderWithProviders({
      user: { member: { is_admin: true } },
      loading: false,
    });

    expect(screen.getByRole('alert')).toHaveTextContent(/Ошибка при загрузке приложений: Apps loading failed/i);
  });
});