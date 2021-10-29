import React from 'react';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import NewReviewForm from "./NewReviewForm";

function ItemDetails ({ items, users }) {
    const [reviews, setReviews] = useState([])

    // useParams is a custom hook to get the :id from URL
    const params = useParams();
    
    useEffect(() => {
        fetch(`http://localhost:9292/items/${params.id}/reviews`)
        .then(response => response.json())
        .then(data => setReviews(data)) 
    }, [params.id])
    
    function handleDeletion (review) {
        fetch(`http://localhost:9292/reviews/${review.id}`, {
            method: "DELETE"
        })
        deleteFromState(review)
    }

    function deleteFromState (review) {
        const remainingReviews = reviews.filter(each => each.id !== review.id)
        setReviews(remainingReviews)
    }

    function renderReviews () {
        return (
            <>
                <div className="reviewsTitle">
                    <h4>Customer Reviews</h4>
                    <h4>⭐⭐⭐⭐⭐<span> {reviews.length} reviews</span></h4>
                    {/* If there are more than 0 reviews, .reduce finds the sum, and then we find the average. .toFixed gives back a string and also sets the result to only one decimal point. */}
                    <h4>{reviews.length === 0 ? 0 : (reviews.map(r => r.rating).reduce((a,b) => a+b)/reviews.length).toFixed(1)} out of 5 stars</h4>
                </div>

                    {reviews.map(review => {
                        // Finds the reviewer object
                        const foundReviewer = users.find(singleUser => singleUser.id === review.reviewer_id);
                        return (
                            <div key={review.id} className="eachReview">
                                <div>
                                    <div>
                                        <h5>{foundReviewer.username}</h5>
                                        <p>Reviewed in {foundReviewer.location}</p>
                                        <p>{review.rating} out of 5 stars</p>
                                        <p>{review.body}</p>
                                        <button className="deleteButton" onClick={() => handleDeletion(review)}>🗑</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </>
        )
        
    }

    function onReviewAddition (newReview) {
        setReviews([...reviews, newReview])
    }

    function renderItem () {
        const foundItem = items.find(item => item.id === parseInt(params.id));
            return (
                <>
                    <img src={foundItem.image_url} alt={foundItem.name}/>
                    <h3>{foundItem.name}</h3>
                    <h4>$ {foundItem.price}</h4>
                    <p>{foundItem.description}</p>
                </>
            )
    }

    return (
        <>
            <div className="itemContainer">
                {renderItem()}
            </div>
            <div className="reviewsContainer">
                {renderReviews()}
                <NewReviewForm itemID={parseInt(params.id)} users={users} onReviewAddition={onReviewAddition} />
            </div>
        </>
    )
}

export default ItemDetails;