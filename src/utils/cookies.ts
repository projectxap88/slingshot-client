import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';
const EXPIRES_IN_DAYS = 1;

export const cookies = {
  setToken(token: string): void {
    Cookies.set(TOKEN_KEY, token, { 
      expires: EXPIRES_IN_DAYS,
      secure: true,
      sameSite: 'strict'
    });
  },

  getToken(): string | undefined {
    return Cookies.get(TOKEN_KEY);
  },

  removeToken(): void {
    Cookies.remove(TOKEN_KEY);
  }
}; 