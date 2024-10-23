import { Key, Fragment, FunctionComponent } from "react";

interface ContentListType {
	id: Key,
	title: string
}

interface ContentListDataType {
	data: ContentListType[],
}

const ContentList: FunctionComponent<ContentListDataType> = (props: ContentListDataType) => {
	return (props.data.map((value: ContentListType) => 
	// return <div><ContentPost title={value.title} /></div>;
	<Fragment key={value.id}>
		<div className="ml-10"><p className="text-xl hover:text-slate-700">{value.title}</p></div>
	</Fragment>
	))
};

export default ContentList;