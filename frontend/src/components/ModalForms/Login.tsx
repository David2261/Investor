import React, { useState, useContext, useEffect, useRef } from 'react';
import AuthContext from '@/entities/context/AuthContext';
import styles from '@/styles/components/ModalForms/Login.module.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface LoginProps {
  setIsOpen: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsOpen }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { loginUser, registrationUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const formRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // Проверка на опасные символы для XSS
    if (/[<>"'`]/.test(value)) {
      setError('Недопустимые символы в поле.');
      return;
    }
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      if (!isLogin) {
        setError('Пароль должен содержать минимум 8 символов, включая буквы разного регистра и цифры.');
      } else {
        setError('Неверный формат email.');
      }
      return;
    }

    if (!isLogin) {
      const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
      if (!usernamePattern.test(form.username)) {
        setError('Имя пользователя должно быть от 3 до 20 символов и содержать только буквы, цифры или подчеркивания.');
        return;
      }

      if (form.password !== form.password2) {
        setError('Пароли не совпадают.');
        return;
      }

      try {
        await registrationUser(form);
        setIsOpen(false);
      } catch (err: any) {
        setError(err?.message || 'Ошибка при регистрации.');
      }
    } else {
      try {
        await loginUser({ email: form.email, password: form.password });
        setIsOpen(false);
      } catch (err: any) {
        setError(err?.message || 'Ошибка при входе.');
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formRef, setIsOpen]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const TermOfUser = () => {
    toggleForm();
    setIsOpen(false)
    navigate("termsofuse");
  }
  if (error) {
    Swal.fire('Ошибка', 'Не удалось отправить данные на сервер.', 'error');
  }

  return (
    <div ref={formRef} className={styles.container}>
      <div className={styles.container__buttons}>
        <div
          className={styles.container__btnHighlight}
          style={{ transform: isLogin ? 'translateX(0)' : 'translateX(100%)' }}
        ></div>
        <button
          type="button"
          className={styles.container__toggleBtn}
          style={{ color: isLogin ? '#fff' : '#000' }}
          onClick={toggleForm}
        >
          Вход
        </button>
        <button
          type="button"
          className={styles.container__toggleBtn}
          style={{ color: isLogin ? '#000' : '#fff' }}
          onClick={toggleForm}
        >
          Регистрация
        </button>
      </div>

      <form
          id="login"
          className={styles.form}
          style={{ transform: isLogin ? 'translateX(0)' : 'translateX(100%)' }}
          onSubmit={handleSubmit}>
        <input
            name="email"
            type="email"
            className={styles.form__input}
            placeholder="Email"
            required
            value={form.email}
            onChange={handleInputChange} />
        <input
            name="password"
            type="password"
            className={styles.form__input}
            placeholder="Пароль"
            required
            value={form.password}
            onChange={handleInputChange} />
        <div className="flex justify-between">
          <div className={styles.form__options}>
            <input type="checkbox" className={styles.form__checkBox} id="remember" />
            <label htmlFor="remember" className={styles.form__terms}>Заполнить меня</label>
          </div>
          <div className={styles.form__options}>
            <label htmlFor="register-terms" className={styles.form__terms}>
              Забыли <a href="#" className={styles.form__termsLink}>пароль</a>?
            </label>
          </div>
        </div>
        <button type="submit" className={styles.form__submitBtn}>Вход</button>
      </form>

      <form id="register" className={styles.form} style={{ transform: isLogin ? 'translateX(100%)' : 'translateX(0)' }}>
        <input
            name="username"
            type="text"
            className={styles.form__input}
            placeholder="Имя пользователя"
            required
            value={form.username}
            onChange={handleInputChange}
            />
        <input
            name="email"
            type="email"
            className={styles.form__input}
            placeholder="Email"
            required
            value={form.email}
            onChange={handleInputChange} />
        <input
            name="password"
            type="password"
            className={styles.form__input}
            placeholder="Пароль"
            required
            value={form.password}
            onChange={handleInputChange} />
        <input
          name="password2"
          type="password"
          className={styles.form__input}
          placeholder="Повторный пароль"
          required
          value={form.password2}
          onChange={handleInputChange} />
        <div className={styles.form__options}>
          <input type="checkbox" className={styles.form__checkBox} id="register-terms" />
          <label htmlFor="register-terms" className={styles.form__terms}>
            Я соглашаюсь с<span onClick={TermOfUser} className={styles.form__termsLink}> Условием использования</span>
          </label>
        </div>
        <button type="submit" className={styles.form__submitBtn}>Регистрация</button>
      </form>
    </div>
  );
};

export default Login;
