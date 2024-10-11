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

    // Initial state
    expect(result.current).toBe(false);

    // Simulate media query change
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true,
    }));

    rerender();

    // Expect matches to be updated
    expect(result.current).toBe(true);
  });

  it('adds and removes event listener', () => {
    const query = '(min-width: 1000px)';
    const { result, unmount } = renderHook(() => useMediaQuery(query));

    // Expect event listener to be added
    expect(window.addEventListener).toHaveBeenCalledTimes(1);

    unmount();

    // Expect event listener to be removed
    expect(window.removeEventListener).toHaveBeenCalledTimes(1);
  });
});