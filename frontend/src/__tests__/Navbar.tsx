import {
	// getByLabelText,
	// getByText,
	// getByTestId,
	// queryByTestId,
	// waitFor,
	render,
	screen,
	// within
} from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import {describe, expect, test} from '@jest/globals';
import Navbar from '../components/Navbar.tsx';


describe('Navbar component', () => {
	beforeEach(() => { render(<Navbar />) })
	test('Output link to main page', () => {
		const query = screen.getByRole('form');
		expect(query);
	});
});
