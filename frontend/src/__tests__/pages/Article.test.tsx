import {expect, test} from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
// Work file
import Article from '../../pages/posts/Article';


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

	it('renders an image', async () => {
		const container = document.createElement('div');
	
	await act(async () => {
		render(<Article />, { container });
		});
	
		expect(container.querySelector('img')).not.toBeNull();
	});

	test('Found logo img in document Article', () => {
		act(() => {
			render(<Article />);
		});
		expect(screen.getByRole('img', {name: 'logo'}));
	});

});
