import { useMemo } from 'react';
import { useAlbum } from './useAlbum';
import { Button, Card, Table } from 'antd';
import AlbumAdd from './Add/AlbumAdd';

const AlbumPage = () => {
  const { albumList, fetchAlbum, loading, deleteAlbum } = useAlbum();

  const columns = useMemo(
    () => [
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
    ],
    [deleteAlbum]
  );

  return (
    <Card>
      <div>AlbumPage</div>
      <AlbumAdd fetchAlbum={fetchAlbum} />
      <Table
        loading={loading}
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
