import React from 'react';
import {expect, describe, jest, it, beforeEach, afterEach} from '@jest/globals';
import { render, screen, act } from '@testing-library/react';
import DailyDate from '../../../../components/Admin/HomeAdmin/DailyDate';

describe('Компонент DailyDate', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('отображает текущую дату в правильном формате', () => {
        const mockDate = new Date('2024-03-20T12:00:00Z');
        jest.setSystemTime(mockDate);

        render(<DailyDate />);
        
        // В русской локали это будет выглядеть как "среда, 20 марта 2024 г."
        expect(screen.getByText(/среда, 20 марта 2024 г./i)).toBeInTheDocument();
    });

    it('обновляет дату каждые 24 часа', () => {
        const initialDate = new Date('2024-03-20T12:00:00Z');
        jest.setSystemTime(initialDate);

        render(<DailyDate />);
        
        expect(screen.getByText(/среда, 20 марта 2024 г./i)).toBeInTheDocument();

        // Перематываем время на 24 часа вперед
        act(() => {
            jest.advanceTimersByTime(24 * 60 * 60 * 1000);
            jest.setSystemTime(new Date('2024-03-21T12:00:00Z'));
        });

        // Теперь должна отображаться новая дата
        expect(screen.getByText(/четверг, 21 марта 2024 г./i)).toBeInTheDocument();
    });

    it('очищает интервал при размонтировании', () => {
        const clearIntervalSpy = jest.spyOn(window, 'clearInterval');
        const { unmount } = render(<DailyDate />);
        
        unmount();
        
        expect(clearIntervalSpy).toHaveBeenCalled();
    });

    it('использует русскую локаль для форматирования', () => {
        const mockDate = new Date('2024-03-20T12:00:00Z');
        jest.setSystemTime(mockDate);

        render(<DailyDate />);
        
        const dateText = screen.getByText(/\w+, \d+ \w+ \d+ г\./i).textContent;
        expect(dateText).toMatch(/^[а-яА-Я]/); // Должно начинаться с русской буквы
    });

    it('корректно обрабатывает переход через месяц', () => {
        const initialDate = new Date('2024-03-31T12:00:00Z');
        jest.setSystemTime(initialDate);

        render(<DailyDate />);
        
        expect(screen.getByText(/воскресенье, 31 марта 2024 г./i)).toBeInTheDocument();

        // Перематываем время на 24 часа вперед
        act(() => {
            jest.advanceTimersByTime(24 * 60 * 60 * 1000);
            jest.setSystemTime(new Date('2024-04-01T12:00:00Z'));
        });

        // Должен отображаться новый месяц
        expect(screen.getByText(/понедельник, 1 апреля 2024 г./i)).toBeInTheDocument();
    });
});


