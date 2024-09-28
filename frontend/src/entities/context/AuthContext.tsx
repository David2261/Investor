import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { User } from "../../hooks/useUser";
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

interface AuthTokens {
	access: string;
	refresh: string;
}

type AuthContextType = {
	user: User | null;
	authTokens: AuthTokens | null;
	loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	registrationUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	logoutUser: () => void;
	login: (user: User) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
	user: null,
	authTokens: null,
	loginUser: async () => {},
	logoutUser: () => {},
	registrationUser: async () => {},
	login: () => {},
	logout: () => {},
});

export default AuthContext;

const AuthSwal = withReactContent(Swal)

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
	
	const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await fetch("http://127.0.0.1:8000/api/v1/token/", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'email': (e.target as HTMLFormElement).email.value,
				'password': (e.target as HTMLFormElement).password.value
			})
		}) as Response;
		const data = await response.json()
		if (response.status === 200) {
			setAuthTokens(data)
			setUser(jwtDecode(data.access))
			localStorage.setItem('authTokens', JSON.stringify(data))
			navigate(-1);
			AuthSwal.fire({
				title: "Login Successful",
				icon: "success",
				toast: true,
				timer: 6000,
				position: 'top-right',
				timerProgressBar: true,
				showConfirmButton: false,
			})
		} else {
			AuthSwal.fire({
				title: "Username or password does not exists",
				icon: "error",
				toast: true,
				timer: 6000,
				position: 'top-right',
				timerProgressBar: true,
				showConfirmButton: false,
			})
		}
	}

	const registrationUser = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await fetch("http://127.0.0.1:8000/api/v1/registration/", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'username': (e.target as HTMLFormElement).username.value,
				'email': (e.target as HTMLFormElement).email.value,
				'password': (e.target as HTMLFormElement).password.value,
				'password2': (e.target as HTMLFormElement).password2.value
			})
		}) as Response;
		const data = await response.json()
		if (response.status === 201) {
			const token = data.access;
			if (token && typeof token === 'string') {
				const decodedToken = jwtDecode(token);
				setAuthTokens(data)
				setUser(decodedToken as User | null)
				localStorage.setItem('authTokens', JSON.stringify(data))
				AuthSwal.fire({
					title: "Registration Successful, Login Now",
					icon: "success",
					toast: true,
					timer: 6000,
					position: 'top-right',
					timerProgressBar: true,
					showConfirmButton: false,
				})
				navigate(-1);
			}
		} else {
			AuthSwal.fire({
				title: "An Error Occured " + response.status,
				icon: "error",
				toast: true,
				timer: 6000,
				position: 'top-right',
				timerProgressBar: true,
				showConfirmButton: false,
			})
		}
	}

	const logoutUser = useCallback(() => {
		setAuthTokens(null)
		setUser(null)
		localStorage.removeItem('authTokens')
		navigate('/')
	}, [navigate]);

	const updateToken = useCallback(async () => {

		const response = await fetch('http://127.0.0.1:8000/api/v1/token/refresh/', {
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({'refresh':authTokens?.refresh})
		})

		const data = await response.json()

		if (response.status === 200){
			setAuthTokens(data)
			setUser(jwtDecode(data.access))
			localStorage.setItem('authTokens', JSON.stringify(data))
		}else{
			logoutUser()
		}
		loading ? setLoading(false) : false;
	}, [authTokens?.refresh, loading, logoutUser]);

	const contextData = {
		user: user,
		authTokens: authTokens,
		loginUser: loginUser,
		registrationUser: registrationUser,
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

		const fourMinutes = 1000 * 60 * 4;

		const interval = setInterval(() => {
			authTokens ? updateToken() : false;
		}, fourMinutes);
		return () => clearInterval(interval);
	}, [authTokens, loading, updateToken]);

	return (
		<AuthContext.Provider value={contextData}>
			{loading ? null : children}
		</AuthContext.Provider>
	)
}
