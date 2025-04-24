import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthContext, { AuthProvider } from '../../../entities/context/AuthContext';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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
        const mockUser = { id: 1, username: 'test', email: 'test@example.com' };
        const mockTokens = { access: 'access-token', refresh: 'refresh-token' };

        mockedAxios.post.mockResolvedValueOnce({
            data: {
                user: mockUser,
                tokens: mockTokens
            }
        });

        const TestComponent = () => {
            const { loginUser } = React.useContext(AuthContext);
            const [result, setResult] = React.useState('');

            const handleLogin = async () => {
                try {
                    await loginUser({ email: 'test@example.com', password: 'password' });
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

        await act(async () => {
            screen.getByText('Login').click();
        });

        expect(screen.getByTestId('result')).toHaveTextContent('success');
        expect(mockedAxios.post).toHaveBeenCalledWith(
            'http://test-api.com/api/token/',
            { email: 'test@example.com', password: 'password' }
        );
    });

    it('should handle login error', async () => {
        mockedAxios.post.mockRejectedValueOnce(new Error('Login failed'));

        const TestComponent = () => {
            const { loginUser } = React.useContext(AuthContext);
            const [result, setResult] = React.useState('');

            const handleLogin = async () => {
                try {
                    await loginUser({ email: 'test@example.com', password: 'password' });
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

        await act(async () => {
            screen.getByText('Login').click();
        });

        expect(screen.getByTestId('result')).toHaveTextContent('error');
    });

    it('should handle registration successfully', async () => {
        const mockFormData = {
            username: 'test',
            email: 'test@example.com',
            password: 'password',
            password2: 'password'
        };

        mockedAxios.post.mockResolvedValueOnce({
            data: {
                message: 'Registration successful'
            }
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

        await act(async () => {
            screen.getByText('Register').click();
        });

        expect(screen.getByTestId('result')).toHaveTextContent('success');
        expect(mockedAxios.post).toHaveBeenCalledWith(
            'http://test-api.com/api/register/',
            mockFormData
        );
    });

    it('should handle logout', () => {
        const TestComponent = () => {
            const { logoutUser, user, setUser } = React.useContext(AuthContext);
            const [result, setResult] = React.useState('');

            React.useEffect(() => {
                setUser({ id: 1, username: 'test' });
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

        act(() => {
            screen.getByText('Logout').click();
        });

        expect(screen.getByTestId('result')).toHaveTextContent('logged out');
    });
});
