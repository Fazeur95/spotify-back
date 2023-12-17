import { useEffect, useState } from 'react';

export const useAlbum = () => {
  const [albumList, setAlbumList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAlbum = async id => {
    try {
      setLoading(true);
      fetch(`http://localhost:6868/api/album?populate=true`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setAlbumList(data);
        })
        .catch(error => {
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchAlbum();
  }, []);

  return { albumList, loading, error, fetchAlbum };
};
