import { useAuth } from '@/hooks/useAuth';

const LogoutButton = () => {
  const { logout } = useAuth();
  return <button onClick={logout} onKeyDown={logout}>Выход</button>;
};

export default LogoutButton;