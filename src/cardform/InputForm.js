import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';

const InputForm = props => {
    const dispatch = useDispatch();
    const form = useSelector(state => state.form)
    const products = useSelector(state => state.product)

    const addProduct = async () => {
        await axios.post(`http://localhost:8000/api/products`, form)
        dispatch({
            type: 'ADD_PRODUCT', product: {
                no: products.length > 0 ? products[products.length - 1].no + 1 : 0,
                ...form
            }
        })
        return (
            <div>
                <h2 className='head' > Add  New Product  </h2>
                Name :
                <input
                    type="text"  onChange={(e) => dispatch({ type: 'CHANGE_NAME', name: e.target.value })}
                />


                Price :
                <input
                    type="number"onChange={(e) => dispatch({ type: 'CHANGE_PRICE', price: e.target.value })}
                />


                Pic :
                <input
                    type="text" onChange={(e) => dispatch({ type: 'CHANGE_SRC', src: e.target.value })}
                />



                <button class=' button1' onClick={addProduct}>CREATE</button>
            </div>
        )
    }
}
export default InputForm