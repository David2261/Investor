import React from 'react';
import { expect, describe, it, beforeEach, vi } from 'vitest';
import type { Mocked } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AdminFormCategories from '@/components/Admin/Forms/AdminFormCategories';
import AuthContext from '@/entities/context/AuthContext';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;

describe('Компонент AdminFormCategories', () => {
    const mockAuthTokens = {
        access: 'mock-access-token',
        refresh: 'mock-refresh-token',
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderComponent = () => {
        return render(
        <AuthContext.Provider
            value={{
            authTokens: mockAuthTokens,
            user: null,
            setUser: () => {},
            loginUser: async () => {},
            registrationUser: async () => {},
            logoutUser: () => {},
            login: () => {},
            logout: () => {},
            resetPassword: async () => {},
            loading: false,
            }}
        >
            <AdminFormCategories />
        </AuthContext.Provider>
        );
    };

    it('корректно отображает форму создания категории', () => {
        renderComponent();

        expect(screen.getByText('Категория:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Сохранить' })).toBeInTheDocument();
        expect(
        screen.getByRole('button', { name: 'Сохранить и добавить другой объект' })
        ).toBeInTheDocument();
        expect(
        screen.getByRole('button', { name: 'Сохранить и продолжить редактирование' })
        ).toBeInTheDocument();
    });

    it('корректно обрабатывает ввод названия категории', () => {
        renderComponent();

        const categoryInput = screen.getByPlaceholderText('Название статьи');
        fireEvent.change(categoryInput, { target: { value: 'Тестовая категория' } });
        expect(categoryInput).toHaveValue('Тестовая категория');
    });

    it('корректно обрабатывает кнопку "Сохранить и добавить другой объект"', async () => {
        renderComponent();

        const categoryInput = screen.getByPlaceholderText('Название статьи');
        fireEvent.change(categoryInput, { target: { value: 'Тестовая категория' } });

        mockedAxios.post.mockResolvedValueOnce({ data: {} });
        const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {});

        fireEvent.click(screen.getByRole('button', { name: 'Сохранить и добавить другой объект' }));

        expect(mockAlert).toHaveBeenCalledWith('Сохранено! Добавьте другой объект.');
        expect(categoryInput).toHaveValue('');

        mockAlert.mockRestore();
    });

    it('корректно обрабатывает кнопку "Сохранить и продолжить редактирование"', async () => {
        renderComponent();

        const categoryInput = screen.getByPlaceholderText('Название статьи');
        fireEvent.change(categoryInput, { target: { value: 'Тестовая категория' } });

        mockedAxios.post.mockResolvedValueOnce({ data: {} });
        const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {});

        fireEvent.click(
        screen.getByRole('button', { name: 'Сохранить и продолжить редактирование' })
        );

        expect(mockAlert).toHaveBeenCalledWith('Сохранено! Продолжайте редактирование.');
        expect(categoryInput).toHaveValue('Тестовая категория');

        mockAlert.mockRestore();
    });
});