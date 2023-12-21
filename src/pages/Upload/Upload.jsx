import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from 'antd';
import { Controller } from 'react-hook-form';
import { InboxOutlined } from '@ant-design/icons';

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
        {fileList.length === 0 ? (
          <Controller
            name='track'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Upload.Dragger
                {...field}
                // fileList={field.value ? [field.value] : []}
                accept='audio/mp3'
                beforeUpload={handleUpload}
                fileList={fileList}
                customRequest={customRequest}
                onChange={({ file }) => {
                  handleChangeFile(file);
                }}
                onDrop={e => {
                  handleChangeFile(e.dataTransfer.files[0]);
                }}
              >
                <p className='ant-upload-drag-icon'>
                  <InboxOutlined />
                </p>
                <p className='ant-upload-text'>
                  Cliquez ou déposez le fichier audio ici
                </p>
                <p className='ant-upload-hint'>
                  Supporte uniquement les fichiers mp3.
                </p>
              </Upload.Dragger>
            )}
          />
        ) : (
          <Form layout='vertical'>
            <Flex gap={16}>
              <Controller
                name='name'
                control={control}
                defaultValue=''
                rules={{
                  required: 'Veuillez entrer le nom du morceau',
                }}
                render={({ field, fieldState: { error } }) => (
                  <Form.Item
                    label='Nom du morceau'
                    style={{
                      width: '60%',
                    }}
                    help={error?.message}
                  >
                    <Input
                      {...field}
                      placeholder='Nom du morceau'
                      status={error ? 'error' : undefined}
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name='order'
                control={control}
                defaultValue={0}
                rules={{
                  required: "Veuillez entrer l'ordre du morceau",
                }}
                render={({ field, fieldState: { error } }) => (
                  <Form.Item
                    label='Ordre du morceau'
                    style={{
                      width: '40%',
                    }}
                    help={error?.message}
                  >
                    <InputNumber
                      {...field}
                      placeholder='Ordre du morceau'
                      status={error ? 'error' : undefined}
                    />
                  </Form.Item>
                )}
              />
            </Flex>

            <Controller
              name='artist'
              control={control}
              rules={{
                required: 'Veuillez choisir un artiste',
              }}
              defaultValue=''
              render={({ field, fieldState: { error } }) => (
                <Form.Item label='Artiste' help={error?.message}>
                  <Select
                    {...field}
                    status={error ? 'error' : undefined}
                    placeholder='Artiste'
                    style={{
                      width: '100%',
                    }}
                  >
                    {artistList.map(artist => (
                      <Select.Option key={artist._id} value={artist._id}>
                        {artist.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            />

            {watchArtist && (
              <Controller
                name='album'
                control={control}
                defaultValue=''
                rules={{ required: 'Veuillez choisir un album' }}
                render={({ field, fieldState: { error } }) => (
                  <Form.Item label="Album de l'artiste" help={error?.message}>
                    <Select
                      {...field}
                      style={{
                        width: '100%',
                      }}
                      status={error ? 'error' : undefined}
                      placeholder='Album'
                    >
                      {/* Replace this with your actual list of albums for the selected artist */}
                      {getAlbumsForArtist(watchArtist).map(album => (
                        <Select.Option key={album._id} value={album._id}>
                          {album.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
              />
            )}
            <Controller
              name='track'
              control={control}
              defaultValue=''
              rules={{
                required: 'Veuillez choisir un fichier audio',
              }}
              render={({ field }) => (
                <Upload.Dragger
                  {...field}
                  // fileList={field.value ? [field.value] : []}
                  accept='audio/mp3'
                  beforeUpload={handleUpload}
                  fileList={fileList}
                  customRequest={customRequest}
                  onChange={({ file }) => {
                    handleChangeFile(file);
                  }}
                  onDrop={e => {
                    handleChangeFile(e.dataTransfer.files[0]);
                  }}
                >
                  <p className='ant-upload-drag-icon'>
                    <InboxOutlined />
                  </p>
                  <p className='ant-upload-text'>
                    Cliquez ou déposez le fichier audio ici
                  </p>
                  <p className='ant-upload-hint'>
                    Supporte uniquement les fichiers mp3.
                  </p>
                </Upload.Dragger>
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
              block
              onClick={handleSubmit(onSubmit)}
              style={{
                marginTop: '20px',
              }}
            >
              Enregistrer le morceau
            </Button>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default UploadFile;
