import { expect, describe, it } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminTableBonds from '../../../../components/Admin/Tables/AdminTableBonds';
import type { Bond } from '@/types/Bond';

vi.mock('@/components/HomeAdmin/FormatDate.tsx', () => ({
    default: ({ date }: { date: string }) => (
      <span data-testid="formatted-date">{new Date(date).toLocaleString()}</span>
    ),
}));
  
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

describe('Компонент AdminTableBonds', () => {
    const mockData: Bond = [
        {
            title: 'Облигация 1',
            description: 'Some text of the bond',
            is_published: true,
            price: 1220.0,
            category: 'municipal bonds',
            maturity: new Date(2025, 8, 20).toISOString(),
            cupon_percent: 7.5,
        },
        {
            title: 'Облигация 2',
            description: 'Some text of the bond',
            is_published: false,
            category: 'corporate bonds',
            maturity: new Date(2025, 6, 15).toISOString(),
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
        
        expect(screen.getAllByText('Опубликован')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Не Опубликован')[0]).toBeInTheDocument();
    });

    it('отображает категории облигаций', () => {
        render(<AdminTableBonds data={mockData} />);
        
        expect(screen.getAllByText('Муниципальные облигации')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Корпоративные облигации')[0]).toBeInTheDocument();
    });

    it('отображает купонные ставки облигаций', () => {
        render(<AdminTableBonds data={mockData} />);
        
        expect(screen.getByText('7.5')).toBeInTheDocument();
        expect(screen.getByText('12')).toBeInTheDocument();
    });

    it('фильтрует облигации по статусу публикации', () => {
        render(<AdminTableBonds data={mockData} />);
        
        const statusDropdown = screen.getByTestId('is_published');
        fireEvent.change(statusDropdown, { target: { value: 'Опубликован' } });
        
        expect(screen.getByText('Облигация 1')).toBeInTheDocument();
        expect(screen.queryByText('Облигация 2')).not.toBeInTheDocument();
    });

    it('фильтрует облигации по дате погашения', async () => {
        render(<AdminTableBonds data={mockData} />);
    
        const maturityDropdown = screen.getByTestId('maturity');
        expect(maturityDropdown).toBeInTheDocument();
    
        fireEvent.change(maturityDropdown, { target: { value: 'Этот год' } });
    
        await waitFor(() => {
            expect(screen.getByText('Облигация 1')).toBeInTheDocument();
            expect(screen.getByText('Облигация 2')).toBeInTheDocument();
            expect(screen.queryByText('Облигация 3')).not.toBeInTheDocument();
        });
    });

    it('фильтрует облигации по купонной ставке', () => {
        render(<AdminTableBonds data={mockData} />);
        
        const couponDropdown = screen.getByTestId('cupon_percent');
        fireEvent.change(couponDropdown, { target: { value: 'Более 10%' } });
        
        expect(screen.queryByText('Облигация 1')).not.toBeInTheDocument();
        expect(screen.getByText('Облигация 2')).toBeInTheDocument();
    });

    it('фильтрует облигации по дате погашения', () => {
        render(<AdminTableBonds data={mockData} />);
        screen.debug()
        const maturityDropdown = screen.getByTestId('maturity');
        fireEvent.change(maturityDropdown, { target: { value: 'Этот год' } });
        
        const dates = screen.getAllByTestId('maturity');
        expect(dates).toHaveLength(1);
    });

    it('отображает пустую таблицу при отсутствии данных', () => {
        render(<AdminTableBonds data={[]} />);
        const table = screen.getByRole('table');
        const rows = screen.queryAllByRole('row');
        expect(rows.length).toBe(1);
    });
});


