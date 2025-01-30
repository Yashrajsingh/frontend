import React, { useContext, useEffect, useState } from 'react'
import './Placeorder.css'
import axios from "axios"
import { StoreContext } from '../../components/Context/StoreContext'
import { useNavigate } from 'react-router-dom'
const Placeorder = () => {

  const {gettotalcartamount,token,food_list,CartItems,url} = useContext(StoreContext)

  const [data,setData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onchangehandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({...data,[name]:value}))
  }

  const placeorder = async (event) => {
    event.preventDefault()
    let orderitems = []
    food_list.map((items) => {

      if(CartItems[items._id] > 0) {
        let itemInfo = items
        itemInfo["quantity"] = CartItems[items._id]
        orderitems.push(itemInfo)
      }
    })
    console.log(orderitems)
    let orderData = {
      address:data,
      items:orderitems,
      amount: gettotalcartamount()+2,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if (response.data.success) {
      const {session_url} = response.data
      window.location.replace(session_url)
    }
    else{
      alert("Error")
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    if(!token){
      navigate('/cart')
    }
    else if(gettotalcartamount() === 0)
    {
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeorder} action="" className="placeorder">
      <div className="placeorderleft">
        <p className="title">Delievery Information</p>
        <div className="multifields">
          <input required name="firstname" onChange={onchangehandler} value={data.firstname} type="text" placeholder='first name'/>
          <input required name="lastname" onChange={onchangehandler} value={data.lastname} type="text" placeholder='last name'/>
        </div>
        <input required name="email" onChange={onchangehandler} value={data.email} type="text" placeholder='Email address'/>
        <input required name="street" onChange={onchangehandler} value={data.street} type="text" placeholder='street name'/>
        <div className="multifields">
          <input required name="city" onChange={onchangehandler} value={data.city} type="text" placeholder='City'/>
          <input required name="state" onChange={onchangehandler} value={data.state} type="text" placeholder='State'/>
        </div>
        <div className="multifields">
          <input required name="zipcode" onChange={onchangehandler} value={data.zipcode} type="text" placeholder='Zip code'/>
          <input required name="country" onChange={onchangehandler} value={data.country} type="text" placeholder='Country'/>
        </div>
        <input required name="phone" onChange={onchangehandler} value={data.phone} type="text"  placeholder='phone'/>
      </div>
      <div className="placeorderright">
      <div className="carttotal">
          <h2>Cart Total</h2>
          <div>
              <div className="carttotaldetails">
                  <p>SubTotal</p>
                  <p>${gettotalcartamount()}</p>
              </div>
              <hr />
              <div className="carttotaldetails">
                  <p>Delievery Fee</p>
                  <p>${gettotalcartamount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="carttotaldetails">
                  <b>Total</b>
                  <b>${gettotalcartamount() === 0 ? 0 : gettotalcartamount() + 2}</b>
              </div>
              <button type='submit'>PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Placeorder
