import { Key, FunctionComponent } from "react";
import "../../styles/components/Sidebar.css";

interface PropsType {
	id: Key,
	name: string,
	slug: string
}

interface SidebarPropsType {
	data: PropsType[]
}

const Sidebar: FunctionComponent<SidebarPropsType> = (props: SidebarPropsType) => {
	return (props.data.map((value: PropsType) =>
		<div key={value.id} className="bg-white rounded-md shadow-md p-4">
			<h2 className="text-xl font-bold mb-2"><a href={`#${value.slug}`}>{value.name}</a></h2>
		</div>
	));
}

export default Sidebar;