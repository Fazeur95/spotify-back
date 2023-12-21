import { message } from 'antd';
import { useEffect, useState } from 'react';

export const useAlbum = () => {
  const [albumList, setAlbumList] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAlbum = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:6868/api/album?populate=true`
      );
      const data = await response.json();
      setAlbumList(data);
    } catch (error) {
      message.error('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const deleteAlbum = async id => {
    try {
      const response = await fetch(`http://localhost:6868/api/album/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        message.success('Album supprimé avec succès');
        fetchAlbum();
      }
    } catch (error) {
      message.error('Une erreur est survenue');
    }
  };

  useEffect(() => {
    fetchAlbum();
  }, []);

  return { albumList, loading, fetchAlbum, deleteAlbum };
};
