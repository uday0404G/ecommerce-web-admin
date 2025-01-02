import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { thunk } from 'redux-thunk';
import Proreducer from './productReducer/productReducer';
import { loginReducer } from './LoginReducer/loginReducer';

const rootReducer = combineReducers({
    products: Proreducer,
    auth: loginReducer
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;

