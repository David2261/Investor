import axios from "axios";
import { Key, Component } from "react";
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
class DataTab extends Component<{}, State> {
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
		console.log(this.state.data.map((value) => value))
		return (
		<nav className="fixed pt-4 pl-4 z-20">
			<ul className="transition transform duration-500 text-xl">
				{ this.state.data ? <Sidebar data={this.state.data} /> : false }
			</ul>
		</nav>
		);
	}
}

export default DataTab;