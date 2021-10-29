import React, {useState} from 'react';

function NewReviewForm ({ itemID, users, onReviewAddition }) {

    const [newReviewFormData, setNewReviewFormData] = useState({
        body: '',
        rating: '',
        item_id: itemID,
        reviewer_id: 0
    });

    function handleChange (event) {
        console.log("event target name", event.target.name)
        console.log("event target value", event.target.value)

        setNewReviewFormData({
            ...newReviewFormData, [event.target.name]: event.target.value
        })
    }

    function handleSubmit (event) {
        //newReviewFormData has been updated while the user types in their response
        //when they click the submit button we will POST the entire newReviewFormData object
        event.preventDefault();
        console.log(event)
        console.log(newReviewFormData)

        // fetch POST
        fetch("http://localhost:9292/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newReviewFormData)
        })
        .then(response => response.json())
        .then(newReview => onReviewAddition(newReview))

        setNewReviewFormData({
            body: '',
            rating: '',
            item_id: itemID,
            reviewer_id: newReviewFormData.reviewer_id
        })
    }

    function renderDropdown () {
        console.log(users)
        if (!!users) {
            return (
                <>
                <select name="reviewer_id" onChange={handleChange}> 
                    <option selected value="Click your username" >Click your username</option>
    
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
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='body'
                placeholder='Enter new review'
                value={newReviewFormData.body}
                onChange={handleChange}
            />
            <input
                type='number'
                name='rating'
                placeholder='Rate this item from 0 - 10'
                value={newReviewFormData.rating}
                onChange={handleChange}
            />

            {renderDropdown()}

            <button type='submit' className="review-button">Submit Review</button>
        </form>
    )

}

export default NewReviewForm;