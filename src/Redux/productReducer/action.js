import axios from "axios"
import { CATAGORY, ERROR, LOADING, PRODATA, SUBCATAGORY } from "./actionType";

//get data
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
export const catagory=(dispatch)=>{
    dispatch({type:LOADING})
    axios.get(`http://localhost:8080/catagory/`)
    .then(res=>{
        console.log(res.data);
        dispatch({type:CATAGORY,payload:res.data})
        
    })
    .catch((err)=>{
        dispatch({type:ERROR,payload:err})
    })
}
export const subcatagory=(dispatch)=>{
    dispatch({type:LOADING})
    axios.get(`http://localhost:8080/subcatagory/`)
    .then(res=>{
        console.log(res.data);
        dispatch({type:SUBCATAGORY,payload:res.data})
        
    })
    .catch((err)=>{
        dispatch({type:ERROR,payload:err})
    })
}


//add data
export const AddProducts=(data)=>(dispatch)=>{
   let token= localStorage.getItem("token")
   console.log(token);
   
    dispatch({type:LOADING})
    axios.post(`http://localhost:8080/Product/`,data,{
        headers: {
            Authorization: token,
          },
    })
    .then(res=>{
        alert(res.data.message)
    })
    .catch((err)=>{
        dispatch({type:ERROR,payload:err})
    })
}