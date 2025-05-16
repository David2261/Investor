import { useEffect } from "react";
import { useUser } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";
// Types
import { User } from '@/types/User';


export const useAuth = () => {
	const { user, addUser, removeUser, setUser } = useUser();
	const { getItem } = useLocalStorage();

	useEffect(() => {
		const user = getItem("user");
		if (user) {
			addUser(JSON.parse(user));
		}
	}, [addUser, getItem]);

	const login = (user: User) => {
		addUser(user);
	};

	const logout = () => {
		removeUser();
	};

	return { user, login, logout, setUser };
};