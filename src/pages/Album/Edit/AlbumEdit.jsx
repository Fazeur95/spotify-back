import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AlbumEditForm from './Form/AlbumEditForm';
import { Card, Table } from 'antd';
import AlbumTable from '../components/AlbumTable';

const AlbumEdit = () => {
  const { id } = useParams();

  const [album, setAlbum] = useState(null);

  const fetchAlbum = async id => {
    try {
      const response = await fetch(`http://localhost:6868/api/album/${id}`);
      const data = await response.json();
      setAlbum(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAlbum(id);
  }, [id]);

  if (!album) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <h1>Edition d&apos;un album</h1>
      <AlbumEditForm album={album} />
      <AlbumTable
        tracks={album.tracks}
        albumId={album._id}
        artist={album?.artist}
      />
    </Card>
  );
};

export default AlbumEdit;
