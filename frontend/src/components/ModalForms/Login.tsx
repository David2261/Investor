import React, { useState, useContext, useEffect, useCallback } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { IoIosClose } from 'react-icons/io';
import ForgotPassword from './ForgotPassword';
import AuthContext from '@/entities/context/AuthContext';
import IH from '@/assets/logo/IH.webp';
import '@/styles/components/ModalForms/Login.css';

interface LoginProps {
  setIsOpen: () => void;
  setIsSignUp: () => void;
}

const Login: React.FC<LoginProps> = ({ setIsOpen, setIsSignUp }) => {
  const { loginUser } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // Проверка на опасные символы для XSS
    if (/[<>"'`]/.test(value)) {
      setError('Недопустимые символы в поле.');
      return;
    }
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);

      // Валидация email
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(form.email)) {
        setError('Неверный формат email.');
        return;
      }

      // Валидация пароля
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
      if (!passwordPattern.test(form.password)) {
        setError('Пароль должен содержать минимум 8 символов, включая буквы разного регистра и цифры.');
        return;
      }

      try {
        await loginUser({
          email: form.email,
          password: form.password,
        });
        setIsOpen();
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка при входе.';
        setError(`Ошибка: ${errorMessage}`);
      }
    },
    [form, loginUser, setIsOpen]
  );

  const closeForgotPassword = () => setIsForgotPassword(false);
  const openForgotPassword = () => setIsForgotPassword(true);

  const handleSignUpClick = () => {
    setIsOpen();
    setIsSignUp();
  };

  const handleForgotPasswordClick = () => {
    openForgotPassword();
  };

  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const formElement = document.querySelector('form');
      if (formElement) {
        e.preventDefault();
        // Создаем синтетическое событие формы
        const formEvent = new Event('submit', { bubbles: true, cancelable: true }) as unknown as React.FormEvent<HTMLFormElement>;
        Object.defineProperty(formEvent, 'target', { value: formElement });
        Object.defineProperty(formEvent, 'currentTarget', { value: formElement });
        Object.defineProperty(formEvent, 'preventDefault', { value: () => e.preventDefault() });
        
        handleSubmit(formEvent);
      }
    }
  };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [handleSubmit]);

  return (
    <>
      {isForgotPassword ? (
        <ForgotPassword setIsOpen={closeForgotPassword} setIsForgotPassword={openForgotPassword} />
      ) : (
        <div className="fixed z-10 w-full h-full backdrop-blur-sm bg-white/30">
          <animated.div className="screen" style={styles}>
            <form onSubmit={handleSubmit}>
              <div className="screen-1">
                <img className="logo" alt="Логотип" src={IH} />
                <button
                  onClick={setIsOpen}
                  className="fixed top-16 right-8"
                  type="button"
                  aria-label="Закрыть"
                >
                  <IoIosClose className="text-black w-16 h-16" />
                </button>

                {error && <div className="error">{error}</div>}

                <div className="email">
                  <label htmlFor="email-input">Email</label>
                  <div className="sec-2">
                    <input
                      id="email-input"
                      type="email"
                      name="email"
                      placeholder="example@gmail.com"
                      autoComplete="email"
                      value={form.email}
                      onChange={onInputChange}
                    />
                  </div>
                </div>

                <div className="password">
                  <label htmlFor="password-input">Пароль</label>
                  <div className="sec-2">
                    <input
                      id="password-input"
                      className="pas"
                      type="password"
                      name="password"
                      placeholder="············"
                      autoComplete="current-password"
                      value={form.password}
                      onChange={onInputChange}
                    />
                  </div>
                </div>

                <button className="signup" type="submit">
                  Вход
                </button>
                <div className="footer">
                  <span onClick={handleSignUpClick}>Регистрация</span>
                  <span onClick={handleForgotPasswordClick}>Забыли пароль?</span>
                </div>
              </div>
            </form>
          </animated.div>
        </div>
      )}
    </>
  );
};

export default Login;