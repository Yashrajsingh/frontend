import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header.jsx'
//import FoodDisplay from '../../components/Fooddisplay/FoodDisplay'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu.jsx'
import FoodDisplay from '../../components/Fooddisplay/FoodDisplay.jsx'
import AppDownload from '../../components/AppDownload/AppDownload.jsx'
const Home = () => {

const [category,setcategory] = useState("All")

  return (
    <div className="home">
        <Header/>
        <ExploreMenu category={category} setcategory={setcategory}/>
        <FoodDisplay category={category}/>
        <AppDownload/>
    </div>
  )
}

export default Home