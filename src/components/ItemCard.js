import React from 'react';

function ItemCard({ item, targetUser, handleDeletion, owner }) {
    return (
        <div className="card">
            <img className="cardImage" src={item.image_url} alt={item.name}/>
            <div className="cardText">
                <p>{item.name}</p>
                <p>posted by: {owner.username} in -{owner.location}-</p>
                {/* <h5>Username: {targetUser.username}</h5> */}
            </div>
            <button className="delete" onClick={() => handleDeletion(item)}>Delete item</button>


        </div>
    )
}

export default ItemCard;