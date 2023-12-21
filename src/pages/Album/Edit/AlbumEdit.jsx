import { useEffect, useState, memo } from 'react';
import { useParams } from 'react-router';
import AlbumEditForm from './Form/AlbumEditForm';
import { Card, message } from 'antd';
import AlbumTable from '../components/AlbumTable';

const AlbumEdit = () => {
  const { id } = useParams();

  const [album, setAlbum] = useState(null);

  const fetchAlbum = async id => {
    try {
      const response = await fetch(
        `https://spotify-api-43ur.onrender.com/api/album/${id}`
      );
      const data = await response.json();
      setAlbum(data);
    } catch (error) {
      message.error("Erreur lors de la récupération de l'album");
    }
  };

  useEffect(() => {
    fetchAlbum(id);
  }, [id]);

  if (!album) {
    return <div>Loading...</div>;
  }

  const MemoizedAlbumEditForm = memo(AlbumEditForm);
  const MemoizedAlbumTable = memo(AlbumTable);

  return (
    <Card>
      <h1>Edition d&apos;un album</h1>
      <MemoizedAlbumEditForm album={album} />
      <MemoizedAlbumTable
        tracks={album.tracks}
        albumId={album._id}
        artist={album?.artist}
      />
    </Card>
  );
};

export default AlbumEdit;
