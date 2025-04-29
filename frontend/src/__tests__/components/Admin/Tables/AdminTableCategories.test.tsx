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

});


