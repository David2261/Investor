import { useEffect } from "react";
import { useUser } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// Types
import { User } from '@/types/User';

const AuthSwal = withReactContent(Swal)

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
		AuthSwal.fire({
            title: "You have been logged out...",
            icon: "success",
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        })
	};

	return { user, login, logout, setUser };
};