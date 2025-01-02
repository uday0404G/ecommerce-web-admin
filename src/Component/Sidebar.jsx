import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../Redux/LoginReducer/action'

const Sidebar = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="sidebar pe-4 pb-3">
        <nav className="navbar bg-secondary navbar-dark">
          <Link to="/dashboard" className="navbar-brand mx-4 mb-3">
            <h3 className="text-primary"><i className="fa fa-user-edit me-2"></i>Admin Panel</h3>
          </Link>
          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <img className="rounded-circle" src="img/user.jpg" alt="" style={{ width: '40px', height: '40px' }}/>
              <div className="bg-success rounded-circle border b  order-2 border-white position-absolute end-0 bottom-0 p-1"></div>
            </div>
            <div className="ms-3">
              <h6 className="mb-0">John Doe</h6>
              <span>Admin</span>
            </div>
          </div>
          <div className="navbar-nav w-100">
            <NavLink to="/dashboard" className={({isActive}) => 
              `nav-item nav-link ${isActive ? 'active' : ''}`
            }>
              <i className="fa fa-tachometer-alt me-2"></i>Dashboard
            </NavLink>
            <NavLink to="/products" className={({isActive}) => 
              `nav-item nav-link ${isActive ? 'active' : ''}`
            }>
              <i className="fa fa-shopping-cart me-2"></i>Products
            </NavLink>
            <NavLink to="/add-product" className={({isActive}) => 
              `nav-item nav-link ${isActive ? 'active' : ''}`
            }>
              <i className="fa fa-plus me-2"></i>Add Product
            </NavLink>
            <NavLink to="/users" className={({isActive}) => 
              `nav-item nav-link ${isActive ? 'active' : ''}`
            }>
              <i className="fa fa-users me-2"></i>Users
            </NavLink>
      
            <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                <i className="far fa-file-alt me-2"></i>Settings
              </a>
              <div className="dropdown-menu bg-transparent border-0">
                <Link to="/profile" className="dropdown-item">Profile</Link>
                <button onClick={handleLogout} className="dropdown-item">Logout</button>
              </div>
            </div>
          </div>
        </nav>
      </div>
  )
}

export default Sidebar