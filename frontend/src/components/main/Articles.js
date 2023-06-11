import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import "../../assets/sass/main/Main.scss";


const Data = [
	{
		name: "Дневник инвестора: главный технический индикатор российского рынка акций",
		url: "test_1",
		date: "01.02.2023"
	},
	{
		name: "Сургутнефтегаз: отчет за 2022 год по РСБУ. Кубышка есть, а будут ли дальше дивиденды?",
		url: "test_2",
		date: "12.06.2023"
	},
	{
		name: "Портфель Россия 2033: закрываем позиции и укрупняемся в золоте",
		url: "test_3",
		date: "30.04.2023"
	},
	{
		name: "Отмена дефолта США, S&P 500, Apple, Pfizer, Intel, TLT, Nvidia - Будни Уолл стрит #98",
		url: "test_4",
		date: "18.03.2023"
	},
	{
		name: "МРСК: выбираем лучшую компанию в секторе. Что интересно под дивиденды?",
		url: "test_5",
		date: "12.01.2023"
	},
	{
		name: "QIWI: отчет за 1 кв. 2023 по МСФО. Если ли шансы на удвоение?",
		url: "test_6",
		date: "11.12.2022"
	},
	{
		name: "Disney (DIS): отчет за 2 кв. 2023 г. Выкупаем дно?",
		url: "test_7",
		date: "23.09.2022"
	},
	{
		name: "Роснефть: дивиденды за II полугодие 2022. Ожидаемо",
		url: "test_8",
		date: "23.11.2022"
	},
]

function Posts(props) {
	const content = props.data.map((data) =>
		<div className="col d-flex align-items-start">
		<div>
			<h3>
				<NavLink to={data.url}>{data.name}</NavLink>
			</h3>
			<p>{data.date}</p>
		</div>
		</div>
	);
	return (
		<>
			{content}
		</>
	)
}

export class Articles extends Component {
	render() {
		return(
			<>
			<div className="articles_box container">
				<div className="articles_header content-center mt-2">
					<h2>
						<strong className="text-dark">ПОСЛЕДНИЕ ОБЗОРЫ И СТАТЬИ</strong>
					</h2>
				</div>
				<div className="mt-2"></div>
				<div className="row row-cols-1 row-cols-sm-4 row-cols-md-3 row-cols-lg-2 g-4 py-5">
					<Posts data={Data} />
				</div>
			</div>
			</>
		)
	}
}

