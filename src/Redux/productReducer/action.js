import axios from "axios"
import { ERROR, LOADING, PRODATA } from "./actionType";

export const prodataa=(dispatch)=>{
    dispatch({type:LOADING})
    axios.get(`http://localhost:8080/product/`)
    .then(res=>{
        console.log(res.data);
        dispatch({type:PRODATA,payload:res.data})
        
    })
    .catch((err)=>{
        dispatch({type:ERROR,payload:err})
    })
}