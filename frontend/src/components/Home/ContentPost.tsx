import { Key, Fragment, FunctionComponent } from "react";

interface ContentPostType {
	id: Key,
	category: string,
	title: string,
	text: string,
	img: string | undefined
}

interface ContentPostDataType {
	data: ContentPostType[],
}

const ContentPost: FunctionComponent<ContentPostDataType> = (props: ContentPostDataType) => {
	return (props.data.map((value: ContentPostType) =>
	<Fragment key={value.id}>
		<div className="w-full flex flex-col">
			<p className="text-lg uppercase text-sky-500">{value.category}</p>
			<p className="text-lg font-bold">{value.title}</p>
			<p className="text-lg text-slate-700">{value.text}</p>
			<img className="w-full h-auto pb-4 border-b-2" src={value.img} alt="" />
		</div>
	</Fragment>
	));
}

export default ContentPost;