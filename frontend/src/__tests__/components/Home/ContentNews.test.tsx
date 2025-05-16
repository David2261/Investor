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
        expect(categoryNames).toHaveLength(1);

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
        expect(links[0]).toHaveAttribute('href', '/news/test-category/test-slug');
    });
});
