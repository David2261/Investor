import React from 'react';
import {expect, describe, jest, it} from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Sidebar from '../../../../components/Admin/HomeAdmin/Sidebar';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
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
        
        const logo = screen.getByRole('img', { name: /logo/i });
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', 'IH.webp');
        expect(logo).toHaveClass('w-[214px]', 'h-[49px]');
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

    it('подсвечивает активную ссылку', () => {
        render(
            <MemoryRouter initialEntries={['/admin/main/article']}>
                <Sidebar dataApps={mockDataApps} dataModels={mockDataModels} />
            </MemoryRouter>
        );
        
        const activeLink = screen.getByText('Добавить article').closest('li');
        expect(activeLink).toHaveClass('bg-black', 'text-white', 'rounded', 'px-2', 'py-2');
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
        
        expect(require('sweetalert2').fire).toHaveBeenCalledWith({
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
        
        expect(require('sweetalert2').fire).toHaveBeenCalledWith({
            title: 'Настройка',
            text: 'Сейчас находиться в разработке!',
            icon: 'info',
            confirmButtonText: 'ОК'
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
        
        expect(screen.getByText('Нет моделей')).toBeInTheDocument();
    });
});


