import { NavLink } from "react-router-dom"

type Props = {
	page: string;
}

const HeadLink = ({
	page,
}: Props) => {
	return (
		<NavLink to={`${page}/`} className={`uppercase p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transation duration-300`}>
			{page}
		</NavLink>
	)
}

export default HeadLink;