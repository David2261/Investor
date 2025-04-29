import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MenuLink from '@/widgets/MenuLink.tsx';

describe('Компонент MenuLink', () => {
    const renderWithRouter = (component: React.ReactElement) => {
        return render(
            <BrowserRouter>
                {component}
            </BrowserRouter>
        );
    };

    it('отображает ссылку с правильным текстом', () => {
        renderWithRouter(<MenuLink page="test" />);
        expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('создает правильную ссылку', () => {
        renderWithRouter(<MenuLink page="test" />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/test/');
    });

    it('применяет правильные стили к ссылке', () => {
        renderWithRouter(<MenuLink page="test" />);
        const link = screen.getByRole('link');
        expect(link).toHaveClass(
            'test',
            'uppercase',
            'text-zinc-600'
        );
    });
});


