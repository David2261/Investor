import { Fragment } from 'react';
import '/src/styles/AdminHome.css';
import SideBarDATA from '/src/alpha_test_data/admin_data_groups.tsx';
import AdminDATARecent from '/src/alpha_test_data/admin_data_recent.tsx';

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
);

const ContentRecentChanges = AdminDATARecent.map((value: {
    id: number,
    title: string
}) => 
    <Fragment key={value.id}>
        <p>{value.title}</p>
    </Fragment>
);

const HomeAdmin = () => {
    return <>
    <div className='home-body'>
        <div className='home-sidebar'>
            <h1>Админ панель</h1>
            {SideBar}
        </div>
        <div className='home-content'>
            <div className='content-chart'>
                <h1>BLOCK CHART</h1>
            </div>
            <div className='content-recent-changes'>
                <h1>Последние действия</h1>
                <div className='recent-changes-block'>
                    {ContentRecentChanges}
                </div>
            </div>
        </div>
    </div>
    </>
};

export default HomeAdmin;