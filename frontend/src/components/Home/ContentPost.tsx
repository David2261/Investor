import { Key, Fragment, FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface ContentPostType {
    id: Key;
    title: string;
    category: {
        name: string;
        slug: string;
    };
    img: string;
    slug: string;
}

interface ContentPostDataType {
	data: ContentPostType[],
}

const ContentPost: FunctionComponent<ContentPostDataType> = ({ data }) => {
	if (!data || data.length === 0) {
        return <div>No content available</div>;
    }
	const content = data.slice(1, 7);
	return (content.map((value) =>
	<Fragment key={value.id}>
		<div className="w-full flex flex-col">
			<Link to={`/news/${value.category.slug}/${value.slug}`}>
				<p className="text-lg uppercase text-sky-500">{value.category.name}</p>
				<p className="text-lg font-bold">{value.title}</p>
				<img className="w-full h-auto pb-4 border-b-2" src={value.img} alt={value.title} loading="lazy" />
			</Link>
		</div>
	</Fragment>
	));
}

export default ContentPost;