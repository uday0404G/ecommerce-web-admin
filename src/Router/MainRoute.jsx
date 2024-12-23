import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from '../pages/Admin';
import Product from '../pages/Product';
import AddProduct from '../pages/AddProduct';
import Signup from '../pages/Signup';
import Users from '../pages/Users';
import EditProduct from '../pages/Edit';
import Error from '../Component/Eroor';


const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/Product" element={<Product />} />
      <Route path="/AddProduct" element={<AddProduct />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Users" element={<Users />} />
      <Route path="/Edit/:id" element={<EditProduct />} />

      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default MainRoute;
