import React, { useContext } from 'react';
import { Layout, Button, theme, Space } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons';
import { AuthContext } from '../../contexts/AuthContext';

const { Header } = Layout;

const AppHeader = ({ collapsed, setCollapsed }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { user, logout } = useContext(AuthContext);

  return (
    <Header style={{ padding: '0 16px', background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      
      {user && (
        <Space>
          <span>Xin chào, <b>{user.name}</b> ({user.role})</span>
          <Button type="text" icon={<LogoutOutlined />} onClick={logout}>Đăng xuất</Button>
        </Space>
      )}
    </Header>
  );
};

export default AppHeader;
