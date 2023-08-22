

import BG from '../assets/login_bg.jpg';


const MainLayout: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
		children,
	}) => {
	return (
		<div className="w-full h-full fixed bg-cover bg-center flex justify-center align-center" style={`background-image: url({BG})`}>
			<div className="w-4/5">
				{children}
			</div>
		</div>
	);
};
