import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Popover,
  Table,
  Upload,
  message,
} from 'antd';

import './Artist.css';
import { Controller } from 'react-hook-form';
import { useArtists } from './Artist.hook';

const ArtistPage = () => {
  const {
    artistList,
    handleCloseModal,
    handleOpenModal,
    isModalVisible,
    onSubmit,
    watchImage,
    handleSubmit,
    control,
    deleteArtist,
  } = useArtists();

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'imageUrl',
      width: '10%',
      render: (text, record) => (
        <img
          // src={record.imageUrl}
          alt={record.name}
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
      ),
    },
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <a style={{ verticalAlign: 'middle' }}>{record.name}</a>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (text, record) => (
        <>
          <a
            onClick={e => {
              e.preventDefault();
              console.log(record);
            }}
          >
            Modifier
          </a>

          <Button>
            <Popconfirm
              title='Êtes-vous sûr de vouloir supprimer cet artiste ?'
              onConfirm={() => {
                deleteArtist(record._id);
              }}
              okText='Oui'
              cancelText='Non'
            >
              Supprimer
            </Popconfirm>
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <h2>Gestion des artists</h2>
      <Button type='primary' className='button' onClick={handleOpenModal}>
        Ajouter un artiste
      </Button>
      <Modal
        title='Ajouter un artiste'
        open={isModalVisible}
        onCancel={handleCloseModal}
        onOk={handleSubmit(onSubmit)}
        destroyOnClose
      >
        <Form>
          <Controller
            name='name'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Form.Item label='Nom'>
                <Input {...field} />
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
                >
                  <Button type='primary'>Télécharger</Button>
                </Upload>
              </Form.Item>
            )}
          />
          {watchImage && (
            <img
              src={URL.createObjectURL(watchImage)}
              alt='preview'
              style={{ width: '200px', height: '200px', margin: '0 auto' }}
            />
          )}
        </Form>
      </Modal>
      <Table columns={columns} dataSource={artistList} size='small' />
    </>
  );
};

export default ArtistPage;