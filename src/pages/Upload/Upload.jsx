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
    checkIfOrderExists,
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
                  Click or drag file to this area to upload
                </p>
                <p className='ant-upload-hint'>
                  Support for a single or bulk upload.
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
                render={({ field }) => (
                  <Form.Item
                    label='Nom du morceau'
                    style={{
                      width: '60%',
                    }}
                  >
                    <Input {...field} placeholder='Nom du morceau' />
                  </Form.Item>
                )}
              />
              <Controller
                name='order'
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <Form.Item label='Ordre du morceau'>
                    <InputNumber {...field} placeholder='Ordre du morceau' />
                  </Form.Item>
                )}
              />
            </Flex>

            <Controller
              name='artist'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <Form.Item label='Artiste'>
                  <Select
                    {...field}
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
                render={({ field }) => (
                  <Form.Item label="Album de l'artiste">
                    <Select
                      {...field}
                      style={{
                        width: '100%',
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
                  </Form.Item>
                )}
              />
            )}
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
                    Click or drag file to this area to upload
                  </p>
                  <p className='ant-upload-hint'>
                    Support for a single or bulk upload.
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
              onClick={handleSubmit(onSubmit)}
              style={{
                marginTop: '20px',
              }}
            >
              Envoyer
            </Button>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default UploadFile;
