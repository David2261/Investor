import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '@/widgets/Navbar.tsx';


describe('Компонент Navbar', () => {
    const renderWithRouter = (component: React.ReactElement) => {
        return render(
            <BrowserRouter>
                {component}
            </BrowserRouter>
        );
    };

    beforeEach(() => {
        vi.useFakeTimers();
        // Reset matchMedia to desktop by default
        window.matchMedia.mockReturnValue({
          matches: true, // Desktop view (min-width: 1060px)
          media: '(min-width: 1060px)',
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        });
      });
    
      afterEach(() => {
        vi.useRealTimers();
        vi.clearAllMocks();
      });

    it('отображает логотип', () => {
        renderWithRouter(<Navbar />);
        const logo = screen.getByAltText('logo');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', '/src/assets/logo/IH.webp');
    });

    it('отображает ссылки навигации', () => {
        renderWithRouter(<Navbar />);
        expect(screen.getByText('news')).toBeInTheDocument();
        expect(screen.getByText('bonds')).toBeInTheDocument();
    });

    it('отображает кнопки входа и регистрации', () => {
        renderWithRouter(<Navbar />);
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('открывает модальное окно входа при клике на кнопку login', () => {
        renderWithRouter(<Navbar />);
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);
        expect(document.getElementById('login')).toBeInTheDocument();
    });
    it('применяет правильные стили к навигационной панели', () => {
        renderWithRouter(<Navbar />);
        const nav = screen.getByRole('navigation');
        expect(nav).toHaveClass(
            'bg-white',
            'py-2',
            'md:py-4',
            'w-full',
            'border-b-2',
            'border-stone-200'
        );
    });

    it('отображает мобильное меню при клике на кнопку меню', () => {
        renderWithRouter(<Navbar />);
        const menuButton = document.getElementById('navbar-toggle');
        if (menuButton != null) {
            fireEvent.click(menuButton);
        }
        expect(document.getElementById('login')).toBeInTheDocument();
    });
});
