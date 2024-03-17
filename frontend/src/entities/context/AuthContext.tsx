import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { User } from "../../hooks/useUser";
import { useFetch } from "../../hooks/useFetch";
import { jwtDecode } from 'jwt-decode';


interface AuthTokens {
	access: string;
	refresh: string;
}

interface AuthContextValue {
	user: User | null;
	authTokens: AuthTokens | null;
	loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	logoutUser: () => void;
	login: (user: User) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
	user: null,
	authTokens: null,
	loginUser: () => Promise.resolve(),
	logoutUser: () => {},
	login: () => {},
	logout: () => {},
});

export default AuthContext;

export const AuthProvider = ({children}: {children: ReactNode}) => {
	const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() => {
		const storedAuthTokens = localStorage.getItem("authTokens");
		return storedAuthTokens ? JSON.parse(storedAuthTokens) : null;
	});
	const [user, setUser] = useState<User | null>(() => {
		const storedAuthTokens = localStorage.getItem("authTokens");
		return storedAuthTokens ? jwtDecode(storedAuthTokens) : null;
	});
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	
	let loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await useFetch("http://127.0.0.1:8000/api/v1/token/", {
			method: "POST",
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify({
				'email':(e.target as HTMLFormElement).email.value,
				'password':(e.target as HTMLFormElement).password.value
			})
		}) as Response;
		const data = await response.json()
		if (response.status === 200) {
			setAuthTokens(data)
			setUser(jwtDecode(data.access))
			localStorage.setItem('authTokens', JSON.stringify(data))
			navigate('/');
		} else {
			alert("Something went wrong!");
		}
	}

	let logoutUser = () => {
		setAuthTokens(null)
		setUser(null)
		localStorage.removeItem('authTokens')
		navigate('/')
	}

	let updateToken = async ()=> {

        let response = await fetch('http://127.0.0.1:8000/api/v1/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()
        
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }
	
	let contextData = {
		user: user,
		authTokens: authTokens,
		loginUser: loginUser,
		logoutUser: logoutUser,
		login: (user: User) => {
			setUser(user);
			setAuthTokens({ access: 'access_token', refresh: 'refresh_token' });
		},
		logout: () => {
			setUser(null);
			setAuthTokens(null);
		},
	};

	useEffect(() => {
		loading ? updateToken() : false;

		let fourMinutes = 1000 * 60 * 4;

		let interval = setInterval(() => {
		authTokens ? updateToken() : false;
		}, fourMinutes);
		return () => clearInterval(interval);
  }, [authTokens, loading]);

	return (
		<AuthContext.Provider value={contextData}>
			{loading ? null : children}
		</AuthContext.Provider>
	)
}
