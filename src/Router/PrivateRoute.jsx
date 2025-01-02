import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { isAuth, user } = useSelector(state => state.auth);

    if (!isAuth) {
        return <Navigate to="/" />;
    }

    if (user?.role !== 'admin') {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default PrivateRoute;