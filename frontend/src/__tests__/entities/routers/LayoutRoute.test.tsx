import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutRoute from '../../../entities/routers/LayoutRoute';

describe('LayoutRoute', () => {
    const renderWithRouter = () => {
        return render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LayoutRoute />}>
                        <Route path="test" element={<div>Test Content</div>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    };

    it('should render preloader', () => {
        renderWithRouter();
        expect(screen.getByTestId('preloader')).toBeInTheDocument();
    });

    it('should render navbar', () => {
        renderWithRouter();
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should render footer', () => {
        renderWithRouter();
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('should render outlet content', () => {
        renderWithRouter();
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
});
