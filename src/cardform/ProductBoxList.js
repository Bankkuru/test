import React from 'react'
import axios from 'axios'
import { useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PrductBox from './PrductBox'



const ProductBoxList = (props) => {

    const products = useSelector(state => state.product);
    const dispatch = useDispatch();
    const getProducts = async () => {
        const result = await axios.get(`https://my-api-shopping.herokuapp.com/api/products`)
       
        const action = {type:'GET_PRODUCTS',product: result.data}
        dispatch(action)
      }
      useEffect(() => {
        getProducts()
      }, [])
       console.log("data",products)
      if (!products || !products.length)
        return (<h2>No data</h2>)

    return(
        <div>
            {
                products.map((product, index) => (
                    <td key={index} >

                        < PrductBox  {...product}  />
                    </td>
                ))
            }
        </div>
    )
}

export default ProductBoxList
