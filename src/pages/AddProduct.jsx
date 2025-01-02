import React, { useEffect, useState } from 'react';
import { addProduct } from '../Redux/productReducer/action';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [data, setData] = useState({
    title: '',
    description: '', 
    price: '',
    image: '',
    category: '',
    subcategory: '',
    stock: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, cat, subcat } = useSelector((state) => state.products);
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addProduct(data));
      navigate('/products');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-form">
        <h1>{id ? 'Edit Product' : 'Add Product'}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={data.title || ''}
            name="title"
            onChange={handleChange}
            placeholder="Enter Product Title"
            required
          />
          <textarea
            value={data.description || ''}
            name="description"
            onChange={handleChange}
            placeholder="Enter Product Description"
            required
          />
          <input
            type="number"
            name="price"
            value={data.price || ''}
            onChange={handleChange}
            placeholder="Enter Product Price"
            required
          />
          <input
            type="text"
            name="image"
            value={data.image || ''}
            onChange={handleChange}
            placeholder="Enter Product Image URL"
            required
          />
          <select
            value={data.category || ''}
            name="category"
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="EYEGLASSES">EYEGLASSES</option>
            <option value="SUNGLASSES">SUNGLASSES</option>
            <option value="LENSES">LENSES</option>
            <option value="COLLECTION">COLLECTION</option>
            <option value="CONTACTS">CONTACTS</option>
          </select>
          <select
            name="subcategory"
            value={data.subcategory || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select Subcategory</option>
            <option value="MEN">MEN</option>
            <option value="WOMEN">WOMEN</option>
            <option value="KIDS">KIDS</option>
          </select>
          <input 
            type="number"
            name="stock"
            value={data.stock || ''}
            onChange={handleChange}
            placeholder="Enter Stock Quantity"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : id ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
