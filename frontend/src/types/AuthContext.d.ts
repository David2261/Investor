import type { User } from './User';

export interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loginUser: ({ email, password }: { email: string; password: string }) => Promise<void>;
    registrationUser: (formData: RegistrationForm) => Promise<void>;
    logoutUser: () => void;
    login: (user: User) => void;
    logout: () => void;
    resetPassword: (email: string) => Promise<void>;
    loading: boolean;
}