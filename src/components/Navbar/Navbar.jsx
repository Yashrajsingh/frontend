import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../Context/StoreContext'

const Navbar = ({setShowLogin}) => {

  const [menu,setmenu] = useState("home")
  
  const {gettotalcartamount,token,setToken} = useContext(StoreContext)
  
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }


  return (
    <div className="navbar">

      <Link to="/"><img src={assets.logo} alt="" className='logo' /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setmenu("home")} className={menu==="home" ? "active":""}>Home</Link>
        <a href='#exploremenu' onClick={() => setmenu("menu")} className={menu==="menu"? "active":""}>Menu</a>
        <a href='#app-download' onClick={() => setmenu("mobile-app")} className={menu==="mobile-app" ?"active":""}>Mobile-app</a>
        <a href='#footer' onClick={() => setmenu("contact-us")} className={menu==="contact-us" ? "active":""}>Contact-us</a>
      </ul>
  
        <div className="navbar-right">    
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
              <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
              <div className={gettotalcartamount()=== 0 ? "" : "dot"}></div>
            </div>
            {!token? <button onClick={() => setShowLogin(true)}> sign in</button>
            : <div className='navbarprofile'>
              <img src={assets.profile_icon} alt="" />
              <ul className="navbarprofiledropdown">
                <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            </div>
            }
           
        </div>
    </div>
  )
}

export default Navbar