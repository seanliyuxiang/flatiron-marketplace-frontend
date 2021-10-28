import React, { useState } from 'react';

function NewItemForm ({onItemAddition}) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image_url: "",
        price: "",
        owner_id: ""
    })

    function handleChange (event) {
        // save `name` and `value` attributes into variables
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

        // clear out all input fields
        setFormData({
            name: "",
            description: "",
            image_url: "",
            price: "",
            owner_id: ""
        });
    }



    return (
        <div className="newItemForm">
            Inside New Item Form
            <form onSubmit={handleSubmit} className="item-form">
                <input type="text" name="name" placeholder="Item name" value={formData.name} onChange={handleChange} />

                <input type="text" name="description" placeholder="Item description" value={formData.description} onChange={handleChange} />

                <input type="url" name="image_url" placeholder="URL for item image" value={formData.image_url} onChange={handleChange} />

                <input type="number" name="price" step="0.01" placeholder="Item price" value={formData.price} onChange={handleChange} />

                <input type="text" name="owner_id" placeholder="Item owner ID" value={formData.owner_id} onChange={handleChange} />

                <button type="submit">Add Item</button>
            </form>
        </div>
    )
}

export default NewItemForm;