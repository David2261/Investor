import { createContext, useState } from "react";
import { User } from "../../hooks/useUser";


interface AuthContext {
	user: User | null;
	setUser: (user: User | null) => void;
}
  
const AuthContext = createContext<AuthContext>({
	user: null,
	setUser: () => {},
});

export default AuthContext;

export const AuthProvider = ({children}) => {
	let [authTokens, setAuthTokens] = useState(null);
	let [user, setUser] = useState(null);
	
	let loginUser = async (e) => {
		e.preventDefault();
		let response = fetch("http://127.0.0.1:8000/api/v1/token/", {
			method: "POST",
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify({
				'email':e.target.email.value,
				'password':e.target.password.value
			})
		})
		let data = (await response).json()
		console.log('data: ', data);
	}
	let contextData = {
		loginUser: loginUser
	}
	return (
		<AuthContext.Provider value={contextData}>
			{children}
		</AuthContext.Provider>
	)
}