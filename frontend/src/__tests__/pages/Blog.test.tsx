import {expect, test} from '@jest/globals';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Blog from '../../pages/posts/Blog';


describe('Blog page', () => {
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

	test('Found img in document Blog', () => {
		act(() => {
			render(<Blog />, container);
		});
		expect(container.querySelector('h1'));
	});

	test('Found sidebar in Blog', () => {
		act(() => {
			render(<Blog />, container);
		});
		expect(container.getByRole('div', {name: 'sidebar'}));
	});

	test('Found posts list in Blog', () => {
		act(() => {
			render(<Blog />, container);
		});
		expect(container.getByRole('div', {name: 'posts-list'}));
	});

});
