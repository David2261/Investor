import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { BlogAPIType as ContentItemType } from "@/types/Articles";

interface ContentListProps {
    data: ContentItemType[];
}

const ContentNews: FunctionComponent<ContentListProps> = ({ data }) => {
	if (!data || data.length === 0) {
        return <div>No content available</div>;
    }
    const value = data[0];
	const limitedTitle = value.title.length > 50 ? value.title.slice(0, 50) + '...' : value.title;
	return <>
		<Link to={`/news/${value.category.slug}/${value.slug}`}>
			<div className="w-full mb-4">
				<img className="object-cover h-[650px]" src={value.img} alt={value.title} loading="lazy" />
				<div className="absolute top-2 left-4 bg-white p-2 rounded-full shadow">
					<p className="text-gray-700 font-semibold">{new Date().toLocaleDateString()}</p>
				</div>
				<div className="absolute border rounded-full top-6 mt-8 left-4 bg-transparent p-2 border-white rounded shadow">
					<p className="text-lg text-white font-bold">{value.category.name}</p>
				</div>
				<div className="absolute top-2 right-4 bg-white p-3 rounded shadow">
					<h2 className="text-lg font-bold">{limitedTitle}</h2>
				</div>
				<div className="absolute bottom-4 right-4 cursor-pointer">
					<div className="rounded-full bg-white transition-all duration-300 ease-in-out hover:bg-transparent hover:text-white p-4">
						<FaArrowRightLong className="-rotate-45" />
					</div>
				</div>
			</div>
		</Link>
	</>
};

export default ContentNews;