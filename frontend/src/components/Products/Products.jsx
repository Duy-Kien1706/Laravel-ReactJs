import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Button, message, Form } from 'antd';
import ProductTable from './ProductTable';
import ProductFormDrawer from './ProductFormDrawer';
import { AuthContext } from '../../contexts/AuthContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form] = Form.useForm();
  
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products');
      setProducts(response.data.data);
    } catch (error) {
      console.error(error);
      message.error('Không thể tải danh sách sản phẩm!');
    } finally {
      setLoading(false);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    form.resetFields();
    setEditingId(null);
  };

  const handleAddOrEditProduct = async (values) => {
    setIsLoading(true);
    try {
      if (editingId) {
        await axios.put(`http://127.0.0.1:8000/api/products/${editingId}`, {
          name: values.name,
          price: values.price,
          quantity: values.quantity,
        });
        message.success('Cập nhật sản phẩm thành công!');
      } else {
        await axios.post('http://127.0.0.1:8000/api/products', {
          name: values.name,
          price: values.price,
          quantity: values.quantity,
        });
        message.success('Thêm sản phẩm thành công!');
      }
      onClose();
      getProducts();
    } catch (error) {
      console.error(error);
      message.error(editingId ? 'Cập nhật sản phẩm thất bại!' : 'Thêm sản phẩm thất bại!');
    } finally {
       setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
      message.success('Xóa sản phẩm thành công!');
      getProducts();
    } catch (error) {
      console.error(error);
      message.error('Xóa sản phẩm thất bại!');
    }
  };

  const handleEditProduct = (record) => {
    setEditingId(record.id);
    form.setFieldsValue({
      name: record.name,
      price: record.price,
      quantity: record.quantity,
    });
    setOpen(true);
  };

  return (
    <>
      {isAdmin && (
        <Button type="primary" onClick={showDrawer} style={{ marginBottom: 16 }}>
          Thêm sản phẩm
        </Button>
      )}

      <ProductFormDrawer 
        open={open} 
        onClose={onClose} 
        form={form} 
        onFinish={handleAddOrEditProduct} 
        editingId={editingId} 
        isLoading={isLoading} 
      />

      <ProductTable 
        products={products} 
        loading={loading} 
        onEdit={handleEditProduct} 
        onDelete={handleDeleteProduct} 
        isAdmin={isAdmin}
      />
    </>
  );
};

export default Products;
