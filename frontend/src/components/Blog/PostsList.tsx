import { Key, Fragment, FunctionComponent } from "react";

interface PostsListType {
	data: {
		id: Key,
		category: string,
		title: string,
		img: string | undefined,
	}[],
}

type PropsType = {
	args: {
		id: Key,
		category: string,
		title: string,
		img: string | undefined,
	},
}

// Блок статьи
const PostsList: FunctionComponent<PostsListType> = (props: PostsListType) => {
	return (props.data.map((value: PropsType["args"]) =>
		<Fragment key={value.id}>
			<div className="blog-content-post">
				<img src={value.img} alt="" />
				<p>{value.title}</p>
				<p className="uppercase">{value.category}</p>
			</div>
		</Fragment>
	));
}

export default PostsList;