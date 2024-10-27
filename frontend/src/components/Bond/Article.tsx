import { Key, Fragment, FunctionComponent } from "react";
import { Link } from "react-router-dom";


interface ArticlePropsType {
	data: {
		id: Key;
		img: string | undefined;
		text: string;
		category: string;
	}[],
}

type DataType = {
	args: {
		id: Key;
		img: string | undefined;
		text: string;
		category: string;
	}
}


const Article: FunctionComponent<ArticlePropsType> = ({ data }) => {
	return (data.map((value: DataType["args"]) =>
	<Fragment key={value.id}>
		<Link to={`/news/${value.category.slug}/${value.slug}`}>
			<div className="bonds-news-content-block-article">
				{/* <img src={value.img} alt="" /> */}
				<p>{value.title.slice(0, 80)}... | {value.category.name}</p>
			</div>
		</Link>
	</Fragment>)
)};

export default Article;