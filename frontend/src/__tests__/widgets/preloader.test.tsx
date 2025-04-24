import { expect, describe, it } from 'vitest';
import { render } from '@testing-library/react';
import Preloader from '@/widgets/preloader.tsx';

describe('Компонент Preloader', () => {
    it('отображает анимацию загрузки', async () => {
        render(<Preloader />);
        const spinner = document.getElementById('preloader');
        expect(spinner).toBeInTheDocument();
    });
});
