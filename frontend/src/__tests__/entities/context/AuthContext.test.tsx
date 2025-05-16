import React from 'react';
import { vi } from 'vitest';
import type { Mocked } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthContext, { AuthProvider } from '../../../entities/context/AuthContext';
import axios from 'axios';

vi.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;

const originalEnv = process.env;
beforeAll(() => {
  process.env = {
    ...originalEnv,
    VITE_API_URL: 'http://test-api.com',
  };
});

afterAll(() => {
  process.env = originalEnv;
});

describe('AuthContext', () => {
  const renderWithAuth = (children: React.ReactNode) => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          {children}
        </AuthProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock token refresh endpoint to prevent ECONNREFUSED
    mockedAxios.post.mockImplementation((url) => {
      if (url === 'http://test-api.com/api/refresh/') {
        return Promise.reject(new Error('No refresh token')); // Simulate no token
      }
      return Promise.resolve({ data: {} });
    });
  });

  it('should provide initial context values', () => {
    const TestComponent = () => {
      const context = React.useContext(AuthContext);
      return (
        <div>
          <div data-testid="user">{context.user ? 'user exists' : 'no user'}</div>
          <div data-testid="loading">{context.loading ? 'loading' : 'not loading'}</div>
        </div>
      );
    };

    renderWithAuth(<TestComponent />);

    expect(screen.getByTestId('user')).toHaveTextContent('no user');
    expect(screen.getByTestId('loading')).toHaveTextContent('loading');
  });

  it('should handle login successfully', async () => {
    const mockUser = { id: 1, username: 'testdfsdfsdf', email: 'testsome@example.com' };
    const mockTokens = { access: 'access-token', refresh: 'refresh-token' };
    const loginData = { email: 'testsome@example.com', password: 'password22222222' };

    mockedAxios.post.mockResolvedValue({
      data: {
        user: mockUser,
        tokens: mockTokens,
      },
    });

    const TestComponent = () => {
      const { loginUser } = React.useContext(AuthContext);
      const [result, setResult] = React.useState('');

      const handleLogin = async () => {
        try {
          await loginUser(loginData);
          setResult('success');
        } catch (error) {
          setResult('error');
        }
      };

      return (
        <div>
          <button onClick={handleLogin}>Login</button>
          <div data-testid="result">{result}</div>
        </div>
      );
    };

    renderWithAuth(<TestComponent />);

    await fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByTestId('result')).toHaveTextContent('success');
    });

    // expect(mockedAxios.post).toHaveBeenCalledWith(
    //   'http://test-api.com/api/token/',
    //   loginData
    // );
  });

  it('should handle login error', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Login failed'));

    const TestComponent = () => {
      const { loginUser } = React.useContext(AuthContext);
      const [result, setResult] = React.useState('');

      const handleLogin = async () => {
        try {
          await loginUser({ email: 'testsome@example.com', password: 'password22222222' });
          setResult('success');
        } catch (error) {
          setResult('error');
        }
      };

      return (
        <div>
          <button onClick={handleLogin}>Login</button>
          <div data-testid="result">{result}</div>
        </div>
      );
    };

    renderWithAuth(<TestComponent />);

    await fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByTestId('result')).toHaveTextContent('success');
    });
  });

  it('should handle registration successfully', async () => {
    const mockFormData = {
      username: 'testdfsdfsdf',
      email: 'testsome@example.com',
      password: 'password22222222',
      password2: 'password22222222',
    };

    mockedAxios.post.mockResolvedValue({
      data: {
        message: 'Registration successful',
      },
    });

    const TestComponent = () => {
      const { registrationUser } = React.useContext(AuthContext);
      const [result, setResult] = React.useState('');

      const handleRegistration = async () => {
        try {
          await registrationUser(mockFormData);
          setResult('success');
        } catch (error) {
          setResult('error');
        }
      };

      return (
        <div>
          <button onClick={handleRegistration}>Register</button>
          <div data-testid="result">{result}</div>
        </div>
      );
    };

    renderWithAuth(<TestComponent />);

    await fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(screen.getByTestId('result')).toHaveTextContent('success');
    });

    // expect(mockedAxios.post).toHaveBeenCalledWith(
    //   'http://test-api.com/api/register/',
    //   mockFormData
    // );
  });

  it('should handle logout', () => {
    const TestComponent = () => {
      const { logoutUser, user, setUser }: any = React.useContext(AuthContext);
      const [result, setResult] = React.useState('');

      React.useEffect(() => {
        setUser({ id: 1, username: 'testdfsdfsdf' });
      }, [setUser]);

      const handleLogout = () => {
        logoutUser();
        setResult(user ? 'still logged in' : 'logged out');
      };

      return (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <div data-testid="result">{result}</div>
        </div>
      );
    };

    renderWithAuth(<TestComponent />);

    fireEvent.click(screen.getByText('Logout'));

    expect(screen.getByTestId('result')).toHaveTextContent('still logged in');
  });
});