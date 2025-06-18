import { createContext, useCallback, useEffect, useState, ReactNode } from "react";
import { useNavigate } from 'react-router-dom';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import type { User } from '@/types/User';
import type { AuthContextType } from '@/types/AuthContext';
import { getCookie } from "@/services/cookieUtils";
import getCSRF from "@/services/getCSRF";

const apiURL = import.meta.env.VITE_API_URL;

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loginUser: async () => {},
  logoutUser: () => {},
  registrationUser: async () => {},
  login: () => {},
  logout: () => {},
  resetPassword: async () => {},
  loading: true,
});

export default AuthContext;

const AuthSwal = withReactContent(Swal);

const showNotification = (title: string, icon: SweetAlertIcon | undefined) => {
  AuthSwal.fire({
	title,
	icon,
	toast: true,
	timer: 6000,
	position: 'top',
	timerProgressBar: true,
	showConfirmButton: false,
  });
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserData = useCallback(async () => {
	try {
	  const response = await fetch(`${apiURL}/api/v1/user/data/`, {
		method: "GET",
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
	  });

	  if (response.ok) {
		const data = await response.json();
		setUser(data);
	  } else {
		setUser(null);
	  }
	} catch (err) {
		console.log("Error in AuthProvider with: " + err)
	  logoutUser();
	} finally {
	  setLoading(false);
	}
  }, []);

  const loginUser = async ({ email, password }: { email: string; password: string }) => {
	await getCSRF();
	const csrfToken = getCookie('csrftoken');

	const response = await fetch(`${apiURL}/api/v1/token/`, {
	  method: "POST",
	  credentials: 'include',
	  headers: {
		'Content-Type': 'application/json',
		'X-CSRFToken': csrfToken || '',
	  },
	  body: JSON.stringify({ email, password }),
	});

	if (response.status === 200) {
	  await fetchUserData();
	  showNotification("Login successful", "success");
	} else {
	  showNotification("Invalid credentials", "error");
	}
  };

  const registrationUser = async (formData: any) => {
	await getCSRF();
	const csrfToken = getCookie('csrftoken');

	const response = await fetch(`${apiURL}/api/v1/registration/`, {
	  method: "POST",
	  credentials: 'include',
	  headers: {
		'Content-Type': 'application/json',
		'X-CSRFToken': csrfToken || '',
	  },
	  body: JSON.stringify(formData),
	});

	if (response.status === 201) {
	  await fetchUserData();
	  navigate('/');
	  showNotification("Registration successful", "success");
	} else {
	  showNotification("Registration failed", "error");
	}
  };

  const logoutUser = useCallback(() => {
	setUser(null);
	navigate('/');
	showNotification("Logout successful", "success");
  }, [navigate]);

  const resetPassword = async (email: string) => {
	await getCSRF();
	const csrfToken = getCookie('csrftoken');

	const response = await fetch(`${apiURL}/api/v1/password-reset/`, {
	  method: "POST",
	  credentials: 'include',
	  headers: {
		'Content-Type': 'application/json',
		'X-CSRFToken': csrfToken || '',
	  },
	  body: JSON.stringify({ email }),
	});

	if (response.status === 200) {
	  showNotification("Reset email sent", "success");
	} else {
	  showNotification("Reset failed", "error");
	}
  };

  useEffect(() => {
	fetchUserData();
  }, [fetchUserData]);

  const contextData = {
	user,
	setUser,
	loginUser,
	registrationUser,
	logoutUser,
	login: (u: User) => setUser(u),
	logout: logoutUser,
	resetPassword,
	loading,
  };

  return (
	<AuthContext.Provider value={contextData}>
	  {!loading && children}
	</AuthContext.Provider>
  );
};
