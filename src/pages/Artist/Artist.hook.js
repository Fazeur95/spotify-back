// ArtistHooks.js
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

  const fetchArtists = useCallback(() => {
    fetch('http://localhost:6868/api/artist')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setArtistList(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const addArtist = data => {
    const formData = new FormData();

    //File to blob
    const blob = new Blob([data.image], { type: data.image.type });

    formData.append('name', data.name);
    formData.append('image', data.image, blob);

    fetch('http://localhost:6868/api/artist', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        return response;
      })
      .then(() => {
        fetchArtists();
        handleCloseModal();
      })
      .catch(error => {
        message.error('Une erreur est survenue');
        console.log(error);
      });
  };

  const onSubmit = data => {
    addArtist(data);
  };

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  const deleteArtist = id => {
    fetch(`http://localhost:6868/api/artist/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response;
      })
      .then(() => {
        fetchArtists();
      })
      .catch(error => {
        message.error('Une erreur est survenue');
        console.log(error);
      });
  };

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
