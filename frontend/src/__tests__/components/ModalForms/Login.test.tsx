import React from 'react';
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../../components/ModalForms/Login';
import AuthContext from '../../../entities/context/AuthContext';

describe('Login Component', () => {
    const mockSetIsOpen = vi.fn();
    const mockSetIsSignUp = vi.fn();
    const mockLoginUser = vi.fn();

    const mockAuthContext = {
        user: null,
        setUser: vi.fn(),
        authTokens: null,
        loginUser: mockLoginUser,
        registrationUser: vi.fn(),
        logoutUser: vi.fn(),
        login: vi.fn(),
        logout: vi.fn(),
        resetPassword: vi.fn(),
        loading: false,
    };

    const renderWithAuth = () => {
        return render(
            <BrowserRouter>
                <AuthContext.Provider value={mockAuthContext}>
                    <Login setIsOpen={mockSetIsOpen} setIsSignUp={mockSetIsSignUp} />
                </AuthContext.Provider>
            </BrowserRouter>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render login form', () => {
        renderWithAuth();
        expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByText('Вход')).toBeInTheDocument();
    });

    it('should show error for invalid email', () => {
        renderWithAuth();
        const emailInput = screen.getByLabelText('Email Address');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByText('Вход');

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
    });

    it('should show error for short password', () => {
        renderWithAuth();
        const emailInput = screen.getByLabelText('Email Address');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByText('Вход');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: '12345' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Password must be at least 6 characters long.')).toBeInTheDocument();
    });

    it('should call loginUser with correct data', () => {
        renderWithAuth();
        const emailInput = screen.getByLabelText('Email Address');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByText('Вход');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        expect(mockLoginUser).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'password123'
        });
    });

    it('should open forgot password form', () => {
        renderWithAuth();
        const forgotPasswordLink = screen.getByText('Забыли пароль?');
        fireEvent.click(forgotPasswordLink);
        expect(screen.getByText('Email адрес')).toBeInTheDocument();
    });

    it('should switch to sign up form', () => {
        renderWithAuth();
        const signUpLink = screen.getByText('Регистрация');
        fireEvent.click(signUpLink);
        expect(mockSetIsOpen).toHaveBeenCalled();
        expect(mockSetIsSignUp).toHaveBeenCalled();
    });
});
