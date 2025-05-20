import React, { useState, useContext, useEffect, useCallback } from 'react';
import { animated, useSpring } from '@react-spring/web';
import AuthContext from '@/entities/context/AuthContext';
import { IoIosClose } from "react-icons/io";
// Assets
import IH from '@/assets/logo/IH.webp';
import '@/styles/components/ModalForms/SignUp.css';

interface SignUpProps {
  setIsOpen: () => void;
  setIsLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ setIsOpen, setIsLogin }) => {
  const { registrationUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
	if (/[<>"'`]/.test(value)) {
		setError('Недопустимые символы в поле.');
		return;
	}
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    if (name === 'password' || name === 'password2') {
      setPasswordMismatch(form.password !== value && name === 'password2');
    }
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);

		const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
		if (!usernamePattern.test(form.username)) {
			setError('Имя пользователя должно быть от 3 до 20 символов и содержать только буквы, цифры или подчеркивания.');
			return;
		}

		const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if (!emailPattern.test(form.email)) {
			setError('Неверный формат email.');
			return;
		}

		const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
		if (!passwordPattern.test(form.password)) {
			setError('Пароль должен содержать минимум 8 символов, включая буквы разного регистра и цифры.');
			return;
    	}

		if (form.password !== form.password2) {
			setError('Пароли не совпадают.');
			return;
		}

		try {
			await registrationUser(form);
			setIsOpen();
		} catch (err: unknown) {
			const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка при регистрации.';
			setError(`Ошибка: ${errorMessage}`);
		}
		},
		[form, registrationUser, setIsOpen]
	);

	const handleLoginClick = () => {
		setIsOpen();
		setIsLogin();
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
			handleSubmit({ preventDefault: () => {}, target: formElement } as React.FormEvent<HTMLFormElement>);
			}
		}
		};

		document.addEventListener('keydown', onKeyDown);
		return () => {
		document.removeEventListener('keydown', onKeyDown);
		};
  }, [handleSubmit]);

  return (
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
				<IoIosClose className='text-black w-16 h-16' />
            </button>

            {error && <div className="error">{error}</div>}

            <div className="username">
              <label htmlFor="username-input">Имя пользователя</label>
              <div className="sec-2">
                <input
                  id="username-input"
                  type="text"
                  name="username"
                  placeholder="Никнейм"
                  autoComplete="username"
                  value={form.username}
                  onChange={onInputChange}
                />
              </div>
            </div>

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
                  autoComplete="new-password"
                  value={form.password}
                  onChange={onInputChange}
                />
              </div>
            </div>

            <div className="password">
              <label htmlFor="password2-input">Подтверждение пароля</label>
              <div className="sec-2">
                <input
                  id="password2-input"
                  className="pas"
                  type="password"
                  name="password2"
                  placeholder="············"
                  autoComplete="new-password"
                  value={form.password2}
                  onChange={onInputChange}
                />
              </div>
            </div>

            <button className="signup" type="submit">
              Зарегистрироваться
            </button>
            <div className="footer">
              <span onClick={handleLoginClick}>Вход</span>
            </div>
          </div>
        </form>
      </animated.div>
    </div>
  );
};

export default SignUp;