import { useContext } from "react";
import AuthContext from "../entities/context/AuthContext";
import { useLocalStorage } from "./useLocalStorage";

type User = {
	url: string;
	username: string;
	email: string;
	groups: string[];
	role: string;
};

export const useUser = () => {
	const { user, setUser } = useContext(AuthContext);
	const { setItem } = useLocalStorage();

	const addUser = (user: User) => {
		setUser(user);
		setItem("user", JSON.stringify(user));
	};

	const removeUser = () => {
		setUser(null);
		setItem("user", "");
	};

	return { user, addUser, removeUser, setUser };
};