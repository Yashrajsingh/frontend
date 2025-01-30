import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../components/Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { CartItems, food_list, removefromcart, gettotalcartamount, url } = useContext(StoreContext);
    const navigate = useNavigate();

    const deliveryFee = gettotalcartamount() > 0 ? 2 : 0;
    const totalAmount = gettotalcartamount() + deliveryFee;

    return (
        <div className="cart">
            <div className="cartitems">
                <div className="cartitemstitle">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.length > 0 ? (
                    food_list.map((item, index) => {
                        if (CartItems[item._id] > 0) {
                            return (
                                <div key={item._id}>
                                    <div className="cartitemstitle cartitemsitem">
                                        <img src={`${url}/images/${item.Image}`} alt={item.name} />
                                        <p>{item.name}</p>
                                        <p>${item.price}</p>
                                        <p>{CartItems[item._id]}</p>
                                        <p>${item.price * CartItems[item._id]}</p>
                                        <p onClick={() => removefromcart(item._id)} className="cross">x</p>
                                    </div>
                                    <hr />
                                </div>
                            );
                        }
                        return null;
                    })
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>

            <div className="cartbottom">
                <div className="carttotal">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="carttotaldetails">
                            <p>SubTotal</p>
                            <p>${gettotalcartamount()}</p>
                        </div>
                        <hr />
                        <div className="carttotaldetails">
                            <p>Delivery Fee</p>
                            <p>${deliveryFee}</p>
                        </div>
                        <hr />
                        <div className="carttotaldetails">
                            <b>Total</b>
                            <b>${totalAmount}</b>
                        </div>
                        <button onClick={() => navigate('/order')} disabled={totalAmount === 0}>
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>

                <div className="cartpromocode">
                    <div>
                        <p>If you have a promo code, enter it here:</p>
                        <div className="cartpromocodeinput">
                            <input type="text" placeholder="Promo code" />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
