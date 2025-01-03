import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import AddProduct from '../pages/AddProduct';
import EditProduct from '../pages/Edit';
import Users from '../pages/Users';
import Login from '../pages/Login';
import Error from '../Component/Eroor';
import PrivateRoute from '../Component/PrivateRoute';
import Unauthorized from '../pages/Unauthorized';
import Profile from '../pages/Profile';

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      
      <Route path="/products" element={
        <PrivateRoute>
          <Products />
        </PrivateRoute>
      } />
      
      <Route path="/add-product" element={
        <PrivateRoute>
          <AddProduct />
        </PrivateRoute>
      } />
      
      <Route path="/edit/:id" element={
        <PrivateRoute>
          <EditProduct />
        </PrivateRoute>
      } />
      
      <Route path="/users" element={
        <PrivateRoute>
          <Users />
        </PrivateRoute>
      } />

      <Route path="/profile" element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      } />

      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default MainRoute;
