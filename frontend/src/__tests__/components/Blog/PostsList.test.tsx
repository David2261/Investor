import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PostsList from '@/components/Blog/PostsList.tsx';

const mockData = [
    {
        id: 1,
        category: {
            name: 'Test Category 1',
            slug: 'test-category-1',
        },
        title: 'Test Title 1',
        img: 'test-image-1.jpg',
        slug: 'test-slug-1',
        time_create: '2023-01-01',
        summary: '<p>Test summary 1</p>',
        reading_time_minutes: 5,
    },
    {
        id: 2,
        category: {
            name: 'Test Category 2',
            slug: 'test-category-2',
        },
        title: 'Test Title 2',
        img: 'test-image-2.jpg',
        slug: 'test-slug-2',
        time_create: '2023-01-02',
        summary: '<p>Test summary 2</p>',
        reading_time_minutes: 10,
    },
    {
        id: 3,
        category: {
            name: 'Test Category 3',
            slug: 'test-category-3',
        },
        title: 'Test Title 3',
        img: 'test-image-3.jpg',
        slug: 'test-slug-3',
        time_create: '2023-01-03',
        summary: '<p>Test summary 3</p>',
        reading_time_minutes: 3,
    },
    {
        id: 4,
        category: {
            name: 'Test Category 4',
            slug: 'test-category-4',
        },
        title: 'Test Title 4',
        img: 'test-image-4.jpg',
        slug: 'test-slug-4',
        time_create: '2023-01-04',
        summary: '<p>Test summary 4</p>',
        reading_time_minutes: 7,
    },
];

// Мокаем компонент DonateVerticalBlock
vi.mock('@/widgets/DonationBlocks.tsx', () => ({
    default: () => <div data-testid="mocked-donation-blocks">Mocked DonationBlocks</div>,
}));

describe('Компонент PostsList', () => {
    it('отображает все посты', () => {
        render(
            <BrowserRouter>
                <PostsList data={mockData} />
            </BrowserRouter>
        );

        const posts = screen.getAllByRole('link');
        expect(posts).toHaveLength(4);
    });

    it('отображает корректные данные поста', () => {
        render(
            <BrowserRouter>
                <PostsList data={mockData} />
            </BrowserRouter>
        );

        // Проверяем первый пост
        expect(screen.getByText('Test Title 1')).toBeInTheDocument();
        expect(screen.getByText('2023-01-01')).toBeInTheDocument();
        expect(screen.getByText('Статью можно прочитать за 7 минуты!')).toBeInTheDocument();
        expect(screen.getByText('Test summary 1')).toBeInTheDocument();
        const image1 = screen.getAllByAltText('');
        expect(image1[0]).toHaveAttribute('src', 'test-image-1.jpg');

        // Проверяем второй пост
        expect(screen.getByText('Test Title 2')).toBeInTheDocument();
        expect(screen.getByText('2023-01-02')).toBeInTheDocument();
        expect(screen.getByText('Статью можно прочитать за 10 минуты!')).toBeInTheDocument();
        expect(screen.getByText('Test summary 2')).toBeInTheDocument();
    });

    it('содержит корректные ссылки на посты', () => {
        render(
            <BrowserRouter>
                <PostsList data={mockData} />
            </BrowserRouter>
        );

        const links = screen.getAllByRole('link');
        expect(links[0]).toHaveAttribute('href', '/news/test-category-1/test-slug-1');
        expect(links[1]).toHaveAttribute('href', '/news/test-category-2/test-slug-2');
        expect(links[2]).toHaveAttribute('href', '/news/test-category-3/test-slug-3');
        expect(links[3]).toHaveAttribute('href', '/news/test-category-4/test-slug-4');
    });

    it('отображает блок доната после каждого 4-го поста', () => {
        render(
            <BrowserRouter>
                <PostsList data={mockData} />
            </BrowserRouter>
        );

        const donateBlocks: any = screen.getByTestId('mocked-donation-blocks');
        expect(donateBlocks).toBeDefined();
    });
});


