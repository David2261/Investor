import { Fragment } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Style
import '/src/styles/AdminHome.css';

// Example Data
import SideBarDATA from '/src/alpha_test_data/admin_data_groups.tsx';
import AdminDATARecent from '/src/alpha_test_data/admin_data_recent.tsx';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const SideBar = SideBarDATA.map((value: {
    id: number,
    title: string,
    content: string[],
}) => 
    <Fragment key={value.id}>
        <div className='home-bar-content'>
            <h1>{value.title}</h1>
            {value.content.map((item) => {
                return <p>{item}</p>
            })}
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

const lineOption = {
    responsive: true,
    plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Просмотры за месяцы',
        },
    },
}

const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const HomeAdmin = () => {
    return <>
    <div className='home-body'>
        <div className='home-sidebar'>
            <h1>Админ панель</h1>
            {SideBar}
        </div>
        <div className='home-content'>
            <div className='content-chart'>
                <Line options={lineOption} data={lineData} />
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