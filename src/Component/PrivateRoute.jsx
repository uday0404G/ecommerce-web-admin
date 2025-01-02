import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
    const { isAuth, user } = useSelector(state => state.auth);
    const location = useLocation();
    
    // Check both Redux state and cookies
    const token = Cookies.get('token');
    const isAuthenticated = isAuth || !!token;

    if (!isAuthenticated) {
        // Save the attempted URL for redirecting after login
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // Check for admin role
    const userFromCookie = Cookies.get('user');
    const userData = userFromCookie ? JSON.parse(userFromCookie) : user;
    
    if (!userData?.role || userData.role !== 'admin') {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default PrivateRoute; 