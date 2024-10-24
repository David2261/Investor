/* eslint-disable @typescript-eslint/no-unused-vars */
import { renderHook } from '@testing-library/react-hooks';
import useMediaQuery from "../../hooks/useMediaQuery.ts";

describe('useMediaQuery', () => {
	it('returns false by default', () => {
		const { result } = renderHook(() => useMediaQuery('(min-width: 1000px)'));
		expect(result.current).toBe(false);
	});

	it('updates matches when media query changes', () => {
		const query = '(min-width: 1000px)';
		const { result, rerender } = renderHook(() => useMediaQuery(query));

		expect(result.current).toBe(false);

		window.matchMedia = jest.fn().mockImplementation(() => ({
			matches: true,
		}));

		rerender();

		expect(result.current).toBe(true);
	});

	it('adds and removes event listener', () => {
		const query = '(min-width: 1000px)';
		const { result, unmount } = renderHook(() => useMediaQuery(query));

		expect(window.addEventListener).toHaveBeenCalledTimes(1);

		unmount();

		expect(window.removeEventListener).toHaveBeenCalledTimes(1);
	});
});
