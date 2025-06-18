import React, { useState, useContext, useCallback } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { IoIosClose } from 'react-icons/io';
import AuthContext from '@/entities/context/AuthContext';
import IH from '@/assets/logo/IH.webp';
import '@/styles/components/ModalForms/ForgotPassword.module.css';

interface ForgotPasswordProps {
  setIsOpen: () => void;
  setIsForgotPassword: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ setIsOpen, setIsForgotPassword }) => {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emailInvalid, setEmailInvalid] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // Проверка на опасные символы для XSS
    if (/[<>"'`]/.test(value)) {
      setError('Недопустимые символы в поле.');
      return;
    }
    setEmail(value);
    setEmailInvalid(!emailPattern.test(value) && value.length > 0);
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);

      if (!emailPattern.test(email)) {
        setError('Неверный формат email.');
        setEmailInvalid(true);
        return;
      }

      try {
        await resetPassword(email);
        setSuccess('Письмо для сброса пароля отправлено. Проверьте вашу почту.');
        setTimeout(() => {
          setIsOpen();
          setIsForgotPassword();
        }, 2000);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка при сбросе пароля.';
        setError(`Ошибка: ${errorMessage}`);
      }
    },
    [email, resetPassword, setIsOpen]
  );

  const handleLoginClick = () => {
    setIsForgotPassword();
    setIsOpen();
  };

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
              onClick={setIsOpen}
              className="fixed top-16 right-8"
              type="button"
              aria-label="Закрыть"
            >
              <IoIosClose className="text-black w-16 h-16" />
            </button>

            {error && <div className="error text-red-500">{error}</div>}
            {success && <div className="success text-green-500">{success}</div>}

            <div className="email">
              <label htmlFor="email-input">Email</label>
              <div className="sec-2">
                <input
                  id="email-input"
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  autoComplete="email"
                  value={email}
                  onChange={onInputChange}
                  className={`pas ${emailInvalid ? 'border-red-500' : ''}`}
                />
                {emailInvalid && (
                  <p className="text-red-500 text-sm mt-1">Неверный формат email</p>
                )}
              </div>
            </div>

            <button className="forgot-password" type="submit">
              Сбросить пароль
            </button>
            <div className="footer">
              <span className="pr-2">
                У вас уже есть аккаунт?{' '}
                <span className="cursor-pointer" onClick={handleLoginClick}>
                  Вход
                </span>
              </span>
            </div>
          </div>
        </form>
      </animated.div>
    </div>
  );
};

export default ForgotPassword;