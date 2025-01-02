import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../Redux/LoginReducer/action';
import { getProducts } from '../Redux/productReducer/action';
import Sidebar from '../Component/Sidebar';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { users } = useSelector(state => state.auth);
    const { prodata: products } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getProducts());
    }, [dispatch]);

    const totalRevenue = products?.reduce((acc, product) => acc + (product.price * product.stock), 0);
    const lowStockProducts = products?.filter(product => product.stock < 10).length;

    return (
        <div className="container-fluid position-relative d-flex p-0">
            <Sidebar />
            <div className="content">
                <div className="container-fluid pt-4 px-4">
                    {/* Stats Cards */}
                    <div className="row g-4 mb-4">
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-line fa-3x text-primary"></i>
                                <div className="ms-3">
                                    <p className="mb-2">Total Revenue</p>
                                    <h6 className="mb-0">${totalRevenue?.toFixed(2)}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-bar fa-3x text-primary"></i>
                                <div className="ms-3">
                                    <p className="mb-2">Total Products</p>
                                    <h6 className="mb-0">{products?.length}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-area fa-3x text-primary"></i>
                                <div className="ms-3">
                                    <p className="mb-2">Low Stock Alert</p>
                                    <h6 className="mb-0">{lowStockProducts}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-pie fa-3x text-primary"></i>
                                <div className="ms-3">
                                    <p className="mb-2">Total Users</p>
                                    <h6 className="mb-0">{users?.length}</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Users */}
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
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.slice(0, 5).map(user => (
                                        <tr key={user._id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <span className={`badge ${user.isActive ? 'bg-success' : 'bg-danger'}`}>
                                                    {user.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Products */}
                    <div className="bg-secondary text-center rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h6 className="mb-0">Recent Products</h6>
                            <Link to="/products">Show All</Link>
                        </div>
                        <div className="table-responsive">
                            <table className="table text-start align-middle table-bordered table-hover mb-0">
                                <thead>
                                    <tr className="text-white">
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.slice(0, 5).map(product => (
                                        <tr key={product._id}>
                                            <td>
                                                <img 
                                                    src={product.image} 
                                                    alt={product.title} 
                                                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                />
                                            </td>
                                            <td>{product.title}</td>
                                            <td>${product.price}</td>
                                            <td>{product.stock}</td>
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

export default Dashboard; 