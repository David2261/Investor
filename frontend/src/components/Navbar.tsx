import { useState } from 'react';
import { NavLink, Link } from "react-router-dom";
// Components
import HeadLink from './Link.tsx';
// Hooks
import useMediaQuery from "/src/hooks/useMediaQuery";
// Assets
import IH from '/src/assets/logo/IH.webp';
import '/src/styles/Navbar.css';


type Props = {};


const Navbar = (props: Props) => {
	const styleNav = "uppercase p-2 lg:px-4 md:mx-2 rounded transation-colors duration-300";
	const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
	const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);


	return <nav className="bg-white py-2 md:py-4 w-full">
			<div className="ml-4 flex px-4 mx-auto md:flex md:items-center w-full">
				<div className="flex justify-between items-center w-32 md:w-44">
					{/* LEFT SIDE */}
					<Link to="/"><img alt="logo" src={IH} /></Link>
				</div>
				{/* RIGHT SIDE */}
				{isAboveMediumScreens ? (
					<div className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
						<HeadLink page="home" />
						<HeadLink page="blog" />
						<HeadLink page="community" />
						<HeadLink page="contact" />
						<NavLink to="login/" className={`${styleNav} text-indigo-600 text-center border border-transparent hover:bg-indigo-100 hover:text-indigo-700`}>Login</NavLink>
						<NavLink to="sign-up/" className={`${styleNav} text-indigo-600 text-center border border-solid hover:bg-indigo-600 solid hover:text-white mt-1 md:mt-0 md:ml-1`}>Sign In</NavLink>
					</div>
				) : (
					<button
						className={`${isMenuToggled ? 'hidden': ''} fixed right-0 mr-10 border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden`}
						id="navbar-toggle"
						onClick={() => setIsMenuToggled(!isMenuToggled)}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
						</svg>
					</button>
				)}
			</div>
			{/* MOBILE MENU MODAL */}
			{!isAboveMediumScreens && isMenuToggled && (
				<div className="fixed navbar-menu transition ease-out md:ease-in duration-500 right-0 bottom-0 z-40 h-full w-[300px] bg-primary-100 drop-shadow-xl">
					{/* CLOSE ICON */}
					<div className="flex justify-end p-12">
						<button onClick={() => setIsMenuToggled(!isMenuToggled)}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-400">
							  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
					{/* MENU ITEMS */}
					<div className="ml-[33%] flex flex-col gap-10 text-2xl">
					</div>
				</div>
          )}
		</nav>
};

export default Navbar;