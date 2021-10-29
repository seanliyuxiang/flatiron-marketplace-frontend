import React, { useState } from 'react';
import {Redirect} from 'react-router-dom'; 

function NewItemForm ({onItemAddition, users}) {
    const [redirect, setRedirect] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image_url: "",
        price: "",
        owner_id: ""
    })

    function handleChange (event) {
        let eventTargetName = event.target.name;
        let eventTargetValue = event.target.value;

        if (eventTargetName === 'price') {
            eventTargetValue = parseFloat(event.target.value);
        }

        setFormData({
            ...formData, [eventTargetName]: eventTargetValue
        })
    }

    function handleSubmit (event) {
        event.preventDefault();

        fetch("http://localhost:9292/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(newItem => onItemAddition(newItem))
        .then(setRedirect(true));

        setFormData({
            name: "",
            description: "",
            image_url: "",
            price: "",
            owner_id: ""
        });
    }

    if (redirect) {
        return <Redirect to="/Items" />
    }

    function renderUsers () {
        if (!!users) {
            return (
                <>
                    <select name="owner_id" onChange={handleChange}>
                        <option selected value ="Click to choose your username">Click to choose your username</option>
                        {users.map(each => {
                            return (
                                <option key={each.id} value={each.id}>{each.username}</option>
                            )
                        })}
                    </select>
                </>
            )
        }
    }

    return (
        <div>
            <div className="formHeader" >
                <h3>Ready to sell something? </h3>
            </div>
            
            <div className="newItemForm">
                <form onSubmit={handleSubmit} className="item-form">
                    <input type="text" name="name" placeholder="Item name" value={formData.name} onChange={handleChange} /> <br />

                    <input type="text" name="description" placeholder="Item description" value={formData.description} onChange={handleChange} /> <br />

                    <input type="url" name="image_url" placeholder="URL for item image" value={formData.image_url} onChange={handleChange} /> <br />

                    <input type="number" name="price" step="0.01" placeholder="Item price" value={formData.price} onChange={handleChange} /> <br />

                    {renderUsers()} <br />

                    <button type="submit">Add Item</button>
                </form>
            </div>
        </div>
    )
}

export default NewItemForm;