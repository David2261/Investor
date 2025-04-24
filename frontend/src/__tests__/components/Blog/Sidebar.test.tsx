import React from 'react';
import {expect, describe, beforeEach, jest, it} from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '@/components/Blog/Sidebar.tsx';

const mockData = [
    {
        id: 1,
        name: 'Test Category 1',
        slug: 'test-category-1',
        posts: [],
    },
    {
        id: 2,
        name: 'Test Category 2',
        slug: 'test-category-2',
        posts: [],
    },
];

describe('Компонент Sidebar', () => {
    const mockOnSelectCategory = jest.fn();

    beforeEach(() => {
        mockOnSelectCategory.mockClear();
    });

    it('отображает все категории', () => {
        render(
            <Sidebar data={mockData} onSelectCategory={mockOnSelectCategory} />
        );

        const categories = screen.getAllByRole('button');
        expect(categories).toHaveLength(2);
        expect(screen.getByText('Test Category 1')).toBeInTheDocument();
        expect(screen.getByText('Test Category 2')).toBeInTheDocument();
    });

    it('вызывает onSelectCategory при клике на категорию', () => {
        render(
            <Sidebar data={mockData} onSelectCategory={mockOnSelectCategory} />
        );

        const categoryButton = screen.getByText('Test Category 1');
        fireEvent.click(categoryButton);

        expect(mockOnSelectCategory).toHaveBeenCalledWith('test-category-1');
    });


    it('отображает пустой список при отсутствии данных', () => {
        render(
            <Sidebar data={[]} onSelectCategory={mockOnSelectCategory} />
        );

        const categories = screen.queryAllByRole('button');
        expect(categories).toHaveLength(0);
    });

    it('корректно обрабатывает клик по разным категориям', () => {
        render(
            <Sidebar data={mockData} onSelectCategory={mockOnSelectCategory} />
        );

        const category1Button = screen.getByText('Test Category 1');
        const category2Button = screen.getByText('Test Category 2');

        fireEvent.click(category1Button);
        expect(mockOnSelectCategory).toHaveBeenCalledWith('test-category-1');

        fireEvent.click(category2Button);
        expect(mockOnSelectCategory).toHaveBeenCalledWith('test-category-2');

        expect(mockOnSelectCategory).toHaveBeenCalledTimes(2);
    });
});


