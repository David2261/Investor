import { NavLink } from "react-router-dom"

type Props = {
	page: string;
}

const MenuLink = ({
	page,
}: Props) => {
	return (
		<NavLink to={`${page}/`} className={`${page} uppercase text-zinc-600`}>
			{page}
		</NavLink>
	)
}

export default MenuLink;