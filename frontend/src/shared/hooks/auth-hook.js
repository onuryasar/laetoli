import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [name, setName] = useState(false);

  const login = useCallback((uid, utoken, uname, expirationDate) => {
    setToken(utoken);
    setUserId(uid);
    setName(uname);
    const savedTokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // now + 1 hour
    setTokenExpirationDate(savedTokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: utoken,
        name: uname,
        expiration: savedTokenExpirationDate.toISOString(),
      }),
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.name,
        new Date(storedData.expiration),
      );
    }
  }, [login]);

  return { token, login, logout, userId, name };
};
