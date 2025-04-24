import React from 'react';
import {expect, describe, it} from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminTableBonds from '../../../../components/Admin/Tables/AdminTableBonds';

describe('Компонент AdminTableBonds', () => {
    const mockData = [
        {
            title: 'Облигация 1',
            description: 'Some text of the bond',
            is_published: true,
            price: 1220.0,
            category: 'municipal bonds',
            maturity: '2024-12-31T00:00:00Z',
            cupon_percent: 7.5,
        },
        {
            title: 'Облигация 2',
            description: 'Some text of the bond',
            is_published: false,
            category: 'corporate bonds',
            maturity: '2024-06-30T00:00:00Z',
            price: 1200.0,
            cupon_percent: 12.0
        }
    ];

    it('отображает таблицу с облигациями', () => {
        render(<AdminTableBonds data={mockData} />);
        
        expect(screen.getByText('Облигация 1')).toBeInTheDocument();
        expect(screen.getByText('Облигация 2')).toBeInTheDocument();
    });

    it('отображает статус публикации облигаций', () => {
        render(<AdminTableBonds data={mockData} />);
        
        expect(screen.getByText('Опубликован')).toBeInTheDocument();
        expect(screen.getByText('Не Опубликован')).toBeInTheDocument();
    });

    it('отображает категории облигаций', () => {
        render(<AdminTableBonds data={mockData} />);
        
        expect(screen.getByText('Муниципальные облигации')).toBeInTheDocument();
        expect(screen.getByText('Корпоративные облигации')).toBeInTheDocument();
    });

    it('отображает даты погашения облигаций', () => {
        render(<AdminTableBonds data={mockData} />);
        
        const dates = screen.getAllByTestId('formatted-date');
        expect(dates).toHaveLength(2);
    });

    it('отображает купонные ставки облигаций', () => {
        render(<AdminTableBonds data={mockData} />);
        
        expect(screen.getByText('7.5')).toBeInTheDocument();
        expect(screen.getByText('12.0')).toBeInTheDocument();
    });

    it('фильтрует облигации по статусу публикации', () => {
        render(<AdminTableBonds data={mockData} />);
        
        const statusDropdown = screen.getByTestId('is_published-dropdown');
        fireEvent.change(statusDropdown, { target: { value: 'Опубликован' } });
        
        expect(screen.getByText('Облигация 1')).toBeInTheDocument();
        expect(screen.queryByText('Облигация 2')).not.toBeInTheDocument();
    });

    it('фильтрует облигации по категории', () => {
        render(<AdminTableBonds data={mockData} />);
        
        const categoryDropdown = screen.getByTestId('category-dropdown');
        fireEvent.change(categoryDropdown, { target: { value: 'municipal bonds' } });
        
        expect(screen.getByText('Облигация 1')).toBeInTheDocument();
        expect(screen.queryByText('Облигация 2')).not.toBeInTheDocument();
    });

    it('фильтрует облигации по купонной ставке', () => {
        render(<AdminTableBonds data={mockData} />);
        
        const couponDropdown = screen.getByTestId('cupon_percent-dropdown');
        fireEvent.change(couponDropdown, { target: { value: 'Более 10%' } });
        
        expect(screen.queryByText('Облигация 1')).not.toBeInTheDocument();
        expect(screen.getByText('Облигация 2')).toBeInTheDocument();
    });

    it('фильтрует облигации по дате погашения', () => {
        render(<AdminTableBonds data={mockData} />);
        
        const maturityDropdown = screen.getByTestId('maturity-dropdown');
        fireEvent.change(maturityDropdown, { target: { value: 'Этот год' } });
        
        const dates = screen.getAllByTestId('formatted-date');
        expect(dates).toHaveLength(2);
    });

    it('отображает пустую таблицу при отсутствии данных', () => {
        render(<AdminTableBonds data={[]} />);
        
        const table = screen.getByRole('table');
        const rows = screen.queryAllByRole('row');
        expect(rows.length).toBe(1); // только заголовок таблицы
    });

    it('применяет правильные стили к заголовкам таблицы', () => {
        render(<AdminTableBonds data={mockData} />);
        
        const headers = screen.getAllByRole('columnheader');
        headers.forEach(header => {
            expect(header).toHaveClass('bg-[#111111]', 'text-center', 'text-base', 'py-2', 'px-4');
        });
    });
});


