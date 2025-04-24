import React from 'react';
import { render, screen } from '@testing-library/react';
import Article from '../../../components/Bond/Article';

describe('Компонент Article', () => {
    const mockArticle = {
        title: 'Тестовая статья',
        content: 'Тестовое содержимое статьи',
        date: '2023-01-01',
        author: 'Тестовый автор',
        image: '/test-image.jpg'
    };

    it('отображает заголовок статьи', () => {
        render(<Article article={mockArticle} />);
        expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
    });

    it('отображает содержимое статьи', () => {
        render(<Article article={mockArticle} />);
        expect(screen.getByText(mockArticle.content)).toBeInTheDocument();
    });

    it('отображает дату публикации', () => {
        render(<Article article={mockArticle} />);
        expect(screen.getByText(mockArticle.date)).toBeInTheDocument();
    });

    it('отображает автора статьи', () => {
        render(<Article article={mockArticle} />);
        expect(screen.getByText(mockArticle.author)).toBeInTheDocument();
    });

    it('отображает изображение статьи', () => {
        render(<Article article={mockArticle} />);
        const image = screen.getByAltText(mockArticle.title);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', mockArticle.image);
    });

    it('применяет правильные стили к заголовку', () => {
        render(<Article article={mockArticle} />);
        const title = screen.getByText(mockArticle.title);
        expect(title).toHaveClass('text-2xl', 'font-bold', 'mb-4');
    });

    it('применяет правильные стили к содержимому', () => {
        render(<Article article={mockArticle} />);
        const content = screen.getByText(mockArticle.content);
        expect(content).toHaveClass('text-gray-700', 'mb-4');
    });

    it('применяет правильные стили к метаданным', () => {
        render(<Article article={mockArticle} />);
        const metadata = screen.getByTestId('article-metadata');
        expect(metadata).toHaveClass('flex', 'items-center', 'space-x-4', 'text-sm', 'text-gray-500');
    });

    it('применяет правильные стили к изображению', () => {
        render(<Article article={mockArticle} />);
        const image = screen.getByAltText(mockArticle.title);
        expect(image).toHaveClass('w-full', 'h-64', 'object-cover', 'rounded-lg', 'mb-4');
    });
});


