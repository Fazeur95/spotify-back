import React, { useEffect } from 'react';
import { useAlbum } from './useAlbum';
import { Button, Card, Table, message } from 'antd';
import AlbumAdd from './Add/AlbumAdd';

const AlbumPage = () => {
  const { albumList, error, fetchAlbum, loading, deleteAlbum } = useAlbum();

  console.log(albumList);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      width: '10%',
      render: (text, record) => (
        <img
          // src={record.imageUrl}
          alt={record.name}
          style={{ width: '50px', height: '50px', borderRadius: '10%' }}
        />
      ),
    },
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <a style={{ verticalAlign: 'middle' }} href={`/album/${record._id}`}>
          {record.name}
        </a>
      ),
    },
    {
      title: 'Artiste',
      dataIndex: 'artist',
      key: 'artist',
      render: (text, record) => (
        <div style={{ verticalAlign: 'middle' }}>{record?.artist?.name}</div>
      ),
    },
    {
      title: 'Actions',
      key: 'action',
      width: '10%',
      render: (text, record) => (
        <>
          <Button
            type='default'
            onClick={e => {
              e.preventDefault();
              console.log(record);
            }}
          >
            Modifier
          </Button>
          <Button
            danger
            type='link'
            onClick={e => {
              e.preventDefault();
              deleteAlbum(record._id);
            }}
          >
            Supprimer
          </Button>
        </>
      ),
    },
  ];

  return (
    <Card>
      <div>AlbumPage</div>
      <AlbumAdd fetchAlbum={fetchAlbum} />
      <Table
        columns={columns}
        dataSource={albumList}
        rowKey={'_id'}
        size='small'
        pagination={{
          pageSize: 7,
        }}
      />
    </Card>
  );
};

export default AlbumPage;
