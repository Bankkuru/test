import React from 'react'
import  { useEffect, useState }  from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import  './PrductBox.css'

const PrductBox = (props) => {
    const dispatch = useDispatch();
    const form = useSelector(state => state.form)
    const [count,setCount] = useState(0)
    const [pr,setPr] = useState(0)

    const getProducts = async () => {
        const result = await axios.get(`https://my-api-shopping.herokuapp.com/api/products`)
       
        const action = {type:'GET_PRODUCTS',product: result.data}
        dispatch(action)
      }
      useEffect(() => {
        getProducts()
      }, [])
    
      const sumPrice = () => {
          setPr(pr+props.price)
          setCount(count+1)
      }
      const canPrice = () => {
        setPr(0)
        setCount(0)
        }
        
    return (
      <div>{
        <div class="row">
            <div class="column">
                <div class="card" >
                    <a href= {props.src}> </a>
                    <h1>Product {props.no}</h1>
                    <p>{props.name}</p>
                    <p>{props.price} Baht</p>
                  
                    <button class=" button1" onClick={sumPrice}>Select</button>
                    <button class=" button3" onClick={canPrice}>Cancle</button><br/>
                    <a>{count} : piece   {pr} Baht</a>
              </div>
            </div>
            </div>
            } 
                   
            
            </div>
    )
}

export default PrductBox
