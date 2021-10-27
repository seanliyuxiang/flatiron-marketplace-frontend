import React, { useEffect, useState } from 'react';
import SearchBar from "./SearchBar";
import ItemCard from "./ItemCard";
import NewReviewForm from "./NewReviewForm";

function ItemCardContainer () {
    const [items, setItems] = useState([])
    const [users, setUsers] = useState([])
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch("http://localhost:9292/items")
        .then(response => response.json())
        .then(data => checkForItems(data))
    }, []);

    useEffect(() => {
        fetch("http://localhost:9292/users")
        .then(response => response.json())
        .then(data => checkForUsers(data))
    }, [setItems]);

    useEffect(() => {
        fetch("http://localhost:9292/reviews")
        .then(response => response.json())
        .then(data => checkForReviews(data))
    }, []);
    
    function checkForItems (data) {
        if (!!data) {
            setItems(data)
        }
    }

    function checkForUsers (data) {
        if (!!data) {
            setUsers(data)
        }
    }
    
    function checkForReviews (data) {
        if (!!data) {
            setReviews(data)
        }
    }

    // function renderUsers () {
    //     return (
    //         users.map (user => {
    //             return (
    //                 <ItemCard item={item} key={item.id} />
    //             )
    //         })
    //     )
    // }

    // function findAssociatedUser(ownerID) {
    //     debugger;
    //     let targetUser = users.filter(user => {
    //         return user.id === ownerID
    //     });
    //     return targetUser[0];
    // }

    // function renderItems () {
    //     return (
    //         items.map (item => {
    //             let targetUser = findAssociatedUser(item.owner_id);
    //             return (
    //                 <ItemCard item={item} key={item.id} targetUser={targetUser} />
    //             )
    //         })
    //     )
    // }

    function renderItems() {
        return (
            items.map(item => {
                return (
                    <ItemCard item={item} key={item.id} />
                )
            })
        )
    }

    return ( 
        <div className="card-grid">

            <p>Inside Item Card Container</p>
            <SearchBar />
            { !!items ? renderItems() : null}
            <NewReviewForm />

        </div>
    )

}

export default ItemCardContainer;
