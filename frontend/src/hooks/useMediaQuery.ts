import { useState, useEffect } from "react";

const useMediaQuery = (query: string): boolean => {
	// Example for using: useMediaQuery("(min-width: 1060px)") => true/false 
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const media = window.matchMedia(query);
		if (media.matches !== matches) {
			setMatches(media.matches);
		}
		const listener = () => setMatches(media.matches);
		window.addEventListener("resize", listener);
		return () => window.removeEventListener("resize", listener);
	}, [matches, query]);
	return matches;
};

export default useMediaQuery;