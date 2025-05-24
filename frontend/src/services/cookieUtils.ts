export const setCookie = (name: string, value: string, days: number) => {
    try {
        const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
        const isProduction = import.meta.env.MODE === 'production';
        const cookieString = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax${isProduction ? '; Secure' : ''}`;
        document.cookie = cookieString;
    } catch (error) {
        console.error(`Ошибка установки cookie ${name}:`, error);
    }
};

export const getCookie = (name: string): string | null => {
    try {
        const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
        const value = matches ? decodeURIComponent(matches[1]) : null;
        return value;
    } catch (error) {
        console.error(`Ошибка чтения cookie ${name}:`, error);
        return null;
    }
};

export const deleteCookie = (name: string) => {
    try {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
    } catch (error) {
        console.error(`Ошибка удаления cookie ${name}:`, error);
    }
};