import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import ItemCardContainer from "./ItemCardContainer";
import NewItemForm from "./NewItemForm";
import ItemDetails from "./ItemDetails";

function App() {
  // Fetching and setting state for items and users,
  // since we want to get that data here and pass it down through ItemCardContainer to the ItemCard components
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/items")
    .then(response => response.json())
    .then(data => setItems(data))
  }, []);

  useEffect(() => {
    fetch("http://localhost:9292/users")
    .then(response => response.json())
    .then(data => setUsers(data))
  }, []);

  function handleItemAddition (newItem) {
    setItems([...items, newItem]);
  }

  function handleDeletion (item) {
    fetch(`http://localhost:9292/items/${item.id}`, {
      method: "DELETE"
    })
    deleteFromState(item)
  }
      
  function deleteFromState (data) {
    const remainingItems = items.filter(each => each.id !== data.id)
    setItems(remainingItems)
  }

  return (
    <div className= "app">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/Items">
          <ItemCardContainer items={items} handleDeletion={handleDeletion} users={users} />
        </Route>
        <Route exact path="/NewItemForm">
          <NewItemForm onItemAddition={handleItemAddition} users={users}/>
        </Route>
        <Route exact path="/Items/:id">
          <ItemDetails items={items} users={users} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
