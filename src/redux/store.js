import {createStore, combineReducers} from 'redux'
const initialForm = {
    no: '' ,
    name: '',
    price: '',
    src: ' '
}
const formReducer = (state=initialForm,action)=>{
    switch(action.type){
        case 'CHANGE_NO': return {...state,no: action.no}
        case 'CHANGE_NAME': return {...state,name: action.name}
        case 'CHANGE_PRICE': return {...state,price: action.price}
        case 'CHANGE_SRC': return {...state,src: action.src}
        default:return state;
    }
}

const productReducer=(state=[],action)=>{
    switch(action.type){
        case 'GET_PRODUCTS':
            return action.product
        case 'ADD_PRODUCT': 
            return [...state,action.product]
        case 'DELETE_PRODUCT':
             return state.filter(product => product.no !== +action.no)
        case 'UPDATE_PRODUCT': 
            return state.map(product => {
             if(+product.no === +action.no)
             return action.product;
             else return product;
            })
        default:
            return state;
    }
}
const reducer = combineReducers({
    product: productReducer,
    form: formReducer
})

export const store = createStore(reducer)