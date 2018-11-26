import React, {Component} from "react"
import "../App.css"
import {Link} from "react-router-dom"


const Navbar = ()=>{
    return(
        <nav className='navbar navbar-expand-lg'>
        <ul className='navbar-nav'>
        <li className={window.location.pathname === "/fun"
                       ? "nav-item-active"
                       : "nav-item"}
                       >
        <Link to="/fun" className="nav-link">
        Fun 
        </Link>
        </li>
        <li className={window.location.pathname === "/login"
                       ? "nav-item-active"
                       : "nav-item"}
                       >
        <Link to="/login" className="nav-link">
        Log-out
        </Link>
        </li>
        <li className={window.location.pathname === "/home"
                       ? "nav-item-active"
                       : "nav-item"}
                       >
        <Link to="/home" className="nav-link">
        Home 
        </Link>
        </li>

        </ul>

        </nav>
    )
}

export default Navbar