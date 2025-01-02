import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../Redux/LoginReducer/action';
import Sidebar from '../Component/Sidebar';

const Users = () => {
    const dispatch = useDispatch();
    const { users, isLoading, error } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <div className="container-fluid position-relative d-flex p-0">
            <Sidebar />
            <div className="content">
                <div className="container-fluid pt-4 px-4">
                    <div className="bg-secondary text-center rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h6 className="mb-0">All Users</h6>
                        </div>
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div className="alert alert-danger">{error}</div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table text-start align-middle table-bordered table-hover mb-0">
                                    <thead>
                                        <tr className="text-white">
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users?.map(user => (
                                            <tr key={user._id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <span className={`badge ${user.role === 'admin' ? 'bg-primary' : 'bg-secondary'}`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`badge ${user.isActive ? 'bg-success' : 'bg-danger'}`}>
                                                        {user.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button className="btn btn-sm btn-primary me-2">
                                                        Edit
                                                    </button>
                                                    <button className="btn btn-sm btn-danger">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;