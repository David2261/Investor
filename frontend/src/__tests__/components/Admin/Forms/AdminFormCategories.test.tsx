import React from 'react';
import {expect, describe, jest, it, beforeEach} from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import AdminFormCategories from '@/components/Admin/Forms/AdminFormCategories';
import AuthContext from '@/entities/context/AuthContext';

// Мокаем axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Компонент AdminFormCategories', () => {
    const mockAuthTokens = {
        access: 'mock-access-token',
        refresh: 'mock-refresh-token',
    };

    beforeEach(() => {
        // Сбрасываем все моки перед каждым тестом
        jest.clearAllMocks();
    });

    const renderComponent = () => {
        return render(
            <AuthContext.Provider value={{ 
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
            }}>
                <AdminFormCategories />
            </AuthContext.Provider>
        );
    };

    it('корректно отображает форму создания категории', () => {
        renderComponent();

        // Проверяем наличие всех элементов формы
        expect(screen.getByLabelText('Категория:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Сохранить' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Сохранить и добавить другой объект' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Сохранить и продолжить редактирование' })).toBeInTheDocument();
    });

    it('корректно обрабатывает ввод названия категории', () => {
        renderComponent();

        const categoryInput = screen.getByLabelText('Категория:');
        fireEvent.change(categoryInput, { target: { value: 'Тестовая категория' } });
        expect(categoryInput).toHaveValue('Тестовая категория');
    });

    it('корректно отправляет данные формы', async () => {
        renderComponent();

        // Вводим название категории
        const categoryInput = screen.getByLabelText('Категория:');
        fireEvent.change(categoryInput, { target: { value: 'Тестовая категория' } });

        // Мокаем успешный ответ API
        mockedAxios.post.mockResolvedValueOnce({ data: {} });

        // Мокаем window.alert
        const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

        // Отправляем форму
        fireEvent.submit(screen.getByRole('form'));

        // Проверяем вызов API
        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith(
                expect.stringContaining('/api/admin/apps/main/categories/create/'),
                { name: 'Тестовая категория' },
                expect.objectContaining({
                    headers: {
                        Authorization: `Bearer ${mockAuthTokens.access}`,
                        'Content-Type': 'application/json',
                    },
                })
            );
        });

        // Проверяем сообщение об успехе
        expect(mockAlert).toHaveBeenCalledWith('Категория успешно создана!');

        // Проверяем очистку формы
        expect(categoryInput).toHaveValue('');

        mockAlert.mockRestore();
    });

    it('корректно обрабатывает ошибки при отправке формы', async () => {
        renderComponent();

        // Вводим название категории
        const categoryInput = screen.getByLabelText('Категория:');
        fireEvent.change(categoryInput, { target: { value: 'Тестовая категория' } });

        // Мокаем ошибку API
        mockedAxios.post.mockRejectedValueOnce({
            response: { data: { error: 'Тестовая ошибка' } },
        });

        // Мокаем window.alert
        const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

        // Отправляем форму
        fireEvent.submit(screen.getByRole('form'));

        // Проверяем обработку ошибки
        await waitFor(() => {
            expect(mockAlert).toHaveBeenCalledWith('Произошла ошибка при создании категории.');
        });

        mockAlert.mockRestore();
    });

    it('корректно обрабатывает кнопку "Сохранить и добавить другой объект"', () => {
        renderComponent();

        // Вводим название категории
        const categoryInput = screen.getByLabelText('Категория:');
        fireEvent.change(categoryInput, { target: { value: 'Тестовая категория' } });

        // Мокаем window.alert
        const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

        // Нажимаем кнопку
        fireEvent.click(screen.getByRole('button', { name: 'Сохранить и добавить другой объект' }));

        // Проверяем сообщение
        expect(mockAlert).toHaveBeenCalledWith('Сохранено! Добавьте другой объект.');

        // Проверяем очистку формы
        expect(categoryInput).toHaveValue('');

        mockAlert.mockRestore();
    });

    it('корректно обрабатывает кнопку "Сохранить и продолжить редактирование"', () => {
        renderComponent();

        // Вводим название категории
        const categoryInput = screen.getByLabelText('Категория:');
        fireEvent.change(categoryInput, { target: { value: 'Тестовая категория' } });

        // Мокаем window.alert
        const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

        // Нажимаем кнопку
        fireEvent.click(screen.getByRole('button', { name: 'Сохранить и продолжить редактирование' }));

        // Проверяем сообщение
        expect(mockAlert).toHaveBeenCalledWith('Сохранено! Продолжайте редактирование.');

        // Проверяем, что значение в форме не изменилось
        expect(categoryInput).toHaveValue('Тестовая категория');

        mockAlert.mockRestore();
    });
});
