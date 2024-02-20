import { Key, Fragment, FunctionComponent, useState } from "react";
import "../../styles/components/Sidebar.css";

interface SidebarPropsType {
	data: {
		id: Key,
		category: string,
		img: string,
	}[],
}

interface SidebarItemPropsType {
	data: {
		id: Key,
		category: string,
		img: string,
	}[],
	currentState: boolean,
}

type DataType = {
	args: {
		id: Key,
		category: string,
		img: string,
	}
}

// Блок категории
const SidebarItem: FunctionComponent<SidebarItemPropsType> = (props: SidebarItemPropsType) => {
	let content = null;
	if (props != null) {
		content = props.data.map((value: DataType["args"]) =>
		<Fragment key={value.id}>
			<li className="px-4 py-4 flex" title="home">
				<a href={`#${value.category}`} className="flex flex-row">
					<div className="icon-wrapper px-2">
						<span className="material-symbols-outlined">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shop" viewBox="0 0 16 16">
								<path d={value.img} />
							</svg>
						</span>
					</div>
					{props.currentState ? <span className="item-text">{value.category}</span> : false}
				</a>
			</li>
		</Fragment>
	)}
	return content;
}

const Sidebar: FunctionComponent<SidebarPropsType> = (props: SidebarPropsType) => {
	const [isNavOpen, setIsNavOpen] = useState(false);
	const changeControllerIconStyle = (isNavOpen: boolean): React.CSSProperties => {
		return {
			color: isNavOpen ? 'red' : 'blue',
		};
	};

	function toggleNavigationBarState() {
		setIsNavOpen(!isNavOpen);
	}
	return (
	<nav className={`fixed pt-4 pl-4 z-20 ${isNavOpen ? 'open' : ''}`}>
		<ul className="transition transform duration-500 text-2xl">
			<button className="px-4" style={changeControllerIconStyle(isNavOpen)} onClick={toggleNavigationBarState} title="open navigation bar">
				{isNavOpen ?
				<span className="material-symbols-outlined" style={changeControllerIconStyle(isNavOpen)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
						<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
					</svg>
				</span>
				:
				<span className="material-symbols-outlined" style={changeControllerIconStyle(isNavOpen)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
						<path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
					</svg>
				</span>}
			</button>
			<SidebarItem data={props.data} currentState={isNavOpen} />
		</ul>
	</nav>
	);
}

export default Sidebar;