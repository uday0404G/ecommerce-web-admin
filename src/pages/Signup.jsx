import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../Redux/LoginReducer/action';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    secretKey: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector(state => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signup(formData));
      navigate('/');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="container-fluid position-relative d-flex p-0">
      <div className="container-fluid">
        <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
              <form onSubmit={handleSubmit}>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h3>Sign Up</h3>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                  />
                  <label>Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
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
                <div className="form-floating mb-4">
                  <select
                    className="form-control"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <label>Role</label>
                </div>
                {formData.role === 'admin' && (
                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      className="form-control"
                      name="secretKey"
                      value={formData.secretKey}
                      onChange={handleChange}
                      placeholder="Admin Secret Key"
                    />
                    <label>Admin Secret Key</label>
                  </div>
                )}
                <button type="submit" className="btn btn-primary py-3 w-100 mb-4" disabled={isLoading}>
                  {isLoading ? 'Signing up...' : 'Sign Up'}
                </button>
                <p className="text-center mb-0">Already have an Account? <a href="/">Sign In</a></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
