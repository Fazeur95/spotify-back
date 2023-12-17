import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router';
import './root.css';
import SpotifyLogo from '../../assets/Spotify_logo_without_text.svg.png'; // Assurez-vous d'importer le logo de Spotify

const { Content, Footer, Sider } = Layout;

function LayoutRoot() {
  const onClick = e => {
    console.log('click ', e);
  };

  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{ background: '#2c2c2c' }}>
        {' '}
        {/* Couleur de fond Spotify */}
        <div className='logo'>
          <img src={SpotifyLogo} alt='Logo spotify' /> {/* Logo Spotify */}
        </div>
        <div className='divider'></div>
        <Menu
          defaultSelectedKeys={['1']}
          onClick={onClick}
          mode='inline'
          style={{
            background: 'transparent',
          }}
          items={[
            {
              key: '1',
              style: {
                color: 'white',
              },
              onClick: () => {
                navigate('/');
              },
              label: 'Ajouter un morceau',
            },
            {
              key: '2',
              style: {
                color: 'white',
              },
              onClick: () => {
                navigate('/artist');
              },
              label: 'Gestion des artistes',
            },
            {
              key: '3',
              style: {
                color: 'white',
              },
              onClick: () => {
                navigate('/album');
              },
              label: 'Gestion des albums',
            },
            {
              key: '4',
              style: {
                color: 'white',
              },
              onClick: () => {
                navigate('/track');
              },
              label: 'Gestion des morceaux',
            },
          ]}
        />
      </Sider>
      <Layout className='site-layout'>
        <Content style={{ margin: '0 16px' }}>
          <div
            className='site-layout-background'
            style={{ padding: 24, minHeight: 360 }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Spotify ©</Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutRoot;
