import { Key, FunctionComponent } from "react";
import "../../styles/components/Sidebar.css";

interface PostType {
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
}

interface CategoryType {
    id: Key;
    name: string;
    slug: string;
    posts: PostType[];
}

interface SidebarProps {
    data: CategoryType[];
    onSelectCategory: (category: string) => void;
}

const Sidebar: FunctionComponent<SidebarProps> = ({ data, onSelectCategory }) => {
	return (
        <div className="space-y-4">
            {data.map((category: CategoryType) => (
                <div key={category.id} className="p-2 border-b border-gray-300">
                    <h2 className="text-xl font-bold uppercase mb-2">
                        <button 
                            className="hover:text-gray-600 no-underline focus:outline-none" 
                            onClick={() => onSelectCategory(category.slug)}
                        >
                            {category.name}
                        </button>
                    </h2>
                </div>
            ))}
        </div>
	);
};

export default Sidebar;