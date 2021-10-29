import React, {useState} from 'react';
import SearchBar from "./SearchBar";
import ItemCard from "./ItemCard";

function ItemCardContainer ({ items, handleDeletion, users }) {
    const [searchFormData, setSearchFormData] = useState('');

    function handleChange(event) {
        setSearchFormData(event.target.value);
    }

    function renderItems() {
        return (
            items.filter(item => {
                // Filtering and mapping in the same component b/c there's no middle component
                return item.name.toLowerCase().includes(searchFormData.toLowerCase())
            }).map(item => {
                // Find the user object that owns this item and pass it as prop to `ItemCard` component
                const owner = users.find(singleUser => singleUser.id === item.owner_id)
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
        </div>
    )
}

export default ItemCardContainer;
