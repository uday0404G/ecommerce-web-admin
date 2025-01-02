import { 
    CATAGORY, 
    ERROR, 
    LOADING, 
    PRODATA, 
    SUBCATAGORY,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    EDITDATA 
} from "./actionType";

const init = {
    error: "",
    loading: false,
    prodata: [],
    editdata: [],
    cat: [],
    subcat: []
};

const Proreducer = (state = init, { type, payload }) => {
    switch (type) {
        case LOADING:
            return {
                ...state,
                loading: true
            };
        case PRODATA:
            return {
                ...state,
                loading: false,
                prodata: payload
            };
        case CATAGORY:
            return {
                ...state,
                loading: false,
                cat: payload
            };
        case SUBCATAGORY:
            return {
                ...state,
                loading: false,
                subcat: payload
            };
        case EDITDATA:
            return {
                ...state,
                loading: false,
                editdata: payload
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                loading: false,
                prodata: state.prodata.filter(item => item._id !== payload)
            };
        case UPDATE_PRODUCT:
            return {
                ...state,
                loading: false,
                prodata: state.prodata.map(item => 
                    item._id === payload._id ? payload : item
                )
            };
        case ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            };
        default:
            return state;
    }
};

export default Proreducer;