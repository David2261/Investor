import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { User } from "../../hooks/useUser";
import { jwtDecode } from 'jwt-decode';


interface AuthContext {
	user: User | null;
	setUser: (user: User | null) => void;
	loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const AuthContext = createContext<AuthContext>({
	user: null,
	setUser: () => {},
	loginUser: async () => {},
});

export default AuthContext;

export const AuthProvider = ({children}) => {
	const [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
	const [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
	const navigate = useNavigate();
	
	const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await fetch("http://127.0.0.1:8000/api/v1/token/", {
			method: "POST",
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify({
				'email':e.target.email.value,
				'password':e.target.password.value
			})
		})
		const data = (await response).json()
		if (response.status === 200) {
			setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/');
		} else {
			alert("Something went wrong!");
		}
	}
	const contextData = {
		authTokens:authTokens,
		user: user,
		loginUser: loginUser
	}
	return (
		<AuthContext.Provider value={contextData}>
			{children}
		</AuthContext.Provider>
	)
}
