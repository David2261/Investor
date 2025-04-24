import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ContentNews from '../../../components/Home/ContentNews';

const mockData = [
    {
        id: 1,
        title: 'Test News Title',
        category: {
            name: 'Test Category',
            slug: 'test-category',
        },
        img: 'test-image.jpg',
        slug: 'test-slug',
    },
];

describe('Компонент ContentNews', () => {
    it('отображает сообщение при отсутствии данных', () => {
        render(
            <BrowserRouter>
                <ContentNews data={[]} />
            </BrowserRouter>
        );

        expect(screen.getByText('No content available')).toBeInTheDocument();
    });

    it('отображает корректные данные новости', () => {
        render(
            <BrowserRouter>
                <ContentNews data={mockData} />
            </BrowserRouter>
        );

        // Проверяем заголовок категории
        const categoryNames = screen.getAllByText('Test Category');
        expect(categoryNames).toHaveLength(2);

        // Проверяем заголовок новости
        expect(screen.getByText('Test News Title')).toBeInTheDocument();

        // Проверяем изображение
        const image = screen.getByAltText('Test News Title');
        expect(image).toHaveAttribute('src', 'test-image.jpg');
    });

    it('содержит корректные ссылки', () => {
        render(
            <BrowserRouter>
                <ContentNews data={mockData} />
            </BrowserRouter>
        );

        const links = screen.getAllByRole('link');
        expect(links[0]).toHaveAttribute('href', '/news');
        expect(links[1]).toHaveAttribute('href', '/news/test-category/test-slug');
    });

    it('применяет корректные стили', () => {
        render(
            <BrowserRouter>
                <ContentNews data={mockData} />
            </BrowserRouter>
        );

        // Проверяем стили заголовка категории
        const categoryNames = screen.getAllByText('Test Category');
        expect(categoryNames[0]).toHaveClass('font-sans', 'font-medium', 'text-2xl', 'md:text-3xl', 'mb-4');
        expect(categoryNames[1]).toHaveClass('uppercase', 'text-sky-500');

        // Проверяем стили заголовка новости
        const title = screen.getByText('Test News Title');
        expect(title).toHaveClass('font-bold', 'text-lg', 'md:text-xl', 'md:text-2xl', 'hover:underline');

        // Проверяем стили изображения
        const image = screen.getByAltText('Test News Title');
        expect(image).toHaveClass('object-cover', 'w-full', 'h-auto');

        // Проверяем стили контейнеров
        const containers = screen.getAllByText(/Test/).map(element => element.parentElement);
        containers.forEach(container => {
            if (container) {
                expect(container).toHaveClass('w-full');
            }
        });
    });

    it('содержит SVG иконку', () => {
        render(
            <BrowserRouter>
                <ContentNews data={mockData} />
            </BrowserRouter>
        );

        const svg = screen.getByTestId('arrow-icon');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass('w-6', 'h-6');
    });
});
