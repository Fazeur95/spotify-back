import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const EditAlbum = () => {
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
    <div>
      <h1>{album.name}</h1>
    </div>
  );
};

export default EditAlbum;
