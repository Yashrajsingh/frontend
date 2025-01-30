import React, { useContext, useEffect, useState } from 'react'
import "./MyOrder.css"
import axios from "axios"
import { StoreContext } from '../../components/Context/StoreContext'
import { assets } from '../../assets/frontend_assets/assets'
const MyOrder = () => {

    const {url,token} = useContext(StoreContext)
    const [data,setData] = useState([])

    const fetchOrders = async() => {
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}})
        setData(response.data.data)
        console.log(response.data.data)
    }

    useEffect(() => {
        if(token){
            fetchOrders()
        }
    },[token])
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index) => {
               return (
                <div className="my-orders-order" key={index}>
                    <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index) => {
                            if(index === order.items.length-1){
                                return item.name+"x"+item.quantity
                            } else {
                                return item.name+"x"+item.quantity+", "
                            }
                        })}</p> 
                        <p>Total Amount: ${order.amount}.00</p> 
                        <p>Items:{order.items.length}</p>
                        <p><span>&#x25cf;</span><b>Status: {order.status}</b></p>
                        <button>Track orders</button>
                </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyOrder