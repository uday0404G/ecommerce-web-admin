import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import './ProductPage.css';
import { getProducts, deleteProduct } from '../Redux/productReducer/action';

function Product() {
  const dispatch = useDispatch();
  const { loading, prodata: products, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts()); 
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id))
        .then(() => {
          // Product list will be automatically refreshed by the deleteProduct action
          console.log('Product deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
        });
    }
  };

  return (
    <div className="container">
      <h1>Product Page</h1>
      <div className="product-list">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : products && products.length ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.title} />
              <div className="product-card-content">
                <h3 className="h3">{product.title}</h3>
                <p>{product.description}</p>
                <p>
                  <span>
                    <b>${product.price}</b>
                  </span>
                </p>
                <div className="editbtn">
                  <Link to={`/edit/${product._id}`}>Edit</Link>
                  <button onClick={() => handleDelete(product._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}

export default Product;
