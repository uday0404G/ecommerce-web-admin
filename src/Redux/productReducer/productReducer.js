import { EDITDATA, ERROR, LOADING, PRODATA } from "./actionType"

const init={
    error:"",
    loading:false,
    prodata:[],
    editdata:[],
}

const Proreducer=(state=init,{type,payload})=>{
 switch(type){
    case LOADING:return{
        ...state,
        loading:true
    }
    case PRODATA:return{
        ...state,
        loading:false,
        prodata:payload
    }
    case EDITDATA:return{
        ...state,
        loading:false,
        editdata:payload
    }
    case ERROR:return{
        ...state,
        error:payload
    }
    default:return state
 }
}
export default Proreducer