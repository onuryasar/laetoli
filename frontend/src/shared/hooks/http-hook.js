import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [errorCode, setErrorCode] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortController);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortController.signal,
        });
        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortController,
        );

        if (!response.ok) {
          setErrorCode(response.status);
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    [],
  );

  const clearError = () => {
    setError(null);
  };

  /**
   * This is a clean-up function for
   * when the component that's using this hook
   * is dismounted, it should abort all http requests.
   * For instance; if someone clicks on "submit" on a form
   * and then leaves the page before the http request finalized.
   */
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortController =>
        abortController.abort(),
      );
    };
  }, []);

  return { isLoading, error, errorCode, sendRequest, clearError };
};
