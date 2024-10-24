import { Key, FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface ContentItemType {
    id: Key;
    title: string;
    category: {
        name: string;
        slug: string;
    };
    img: string;
    slug: string;
}

interface ContentListProps {
    data: ContentItemType[];
}

const ContentNews: FunctionComponent<ContentListProps> = ({ data }) => {
	if (!data || data.length === 0) {
        return <div>No content available</div>;  // Display a message if data is empty
    }
    const value = data[0];
	return <>
		<Link to={`/news`}>
			<div className="border-t-2 w-full relative">
				<div className="absolute left-0 top-0">
					<h3 className="font-sans font-medium text-2xl md:text-3xl mb-4">{value.category.name}</h3>
				</div>
				<div className="absolute right-4 top-0 hover:right-0 transition-all ease-in-out delay-150">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
					</svg>
				</div>
			</div>
		</Link>
		<Link to={`/news/${value.category.slug}/${value.slug}`}>
			<div className="w-full mt-10 mb-4">
				<p className="left-0 top-0 uppercase text-sky-500">{value.category.name}</p>
			</div>
			<div className="w-full mb-4">
				<h2 className="font-bold text-lg md:text-xl md:text-2xl hover:underline">{value.title}</h2>
			</div>
			<div className="w-full pb-6 border-b-2">
				<img className="object-cover w-full h-auto" src={value.img} alt={value.title} />
			</div>
		</Link>
	</>
};

export default ContentNews;