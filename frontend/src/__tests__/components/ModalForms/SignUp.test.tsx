import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../../../components/ModalForms/SignUp';
import AuthContext from '../../../entities/context/AuthContext';

describe('SignUp Component', () => {
    const mockSetIsOpen = jest.fn();
    const mockSetIsLogin = jest.fn();
    const mockRegistrationUser = jest.fn();

    const mockAuthContext = {
        user: null,
        setUser: jest.fn(),
        authTokens: null,
        loginUser: jest.fn(),
        registrationUser: mockRegistrationUser,
        logoutUser: jest.fn(),
        login: jest.fn(),
        logout: jest.fn(),
        resetPassword: jest.fn(),
        loading: false,
    };

    const renderWithAuth = () => {
        return render(
            <BrowserRouter>
                <AuthContext.Provider value={mockAuthContext}>
                    <SignUp setIsOpen={mockSetIsOpen} setIsLogin={mockSetIsLogin} />
                </AuthContext.Provider>
            </BrowserRouter>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render sign up form', () => {
        renderWithAuth();
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
        expect(screen.getByText('Зарегистрироваться')).toBeInTheDocument();
    });

    it('should show error for invalid username', () => {
        renderWithAuth();
        const usernameInput = screen.getByLabelText('Username');
        const submitButton = screen.getByText('Зарегистрироваться');

        fireEvent.change(usernameInput, { target: { value: 'ab' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Invalid username format.')).toBeInTheDocument();
    });

    it('should show error for invalid email', () => {
        renderWithAuth();
        const usernameInput = screen.getByLabelText('Username');
        const emailInput = screen.getByLabelText('Email Address');
        const submitButton = screen.getByText('Зарегистрироваться');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Invalid email format.')).toBeInTheDocument();
    });

    it('should call registrationUser with correct data', async () => {
        renderWithAuth();
        const usernameInput = screen.getByLabelText('Username');
        const emailInput = screen.getByLabelText('Email Address');
        const passwordInput = screen.getByLabelText('Password');
        const password2Input = screen.getByLabelText('Confirm Password');
        const submitButton = screen.getByText('Зарегистрироваться');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(password2Input, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        expect(mockRegistrationUser).toHaveBeenCalledWith({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
            password2: 'password123'
        });
    });

    it('should switch to login form', () => {
        renderWithAuth();
        const loginLink = screen.getByText('Вход');
        fireEvent.click(loginLink);
        expect(mockSetIsOpen).toHaveBeenCalled();
        expect(mockSetIsLogin).toHaveBeenCalled();
    });
});


