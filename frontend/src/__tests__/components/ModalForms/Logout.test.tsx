import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Logout from '../../../components/ModalForms/Logout';
import AuthContext from '../../../entities/context/AuthContext';

describe('Logout Component', () => {
    const mockLogout = jest.fn();

    const mockAuthContext = {
        user: null,
        setUser: jest.fn(),
        authTokens: null,
        loginUser: jest.fn(),
        registrationUser: jest.fn(),
        logoutUser: jest.fn(),
        login: jest.fn(),
        logout: mockLogout,
        resetPassword: jest.fn(),
        loading: false,
    };

    const renderWithAuth = () => {
        return render(
            <BrowserRouter>
                <AuthContext.Provider value={mockAuthContext}>
                    <Logout />
                </AuthContext.Provider>
            </BrowserRouter>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render logout button', () => {
        renderWithAuth();
        expect(screen.getByText('Выход')).toBeInTheDocument();
    });

    it('should call logout function when button is clicked', () => {
        renderWithAuth();
        const logoutButton = screen.getByText('Выход');
        fireEvent.click(logoutButton);
        expect(mockLogout).toHaveBeenCalled();
    });

    it('should call logout function when button is pressed with Enter key', () => {
        renderWithAuth();
        const logoutButton = screen.getByText('Выход');
        fireEvent.keyDown(logoutButton, { key: 'Enter' });
        expect(mockLogout).toHaveBeenCalled();
    });

    it('should not call logout function when button is pressed with other keys', () => {
        renderWithAuth();
        const logoutButton = screen.getByText('Выход');
        fireEvent.keyDown(logoutButton, { key: 'Space' });
        expect(mockLogout).not.toHaveBeenCalled();
    });
});
