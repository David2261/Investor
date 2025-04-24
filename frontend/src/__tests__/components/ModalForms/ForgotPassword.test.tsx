import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ForgotPassword from '../../../components/ModalForms/ForgotPassword';
import AuthContext from '../../../entities/context/AuthContext';

describe('ForgotPassword Component', () => {
    const mockSetIsOpen = jest.fn();
    const mockSetIsForgotPassword = jest.fn();
    const mockResetPassword = jest.fn();

    const mockAuthContext = {
        user: null,
        setUser: jest.fn(),
        authTokens: null,
        loginUser: jest.fn(),
        registrationUser: jest.fn(),
        logoutUser: jest.fn(),
        login: jest.fn(),
        logout: jest.fn(),
        resetPassword: mockResetPassword,
        loading: false,
    };

    const renderWithAuth = () => {
        return render(
            <BrowserRouter>
                <AuthContext.Provider value={mockAuthContext}>
                    <ForgotPassword setIsOpen={mockSetIsOpen} setIsForgotPassword={mockSetIsForgotPassword} />
                </AuthContext.Provider>
            </BrowserRouter>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render forgot password form', () => {
        renderWithAuth();
        expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
        expect(screen.getByText('Сбросить пароль')).toBeInTheDocument();
    });

    it('should show error for invalid email', () => {
        renderWithAuth();
        const emailInput = screen.getByLabelText('Email Address');
        const submitButton = screen.getByText('Сбросить пароль');

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Invalid email format.')).toBeInTheDocument();
    });

    it('should call resetPassword with correct email', async () => {
        renderWithAuth();
        const emailInput = screen.getByLabelText('Email Address');
        const submitButton = screen.getByText('Сбросить пароль');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);

        expect(mockResetPassword).toHaveBeenCalledWith('test@example.com');
    });

    it('should close modal after successful password reset', async () => {
        mockResetPassword.mockResolvedValueOnce({});
        renderWithAuth();
        const emailInput = screen.getByLabelText('Email Address');
        const submitButton = screen.getByText('Сбросить пароль');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);

        await expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    });
});
