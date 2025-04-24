import {expect, describe, it} from '@jest/globals';
import {
    maturityOptions,
    publishedOptions,
    couponOptions,
    categoryOptions,
    dateOptions,
    statusOptions,
    statusStaff,
    statusUserActive
} from '@/entities/constants/options.ts';

describe('Options Constants', () => {
    describe('Bonds Options', () => {
        it('should have correct maturity options', () => {
            expect(maturityOptions).toEqual([
                { value: '', label: 'Все дни' },
                { value: 'Сегодня', label: 'Сегодня' },
                { value: 'Эта неделя', label: 'Эта неделя' },
                { value: 'Этот месяц', label: 'Этот месяц' },
                { value: 'Этот год', label: 'Этот год' },
            ]);
        });

        it('should have correct published options', () => {
            expect(publishedOptions).toEqual([
                { value: '', label: 'Все облигации' },
                { value: 'Опубликован', label: 'Опубликован' },
                { value: 'Не Опубликован', label: 'Не Опубликован' },
            ]);
        });

        it('should have correct coupon options', () => {
            expect(couponOptions).toEqual([
                { value: '', label: 'Все купоны' },
                { value: 'Менее 5%', label: 'Менее 5%' },
                { value: '5%-10%', label: '5%-10%' },
                { value: 'Более 10%', label: 'Более 10%' },
            ]);
        });

        it('should have correct category options', () => {
            expect(categoryOptions).toEqual([
                { value: '', label: 'Все категории' },
                { value: 'Corporate bonds', label: 'Корпоративные облигации' },
                { value: 'municipal bonds', label: 'Муниципальные облигации' },
                { value: 'federal loan bonds', label: 'ОФЗ' },
            ]);
        });
    });

    describe('Articles Options', () => {
        it('should have correct date options', () => {
            expect(dateOptions).toEqual([
                { value: '', label: 'Все даты' },
                { value: 'today', label: 'Сегодня' },
                { value: 'last7days', label: 'За последние 7 дней' },
                { value: 'lastMonth', label: 'За месяц назад' },
                { value: 'lastYear', label: 'За 1 год назад' },
            ]);
        });

        it('should have correct status options', () => {
            expect(statusOptions).toEqual([
                { value: '', label: 'Все статусы' },
                { value: 'Опубликован', label: 'Опубликован' },
                { value: 'Не Опубликован', label: 'Не Опубликован' },
            ]);
        });
    });

    describe('Users Options', () => {
        it('should have correct staff status options', () => {
            expect(statusStaff).toEqual([
                { value: '', label: 'Все сотрудники' },
                { value: 'yes', label: 'Сотрудник' },
                { value: 'no', label: 'Не сотрудник' },
            ]);
        });

        it('should have correct user active status options', () => {
            expect(statusUserActive).toEqual([
                { value: '', label: 'Все разрешения' },
                { value: 'active', label: 'Активен' },
                { value: 'blocked', label: 'Заблокирован' },
            ]);
        });
    });
});
