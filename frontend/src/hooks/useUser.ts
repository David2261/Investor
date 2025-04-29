import { useContext } from "react";
import AuthContext from "../entities/context/AuthContext";
import { useLocalStorage } from "./useLocalStorage";
// Types
import { User } from '@/types/User';

export const useUser = () => {
	const context = useContext(AuthContext);
	if (!context) {
	  throw new Error('useUser must be used within an AuthProvider');
	}
	const { user, setUser } = context;
	const { setItem } = useLocalStorage();
  
	const addUser = (user: User) => {
	  setUser(user);
	  setItem('user', JSON.stringify(user));
	};
  
	const removeUser = () => {
	  setUser(null);
	  setItem('user', '');
	};
  
	return { user, addUser, removeUser, setUser };
  };