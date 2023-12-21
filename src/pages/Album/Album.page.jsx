import { useMemo } from 'react';
import { useAlbum } from './useAlbum';
import { Button, Card, Flex, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AlbumAdd from './Add/AlbumAdd';
import PageTitle from '../../components/PageTitle';

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
            src={record.imageUrl}
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
          <Flex gap={8}>
            <Button
              onClick={e => {
                e.preventDefault();
              }}
              icon={<EditOutlined />}
            />
            <Button
              danger
              onClick={e => {
                e.preventDefault();
                deleteAlbum(record._id);
              }}
              icon={<DeleteOutlined />}
            />
          </Flex>
        ),
      },
    ],
    [deleteAlbum]
  );

  return (
    <Card>
      <PageTitle>Liste des albums</PageTitle>
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
