import React from 'react';
import {Link} from 'react-router-dom';

function ItemCard({ item, handleDeletion, owner }) {
    return (
        <div className="card">
            <img className="cardImage" src={item.image_url} alt={item.name}/>
            <div className="cardText">
                    <p>
                        <span id="itemName">{item.name}</span>
                        <span id="itemPrice">${item.price}</span>
                    </p>

                {!owner ? <p>Seller: Anonymous</p> : <p>Seller: {owner.username}, {owner.location}</p>}
            </div>
            <button className="deleteButton" onClick={() => handleDeletion(item)}> 🗑 </button>
            <Link to={`/Items/${item.id}`}>Item details</Link>
        </div>
    )
};

export default ItemCard;