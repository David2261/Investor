import { NavLink } from "react-router-dom";


const DOT = <div className="hidden md:flex rounded-full h-0.5 w-0.5 bg-slate-400"></div>;

const Messangers = (
	<div className="md:mx-4 flex flex-col">
		<div className="flex flex-row py-4 md:py-10 gap-2 md:gap-4 border-b-2">
			<div className="px-2 md:px-6">
				<NavLink to="https://www.instagram.com/life_sultan/">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 hover:fill-purple-300" viewBox="0 0 512 512">
						<path d="M349.33 69.33a93.62 93.62 0 0193.34 93.34v186.66a93.62 93.62 0 01-93.34 93.34H162.67a93.62 93.62 0 01-93.34-93.34V162.67a93.62 93.62 0 0193.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z"/>
						<path d="M377.33 162.67a28 28 0 1128-28 27.94 27.94 0 01-28 28zM256 181.33A74.67 74.67 0 11181.33 256 74.75 74.75 0 01256 181.33m0-37.33a112 112 0 10112 112 112 112 0 00-112-112z"/>
					</svg>
				</NavLink>
			</div>
			{ DOT }
			<div className="px-2 md:px-6">
				<NavLink to="https://www.linkedin.com/in/bulat-nasyrov-7705231bb/">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 hover:fill-blue-400" viewBox="0 0 512 512">
						<path d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z"/>
					</svg>
				</NavLink>
			</div>
			{ DOT }
			<div className="px-2 md:px-6">
				<NavLink to="https://twitter.com/ad_ge_1">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 hover:fill-sky-400" viewBox="0 0 24 24">
					<g>
						<path d="M1 2h2.5L18.5 22h-2.5z"></path>
						<path d="M5.5 2h2.5L23 22h-2.5z"></path>
						<path d="M3 2h5v2h-5z"></path>
						<path d="M16 22h5v-2h-5z"></path>
						<path d="M18.5 2h3.5L5 22h-3.5z"></path>
					</g>
				</svg>
					{/* <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 hover:fill-sky-400" viewBox="0 0 512 512">
						<path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
					</svg> */}
				</NavLink>
			</div>
			{ DOT }
			<div className="px-2 md:px-6">
				<NavLink to="https://github.com/David2261">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 512 512">
						<path d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 003.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 01-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0025.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 015-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 01112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 015 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 004-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z"/>
					</svg>
				</NavLink>
			</div>
			{ DOT }
			<div className="px-2 md:px-6 hover:text-red-600">
				<NavLink to="https://www.pinterest.ch/bulatnasirov2003/">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 hover:fill-red-600" viewBox="0 0 512 512">
						<path d="M256.05 32c-123.7 0-224 100.3-224 224 0 91.7 55.2 170.5 134.1 205.2-.6-15.6-.1-34.4 3.9-51.4 4.3-18.2 28.8-122.1 28.8-122.1s-7.2-14.3-7.2-35.4c0-33.2 19.2-58 43.2-58 20.4 0 30.2 15.3 30.2 33.6 0 20.5-13.1 51.1-19.8 79.5-5.6 23.8 11.9 43.1 35.4 43.1 42.4 0 71-54.5 71-119.1 0-49.1-33.1-85.8-93.2-85.8-67.9 0-110.3 50.7-110.3 107.3 0 19.5 5.8 33.3 14.8 43.9 4.1 4.9 4.7 6.9 3.2 12.5-1.1 4.1-3.5 14-4.6 18-1.5 5.7-6.1 7.7-11.2 5.6-31.3-12.8-45.9-47-45.9-85.6 0-63.6 53.7-139.9 160.1-139.9 85.5 0 141.8 61.9 141.8 128.3 0 87.9-48.9 153.5-120.9 153.5-24.2 0-46.9-13.1-54.7-27.9 0 0-13 51.6-15.8 61.6-4.7 17.3-14 34.5-22.5 48a225.13 225.13 0 0063.5 9.2c123.7 0 224-100.3 224-224S379.75 32 256.05 32z"/>
					</svg>
				</NavLink>
			</div>
		</div>
	</div>
);

const GlobalLinks = (
	<div className="md:mx-4 flex flex-col">
		<div className="flex flex-wrap justify-center md:flex-row py-2 md:py-10 gap-4 border-b-2">
			<div className="px-2 md:px-4 hover:text-red-600">
				<NavLink to="agreement/">Agreement</NavLink>
			</div>
			{ DOT }
			<div className="px-2 md:px-4 hover:text-red-600">
				<NavLink to="emailagreement/">Email Agreement</NavLink>
			</div>
			{ DOT }
			<div className="px-2 md:px-4 hover:text-red-600">
				<NavLink to="payanddelivery/">Pay & Delivery</NavLink>
			</div>
			{ DOT }
			<div className="px-2 md:px-4 hover:text-red-600">
				<NavLink to="confidentiality/">Confidentiality</NavLink>
			</div>
			{ DOT }
			<div className="px-2 md:px-4 hover:text-red-600">
				<NavLink to="responsibility/">Responsibility</NavLink>
			</div>
		</div>
	</div>
);

const LocalLinks = (
	<div className="md:mx-4 flex flex-col">
		<div className="flex flex-wrap md:flex-nowrap md:flex-row py-10 gap-2 md:gap-4 border-b-2 justify-center">
			<div className="px-2 md:px-4 hover:text-slate-900">
				<NavLink to="contact/">Contact Us</NavLink>
			</div>
			{ DOT }
			<div className="px-2 md:px-4 hover:text-slate-900">Cybersecurity</div>
			{ DOT }
			<div className="px-2 md:px-4 hover:text-slate-900">Terms of Use</div>
			{ DOT }
			<div className="px-2 md:px-4 hover:text-slate-900">Privacy & Cookies</div>
			{ DOT }
			<div className="md:px-4 hover:text-slate-900">Your Privacy Choices</div>
		</div>
	</div>
);

const Footer = () => {

	return <>
		<div className="w-full bg-blue-100 flex flex-col mt-4">
			<div className="text-slate-800 flex flex-row md:mx-32 justify-center">
				{Messangers}
			</div>
			<div className="text-slate-800 flex flex-row md:mx-32 justify-center">
				{GlobalLinks}
			</div>
			<div className="text-slate-500 flex flex-row md:mx-32 justify-center">
				{LocalLinks}
			</div>
			<div className="flex flex-row py-10 justify-center">&copy; 2023 Investor Home. All rights reserved.</div>
		</div>
	</>
};

export default Footer;
