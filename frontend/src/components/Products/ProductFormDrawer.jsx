import React from 'react';
import { Drawer, Form, Row, Col, Input, Button, Space } from 'antd';

const ProductFormDrawer = ({ open, onClose, form, onFinish, editingId, isLoading }) => {
  return (
    <Drawer
      title={editingId ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
      size={720}
      onClose={onClose}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={onClose}>Hủy</Button>
          <Button onClick={() => form.submit()} type="primary" loading={isLoading}>
            {editingId ? "Lưu thay đổi" : "Submit"}
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Tên sản phẩm"
              rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
            >
              <Input placeholder="Nhập tên sản phẩm" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="price"
              label="Giá"
              rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
            >
              <Input placeholder="Nhập giá sản phẩm" type="number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="quantity"
              label="Số lượng"
              rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
            >
              <Input placeholder="Nhập số lượng" type="number" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default ProductFormDrawer;
