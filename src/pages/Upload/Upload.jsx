import { Button, Card, Input, Select, Upload } from 'antd';
import { Controller } from 'react-hook-form';

import { Buffer } from 'buffer';
import process from 'process';
import { useUpload } from './useUpload';
window.process = process;
window.Buffer = Buffer;

const UploadFile = () => {
  const {
    loading,
    fileList,
    audioUrl,
    artistList,
    handleUpload,
    handleChangeFile,
    customRequest,
    onSubmit,
    getAlbumsForArtist,
    handleSubmit,
    watchArtist,
    audioRef,
    control,
  } = useUpload();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card
        style={{
          minWidth: '500px',
        }}
      >
        <Controller
          name='name'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <Input {...field} placeholder='Nom du morceau' />
          )}
        />

        <Controller
          name='artist'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <Select
              {...field}
              placeholder='Artiste'
              style={{
                width: '100%',
                margin: '20px 0',
              }}
            >
              {artistList.map(artist => (
                <Select.Option key={artist._id} value={artist._id}>
                  {artist.name}
                </Select.Option>
              ))}
            </Select>
          )}
        />

        {watchArtist && (
          <Controller
            name='album'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Select
                {...field}
                style={{
                  width: '100%',
                  margin: '0 0 20px 0',
                }}
                placeholder='Album'
              >
                {/* Replace this with your actual list of albums for the selected artist */}
                {getAlbumsForArtist(watchArtist).map(album => (
                  <Select.Option key={album._id} value={album._id}>
                    {album.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
        )}

        <Controller
          name='track'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <Upload
              {...field}
              // fileList={field.value ? [field.value] : []}
              accept='audio/mp3'
              beforeUpload={handleUpload}
              fileList={fileList}
              customRequest={customRequest}
              onChange={handleChangeFile}
            >
              <Button type='default'>Cliquez pour télécharger</Button>
            </Upload>
          )}
        />
        {audioUrl && (
          <audio controls style={{ marginTop: '20px' }} ref={audioRef}>
            <source src={audioUrl} type='audio/mp3' />
            Votre navigateur ne supporte pas l&apos;élément audio.
          </audio>
        )}

        <Button
          loading={loading}
          type='primary'
          onClick={handleSubmit(onSubmit)}
          style={{
            marginTop: '20px',
          }}
        >
          Envoyer
        </Button>
      </Card>
    </div>
  );
};

export default UploadFile;
