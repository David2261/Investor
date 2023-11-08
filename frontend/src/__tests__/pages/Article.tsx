import {expect, jest, test} from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Article from '../../pages/posts/Article';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';


describe('Article page', () => {
    let container:any = null;

	beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);    
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

	test('Found img in document Article', () => {
        act(() => {
            render(<Article />, container);
        });
		expect(container.querySelector('img'));
	});

    test('Found logo img in document Article', () => {
        act(() => {
            render(<Article />);
        });
		expect(screen.getByRole('img', {name: 'logo'}));
	});

});
