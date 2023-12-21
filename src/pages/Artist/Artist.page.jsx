import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  Modal,
  Popconfirm,
  Table,
  Upload,
  message,
} from 'antd';

import './Artist.css';
import { Controller } from 'react-hook-form';
import { useArtists } from './Artist.hook';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';

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
          src={record.imageUrl}
          alt={record.name}
          loading='lazy'
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
      ),
    },
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link style={{ verticalAlign: 'middle' }} to={'/artist/' + record._id}>
          {record.name}
        </Link>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (text, record) => (
        <Flex gap={8}>
          <Button
            onClick={e => {
              e.preventDefault();
            }}
            icon={<EditOutlined />}
          />

          <Popconfirm
            title='Êtes-vous sûr de vouloir supprimer cet artiste ?'
            onConfirm={() => {
              deleteArtist(record._id);
            }}
            okText='Oui'
            cancelText='Non'
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <Card>
      <PageTitle>Liste des artistes</PageTitle>
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
    </Card>
  );
};

export default ArtistPage;
