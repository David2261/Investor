import { render, screen } from '@testing-library/react';
import { expect, describe, beforeEach, it, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AdminLayoutRoute from '@/entities/routers/AdminLayoutRoute.tsx';
import AuthContext from '@/entities/context/AuthContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAdminApps } from '@/hooks/adminPanel/useAdminApps.tsx';
import { useAdminModels } from '@/hooks/adminPanel/useAdminModels.tsx';

vi.mock('@/hooks/adminPanel/useAdminApps.tsx', () => ({
  useAdminApps: vi.fn(),
}));

vi.mock('@/hooks/adminPanel/useAdminModels.tsx', () => ({
  useAdminModels: vi.fn(),
}));

vi.mock('@/components/Admin/HomeAdmin/Sidebar.tsx', () => ({
  default: ({ dataApps, dataModels }: { dataApps: any; dataModels: any }) => (
    <div data-testid="sidebar">
      Sidebar: {dataApps?.length} apps, {Object.keys(dataModels).length} models
    </div>
  ),
}));

vi.mock('@/widgets/preloader.tsx', () => ({
  default: () => <div data-testid="preloader">Preloader</div>,
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

  const renderWithProviders = (
    authContextValue: { user: any; loading: boolean },
    initialEntries = ['/admin/dashboard']
  ) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={authContextValue}>
          <MemoryRouter initialEntries={initialEntries}>
            <Routes>
              <Route path="/admin/*" element={<AdminLayoutRoute />}>
                <Route path="dashboard" element={<div data-testid="dashboard">Admin Dashboard</div>} />
              </Route>
              <Route path="/" element={<div data-testid="home">Home Page</div>} />
            </Routes>
          </MemoryRouter>
        </AuthContext.Provider>
      </QueryClientProvider>
    );
  };

  it('shows preloader when AuthContext is loading', () => {
    vi.mocked(useAdminApps).mockReturnValue({ isLoading: false, data: [], error: null });
    vi.mocked(useAdminModels).mockReturnValue({ isLoading: false, data: {}, error: null });

    renderWithProviders({
      user: null,
      loading: true,
    });

    expect(screen.getByTestId('preloader')).toBeInTheDocument();
  });

  it('shows preloader when user.member is undefined', () => {
    vi.mocked(useAdminApps).mockReturnValue({ isLoading: false, data: [], error: null });
    vi.mocked(useAdminModels).mockReturnValue({ isLoading: false, data: {}, error: null });

    renderWithProviders({
      user: { member: undefined },
      loading: false,
    });

    expect(screen.getByTestId('preloader')).toBeInTheDocument();
  });

  it('shows preloader when admin apps are loading', () => {
    vi.mocked(useAdminApps).mockReturnValue({ isLoading: true, data: null, error: null });
    vi.mocked(useAdminModels).mockReturnValue({ isLoading: false, data: {}, error: null });

    renderWithProviders({
      user: { member: { is_admin: true } },
      loading: false,
    });

    expect(screen.getByTestId('preloader')).toBeInTheDocument();
  });

  it('shows preloader when admin models are loading', () => {
    vi.mocked(useAdminApps).mockReturnValue({ isLoading: false, data: [], error: null });
    vi.mocked(useAdminModels).mockReturnValue({ isLoading: true, data: null, error: null });

    renderWithProviders({
      user: { member: { is_admin: true } },
      loading: false,
    });

    expect(screen.getByTestId('preloader')).toBeInTheDocument();
  });

  it('displays error message when apps loading fails', () => {
    vi.mocked(useAdminApps).mockReturnValue({
      isLoading: false,
      error: new Error('Apps loading failed'),
      data: null,
    });
    vi.mocked(useAdminModels).mockReturnValue({ isLoading: false, data: {}, error: null });

    renderWithProviders({
      user: { member: { is_admin: true } },
      loading: false,
    });

    expect(screen.getByText(/Ошибка при загрузке приложений: Apps loading failed/i)).toBeInTheDocument();
  });

  it('displays error message when models loading fails', () => {
    vi.mocked(useAdminApps).mockReturnValue({ isLoading: false, data: [], error: null });
    vi.mocked(useAdminModels).mockReturnValue({
      isLoading: false,
      error: new Error('Models loading failed'),
      data: null,
    });

    renderWithProviders({
      user: { member: { is_admin: true } },
      loading: false,
    });

    expect(screen.getByText(/Ошибка при загрузке моделей: Models loading failed/i)).toBeInTheDocument();
  });

  it('displays no data message when adminApps is null', () => {
    vi.mocked(useAdminApps).mockReturnValue({ isLoading: false, data: null, error: null });
    vi.mocked(useAdminModels).mockReturnValue({ isLoading: false, data: {}, error: null });

    renderWithProviders({
      user: { member: { is_admin: true } },
      loading: false,
    });

    expect(screen.getByText(/Нет данных для отображения/i)).toBeInTheDocument();
  });

  it('displays no data message when adminModels is null', () => {
    vi.mocked(useAdminApps).mockReturnValue({ isLoading: false, data: [], error: null });
    vi.mocked(useAdminModels).mockReturnValue({ isLoading: false, data: null, error: null });

    renderWithProviders({
      user: { member: { is_admin: true } },
      loading: false,
    });

    expect(screen.getByText(/Нет данных для отображения/i)).toBeInTheDocument();
  });

  it('renders admin layout with Sidebar and Outlet for admin user', () => {
    vi.mocked(useAdminApps).mockReturnValue({
      isLoading: false,
      data: [{ id: 1, name: 'App1' }],
      error: null,
    });
    vi.mocked(useAdminModels).mockReturnValue({
      isLoading: false,
      data: { model1: 'Model1' },
      error: null,
    });

    renderWithProviders({
      user: { member: { is_admin: true } },
      loading: false,
    });

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toHaveTextContent('Sidebar: 1 apps, 1 models');
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('redirects to home page for non-admin user', () => {
    vi.mocked(useAdminApps).mockReturnValue({
      isLoading: false,
      data: [{ id: 1, name: 'App1' }],
      error: null,
    });
    vi.mocked(useAdminModels).mockReturnValue({
      isLoading: false,
      data: { model1: 'Model1' },
      error: null,
    });

    renderWithProviders({
      user: { member: { is_admin: false } },
      loading: false,
    });

    expect(screen.getByTestId('home')).toBeInTheDocument();
    expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument();
    expect(screen.queryByTestId('dashboard')).not.toBeInTheDocument();
  });

  it('redirects to home page when user is null', () => {
    vi.mocked(useAdminApps).mockReturnValue({
      isLoading: false,
      data: [{ id: 1, name: 'App1' }],
      error: null,
    });
    vi.mocked(useAdminModels).mockReturnValue({
      isLoading: false,
      data: { model1: 'Model1' },
      error: null,
    });

    renderWithProviders({
      user: { member: { is_admin: false } },
      loading: false,
    });
    expect(screen.getByTestId('home')).toBeInTheDocument();
    expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument();
    expect(screen.queryByTestId('dashboard')).not.toBeInTheDocument();
  });
});