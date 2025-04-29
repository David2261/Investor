import { expect, describe, it } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminTableUsers from '@/components/Admin/Tables/AdminTableUsers';
import { statusStaff, statusUserActive } from '@/entities/constants/options';

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

describe('Компонент AdminTableUsers', () => {
    const mockData = [
      {
        username: 'admin',
        email: 'admin@example.com',
        is_staff: true,
        is_active: true,
      },
      {
        username: 'user',
        email: 'user@example.com',
        is_staff: false,
        is_active: false,
      },
    ];
  
    it('отображает таблицу с пользователями', () => {
      render(<AdminTableUsers data={mockData} />);
  
      expect(screen.getByText('admin')).toBeInTheDocument();
      expect(screen.getByText('user')).toBeInTheDocument();
      expect(screen.getAllByRole('row')).toHaveLength(3);
    });
  
    it('отображает email пользователей', () => {
      render(<AdminTableUsers data={mockData} />);
  
      expect(screen.getByText('admin@example.com')).toBeInTheDocument();
      expect(screen.getByText('user@example.com')).toBeInTheDocument();
    });
  
    it('отображает статус сотрудника', () => {
      render(<AdminTableUsers data={mockData} />);
  
      expect(screen.getAllByText('Сотрудник')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Нет')[0]).toBeInTheDocument();
    });
  
    it('отображает статус активности', () => {
      render(<AdminTableUsers data={mockData} />);
  
      expect(screen.getAllByText('Активен')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Заблокирован')[0]).toBeInTheDocument();
    });
  
    it('фильтрует пользователей по статусу сотрудника', async () => {
      render(<AdminTableUsers data={mockData} />);
  
      const staffDropdown = screen.getByTestId('isStaff');
      fireEvent.change(staffDropdown, { target: { value: 'yes' } });
  
      await waitFor(() => {
        expect(screen.getByText('admin')).toBeInTheDocument();
        expect(screen.queryByText('user')).not.toBeInTheDocument();
        expect(screen.getAllByRole('row')).toHaveLength(2);
      });
    });
  
    it('фильтрует пользователей по статусу активности', async () => {
      render(<AdminTableUsers data={mockData} />);
  
      const activeDropdown = screen.getByTestId('isActive');
      fireEvent.change(activeDropdown, { target: { value: 'active' } });
  
      await waitFor(() => {
        expect(screen.getByText('admin')).toBeInTheDocument();
        expect(screen.queryByText('user')).not.toBeInTheDocument();
        expect(screen.getAllByRole('row')).toHaveLength(2);
      });
    });
  
    it('отображает пустую таблицу при отсутствии данных', () => {
      render(<AdminTableUsers data={[]} />);
  
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(1);
    });
  
    it('сбрасывает фильтры при выборе пустого значения', async () => {
      render(<AdminTableUsers data={mockData} />);
  
      const staffDropdown = screen.getByTestId('isStaff');
      const activeDropdown = screen.getByTestId('isActive');
  
      // Применяем фильтры
      fireEvent.change(staffDropdown, { target: { value: 'yes' } });
      fireEvent.change(activeDropdown, { target: { value: 'active' } });
  
      // Сбрасываем фильтры
      fireEvent.change(staffDropdown, { target: { value: '' } });
      fireEvent.change(activeDropdown, { target: { value: '' } });
  
      await waitFor(() => {
        expect(screen.getByText('admin')).toBeInTheDocument();
        expect(screen.getByText('user')).toBeInTheDocument();
        expect(screen.getAllByRole('row')).toHaveLength(3);
      });
    });
});