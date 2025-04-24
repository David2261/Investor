import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Link from '@/widgets/Link.tsx';

describe('Компонент Link', () => {
    const renderWithRouter = (component: React.ReactElement) => {
        return render(
            <BrowserRouter>
                {component}
            </BrowserRouter>
        );
    };

    it('отображает ссылку с правильным текстом', () => {
        renderWithRouter(<Link page="test" />);
        expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('создает правильную ссылку', () => {
        renderWithRouter(<Link page="test" />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/test/');
    });

    it('применяет правильные стили к ссылке', () => {
        renderWithRouter(<Link page="test" />);
        const link = screen.getByRole('link');
        expect(link).toHaveClass(
            'uppercase',
            'p-2',
            'lg:px-4',
            'md:mx-2',
            'text-gray-600',
            'rounded',
            'hover:bg-gray-200',
            'hover:text-gray-700',
            'transation',
            'duration-300'
        );
    });

    it('отображает активную ссылку с правильными стилями', () => {
        renderWithRouter(<Link page="test" />);
        const link = screen.getByRole('link');
        expect(link).toHaveClass('uppercase p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transation duration-300');
    });
});


