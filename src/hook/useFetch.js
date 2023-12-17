// useFetch.js
import { useState, useEffect } from 'react';

const useFetch = (
  url,
  { options = {}, onSuccess = null, onFail = null, deps = [] }
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(
            'Une erreur est survenue lors de la récupération des données'
          );
        }
        const data = await response.json();
        setData(data);
        onSuccess && onSuccess(data); // Appelle la fonction onSuccess si elle est définie
      } catch (error) {
        setError(error.message);
        onFail && onFail(error); // Appelle la fonction onFail si elle est définie
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, isLoading };
};

export default useFetch;
