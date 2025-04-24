import React from 'react';
import {expect, describe, it} from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminTableUsers from '@/components/Admin/Tables/AdminTableUsers';

describe('Компонент AdminTableUsers', () => {
    const mockData = [
        {
            username: 'admin',
            email: 'admin@example.com',
            is_staff: true,
            is_active: true
        },
        {
            username: 'user',
            email: 'user@example.com',
            is_staff: false,
            is_active: false
        }
    ];

    it('отображает таблицу с пользователями', () => {
        render(<AdminTableUsers data={mockData} />);
        
        expect(screen.getByText('admin')).toBeInTheDocument();
        expect(screen.getByText('user')).toBeInTheDocument();
    });

    it('отображает email пользователей', () => {
        render(<AdminTableUsers data={mockData} />);
        
        expect(screen.getByText('admin@example.com')).toBeInTheDocument();
        expect(screen.getByText('user@example.com')).toBeInTheDocument();
    });

    it('отображает статус сотрудника', () => {
        render(<AdminTableUsers data={mockData} />);
        
        expect(screen.getByText('Сотрудник')).toBeInTheDocument();
        expect(screen.getByText('Нет')).toBeInTheDocument();
    });

    it('отображает статус активности', () => {
        render(<AdminTableUsers data={mockData} />);
        
        expect(screen.getByText('Активен')).toBeInTheDocument();
        expect(screen.getByText('Заблокирован')).toBeInTheDocument();
    });

    it('фильтрует пользователей по статусу сотрудника', () => {
        render(<AdminTableUsers data={mockData} />);
        
        const staffDropdown = screen.getByTestId('isStaff-dropdown');
        fireEvent.change(staffDropdown, { target: { value: 'yes' } });
        
        expect(screen.getByText('admin')).toBeInTheDocument();
        expect(screen.queryByText('user')).not.toBeInTheDocument();
    });

    it('фильтрует пользователей по статусу активности', () => {
        render(<AdminTableUsers data={mockData} />);
        
        const activeDropdown = screen.getByTestId('isActive-dropdown');
        fireEvent.change(activeDropdown, { target: { value: 'active' } });
        
        expect(screen.getByText('admin')).toBeInTheDocument();
        expect(screen.queryByText('user')).not.toBeInTheDocument();
    });

    it('отображает пустую таблицу при отсутствии данных', () => {
        render(<AdminTableUsers data={[]} />);
        
        const table = screen.getByRole('table');
        const rows = screen.queryAllByRole('row');
        expect(rows.length).toBe(1); // только заголовок таблицы
    });

    it('применяет правильные стили к заголовкам таблицы', () => {
        render(<AdminTableUsers data={mockData} />);
        
        const headers = screen.getAllByRole('columnheader');
        headers.forEach(header => {
            expect(header).toHaveClass('bg-[#111111]', 'text-[#D9D9D9]', 'text-center', 'text-base', 'py-2', 'px-4');
        });
    });

    it('применяет правильные стили к ячейкам таблицы', () => {
        render(<AdminTableUsers data={mockData} />);
        
        const cells = screen.getAllByRole('cell');
        cells.forEach(cell => {
            expect(cell).toHaveClass('text-center', 'text-white', 'text-sm', 'py-2');
        });
    });

    it('сбрасывает фильтры при выборе пустого значения', () => {
        render(<AdminTableUsers data={mockData} />);
        
        const staffDropdown = screen.getByTestId('isStaff');
        const activeDropdown = screen.getByTestId('isActive');
        
        fireEvent.change(staffDropdown, { target: { value: '' } });
        fireEvent.change(activeDropdown, { target: { value: '' } });
        
        expect(screen.getByText('admin')).toBeInTheDocument();
        expect(screen.getByText('user')).toBeInTheDocument();
    });
});


