export const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    const isProduction = import.meta.env.MODE === 'production';
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax${isProduction ? '; Secure' : ''}`;
};

export const getCookie = (name: string): string | null => {
    const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return matches ? decodeURIComponent(matches[1]) : null;
};

export const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};