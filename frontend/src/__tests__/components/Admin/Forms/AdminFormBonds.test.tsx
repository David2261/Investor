import React from 'react';
import {expect, describe, jest, it} from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import AdminFormBonds from '@/components/Admin/Forms/AdminFormBonds';
import AuthContext from '@/entities/context/AuthContext';

// Мокаем axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Мокаем компонент Description
jest.mock('./Description', () => ({
    __esModule: true,
    default: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
        <textarea
            data-testid="description-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    ),
}));

describe('Компонент AdminFormBonds', () => {
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
                <AdminFormBonds />
            </AuthContext.Provider>
        );
    };

    it('корректно отображает все поля формы', () => {
        renderComponent();

        // Проверяем наличие всех полей формы
        expect(screen.getByLabelText('Заголовок облигации:')).toBeInTheDocument();
        expect(screen.getByLabelText('Текст облигации:')).toBeInTheDocument();
        expect(screen.getByLabelText('Категории:')).toBeInTheDocument();
        expect(screen.getByLabelText('Цена облигаций:')).toBeInTheDocument();
        expect(screen.getByLabelText('Публикация:')).toBeInTheDocument();
        expect(screen.getByLabelText('Дюрация облигаций:')).toBeInTheDocument();
        expect(screen.getByLabelText('Купонный доход:')).toBeInTheDocument();
        expect(screen.getByLabelText('Купонный доход в %:')).toBeInTheDocument();
    });

    it('корректно обрабатывает изменения в полях формы', () => {
        renderComponent();

        // Тестируем поле заголовка
        const titleInput = screen.getByLabelText('Заголовок облигации:');
        fireEvent.change(titleInput, { target: { value: 'Тестовая облигация' } });
        expect(titleInput).toHaveValue('Тестовая облигация');

        // Тестируем поле описания
        const descriptionInput = screen.getByTestId('description-textarea');
        fireEvent.change(descriptionInput, { target: { value: 'Тестовое описание' } });
        expect(descriptionInput).toHaveValue('Тестовое описание');

        // Тестируем выбор категории
        const categorySelect = screen.getByLabelText('Категории:');
        fireEvent.change(categorySelect, { target: { value: 'Municipal bonds' } });
        expect(categorySelect).toHaveValue('Municipal bonds');

        // Тестируем поле цены
        const priceInput = screen.getByLabelText('Цена облигаций:');
        fireEvent.change(priceInput, { target: { value: '1000' } });
        expect(priceInput).toHaveValue(1000);

        // Тестируем переключатель публикации
        const publicationSwitch = screen.getByLabelText('Публикация:');
        fireEvent.click(publicationSwitch);
        expect(publicationSwitch).toBeChecked();
    });

    it('корректно обрабатывает дату и время дюрации', () => {
        renderComponent();

        const dateInput = screen.getByLabelText('Дюрация облигаций:');
        const timeInput = screen.getByLabelText('Дюрация облигаций:').nextSibling as HTMLInputElement;

        fireEvent.change(dateInput, { target: { value: '2024-12-31' } });
        fireEvent.change(timeInput, { target: { value: '12:00' } });

        expect(dateInput).toHaveValue('2024-12-31');
        expect(timeInput).toHaveValue('12:00');
    });

    it('корректно обрабатывает купонный доход', () => {
        renderComponent();

        const couponInput = screen.getByLabelText('Купонный доход:');
        const couponPercentInput = screen.getByLabelText('Купонный доход в %:');

        fireEvent.change(couponInput, { target: { value: '100' } });
        fireEvent.change(couponPercentInput, { target: { value: '5' } });

        expect(couponInput).toHaveValue(100);
        expect(couponPercentInput).toHaveValue(5);
    });

    it('корректно отправляет данные формы', async () => {
        renderComponent();

        // Заполняем форму тестовыми данными
        fireEvent.change(screen.getByLabelText('Заголовок облигации:'), {
            target: { value: 'Тестовая облигация' },
        });
        fireEvent.change(screen.getByTestId('description-textarea'), {
            target: { value: 'Тестовое описание' },
        });
        fireEvent.change(screen.getByLabelText('Категории:'), {
            target: { value: 'Municipal bonds' },
        });
        fireEvent.change(screen.getByLabelText('Цена облигаций:'), {
            target: { value: '1000' },
        });
        fireEvent.change(screen.getByLabelText('Дюрация облигаций:'), {
            target: { value: '2024-12-31' },
        });
        fireEvent.change(screen.getByLabelText('Дюрация облигаций:').nextSibling as HTMLInputElement, {
            target: { value: '12:00' },
        });
        fireEvent.change(screen.getByLabelText('Купонный доход:'), {
            target: { value: '100' },
        });
        fireEvent.change(screen.getByLabelText('Купонный доход в %:'), {
            target: { value: '5' },
        });

        // Мокаем успешный ответ API
        mockedAxios.post.mockResolvedValueOnce({ data: {} });

        // Отправляем форму
        fireEvent.submit(screen.getByRole('form'));

        // Проверяем вызов API
        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith(
                expect.stringContaining('/api/admin/apps/main/articles/create/'),
                expect.any(FormData),
                expect.objectContaining({
                    headers: {
                        Authorization: `Bearer ${mockAuthTokens.access}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
            );
        });
    });

    it('корректно обрабатывает ошибки API', async () => {
        renderComponent();

        // Заполняем форму тестовыми данными
        fireEvent.change(screen.getByLabelText('Заголовок облигации:'), {
            target: { value: 'Тестовая облигация' },
        });

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
            expect(mockAlert).toHaveBeenCalledWith('Произошла ошибка при создании статьи.');
        });

        mockAlert.mockRestore();
    });
});


