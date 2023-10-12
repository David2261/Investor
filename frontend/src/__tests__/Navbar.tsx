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
import '@testing-library/jest-dom';
import {describe, expect, test} from '@jest/globals';
import Navbar from '../components/Navbar.tsx';

// function get

describe('Navbar components', () => {
	beforeEach(() => { render(<Navbar />) })
		test('Output link to main page', () => {
			const linkToMainPage = screen.getByRole('div', {name: "Navbar logo" })
			expect(linkToMainPage).toBeVisible()
			expect(linkToMainPage).toHaveAttribute('href', '/')
		})
	// it('Navbar renders', () => {
	// 	render(<List />);
	// });
});
