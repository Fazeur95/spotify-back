// useUpload.js
import { useCallback, useEffect, useRef, useState } from 'react';
import { message } from 'antd';
import * as mm from 'music-metadata-browser';
import { useForm } from 'react-hook-form';

export const useUpload = () => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);

  const [artistList, setArtistList] = useState([]);

  const { control, handleSubmit, watch, setValue, reset } = useForm();

  const watchArtist = watch('artist');

  const handleUpload = file => {
    setFileList([file]);
    // const url = URL.createObjectURL(file);
    // setAudioUrl(url);
    return false;
  };

  const checkIfOrderExists = (artist, order) => {
    const albumToCheck = artist.albums.find(album => album._id === album);
    const trackToCheck = albumToCheck.tracks.find(
      track => track.order === order
    );
    return trackToCheck ? true : false;
  };

  const getArtistByName = name => {
    const artist = artistList.find(
      artist => artist.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
    return artist;
  };

  const getAlbumByName = (artist, name) => {
    const album = artist?.albums.find(album => {
      return album.name.toLowerCase() === name.toLowerCase();
    });
    return album ? album._id : null;
  };

  const handleChangeFile = async file => {
    const metadata = await mm.parseBlob(file);
    const title = metadata.common.title;
    const artistTag = metadata.common.albumartist;
    const albumName = metadata.common.album;
    const trackNumber = metadata.common.track.no;

    const artist = getArtistByName(artistTag);

    const albumId = getAlbumByName(artist, albumName);

    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    setFileList([file]);

    // Assuming you're using react-hook-form
    setValue('artist', artist._id);

    setValue('name', title);
    setValue('album', albumId);
    setValue('track', file);
    setValue('order', trackNumber);
  };

  const customRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const fetchArtist = async () => {
    const response = await fetch(
      'http://localhost:6868/api/artist?populate=true'
    );
    const data = await response.json();
    setArtistList(data);
  };

  const uploadTrackRequest = async body => {
    const formData = new FormData();

    formData.append('name', body.name);
    formData.append('artist', body.artist);
    formData.append('album', body.album);
    formData.append('track', body.track);

    const response = await fetch('http://localhost:6868/api/track', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  };

  const getAlbumsForArtist = useCallback(
    artistId => {
      const artist = artistList.find(artist => artist._id === artistId);
      return artist ? artist.albums : [];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [watchArtist, artistList]
  );

  useEffect(() => {
    fetchArtist();
  }, []);

  useEffect(() => {
    if (watchArtist) {
      getAlbumsForArtist(watchArtist);
    }
  }, [watchArtist, getAlbumsForArtist]);

  const onSubmit = data => {
    const hide = message.loading('Ajout en cours ...', 0);
    setLoading(true);
    uploadTrackRequest(data)
      .then(() => {
        hide();

        message.success('Morceau créé avec succès');

        setFileList([]);
        setAudioUrl(null);
        setLoading(false);

        reset();
      })
      .catch(error => {
        hide();
        message.error(error.message);
        setLoading(false);
      });
  };

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [audioUrl]);

  return {
    loading,
    fileList,
    audioUrl,
    artistList,
    audioRef,
    handleUpload,
    getArtistByName,
    getAlbumByName,
    handleChangeFile,
    customRequest,
    fetchArtist,
    uploadTrackRequest,
    getAlbumsForArtist,
    onSubmit,
    control,
    handleSubmit,
    watchArtist,
    checkIfOrderExists,
  };
};
