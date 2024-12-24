
import React, { useEffect, useState } from 'react';
import { AddProducts, catagory,  subcatagory } from '../Redux/productReducer/action';
import { useDispatch, useSelector } from 'react-redux';


const AddProduct = () => {
  const [data,setdata]=useState({})
  const dispatch = useDispatch();
  const { loading, cat,subcat, error } = useSelector((state) => state);


  useEffect(() => {
    dispatch(catagory);
    dispatch(subcatagory); 
  }, [dispatch]);


const handelchange=(e)=>{
const {name,value}=e.target
setdata({...data,[name]:value})
}
const handleSubmit=(e)=>{
  e.preventDefault()
  dispatch(AddProducts(data))
}

  return (
    <div className="add-product-container">
      <div className="add-product-form">
        <h1>Add Product</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            // value={title}
            name='name'
            onChange={handelchange}
            placeholder="Enter Product Title"
            required
          />
          <textarea
            type="text"
            // value={description}
            name='description'
            onChange={handelchange}
            placeholder="Enter Product Description"
            required
          />
          <input
            type="text"
            name='price'
            // value={price}
            onChange={handelchange}
            placeholder="Enter Product Price"
            required
          />
          <input
            type="text"
            // value={image}
            onChange={handelchange}
            placeholder="Enter Product Image URL"
            required
          />
          {/* Category Selection */}
          <select
            // value={category}
            name='category'
            onChange={handelchange}
            required
          >
            <option value="" >
              Select Category
            </option>
            {cat.map((el)=>{return(<option key={el._id} value={el._id}>{el.name}</option>)})}
          </select>
          <select
          name='subcategory'
            // value={category}
            onChange={handelchange}
            required
          >
            <option value="" >
              Select Category
            </option>
            {subcat.map((el)=>{return(<option key={el._id} value={el._id}>{el.name}</option>)})}
          </select>
          <input type="text" name="stock"  />
          <button type="submit">Add Product</button>
        </form>
      </div>
      {/* <div className="product-preview">
        <h2>Product Preview</h2>
        <div className="preview-card">
          <img
            // src={image}
            // alt={title}
            style={{ width: '200px', height: '200px' }}
          />
          {/* <h3>Title: {title || 'Title Here'}</h3> 
          <p>Description: {description || 'Description Here'}</p>
          <p>Price: {price ? `${price}` : 'Price Here'} Rs.</p>
          <p>Category: {category || 'Category Here'}</p> {/* Displaying the selected category 
        </div>
      </div> */}
    </div>
  );
};

export default AddProduct;
