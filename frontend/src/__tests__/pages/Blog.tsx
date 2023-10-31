import {expect, jest, test} from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Blog from '../../pages/posts/Blog';


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
            render(<Blog />, container);
        });
		expect(container.querySelector('h1'));
	});

});
