import React, {useState} from 'react';

function NewReviewForm ({ itemID, users, onReviewAddition }) {
    const [newReviewFormData, setNewReviewFormData] = useState({
        body: '',
        rating: '',
        item_id: itemID,
        reviewer_id: 0
    });

    function handleChange (event) {
        setNewReviewFormData({
            ...newReviewFormData, [event.target.name]: event.target.value
        })
    }

    function handleSubmit (event) {
        event.preventDefault();

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
        if (!!users) {
            return (
                <>
                    <select name="reviewer_id" onChange={handleChange}> 
                        <option defaultValue="Click your username" >Click your username</option>
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
        <form className="newReviewForm" onSubmit={handleSubmit}>
            Leave a review for this item:
            <input
                type='text'
                name='body'
                placeholder='Enter new review'
                value={newReviewFormData.body}
                onChange={handleChange}
            />
            <input
                type='number'
                min="0"
                max="5"
                name='rating'
                placeholder='Rate this item from 0 - 5'
                value={newReviewFormData.rating}
                onChange={handleChange}
            />
            {renderDropdown()}
            <button type='submit' className="review-button">Submit Review</button>
        </form>
    )
}

export default NewReviewForm;