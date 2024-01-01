import { Key, Fragment, FunctionComponent } from "react";


interface ContentPostType {
	data: {
		id: Key,
		category: string,
		title: string,
		text: string,
		img: string | undefined,
	}[],
}

type PropsType = {
	id: Key,
	category: string,
	title: string,
	text: string,
	img: string | undefined,
}


const ContentPost: FunctionComponent<ContentPostType> = (props: ContentPostType) => {
	return (props.data.map((value: PropsType) =>
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