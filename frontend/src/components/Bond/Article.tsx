import { Key, FunctionComponent } from "react";
import { Link } from "react-router-dom";
// Styles
import styles from '@/styles/Bond.module.css';

interface ArticlePropsType {
	data: {
		id: Key;
		img?: string;
		title: string;
		slug: string;
		category: {
			name: string;
			slug: string;
		};
	}[];
}

const Article: FunctionComponent<ArticlePropsType> = ({ data }) => {
	return (
		<>
			{data.map((article, index) => (
				<Link key={article.id || index} to={`/news/${article.category.slug}/${article.slug}`}>
					<div className={styles['bonds-news-content-block-article']}>
						{article.img && <img src={article.img} alt={article.title} />}
						<p>{article.title.slice(0, 80)}... | {article.category.name}</p>
					</div>
				</Link>
			))}
		</>
	);
};

export default Article;