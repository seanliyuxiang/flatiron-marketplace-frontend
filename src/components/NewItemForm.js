import React, { useState } from 'react';
import {Redirect} from 'react-router-dom'; 

function NewItemForm ({onItemAddition, users}) {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image_url: "",
        price: "",
        owner_id: ""
    })
    const [redirect, setRedirect] = useState(false)

    function handleChange (event) {
        // save `name` and `value` attributes into variables
        console.log("select name", event.target.name)
        console.log("id number for chosen user", event.target.value)

        let eventTargetName = event.target.name;
        let eventTargetValue = event.target.value;

        // need to convert string to floating number for price
        if (eventTargetName === 'price') {
            eventTargetValue = parseFloat(event.target.value);
        }

        setFormData({
            ...formData, [eventTargetName]: eventTargetValue
        })
    }

    function handleSubmit (event) {
        // since the formData state has been updated while the user types in their item,
        // once they're done and they click the submit button we'll just post that whole formData item
        // (rather than storing it in a newItem variable and posting that new variable)

        event.preventDefault();
        console.log("inside form",formData);

        // post it to the backend
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

        // clear out all input fields
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
                {/* <label> Choose from existing user</label> */}
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
                    <input type="text" name="name" placeholder="Item name" value={formData.name} onChange={handleChange} />

                    <input type="text" name="description" placeholder="Item description" value={formData.description} onChange={handleChange} />

                    <input type="url" name="image_url" placeholder="URL for item image" value={formData.image_url} onChange={handleChange} />

                    <input type="number" name="price" step="0.01" placeholder="Item price" value={formData.price} onChange={handleChange} />

                    {/* <input type="text" name="owner_id" placeholder="Item owner ID" value={formData.owner_id} onChange={handleChange} /> */}

                    {renderUsers()}

                    <button type="submit">Add Item</button>
                </form>
            </div>
        </div>
    )
}

export default NewItemForm;