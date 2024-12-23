import { applyMiddleware, legacy_createStore } from 'redux';
import Proreducer from './productReducer/productReducer';
import { thunk } from 'redux-thunk';





const store = legacy_createStore(Proreducer,applyMiddleware(thunk));

export default store;

