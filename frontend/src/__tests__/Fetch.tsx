import React, {useState, useEffect} from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

const server = setupServer(
	rest.get('/greet', (req, res, ctx) => {
		return res(ctx.json({text: 'Hi theare'}))
	}),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

type Props = {
	link: string;
};

function Fetch = ({ link }: Props) => {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);

	useEffect(() => {
		fetch(link)
			.then(res => res.json())
			.then(
				(result) => {
					setIsLoaded(true);
					setItems(result);
				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				})
	}, [])

	return error ? error : items;
}

test('Loads and displays home', async () => {
	render(<Navbar />)
	const handleClick = jest.fn()
	render(<Button onClick={handleClick}>Login</Button>)
	fireEvent.click(screen.getByText(/login/i))
	expect(handleClick).toHaveBeenCalledTimes(1)
})
