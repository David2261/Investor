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

interface RegistrationForm {
	username: string;
	email: string;
	password: string;
	password2: string;
}

interface AuthContextType {
	user: User | null;
	authTokens: AuthTokens | null;
	loginUser: ({ email, password }: { email: string; password: string }) => Promise<void>;
	registrationUser: (formData: RegistrationForm) => Promise<void>;
	logoutUser: () => void;
	login: (user: User) => void;
	logout: () => void;
	resetPassword: (email: string) => Promise<void>;
}

const apiURL = import.meta.env.VITE_API_URL;

const AuthContext = createContext<AuthContextType>({
	user: null,
	authTokens: null,
	loginUser: async () => {},
	logoutUser: () => {},
	registrationUser: async () => {},
	login: () => {},
	logout: () => {},
	resetPassword: async () => {},
});

export default AuthContext;

const AuthSwal = withReactContent(Swal)

export const AuthProvider = ({children}: {children: ReactNode}) => {
	const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() => {
		try {
			const storedAuthTokens = localStorage.getItem("authTokens");
			return storedAuthTokens ? JSON.parse(storedAuthTokens) : null;
		} catch (error) {
			console.error("Ошибка при чтении authTokens из localStorage:", error);
			return null;
		}
	});
	const [user, setUser ] = useState<User | null>(() => {
		try {
			const storedAuthTokens = localStorage.getItem("authTokens");
			return storedAuthTokens ? jwtDecode(storedAuthTokens) : null;
		} catch (error) {
			console.error("Ошибка при декодировании токена:", error);
			return null;
		}
	});
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const loginUser = async ({ email, password }: { email: string; password: string; }) => {
		const response = await fetch(`${apiURL}/api/v1/token/`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});
		const data = await response.json();
		if (response.status === 200) {
			setAuthTokens(data);
			setUser(jwtDecode(data.access));
			localStorage.setItem('authTokens', JSON.stringify(data));
			navigate(-1);
			AuthSwal.fire({
				title: "Login Successful",
				icon: "success",
				toast: true,
				timer: 6000,
				position: 'top-right',
				timerProgressBar: true,
				showConfirmButton: false,
			});
		} else {
			AuthSwal.fire({
				title: "Username or password does not exist",
				icon: "error",
				toast: true,
				timer: 6000,
				position: 'top-right',
				timerProgressBar: true,
				showConfirmButton: false,
			});
		}
	};

	const registrationUser = async (formData: RegistrationForm) => {
		const response = await fetch(`${apiURL}/api/v1/registration/`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		});

		const data = await response.json();

		if (response.status === 201) {
			const token = data.access;
			if (token && typeof token === 'string') {
				const decodedToken = jwtDecode(token);
				setAuthTokens(data);
				setUser(decodedToken as User | null);
				localStorage.setItem('authTokens', JSON.stringify(data));
				loginUser({
					email: formData.email,
					password: formData.password
				});
				navigate("/");
				AuthSwal.fire({
					title: "Registration Successful, Logging you in now...",
					icon: "success",
					toast: true,
					timer: 6000,
					position: 'top-right',
					timerProgressBar: true,
					showConfirmButton: false,
				});
			}
		} else {
			console.error("Ошибка при регистрации:", data);
			AuthSwal.fire({
				title: "An Error Occurred " + response.status,
				icon: "error",
				toast: true,
				timer: 6000,
				position: 'top-right',
				timerProgressBar: true,
				showConfirmButton: false,
			});
		}
	};

	const resetPassword = async (email: string) => {
		const response = await fetch(`${apiURL}/api/v1/password-reset/`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		if (response.status === 200) {
			AuthSwal.fire({
				title: "Password reset link sent to your email.",
				icon: "success",
				toast: true,
				timer: 6000,
				position: 'top-right',
				timerProgressBar: true,
				showConfirmButton: false,
			});
		} else {
			const data = await response.json();
			AuthSwal.fire({
				title: "Error sending password reset link.",
				icon: "error",
				toast: true,
				timer: 6000,
				position: 'top-right',
				timerProgressBar: true,
				showConfirmButton: false,
			});
			console.error("Ошибка при сбросе пароля:", data);
		}
	};

	const logoutUser = useCallback(() => {
		setAuthTokens(null)
		setUser(null)
		localStorage.removeItem('authTokens')
		navigate('/')
	}, [navigate]);

	const updateToken = useCallback(async () => {

		const response = await fetch(`${apiURL}/api/v1/token/refresh/`, {
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
		} else {
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
		resetPassword: resetPassword,
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
			{!loading ? children : null}
		</AuthContext.Provider>
	)
}
