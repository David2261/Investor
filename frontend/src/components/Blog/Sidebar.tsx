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
	<Fragment key={value.id}>
		<li className="px-4 py-4 flex" title="home">
			<a href={`#${value.slug}`} className="flex flex-row">
			{value.name}
			</a>
		</li>
	</Fragment>
	));
}

export default Sidebar;