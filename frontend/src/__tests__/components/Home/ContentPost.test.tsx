import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ContentPost from '../../../components/Home/ContentPost';

const mockData = [
    {
        title: 'Test Post 1',
        category: {
            name: 'Test Category 1',
            slug: 'test-category-1',
        },
        img: 'test-image-1.jpg',
        slug: 'test-post-1',
    },
    {
        title: 'Test Post 2',
        category: {
            name: 'Test Category 2',
            slug: 'test-category-2',
        },
        img: 'test-image-2.jpg',
        slug: 'test-post-2',
    },
];

describe('Компонент ContentPost', () => {
    const mockPost = {
        title: 'Тестовый пост',
        content: 'Тестовое содержимое поста',
        date: '2023-01-01',
        author: 'Тестовый автор',
        image: '/test-image.jpg',
        category: 'Тестовая категория'
    };

    it('отображает сообщение при отсутствии данных', () => {
        render(
            <BrowserRouter>
                <ContentPost data={[]} />
            </BrowserRouter>
        );

        expect(screen.getByText('No content available')).toBeInTheDocument();
    });

    it('отображает корректное количество постов', () => {
        render(
            <BrowserRouter>
                <ContentPost data={mockData} />
            </BrowserRouter>
        );

        const posts = screen.getAllByRole('link');
        expect(posts).toHaveLength(2);
    });

    it('отображает корректные данные поста', () => {
        render(
            <BrowserRouter>
                <ContentPost data={mockData} />
            </BrowserRouter>
        );

        // Проверяем первый пост
        expect(screen.getByText('Test Category 1')).toBeInTheDocument();
        expect(screen.getByText('Test Post 1')).toBeInTheDocument();
        const image1 = screen.getByAltText('Test Post 1');
        expect(image1).toHaveAttribute('src', 'test-image-1.jpg');

        // Проверяем второй пост
        expect(screen.getByText('Test Category 2')).toBeInTheDocument();
        expect(screen.getByText('Test Post 2')).toBeInTheDocument();
        const image2 = screen.getByAltText('Test Post 2');
        expect(image2).toHaveAttribute('src', 'test-image-2.jpg');
    });

    it('содержит корректные ссылки на посты', () => {
        render(
            <BrowserRouter>
                <ContentPost data={mockData} />
            </BrowserRouter>
        );

        const links = screen.getAllByRole('link');
        expect(links[0]).toHaveAttribute('href', '/news/test-category-1/test-post-1');
        expect(links[1]).toHaveAttribute('href', '/news/test-category-2/test-post-2');
    });

    it('применяет корректные стили', () => {
        render(
            <BrowserRouter>
                <ContentPost data={mockData} />
            </BrowserRouter>
        );

        const categories = screen.getAllByText(/Test Category/);
        categories.forEach(category => {
            expect(category).toHaveClass('text-lg', 'uppercase', 'text-sky-500');
        });

        const titles = screen.getAllByText(/Test Post/);
        titles.forEach(title => {
            expect(title).toHaveClass('text-lg', 'font-bold');
        });

        const images = screen.getAllByRole('img');
        images.forEach(image => {
            expect(image).toHaveClass('w-full', 'h-auto', 'pb-4', 'border-b-2');
        });
    });

    it('отображает заголовок поста', () => {
        render(<ContentPost post={mockPost} />);
        expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    });

    it('отображает содержимое поста', () => {
        render(<ContentPost post={mockPost} />);
        expect(screen.getByText(mockPost.content)).toBeInTheDocument();
    });

    it('отображает дату публикации', () => {
        render(<ContentPost post={mockPost} />);
        expect(screen.getByText(mockPost.date)).toBeInTheDocument();
    });

    it('отображает автора поста', () => {
        render(<ContentPost post={mockPost} />);
        expect(screen.getByText(mockPost.author)).toBeInTheDocument();
    });

    it('отображает изображение поста', () => {
        render(<ContentPost post={mockPost} />);
        const image = screen.getByAltText(mockPost.title);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', mockPost.image);
    });

    it('отображает категорию поста', () => {
        render(<ContentPost post={mockPost} />);
        expect(screen.getByText(mockPost.category)).toBeInTheDocument();
    });

    it('применяет правильные стили к заголовку', () => {
        render(<ContentPost post={mockPost} />);
        const title = screen.getByText(mockPost.title);
        expect(title).toHaveClass('text-xl', 'font-bold', 'mb-2');
    });

    it('применяет правильные стили к содержимому', () => {
        render(<ContentPost post={mockPost} />);
        const content = screen.getByText(mockPost.content);
        expect(content).toHaveClass('text-gray-700', 'mb-4');
    });

    it('применяет правильные стили к метаданным', () => {
        render(<ContentPost post={mockPost} />);
        const metadata = screen.getByTestId('post-metadata');
        expect(metadata).toHaveClass('flex', 'items-center', 'space-x-4', 'text-sm', 'text-gray-500');
    });

    it('применяет правильные стили к изображению', () => {
        render(<ContentPost post={mockPost} />);
        const image = screen.getByAltText(mockPost.title);
        expect(image).toHaveClass('w-full', 'h-48', 'object-cover', 'rounded-lg', 'mb-4');
    });

    it('применяет правильные стили к категории', () => {
        render(<ContentPost post={mockPost} />);
        const category = screen.getByText(mockPost.category);
        expect(category).toHaveClass('text-[#85BB65]', 'font-semibold');
    });

    it('отображает только первые 6 постов', () => {
        const manyPosts = Array(10).fill(mockData[0]);
        render(<ContentPost data={manyPosts} />);
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(6);
    });
});
