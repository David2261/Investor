import { Key, Fragment, FunctionComponent } from "react";
import "../../styles/components/Sidebar.css";

interface SidebarPropsType {
	data: PropsType[],
}

type PropsType = {
	id: Key,
	name: string,
	slug: string
}

const Sidebar: FunctionComponent<SidebarPropsType> = (props: SidebarPropsType) => {
	return (props.data.map((value: PropsType) =>
		<div key={value.id} className="bg-white rounded-md shadow-md p-4">
			<h2 className="text-xl font-bold mb-2"><a href={`#${value.slug}`}>{value.name}</a></h2>
		</div>
	));
}

export default Sidebar;