import { LOADING, PRODATA, ERROR, DELETE_PRODUCT, UPDATE_PRODUCT } from "./actionType";

const initialState = {
    products: [],
    isLoading: false,
    error: null
};

export const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOADING:
            return { ...state, isLoading: true, error: null };
        case PRODATA:
            return { ...state, isLoading: false, products: payload, error: null };
        case ERROR:
            return { ...state, isLoading: false, error: payload };
        case DELETE_PRODUCT:
            return {
                ...state,
                isLoading: false,
                products: state.products.filter(product => product._id !== payload)
            };
        case UPDATE_PRODUCT:
            return {
                ...state,
                isLoading: false,
                products: state.products.map(product => 
                    product._id === payload._id ? payload : product
                )
            };
        default:
            return state;
    }
}; 