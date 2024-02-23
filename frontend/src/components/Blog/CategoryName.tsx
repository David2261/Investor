import { FunctionComponent, useState, useEffect } from "react";
import axios from "axios";



interface Sidebar {
	id: number;
	name: string;
}


// Блок категории
const CategoryName: FunctionComponent<{ id: number }> = ({ id }) => {
	const [sidebar, setSidebar] = useState<Sidebar | null>(null);

	useEffect(() => {
		const fetchCategory = async () => {
			const response = await axios.get('http://127.0.0.1:8000/api/articles/category/all/');
			const category = response.data.find((object: Sidebar) => object.id === id);
			setSidebar(category || null);
		};

		fetchCategory();
	}, [id]);
	
	return sidebar ? <div>{sidebar.name}</div> : <div>Loading...</div>;
}

export default CategoryName;