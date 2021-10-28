import React from 'react';
import {NavLink} from 'react-router-dom';

const linkStyles = {
    padding: "10px 20px 10px 20px",
    margin: "10px 10px 10px 10px",
    background: "#e60000",
    textDecoration: "none",
    color: "white",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: "8px",
    
  };
  
function NavBar () {
    return (
        <div className="nav-bar">
            <NavLink 
            to='/'
            exact
            style={linkStyles}
            className="nav-bar-route"
            activeStyle={{
                background: "#ff3838",
              }}
            >
                Home
            </NavLink>
            <NavLink 
            to='/Items'            
            exact
            style={linkStyles}
            className="nav-bar-route"
            activeStyle={{
                background: "#ff3838",
              }}>
                Marketplace
            </NavLink>
            <NavLink 
            to='/NewItemForm'
            exact
            style={linkStyles}
            className="nav-bar-route"
            activeStyle={{
                background: "#ff3838",
              }}>
                Sell Your Stuff!
            </NavLink>
        </div>
    )
}

export default NavBar;