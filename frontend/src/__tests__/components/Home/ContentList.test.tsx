import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ContentList from '../../../components/Home/ContentList';

const mockData = [
    {
        id: 1,
        title: 'Test Title 1',
        category: {
            name: 'Test Category 1',
            slug: 'test-category-1',
        },
        img: 'test-image-1.jpg',
        slug: 'test-slug-1',
    },
    {
        id: 2,
        title: 'Test Title 2',
        category: {
            name: 'Test Category 2',
            slug: 'test-category-2',
        },
        img: 'test-image-2.jpg',
        slug: 'test-slug-2',
    },
    {
        id: 3,
        title: 'Test Title 3',
        category: {
            name: 'Test Category 3',
            slug: 'test-category-3',
        },
        img: 'test-image-3.jpg',
        slug: 'test-slug-3',
    },
];

describe('Компонент ContentList', () => {
    it('отображает сообщение при отсутствии данных', () => {
        render(
            <BrowserRouter>
                <ContentList data={[]} />
            </BrowserRouter>
        );

        expect(screen.getByText('No content available')).toBeInTheDocument();
    });

    it('отображает корректное количество элементов', () => {
        render(
            <BrowserRouter>
                <ContentList data={mockData} />
            </BrowserRouter>
        );

        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(3);
    });

    it('отображает корректные заголовки', () => {
        render(
            <BrowserRouter>
                <ContentList data={mockData} />
            </BrowserRouter>
        );

        expect(screen.getByText('Test Title 1')).toBeInTheDocument();
        expect(screen.getByText('Test Title 2')).toBeInTheDocument();
        expect(screen.getByText('Test Title 3')).toBeInTheDocument();
    });

    it('содержит корректные ссылки', () => {
        render(
            <BrowserRouter>
                <ContentList data={mockData} />
            </BrowserRouter>
        );

        const links = screen.getAllByRole('link');
        expect(links[0]).toHaveAttribute('href', '/news/test-category-1/test-slug-1');
        expect(links[1]).toHaveAttribute('href', '/news/test-category-2/test-slug-2');
        expect(links[2]).toHaveAttribute('href', '/news/test-category-3/test-slug-3');
    });

    it('ограничивает количество отображаемых элементов', () => {
        const largeData = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            title: `Test Title ${i + 1}`,
            category: {
                name: `Test Category ${i + 1}`,
                slug: `test-category-${i + 1}`,
            },
            img: `test-image-${i + 1}.jpg`,
            slug: `test-slug-${i + 1}`,
        }));

        render(
            <BrowserRouter>
                <ContentList data={largeData} />
            </BrowserRouter>
        );

        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(8); // slice(0, 8)
    });
});


