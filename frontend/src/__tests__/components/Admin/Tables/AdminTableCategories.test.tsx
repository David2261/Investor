import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminTableCategories from '../../../../components/Admin/Tables/AdminTableCategories';

describe('Компонент AdminTableCategories', () => {
    const mockData = [
        {
            name: 'Новости'
        },
        {
            name: 'Аналитика'
        },
        {
            name: 'Обзоры'
        }
    ];

    it('отображает таблицу с категориями', () => {
        render(<AdminTableCategories data={mockData} />);
        
        expect(screen.getByText('Новости')).toBeInTheDocument();
        expect(screen.getByText('Аналитика')).toBeInTheDocument();
        expect(screen.getByText('Обзоры')).toBeInTheDocument();
    });

    it('отображает заголовок таблицы', () => {
        render(<AdminTableCategories data={mockData} />);
        
        const header = screen.getByRole('columnheader');
        expect(header).toHaveTextContent('Название');
    });

    it('применяет правильные стили к заголовку таблицы', () => {
        render(<AdminTableCategories data={mockData} />);
        
        const header = screen.getByRole('columnheader');
        expect(header).toHaveClass(
            'bg-[#A9A9A9]',
            'text-center',
            'text-[#D9D9D9]',
            'text-base',
            'py-2',
            'px-4',
            'opacity-70'
        );
    });

    it('применяет правильные стили к ячейкам таблицы', () => {
        render(<AdminTableCategories data={mockData} />);
        
        const cells = screen.getAllByRole('cell');
        cells.forEach(cell => {
            expect(cell).toHaveClass('text-center', 'text-white', 'text-sm', 'py-2');
        });
    });

    it('отображает пустую таблицу при отсутствии данных', () => {
        render(<AdminTableCategories data={[]} />);
        
        const table = screen.getByRole('table');
        const rows = screen.queryAllByRole('row');
        expect(rows.length).toBe(1); // только заголовок таблицы
    });

    it('отображает правильное количество категорий', () => {
        render(<AdminTableCategories data={mockData} />);
        
        const rows = screen.getAllByRole('row');
        expect(rows.length).toBe(4); // заголовок + 3 категории
    });

    it('применяет правильные стили к таблице', () => {
        render(<AdminTableCategories data={mockData} />);
        
        const table = screen.getByRole('table');
        expect(table).toHaveClass('w-full', 'h-1/3');
    });

    it('применяет правильные стили к строкам таблицы', () => {
        render(<AdminTableCategories data={mockData} />);
        
        const rows = screen.getAllByRole('row');
        rows.slice(1).forEach(row => { // пропускаем заголовок
            expect(row).toHaveClass('w-full');
        });
    });
});


