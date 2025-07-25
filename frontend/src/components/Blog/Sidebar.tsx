import { Key, FunctionComponent, memo } from "react";
import styles from "@/styles/components/Blog/Sidebar.module.css";

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
    posts?: PostType[];
}

interface SidebarProps {
    data: CategoryType[];
    onSelectCategory: (category: string) => void;
}

const Sidebar: FunctionComponent<SidebarProps> = memo(({ data, onSelectCategory }) => {
    if (!data || data.length === 0) {
        return <div className={styles.empty}>No categories found</div>;
    }

    return (
        <div className={`grid gap-4 bg-white rounded-xl p-2`}>
            {data.map((category) => (
                <div key={category.id} className={`rounded-lg ${styles.dataTabSidebarRightBtn} cursor-pointer p-2`}>
                    <button     
                        className={`cursor-pointer text-2xl ${styles.categoryButton}`}
                        onClick={() => onSelectCategory(category.slug)}
                        aria-label={`Select ${category.name} category`}
                    >
                        {category.name}
                    </button>
                </div>
            ))}
        </div>
    );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;