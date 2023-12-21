/* eslint-disable react/prop-types */
import { Button, Modal, message } from 'antd';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import AlbumAddForm from './Form/AlbumAddForm';
import './AlbumAdd.css';

const AlbumAdd = ({ fetchAlbum }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const methods = useForm();

  const { handleSubmit } = methods;

  const createAlbumRequest = async body => {
    const response = await fetch('http://localhost:6868/api/album', {
      method: 'POST',
      body,
    });

    return response.json();
  };

  const onSubmit = data => {
    const formData = new FormData();

    //File to blob
    const blob = new Blob([data.image], { type: data.image.type });

    formData.append('name', data.name);
    formData.append('artist', data.artist);
    formData.append('image', data.image, blob);

    createAlbumRequest(formData)
      .then(() => {
        message.success('Album créé avec succès');
        fetchAlbum();
        handleClose();
      })
      .catch(() => {
        message.error("Erreur lors de la création de l'album");
      });
  };

  return (
    <>
      <Button type='primary' onClick={handleOpen} className='button'>
        Ajouter un album
      </Button>{' '}
      <Modal
        open={open}
        onCancel={handleClose}
        onOk={handleSubmit(onSubmit)}
        title='Ajouter un album'
      >
        <FormProvider {...methods}>
          <AlbumAddForm />
        </FormProvider>
      </Modal>
    </>
  );
};

export default AlbumAdd;
