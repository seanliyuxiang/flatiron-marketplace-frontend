import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NavBar from "./NavBar";
import Home from "./Home";
import ItemCardContainer from "./ItemCardContainer";
import NewItemForm from "./NewItemForm";

function App() {
  return (
    <div className= "app">
      <Header />
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/Items">
          <ItemCardContainer />
        </Route>
        <Route exact path="/NewItemForm">
          <NewItemForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
