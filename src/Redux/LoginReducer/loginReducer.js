import Cookies from 'js-cookie';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./actionType";

const getInitialState = () => {
    try {
        const token = Cookies.get('token');
        const userStr = Cookies.get('user');
        const user = userStr ? JSON.parse(userStr) : null;

        return {
            isAuth: !!token,
            isLoading: false,
            error: null,
            token: token || null,
            user: user,
            users: []
        };
    } catch (error) {
        console.error('Error parsing initial state:', error);
        // Clear invalid cookies
        Cookies.remove('token');
        Cookies.remove('user');
        
        return {
            isAuth: false,
            isLoading: false,
            error: null,
            token: null,
            user: null,
            users: []
        };
    }
};

const initialState = getInitialState();

export const loginReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST:
            return { ...state, isLoading: true, error: null };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuth: true,
                token: payload.token,
                user: payload.user,
                error: null
            };
        case LOGIN_FAILURE:
            Cookies.remove('token');
            Cookies.remove('user');
            return {
                ...state,
                isLoading: false,
                error: payload,
                isAuth: false,
                token: null,
                user: null
            };
        case LOGOUT:
            Cookies.remove('token');
            Cookies.remove('user');
            return {
                ...state,
                isAuth: false,
                token: null,
                user: null
            };
        case "GET_USERS_SUCCESS":
            return {
                ...state,
                isLoading: false,
                users: payload,
                error: null
            };
        default:
            return state;
    }
}; 