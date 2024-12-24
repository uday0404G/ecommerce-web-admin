import { CATAGORY, EDITDATA, ERROR, LOADING, PRODATA, SUBCATAGORY } from "./actionType"

const init={
    error:"",
    loading:false,
    prodata:[],
    editdata:[],
    cat:[],
    subcat:[]
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
    case CATAGORY:return{
        ...state,
        loading:false,
        cat:payload
    }
    case SUBCATAGORY:return{
        ...state,
        loading:false,
        subcat:payload
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