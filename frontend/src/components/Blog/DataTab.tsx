import axios from "axios";
import { Key, PureComponent } from "react";
import Sidebar from "./Sidebar";

interface State {
	data: [];
	loaded: boolean;
	placeholder: string;
}

interface CategoryAPIType {
	data: {
		id: Key,
		name: string,
		slug: string
	}[]
}

// Боковая панель навигации по категориям
class DataTab extends PureComponent<{}, State> {
	constructor(props: CategoryAPIType) {
		super(props);
		this.state = {
			data: [],
			loaded: false,
			placeholder: "Loading",
		};
	}

	async componentDidMount() {
		await axios.get('http://127.0.0.1:8000/api/articles/category/all/')
		.then(response => {
			if (response.status > 400) {
				return this.setState(() => {
					return { placeholder: "Something went wrong!" };
				});
			}
			return (response.data);
		})
		.then(data => {
			this.setState(() => {
				return {
					data,
					loaded: true
				};
			});
		});
	}


	render() {
		return (
		<nav className="fixed pt-4 pl-4 z-20">
			{
				this.state.data.length != 0 ? (
					<span className="text-sm">
						<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 24 24">
							<path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z"></path>
						</svg>
					</span>)
					: false
			}
			<ul className="transition transform duration-500 text-xl">
				{ this.state.data ? <Sidebar data={this.state.data} /> : false }
			</ul>
		</nav>
		);
	}
}

export default DataTab;