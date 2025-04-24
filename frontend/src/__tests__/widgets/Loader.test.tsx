import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '@/widgets/Loader.tsx';

describe('Компонент Loader', () => {
    it('отображает все цветные круги', () => {
        render(<Loader />);
        
        const blueCircle = screen.getByTestId('blue-circle');
        const redCircle = screen.getByTestId('red-circle');
        const yellowCircle = screen.getByTestId('yellow-circle');
        const greenCircle = screen.getByTestId('green-circle');
        
        expect(blueCircle).toBeInTheDocument();
        expect(redCircle).toBeInTheDocument();
        expect(yellowCircle).toBeInTheDocument();
        expect(greenCircle).toBeInTheDocument();
    });

    it('применяет правильные классы к кругам', () => {
        render(<Loader />);
        
        const blueCircle = screen.getByTestId('blue-circle');
        const redCircle = screen.getByTestId('red-circle');
        const yellowCircle = screen.getByTestId('yellow-circle');
        const greenCircle = screen.getByTestId('green-circle');
        
        expect(blueCircle).toHaveClass('circle', 'blue');
        expect(redCircle).toHaveClass('circle', 'red');
        expect(yellowCircle).toHaveClass('circle', 'yellow');
        expect(greenCircle).toHaveClass('circle', 'green');
    });

    it('применяет правильные анимации к кругам', () => {
        render(<Loader />);
        
        const blueCircle = screen.getByTestId('blue-circle');
        const redCircle = screen.getByTestId('red-circle');
        const yellowCircle = screen.getByTestId('yellow-circle');
        const greenCircle = screen.getByTestId('green-circle');
        
        expect(blueCircle).toHaveStyle({ animation: 'bounce 2s infinite ease-in-out' });
        expect(redCircle).toHaveStyle({ animation: 'bounce 2s infinite ease-in-out 0.4s' });
        expect(yellowCircle).toHaveStyle({ animation: 'bounce 2s infinite ease-in-out 0.8s' });
        expect(greenCircle).toHaveStyle({ animation: 'bounce 2s infinite ease-in-out 1.2s' });
    });

    it('отображает основной контейнер с правильными стилями', () => {
        render(<Loader />);
        
        const loaderMain = screen.getByTestId('loader-main');
        expect(loaderMain).toBeInTheDocument();
        expect(loaderMain).toHaveClass('loader-main');
    });

    it('отображает лоадер с правильными стилями', () => {
        render(<Loader />);
        
        const loader = screen.getByTestId('loader');
        expect(loader).toBeInTheDocument();
        expect(loader).toHaveClass(
            'fixed',
            'top-0',
            'left-0',
            'w-full',
            'h-full',
            'flex',
            'items-center',
            'justify-center',
            'bg-white',
            'bg-opacity-75',
            'z-50'
        );
    });

    it('отображает анимацию загрузки', () => {
        render(<Loader />);
        
        const spinner = screen.getByTestId('spinner');
        expect(spinner).toBeInTheDocument();
        expect(spinner).toHaveClass(
            'animate-spin',
            'rounded-full',
            'h-12',
            'w-12',
            'border-4',
            'border-t-[#85BB65]',
            'border-b-[#85BB65]',
            'border-l-[#85BB65]',
            'border-r-transparent'
        );
    });

    it('отображает текст загрузки', () => {
        render(<Loader />);
        
        const loadingText = screen.getByText('Загрузка...');
        expect(loadingText).toBeInTheDocument();
        expect(loadingText).toHaveClass(
            'mt-4',
            'text-[#85BB65]',
            'text-lg',
            'font-semibold'
        );
    });

    it('принимает и отображает кастомный текст загрузки', () => {
        const customText = 'Пожалуйста, подождите...';
        render(<Loader text={customText} />);
        
        const loadingText = screen.getByText(customText);
        expect(loadingText).toBeInTheDocument();
    });

    it('принимает и применяет кастомные стили', () => {
        const customClassName = 'custom-loader-class';
        render(<Loader className={customClassName} />);
        
        const loader = screen.getByTestId('loader');
        expect(loader).toHaveClass(customClassName);
    });
});


