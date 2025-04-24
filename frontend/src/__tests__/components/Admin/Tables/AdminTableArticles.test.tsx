import React from 'react';
import {expect, describe, it} from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminTableArticles from '../../../../components/Admin/Tables/AdminTableArticles';

describe('Компонент AdminTableArticles', () => {
    const mockData = [
        {
            title: 'Тестовая статья 1',
            author: {
                username: 'admin'
            },
            is_published: true,
            category: {
                name: 'Тест'
            },
            time_update: '2024-03-20T10:00:00Z'
        },
        {
            title: 'Тестовая статья 2',
            author: {
                username: 'user'
            },
            is_published: false,
            category: {
                name: 'Новости'
            },
            time_update: '2024-03-19T15:30:00Z'
        }
    ];

    it('отображает таблицу со статьями', () => {
        render(<AdminTableArticles data={mockData} />);
        
        expect(screen.getByText('Тестовая статья 1')).toBeInTheDocument();
        expect(screen.getByText('Тестовая статья 2')).toBeInTheDocument();
    });

    it('отображает статус публикации статей', () => {
        render(<AdminTableArticles data={mockData} />);
        
        expect(screen.getByText('Опубликован')).toBeInTheDocument();
        expect(screen.getByText('Не Опубликован')).toBeInTheDocument();
    });

    it('отображает авторов статей', () => {
        render(<AdminTableArticles data={mockData} />);
        
        expect(screen.getByText('admin')).toBeInTheDocument();
        expect(screen.getByText('user')).toBeInTheDocument();
    });

    it('отображает категории статей', () => {
        render(<AdminTableArticles data={mockData} />);
        
        expect(screen.getByText('Тест')).toBeInTheDocument();
        expect(screen.getByText('Новости')).toBeInTheDocument();
    });

    it('отображает даты обновления статей', () => {
        render(<AdminTableArticles data={mockData} />);
        
        const dates = screen.getAllByTestId('date');
        expect(dates).toHaveLength(2);
    });

    it('фильтрует статьи по статусу публикации', () => {
        render(<AdminTableArticles data={mockData} />);
        
        const statusDropdown = screen.getByTestId('status');
        fireEvent.change(statusDropdown, { target: { value: 'Опубликован' } });
        
        expect(screen.getByText('Тестовая статья 1')).toBeInTheDocument();
        expect(screen.queryByText('Тестовая статья 2')).not.toBeInTheDocument();
    });

    it('фильтрует статьи по категории', () => {
        render(<AdminTableArticles data={mockData} />);
        
        const categoryDropdown = screen.getByTestId('category');
        fireEvent.change(categoryDropdown, { target: { value: 'Тест' } });
        
        expect(screen.getByText('Тестовая статья 1')).toBeInTheDocument();
        expect(screen.queryByText('Тестовая статья 2')).not.toBeInTheDocument();
    });

    it('фильтрует статьи по дате', () => {
        render(<AdminTableArticles data={mockData} />);
        
        const dateDropdown = screen.queryByTestId('date');
        fireEvent.change(dateDropdown, { target: { value: 'today' } });
        
        const dates = screen.queryByTestId('date');
        expect(dates).toHaveLength(1);
    });

    it('отображает пустую таблицу при отсутствии данных', () => {
        render(<AdminTableArticles data={[]} />);
        
        const table = screen.getByRole('table');
        const rows = screen.queryAllByRole('row');
        expect(rows.length).toBe(1);
    });

    it('применяет правильные стили к заголовкам таблицы', () => {
        render(<AdminTableArticles data={mockData} />);
        
        const headers = screen.getAllByRole('columnheader');
        headers.forEach(header => {
            expect(header).toHaveClass('bg-[#111111]', 'text-center', 'text-base', 'py-2', 'px-4');
        });
    });
});


