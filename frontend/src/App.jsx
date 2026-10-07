// import { useEffect, useState } from "react";
// import axios from "axios";

// function App() {

//     const [products, setProducts] = useState([]);

//     const [name, setName] = useState("");
//     const [price, setPrice] = useState("");
//     const [quantity, setQuantity] = useState("");

//     useEffect(() => {
//         getProducts();
//     }, []);

//     const getProducts = async () => {
//         try {
//             const response = await axios.get(
//                 "http://127.0.0.1:8000/api/products"
//             );

//             setProducts(response.data.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const addProduct = async () => {

//         try {

//             await axios.post(
//                 "http://127.0.0.1:8000/api/products",
//                 {
//                     name: name,
//                     price: price,
//                     quantity: quantity
//                 }
//             );

//             alert("Thêm sản phẩm thành công");

//             setName("");
//             setPrice("");
//             setQuantity("");

//             getProducts();

//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <div style={{ padding: "30px" }}>

//             <h1>Quản lý sản phẩm</h1>

//             <hr />

//             <h2>Thêm sản phẩm</h2>

//             <div>
//                 <input
//                     type="text"
//                     placeholder="Tên sản phẩm"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />
//             </div>

//             <br />

//             <div>
//                 <input
//                     type="number"
//                     placeholder="Giá"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                 />
//             </div>

//             <br />

//             <div>
//                 <input
//                     type="number"
//                     placeholder="Số lượng"
//                     value={quantity}
//                     onChange={(e) => setQuantity(e.target.value)}
//                 />
//             </div>

//             <br />

//             <button onClick={addProduct}>
//                 Thêm sản phẩm
//             </button>

//             <hr />

//             <h2>Danh sách sản phẩm</h2>

//             {products.map((product) => (
//                 <div key={product.id}>

//                     <h3>{product.name}</h3>

//                     <p>
//                         Giá: {product.price}
//                     </p>

//                     <p>
//                         Số lượng: {product.quantity}
//                     </p>

//                 </div>
//             ))}

//         </div>
//     );
// }

// export default App;

import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import { Routes, Route } from 'react-router-dom';
import AppSidebar from './components/Layout/AppSidebar';
import AppHeader from './components/Layout/AppHeader';
import Products from './components/Products/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/Layout/PrivateRoute';

const { Content } = Layout;

const MainApp = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSidebar collapsed={collapsed} />
      <Layout>
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/" element={<Products />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={
        <PrivateRoute>
          <MainApp />
        </PrivateRoute>
      } />
    </Routes>
  );
};

export default App;