import { Key, Fragment, ReactNode, FunctionComponent } from "react";
import "../../styles/components/Sidebar.css";

interface SidebarPropsType {
	data: {
		id: Key,
		category: string,
		img: ReactNode,
	}[],
}

type DataType = {
	args: {
		id: Key,
		category: string,
		img: ReactNode,
	}
}

// Блок категории
const Sidebar: FunctionComponent<SidebarPropsType> = (props: SidebarPropsType) => {
	let content = null;
	if (props != null) {
		content = props.data.map((value: DataType["args"]) =>
		<Fragment key={value.id}>
			<li className="item" title="home">
			<a href="#home" className="hyper-link">
				<div className="icon-wrapper">
					<span className="material-symbols-outlined">{value.img}</span>
				</div>
				<span className="item-text">{value.category}</span>
			</a>
			</li>
		</Fragment>
	)}
	return content;
}

export default Sidebar;