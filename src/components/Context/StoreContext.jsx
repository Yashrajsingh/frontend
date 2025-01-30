import axios from "axios";
//import { food_list } from "../../assets/frontend_assets/assets";
import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
   
    const [CartItems, SetCartItems] = useState({});
    const url = "http://localhost:4000"; 
    const [token, setToken] = useState("");
    const [food_list,setFoodList] = useState([])

    const addtocart = async (ItemId) => {
        if (!CartItems[ItemId]) {
            SetCartItems((prev) => ({ ...prev, [ItemId]: 1 }));
        } else {
            SetCartItems((prev) => ({ ...prev, [ItemId]: prev[ItemId] + 1 }));
        }
        if(token) {
            await axios.post(url+"/api/cart/add",{ItemId},{headers:{token}})
        }
    };

    const removefromcart = async (ItemId) => {
        SetCartItems((prev) => ({ ...prev, [ItemId]: prev[ItemId] - 1 }));
        if (token) {
            await axios.post(url+"/api/cart/remove",{ItemId},{headers:{token}})
        }
    };

    const gettotalcartamount = () => {
        let totalamount = 0;
        for (const item in CartItems) {
            if (CartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalamount += itemInfo.price * CartItems[item];
            }
        }
        return totalamount;
    };

    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list")
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get", {} , {headers:{token}})
        SetCartItems(response.data.cartData)
    }
    useEffect(() => {
        async function loadData() {
            await fetchFoodList()
            if(localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    },[])

    const ContextValue = {
        food_list,
        CartItems,
        SetCartItems,
        addtocart,
        removefromcart,
        gettotalcartamount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={ContextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
