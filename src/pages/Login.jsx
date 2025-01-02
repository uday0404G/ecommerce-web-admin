import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../Redux/LoginReducer/action';
import Cookies from 'js-cookie';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuth, isLoading, error, user } = useSelector(state => state.auth);

    useEffect(() => {
        // Check if already logged in
        if (isAuth && user?.role === 'admin') {
            navigate('/dashboard');
        }
    }, [isAuth, user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login(formData));
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                    <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <a href="/" className="">
                                <h3 className="text-primary"><i className="fa fa-user-edit me-2"></i>Admin</h3>
                            </a>
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                    required
                                />
                                <label>Email address</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required
                                />
                                <label>Password</label>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                                </div>
                                <a href="">Forgot Password</a>
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-primary py-3 w-100 mb-4"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </button>
                            <p className="text-center mb-0">Don't have an Account? <Link to="/signup">Sign Up</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;