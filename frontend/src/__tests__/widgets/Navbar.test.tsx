import renderer from 'react-test-renderer';
import Navbar from '../../widgets/Navbar';


it("Changes the Modal Window when click", () => {
	const {component} = render.(<Navbar />);
	const signup = screen.getByTestId('signup');
	const login = screen.getByTestId('login');
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
	renderer.act(() => {
		tree.props.
	})
})
