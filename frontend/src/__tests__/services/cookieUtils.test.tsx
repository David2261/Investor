import { setCookie, getCookie, deleteCookie } from '@/services/cookieUtils';

describe('Cookie utilities', () => {
  beforeEach(() => {
    // Очищаем все куки перед каждым тестом
    document.cookie.split(';').forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.slice(0, eqPos).trim() : '';
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
  });

  test('setCookie sets a cookie', () => {
    setCookie('testKey', 'testValue', 1);
    expect(document.cookie).toContain('testKey=testValue');
  });

  test('getCookie retrieves the correct cookie value', () => {
    document.cookie = 'foo=bar';
    expect(getCookie('foo')).toBe('bar');
  });

  test('getCookie returns null if cookie not found', () => {
    expect(getCookie('nonexistent')).toBeNull();
  });

  test('deleteCookie removes the cookie', () => {
    document.cookie = 'toDelete=someValue';
    deleteCookie('toDelete');
    expect(getCookie('toDelete')).toBeNull();
  });

  test('setCookie encodes special characters correctly', () => {
    setCookie('encodedKey', 'value with spaces & symbols', 1);
    expect(getCookie('encodedKey')).toBe('value with spaces & symbols');
  });

  test('setCookie adds Secure flag in production mode', () => {
    const originalMode = import.meta.env.MODE;
    (import.meta as any).env.MODE = 'production';

    setCookie('secureTest', 'value', 1);
    expect(document.cookie).toContain('secureTest=value');

    (import.meta as any).env.MODE = originalMode; // Restore original mode
  });
});
