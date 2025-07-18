import { Fragment, FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { BlogAPIType as ContentItemType } from "@/types/Articles";

interface ContentListProps {
	data: ContentItemType[];
}

const ContentList: FunctionComponent<ContentListProps> = ({ data }) => {
	if (!data || data.length === 0) {
		return <div>No content available</div>;
	}
	const content = data.slice(0, 8);
	return (content.map((value, index) => 
	<Fragment key={index}>
		<div className="ml-10">
			<Link to={`/news/${value.category.slug}/${value.slug}`}>
				<p className="text-xl hover:text-slate-700">{value.title}</p>
			</Link>
		</div>
	</Fragment>
	))
};

export default ContentList;