import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutRoot from './routes/layout/root.jsx';
import ErrorElement from './pages/Error/ErrorElement.jsx';
import ArtistPage from './pages/Artist/Artist.page.jsx';
import { ConfigProvider, theme } from 'antd';
import UploadPage from './pages/Upload/Upload.jsx';
import './index.css';
import AlbumPage from './pages/Album/Album.page.jsx';
import EditAlbum from './pages/Artist/Edit/EditAlbum.jsx';
import AlbumEdit from './pages/Album/Edit/AlbumEdit.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorElement />,
    element: <LayoutRoot />,
    children: [
      {
        path: '/',
        element: <UploadPage />,
      },
      {
        path: '/artist',
        element: <ArtistPage />,
      },
      {
        path: '/album',
        element: <AlbumPage />,
      },
      {
        path: '/album/:id',
        element: <AlbumEdit />,
      },
      {
        path: '/track',
        element: <div>Track</div>,
      },
      {
        path: '*',
        element: <ErrorElement />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        // 1. Use dark algorithm
        algorithm: theme.darkAlgorithm,

        // 2. Combine dark algorithm and compact algorithm
        // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        token: {
          colorPrimary: '#1db954',
          colorInfo: '#1db954',
          colorSuccess: '#14e615',
          colorBgBase: '#2c2c2c',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
