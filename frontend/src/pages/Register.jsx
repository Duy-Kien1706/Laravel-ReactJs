import React, { useContext, useState } from 'react';
import { Form, Input, Button, Card, message, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      
      login(response.data.user, response.data.access_token);
      message.success('Đăng ký thành công!');
      navigate('/');
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || 'Đăng ký thất bại, email có thể đã tồn tại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={3}>Đăng ký tài khoản</Title>
        </div>
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập Tên!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Họ và tên" size="large" />
          </Form.Item>
          
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập Email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập Mật khẩu!' }, { min: 8, message: 'Mật khẩu phải từ 8 ký tự!' }]}
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
              Đăng ký
            </Button>
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <Text>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></Text>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
