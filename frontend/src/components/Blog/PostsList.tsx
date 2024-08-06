import { Key, FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface PostsListType {
	data: {
		id: Key,
		category: {
			name: string,
			slug: string
		},
		title: string,
		img: string | undefined,
		slug: string,
	}[],
}

type PropsType = {
	args: {
		id: Key,
		category: {
			name: string,
			slug: string
		},
		title: string,
		img: string | undefined,
		slug: string,
	},
}

// Блок статьи
const PostsList: FunctionComponent<PostsListType> = (props: PostsListType) => {
	return (props.data.map((value: PropsType["args"]) =>
		<Link key={value.id} to={`/news/${value.category.slug}/${value.slug}`}>
			<div className="blog-content-post">
				<img src={value.img} alt="" />
				<p>{value.title}</p>
				<p className="uppercase">{value.category.name}</p>
			</div>
		</Link>
	));
}

export default PostsList;