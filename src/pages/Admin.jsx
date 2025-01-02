import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers } from '../Redux/LoginReducer/action';
import { getProducts } from '../Redux/productReducer/action';
import Cookies from 'js-cookie';
import Sidebar from '../Component/Sidebar';

const Admin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users } = useSelector(state => state.auth);
    const { products } = useSelector(state => state.products);

    useEffect(() => {
        // Check authentication
        const token = Cookies.get('token');
        const user = Cookies.get('user');

        if (!token || !user) {
            navigate('/');
            return;
        }

        try {
            const userData = JSON.parse(user);
            if (userData.role !== 'admin') {
                navigate('/unauthorized');
                return;
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            navigate('/');
            return;
        }

        // Fetch data
        dispatch(getUsers());
        dispatch(getProducts());
    }, [dispatch, navigate]);

    return (
        <div className="container-fluid position-relative d-flex p-0">
            <Sidebar />
            <div className="content">
                <div className="container-fluid pt-4 px-4">
                    {/* Users Section */}
                    <div className="bg-secondary text-center rounded p-4 mb-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h6 className="mb-0">Recent Users</h6>
                            <Link to="/users">Show All</Link>
                        </div>
                        <div className="table-responsive">
                            <table className="table text-start align-middle table-bordered table-hover mb-0">
                                <thead>
                                    <tr className="text-white">
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.slice(0, 5).map(user => (
                                        <tr key={user._id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="bg-secondary text-center rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h6 className="mb-0">Recent Products</h6>
                            <Link to="/products">Show All</Link>
                        </div>
                        <div className="table-responsive">
                            <table className="table text-start align-middle table-bordered table-hover mb-0">
                                <thead>
                                    <tr className="text-white">
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.slice(0, 5).map(product => (
                                        <tr key={product._id}>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.category}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;