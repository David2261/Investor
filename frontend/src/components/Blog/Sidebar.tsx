import { Key, FunctionComponent } from "react";
import "../../styles/components/Sidebar.css";

interface PropsType {
    id: Key;
    name: string;
    slug: string;
    posts: {
        title: string;
        summary: string;
        reading_time_minutes: number;
        category: {
            name: string;
            slug: string;
        };
        img: string;
        time_create: string;
        slug: string;
    }[];
}

const Sidebar: FunctionComponent<{ data: any[], onSelectCategory: (category: string) => void }> = ({ data, onSelectCategory }) => {
	return (data.map((value: PropsType) =>
		<div key={value.id} className="p-2 border-b">
			<h2 className="text-3xl uppercase mb-2">
				<button key={value.slug} onClick={() => onSelectCategory(value.slug)}>{value.name}</button>
			</h2>
		</div>
	));
}

export default Sidebar;