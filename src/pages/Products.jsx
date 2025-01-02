import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../Redux/productReducer/action';
import Sidebar from '../Component/Sidebar';
import ErrorBoundary from '../Component/ErrorBoundary';

const ProductTable = ({ products, onDelete }) => {
    const renderCellContent = (content) => {
        if (content === null || content === undefined) return '';
        if (typeof content === 'object') {
            // If it's an object with a name property, use that
            if (content.name) return content.name;
            // Otherwise return a string representation
            return JSON.stringify(content);
        }
        return content;
    };

    return (
        <div className="table-responsive">
            <table className="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                    <tr className="text-white">
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id || 'unknown'}>
                            <td>
                                {product.image && (
                                    <img 
                                        src={product.image} 
                                        alt={product.title || 'Product'} 
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                        onError={(e) => {
                                            e.target.src = 'fallback-image-url';
                                            e.target.onerror = null;
                                        }}
                                    />
                                )}
                            </td>
                            <td>{renderCellContent(product.title)}</td>
                            <td>{renderCellContent(product.category)}</td>
                            <td>${renderCellContent(product.price)}</td>
                            <td>{renderCellContent(product.stock)}</td>
                            <td>
                                <Link 
                                    to={`/edit/${product._id}`}
                                    className="btn btn-sm btn-primary me-2"
                                >
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => onDelete(product._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const Products = () => {
    const dispatch = useDispatch();
    const { prodata: products = [], loading, error } = useSelector(state => state.products || {});
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        try {
            dispatch(getProducts());
        } catch (err) {
            console.error('Failed to fetch products:', err);
        }
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (!id) return;
        
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await dispatch(deleteProduct(id));
            } catch (error) {
                console.error('Delete failed:', error);
            }
        }
    };

    const filteredProducts = React.useMemo(() => {
        if (!Array.isArray(products)) return [];
        
        return products.filter(product => {
            if (!product) return false;
            const searchLower = (searchTerm || '').toLowerCase();
            const title = String(product.title || '').toLowerCase();
            const category = String(product.category || '').toLowerCase();
            
            return title.includes(searchLower) || category.includes(searchLower);
        });
    }, [products, searchTerm]);

    return (
        <ErrorBoundary>
            <div className="container-fluid position-relative d-flex p-0">
                <Sidebar />
                <div className="content">
                    <div className="container-fluid pt-4 px-4">
                        <div className="bg-secondary text-center rounded p-4">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h6 className="mb-0">All Products</h6>
                                <Link to="/add-product" className="btn btn-primary">Add New Product</Link>
                            </div>
                            <div className="d-flex justify-content-end mb-3">
                                <input
                                    type="text"
                                    className="form-control w-25"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            {loading ? (
                                <div className="text-center p-4">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : error ? (
                                <div className="alert alert-danger">
                                    {error.message || 'Failed to load products'}
                                </div>
                            ) : filteredProducts.length === 0 ? (
                                <div className="alert alert-info">No products found</div>
                            ) : (
                                <ProductTable 
                                    products={filteredProducts} 
                                    onDelete={handleDelete}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default Products;