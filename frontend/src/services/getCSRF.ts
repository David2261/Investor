import { getCookie } from './cookieUtils';

async function getCSRF() {
    const csrfToken = getCookie('csrftoken');
    if (!csrfToken) {
        try {
            await fetch('/api/csrf/', { credentials: 'include' });
            return getCookie('csrftoken');
        } catch (error) {
            console.error('Ошибка при получении CSRF cookie:', error);
            throw error;
        }
    }
    return csrfToken;
}

export default getCSRF;
