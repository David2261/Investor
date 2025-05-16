import React from 'react';
import {expect, describe, it} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Sidebar from '@/components/Admin/HomeAdmin/Sidebar';
import Swal from 'sweetalert2';

vi.mock('sweetalert2', () => ({
    default: {
        fire: vi.fn()
    }
}));

describe('Компонент Sidebar', () => {
    const mockDataApps = [
        {
            name: 'articles',
            verbose_name: 'Статьи'
        },
        {
            name: 'bonds',
            verbose_name: 'Облигации'
        }
    ];

    const mockDataModels = {
        'articles': ['article', 'category'],
        'bonds': ['bond', 'type']
    };

    it('отображает логотип', () => {
        render(
            <BrowserRouter>
                <Sidebar dataApps={mockDataApps} dataModels={mockDataModels} />
            </BrowserRouter>
        );
        
        const logo = screen.getByAltText("logo");
        expect(logo).toBeInTheDocument();
    });

    it('отображает поле поиска', () => {
        render(
            <BrowserRouter>
                <Sidebar dataApps={mockDataApps} dataModels={mockDataModels} />
            </BrowserRouter>
        );
        
        const searchInput = screen.getByPlaceholderText('Поиск...');
        expect(searchInput).toBeInTheDocument();
        expect(searchInput).toHaveClass('bg-black', 'text-white', 'input-placeholder', 'w-full', 'h-full', 'rounded-md', 'pl-10');
    });

    it('отображает список приложений и их моделей', () => {
        render(
            <BrowserRouter>
                <Sidebar dataApps={mockDataApps} dataModels={mockDataModels} />
            </BrowserRouter>
        );
        
        expect(screen.getByText('Статьи')).toBeInTheDocument();
        expect(screen.getByText('Облигации')).toBeInTheDocument();
        expect(screen.getByText('Добавить article')).toBeInTheDocument();
        expect(screen.getByText('Добавить category')).toBeInTheDocument();
        expect(screen.getByText('Добавить bond')).toBeInTheDocument();
        expect(screen.getByText('Добавить type')).toBeInTheDocument();
    });

    it('отображает кнопки помощи и настроек', () => {
        render(
            <BrowserRouter>
                <Sidebar dataApps={mockDataApps} dataModels={mockDataModels} />
            </BrowserRouter>
        );
        
        expect(screen.getByText('Помощь')).toBeInTheDocument();
        expect(screen.getByText('Настройка')).toBeInTheDocument();
    });

    it('показывает модальное окно помощи при клике', () => {
        render(
            <BrowserRouter>
                <Sidebar dataApps={mockDataApps} dataModels={mockDataModels} />
            </BrowserRouter>
        );
        
        const helpButton = screen.getByText('Помощь');
        fireEvent.click(helpButton);
        
        expect(Swal.fire).toHaveBeenCalledWith({
            title: 'Помощь',
            text: 'Закрой окно, все вопросы к разработчику!',
            icon: 'question',
            confirmButtonText: 'ОК'
        });
    });

    it('показывает модальное окно настроек при клике', () => {
        render(
            <BrowserRouter>
                <Sidebar dataApps={mockDataApps} dataModels={mockDataModels} />
            </BrowserRouter>
        );
        
        const settingsButton = screen.getByText('Настройка');
        fireEvent.click(settingsButton);
        
        expect(Swal.fire).toHaveBeenCalledWith({
            title: 'Помощь',
            text: 'Закрой окно, все вопросы к разработчику!',
            icon: 'question',
            confirmButtonText: 'ОК',
        });
    });

    it('отображает "Нет моделей" если нет моделей для приложения', () => {
        const dataAppsWithNoModels = [
            {
                name: 'empty',
                verbose_name: 'Пустое'
            }
        ];
        const dataModelsEmpty = { 'empty': [] };

        render(
            <BrowserRouter>
                <Sidebar dataApps={dataAppsWithNoModels} dataModels={dataModelsEmpty} />
            </BrowserRouter>
        );
        
        expect(screen.getByText('Пустое')).toBeInTheDocument();
    });
});


