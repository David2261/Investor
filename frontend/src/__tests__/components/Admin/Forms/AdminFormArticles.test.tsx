import React from 'react';
import {expect, describe, jest, it, beforeEach} from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import AdminFormArticles from '@/components/Admin/Forms/AdminFormArticles';
import AuthContext from '@/entities/context/AuthContext';
import { useAllCategories } from '@/api/useAllCategories';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock useAllCategories hook
jest.mock('@/api/useAllCategories');
const mockedUseAllCategories = useAllCategories as jest.MockedFunction<typeof useAllCategories>;

// Mock Description component
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

describe('AdminFormArticles Component', () => {
    const mockAuthTokens = {
        access: 'mock-access-token',
        refresh: 'mock-refresh-token',
    };

    const mockCategories = [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
    ];

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
        
        // Mock useAllCategories hook
        mockedUseAllCategories.mockReturnValue({
            data: mockCategories,
            error: null,
            dataCount: mockCategories.length,
        });
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
                <AdminFormArticles />
            </AuthContext.Provider>
        );
    };

    it('renders all form fields correctly', () => {
        renderComponent();

        // Check if all form fields are present
        expect(screen.getByLabelText('Заголовок статьи:')).toBeInTheDocument();
        expect(screen.getByLabelText('Текст статьи:')).toBeInTheDocument();
        expect(screen.getByLabelText('Категории:')).toBeInTheDocument();
        expect(screen.getByLabelText('Изображение:')).toBeInTheDocument();
        expect(screen.getByLabelText('Статус публикации:')).toBeInTheDocument();
    });

    it('handles form input changes correctly', () => {
        renderComponent();

        // Test title input
        const titleInput = screen.getByLabelText('Заголовок статьи:');
        fireEvent.change(titleInput, { target: { value: 'Test Article' } });
        expect(titleInput).toHaveValue('Test Article');

        // Test description input
        const descriptionInput = screen.getByTestId('description-textarea');
        fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
        expect(descriptionInput).toHaveValue('Test Description');

        // Test category selection
        const categorySelect = screen.getByLabelText('Категории:');
        fireEvent.change(categorySelect, { target: { value: '1' } });
        expect(categorySelect).toHaveValue('1');

        // Test publication status toggle
        const publicationCheckbox = screen.getByLabelText('Статус публикации:');
        fireEvent.click(publicationCheckbox);
        expect(publicationCheckbox).toBeChecked();
    });

    it('handles file upload correctly', () => {
        renderComponent();

        const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
        const fileInput = screen.getByLabelText('Изображение:') as HTMLInputElement;
        
        fireEvent.change(fileInput, { target: { files: [file] } });
        expect(fileInput.files?.[0]).toBe(file);
    });

    it('submits form data correctly', async () => {
        renderComponent();

        // Fill in form data
        fireEvent.change(screen.getByLabelText('Заголовок статьи:'), {
            target: { value: 'Test Article' },
        });
        fireEvent.change(screen.getByTestId('description-textarea'), {
            target: { value: 'Test Description' },
        });
        fireEvent.change(screen.getByLabelText('Категории:'), {
            target: { value: '1' },
        });

        // Mock successful API response
        mockedAxios.post.mockResolvedValueOnce({ data: {} });

        // Submit form
        fireEvent.submit(screen.getByRole('form'));

        // Verify API call
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

    it('handles API errors correctly', async () => {
        renderComponent();

        // Fill in form data
        fireEvent.change(screen.getByLabelText('Заголовок статьи:'), {
            target: { value: 'Test Article' },
        });
        fireEvent.change(screen.getByTestId('description-textarea'), {
            target: { value: 'Test Description' },
        });
        fireEvent.change(screen.getByLabelText('Категории:'), {
            target: { value: '1' },
        });

        // Mock API error
        mockedAxios.post.mockRejectedValueOnce({
            response: { data: { error: 'Test error' } },
        });

        // Mock window.alert
        const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

        // Submit form
        fireEvent.submit(screen.getByRole('form'));

        // Verify error handling
        await waitFor(() => {
            expect(mockAlert).toHaveBeenCalledWith('Произошла ошибка при создании статьи.');
        });

        mockAlert.mockRestore();
    });

    it('displays error when categories fail to load', () => {
        // Mock error in useAllCategories
        mockedUseAllCategories.mockReturnValue({
            data: [],
            error: new Error('Failed to load categories'),
            dataCount: 0,
        });

        renderComponent();
        expect(screen.getByText(/Error: Failed to load categories/i)).toBeInTheDocument();
    });
});


