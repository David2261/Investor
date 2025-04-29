import React from 'react';
import { expect, describe, beforeEach, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '../../../components/Blog/Filter';

describe('Компонент Filter', () => {
    const mockOnFilterChange = vi.fn();

    beforeEach(() => {
        mockOnFilterChange.mockClear();
    });

    it('отображает кнопку сортировки', () => {
        render(<Filter onFilterChange={mockOnFilterChange} />);
        expect(screen.getByText('Сортировка')).toBeInTheDocument();
    });

    it('открывает и закрывает выпадающее меню при клике на кнопку', () => {
        render(<Filter onFilterChange={mockOnFilterChange} />);
        
        // Проверяем, что меню изначально закрыто
        expect(screen.queryByText('Популярные')).not.toBeInTheDocument();
        
        // Открываем меню
        fireEvent.click(screen.getByText('Сортировка'));
        expect(screen.getByText('Популярные')).toBeInTheDocument();
        
        // Закрываем меню
        fireEvent.click(screen.getByText('Сортировка'));
        expect(screen.queryByText('Популярные')).not.toBeInTheDocument();
    });

    it('вызывает onFilterChange с правильными параметрами при выборе сортировки по популярности', () => {
        render(<Filter onFilterChange={mockOnFilterChange} />);
        
        fireEvent.click(screen.getByText('Сортировка'));
        fireEvent.click(screen.getByText('Популярные'));
        
        expect(mockOnFilterChange).toHaveBeenCalledWith({
            sortBy: 'popularity',
            order: 'desc'
        });
    });

    it('вызывает onFilterChange с правильными параметрами при выборе сортировки по возрастанию даты', () => {
        render(<Filter onFilterChange={mockOnFilterChange} />);
        
        fireEvent.click(screen.getByText('Сортировка'));
        fireEvent.click(screen.getByText('По возрастанию даты'));
        
        expect(mockOnFilterChange).toHaveBeenCalledWith({
            sortBy: 'date',
            order: 'asc'
        });
    });

    it('вызывает onFilterChange с правильными параметрами при выборе сортировки по убыванию даты', () => {
        render(<Filter onFilterChange={mockOnFilterChange} />);
        
        fireEvent.click(screen.getByText('Сортировка'));
        fireEvent.click(screen.getByText('По убыванию даты'));
        
        expect(mockOnFilterChange).toHaveBeenCalledWith({
            sortBy: 'date',
            order: 'desc'
        });
    });

    it('закрывает меню после выбора опции сортировки', () => {
        render(<Filter onFilterChange={mockOnFilterChange} />);
        
        fireEvent.click(screen.getByText('Сортировка'));
        fireEvent.click(screen.getByText('Популярные'));
        
        expect(screen.queryByText('Популярные')).not.toBeInTheDocument();
    });

});


