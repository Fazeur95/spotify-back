import { message } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';

export const useArtists = () => {
  const [artistList, setArtistList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { control, handleSubmit, watch, reset } = useForm();

  const watchImage = watch('image');

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    reset();
    setIsModalVisible(false);
  };

  const fetchArtists = useCallback(async () => {
    try {
      const response = await fetch(
        'https://spotify-api-43ur.onrender.com/api/artist'
      );
      const data = await response.json();
      setArtistList(data);
    } catch (error) {
      message.error('Une erreur est survenue');
    }
  }, []);

  const addArtist = async data => {
    const formData = new FormData();

    //File to blob
    const blob = new Blob([data.image], { type: data.image.type });

    formData.append('name', data.name);
    formData.append('image', data.image, blob);

    try {
      await fetch('https://spotify-api-43ur.onrender.com/api/artist', {
        method: 'POST',
        body: formData,
      });
      fetchArtists();
      handleCloseModal();
    } catch (error) {
      message.error('Une erreur est survenue');
    }
  };

  const onSubmit = data => {
    addArtist(data);
  };

  const deleteArtist = async id => {
    try {
      await fetch(`https://spotify-api-43ur.onrender.com/api/artist/${id}`, {
        method: 'DELETE',
      });
      fetchArtists();
      message.success('Artiste supprimé avec succès');
    } catch (error) {
      message.error('Une erreur est survenue');
    }
  };

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  return {
    artistList,
    isModalVisible,
    control,
    handleSubmit,
    watchImage,
    handleOpenModal,
    handleCloseModal,
    onSubmit,
    deleteArtist,
  };
};
