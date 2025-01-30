import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem.jsx";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="fooddisplay" id="fooddisplay">
      <h2>Top Dishes near you</h2>
      <div className="fooddisplaylist">
        {food_list.map((item) => {

            if(category==="All" || category===item.category){
                return <FoodItem 
                        key={item._id} 
                        id={item._id} 
                        name={item.name} 
                        description={item.description} 
                        price={item.price} 
                        image={item.Image} />
            }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
