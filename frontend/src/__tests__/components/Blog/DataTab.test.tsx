import React from 'react';
import type { Mock } from 'vitest';
import { vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DataTab from '../../../components/Blog/DataTab';
import * as hooks from '@/api/useAllCategories.tsx';

// Mock the useAllCategories hook
vi.mock('@/api/useAllCategories.tsx');

const mockCategories = [
    { name: 'Category 1', slug: 'category-1' },
    { name: 'Category 2', slug: 'category-2' },
    { name: 'Category 3', slug: 'category-3' },
    { name: 'Category 4', slug: 'category-4' },
    { name: 'Category 5', slug: 'category-5' },
    { name: 'Category 6', slug: 'category-6' },
    { name: 'Category 7', slug: 'category-7' },
];

describe('Компонент DataTab', () => {
    const mockOnSidebarChange = vi.fn();
    const mockOnSelectCategory = vi.fn();

    beforeEach(() => {
        // Reset mocks before each test
        vi.clearAllMocks();
        // Mock useAllCategories to return controlled data
        (hooks.useAllCategories as Mock).mockReturnValue({
            data: mockCategories,
            dataCount: mockCategories.length,
            error: null,
        });
    });

    it('отображает кнопку открытия боковой панели, когда isSidebarChange=false', () => {
        render(
            <DataTab
                isSidebarChange={false}
                onSidebarChange={mockOnSidebarChange}
                onSelectCategory={mockOnSelectCategory}
            />
        );
        const button = screen.getByText('Категории');
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('data-tab-sidebar-close-btn');
    });

    it('открывает боковую панель при клике на кнопку', () => {
        render(
            <DataTab
                isSidebarChange={false}
                onSidebarChange={mockOnSidebarChange}
                onSelectCategory={mockOnSelectCategory}
            />
        );
        const button = screen.getByText('Категории');
        fireEvent.click(button);
        expect(mockOnSidebarChange).toHaveBeenCalledWith(true);
    });

    it('отображает боковую панель с поиском и категориями, когда isSidebarChange=true', () => {
        render(
            <DataTab
                isSidebarChange={true}
                onSidebarChange={mockOnSidebarChange}
                onSelectCategory={mockOnSelectCategory}
            />
        );
        expect(screen.getByPlaceholderText('Поиск...')).toBeInTheDocument();
        expect(screen.getByText('Category 1')).toBeInTheDocument();
        expect(screen.getByText('Category 2')).toBeInTheDocument();
        // Only 5 categories shown when isOpen=false
        expect(screen.queryByText('Category 6')).not.toBeInTheDocument();
    });

    it('фильтрует категории по поисковому запросу', async () => {
        render(
            <DataTab
                isSidebarChange={true}
                onSidebarChange={mockOnSidebarChange}
                onSelectCategory={mockOnSelectCategory}
            />
        );
        const searchInput = screen.getByPlaceholderText('Поиск...');
        fireEvent.change(searchInput, { target: { value: 'Category 1' } });
        await waitFor(() => {
            expect(screen.getByText('Category 1')).toBeInTheDocument();
            expect(screen.queryByText('Category 2')).not.toBeInTheDocument();
        });
    });

    it('отображает кнопку "Показать ещё" при наличии более 6 категорий', () => {
        render(
            <DataTab
                isSidebarChange={true}
                onSidebarChange={mockOnSidebarChange}
                onSelectCategory={mockOnSelectCategory}
            />
        );
        expect(screen.getByText('Показать ещё')).toBeInTheDocument();
    });

    it('показывает все категории при клике на "Показать ещё"', async () => {
        render(
            <DataTab
                isSidebarChange={true}
                onSidebarChange={mockOnSidebarChange}
                onSelectCategory={mockOnSelectCategory}
            />
        );
        const showMoreButton = screen.getByText('Показать ещё');
        fireEvent.click(showMoreButton);
        await waitFor(() => {
            expect(screen.getByText('Category 6')).toBeInTheDocument();
            expect(screen.getByText('Category 7')).toBeInTheDocument();
            expect(screen.queryByText('Показать ещё')).not.toBeInTheDocument();
        });
    });

    it('отображает ошибку при наличии ошибки в useAllCategories', () => {
        (hooks.useAllCategories as Mock).mockReturnValue({
            data: [],
            dataCount: 0,
            error: { message: 'Failed to fetch categories' },
        });
        render(
            <DataTab
                isSidebarChange={true}
                onSidebarChange={mockOnSidebarChange}
                onSelectCategory={mockOnSelectCategory}
            />
        );
        expect(screen.getByText('Error: Failed to fetch categories')).toBeInTheDocument();
    });
});