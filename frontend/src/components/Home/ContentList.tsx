import { Key, Fragment } from "react";
import DATA from "../../alpha_test_data/home_data";


const contentList = DATA.map((value: {
	id: Key;
	title: string;
}) => 
	// return <div><ContentPost title={value.title} /></div>;
	<Fragment key={value.id}>
		<div className="ml-10"><p className="text-xl hover:text-slate-700">{value.title}</p></div>
	</Fragment>
);

export default contentList;