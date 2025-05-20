import { useState, useCallback } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { IoIosClose } from 'react-icons/io';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import IH from '@/assets/logo/IH.webp';


const ResetPassword = () => {
  const [form, setForm] = useState({ newPassword: '', confirmPassword: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);
  const { uidb64, token } = useParams<{ uidb64: string; token: string }>();
  const navigate = useNavigate();

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // Проверка на опасные символы для XSS
    if (/[<>"'`]/.test(value)) {
      setError('Недопустимые символы в поле.');
      return;
    }
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    if (name === 'newPassword' || name === 'confirmPassword') {
      setPasswordMismatch(form.newPassword !== value && name === 'confirmPassword');
    }
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);

      if (!passwordPattern.test(form.newPassword)) {
        setError('Пароль должен содержать минимум 8 символов, включая буквы разного регистра и цифры.');
        return;
      }

      if (form.newPassword !== form.confirmPassword) {
        setError('Пароли не совпадают.');
        setPasswordMismatch(true);
        return;
      }

      try {
        const response = await axios.post(`/api/v1/password/reset/confirm/${uidb64}/${token}/`, {
          new_password: form.newPassword,
        });
        setSuccess(response.data.message);
        setTimeout(() => {
          navigate('/'); // Редирект на страницу входа
        }, 2000);
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || 'Произошла ошибка при сбросе пароля.';
        setError(`Ошибка: ${errorMessage}`);
      }
    },
    [form, uidb64, token, navigate]
  );

  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
  });

  return (
    <div className="fixed z-10 w-full h-full backdrop-blur-sm bg-white/30">
      <animated.div className="screen" style={styles}>
        <form onSubmit={handleSubmit}>
          <div className="screen-1">
            <img className="logo" alt="Логотип" src={IH} />
            <button
              onClick={() => navigate('/')}
              className="fixed top-16 right-8"
              type="button"
              aria-label="Закрыть"
            >
              <IoIosClose className="text-white w-16 h-16" />
            </button>

            {error && <div className="error text-red-500">{error}</div>}
            {success && <div className="success text-green-500">{success}</div>}

            <div className="password">
              <label htmlFor="new-password-input">Новый пароль</label>
              <div className="sec-2">
                <input
                  id="new-password-input"
                  type="password"
                  name="newPassword"
                  placeholder="············"
                  autoComplete="new-password"
                  value={form.newPassword}
                  onChange={onInputChange}
                  className={`pas ${passwordMismatch ? 'border-red-500' : ''}`}
                />
              </div>
            </div>

            <div className="password">
              <label htmlFor="confirm-password-input">Подтверждение пароля</label>
              <div className="sec-2">
                <input
                  id="confirm-password-input"
                  type="password"
                  name="confirmPassword"
                  placeholder="············"
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={onInputChange}
                  className={`pas ${passwordMismatch ? 'border-red-500' : ''}`}
                />
                {passwordMismatch && (
                  <p className="text-red-500 text-sm mt-1">Пароли не совпадают</p>
                )}
              </div>
            </div>

            <button className="reset-password" type="submit">
              Установить новый пароль
            </button>
            <div className="footer">
              <span className="pr-2">
                Вернуться к{' '}
                <span className="cursor-pointer" onClick={() => navigate('/login')}>
                  Входу
                </span>
              </span>
            </div>
          </div>
        </form>
      </animated.div>
    </div>
  );
};

export default ResetPassword;