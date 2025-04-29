import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import UnderConstruction from '@/components/Admin/HomeAdmin/UnderPage';

describe('Компонент UnderConstruction', () => {
    it('отображает изображение', () => {
        render(<UnderConstruction />);
        
        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument();
    });

    it('отображает заголовок предупреждения', () => {
        render(<UnderConstruction />);
        
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toHaveTextContent('Внимание!');
    });

    it('отображает текст о разработке', () => {
        render(<UnderConstruction />);
        
        expect(screen.getByText('Эта страница находится в процессе разработки.')).toBeInTheDocument();
    });

    it('отображает дополнительное сообщение', () => {
        render(<UnderConstruction />);
        
        expect(screen.getByText('Мы работаем над этим!')).toBeInTheDocument();
    });
});


