import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
// Services
import { handleError } from '@/services/Helpers/handleError';
import { setCookie, getCookie, deleteCookie } from "@/services/cookieUtils";
import { showNotification } from '@/services/notificationUtils';
// Types
import { User } from '@/types/User';

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
    setUser: (user: User | null) => void;
    authTokens: AuthTokens | null;
    loginUser: ({ email, password }: { email: string; password: string }) => Promise<void>;
    registrationUser: (formData: RegistrationForm) => Promise<void>;
    logoutUser: () => void;
    login: (user: User) => void;
    logout: () => void;
    resetPassword: (email: string) => Promise<void>;
    loading: boolean;
}

const apiURL = import.meta.env.VITE_API_URL;

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    authTokens: null,
    loginUser: async () => {},
    logoutUser: () => {},
    registrationUser: async () => {},
    login: () => {},
    logout: () => {},
    resetPassword: async () => {},
    loading: true,
});

export default AuthContext;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() => {
        try {
            const storedAuthTokens = getCookie("authTokens");
            return storedAuthTokens ? JSON.parse(storedAuthTokens) : null;
        } catch (error) {
            console.error("Ошибка при чтении authTokens из cookies:", error);
            handleError(error);
            return null;
        }
    });
    const [user, setUser] = useState<User | null>(() => {
		try {
			const storedAuthTokens = getCookie("authTokens");
			if (storedAuthTokens) {
				const tokens: AuthTokens = JSON.parse(storedAuthTokens);
				if (tokens.access) {
					return jwtDecode(tokens.access) as User;
				}
			}
			return null;
		} catch (error) {
			console.error("Ошибка при декодировании токена:", error);
			handleError(error);
			return null;
		}
	});
	const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const loginUser = async ({ email, password }: { email: string; password: string }) => {
        try {
            const response = await fetch(`${apiURL}/api/v1/token/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.status === 200) {
                if (data && data.access && data.refresh) {
                    setAuthTokens(data);
                    const decodedUser = jwtDecode(data.access) as User;
                    setUser(decodedUser);
                    setCookie('authTokens', JSON.stringify(data), 7);
                    navigate(-1);
                    showNotification("Login Successful", "success");
                } else {
                    showNotification("Received invalid tokens", "error");
                }
            } else if (response.status === 401) {
                showNotification("Неверный email или пароль", "error");
            } else {
                showNotification(`Ошибка входа: ${response.status}`, "error");
            }
        } catch (error) {
            console.error("Ошибка при входе пользователя:", error);
            showNotification("Произошла ошибка при входе в систему", "error");
        }
    };

    const registrationUser = async (formData: RegistrationForm) => {
        try {
            const response = await fetch(`${apiURL}/api/v1/registration/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.status === 201) {
                if (data.access && typeof data.access === 'string' && data.refresh) {
                    try {
                        const decodedToken = jwtDecode(data.access) as User;
                        setAuthTokens(data);
                        setUser(decodedToken);
                        setCookie('authTokens', JSON.stringify(data), 7);
                        navigate("/");
                        showNotification("Регистрация прошла успешно, выполняем вход...", "success");
                    } catch (err) {
                        console.error("Ошибка декодирования токена:", err);
                        showNotification("Ошибка при обработке токена после регистрации.", "error");
                    }
                } else {
                    showNotification("Получен некорректный токен после регистрации.", "error");
                }
            } else if (response.status === 400) {
                let message = "Ошибка регистрации:";
                if (data && typeof data === 'object') {
                    message += ' ' + Object.values(data).flat().join(' ');
                }
                showNotification(message, "error");
            } else {
                showNotification(`Ошибка регистрации: ${response.status}`, "error");
            }
        } catch (error) {
            console.error("Ошибка при регистрации:", error);
            showNotification("Произошла ошибка при регистрации", "error");
        }
    };

    const resetPassword = async (email: string) => {
        try {
            const response = await fetch(`${apiURL}/api/v1/password-reset/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email }),
                credentials: 'include',
            });

            if (response.ok) {
                showNotification("Ссылка для сброса пароля отправлена на вашу почту.", "success");
            } else {
                const data = await response.json();
                let message = "Ошибка при отправке ссылки для сброса пароля.";
                if (data && typeof data === 'object') {
                    message += ' ' + Object.values(data).flat().join(' ');
                }
                showNotification(message, "error");
                console.error("Ошибка при сбросе пароля:", data);
            }
        } catch (error) {
            console.error("Ошибка при сбросе пароля:", error);
            showNotification("Произошла ошибка при отправке ссылки для сброса пароля.", "error");
        }
    };

    const logoutUser = useCallback(() => {
        try {
            deleteCookie('authTokens');
            setAuthTokens(null);
            setUser(null);
            showNotification("Вы успешно вышли из системы", "success");
            navigate('/');
        } catch (error) {
            console.error("Logout failed:", error);
            showNotification("Не удалось выйти из системы", "error");
        }
    }, [navigate]);

    const updateToken = useCallback(async () => {
        if (!authTokens?.refresh) {
            logoutUser();
            return;
        }
        try {
            const response = await fetch(`${apiURL}/api/v1/token/refresh/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh: authTokens.refresh }),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                if (data.access && data.refresh) {
                    setAuthTokens(data);
                    const decodedUser = jwtDecode(data.access) as User;
                    setUser(decodedUser);
                    setCookie('authTokens', JSON.stringify(data), 7);
                } else {
                    throw new Error("Invalid token refresh response");
                }
            } else {
                showNotification("Сессия истекла, необходимо войти снова", "error");
                logoutUser();
            }
        } catch (error) {
            console.error("Ошибка обновления токена:", error);
            showNotification("Не удалось обновить токен, требуется повторный вход", "error");
            logoutUser();
        } finally {
            setLoading(false);
        }
    }, [authTokens?.refresh, logoutUser]);

    const contextData = {
        user,
        authTokens,
        loginUser,
        registrationUser,
        logoutUser,
        login: (user: User) => {
            setUser(user);
            setAuthTokens({ access: 'access_token', refresh: 'refresh_token' });
        },
        logout: logoutUser,
        setUser,
        resetPassword,
        loading,
    };

    const fetchUserData = useCallback(async () => {
        if (!authTokens) {
            setLoading(false);
            return;
        }
        try {
            if (user !== null) {
                setLoading(false);
                return;
            }

            const response = await fetch(`${apiURL}/api/v1/user/data/`, {
                method: "GET",
                headers: { 'Authorization': `Bearer ${authTokens.access}` },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
                setCookie('user', JSON.stringify(data), 7);
            } else {
                throw new Error("Не удалось получить данные пользователя");
            }
        } catch (error) {
            console.error("Ошибка при получении данных пользователя:", error);
            showNotification("Ошибка при загрузке данных пользователя", "error");
        } finally {
            setLoading(false);
        }
    }, [authTokens, user]);

    useEffect(() => {
		if (!authTokens) {
            setLoading(false);
            return;
        }

        if (loading) {
            updateToken();
        }

        const fifteenMinutes = 15 * 60 * 1000;

        const interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, fifteenMinutes);

        if (authTokens) {
            fetchUserData();
        } else {
            setUser(null);
            setLoading(false);
        }

        return () => clearInterval(interval);
    }, [authTokens, loading, fetchUserData, updateToken]);

    return (
        <AuthContext.Provider value={contextData}>
            {!loading ? children : null}
        </AuthContext.Provider>
    );
};