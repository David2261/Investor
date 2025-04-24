import formatDate from '@/components/Admin/HomeAdmin/FormatDate';
import {expect, describe, jest, it} from '@jest/globals';

describe('Утилита formatDate', () => {
    it('форматирует дату в правильном формате', () => {
        const date = '2024-03-20T12:30:45Z';
        const formattedDate = formatDate({ date });
        
        // В русской локали это будет выглядеть как "20 марта 2024 г., 12:30:45"
        expect(formattedDate).toMatch("20 марта 2024 г. в 15:30:45");
    });

    it('корректно обрабатывает полночь', () => {
        const date = '2024-03-20T00:00:00Z';
        const formattedDate = formatDate({ date });
        
        expect(formattedDate).toMatch("20 марта 2024 г. в 03:00:00");
    });

    it('корректно обрабатывает конец дня', () => {
        const date = '2024-03-20T23:59:59Z';
        const formattedDate = formatDate({ date });
        
        expect(formattedDate).toMatch("21 марта 2024 г. в 02:59:59");
    });

    it('корректно обрабатывает переход через месяц', () => {
        const date = '2024-03-31T12:30:45Z';
        const formattedDate = formatDate({ date });
        
        expect(formattedDate).toMatch("31 марта 2024 г. в 15:30:45");
    });

    it('корректно обрабатывает переход через год', () => {
        const date = '2024-12-31T12:30:45Z';
        const formattedDate = formatDate({ date });
        
        expect(formattedDate).toMatch("31 декабря 2024 г. в 15:30:45");
    });

    it('использует русскую локаль для форматирования', () => {
        const date = '2024-03-20T12:30:45Z';
        const formattedDate = formatDate({ date });
        
        // Проверяем, что месяц на русском языке
        expect(formattedDate).toContain('марта');
    });

    it('включает все компоненты даты и времени', () => {
        const date = '2024-03-20T12:30:45Z';
        const formattedDate = formatDate({ date });
        
        // Проверяем наличие всех компонентов
        expect(formattedDate).toMatch("20 марта 2024 г. в 15:30:45");
    });

    it('корректно обрабатывает однозначные числа в дате', () => {
        const date = '2024-03-05T09:05:08Z';
        const formattedDate = formatDate({ date });
        
        expect(formattedDate).toMatch("5 марта 2024 г. в 12:05:08");
    });
});


