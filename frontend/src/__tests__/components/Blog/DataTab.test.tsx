import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DataTab from '../../../components/Blog/DataTab';

describe('Компонент DataTab', () => {
    const mockData = {
        title: 'Тестовый заголовок',
        content: 'Тестовое содержимое',
        date: '2023-01-01',
        author: 'Тестовый автор'
    };

    it('отображает заголовок', () => {
        render(<DataTab data={mockData} />);
        expect(screen.getByText(mockData.title)).toBeInTheDocument();
    });

    it('отображает содержимое', () => {
        render(<DataTab data={mockData} />);
        expect(screen.getByText(mockData.content)).toBeInTheDocument();
    });

    it('отображает дату', () => {
        render(<DataTab data={mockData} />);
        expect(screen.getByText(mockData.date)).toBeInTheDocument();
    });

    it('отображает автора', () => {
        render(<DataTab data={mockData} />);
        expect(screen.getByText(mockData.author)).toBeInTheDocument();
    });

    it('применяет правильные стили к заголовку', () => {
        render(<DataTab data={mockData} />);
        const title = screen.getByText(mockData.title);
        expect(title).toHaveClass('text-xl', 'font-bold', 'mb-2');
    });

    it('применяет правильные стили к содержимому', () => {
        render(<DataTab data={mockData} />);
        const content = screen.getByText(mockData.content);
        expect(content).toHaveClass('text-gray-700', 'mb-4');
    });

    it('применяет правильные стили к дате', () => {
        render(<DataTab data={mockData} />);
        const date = screen.getByText(mockData.date);
        expect(date).toHaveClass('text-sm', 'text-gray-500');
    });

    it('применяет правильные стили к автору', () => {
        render(<DataTab data={mockData} />);
        const author = screen.getByText(mockData.author);
        expect(author).toHaveClass('text-sm', 'text-gray-500');
    });

    it('отображает все элементы в правильном порядке', () => {
        render(<DataTab data={mockData} />);
        const elements = screen.getAllByRole('text');
        expect(elements[0]).toHaveTextContent(mockData.title);
        expect(elements[1]).toHaveTextContent(mockData.content);
        expect(elements[2]).toHaveTextContent(mockData.date);
        expect(elements[3]).toHaveTextContent(mockData.author);
    });
});


