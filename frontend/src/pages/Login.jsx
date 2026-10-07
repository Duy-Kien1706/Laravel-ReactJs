import React, { useContext, useState } from 'react';
import { Form, Input, Button, Card, message, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: values.email,
        password: values.password,
      });
      
      login(response.data.user, response.data.access_token);
      message.success('Đăng nhập thành công!');
      navigate('/');
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || 'Đăng nhập thất bại, vui lòng kiểm tra lại thông tin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={3}>Đăng nhập</Title>
        </div>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập Email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập Mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Mật khẩu"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} size="large" loading={loading}>
              Đăng nhập
            </Button>
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <Text>Chưa có tài khoản? <Link to="/register">Đăng ký ngay!</Link></Text>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
