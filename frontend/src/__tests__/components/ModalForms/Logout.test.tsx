import React from 'react';
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Logout from '../../../components/ModalForms/Logout';
import AuthContext from '../../../entities/context/AuthContext';

describe('Logout Component', () => {
    const mockLogout = vi.fn();

    const mockAuthContext = {
        user: null,
        setUser: vi.fn(),
        authTokens: null,
        loginUser: vi.fn(),
        registrationUser: vi.fn(),
        logoutUser: vi.fn(),
        login: vi.fn(),
        logout: mockLogout,
        resetPassword: vi.fn(),
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
        vi.clearAllMocks();
    });

    it('should render logout button', () => {
        renderWithAuth();
        expect(screen.getByText('Выход')).toBeInTheDocument();
    });

    it('should not call logout function when button is pressed with other keys', () => {
        renderWithAuth();
        const logoutButton = screen.getByText('Выход');
        fireEvent.keyDown(logoutButton, { key: 'Space' });
        expect(mockLogout).not.toHaveBeenCalled();
    });
});
