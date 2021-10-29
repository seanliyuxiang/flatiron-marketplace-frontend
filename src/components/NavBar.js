import React from 'react';
import {NavLink} from 'react-router-dom';

const linkStyles = {
    padding: "10px 15px 10px 15px",
    margin: "10px 10px 10px 10px",
    background: "#db0000",
    textDecoration: "none",
    color: "white",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: "8px",
  };
  
function NavBar () {
    return (
        <div className="nav-bar">
          <h1> Flatiron Marketplace </h1>
            <NavLink 
            to='/'
            exact
            style={linkStyles}
            className="nav-bar-route"
            activeStyle={{
                background: "#ff7a7a",
                cursor: 'pointer',
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
                background: "#ff7a7a",
                cursor: 'pointer'
              }}>
                Marketplace
            </NavLink>
            <NavLink 
            to='/NewItemForm'
            exact
            style={linkStyles}
            className="nav-bar-route"
            activeStyle={{
                background: "#ff7a7a",
                cursor:'pointer'
              }}>
                Sell Your Stuff!
            </NavLink>
        </div>
    )
}

export default NavBar;