import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ContentPost from '../../../components/Home/ContentPost';
import { mock } from 'node:test';

const mockData: any = [
    {
    title: 'Test Post 3',
    category: {
        name: 'Test Category 3',
        slug: 'test-category-3',
    },
    img: 'test-image-3.jpg',
    slug: 'test-post-3',
    },
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
        expect(screen.getByText('Test Category 1')).toBeInTheDocument();
        expect(screen.getByText('Test Post 1')).toBeInTheDocument();
        const image1 = screen.getByAltText('Test Post 1');
        expect(image1).toHaveAttribute('src', 'test-image-1.jpg');

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

    it('отображает заголовок поста', () => {
        render(
            <BrowserRouter>
                <ContentPost data={mockData} />
            </BrowserRouter>
        );
        expect(screen.getByText(mockData[1].title)).toBeInTheDocument();
    });

    it('отображает изображение поста', () => {
        render(
            <BrowserRouter>
                <ContentPost data={mockData} />
            </BrowserRouter>
        );
        const image = screen.getAllByRole("img");
        expect(image[0]).toBeInTheDocument();
        expect(image[0]).toHaveAttribute('src', mockData[1].img);
    });
});