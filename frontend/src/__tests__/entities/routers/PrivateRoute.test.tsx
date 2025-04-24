import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../../../entities/routers/PrivateRoute';
import AuthContext from '../../../entities/context/AuthContext';

describe('PrivateRoute', () => {
    const renderWithRouter = (authContextValue: any) => {
        return render(
            <AuthContext.Provider value={authContextValue}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<PrivateRoute />}>
                            <Route path="private" element={<div>Private Content</div>} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthContext.Provider>
        );
    };

    it('should render private content when user is authenticated', () => {
        renderWithRouter({
            user: { id: 1, username: 'test' }
        });

        expect(screen.getByText('Private Content')).toBeInTheDocument();
    });

    it('should redirect to home when user is not authenticated', () => {
        renderWithRouter({
            user: null
        });

        expect(window.location.pathname).toBe('/');
    });
});
