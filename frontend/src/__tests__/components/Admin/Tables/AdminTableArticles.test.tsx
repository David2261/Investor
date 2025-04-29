import React from 'react';
import { expect, describe, it } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminTableArticles from '../../../../components/Admin/Tables/AdminTableArticles';
import { dateOptions, statusOptions } from '@/entities/constants/options';

vi.mock('@/components/HomeAdmin/FormatDate.tsx', () => ({
    default: ({ date }: { date: string }) => <span>{new Date(date).toLocaleDateString()}</span>,
  }));
  
  // Мок для Dropdown
vi.mock('@/widgets/Dropdown.tsx', () => ({
    default: ({ name, value, onChange, options }: { name: string; value: string; onChange: (value: string) => void; options: { value: string; label: string }[] }) => (
    <select
    data-testid={name}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ),
}));

describe('Компонент AdminTableArticles', () => {
    const mockData = [
        {
          title: 'Статья 1',
          author: { username: 'user1' },
          is_published: true,
          category: { name: 'Категория 1' },
          time_update: new Date().toISOString(),
        },
        {
          title: 'Статья 2',
          author: { username: 'user2' },
          is_published: false,
          category: { name: 'Категория 2' },
          time_update: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        },
    ];

    it('отображает таблицу со статьями', () => {
        render(<AdminTableArticles data={mockData} />);
        
        expect(screen.getByText('Статья 1')).toBeInTheDocument();
        expect(screen.getByText('Статья 2')).toBeInTheDocument();
    });

    it('отображает статус публикации статей', () => {
        render(<AdminTableArticles data={mockData} />);
        
        expect(screen.getAllByText('Опубликован')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Не Опубликован')[0]).toBeInTheDocument();
    });

    it('отображает авторов статей', () => {
        render(<AdminTableArticles data={mockData} />);
        
        expect(screen.getByText('user1')).toBeInTheDocument();
        expect(screen.getByText('user2')).toBeInTheDocument();
    });

    it('отображает категории статей', () => {
        render(<AdminTableArticles data={mockData} />);
        
        expect(screen.getAllByText('Категория 1')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Категория 2')[0]).toBeInTheDocument();
    });

    it('отображает даты обновления статей', () => {
        render(<AdminTableArticles data={mockData} />);
        
        const dates = screen.getAllByTestId('date');
        expect(dates).toHaveLength(1);
    });

    it('фильтрует статьи по статусу публикации', () => {
        render(<AdminTableArticles data={mockData} />);
        
        const statusDropdown = screen.getByTestId('status');
        fireEvent.change(statusDropdown, { target: { value: 'Опубликован' } });
        
        expect(screen.getByText('Статья 1')).toBeInTheDocument();
        expect(screen.queryByText('Статья 2')).not.toBeInTheDocument();
    });

    it('фильтрует статьи по категории', () => {
        render(<AdminTableArticles data={mockData} />);
        
        const categoryDropdown = screen.getByTestId('category');
        fireEvent.change(categoryDropdown, { target: { value: 'Тест' } });
        
        expect(screen.getByText('Статья 1')).toBeInTheDocument();
        expect(screen.queryByText('Статья 2')).toBeInTheDocument();
    });

    it('фильтрует статьи по дате', async () => {
        render(<AdminTableArticles data={mockData} />);

        const dateDropdown = screen.getByTestId('date');
        expect(dateDropdown).toBeInTheDocument();

        fireEvent.change(dateDropdown, { target: { value: 'today' } });

        await waitFor(() => {
          const rows = screen.getAllByRole('row');
          expect(rows).toHaveLength(2);
          expect(screen.getByText('Статья 1')).toBeInTheDocument();
          expect(screen.queryByText('Статья 2')).not.toBeInTheDocument();
        });
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


