import React from 'react';

function ItemCard({ item, targetUser }) {
    return (
        <div className="card">
            <img className="cardImage" src={item.image_url} alt={item.name}/>
            <br></br>
            <h5>Name: {item.name}</h5> <br />
            <h5>Owner ID: {item.owner_id}</h5>
            {/* <h5>Username: {targetUser.username}</h5> */}
            <p></p>


        </div>
    )
}

export default ItemCard;