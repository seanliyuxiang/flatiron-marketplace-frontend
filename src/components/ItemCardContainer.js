import React, { useEffect, useState } from 'react';
import SearchBar from "./SearchBar";
import ItemCard from "./ItemCard";
import NewReviewForm from "./NewReviewForm";

function ItemCardContainer ({ items, handleDeletion, users }) {
    
    const [reviews, setReviews] = useState([])

    // creating state to hold search item data
    const [searchFormData, setSearchFormData] = useState('');

    // capturing what the user types in search items and saving it to `searchFormData`
    function handleChange(event) {
        setSearchFormData(event.target.value);
    }

    // function addNewItem () {
    //     let updatedItems = [...items, newItem];
    //     setItems(updatedItems);
    // }

    useEffect(() => {
        fetch("http://localhost:9292/reviews")
        .then(response => response.json())
        .then(data => checkForReviews(data))
    }, []);
    

    // function checkForUsers (data) {
    //     if (!!data) {
    //         setUsers(data)
    //     }
    // }
    
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
            items.filter(item => {
                // filtering and mapping in the same component b/c there's no middle component
                return item.name.toLowerCase().includes(searchFormData.toLowerCase())
            }).map(item => {
                // find the user object that owns this item and pass it as prop to `ItemCard` component
                const owner = users.find(singleUser => singleUser.id === item.owner_id);

                return (
                    <ItemCard item={item} key={item.id} handleDeletion={handleDeletion} owner={owner} />
                )
            })
        )
    }

    return ( 
        <div>
            <div className="search-bar">
                <SearchBar handleChange={handleChange} searchFormData={searchFormData} />
            </div>        
            <div className="card-grid">
                {renderItems()}
            </div>
            <NewReviewForm />
        </div>
    )

}

export default ItemCardContainer;
