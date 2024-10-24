import { Key, Fragment, FunctionComponent } from "react";
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

const ContentList: FunctionComponent<ContentListProps> = ({ data }) => {
	return (data.map((value) => 
	// return <div><ContentPost title={value.title} /></div>;
	<Fragment key={value.id}>
		<div className="ml-10">
			<Link to={`/news/${value.category.slug}/${value.slug}`}>
				<p className="text-xl hover:text-slate-700">{value.title}</p>
			</Link>
		</div>
	</Fragment>
	))
};

export default ContentList;