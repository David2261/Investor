// import { Line } from 'react-chartjs-2';
// import {
// 	Chart as ChartJS,
// 	CategoryScale,
// 	LinearScale,
// 	PointElement,
// 	LineElement,
// 	Title,
// 	Tooltip,
// 	Legend,
// } from 'chart.js';
// // Components
// import SideBar from '../../components/Admin/HomeAdmin/SideBar';
// import ContentRecentChanges from '../../components/Admin/HomeAdmin/ContentRecentChanges';

// // Style
// import '/src/styles/AdminHome.css';

// // Example Data
// import SideBarDATA from '../../alpha_test_data/admin_data_groups.json';
// import AdminDATARecent from '../../alpha_test_data/admin_data_recent.json';

// ChartJS.register(
// 	CategoryScale,
// 	LinearScale,
// 	PointElement,
// 	LineElement,
// 	Title,
// 	Tooltip,
// 	Legend
// );

// const lineOption = {
// 	responsive: true,
// 	plugins: {
// 		legend: {
// 			position: 'top' as const,
// 		},
// 		title: {
// 			display: true,
// 			text: 'Просмотры за месяцы',
// 		},
// 	},
// }

// const lineData = {
// 	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
// 	datasets: [
// 		{
// 			fill: false,
// 			lineTension: 0.1,
// 			backgroundColor: 'rgba(75,192,192,0.4)',
// 			borderColor: 'rgba(75,192,192,1)',
// 			borderCapStyle: 'butt',
// 			borderDash: [],
// 			borderDashOffset: 0.0,
// 			borderJoinStyle: 'miter',
// 			pointBorderColor: 'rgba(75,192,192,1)',
// 			pointBackgroundColor: '#fff',
// 			pointBorderWidth: 1,
// 			pointHoverRadius: 5,
// 			pointHoverBackgroundColor: 'rgba(75,192,192,1)',
// 			pointHoverBorderColor: 'rgba(220,220,220,1)',
// 			pointHoverBorderWidth: 2,
// 			pointRadius: 1,
// 			pointHitRadius: 10,
// 			data: [65, 59, 80, 81, 56, 55, 40]
// 		}
// 	]
// };

// const HomeAdmin = () => {
// 	return (
// 		<div className='home-body'>
// 			<div className='home-sidebar'>
// 				<h1>Админ панель</h1>
// 				<SideBar data={SideBarDATA} />
// 			</div>
// 			<div className='home-content'>
// 				<div className='content-chart'>
// 					<Line options={lineOption} data={lineData} />
// 				</div>
// 				<div className='content-recent-changes'>
// 					<h1>Последние действия</h1>
// 					<div className='recent-changes-block'>
// 						<ContentRecentChanges data={AdminDATARecent} />
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default HomeAdmin;