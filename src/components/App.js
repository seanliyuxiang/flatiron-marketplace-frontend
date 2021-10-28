import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NavBar from "./NavBar";
import Home from "./Home";
import ItemCardContainer from "./ItemCardContainer";
import NewItemForm from "./NewItemForm";

function App() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/items")
    .then(response => response.json())
    .then(data => setItems(data))
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
      <Header />
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/Items">
          <ItemCardContainer items={items} handleDeletion={handleDeletion} />
        </Route>
        <Route exact path="/NewItemForm">
          <NewItemForm onItemAddition={handleItemAddition}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
