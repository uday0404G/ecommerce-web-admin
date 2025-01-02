import api from '../../utils/axios';
import Cookies from 'js-cookie';
import { 
    LOGIN_FAILURE, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGOUT,
    GET_USERS_SUCCESS 
} from "./actionType";

export const login = (credentials) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await api.post("/user/login", credentials);
        console.log("Raw login response:", response.data);
        
        // Decode the token to get user info
        const token = response.data.token;
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedToken = JSON.parse(window.atob(base64));
        
        const user = {
            userId: decodedToken.userId,
            email: decodedToken.email,
            role: decodedToken.role
        };
        
        // Store in cookies
        Cookies.set('token', token, { expires: 7 });
        Cookies.set('user', JSON.stringify(user), { expires: 7 });
        
        dispatch({ 
            type: LOGIN_SUCCESS, 
            payload: { token, user } 
        });
        
        return { token, user };
    } catch (error) {
        console.error("Login error:", error);
        const errorMessage = error.response?.data?.message || "Login failed";
        dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
        throw error;
    }
};

export const signup = (userData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await api.post("/user/register", userData);
        const { token, user } = response.data;
        
        Cookies.set('token', token, { expires: 7 });
        Cookies.set('user', JSON.stringify(user), { expires: 7 });
        
        dispatch({ type: LOGIN_SUCCESS, payload: { token, user } });
        return response.data;
    } catch (error) {
        console.error("Signup error:", error);
        const errorMessage = error.response?.data?.message || "Signup failed";
        dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
        throw error;
    }
};

export const getUsers = () => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const token = Cookies.get('token');
        const response = await api.get("/user/all", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: GET_USERS_SUCCESS, payload: response.data });
        return response.data;
    } catch (error) {
        console.error("Get users error:", error);
        dispatch({ type: LOGIN_FAILURE, payload: error.response?.data?.message || "Failed to fetch users" });
        throw error;
    }
};

export const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    return { type: LOGOUT };
};
