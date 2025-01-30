import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/frontend_assets/assets.js';
import { StoreContext } from '../Context/StoreContext.jsx';

const FoodItem = ({ id,name, price, description, image }) => {
  const { CartItems, addtocart, removefromcart, url } = useContext(StoreContext);

  console.log("Image for item:", id, image); // Debugging log

  // Handle missing images
  const imageUrl =`${url}/images/${image}`;

  return (
    <div className="fooditem">
      <div className="fooditemimagecontainer">
        <img className="fooditemimage" src={imageUrl} alt={name} />
        {!CartItems[id] ? (
          <img
            className="add"
            onClick={() => addtocart(id)}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className="fooditemcounter">
            <img
              onClick={() => removefromcart(id)}
              src={assets.remove_icon_red}
              alt="Remove from cart"
            />
            <p>{CartItems[id]}</p>
            <img
              onClick={() => addtocart(id)}
              src={assets.add_icon_green}
              alt="Add more"
            />
          </div>
        )}
      </div>
      <div className="fooditeminfo">
        <div className="fooditemnamerating">
          <p className="name">{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="fooditemdesc">{description}</p>
        <p className="fooditemprice">${price}</p>
      </div>
    </div>
  );
};


export default FoodItem;
