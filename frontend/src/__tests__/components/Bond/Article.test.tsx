import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Article from '../../../components/Bond/Article';

describe('Компонент Article', () => {
	const mockArticle: any = [{
		id: 1,
		title: 'Тестовая статья',
		slug: 'text-article-1',
		date: '2023-01-01',
		category: {
			name: 'text',
			slug: 'text'
		},
		img: '/test-image.jpg'
	}];

	it('отображает заголовок статьи', () => {
        render(
            <BrowserRouter>
                <Article data={mockArticle} />
            </BrowserRouter>
        );
        expect(screen.getByText((content) => content.includes('Тестовая статья... | text'))).toBeInTheDocument();
    });

    it('отображает изображение статьи', () => {
        render(
            <BrowserRouter>
                <Article data={mockArticle} />
            </BrowserRouter>
        );
        const image = screen.getByAltText(mockArticle[0].title);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', mockArticle[0].img);
    });
});