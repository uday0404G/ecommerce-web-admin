import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, updateProduct, getCategories, getSubCategories } from '../Redux/productReducer/action';
import Sidebar from '../Component/Sidebar';

function EditProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subCategory: '',
    stock: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, cat, subcat } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch categories and subcategories
    dispatch(getCategories());
    dispatch(getSubCategories());

    // Fetch product data if editing
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
      await dispatch(updateProduct(id, formData));
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="container-fluid position-relative d-flex p-0">
      <Sidebar />
      <div className="content">
        <div className="container-fluid pt-4 px-4">
          <div className="bg-secondary rounded p-4">
            <h2 className="mb-4">Edit Product</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            
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
                {loading ? 'Saving...' : 'Update Product'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
