import {expect, test} from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Contact from '../../pages/static/Contact';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';


describe('Contact page', () => {
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

	// test('Checking for style select Contact', () => {
    //     act(() => {
    //         render(<Contact />, container);
    //     });
    //     const text = screen.getByRole('p');
    //     userEvent.hover(text);
	// 	expect(container.text).toHaveStyle(`background-color: #85BB65;`);
	// });

    test('Checking text in title "Contact" in document Contact', () => {
        act(() => {
            render(<Contact />);
        });
		expect(screen.getByText(/контакт/));
	});

    test('Checking text in title "Support" in document Contact', () => {
        act(() => {
            render(<Contact />);
        });
		expect(screen.getByText(/Отправить чаевые/));
	});

    test('Checking text in title "Rewrite" in document Contact', () => {
        act(() => {
            render(<Contact />);
        });
		expect(screen.getByText(/Исправления истории/));
	});

    test('Checking text in title "Business development" in document Contact', () => {
        act(() => {
            render(<Contact />);
        });
		expect(screen.getByText(/Развитие бизнеса/));
	});

    test('Checking text in title "Job" in document Contact', () => {
        act(() => {
            render(<Contact />);
        });
		expect(screen.getByText(/Карьера в IH/));
	});

});

