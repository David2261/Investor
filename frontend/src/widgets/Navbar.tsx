import { useContext, useState } from 'react';
import { Link } from "react-router-dom";
// Components
import HeadLink from './Link.tsx';
import MenuLink from './MenuLink.tsx';
import SignUp from '../components/ModalForms/SignUp.tsx';
import Login from '../components/ModalForms/Login.tsx';
// Hooks
import useMediaQuery from "../hooks/useMediaQuery.ts";
// Entities
import AuthContext from '../entities/context/AuthContext.tsx';
// Assets
import IH from '../assets/logo/IH.webp';
import '../styles/Navbar.css';


const Navbar = () => {
	const styleNav = "uppercase p-2 lg:px-4 md:mx-2 rounded transation-colors duration-300";
	const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
	const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [openSignUp, setOpenSignUp] = useState<boolean>(false);
	const {user, logoutUser} = useContext(AuthContext);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}
	
    function closeSignUp() {
		setOpenSignUp(false);
	}

	function upSignUp() {
		setOpenSignUp(true);
	}


	return <>
		{/* SIGN-UP and LOGIN */}
		{isOpen ? <Login setIsOpen={closeModal} setIsSignUp={upSignUp} /> : false}
		{openSignUp ? <SignUp setIsOpen={closeSignUp} setIsLogin={openModal} /> : false}
		{/* NAVBAR */}
		<nav className="bg-white py-2 md:py-4 w-full border-b-2 border-stone-200">
			<div className="ml-4 flex flex-row justify-between md:px-4 mx-auto md:flex md:items-center">
				<div className="justify-between items-center w-32 md:w-44">
					{/* LEFT SIDE */}
					<Link to="/"><img alt="logo" src={IH} /></Link>
				</div>
				{/* RIGHT SIDE */}
				{isAboveMediumScreens ? (
					<div className="relative flex flex-row ml-auto mt-0" id="navbar-collapse">
						<HeadLink page="blog" />
						<HeadLink page="bonds" />
						<HeadLink page="contact" />
						{!user ? (<>
							<button onClick={openModal} className={`${styleNav} text-indigo-600 text-center border border-transparent hover:bg-indigo-100 hover:text-indigo-700`}>Login</button>
							<button onClick={upSignUp} className={`${styleNav} text-indigo-600 text-center border border-transparent hover:bg-indigo-100 hover:text-indigo-700`}>Sign-Up</button>
							</>
						) : (<>
							<HeadLink page="portfolio" />
							<button onClick={logoutUser} className={`${styleNav} text-indigo-600 text-center border border-transparent hover:bg-indigo-100 hover:text-indigo-700`}>Logout</button>
							</>
						)}
					</div>
				) : (
					<div className="mx-4">
						<button
							className={`${isMenuToggled ? 'hidden': ''}
								border
								border-solid
								border-gray-600
								px-3
								py-1
								rounded
								text-gray-600
								opacity-50
								hover:opacity-75
								md:hidden`}
							id="navbar-toggle"
							onClick={() => setIsMenuToggled(!isMenuToggled)}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
							</svg>
						</button>
					</div>
				)}
			</div>
			{/* MOBILE MENU MODAL */}
			{!isAboveMediumScreens && isMenuToggled && (
				<div className="fixed z-10 right-0 bottom-0 h-full w-[300px] bg-primary-100 drop-shadow-xl">
					{/* CLOSE ICON */}
					<div className="flex justify-end p-12">
						<button onClick={() => setIsMenuToggled(!isMenuToggled)}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-400">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
					{/* MENU ITEMS */}
					<div className="flex text-2xl justify-center">
						<div className="flex gap-8 flex-col items-center" id="navbar-collapse">
							<MenuLink page="blog" />
							<MenuLink page="bonds" />
							<MenuLink page="contact" />
							<button onClick={() => {openModal(); setIsMenuToggled(!isMenuToggled)}} className={`uppercase text-zinc-600`}>Login</button>
							<button onClick={() => {upSignUp(); setIsMenuToggled(!isMenuToggled)}} className={`uppercase text-zinc-600`}>Sign In</button>
						</div>
					</div>
				</div>
			)}
		</nav>
		
		</>
};

export default Navbar;