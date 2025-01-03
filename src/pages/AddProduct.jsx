import React, { useEffect, useState } from 'react';
import { addProduct, getCategories, getSubCategories, getProductById, updateProduct } from '../Redux/productReducer/action';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../Component/Sidebar';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '', 
    price: '',
    category: '',
    subCategory: '',
    stock: ''
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, cat, subcat } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch categories and subcategories
    dispatch(getCategories());
    dispatch(getSubCategories());

    // If editing, fetch product data
    if (id) {
      dispatch(getProductById(id))
        .then(product => {
          setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category?._id,
            subCategory: product.subCategory?._id,
            stock: product.stock
          });
        })
        .catch(error => console.error('Error fetching product:', error));
    }
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await dispatch(updateProduct(id, formData));
      } else {
        await dispatch(addProduct(formData));
      }
      navigate('/products');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div className="container-fluid position-relative d-flex p-0">
      <Sidebar />
      <div className="content">
        <div className="container-fluid pt-4 px-4">
          <div className="bg-secondary rounded p-4">
            <h2 className="mb-4">{id ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-control"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {cat?.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Subcategory</label>
                <select
                  className="form-control"
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Subcategory</option>
                  {subcat?.map(subcategory => (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Stock</label>
                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Saving...' : id ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
