import { render, screen } from '@testing-library/react';
import Navbar from '../../widgets/Navbar';

it("Changes the Modal Window when clicked", () => {
	render(<Navbar />);

	const signupButton = screen.getByTestId('signup');
	const loginButton = screen.getByTestId('login');

	let tree = screen.container;
	expect(tree).toMatchSnapshot();

	signupButton.click();
	
	tree = screen.container;
	expect(tree).toMatchSnapshot();

	loginButton.click();
	
	tree = screen.container;
	expect(tree).toMatchSnapshot();
});
