import { message } from 'antd';
import { useEffect, useState } from 'react';

export const useTrack = () => {
  const [trackList, setTrackList] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTracks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:6868/api/track?populate=true`
      );
      const data = await response.json();
      setTrackList(data);
    } catch (error) {
      message.error('Une erreur est survenue');
    }

    setLoading(false);
  };

  const deleteTrack = async id => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:6868/api/track/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        message.success('Morceau supprimé avec succès');
        fetchTracks();
      }
    } catch (error) {
      message.error('Une erreur est survenue');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  return { trackList, loading, fetchTracks, deleteTrack };
};
