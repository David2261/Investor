import { Key, Fragment, FunctionComponent } from "react";
import "../../styles/components/Sidebar.css";
import CategoryName from "./CategoryName";

interface SidebarPropsType {
	isNavOpen: boolean,
	data: {
		id: Key,
		category: number,
		img: string,
	}[],
}

type PropsType = {
	id: Key,
	category: number,
	img: string | undefined,
}

const Sidebar: FunctionComponent<SidebarPropsType> = (props: SidebarPropsType) => {
	return console.log(props.data[0])
	// return (props.data.map((value: PropsType) => 
	// 	<Fragment key={value.id}>
	// 		<li className="px-4 py-4 flex" title="home">
	// 			<a href={`#${value.category}`} className="flex flex-row">
	// 				<div className="icon-wrapper px-2">
	// 					<span className="material-symbols-outlined">
	// 						{value.img ?
	// 						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shop" viewBox="0 0 16 16">
	// 							<path d={value.img} />
	// 						</svg>
	// 						: value.category
	// 						}
	// 					</span>
	// 				</div>
	// 				{props.isNavOpen ? <span className="item-text"><CategoryName id={value.category} /></span> : false}
	// 			</a>
	// 		</li>
	// 	</Fragment>
	// ));
}

export default Sidebar;