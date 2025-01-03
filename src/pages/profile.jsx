import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import Sidebar from '../Component/Sidebar';
import { changePassword } from '../Redux/LoginReducer/action';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState('current'); // 'current' or 'secret'
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    secretKey: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const userDataString = Cookies.get('user');
    if (userDataString) {
      try {
        const parsedUserData = JSON.parse(userDataString);
        setUserData(parsedUserData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setPasswordData({
      currentPassword: '',
      secretKey: '',
      newPassword: '',
      confirmPassword: ''
    });
    setError('');
    setSuccess('');
    setVerificationMethod('current');
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    try {
      await dispatch(changePassword({
        currentPassword: verificationMethod === 'current' ? passwordData.currentPassword : null,
        secretKey: verificationMethod === 'secret' ? passwordData.secretKey : null,
        newPassword: passwordData.newPassword,
        verificationMethod
      }));
      
      setSuccess('Password changed successfully');
      resetForm();
      setTimeout(() => {
        setShowPasswordModal(false);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
    }
  };

  if (!userData) {
    return (
      <div className="container-fluid position-relative d-flex p-0">
        <Sidebar />
        <div className="content">
          <div className="container-fluid pt-4 px-4">
            <div className="bg-secondary rounded p-4">
              <h2>Loading...</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid position-relative d-flex p-0">
      <Sidebar />
      <div className="content">
        <div className="container-fluid pt-4 px-4">
          <div className="row">
            <div className="col-12">
              <div className="bg-secondary rounded h-100 p-4">
                <h2 className="mb-4">Admin Profile</h2>
                <div className="d-flex align-items-center mb-4">
                  <div className="position-relative">
                    <img 
                      className="rounded-circle" 
                      src="/img/user.jpg" 
                      alt="Profile" 
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    <div 
                      className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"
                      style={{ width: '20px', height: '20px' }}
                    ></div>
                  </div>
                  <div className="ms-4">
                    <h3 className="mb-1">{userData.name || userData.email}</h3>
                    <p className="mb-2 text-primary">{userData.role}</p>
                  </div>
                </div>

                <div className="bg-dark rounded p-4 mb-4">
                  <h4 className="mb-3">Account Details</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label text-muted">User ID</label>
                        <p className="mb-0">{userData.userId}</p>
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-muted">Email</label>
                        <p className="mb-0">{userData.email}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label text-muted">Role</label>
                        <p className="mb-0">{userData.role}</p>
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-muted">Account Created</label>
                        <p className="mb-0">{userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-dark rounded p-4">
                  <h4 className="mb-3">Account Security</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <button 
                        className="btn btn-primary mb-2 w-100"
                        onClick={() => setShowPasswordModal(true)}
                      >
                        Change Password
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button className="btn btn-outline-primary mb-2 w-100">
                        Enable Two-Factor Auth
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Password Change Modal */}
          {showPasswordModal && (
            <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog">
                <div className="modal-content bg-secondary">
                  <div className="modal-header">
                    <h5 className="modal-title">Change Password</h5>
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => {
                        setShowPasswordModal(false);
                        resetForm();
                      }}
                    ></button>
                  </div>
                  <div className="modal-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    
                    <form onSubmit={handlePasswordSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Verification Method</label>
                        <div className="d-flex gap-3">
                          <div className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="verificationMethod"
                              id="currentPassword"
                              checked={verificationMethod === 'current'}
                              onChange={() => setVerificationMethod('current')}
                            />
                            <label className="form-check-label" htmlFor="currentPassword">
                              Current Password
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="verificationMethod"
                              id="secretKey"
                              checked={verificationMethod === 'secret'}
                              onChange={() => setVerificationMethod('secret')}
                            />
                            <label className="form-check-label" htmlFor="secretKey">
                              Admin Secret Key
                            </label>
                          </div>
                        </div>
                      </div>

                      {verificationMethod === 'current' ? (
                        <div className="mb-3">
                          <label className="form-label">Current Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            required
                          />
                        </div>
                      ) : (
                        <div className="mb-3">
                          <label className="form-label">Admin Secret Key</label>
                          <input
                            type="password"
                            className="form-control"
                            name="secretKey"
                            value={passwordData.secretKey}
                            onChange={handlePasswordChange}
                            required
                          />
                        </div>
                      )}

                      <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Confirm New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>
                      <div className="modal-footer px-0 pb-0">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => {
                            setShowPasswordModal(false);
                            resetForm();
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          Change Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
