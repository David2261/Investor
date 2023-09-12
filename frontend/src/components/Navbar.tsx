import { useState } from 'react';
import { NavLink, Link } from "react-router-dom";
// Components
import HeadLink from './Link.tsx';
import LiveStock from './StockMarket/LiveStock.tsx';
// Hooks
import useMediaQuery from "/src/hooks/useMediaQuery";
// Assets
import IH from '/src/assets/logo/IH.webp';
import '/src/styles/Navbar.css';
import BGLogin from '/src/assets/login_bg.jpg';


type Props = {};


const Navbar = (props: Props) => {
	const styleNav = "uppercase p-2 lg:px-4 md:mx-2 rounded transation-colors duration-300";
	const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
	const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function closeModal() {
  	setIsOpen(false);
  };

  function openModal() {
  	setIsOpen(true);
  };


	return <>
		{isOpen ?
			<div className="fixed z-10 w-full h-full backdrop-blur-sm bg-white/30 h-12">
				<div className="transition-opacity duration-300 ease-out opacity-0 hover:opacity-100 grid items-center justify-center rounded-lg">
				  <div className="fixed inset-x-1/3 backdrop-blur-sm bg-white/30 rounded-md">
					 	<div className="fixed top-32">
					    <div className="py-4 text-5xl px-32">
					    	<h1 className="text-amber-600">Login</h1>
					    </div>
					    <form action="" className="grid grid-cols-1 gap-4 px-2">
					      <input type="email" name="username" id="username" className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-2xl font-normal text-cyan-600 outline outline-0 transition-all placeholder-shown:border-cyan-400 focus:border-yellow-500 focus:outline-0 disabled:border-0 disabled:bg-yellow-500" />
					      <label htmlFor="username" className="after:content[' '] pointer-events-none absolute top-16 text-xl font-normal text-blue-gray-500 transition-all">Your email...</label>
					      <input type="password" name="password" id="password" className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-2xl font-normal text-cyan-600 outline outline-0 transition-all placeholder-shown:border-cyan-200 focus:border-yellow-500 focus:outline-0 disabled:border-0 disabled:bg-yellow-500" />
					      <label htmlFor="password" className="after:content[' '] pointer-events-none absolute top-36 text-xl font-normal text-blue-gray-500 transition-all">Your password...</label>
					      <p className="text-slate-300 font-sans text-xl decoration-solid italic">Forgot your password?</p>
					      <button type="button" data-ripple-light="true" className="mx-32 items-center rounded-md bg-pink-500 py-3 px-6 w-1/3 font-sans text-xl font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Press</button>
					    </form>
					  </div>
				  </div>
				  <div onClick={closeModal} className="h-12">
				    <img className="rounded-md" src={BGLogin} alt="" />
				  </div>
				</div>
			</div>
			:
			""
		}
		<nav className="bg-white py-2 md:py-4 w-full border-b-2 border-stone-200">
			<div className="ml-4 flex flex-row justify-between md:px-4 mx-auto md:flex md:items-center">
				<div className="justify-between items-center w-32 md:w-44">
					{/* LEFT SIDE */}
					<Link to="/"><img alt="logo" src={IH} /></Link>
				</div>
				{/* RIGHT SIDE */}
				{isAboveMediumScreens ? (
					<div className="fixed z-10 md:relative md:flex flex-col md:flex-row md:ml-auto md:mt-0" id="navbar-collapse">
						<HeadLink page="blog" />
						<HeadLink page="community" />
						<HeadLink page="contact" />
						<button onClick={openModal} className={`${styleNav} text-indigo-600 text-center border border-transparent hover:bg-indigo-100 hover:text-indigo-700`}>Login</button>
						<NavLink to="sign-up/" className={`${styleNav} text-indigo-600 text-center border border-solid hover:bg-indigo-600 solid hover:text-white mt-1 md:mt-0 md:ml-1`}>Sign In</NavLink>
					</div>
				) : (
					<div className="mx-4"><button
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
				<div className="fixed transition ease-out md:ease-in duration-500 right-0 bottom-0 z-40 h-full w-[300px] bg-primary-100 drop-shadow-xl">
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
		<LiveStock />
		
		</>
};

export default Navbar;