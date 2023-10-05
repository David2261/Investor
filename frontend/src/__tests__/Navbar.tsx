import {
	getByLabelText,
	getByText,
	getByTestId,
	queryByTestId,
	waitFor,
} from '@testing-library/dom';
import '@testing-library/jest-dom';
import Navbar from '/src/components/Navbar.tsx';

// function get

describe('Navbar components', () => {
	it('Navbar renders', () => {
		render(<List />);
	});
});
