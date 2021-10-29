import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
// import Header from "./Header";
import NavBar from "./NavBar";
import Home from "./Home";
import ItemCardContainer from "./ItemCardContainer";
import NewItemForm from "./NewItemForm";
import ItemDetails from "./ItemDetails";

function App() {
  // fetching and setting state for items, since we want to get that data here and pass it down through ItemCardContainer to the ItemCard components
  const [items, setItems] = useState([]);

  // define state for users b/c we want to show `username` and `location` on item card
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
    // console.log("new item here from inside app:", newItem)
    setItems([...items, newItem]);
  }

  function handleDeletion (item) {
    console.log("item from inside app component, passed from card", item)
    // first want to DELETE this from backend
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
      {/* <Header /> */}
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
        <Route path="/Items/:id">
          <ItemDetails items={items} users={users} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
