import { Key, Fragment, FunctionComponent } from "react";


interface ContentListType {
	data: {
		id: Key,
		title: string,
	}[],
}

type PropsType = {
	id: Key,
	title: string,
}


const ContentList: FunctionComponent<ContentListType> = (props: ContentListType) => {
	return (props.data.map((value: PropsType) => 
	// return <div><ContentPost title={value.title} /></div>;
	<Fragment key={value.id}>
		<div className="ml-10"><p className="text-xl hover:text-slate-700">{value.title}</p></div>
	</Fragment>
	))
};

export default ContentList;