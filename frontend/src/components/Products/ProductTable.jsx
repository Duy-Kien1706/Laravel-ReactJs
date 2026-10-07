import React from 'react';
import { Table, Space, Popconfirm, Button } from 'antd';

const ProductTable = ({ products, loading, onEdit, onDelete, isAdmin }) => {
  const baseColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${Number(price).toLocaleString()} đ`,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    }
  ];

  const actionColumn = {
    title: "Action",
    render: (_, record) => (
      <Space size="middle">
        <Popconfirm
          title="Xóa sản phẩm"
          description="Bạn có chắc chắn muốn xóa sản phẩm này không?"
          onConfirm={() => onDelete(record.id)}
          okText="Có"
          cancelText="Không"
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
        <Button onClick={() => onEdit(record)}>Sửa</Button>
      </Space>
    ),
  };

  const columns = isAdmin ? [...baseColumns, actionColumn] : baseColumns;

  return (
    <Table
      dataSource={products}
      columns={columns}
      rowKey="id"
      loading={loading}
    />
  );
};

export default ProductTable;
