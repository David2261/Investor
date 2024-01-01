import { Key, FunctionComponent, Fragment } from "react";


interface ContentRecentChangesType {
	data: {
		id: Key,
		title: string,
	}[],
};

type PropsType = {
	args: {
		id: Key,
		title: string,
	},
}

const ContentRecentChanges: FunctionComponent<ContentRecentChangesType> = (props: ContentRecentChangesType) => {
	return (props.data.map((value: PropsType["args"]) => 
	<Fragment key={value.id}>
		<p>{value.title}</p>
	</Fragment>
	))
};

export default ContentRecentChanges;