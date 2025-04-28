import React from 'react';
import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '@/widgets/Footer.tsx';

describe('Компонент Footer', () => {
    const renderWithRouter = (component: React.ReactElement) => {
        return render(
            <BrowserRouter>
                {component}
            </BrowserRouter>
        );
    };

    it('отображает меню навигации', () => {
        renderWithRouter(<Footer />);
        
        const menuItems = [
            'Соглашение',
            'Соглашение по Email',
            'Оплата и доставка',
            'Конфиденциальность',
            'Ответственность'
        ];
        
        menuItems.forEach(item => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });

    it('отображает копирайт', () => {
        renderWithRouter(<Footer />);
        
        const currentYear = new Date().getFullYear();
        const copyrightText = `© ${currentYear} Investor Home. All rights reserved.`;
        
        expect(screen.getByText(copyrightText)).toBeInTheDocument();
    });

    it('отображает форму подписки', () => {
        renderWithRouter(<Footer />);
        
        const subscribeForm = document.getElementById('subscribe-form');
        expect(subscribeForm).toBeInTheDocument();
    });
});


