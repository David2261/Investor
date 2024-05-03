import {expect, test} from '@jest/globals';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
// Work file
import Sidebar from '../../../components/Blog/Sidebar';



describe('Sidebar container', () => {
	let container: any = null;

	beforeEach(() => {
		container = document.createElement("div");
		document.body.appendChild(container);    
	});

	afterEach(() => {
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	});

	test('Found img in document Sidebar', () => {
		act(() => {
			render(<Sidebar data={[]} />, container);
		});
		expect(container.querySelector('h1'));
	});
});