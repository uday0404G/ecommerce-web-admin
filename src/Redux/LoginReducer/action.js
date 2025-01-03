import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './actionTypes';

const api = axios.create({
  baseURL: 'http://localhost:8080'
});

export const loginUser = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await api.post('/user/login', credentials);
    
    if (response.data) {
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      return response; // Return the entire response
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    throw error;
  }
};
