import React from 'react';
import {expect, describe, it} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import UnderConstruction from '@/components/Admin/HomeAdmin/UnderPage';

describe('Компонент UnderConstruction', () => {
    it('отображает изображение', () => {
        render(<UnderConstruction />);
        
        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'underpage.svg');
        expect(image).toHaveClass('w-48', 'h-48', 'mb-4');
    });

    it('отображает заголовок предупреждения', () => {
        render(<UnderConstruction />);
        
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toHaveTextContent('Внимание!');
        expect(heading).toHaveClass('font-bold', 'text-lg');
    });

    it('отображает текст о разработке', () => {
        render(<UnderConstruction />);
        
        expect(screen.getByText('Эта страница находится в процессе разработки.')).toBeInTheDocument();
    });

    it('отображает дополнительное сообщение', () => {
        render(<UnderConstruction />);
        
        expect(screen.getByText('Мы работаем над этим!')).toBeInTheDocument();
    });

    it('применяет правильные стили к контейнеру', () => {
        render(<UnderConstruction />);
        
        const container = screen.getByTestId('under-construction-container');
        expect(container).toHaveClass(
            'flex',
            'flex-col',
            'items-center',
            'justify-center',
            'h-screen',
            'bg-white'
        );
    });

    it('применяет правильные стили к блоку предупреждения', () => {
        render(<UnderConstruction />);
        
        const alert = screen.getByTestId('under-construction-alert');
        expect(alert).toHaveClass(
            'bg-yellow-200',
            'border-l-4',
            'border-yellow-600',
            'p-4',
            'text-yellow-800',
            'rounded',
            'shadow-md',
            'text-center'
        );
    });

    it('применяет правильные стили к дополнительному сообщению', () => {
        render(<UnderConstruction />);
        
        const message = screen.getByText('Мы работаем над этим!');
        expect(message).toHaveClass('mt-4', 'text-gray-600');
    });
});


