import React from 'react';
import {NavLink} from 'react-router-dom';

const linkStyles = {
    padding: "10px 15px 10px 15px",
    margin: "10px 10px 10px 10px",
    textDecoration: "none",
    color: "white",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: "0px",
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
              cursor: 'pointer',
              hover: {
                color: '#FF0000'
              }
            }}>
              Home
            </NavLink>
            
            <NavLink 
            to='/Items'            
            exact
            style={linkStyles}
            className="nav-bar-route"
            activeStyle={{
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
              cursor:'pointer'
            }}>
              Sell Your Stuff!
            </NavLink>
        </div>
    )
}

export default NavBar;