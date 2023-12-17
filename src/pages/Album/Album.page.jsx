import React, { useEffect } from 'react';
import { useAlbum } from './useAlbum';
import { Button, Card, Table, message } from 'antd';
import AlbumAdd from './Add/AlbumAdd';

const AlbumPage = () => {
  const { albumList, error, fetchAlbum, loading } = useAlbum();

  console.log(albumList);

  const deleteAlbum = async id => {
    const response = await fetch(`http://localhost:6868/api/album/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          message.success('Album supprimé avec succès');
          fetchAlbum();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

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
          <a
            onClick={e => {
              e.preventDefault();
              console.log(record);
            }}
          >
            Modifier
          </a>
          <a
            onClick={e => {
              e.preventDefault();
              deleteAlbum(record._id);
            }}
          >
            Supprimer
          </a>
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
