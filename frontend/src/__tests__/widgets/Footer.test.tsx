import React from 'react';
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

    it('отображает логотип', () => {
        renderWithRouter(<Footer />);
        
        const logo = screen.getByAltText('Logo');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', '/logo.png');
    });

    it('отображает контактную информацию', () => {
        renderWithRouter(<Footer />);
        
        const contactInfo = [
            'Телефон: +7 (999) 123-45-67',
            'Email: info@example.com',
            'Адрес: г. Москва, ул. Примерная, д. 1'
        ];
        
        contactInfo.forEach(info => {
            expect(screen.getByText(info)).toBeInTheDocument();
        });
    });

    it('отображает ссылки на социальные сети', () => {
        renderWithRouter(<Footer />);
        
        const socialLinks = [
            { name: 'Facebook', href: 'https://facebook.com' },
            { name: 'Twitter', href: 'https://twitter.com' },
            { name: 'Instagram', href: 'https://instagram.com' },
            { name: 'LinkedIn', href: 'https://linkedin.com' }
        ];
        
        socialLinks.forEach(link => {
            const socialLink = screen.getByText(link.name);
            expect(socialLink).toBeInTheDocument();
            expect(socialLink.closest('a')).toHaveAttribute('href', link.href);
        });
    });

    it('отображает меню навигации', () => {
        renderWithRouter(<Footer />);
        
        const menuItems = [
            'Главная',
            'О нас',
            'Услуги',
            'Блог',
            'Контакты'
        ];
        
        menuItems.forEach(item => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });

    it('отображает копирайт', () => {
        renderWithRouter(<Footer />);
        
        const currentYear = new Date().getFullYear();
        const copyrightText = `&copy; ${currentYear} Investor Home. All rights reserved.`;
        
        expect(screen.getByText(copyrightText)).toBeInTheDocument();
    });

    it('отображает форму подписки', () => {
        renderWithRouter(<Footer />);
        
        const subscribeForm = document.getElementById('subscribe-form');
        expect(subscribeForm).toBeInTheDocument();
    });
});


