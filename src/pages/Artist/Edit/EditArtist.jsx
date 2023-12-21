import { Card, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const EditArtist = () => {
  const { id } = useParams();

  const [artist, setArtist] = useState(null);

  const fetchArtist = async id => {
    try {
      const response = await fetch(
        `https://spotify-api-43ur.onrender.com/api/artist/${id}`
      );
      const data = await response.json();
      setArtist(data);
    } catch (error) {
      message.error("Erreur lors de la récupération de l'artiste");
    }
  };

  useEffect(() => {
    fetchArtist(id);
  }, [id]);

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <h2>{artist.name}</h2>
      <h3>Liste des albums</h3>
      <Table
        dataSource={artist.albums}
        rowKey='_id'
        size='small'
        columns={[
          {
            title: 'Titre',
            dataIndex: 'name',
            render: (text, record) => (
              <Link to={`/album/${record._id}`}>{record.name}</Link>
            ),
          },
        ]}
      />
    </Card>
  );
};

export default EditArtist;
