import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewReviewForm from "./NewReviewForm";

function ItemDetails ({ items, users }) {
    
    const [reviews, setReviews] = useState([])

    // custom hook to get :id from URL
    const params = useParams();
    console.log("params:", params);
    console.log("items list state", items);
    
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
        //we'll take the reviews state (which is an array of objects)
        //map through the array
        //for each item in the map, we'll take the item.body and print that on the page
        if (!!reviews) {
            return (
                <>
                    <h4>Reviews</h4>
                    {reviews.map(each => {
                        // find the reviewer object
                        const foundReviewer = users.find(singleUser => singleUser.id === each.reviewer_id);

                        return (
                            <div className="eachReview">
                                <div>
                                    <span>"{each.body}" -- {foundReviewer.username} in {foundReviewer.location}</span>
                                </div>

                                <button className="deleteButton" onClick={() => handleDeletion(each)}> 🗑 </button>
                            </div>
                        )
                    })}
                </>
            )
        }
    }

    function onReviewAddition (newReview) {
        setReviews([...reviews, newReview])
    }

    function renderItem () {
        //look through the list of items held in state
        //render only the item whose id matches the id in the params
        const foundItem = items.find(item => item.id === parseInt(params.id));
        console.log("found item", foundItem);
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
        <div className="itemReviews">
            {renderItem()}
            {renderReviews()}
            <NewReviewForm itemID={parseInt(params.id)} users={users} onReviewAddition={onReviewAddition} />
        </div>
    )
}

export default ItemDetails;