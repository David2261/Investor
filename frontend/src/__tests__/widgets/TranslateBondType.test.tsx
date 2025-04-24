import TranslateBondType from '@/widgets/TranslateBondType.tsx';

describe('Компонент TranslateBondType', () => {
    it('корректно переводит муниципальные облигации', () => {
        const result = TranslateBondType('municipal bonds');
        expect(result).toBe('Муниципальные облигации');
    });

    it('корректно переводит корпоративные облигации', () => {
        const result = TranslateBondType('corporate bonds');
        expect(result).toBe('Корпоративные облигации');
    });

    it('корректно переводит облигации федерального займа', () => {
        const result = TranslateBondType('federal loan bonds');
        expect(result).toBe('Облигации федерального займа');
    });

    it('возвращает исходное значение для неизвестного типа', () => {
        const result = TranslateBondType('unknown type');
        expect(result).toBe('unknown type');
    });

    it('корректно обрабатывает регистр', () => {
        const result = TranslateBondType('MUNICIPAL BONDS');
        expect(result).toBe('Муниципальные облигации');
    });

    it('корректно обрабатывает пробелы', () => {
        const result = TranslateBondType('  municipal bonds  ');
        expect(result).toBe('Муниципальные облигации');
    });
});
