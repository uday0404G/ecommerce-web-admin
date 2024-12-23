import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


function EditProduct() {
  

  return (
    <div style={{ paddingLeft: '200px' }}>
      <h1>{id === 'new' ? 'Add Product' : 'Edit Product'}</h1>
      <div className="edit-product">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Product Title"
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Product Description"
            required
          />
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Product Price"
            required
          />
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter Product Image URL"
            required
          />
          {/* Category Selection */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
           <option value="" disabled>
              Select Category
            </option>
            <option value="EYEGLASSES">EYEGLASSES</option>
            <option value="SUNGLASSES">SUNGLASSES</option>
            <option value="LENSES">LENSES</option>
            <option value="COLLECTION">COLLECTION</option>
            <option value="CONTACTS">CONTACTS</option>

          </select>
          <button type="submit">{id === 'new' ? 'Add Product' : 'Save Changes'}</button>
        </form>

        <div className="product-preview">
          <h2>Product Preview</h2>
          <div className="preview-card">
            <img src={image} alt={title} style={{ width: '200px', height: '200px' }} />
            <h3>Title: {title || 'Title Here'}</h3>
            <p>Description: {description || 'Description Here'}</p>
            <p>Price: {price ? `${price}` : 'Price Here'} Rs.</p>
            <p>Category: {category || 'Category Here'}</p> {/* Displaying the selected category */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
