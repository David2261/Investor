import React from 'react';
import { render, screen } from '@testing-library/react';
import DonationBlocks from '@/widgets/DonationBlocks.tsx';

describe('Компонент DonationBlocks', () => {
    it('отображает заголовок блока доната', () => {
        render(<DonationBlocks />);
        expect(screen.getByText('Спасибо, что пользуетесь сайтом! Поддержите автора')).toBeInTheDocument();
    });

    it('отображает текст с просьбой о поддержке', () => {
        render(<DonationBlocks />);
        expect(screen.getByText(/Если вам понравился мой контент/)).toBeInTheDocument();
    });

    it('содержит ссылку на Ko-fi', () => {
        render(<DonationBlocks />);
        const koFiLink = screen.getByText('Купите мне кофе');
        expect(koFiLink).toHaveAttribute('href', 'https://ko-fi.com/admiralgeneral');
    });

    it('содержит ссылку на DonatePay', () => {
        render(<DonationBlocks />);
        const donatePayLink = screen.getByText('Пожертвование');
        expect(donatePayLink).toHaveAttribute('href', 'https://new.donatepay.ru/@1097922');
    });

    it('отображает случайное изображение', () => {
        render(<DonationBlocks />);
        const image = screen.getByAltText('Random cute image');
        expect(image).toBeInTheDocument();
        expect(image).toHaveClass('rounded-lg');
    });
});