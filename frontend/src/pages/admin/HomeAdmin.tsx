import '/src/styles/AdminHome.css';
import SideBarDATA from '/src/alpha_test_data/admin_data_groups.tsx';
import { Fragment } from 'react';

// function ContentBar (content: []) {
//     const bar = content.map((value: any) => 
//     <Fragment>
//         <p>{content}</p>
//     </Fragment>)
//     return <Fragment></Fragment>
// } 

const SideBar = SideBarDATA.map((value: {
    id: number,
    title: string,
    content: [],
}) => 
    <Fragment key={value.id}>
        <div className='home-bar-content'>
            <h1>{value.title}</h1>
            {value.content.map(function(item) {
                return <p>{item}</p>
            })}
            {/* {value.content.length > 0 ? <p>{value.content[0]}</p> : null} */}
        </div>
    </Fragment>
)

const HomeAdmin = () => {
    return <>
    <div className='home-body'>
        <div className='home-sidebar'>
            <h1>Админ панель</h1>
            {SideBar}
        </div>
        <div></div>
    </div>
    </>
};

export default HomeAdmin;