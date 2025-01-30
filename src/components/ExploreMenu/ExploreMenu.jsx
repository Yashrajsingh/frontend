import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/frontend_assets/assets'
const ExploreMenu = ({category,setcategory}) => {
  return (
    <div className="exploremenu" id='exploremenu'>
        <h1>Explore our menu</h1>
        <p className='exploretext'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, aliquam! Animi iste repudiandae aut alias sint, nobis molestias expedita fuga rem, eum vel, asperiores commodi quis error obcaecati pariatur mollitia.</p>
        <div className="exploremenulist">
            {menu_list.map((item,index) => {
                return (
                <div onClick={() => setcategory(prev => prev===item.menu_name? "All":item.menu_name)} key={index} className="exploremenulistitem">
                    <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu