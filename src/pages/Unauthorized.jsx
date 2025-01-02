import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="container-fluid position-relative d-flex p-0">
      <div className="container-fluid">
        <div className="row vh-100 bg-secondary rounded align-items-center justify-content-center mx-0">
          <div className="col-md-6 text-center p-4">
            <i className="bi bi-exclamation-triangle display-1 text-primary"></i>
            <h1 className="display-1 fw-bold">401</h1>
            <h1 className="mb-4">Unauthorized Access</h1>
            <p className="mb-4">You are not authorized to access this page. Only admin users can access the admin panel.</p>
            <Link className="btn btn-primary rounded-pill py-3 px-5" to="/">Go Back To Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;