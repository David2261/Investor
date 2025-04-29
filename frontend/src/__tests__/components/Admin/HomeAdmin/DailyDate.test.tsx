import React from 'react';
import {expect, describe, it, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import DailyDate from '../../../../components/Admin/HomeAdmin/DailyDate';

describe('Компонент DailyDate', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    it('отображает текущую дату в правильном формате', () => {
        const mockDate = new Date('2024-03-20T12:00:00Z');
        vi.setSystemTime(mockDate);
    
        render(<DailyDate />);
    
        expect(screen.getByText(/среда, 20 марта 2024 г./i)).toBeInTheDocument();
    });

    // it('обновляет дату каждые 24 часа', async () => {
    //     const initialDate = new Date('2024-03-20T12:00:00Z');
    //     vi.setSystemTime(initialDate);
    
    //     render(<DailyDate />);
    
    //     expect(screen.getByText(/среда, 20 марта 2024 г./i)).toBeInTheDocument();
    
    //     // Перематываем время на 24 часа
    //     act(() => {
    //       vi.advanceTimersByTime(24 * 60 * 60 * 1000);
    //       vi.setSystemTime(new Date('2024-03-21T12:00:00Z'));
    //     });
    
    //     await screen.findByText(/четверг, 21 марта 2024 г./i);
    //     expect(screen.getByText(/четверг, 21 марта 2024 г./i)).toBeInTheDocument();
    //   });

    it('очищает интервал при размонтировании', () => {
        const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
        const { unmount } = render(<DailyDate />);
    
        unmount();
    
        expect(clearIntervalSpy).toHaveBeenCalled();
      });

    //   it('корректно обрабатывает переход через месяц', async () => {
    //     const initialDate = new Date('2024-03-31T12:00:00Z');
    //     vi.setSystemTime(initialDate);
    
    //     const { unmount } = render(<DailyDate />);
    
    //     const expectedInitialDate = initialDate.toLocaleDateString('ru-RU', {
    //       weekday: 'long',
    //       year: 'numeric',
    //       month: 'long',
    //       day: 'numeric',
    //     });
    //     expect(screen.getByText(expectedInitialDate)).toBeInTheDocument();
    
    //     const nextDate = new Date('2024-04-01T12:00:00Z');
    //     act(() => {
    //       vi.setSystemTime(nextDate);
    //       vi.advanceTimersByTime(24 * 60 * 60 * 1000);
    //     });
    
    //     const expectedNextDate = nextDate.toLocaleDateString('ru-RU', {
    //       weekday: 'long',
    //       year: 'numeric',
    //       month: 'long',
    //       day: 'numeric',
    //     });
    //     screen.debug();
    //     await screen.findByText(expectedNextDate, { timeout: 5000 });
    //     expect(screen.getByText(expectedNextDate)).toBeInTheDocument();
    //     unmount();
    // }, 15000);
});
