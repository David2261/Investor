import { Key, FunctionComponent, Fragment } from "react";


interface SidebarType {
	data: {
		id: Key,
        title: string,
        content: string[],
	}[],
};

type PropsType = {
	args: {
        id: Key,
        title: string,
        content: string[],
	},
}


const SideBar: FunctionComponent<SidebarType> = (props: SidebarType) => {
    return (props.data.map((value: PropsType["args"]) =>
    <Fragment key={value.id}>
        <div className='home-bar-content'>
            <h1>{value.title}</h1>
            {value.content.map((item) => {
                return <p>{item}</p>
            })}
        </div>
    </Fragment>
    ));
}

export default SideBar;