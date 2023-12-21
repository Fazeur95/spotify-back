import { Button, Form, Input, Select, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const AlbumEditForm = ({ album }) => {
  const { control, watch } = useForm({
    defaultValues: {
      name: album.name,
      artist: album.artist._id,
      image: '',
      imageUrl: album.imageUrl,
    },
  });

  const watchImage = watch('image');

  // console.log(watchImage);

  const [artistList, setArtistList] = useState([]);

  useEffect(() => {
    const fetchArtist = async () => {
      const response = await fetch('http://localhost:6868/api/artist');
      const data = await response.json();
      setArtistList(data);
    };
    fetchArtist();
  }, []);

  const customRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  return (
    <Form>
      <Controller
        name='name'
        control={control}
        render={({ field }) => (
          <Form.Item>
            <Input {...field} placeholder="Nom de l'album" />
          </Form.Item>
        )}
      />

      <Controller
        name='artist'
        control={control}
        render={({ field }) => (
          <Form.Item>
            <Select {...field} placeholder='Artiste'>
              {artistList.map(artist => (
                <Select.Option key={artist._id} value={artist._id}>
                  {artist.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
      />

      <Controller
        name='image'
        control={control}
        // rules={{ required: true }}
        defaultValue=''
        render={({ field }) => (
          <Form.Item label='Image'>
            <Upload
              {...field}
              fileList={field.value ? [field.value] : []}
              beforeUpload={file => {
                if (file.type === 'image/jpeg') {
                  return true;
                }

                if (file.type === 'image/png') {
                  return true;
                }

                if (file.type === 'image/jpg') {
                  return true;
                }

                if (file.type === 'image/webp') {
                  return true;
                }

                message.error(
                  'Le fichier doit être au format jpeg, jpg, png ou webp'
                );
                return false;
              }}
              onChange={info => {
                field.onChange(info.file.originFileObj);
              }}
              customRequest={customRequest}
            >
              <Button type='primary'>Modifier image</Button>
            </Upload>
          </Form.Item>
        )}
      />
      {!watchImage && (
        <img
          // src={album.imageUrl}
          alt='preview'
          style={{ width: '200px', height: '200px', margin: '0 auto' }}
        />
      )}
    </Form>
  );
};

export default AlbumEditForm;
