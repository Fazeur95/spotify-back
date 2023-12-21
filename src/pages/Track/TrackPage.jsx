import { useMemo } from 'react';
import { Button, Card, Flex, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useTrack } from './useTrack';

import styles from './TrackPage.module.css';
import PageTitle from '../../components/PageTitle';

const TrackPage = () => {
  const { trackList, loading, fetchTracks, deleteTrack } = useTrack();

  const columns = useMemo(
    () => [
      {
        title: 'Nom',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Album',
        dataIndex: 'album',
        key: 'album',
        render: (text, record) => (
          <a style={{ verticalAlign: 'middle' }} href={`/album/${record._id}`}>
            {record?.album?.name}
          </a>
        ),
      },
      {
        title: 'Artiste',
        dataIndex: 'track.artist.name',
        key: 'track.artist.name',
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
                deleteTrack(record._id);
              }}
              icon={<DeleteOutlined />}
            />
          </Flex>
        ),
      },
    ],
    [deleteTrack]
  );

  return (
    <Card>
      <PageTitle>Liste des morceaux</PageTitle>
      <Table
        loading={loading}
        columns={columns}
        dataSource={trackList}
        rowKey={'_id'}
        size='small'
        pagination={{
          pageSize: 7,
        }}
      />
    </Card>
  );
};

export default TrackPage;
