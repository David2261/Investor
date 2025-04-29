import { expect, describe, it, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import type { Mocked, MockedFunction } from 'vitest';
import axios from 'axios';
import AdminFormArticles from '@/components/Admin/Forms/AdminFormArticles';
import AuthContext from '@/entities/context/AuthContext';
import { useAllCategories } from '@/api/useAllCategories';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;

// Mock useAllCategories hook
vi.mock('@/api/useAllCategories');
const mockedUseAllCategories = useAllCategories as MockedFunction<typeof useAllCategories>;

// Mock Description component
vi.mock('./Description', () => ({
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
        vi.clearAllMocks();
        
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
        expect(screen.getByLabelText('Изображение:')).toBeInTheDocument();
        expect(screen.getByLabelText('Статус публикации:')).toBeInTheDocument();
    });

    it('handles form input changes correctly', () => {
        renderComponent();

        // Test title input
        const titleInput = screen.getByLabelText('Заголовок статьи:');
        fireEvent.change(titleInput, { target: { value: 'Test Article' } });
        expect(titleInput).toHaveValue('Test Article');

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


