import { expect, describe, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '@/widgets/Dropdown.tsx';

describe('Компонент Dropdown', () => {
    const mockOptions = [
        { value: '1', label: 'Опция 1' },
        { value: '2', label: 'Опция 2' },
        { value: '3', label: 'Опция 3' }
    ];

    const mockOnChange = vi.fn();

    it('отображает выпадающий список', () => {
        render(
            <Dropdown
                name="test"
                value="1"
                onChange={mockOnChange}
                options={mockOptions}
            />
        );
        expect(document.getElementById('test')).toBeInTheDocument();
    });

    it('отображает выбранное значение', () => {
        render(
            <Dropdown
                name="test"
                value="1"
                onChange={mockOnChange}
                options={mockOptions}
            />
        );
        expect(screen.getByText('Опция 1')).toBeInTheDocument();
    });

    it('открывает список при клике', () => {
        render(
            <Dropdown
                name="test"
                value="1"
                onChange={mockOnChange}
                options={mockOptions}
            />
        );
        const button: any =  document.getElementById('test');
        fireEvent.click(button);
        expect(screen.getByText('Опция 2')).toBeInTheDocument();
        expect(screen.getByText('Опция 3')).toBeInTheDocument();
    });

    it('закрывает список при клике вне его', () => {
        render(
            <Dropdown
                name="test"
                value="1"
                onChange={mockOnChange}
                options={mockOptions}
            />
        );
        const button: any = document.getElementById('test');
        fireEvent.mouseMove(button);
        fireEvent.mouseMove(document.body);
        expect(screen.queryByText('Опция 2')).not.toBeInTheDocument();
    });

    it('открывает список при наведении мыши', () => {
        render(
            <Dropdown
                name="dropdown"
                value="1"
                onChange={mockOnChange}
                options={mockOptions}
            />
        );
        const dropdown: any = document.getElementById('dropdown');
        fireEvent.mouseEnter(dropdown);
        expect(screen.getByText('Опция 2')).toBeInTheDocument();
    });

    it('закрывает список при уходе мыши', () => {
        render(
            <Dropdown
                name="test"
                value="1"
                onChange={mockOnChange}
                options={mockOptions}
            />
        );
        const dropdown: any = document.getElementById('test');
        fireEvent.mouseEnter(dropdown);
        fireEvent.mouseLeave(dropdown);
        expect(screen.queryByText('Опция 2')).not.toBeInTheDocument();
    });
});
