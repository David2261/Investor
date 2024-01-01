import { Key, Fragment, FunctionComponent } from "react";


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


const Article: FunctionComponent<ArticlePropsType> = (props: ArticlePropsType) => {
	return (props.data.map((value: DataType["args"]) =>
	<Fragment key={value.id}>
		<div className="bonds-news-content-block-article">
			<img src={value.img} alt="" />
			<p>{value.text} | {value.category}</p>
		</div>
	</Fragment>)
)};

export default Article;