import api from '../../utils/axios';
import { LOADING, PRODATA, ERROR, DELETE_PRODUCT, UPDATE_PRODUCT } from "./actionType";

// Get all products
export const getProducts = () => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
        const response = await api.get('/product');
        dispatch({ type: PRODATA, payload: response.data });
    } catch (error) {
        dispatch({ type: ERROR, payload: error.message });
    }
};

// Add new product
export const addProduct = (productData) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
        const response = await api.post('/product', productData);
        dispatch(getProducts()); // Refresh product list
        return response.data;
    } catch (error) {
        dispatch({ type: ERROR, payload: error.message });
        throw error;
    }
};

// Update product
export const updateProduct = (id, productData) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
        const response = await api.put(`/product/${id}`, productData);
        dispatch({ type: UPDATE_PRODUCT, payload: response.data });
        dispatch(getProducts()); // Refresh product list
        return response.data;
    } catch (error) {
        dispatch({ type: ERROR, payload: error.message });
        throw error;
    }
};

// Delete product
export const deleteProduct = (id) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
        await api.delete(`/product/${id}`);
        dispatch({ type: DELETE_PRODUCT, payload: id });
        dispatch(getProducts()); // Refresh product list
    } catch (error) {
        dispatch({ type: ERROR, payload: error.message });
        throw error;
    }
};
